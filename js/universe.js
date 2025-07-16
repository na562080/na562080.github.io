const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');
let width, height;
let centerX, centerY;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  centerX = width / 2;
  centerY = height / 2;
}
resize();
window.addEventListener('resize', resize);

const numTracks = 6; // 轨迹数量
const starsPerTrack = 30; // 每条轨迹星星数量
const tracks = [];

for(let i=0; i<numTracks; i++) {
  tracks.push({
    radius: 40 + i*30,
    stars: []
  });
  for(let j=0; j<starsPerTrack; j++) {
    tracks[i].stars.push({
      angle: (2 * Math.PI / starsPerTrack) * j,
      speed: 0.002 + 0.001 * i // 不同轨道速度不同
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;

  tracks.forEach(track => {
    // 画轨迹弧线（半圆）
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${0.1})`;
    ctx.arc(centerX, centerY, track.radius, Math.PI/2, 3*Math.PI/2);
    ctx.stroke();

    // 画星点
    track.stars.forEach(star => {
      star.angle += star.speed;
      if(star.angle > 2*Math.PI) star.angle -= 2*Math.PI;

      // 计算星星位置
      let x = centerX + track.radius * Math.cos(star.angle);
      let y = centerY + track.radius * Math.sin(star.angle);

      // 只显示半圆上半部分星星（y <= centerY）
      if(y <= centerY) {
        let opacity = 0.8 + 0.2 * Math.sin(star.angle * 5); // 闪烁效果
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(2)})`;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 6;
        ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  });

  requestAnimationFrame(draw);
}

draw();
