import os
import subprocess
import uuid
import glob
import json
import shutil
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn

# Create a downloads directory if it doesn't exist
DOWNLOADS_DIR = os.path.join(os.path.dirname(os.path.abspath(__name__)), 'downloads')
if not os.path.exists(DOWNLOADS_DIR):
    os.makedirs(DOWNLOADS_DIR)

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""
    daemon_threads = True

class DownloaderHandler(SimpleHTTPRequestHandler):
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        """Handle preflight CORS requests."""
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        """Handle GET requests to serve static files."""
        # Clean up old files on every GET request to the index
        if self.path == '/' or self.path == '/index.html':
            self.cleanup_old_files()
            
        return super().do_GET()

    def do_POST(self):
        """Handle POST requests for downloads."""
        if self.path == '/download':
            self.handle_download_request()
        else:
            self.send_error(404, "Endpoint not found")

    def handle_download_request(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            self.send_json_error(400, 'Empty request body')
            return

        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
        except json.JSONDecodeError:
            self.send_json_error(400, 'Invalid JSON')
            return

        url = data.get('url')
        format_type = data.get('format', 'mp4') # Default to mp4 if not provided
        quality = data.get('quality', 'best') # Default to best if not provided
        
        if not url:
            self.send_json_error(400, 'URL is required')
            return
            
        # Generate a unique filename prefix to avoid collisions
        unique_id = str(uuid.uuid4())[:8] # type: ignore
        output_template = os.path.join(DOWNLOADS_DIR, f"{unique_id}_%(title)s.%(ext)s")
        
        try:
            if format_type == 'mp3':
                # yt-dlp command for best audio, extract audio, convert to mp3
                command = [
                    'yt-dlp',
                    '-x', # Extract audio
                    '--audio-format', 'mp3',
                    '--audio-quality', '0', # Best quality
                    '-o', output_template,
                    url
                ]
            else:
                # Build the format string based on requested quality
                if quality == 'best':
                    format_string = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
                else:
                    # Request specific height or smaller
                    format_string = f'bestvideo[height<={quality}][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
                    
                # yt-dlp command for video and audio, merge to mp4
                command = [
                    'yt-dlp',
                    '-f', format_string,
                    '--merge-output-format', 'mp4',
                    '-o', output_template,
                    url
                ]
                
            # Run yt-dlp
            result = subprocess.run(
                command,
                capture_output=True,
                text=True,
                check=False
            )
            
            if result.returncode != 0:
                print(f"yt-dlp error output: {result.stderr}")
                self.send_json_error(400, 'Failed to process the YouTube URL. It might be private, unavailable, or an invalid link.')
                return

            # Find the downloaded file
            search_pattern = os.path.join(DOWNLOADS_DIR, f"{unique_id}_*.*")
            downloaded_files = glob.glob(search_pattern)
            
            if not downloaded_files:
                self.send_json_error(500, 'Download succeeded but file not found on disk.')
                return
                
            file_path = downloaded_files[0]
            filename = os.path.basename(file_path)
            
            # Remove the unique_id prefix from the filename sent to user
            display_filename = filename[9:] if len(filename) > 9 and filename[8] == '_' else filename # type: ignore
            
            # Send the file to the client
            self.send_file_to_client(file_path, display_filename)

        except Exception as e:
            print(f"Unexpected error: {e}")
            self.send_json_error(500, f'An unexpected error occurred: {str(e)}')

    def send_json_error(self, code, message):
        """Helper to send JSON error responses."""
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = json.dumps({'error': message})
        self.wfile.write(response.encode('utf-8'))

    def send_file_to_client(self, file_path, display_filename):
        """Sends a local file to the client as a download attachment."""
        try:
            file_size = os.path.getsize(file_path)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/octet-stream')
            
            # URL encode the filename for headers to handle spaces and special chars
            encoded_filename = urllib.parse.quote(display_filename)
            
            # Ensure the basic filename parameter contains only ASCII to prevent http.server UnicodeEncodeError crashes
            ascii_filename = display_filename.encode('ascii', 'ignore').decode('ascii')
            if not ascii_filename:
                ascii_filename = 'downloaded_video'
                
            self.send_header('Content-Disposition', f'attachment; filename="{ascii_filename}"; filename*=UTF-8\'\'{encoded_filename}')
            
            self.send_header('Content-Length', str(file_size))
            self.send_header('X-Filename', encoded_filename)
            self.send_header('Access-Control-Expose-Headers', 'X-Filename')
            self.end_headers()

            # Stream the file to the client
            with open(file_path, 'rb') as f:
                shutil.copyfileobj(f, self.wfile)
                
        except Exception as e:
            print(f"Error sending file: {e}")

    def cleanup_old_files(self):
        """Removes files older than 1 hour in the downloads directory."""
        try:
            import time
            current_time = time.time()
            for filename in os.listdir(DOWNLOADS_DIR):
                file_path = os.path.join(DOWNLOADS_DIR, filename)
                if os.path.isfile(file_path):
                    file_creation_time = os.path.getctime(file_path)
                    if (current_time - file_creation_time) > 3600:
                        try:
                            os.remove(file_path)
                        except OSError:
                            pass # File might be in use
        except Exception as e:
            print(f"Error during cleanup: {e}")

def run_server(port=5000):
    server_address = ('127.0.0.1', port)
    # Using ThreadedHTTPServer prevents the server from hanging when downloading large files
    httpd = ThreadedHTTPServer(server_address, DownloaderHandler)
    print(f"Starting YouTube Downloader Server on http://{server_address[0]}:{port}")
    print("Press CTRL+C to quit")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == '__main__':
    run_server()
