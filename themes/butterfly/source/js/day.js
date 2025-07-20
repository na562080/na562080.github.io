window.addEventListener('DOMContentLoaded', function() {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const dd = d.getDate();

  const todayKey = `popupShown_${y}-${m}-${dd}`;
  if (sessionStorage.getItem(todayKey) === "1") return;

  const lunar = solar2lunar(y, m, dd);
  const lm = lunar.lMonth;
  const ld = lunar.lDay;
  const isLeap = lunar.isLeap;

  if (!isLeap) {
    switch(`${lm}-${ld}`) {
      case '1-1':
        Swal.fire({
          title: '春节快乐！',
          html: '农历新年第一天，新的开始，祝你新春吉祥，阖家幸福！'
        });
        break;
      case '1-15':
        Swal.fire({
          title: '元宵节快乐！',
          html: '正月十五，赏花灯，吃汤圆，团圆美满。'
        });
        break;
      case '2-2':
        Swal.fire({
          title: '龙抬头节气！',
          html: '二月初二，龙抬头，春耕开始，祝福丰收！'
        });
        break;
      case '5-5':
        Swal.fire({
          title: '端午节安康！',
          html: '五月初五，赛龙舟，吃粽子，纪念屈原。'
        });
        break;
      case '8-15':
        Swal.fire({
          title: '中秋节快乐！',
          html: '八月十五，赏月吃月饼，阖家团圆。'
        });
        break;
      case '12-23':
      case '12-24':
        Swal.fire({
          title: '小年快乐！',
          html: '腊月二十三/二十四，年俗清扫，辞旧迎新。'
        });
        break;
      case '12-29':
      case '12-30':
        Swal.fire({
          title: '除夕夜！',
          html: '辞旧迎新，守岁祈福，迎接新年。'
        });
        break;
      default:
        // 其他日子不弹窗
        return;
    }
    sessionStorage.setItem(todayKey, "1");
  }
});
