// themes/butterfly/source/js/title.js

var OriginTitle = document.title;  // 修正变量名拼写
var titleTime;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = '(＾▽＾)ノ 拜拜啦～';
        clearTimeout(titleTime);
    } else {
        document.title = '♪(^∇^*) 欢迎回来！ ' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});



function shareLink() {
  const url = window.location.origin + window.location.pathname;
  const text = `标题：${document.title}\n链接：${url}`;

  navigator.clipboard.writeText(text).then(() => {
    if (typeof btf !== 'undefined' && btf.snackbarShow) {
      btf.snackbarShow('本页链接已复制到剪切板，快去分享吧~');
    } else {
      alert('复制成功！');
    }
  }).catch(err => {
    alert('复制失败，请手动复制链接');
    console.error(err);
  });
}
