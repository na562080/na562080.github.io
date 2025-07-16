function dark() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var n, e, i, h, // 宽高及画布上下文
        t = 0.0025, // 基础速度
        s = document.getElementById("universe"),
        o = true,
        a = "180,184,240", // 颜色配置，可按需改
        r = "226,225,142",
        d = "226,225,224",
        c = [];

    function f() {
        n = window.innerWidth;
        e = window.innerHeight;
        i = Math.floor(0.216 * n); // 星轨条数，稍微改成整数
        s.setAttribute("width", n);
        s.setAttribute("height", e);
    }

    function u() {
        // 透明黑覆盖，形成拖尾
        h.fillStyle = 'rgba(0,0,10,0.05)';
        h.fillRect(0, 0, n, e);

        for (var t = c.length, i = 0; i < t; i++) {
            var line = c[i];
            line.move();
            line.draw();
        }
    }

    // 星轨线条类
    function Line() {
        this.centerX = n; // 旋转中心，右上角
        this.centerY = 0;
        this.points = [];
        this.radius = 0;
        this.speed = 0;
        this.init = function(index) {
            this.radius = Math.min(n, e) * 0.45 * (index / i);
            this.speed = t + Math.random() * 0.0015;
            this.points = [];
            var startAngle = Math.random() * (Math.PI / 2);
            for (var p = 0; p < 50; p++) { // 每条轨迹50个点
                this.points.push({
                    angle: (startAngle - p * 0.012 + Math.PI * 2) % (Math.PI / 2)
                });
            }
        };
        this.move = function() {
            for (var p = 0; p < this.points.length; p++) {
                this.points[p].angle = (this.points[p].angle + this.speed) % (Math.PI / 2);
            }
        };
        this.draw = function() {
            h.beginPath();
            for (var p = 0; p < this.points.length; p++) {
                var pt = this.points[p];
                var x = this.centerX + Math.cos(pt.angle) * this.radius;
                var y = this.centerY + Math.sin(pt.angle) * this.radius;
                var alpha = (p + 1) / this.points.length * 0.8;
                h.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
                h.lineWidth = 1.2;
                if (p === 0) h.moveTo(x, y);
                else h.lineTo(x, y);
            }
            h.stroke();
        };
    }

    f();

    window.addEventListener("resize", f, false);

    (function init() {
        h = s.getContext("2d");
        c = [];
        for (var idx = 0; idx < i; idx++) {
            var line = new Line();
            line.init(idx);
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
