(() => {
  const canvas = document.getElementById('universe');
  const ctx = canvas.getContext('2d');
  let w, h;
  let animationId = null;
  const center = { x: 0, y: 0 }; // 右上角极点，(0,0) 代表画布左上，改成右上角如下
  const starsCount = 150;

  // 星星数组，每颗星带轨迹点数组
  let stars = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    center.x = w; // 右上角 x = 画布宽度
    center.y = 0; // 右上角 y = 0
  }

  class Star {
    constructor() {
      this.reset();
      this.history = []; // 轨迹点历史
      this.maxHistory = 50; // 轨迹长度
    }

    reset() {
      // 距极点半径，控制星星轨迹半径
      this.radius = Math.random() * (w / 2);
      // 角度初始化，靠近右上角从0到PI/2
      this.angle = Math.random() * (Math.PI / 2);
      // 角速度，影响轨迹快慢
      this.speed = (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
      // 星星大小
      this.size = Math.random() * 1.2 + 0.8;
      // 轨迹历史清空
      this.history = [];
    }

    update() {
      this.angle += this.speed;
      if (this.angle > Math.PI / 2) this.angle -= Math.PI / 2;
      if (this.angle < 0) this.angle += Math.PI / 2;

      // 计算当前星星位置
      this.x = center.x + Math.cos(this.angle) * this.radius;
      this.y = center.y + Math.sin(this.angle) * this.radius;

      // 记录轨迹点
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxHistory) this.history.shift();
    }

    draw() {
      // 画轨迹
      ctx.beginPath();
      for (let i = 0; i < this.history.length - 1; i++) {
        const p1 = this.history[i];
        const p2 = this.history[i + 1];
        const alpha = i / this.history.length; // 越旧越透明

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.closePath();

      // 画星星本体
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push(new Star());
    }
  }

  function animate() {
    // 透明度极低清空，不遮挡背景
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
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

  window.addEventListener('resize', resize);
  checkThemeAndToggle();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkThemeAndToggle);
})();
