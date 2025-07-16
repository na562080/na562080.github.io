(() => {
  const canvas = document.getElementById('universe');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;
  let animationId = null;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.angle = Math.random() * 2 * Math.PI;
      this.radius = Math.random() * (w / 2);
      this.size = Math.random() * 1.5 + 0.5;
      this.speed = Math.random() * 0.001 + 0.0005;
      this.alpha = Math.random() * 0.5 + 0.3;
      this.color = `rgba(255, 255, 255, ${this.alpha})`;
    }
    update() {
      this.angle += this.speed;
      if (this.radius < 0.5 || this.radius > w / 2) this.reset();
    }
    draw() {
      const x = w / 2 + Math.cos(this.angle) * this.radius;
      const y = h / 2 + Math.sin(this.angle) * this.radius;
      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 800; i++) {
      stars.push(new Star());
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 10, 0.2)";
    ctx.fillRect(0, 0, w, h);
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    animationId = requestAnimationFrame(animate);
  }

  function start() {
    resize();
    initStars();
    animate();
  }

  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    ctx.clearRect(0, 0, w, h);
  }

  function checkThemeAndToggle() {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      canvas.style.display = 'block';
      if (!animationId) start();
    } else {
      canvas.style.display = 'none';
      stop();
    }
  }

  window.addEventListener('resize', () => {
    resize();
  });

  // 初始判断并启动或隐藏
  checkThemeAndToggle();

  // 监听主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkThemeAndToggle);
})();
