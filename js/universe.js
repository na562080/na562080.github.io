function dark() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var n, e, i, h, t = 0.07, // 增加速度比例，稍快点
        s = document.getElementById("universe"),
        o = true,
        a = "255, 255, 255", // 星星主色改为纯白
        r = "255, 255, 200", // 较亮黄色调流星色
        d = "255, 255, 240", // 流星尾巴色改亮白
        c = [];

    function f() {
        n = window.innerWidth, e = window.innerHeight, i = 0.25 * n; // 星星数量多一点
        s.setAttribute("width", n);
        s.setAttribute("height", e);
    }

    function u() {
        h.clearRect(0, 0, n, e);
        for (var t = c.length, i = 0; i < t; i++) {
            var s = c[i];
            s.move();
            s.fadeIn();
            s.fadeOut();
            s.draw();
        }
    }

    function y() {
        this.reset = function () {
            this.giant = m(4); // 大星星概率增加一点
            this.comet = !this.giant && !o && m(15); // 流星概率增加
            this.x = l(0, n - 10);
            this.y = l(0, e);
            this.r = l(1.5, 3.5); // 星星尺寸变大
            this.dx = l(t, 8 * t) + (this.comet ? t * l(50, 120) + 2 * t : 0);
            this.dy = -l(t, 8 * t) - (this.comet ? t * l(50, 120) : 0);
            this.fadingOut = null;
            this.fadingIn = true;
            this.opacity = 0;
            this.opacityTresh = l(0.5, 1); // 最高透明度更高，亮度更明显
            this.do = l(0.002, 0.005) + 0.002 * (this.comet ? 1 : 0);
        };
        this.fadeIn = function () {
            if (this.fadingIn) {
                this.fadingIn = !(this.opacity > this.opacityTresh);
                this.opacity += this.do;
            }
        };
        this.fadeOut = function () {
            if (this.fadingOut) {
                this.fadingOut = !(this.opacity < 0);
                this.opacity -= this.do / 2;
                if ((this.x > n || this.y < 0)) {
                    this.fadingOut = false;
                    this.reset();
                }
            }
        };
        this.draw = function () {
            h.beginPath();
            if (this.giant) {
                h.fillStyle = "rgba(" + a + "," + this.opacity + ")";
                h.shadowColor = "rgba(255, 255, 255, " + this.opacity + ")";
                h.shadowBlur = 10;
                h.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
            } else if (this.comet) {
                h.fillStyle = "rgba(" + d + "," + this.opacity + ")";
                h.shadowColor = "rgba(255, 255, 255, " + (this.opacity * 0.8) + ")";
                h.shadowBlur = 15;
                h.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
                for (var t = 0; t < 30; t++) {
                    h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")";
                    h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2);
                    h.fill();
                }
            } else {
                h.fillStyle = "rgba(" + r + "," + this.opacity + ")";
                h.shadowColor = "rgba(255, 255, 180, " + this.opacity + ")";
                h.shadowBlur = 6;
                h.rect(this.x, this.y, this.r, this.r);
            }
            h.closePath();
            h.fill();
        };
        this.move = function () {
            this.x += this.dx;
            this.y += this.dy;
            if (this.fadingOut === false) this.reset();
            if (this.x > n - n / 4 || this.y < 0) this.fadingOut = true;
        };
        setTimeout(function () {
            o = false;
        }, 50);
    }

    function m(t) {
        return Math.floor(1000 * Math.random()) + 1 < 10 * t;
    }

    function l(t, i) {
        return Math.random() * (i - t) + t;
    }
    f();
    window.addEventListener("resize", f, false);
    (function () {
        h = s.getContext("2d");
        for (var t = 0; t < i; t++) c[t] = new y(), c[t].reset();
        u();
    })();
    (function t() {
        if (document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark') u();
        window.requestAnimationFrame(t);
    })();
}
dark();
