const CONFIG = {
  girlfriendName: "Himanshi✨", //Friend's Name
  AnniversaryDate: "2026-09-21", // Format: YYYY-MM-DD
  openingMessage: "Today is all about celebrating you, my love. Step into this little universe crafted purely with my love for you.",
  
  loveLetter: `My DearestHimanshi,
  
From the moment you entered my life, every single second has turned into a beautiful memory. Your smile lights up my darkest days, and your love gives me strength I never knew I had.

On this special one complete year of yours in my life❤️, I want to remind you how deeply and unconditionally you are loved. May your year ahead be as bright and wonderful as your soul.

Happy 1st Anniversary, My Princess! ❤️`,

galleryImages: [
  "assets/images/sample1.jpeg",
  "assets/images/hello.jpeg",
  "assets/images/sample3.jpeg",
  "assets/images/ok1.jpeg",
  "assets/images/ok2.jpeg",
  "assets/images/ok3.jpeg",
  "assets/images/ok4.jpeg",
  "assets/images/ok6.jpeg"
  
  
  
],



timelineEvents: [
  { date: "10 apr 2026", title: "First Meet ❤️", desc: "The magical day our paths crossed and everything changed." },
  { date: "16 Sept", title: "First insta Chat", desc: "Hours felt like minutes as we talked endlessly." },
  { date: "Everytime We Meets", title: "Best Memory", desc: "Our unforgettable getaway under the starlit sky." },
  { date: "Today ✨", title: "Togetherness of 1 complete Year❤️✅ ", desc: "Celebrating of your incredible existence." }
],

  loveReasons: [
    "Your magical smile",
    "How you laugh at my silly jokes",
    "Your beautiful, kind heart",
    "The warmth of your hugs",
    "Your unwavering support",
    "Simply being YOU ❤️"
  ],

  birthdayWishes: [
    "May all your dreams come true! ✨",
    "Forever grateful for you 💕",
    "To the happiest 1st Anniversary ever! 🎂",
    "You are my absolute world ❤️"
  ],

  giftSurpriseMessage: "🎁 You've unlocked my heart forever! Plus, your real-world surprise gift is waiting right on your bedside table! ❤️",

  music: {
    romanticSong: "assets/music/romantic.mp3",
    birthdaySong: "assets/music/birthday.mp3"
  }
};


document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  activeAudio: null,
  currentTrackType: 'romantic', // 'romantic' or 'birthday'
  isEffectsEnabled: true,

  init() {
    this.setupConfigData();
    this.initCanvases();
    this.setupAudio();
    this.setupEventListeners();
    this.runLoadingScreen();
    this.initCountdown();
    this.initCursorGlow();
  },

  setupConfigData() {
    document.getElementById("welcome-title").innerText = `Happy 1st Anniversary ${CONFIG.girlfriendName} ❤️`;
    document.getElementById("welcome-subtitle").innerText = "My Beautiful Princess";
    document.getElementById("welcome-message").innerText = CONFIG.openingMessage;
    document.getElementById("gift-message").innerText = CONFIG.giftSurpriseMessage;

    // Populate Gallery
    const gallerySlider = document.getElementById("gallery-slider");
    CONFIG.galleryImages.forEach((src, idx) => {
      const slide = document.createElement("div");
      slide.className = "gallery-slide";
      slide.innerHTML = `<img src="${src}" alt="Memory ${idx + 1}" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'" />`;
      slide.addEventListener("click", () => this.openLightbox(slide.querySelector("img").src));
      gallerySlider.appendChild(slide);
    });

    // Populate Timeline
    const timelineContainer = document.getElementById("timeline-container");
    CONFIG.timelineEvents.forEach(item => {
      const el = document.createElement("div");
      el.className = "timeline-item";
      el.innerHTML = `
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      `;
      timelineContainer.appendChild(el);
    });

    // Populate Love Reasons Grid
    const reasonsGrid = document.getElementById("reasons-grid");
    CONFIG.loveReasons.forEach((reason, index) => {
      const card = document.createElement("div");
      card.className = "flip-card";
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-front glass-card">Reason #${index + 1} ❤️</div>
          <div class="flip-back glass-card">${reason}</div>
        </div>
      `;
      card.addEventListener("click", () => card.classList.toggle("flipped"));
      reasonsGrid.appendChild(card);
    });

    // Populate Wishes Wall
    const wishesGrid = document.getElementById("wishes-grid");
    CONFIG.birthdayWishes.forEach(wish => {
      const bubble = document.createElement("div");
      bubble.className = "wish-bubble glass-card";
      bubble.innerText = wish;
      wishesGrid.appendChild(bubble);
    });
  },

  
  initCanvases() {
    this.bgCanvas = document.getElementById("bg-canvas");
    this.bgCtx = this.bgCanvas.getContext("2d");
    this.fxCanvas = document.getElementById("fx-canvas");
    this.fxCtx = this.fxCanvas.getContext("2d");

    this.resizeCanvases();
    window.addEventListener("resize", () => this.resizeCanvases());

    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.bgCanvas.width, this.bgCanvas.height));
    }

    this.fxParticles = [];

    const render = () => {
      this.animateBackground();
      this.animateEffects();
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  },

  resizeCanvases() {
    this.bgCanvas.width = window.innerWidth;
    this.bgCanvas.height = window.innerHeight;
    this.fxCanvas.width = window.innerWidth;
    this.fxCanvas.height = window.innerHeight;
  },

  animateBackground() {
    this.bgCtx.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
    if (!this.isEffectsEnabled) return;

    this.particles.forEach(p => {
      p.update(this.bgCanvas.width, this.bgCanvas.height);
      p.draw(this.bgCtx);
    });
  },

  animateEffects() {
    this.fxCtx.clearRect(0, 0, this.fxCanvas.width, this.fxCanvas.height);
    this.fxParticles.forEach((p, idx) => {
      p.update();
      p.draw(this.fxCtx);
      if (p.alpha <= 0) this.fxParticles.splice(idx, 1);
    });
  },

  triggerConfetti() {
    for (let i = 0; i < 120; i++) {
      this.fxParticles.push(new ConfettiParticle(this.fxCanvas.width, this.fxCanvas.height));
    }
  },

  
  setupAudio() {
    this.audioRomantic = document.getElementById("audio-romantic");
    this.audioBirthday = document.getElementById("audio-birthday");

    this.audioRomantic.src = CONFIG.music.romanticSong;
    this.audioBirthday.src = CONFIG.music.birthdaySong;

    this.activeAudio = this.audioRomantic;

    // Handle Volume Control
    const slider = document.getElementById("volume-slider");
    slider.addEventListener("input", (e) => {
      const vol = e.target.value;
      this.audioRomantic.volume = vol;
      this.audioBirthday.volume = vol;
    });
  },

  playAudio(type) {
    if (this.activeAudio) {
      this.activeAudio.pause();
    }

    if (type === 'romantic') {
      this.activeAudio = this.audioRomantic;
      document.getElementById("track-title").innerText = "Romantic Melody";
    } else {
      this.activeAudio = this.audioBirthday;
      document.getElementById("track-title").innerText = "Happy Birthday Song";
    }

    this.currentTrackType = type;
    if (this.activeAudio.currentTime === 0) {
      this.activeAudio.currentTime = 10;
    }
    
    const playPromise = this.activeAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        document.getElementById("track-status").innerText = "Playing";
        document.getElementById("music-disc-icon").classList.add("spinning");
      }).catch(() => {
        // Autoplay blocked: show fallback modal
        document.getElementById("autoplay-modal").classList.remove("hidden");
        document.getElementById("track-status").innerText = "Paused";
        document.getElementById("music-disc-icon").classList.remove("spinning");
      });
    }
  },

  
  setupEventListeners() {
    // Autoplay unlock button
    document.getElementById("btn-start-experience").addEventListener("click", () => {
      document.getElementById("autoplay-modal").classList.add("hidden");
      this.playAudio('romantic');
    });

    // Theme Switcher
    document.getElementById("btn-theme-toggle").addEventListener("click", () => {
      const body = document.body;
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", newTheme);
    });

    // Toggle Particle Effects
    document.getElementById("btn-particles-toggle").addEventListener("click", () => {
      this.isEffectsEnabled = !this.isEffectsEnabled;
    });

    // Fullscreen Toggle
    document.getElementById("btn-fullscreen").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Music Player Controls
    document.getElementById("btn-play-pause").addEventListener("click", () => {
      if (this.activeAudio.paused) {
        this.activeAudio.play();
        document.getElementById("track-status").innerText = "Playing";
        document.getElementById("music-disc-icon").classList.add("spinning");
      } else {
        this.activeAudio.pause();
        document.getElementById("track-status").innerText = "Paused";
        document.getElementById("music-disc-icon").classList.remove("spinning");
      }
    });

    document.getElementById("btn-switch-track").addEventListener("click", () => {
      const nextTrack = this.currentTrackType === 'romantic' ? 'birthday' : 'romantic';
      this.playAudio(nextTrack);
    });

    // MAIN SURPRISE TRIGGER
    document.getElementById("btn-open-surprise").addEventListener("click", () => {
      this.triggerSurpriseTransition();
    });

    // Interactive Cake Flame
    document.getElementById("interactive-cake").addEventListener("click", () => {
      const flame = document.getElementById("cake-flame");
      flame.classList.add("hidden");
      this.triggerConfetti();
    });

    // Envelope Open
    document.getElementById("envelope").addEventListener("click", () => {
      this.typeWriterEffect();
    });

    // Gift Box Open
    document.getElementById("gift-box").addEventListener("click", () => {
      document.getElementById("gift-box").classList.add("open");
      document.getElementById("gift-modal").classList.remove("hidden");
      this.triggerConfetti();
    });

    document.getElementById("btn-close-gift").addEventListener("click", () => {
      document.getElementById("gift-modal").classList.add("hidden");
    });

    // Gallery Slider Controls
    const slider = document.getElementById("gallery-slider");
    document.getElementById("btn-gallery-prev").addEventListener("click", () => {
      slider.scrollBy({ left: -300, behavior: 'smooth' });
    });
    document.getElementById("btn-gallery-next").addEventListener("click", () => {
      slider.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Lightbox Close
    document.getElementById("lightbox-close").addEventListener("click", () => {
      document.getElementById("lightbox").classList.add("hidden");
    });

    // Final Screen Replay Options
    document.getElementById("btn-replay").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.playAudio('romantic');
    });
    document.getElementById("btn-play-romantic").addEventListener("click", () => this.playAudio('romantic'));
    document.getElementById("btn-play-birthday").addEventListener("click", () => this.playAudio('birthday'));
    document.getElementById("btn-share").addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({ title: 'Happy Birthday!', url: window.location.href });
      } else {
        alert("Copy link to share: " + window.location.href);
      }
    });
  },

  triggerSurpriseTransition() {
    this.triggerConfetti();
    
    // Smooth cross-fade music from Romantic -> Birthday
    this.playAudio('romantic');

    // Scroll smoothly to celebration section
    document.getElementById("sec-birthday-celebration").scrollIntoView({ behavior: "smooth" });
  },
  /* ==========================================================================
     TYPING ANIMATION FOR LOVE LETTER
     ========================================================================== */
  typeWriterEffect() {
    const container = document.getElementById("typewriter-text");
    if (container.getAttribute("data-typed") === "true") return;
    
    container.setAttribute("data-typed", "true");
    container.innerHTML = "";
    const text = CONFIG.loveLetter;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        container.innerHTML += text.charAt(index) === '\n' ? '<br/>' : text.charAt(index);
        index++;
        setTimeout(type, 35);
      } else {
        document.getElementById("btn-download-letter").classList.remove("hidden");
      }
    };
    type();
  },

  /* ==========================================================================
     COUNTDOWN TIMER
     ========================================================================== */
  initCountdown() {
    const targetDate = new Date(CONFIG.birthdayDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        document.getElementById("countdown-timer").classList.add("hidden");
        document.getElementById("special-day-banner").classList.remove("hidden");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById("cd-days").innerText = days < 10 ? '0' + days : days;
      document.getElementById("cd-hours").innerText = hours < 10 ? '0' + hours : hours;
      document.getElementById("cd-minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById("cd-seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  },

  /* ==========================================================================
     LOADING SCREEN ENGINE
     ========================================================================== */
  runLoadingScreen() {
    const progressBar = document.getElementById("progress-bar");
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const loadingScreen = document.getElementById("sec-loading");
          loadingScreen.style.opacity = "0";
          loadingScreen.style.visibility = "hidden";
          document.getElementById("main-content").classList.remove("hidden");
          this.playAudio('romantic');
        }, 500);
      }
    }, 100);
  },

  openLightbox(src) {
    const lb = document.getElementById("lightbox");
    document.getElementById("lightbox-img").src = src;
    lb.classList.remove("hidden");
  },

  initCursorGlow() {
    const cursor = document.getElementById("cursor-glow");
    window.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }
};

/* ==========================================================================
   PARTICLE & CONFETTI CLASSES
   ========================================================================== */
class Particle {
  constructor(w, h) {
    this.reset(w, h);
  }

  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = -Math.random() * 0.8 - 0.2;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update(w, h) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y < 0) this.y = h;
    if (this.x < 0 || this.x > w) this.x = Math.random() * w;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff80ab";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff4081";
    ctx.fill();
    ctx.restore();
  }
}

class ConfettiParticle {
  constructor(w, h) {
    this.x = w / 2;
    this.y = h / 2;
    this.vx = (Math.random() - 0.5) * 12;
    this.vy = (Math.random() - 0.8) * 12;
    this.size = Math.random() * 8 + 4;
    this.color = ["#ff4081", "#9c27b0", "#ffd700", "#00e676", "#00b0ff"][Math.floor(Math.random() * 5)];
    this.alpha = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // Gravity
    this.alpha -= 0.015;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
}