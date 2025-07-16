function dark() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var n, e, h, t = 0.0025,
        s = document.getElementById("universe"),
        c = [],
        linesCount = 40,
        pointsPerLine = 50,
        maxRadius;

    function f() {
        n = window.innerWidth;
        e = window.innerHeight;
        maxRadius = Math.min(n, e) * 0.45;
        s.setAttribute("width", n);
        s.setAttribute("height", e);
    }

    // 线条类
    function Line() {
        this.centerX = n; // 右上角
        this.centerY = 0;

        this.points = [];
        this.radius = 0;
        this.speed = 0;
        this.init = function(index) {
            this.radius = maxRadius * (index / linesCount);
            this.speed = t + Math.random() * 0.0015;
            this.points = [];
            var startAngle = Math.random() * (Math.PI / 2);
            for (var i = 0; i < pointsPerLine; i++) {
                // 点角度递减，尾巴形成拖尾
                this.points.push({
                    angle: (startAngle - i * 0.01 + Math.PI * 2) % (Math.PI / 2)
                });
            }
        };
        this.move = function() {
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].angle = (this.points[i].angle + this.speed) % (Math.PI / 2);
            }
        };
        this.fadeIn = function() {};  // 保留接口，没用透明度动画这里单纯用渐变
        this.fadeOut = function() {};
        this.draw = function() {
            h.beginPath();
            for (var i = 0; i < this.points.length; i++) {
                var pt = this.points[i];
                var x = this.centerX + Math.cos(pt.angle) * this.radius;
                var y = this.centerY + Math.sin(pt.angle) * this.radius;
                var alpha = i / this.points.length * 0.8; // 透明度递增，尾部渐隐
                h.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
                h.lineWidth = 1.2;
                if (i === 0) h.moveTo(x, y);
                else h.lineTo(x, y);
            }
            h.stroke();
        };
    }

    function u() {
        // 用半透明黑覆盖，保留拖尾效果
        h.fillStyle = 'rgba(0,0,10,0.1)';
        h.fillRect(0, 0, n, e);

        for (var i = 0; i < c.length; i++) {
            var line = c[i];
            line.move();
            line.fadeIn();
            line.fadeOut();
            line.draw();
        }
    }

    f();

    window.addEventListener("resize", f, false);

    (function init() {
        h = s.getContext("2d");
        c = [];
        for (var i = 0; i < linesCount; i++) {
            var line = new Line();
            line.init(i);
            c.push(line);
        }
        u();
    })();

    (function animate() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            u();
        } else {
            h.clearRect(0, 0, n, e);
        }
        window.requestAnimationFrame(animate);
    })();
}

dark();
