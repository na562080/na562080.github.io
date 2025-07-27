// themes/butterfly/source/js/title.js

var OriginTitle = document.title;  // 修正变量名拼写
var titleTime;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = ' ◕  _  ◕ ';
        clearTimeout(titleTime);
    } else {
         document.title = OriginTitle;
    }
});

