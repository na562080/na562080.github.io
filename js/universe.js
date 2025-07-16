function dark() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  var n, e, i, h,
      s = document.getElementById("universe"),
      animationId = null;

  // 配置参数
  var linesCount = 40;       // 星轨条数
  var pointsPerLine = 50;    // 每条星轨上点的数量，形成拖尾
  var maxRadius = 350;       // 最大半径
  var speedBase = 0.003;     // 旋转基速

  var lines = [];

  function resize() {
    n = window.innerWidth;
    e = window.innerHeight;
    s.width = n;
    s.height = e;
  }

  // 初始化星轨线条数据
  function initLines() {
    lines = [];
    for (let i = 0; i < linesCount; i++) {
      let radius = maxRadius * (i / linesCount);
      let speed = speedBase + Math.random() * 0.002; // 每条速度略有不同
      let startAngle = Math.random() * (Math.PI / 2);
      let points = [];
      for (let p = 0; p < pointsPerLine; p++) {
        // 每个点角度递减形成尾巴（长曝光轨迹）
        points.push({
          angle: (startAngle - p * 0.012 + Math.PI * 2) % (Math.PI / 2),
          radius: radius
        });
      }
      lines.push({ points, radius, speed });
    }
  }

  // 绘制星轨线条
  function draw() {
    // 只清除画布，不绘制全黑底，避免覆盖背景图
    h.clearRect(0, 0, n, e);
    h.lineCap = 'round';

    // 星轨中心右上角 (n, 0)
    const centerX = n;
    const centerY = 0;

    for (let line of lines) {
      // 先更新所有点角度
      for (let pt of line.points) {
        pt.angle = (pt.angle + line.speed) % (Math.PI / 2);
      }

      // 逐点连线形成拖尾效果
      h.beginPath();
      for (let i = 0; i < line.points.length; i++) {
        let pt = line.points[i];
        let x = centerX + Math.cos(pt.angle) * pt.radius;
        let y = centerY + Math.sin(pt.angle) * pt.radius;
        // 透明度递减，尾部更淡
        let alpha = (i + 1) / line.points.length * 0.8;
        h.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        h.lineWidth = 1.2;

        if (i === 0) h.moveTo(x, y);
        else h.lineTo(x, y);
      }
      h.stroke();
    }
  }

  function animate() {
    draw();
    animationId = window.requestAnimationFrame(animate);
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
    h.clearRect(0, 0, n, e);
  }

  // 主题检测，切换动画显示
  function checkTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      s.style.display = 'block';
      if (!animationId) start();
    } else {
      s.style.display = 'none';
      stop();
    }
  }

  window.addEventListener('resize', resize);

  const observer = new MutationObserver(() => {
    checkTheme();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // 初始化
  h = s.getContext("2d");
  checkTheme();
}

dark();
