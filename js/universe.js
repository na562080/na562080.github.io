(() => {
  const canvas = document.getElementById('universe');
  const ctx = canvas.getContext('2d');
  let w, h;
  const center = { x: 0, y: 0 };
  let animationId;

  const linesCount = 30;
  const pointsPerLine = 40;
  const maxRadius = 300;

  let lines = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    center.x = w;
    center.y = 0;
  }

  function initLines() {
    lines = [];
    for (let i = 0; i < linesCount; i++) {
      const radius = maxRadius * (i / linesCount);
      const speed = 0.002 + Math.random() * 0.001;
      let startAngle = Math.random() * Math.PI / 2;
      let points = [];
      for (let p = 0; p < pointsPerLine; p++) {
        points.push({
          angle: (startAngle - p * 0.01 + Math.PI * 2) % (Math.PI / 2),
          radius,
        });
      }
      lines.push({ points, radius, speed });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';

    lines.forEach(line => {
      line.points.forEach(pt => {
        pt.angle = (pt.angle + line.speed) % (Math.PI / 2);
      });

      ctx.beginPath();
      for (let i = 0; i < line.points.length; i++) {
        const pt = line.points[i];
        const x = center.x + Math.cos(pt.angle) * pt.radius;
        const y = center.y + Math.sin(pt.angle) * pt.radius;
        const alpha = i / line.points.length;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  function animate() {
    draw();
    animationId = requestAnimationFrame(animate);
  }

  function start() {
    resize();
    initLines();
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

  // 监听 data-theme 属性变化
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-theme'
      ) {
        checkThemeAndToggle();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // 初始化调用一次
  checkThemeAndToggle();
})();
