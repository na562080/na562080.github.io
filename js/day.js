window.addEventListener('DOMContentLoaded', function() {
  const d = new Date();
  const m = d.getMonth() + 1;
  const dd = d.getDate();
  const y = d.getFullYear();

  // 使用一个键，存当天日期，避免重复弹窗
  const todayKey = `popupShown_${y}-${m}-${dd}`;
  if (sessionStorage.getItem(todayKey) === "1") return;  // 今天已弹过

  // 公祭日判断
  if (m === 9 && dd === 18) {
    document.documentElement.style.filter = "grayscale(60%)";
    Swal.fire(`今天是九一八事变${y - 1931}周年纪念日\n🪔勿忘国耻，振兴中华🪔`);
    sessionStorage.setItem(todayKey, "1");
    return;
  }
  if (m === 7 && dd === 7) {
    document.documentElement.style.filter = "grayscale(60%)";
    Swal.fire(`今天是卢沟桥事变${y - 1937}周年纪念日\n🪔勿忘国耻，振兴中华🪔`);
    sessionStorage.setItem(todayKey, "1");
    return;
  }
  // 其他类似判断...

  // 测试弹窗，放在最后，如果没任何其他弹窗
  Swal.fire("测试弹窗：脚本运行正常！");
  sessionStorage.setItem(todayKey, "1");
});
