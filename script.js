// Cursor
const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function ar(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(ar);})();
document.querySelectorAll('button,input,.fmt-card,.format-tab,.feat').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%)scale(2.5)';ring.style.transform='translate(-50%,-50%)scale(1.6)';});
  el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%)scale(1)';ring.style.transform='translate(-50%,-50%)scale(1)';});
});

// Particle canvas
const canvas=document.getElementById('bg-canvas'),ctx=canvas.getContext('2d');
let W,H,pts=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
window.addEventListener('resize',resize);resize();
const cols=['#ff2d55','#00d4ff','#b44fff','#ffd60a'];
for(let i=0;i<90;i++) pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*0.28,vy:(Math.random()-.5)*0.28,r:Math.random()*1.5+0.4,a:Math.random()*.6+.2,c:cols[Math.floor(Math.random()*4)]});
function draw(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.c+Math.floor(p.a*255).toString(16).padStart(2,'0');ctx.fill();
  });
  for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
    const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(255,255,255,${0.035*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke();}
  }
  requestAnimationFrame(draw);
}
draw();

// App
let selFmt='mp4',selQuality='best',busy=false;
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const show=id=>document.getElementById(id).style.display='block';
const hide=id=>document.getElementById(id).style.display='none';

function switchTab(t){
  document.getElementById('tabVideo').className='format-tab'+(t==='video'?' active':'');
  document.getElementById('tabAudio').className='format-tab'+(t==='audio'?' active':'');
  document.getElementById('videoFormats').style.display=t==='video'?'grid':'none';
  document.getElementById('audioFormats').style.display=t==='audio'?'grid':'none';
  document.querySelectorAll('.fmt-card').forEach(c=>c.classList.remove('selected'));
  const f=document.querySelector('#'+(t==='video'?'video':'audio')+'Formats .fmt-card');
  if(f){
      f.classList.add('selected');
      selFmt=t==='video'?'mp4':'mp3';
      selQuality='best';
  }
}

function pickFmt(el,fmt,quality){
  document.querySelectorAll('.fmt-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  selFmt=fmt;
  selQuality=quality;
}

async function analyzeUrl(){
  const url=document.getElementById('urlInput').value.trim();
  document.getElementById('errorBox').style.display='none';
  if(!url){showErr('Please paste a YouTube URL first.');return;}
  if(!url.includes('youtube.com')&&!url.includes('youtu.be')){showErr("⚠ That doesn't look like a YouTube URL.");return;}
  const btn=document.getElementById('analyzeBtn');
  btn.disabled=true;btn.innerHTML='<span class="spinner"></span>';
  await delay(1300);
  const vid=getVid(url);
  document.getElementById('vTitle').textContent='Video detected'+(vid?' · ID: '+vid:'');
  document.getElementById('vChannel').textContent='YouTube';
  document.getElementById('vDuration').textContent='—';
  document.getElementById('vViews').textContent='—';
  document.getElementById('vLikes').textContent='—';
  if(vid){
      const img=new Image();
      img.src=`https://img.youtube.com/vi/${vid}/mqdefault.jpg`;
      img.onload=()=>{
          const thumbContainer = document.getElementById('videoThumb');
          thumbContainer.innerHTML='';
          thumbContainer.appendChild(img);
      };
      img.onerror=()=>{
          document.getElementById('videoThumb').innerHTML='🎬';
      };
  }
  show('videoPanel');show('formatSection');
  btn.disabled=false;btn.textContent='Re-analyze';
}

function showErr(m){const b=document.getElementById('errorBox');b.textContent='⚠  '+m;b.style.display='block';}

async function startDownload(){
  if(busy)return;busy=true;
  const url=document.getElementById('urlInput').value.trim();
  document.getElementById('downloadBtn').disabled=true;
  hide('videoPanel');hide('formatSection');show('progressSection');
  document.getElementById('dlFmt').textContent=selFmt.toUpperCase();
  document.getElementById('terminal').innerHTML='';
  
  const tlog=(msg,type='')=>{
    const t=document.getElementById('terminal'),s=document.createElement('span');
    s.className='t-line '+type;s.textContent='› '+msg;
    t.appendChild(s);t.appendChild(document.createTextNode('\n'));t.scrollTop=t.scrollHeight;
  };
  
  tlog('Initializing yt-dlp engine…');
  document.getElementById('pctDisplay').textContent='0%';
  document.getElementById('progressFill').style.width='0%';
  document.getElementById('dlSpeed').textContent='—';
  document.getElementById('dlEta').textContent='—';
  document.getElementById('dlSize').textContent='—';

  // Start fake progress while we wait for the server
  let pct = 0;
  let progressInterval = setInterval(() => {
    if (pct < 90) {
        pct += (90 - pct) * 0.05; // slowly approach 90%
        document.getElementById('progressFill').style.width=pct+'%';
        document.getElementById('pctDisplay').textContent=pct.toFixed(1)+'%';
        
        if(pct>10&&pct<11)tlog('Sending request to server backend...');
        if(pct>30&&pct<31)tlog('Server is downloading stream…');
        if(pct>60&&pct<61)tlog('Processing media…','warn');
    }
  }, 500);

  try {
      const payload = {
          url: url,
          format: selFmt,
          quality: selQuality
      };

      const response = await fetch('/download', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      });

      if (!response.ok) {
          throw new Error('Failed to fetch video. Please check the URL and try again.');
      }

      tlog('Download complete from server, preparing file…', 'warn');
      const blob = await response.blob();
      
      // Extract filename from the Content-Disposition header if possible
      let filename = 'downloaded_video.' + selFmt;
      const disposition = response.headers.get('Content-Disposition');
      
      if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) { 
              // Basic filename parsing
              filename = matches[1].replace(/['"]/g, '');
          }
          
          // Check for UTF-8 encoded filename fallback
          const utf8FilenameRegex = /filename\*=UTF-8''([^;\n]*)/;
          const utf8Matches = utf8FilenameRegex.exec(disposition);
          if (utf8Matches != null && utf8Matches[1]) {
              filename = decodeURIComponent(utf8Matches[1]);
          }
      }

      // Finalize progress
      clearInterval(progressInterval);
      document.getElementById('progressFill').style.width='100%';
      document.getElementById('pctDisplay').textContent='100%';
      tlog('Saving file: ' + filename,'warn');
      tlog('✔ Complete!');
      
      await delay(1000); // Give user a moment to see 100%

      // Create a temporary link to trigger the download in the browser
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

      hide('progressSection');
      document.getElementById('successPath').textContent=filename;
      show('successSection');
      busy=false;
      confetti();

  } catch (error) {
      clearInterval(progressInterval);
      hide('progressSection');
      showErr(error.message);
      busy=false;
      document.getElementById('downloadBtn').disabled=false;
  }
}

function resetAll(){
  document.getElementById('urlInput').value='';
  document.getElementById('analyzeBtn').textContent='Analyze';
  document.getElementById('analyzeBtn').disabled=false;
  document.getElementById('downloadBtn').disabled=false;
  document.getElementById('errorBox').style.display='none';
  document.getElementById('progressFill').style.width='0%';
  document.getElementById('pctDisplay').textContent='0%';
  document.getElementById('videoThumb').innerHTML='🎬';
  ['videoPanel','formatSection','progressSection','successSection'].forEach(hide);
  busy=false;window.scrollTo({top:0,behavior:'smooth'});
}

function getVid(u){const m=u.match(/(?:v=|\/shorts\/|youtu\.be\/)([^&?\/]+)/);return m?m[1]:null;}

function confetti(){
  const c=['#ff2d55','#00d4ff','#ffd60a','#00ffb3','#b44fff','#ff6b35'];
  for(let i=0;i<70;i++){
    const el=document.createElement('div');
    const s=Math.random()*10+4;
    el.style.cssText=`position:fixed;top:50%;left:50%;width:${s}px;height:${s}px;background:${c[Math.floor(Math.random()*c.length)]};border-radius:${Math.random()>.5?'50%':'3px'};pointer-events:none;z-index:99990;`;
    document.body.appendChild(el);
    const a=Math.random()*Math.PI*2,d=180+Math.random()*220;
    el.animate([{transform:'translate(-50%,-50%)scale(1)',opacity:1},{transform:`translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d}px))scale(0)rotate(${Math.random()*720}deg)`,opacity:0}],{duration:800+Math.random()*500,easing:'cubic-bezier(0,0.9,0.57,1)',fill:'forwards'}).onfinish=()=>el.remove();
  }
}

document.getElementById('urlInput').addEventListener('keydown',e=>{if(e.key==='Enter')analyzeUrl();});
