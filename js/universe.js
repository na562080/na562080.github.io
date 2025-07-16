(() => {
  const canvas = document.getElementById('universe');
  const ctx = canvas.getContext('2d');
  let w, h;
  let animationId = null;
  const starCount = 300;
  const radiusMaxFactor = 0.8; // 星轨最大半径相对于屏幕对角线长度比例

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      // 角度从 0 到 π/2，表示四分之一圆弧
      this.angle = Math.random() * Math.PI / 2;
      this.radius = Math.random() * (Math.hypot(w, h) * radiusMaxFactor);
      this.size = Math.random() * 1.5 + 0.5;
      this.speed = 0.0005 + Math.random() * 0.001; // 角速度
      this.opacity = Math.random() * 0.5 + 0.3;
      this.opacityDecay = 0.005; // 透明度变化速率
    }
    update() {
      this.angle += this.speed;
      if (this.angle > Math.PI / 2) {
        this.angle = 0;
        this.radius = Math.random() * (Math.hypot(w, h) * radiusMaxFactor);
      }
    }
    draw() {
      // 圆心在右上角 (w, 0)
      const x = w - Math.cos(this.angle) * this.radius;
      const y = Math.sin(this.angle) * this.radius;
      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.fill();
    }
  }

  let stars = [];

  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }

  function animate() {
    // 半透明黑色覆盖，制造拖尾长曝光效果
    ctx.fillStyle = "rgba(0,0,20,0.2)";
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

  // 暗黑模式显示，白天隐藏（可删）
  function updateDisplay() {
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

  updateDisplay();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDisplay);
})();
