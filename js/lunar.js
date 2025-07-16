var lunarInfo = [
  19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,
  19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,
  18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,
  25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,
  54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,
  27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,
  44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,
  38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,
  38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,
  19189,18800,25776,29859,59984,27480,23232,43872,38613,37600,
  51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,
  43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,
  31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,
  23200,30371,38608,19195,19152,42192,118966,53840,54560,56645,
  46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,
  84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,
  41696,53987,51552,54615,54432,55888,23893,22176,42704,21972,
  21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,
  45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,
  59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560
];

var solarMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

function lYearDays(y) {
  var i, sum = 348;
  for(i=0x8000; i>0x8; i>>=1) {
    sum += (lunarInfo[y-1900] & i) ? 1 : 0;
  }
  return sum + leapDays(y);
}

function leapMonth(y) {
  return lunarInfo[y-1900] & 0xf;
}

function leapDays(y) {
  if(leapMonth(y)) {
    return (lunarInfo[y-1900] & 0x10000) ? 30 : 29;
  }
  return 0;
}

function monthDays(y,m) {
  return (lunarInfo[y-1900] & (0x10000 >> m)) ? 30 : 29;
}

function solarDays(y,m) {
  if(m === 2) {
    return ( (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0) ) ? 29 : 28;
  }
  return solarMonth[m-1];
}

function solar2lunar(y,m,d) {
  var i, temp = 0, leap = 0, isLeap = false;
  var offset = 0;
  
  var baseDate = new Date(1900,0,31);
  var objDate = new Date(y,m-1,d);
  offset = Math.floor((objDate - baseDate)/86400000);
  
  for(i=1900; i<2101 && offset>0; i++) {
    temp = lYearDays(i);
    offset -= temp;
  }
  
  if(offset < 0) {
    offset += temp;
    i--;
  }
  
  leap = leapMonth(i);
  var lunarYear = i;
  var lunarMonth = 1;
  var lunarDay = 1;
  
  for(i=1; i<13 && offset>0; i++) {
    if(leap > 0 && i === (leap + 1) && !isLeap) {
      --i;
      isLeap = true;
      temp = leapDays(lunarYear);
    } else {
      temp = monthDays(lunarYear, i);
    }
    
    if(isLeap && i === (leap + 1)) {
      isLeap = false;
    }
    
    offset -= temp;
    lunarMonth = i;
  }
  
  if(offset === 0 && leap > 0 && lunarMonth === leap + 1) {
    if(isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      --lunarMonth;
    }
  }
  
  if(offset < 0) {
    offset += temp;
    --lunarMonth;
  }
  
  lunarDay = offset + 1;
  
  return {
    lunarYear: lunarYear,
    lunarMonth: lunarMonth,
    lunarDay: lunarDay,
    isLeap: isLeap
  };
}
