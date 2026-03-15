<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=Premium%20YT%20Downloader&fontSize=52&fontColor=fff&animation=twinkling&fontAlignY=36&desc=Lightning-fast%20%E2%80%A2%20Beautifully%20Designed%20%E2%80%A2%20100%25%20Local&descAlignY=56&descSize=17" width="100%"/>

<br/>

![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)
![yt-dlp](https://img.shields.io/badge/yt--dlp-Latest-FF0000?style=for-the-badge&logo=youtube&logoColor=white)
![FFmpeg](https://img.shields.io/badge/FFmpeg-Powered-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Mac%20%7C%20Linux-0078D4?style=for-the-badge&logo=windows&logoColor=white)
![Stars](https://img.shields.io/github/stars/Shivam-Singh-Hash/youtube-downloader?style=for-the-badge&color=FFD700&logo=github&logoColor=white)
![Forks](https://img.shields.io/github/forks/Shivam-Singh-Hash/youtube-downloader?style=for-the-badge&color=20B2AA&logo=github&logoColor=white)

<br/>

**⚡ No watermarks &nbsp;·&nbsp; 🔒 Fully local &nbsp;·&nbsp; 🎵 MP3 & MP4 &nbsp;·&nbsp; 🎨 Glassmorphism UI &nbsp;·&nbsp; 📊 Live Progress**

<br/>

[🚀 Get Started](#-installation-guide) &nbsp;·&nbsp; [✨ Features](#-features) &nbsp;·&nbsp; [🏗️ Architecture](#️-architecture) &nbsp;·&nbsp; [📸 Screenshots](#-screenshots) &nbsp;·&nbsp; [🗺️ Roadmap](#-future-improvements)

<br/>

</div>

---

## 📖 Project Overview

The **Premium YouTube Downloader** is a modern, responsive web application that lets you download your favourite YouTube videos and extract high-quality audio — all from a stunning glassmorphism interface running entirely on your local machine.

Built with vanilla HTML, CSS, and JavaScript on the frontend and powered by `yt-dlp` + FFmpeg on the backend, this tool delivers a seamless, ad-free experience with zero watermarks, zero sign-ups, and zero limits.

---

## 🎬 Demo

<div align="center">

<img src="https://placehold.co/800x450/04040a/ff2d55?text=🎬+Demo+GIF+Coming+Soon&font=montserrat" width="80%" alt="Demo GIF"/>

<br/><br/>

> 🎯 **Paste a URL → Analyze → Choose Format → Download.** That's it.

</div>

---

## ✨ Features

<div align="center">

| | Feature | Description |
|---|---------|-------------|
| 🎬 | **MP4 Video Download** | High-quality video with audio, auto-merged by FFmpeg |
| 🎵 | **MP3 Audio Extraction** | Crystal-clear audio extracted from any YouTube video |
| ⚡ | **yt-dlp Engine** | Industry-standard downloader — fast, reliable, always up to date |
| 🔧 | **FFmpeg Merging** | Seamlessly merges high-res video + audio streams automatically |
| 🎨 | **Glassmorphism UI** | Stunning animated dark UI with particles and a custom cursor |
| 📊 | **Live Progress Bar** | Real-time download progress via Server-Sent Events |
| 🖥️ | **100% Local** | Runs entirely on your machine — no cloud, no tracking, no data collection |
| 📱 | **Responsive Design** | Works flawlessly on desktop and mobile screens |

</div>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│                      USER                        │
│          Pastes YouTube URL in Browser           │
└─────────────────────┬────────────────────────────┘
                      │  Browser Request
                      ▼
┌──────────────────────────────────────────────────┐
│        FRONTEND  (HTML5 / CSS3 / JavaScript)     │
│  • Glassmorphism UI       • Particle Canvas      │
│  • Live Progress Bar      • Format Selector      │
└─────────────────────┬────────────────────────────┘
                      │  fetch() → /api/download
                      ▼
┌──────────────────────────────────────────────────┐
│            PYTHON BACKEND  (app.py)              │
│  • HTTP routing           • SSE streaming        │
│  • Error handling         • File serving         │
└─────────────────────┬────────────────────────────┘
                      │  subprocess call
                      ▼
┌──────────────────────────────────────────────────┐
│                   yt-dlp                         │
│     Fetches best video & audio streams           │
└─────────────────────┬────────────────────────────┘
                      │  pipes to
                      ▼
┌──────────────────────────────────────────────────┐
│                   FFmpeg                         │
│     Merges streams → final MP4 or MP3 file       │
└─────────────────────┬────────────────────────────┘
                      │
                      ▼
            📁  downloads/your-video.mp4
```

---

## 🛠️ Tech Stack

<div align="center">

### 🎨 Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3%20%28Glassmorphism%29-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript%20%28Vanilla%29-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### ⚙️ Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

### 🔧 Tools
![yt-dlp](https://img.shields.io/badge/yt--dlp-FF0000?style=for-the-badge&logo=youtube&logoColor=white)
![FFmpeg](https://img.shields.io/badge/FFmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)

</div>

---

## 📂 Project Structure

```
📦 youtube-downloader/
│
├── 🐍 app.py           ← Python backend — server, API endpoints, subprocess
├── 🌐 index.html       ← Main UI structure of the web application
├── 🎨 style.css        ← Premium styling, glassmorphism & animations
├── ⚡ script.js        ← Interactive frontend logic & API communication
└── 📄 README.md        ← Project documentation
```

---

## 🚀 Installation Guide

### Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | Install |
|------|---------|---------|
| Python | 3.x+ | [python.org](https://python.org) |
| yt-dlp | Latest | `pip install yt-dlp` |
| FFmpeg | Any | See below |

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Shivam-Singh-Hash/youtube-downloader.git
cd youtube-downloader
```

### 2️⃣ Install Python Dependencies
```bash
pip install yt-dlp
```

### 3️⃣ Install FFmpeg

<details>
<summary><b>🪟 Windows</b></summary>

```powershell
winget install ffmpeg
```
Or download from [ffmpeg.org](https://ffmpeg.org/download.html), extract, and add the `bin/` folder to your system PATH.
</details>

<details>
<summary><b>🍎 macOS</b></summary>

```bash
brew install ffmpeg
```
</details>

<details>
<summary><b>🐧 Linux</b></summary>

```bash
sudo apt install ffmpeg
```
</details>

### 4️⃣ Run the Application
```bash
python app.py
```

### 5️⃣ Open Your Browser
```
http://127.0.0.1:5000
```

> ✅ No `.env` files. No Docker. No complicated config. Just run and go.

---

## 💻 Usage

```
Step 1 →  Copy the URL of any YouTube video or Short
Step 2 →  Paste it into the input field on the homepage
Step 3 →  Click Analyze to fetch video details & thumbnail
Step 4 →  Select your format: MP4 (video) or MP3 (audio)
Step 5 →  Click DOWNLOAD NOW and watch the live progress bar
Step 6 →  File is saved automatically ✅
```

---

## 📸 Screenshots

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="https://placehold.co/380x220/04040a/ff2d55?text=🏠+Homepage+UI&font=montserrat" width="380" alt="Homepage UI"/>
      <br/><sub><b>Homepage — Glassmorphism UI</b></sub>
    </td>
    <td align="center">
      <img src="https://placehold.co/380x220/04040a/00d4ff?text=📊+Download+Progress&font=montserrat" width="380" alt="Downloading"/>
      <br/><sub><b>Live Download Progress</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://placehold.co/380x220/04040a/00ffb3?text=✅+Download+Complete&font=montserrat" width="380" alt="Success"/>
      <br/><sub><b>Successful Download 🎉</b></sub>
    </td>
    <td align="center">
      <img src="https://placehold.co/380x220/04040a/ffd60a?text=📱+Mobile+View&font=montserrat" width="380" alt="Mobile"/>
      <br/><sub><b>Responsive Mobile Design</b></sub>
    </td>
  </tr>
</table>

> 💡 Replace placeholders above with real screenshots from your app!

</div>

---

## 🔮 Future Improvements

```
✅  v1.0  —  MP4 video download
✅  v1.0  —  MP3 audio extraction
✅  v1.0  —  Live progress bar
✅  v1.0  —  Glassmorphism UI with animations
```

```
🔜  v1.1  —  Full playlist download support
🔜  v1.1  —  Dark / Light mode toggle
🔜  v1.2  —  User download history tracking
🔜  v1.2  —  Subtitle / caption download (.srt / .vtt)
🔜  v1.3  —  Explicit quality selector (1080p / 720p / 480p)
🔜  v2.0  —  Desktop app (Electron / Tauri)
```

---

## 🤝 Contributing

Contributions make the open-source world go round. All contributions are **greatly appreciated**! 🙏

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "feat: add AmazingFeature"

# 4. Push to your branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request 🚀
```

**Guidelines:**
- Keep code clean and well-commented
- Test on Windows before submitting a PR
- One feature per pull request
- Update the README if your feature changes usage

---

## ⭐ Support

If this project saved you time or you just think it's cool — drop a ⭐ star! It helps more people discover it.

<div align="center">

[![Star this repo](https://img.shields.io/badge/⭐%20Star%20this%20repo-It%20really%20helps!-FFD700?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shivam-Singh-Hash/youtube-downloader)

</div>

---

## ⚠️ Disclaimer

This tool is intended for **personal, educational use only**. Please respect YouTube's [Terms of Service](https://www.youtube.com/t/terms). Only download content that you own or have the right to download. The author takes no responsibility for misuse.

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/Shivam-Singh-Hash.png" width="110" style="border-radius:50%" alt="Shivam Singh" onerror="this.src='https://placehold.co/110x110/04040a/ff2d55?text=SS'"/>

### **Shivam Singh**
*Building cool things, one commit at a time.*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Shivam--Singh--Hash-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shivam-Singh-Hash)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-contactshivamsingh-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/contactshivamsingh/)
[![Instagram](https://img.shields.io/badge/Instagram-theshivamsinghrathore-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/theshivamsinghrathore/)

</div>

---

## 📝 License

```
MIT License  —  Copyright (c) 2025 Shivam Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=130&section=footer" width="100%"/>

**Made with ❤️ by [Shivam Singh](https://github.com/Shivam-Singh-Hash)**

*If you found this helpful, please consider giving it a ⭐*

</div>
