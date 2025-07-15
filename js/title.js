// themes/butterfly/source/js/title.js

var OriginTitle = document.title;  // 修正变量名拼写
var titleTime;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = '(＾▽＾)ノ ';
        clearTimeout(titleTime);
    } else {
        document.title = '♪(^∇^*) 欢迎回来！ ' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});

