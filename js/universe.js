(() => {
  const canvas = document.getElementById('universe');
  const ctx = canvas.getContext('2d');
  let w, h;
  let stars = [];
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
      // 角度从0到PI，做半圆
      this.angle = Math.random() * Math.PI;
      this.radius = Math.random() * (Math.min(w, h) / 2);
      this.size = Math.random() * 1.5 + 0.5;
      // 速度非常慢，负数或正数决定旋转方向
      this.speed = (Math.random() * 0.0003 + 0.0001) * (Math.random() > 0.5 ? 1 : -1);
      this.alpha = Math.random() * 0.5 + 0.5;
      this.color = `rgba(255, 255, 255, ${this.alpha})`;
    }
    update() {
      this.angle += this.speed;
      // 保持角度在0~2PI范围内
      if (this.angle > 2 * Math.PI) this.angle -= 2 * Math.PI;
      if (this.angle < 0) this.angle += 2 * Math.PI;
    }
    draw() {
      // 中心点为画布底部中心（极点在下方）
      const centerX = w / 2;
      const centerY = h;
      const x = centerX + Math.cos(this.angle) * this.radius;
      const y = centerY + Math.sin(this.angle) * this.radius;
      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 500; i++) {
      stars.push(new Star());
    }
  }

  function animate() {
    // 半透明黑色覆盖，长曝光拖尾
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
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
    // 先用纯黑色清屏
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
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

  checkThemeAndToggle();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkThemeAndToggle);
})();
