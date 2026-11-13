/* 《眼镜蛇效应 · 越悬赏越泛滥》 · World B 寓言插画风 · 32.0 秒 · 1920x1080 30fps
 * 典故：英国殖民统治印度德里期间（约 1900 年前后的经典经济学寓言，由经济学家 Horst Siebert 命名为 Cobra Effect）：
 *   政府为消灭毒蛇悬赏“每交一条死眼镜蛇赏银币一枚”；结果市民纷纷在家建笼孵蛇换取赏金；
 *   当政府察觉端倪取消悬赏后，养蛇人将毫无价值的眼镜蛇全部放生街头，导致全城毒蛇数量比悬赏前翻倍失控。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, fade, rng, rgba } = VK;
const K = VKit;

const T = { s2: 5.6, s3: 11.6, s4: 18.8, s5: 25.8, end: 32.0 };

const SUBS = [
  { a: 0.4,  b: 2.8,  zh: '1900 年，印度德里，毒蛇泛滥成灾' },
  { a: 3.1,  b: 5.3,  zh: '总督头疼不已，想出了一个{聪明办法}' },
  { a: 5.9,  b: 8.6,  zh: '贴出告示：每上交一条死蛇，{赏银币一枚}' },
  { a: 8.9,  b: 11.3, zh: '重赏之下，街上的野蛇很快少了一半' },
  { a: 11.9, b: 15.0, zh: '但聪明人算了一笔账：抓野蛇太累，不如{在家养蛇}' },
  { a: 15.3, b: 18.5, zh: '越赏越养，后院的木笼里孵出了{成千上万条蛇}' },
  { a: 19.1, b: 22.0, zh: '总督发现银库被掏空，立刻宣布{!取消悬赏}' },
  { a: 22.3, b: 25.5, zh: '蛇不值钱了，养蛇人打开笼门，把蛇{!全部放生上街}' },
  { a: 26.3, b: 31.4, zh: '当你只考核一个指标，人们就会{!制造问题来换取奖励}', tone: 'gold' },
];

/* 关键帧平滑插值：用于左上角仪表盘读数 */
function K3(t, pts) {
  let i = 0;
  while (i < pts.length - 2 && t >= pts[i + 1][0]) i++;
  const p = pts[i], q = pts[i + 1];
  return lerp(p[1], q[1], E.io3(seg(t, p[0], q[0])));
}

/* ---------- 扁平插画核心角色：一条眼镜蛇（带膨胀颈兜、眼镜斑纹、S形摆动与吐信子动画） ---------- */
function drawCobra(fr, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a;
  if (a <= 0.01) return;
  const dir = o.dir || 1;
  const phase = o.phase || 0;
  const t = o.t || 0;
  const sway = o.dead ? 0 : Math.sin(t * 4.2 + phase) * 9;
  const tongue = o.dead ? 0 : Math.max(0, Math.sin(t * 11 + phase * 2.3));
  const bodyCol = o.alert ? '#86372A' : '#4C6438';
  const darkCol = o.alert ? '#561E16' : '#334624';
  const bellyCol = '#DEC88A';

  fr.g({ at: [x, y], s: [dir * s, s], a }, () => {
    if (o.dead) {
      // 死蛇状态：平躺翻转、头耷拉、眼睛画 X
      fr.ellipse(0, 12, 92, 12, { fill: '#000000', a: 0.25 });
      fr.path('M -78,4 Q -40,-18 0,4 Q 42,22 76,-2', { color: bodyCol, w: 20, cap: 'round' });
      fr.path('M -72,8 Q -40,-12 0,8 Q 42,26 70,2', { color: bellyCol, w: 8, cap: 'round' });
      fr.ellipse(78, -2, 22, 14, { fill: bodyCol });
      fr.line(76, -8, 86, 2, { color: '#1E1A17', w: 3 });
      fr.line(86, -8, 76, 2, { color: '#1E1A17', w: 3 });
      fr.path('M 98,0 L 118,8 M 112,5 L 122,2 M 112,5 L 120,12', { color: '#E8402A', w: 2.8, cap: 'round' });
      return;
    }

    // 地面投影
    fr.ellipse(0, 10, 74, 14, { fill: '#000000', a: 0.26 });

    // 盘踞蛇尾（双层盘绕）
    fr.ellipse(-10, -3, 62, 18, { fill: darkCol });
    fr.ellipse(-2, 2, 52, 15, { fill: bodyCol });
    fr.path('M -42,2 Q -2,12 38,2', { color: bellyCol, w: 6, cap: 'round', a: 0.85 });

    // S 形立起的蛇身位置
    const hx = 10 + sway * 0.7;
    const hy = -94 + Math.cos(t * 4.2 + phase) * 4;

    // 1. 先画下半段连接盘尾与颈兜底部的蛇躯干（在颈兜底层）
    fr.path(`M -12,0 Q ${-8 + sway * 0.35},-36 ${hx},${hy + 32}`, { color: darkCol, w: 24, cap: 'round' });
    fr.path(`M -12,0 Q ${-8 + sway * 0.35},-36 ${hx},${hy + 32}`, { color: bodyCol, w: 18, cap: 'round' });

    // 2. 再画膨胀眼镜蛇颈兜（Hood）与正面腹鳞纹理
    fr.g({ at: [hx, hy + 18], rot: sway * 0.015 }, () => {
      fr.ellipse(0, 0, 40, 46, { fill: darkCol });
      fr.ellipse(0, 0, 33, 39, { fill: bodyCol });
      fr.ellipse(0, 6, 17, 29, { fill: bellyCol, a: 0.92 });
      // 腹鳞横纹
      for (let k = -10; k <= 22; k += 8) {
        fr.line(-12, k, 12, k, { color: '#B39856', w: 1.6, a: 0.7 });
      }
      // 颈兜两侧经典“眼镜”斑纹
      fr.circle(-18, -6, 6.5, { color: '#2B2118', w: 2.2, fill: '#F5E8C8' });
      fr.circle(18, -6, 6.5, { color: '#2B2118', w: 2.2, fill: '#F5E8C8' });
      fr.circle(-18, -6, 2.5, { fill: '#1E1610' });
      fr.circle(18, -6, 2.5, { fill: '#1E1610' });
    });

    // 3. 最上层：蛇头、警觉竖瞳双眼与前方分叉红信子
    fr.g({ at: [hx, hy - 10], rot: sway * 0.012 }, () => {
      if (tongue > 0.05) {
        const tl = 18 + tongue * 24;
        fr.path(`M 20,2 L ${20 + tl},2 M ${20 + tl - 7},2 L ${20 + tl + 8},-6 M ${20 + tl - 7},2 L ${20 + tl + 8},10`, {
          color: '#FF4630', w: 3.2, cap: 'round'
        });
      }
      fr.ellipse(4, 0, 25, 16, { fill: darkCol });
      fr.ellipse(4, -1, 22, 13, { fill: bodyCol });
      // 琥珀色蛇眼与竖瞳
      fr.circle(12, -3, 5.8, { fill: '#F7BD42', color: '#1E1610', w: 1.5 });
      fr.ellipse(13, -3, 1.8, 4.4, { fill: '#140E0A' });
      // 愤怒眉骨线
      fr.line(6, -9, 18, -6, { color: darkCol, w: 2.5, cap: 'round' });
    });
  });
}

/* ---------- 一枚或一摞银币 ---------- */
function drawCoin(fr, x, y, r, a = 1) {
  if (a <= 0.01) return;
  fr.g({ at: [x, y], a }, () => {
    fr.circle(0, 3, r, { fill: '#000000', a: 0.25 });
    fr.circle(0, 0, r, { fill: '#DCE4EC' });
    fr.circle(0, 0, r * 0.84, { color: '#8C9AA8', w: 2, fill: '#F2F6FA' });
    fr.text('₹1', 0, 1, { font: 'sansh', size: r * 0.88, color: '#536273' });
  });
}

function drawCoinStack(fr, x, y, n, a = 1) {
  if (a <= 0.01 || n <= 0) return;
  fr.g({ a }, () => {
    fr.ellipse(x, y + 8, 36, 11, { fill: '#000000', a: 0.28 });
    for (let i = 0; i < n; i++) {
      const cy = y - i * 11;
      fr.ellipse(x, cy + 4, 32, 10, { fill: '#8E9FAD' });
      fr.rect(x - 32, cy, 64, 5, { fill: '#8E9FAD' });
      fr.ellipse(x, cy, 32, 10, { fill: i === n - 1 ? '#F4F8FC' : '#D5E0EA', color: '#6E7F8E', w: 1.5 });
    }
  });
}

/* ---------- 德里街头背景（暖砂岩拱廊 + 砖墙 + 石板路） ---------- */
function drawDelhiStreet(fr, o = {}) {
  const skyTop = o.alert ? '#3A1D1B' : '#43332A';
  const skyBot = o.alert ? '#261312' : '#2B211B';
  const x = fr.x, g = x.createLinearGradient(0, 0, 0, 740);
  g.addColorStop(0, skyTop);
  g.addColorStop(1, skyBot);
  fr.rect(0, 0, W, H, { fill: g });

  // 远景砂岩建筑轮廓与印度穹顶
  fr.rect(80, 180, 1760, 540, { fill: '#A96B49' });
  fr.rect(80, 170, 1760, 18, { fill: '#7E4B30' });
  // 拱门列柱
  for (let i = 0; i < 5; i++) {
    const ax = 240 + i * 360;
    fr.rect(ax - 75, 290, 150, 260, { r: 75, fill: '#5E3824' });
    fr.rect(ax - 65, 305, 130, 245, { r: 65, fill: '#3A2318' });
  }
  // 砖墙纹理横线
  for (let i = 0; i < 7; i++) {
    fr.line(80, 220 + i * 72, 1840, 220 + i * 72, { color: '#8A5236', w: 2, a: 0.55 });
  }
  // 地面石板街与台阶
  fr.rect(0, 680, W, 400, { fill: '#4E3D30' });
  fr.rect(0, 672, W, 14, { fill: '#7A604B' });
  for (let i = 0; i < 12; i++) {
    fr.line(i * 170, 686, i * 170 - 90, H, { color: '#3B2D23', w: 2, a: 0.45 });
  }
}

/* ---------- S1（0.0–5.6s）：1900 印度德里，街头毒蛇泛滥 ---------- */
function s1(fr, t) {
  drawDelhiStreet(fr);

  // 右上年份地标铭牌
  const ha = ss(t, 0.3, 1.0);
  fr.g({ a: ha }, () => {
    fr.rect(1470, 48, 380, 96, { r: 12, fill: '#1C1510', a: 0.82 });
    fr.rect(1470, 48, 380, 96, { r: 12, color: '#C8A464', w: 1.5, a: 0.6 });
    fr.text('1900 · 印度德里', 1660, 82, { font: 'sansh', size: 28, color: '#EEC672' });
    fr.text('英属殖民总督辖区 · 街头实录', 1660, 118, { font: 'sans', size: 20, color: '#C4B7A6' });
  });

  // 街头的 4 条大眼镜蛇，吐着信子游走
  const snakes = [
    { x0: 460, x1: 540, y: 745, s: 1.15, dir: 1,  ph: 0.0 },
    { x0: 850, x1: 780, y: 790, s: 1.32, dir: -1, ph: 1.7 },
    { x0: 1180, x1: 1260, y: 752, s: 1.20, dir: 1, ph: 3.1 },
    { x0: 1520, x1: 1440, y: 805, s: 1.25, dir: -1, ph: 4.5 },
  ];
  for (const sn of snakes) {
    const k = seg(t, 0, T.s2);
    const sx = lerp(sn.x0, sn.x1, k);
    drawCobra(fr, sx, sn.y, sn.s, { t, dir: sn.dir, phase: sn.ph });
  }

  // 3.1s 弹出“总督的聪明办法？”气泡
  const ideaA = ss(t, 3.1, 3.6);
  if (ideaA > 0) {
    fr.g({ at: [960, 310], s: lerp(0.75, 1, E.out3(ideaA)), a: ideaA }, () => {
      fr.rect(-260, -70, 520, 140, { r: 20, fill: '#221A14', color: '#EEC672', w: 3 });
      fr.text('总督的如意算盘：', 0, -24, { font: 'sans', size: 24, color: '#D8CFBF' });
      fr.text('“直接花钱请全城百姓抓蛇！”', 0, 24, { font: 'sansh', size: 32, color: '#EEC672' });
    });
  }
}

/* ---------- S2（5.6–11.6s）：贴出悬赏令（1 条死蛇 = 1 枚银币），街面野蛇骤减 ---------- */
function s2(fr, t) {
  drawDelhiStreet(fr);

  // 墙中央巨幅木牌《总督府悬赏令》
  const boardIn = E.out3(seg(t, T.s2, T.s2 + 0.55));
  fr.g({ at: [960, 370], s: lerp(0.82, 1.0, boardIn), a: boardIn }, () => {
    fr.rect(-450, -220, 900, 420, { r: 18, fill: '#3A2618' });
    fr.rect(-432, -202, 864, 384, { r: 12, fill: '#EFE3C8', color: '#8A6642', w: 3 });
    fr.rect(-220, -242, 440, 54, { r: 10, fill: '#241810', color: '#CFA55E', w: 2 });
    fr.text('总督府除蛇悬赏令', 0, -214, { font: 'sansh', size: 30, color: '#EEC672', track: 4 });

    // 左：上交死蛇一条
    fr.rect(-380, -140, 310, 230, { r: 12, fill: '#E2D2B0', color: '#B49A6E', w: 2 });
    drawCobra(fr, -235, -30, 1.05, { dead: true });
    fr.text('每交 1 条死眼镜蛇', -225, 52, { font: 'sansh', size: 26, color: '#3A2A1D' });

    // 中：等于号与箭头
    fr.path('M -35,-35 L 35,-35 M -35,-10 L 35,-10', { color: '#C8402A', w: 8, cap: 'round' });
    fr.text('立领赏金', 0, 36, { font: 'sansh', size: 22, color: '#C8402A' });

    // 右：赏银币一枚
    fr.rect(70, -140, 310, 230, { r: 12, fill: '#E2D2B0', color: '#B49A6E', w: 2 });
    drawCoin(fr, 225, -42, 54, 1);
    fr.text('立赏 1 枚纯银卢比', 225, 52, { font: 'sansh', size: 26, color: '#2B5B3C' });

    // 底部说明条
    fr.text('不问来源 · 见蛇发钱 · 上不封顶', 0, 138, { font: 'sansm', size: 25, color: '#6E5239', track: 3 });
  });

  // 街面野蛇数量在 7.5s..10.5s 逐条消失（被抓走换成了银币摞）
  const slots = [
    { x: 470, y: 780, catchT: 7.2 },
    { x: 780, y: 805, catchT: 8.2 },
    { x: 1140, y: 805, catchT: 9.2 },
    { x: 1470, y: 780, catchT: 99 }, // 最后一条留在街角
  ];
  for (let i = 0; i < slots.length; i++) {
    const s = slots[i];
    const gone = ss(t, s.catchT, s.catchT + 0.45);
    if (gone < 1) {
      drawCobra(fr, s.x, s.y, 1.05 * (1 - gone * 0.4), { t, dir: i % 2 ? -1 : 1, phase: i * 1.5, a: 1 - gone });
    }
    if (gone > 0) {
      drawCoinStack(fr, s.x, s.y - 10, 4, gone);
      fr.text('已捕杀 +₹1', s.x, s.y - 78, { font: 'sansh', size: 22, color: '#EEC672', a: gone });
    }
  }
}

/* ---------- S3（11.6–18.8s）：后院秘密养蛇坊，木笼孵蛇套利 ---------- */
function s3(fr, t) {
  // 幽暗后院木屋背景
  fr.rect(0, 0, W, H, { fill: '#1E1713' });
  for (let i = 0; i < 8; i++) {
    fr.line(0, 110 + i * 110, W, 110 + i * 110, { color: '#2C211B', w: 3 });
  }

  // 顶部标题条（避开左上角仪表盘，放在中间偏右）
  fr.text('德里后院 · 地下人工养蛇作坊', 1090, 74, { font: 'sansh', size: 36, color: '#EEC672', track: 3 });
  fr.text('“去野外抓蛇又累又危险，在家孵小蛇宰了交差，稳赚不赔！”', 1090, 120, { font: 'sans', size: 24, color: '#C4B69E' });

  // 左侧与中部：2行 x 3列 保温育蛇木笼（x 从 440 到 1380）
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      const cx = 590 + c * 305;
      const cy = 310 + r * 285;
      const appear = ss(t, T.s3 + 0.15 * idx, T.s3 + 0.15 * idx + 0.5);

      fr.g({ at: [cx, cy], s: lerp(0.88, 1, appear), a: appear }, () => {
        // 木笼外框与暖光保温灯
        fr.rect(-138, -112, 276, 224, { r: 12, fill: '#2B1F17', color: '#8A6340', w: 3 });
        fr.rect(-124, -98, 248, 196, { r: 8, fill: '#3A281D' });
        fr.glow(0, -55, 110, '#FF9E44', 0.25);

        // 笼内孵化的小眼镜蛇：随时间从 1 条变成 3 条
        const nSnakes = t > 15.2 + idx * 0.2 ? 3 : t > 13.4 + idx * 0.2 ? 2 : 1;
        for (let k = 0; k < nSnakes; k++) {
          const sx = (k - (nSnakes - 1) / 2) * 68;
          drawCobra(fr, sx, 68, 0.58, { t: t * 1.3, dir: k % 2 ? -1 : 1, phase: idx + k * 2.1 });
        }

        // 铁丝网竖栏杆（画在蛇前面，体现关在笼子里）
        for (let b = -100; b <= 100; b += 25) {
          fr.line(b, -98, b, 98, { color: '#9E8B74', w: 2, a: 0.65 });
        }
        fr.rect(-138, -112, 276, 32, { r: 6, fill: '#4E3728' });
        fr.text(`${idx + 1} 号育蛇笼 · 产量 ×${nSnakes}`, 0, -95, { font: 'sansh', size: 18, color: '#EEC672' });
      });
    }
  }

  // 右侧：套利账本面板（x: 1450..1850）
  const ledgerA = ss(t, 12.6, 13.3);
  fr.g({ at: [1655, 455], a: ledgerA }, () => {
    fr.rect(-195, -255, 390, 510, { r: 16, fill: '#261C15', color: '#CFA55E', w: 2.5 });
    fr.text('养蛇套利账本', 0, -205, { font: 'sansh', size: 30, color: '#EEC672' });
    fr.line(-155, -172, 155, -172, { color: '#6E563B', w: 1.5 });

    fr.text('孵 1 条小蛇成本：', -150, -125, { font: 'sans', size: 22, color: '#C4B69E', align: 'l' });
    fr.text('0.1 银币', 150, -125, { font: 'sansh', size: 25, color: '#8CD49E', align: 'r' });

    fr.text('交死蛇官方赏金：', -150, -68, { font: 'sans', size: 22, color: '#C4B69E', align: 'l' });
    fr.text('+1.0 银币', 150, -68, { font: 'sansh', size: 25, color: '#EEC672', align: 'r' });

    fr.rect(-160, -24, 320, 56, { r: 10, fill: '#3D2719', color: '#FC593F', w: 1.8 });
    fr.text('每条净赚暴利：+900%', 0, 5, { font: 'sansh', size: 25, color: '#FC593F' });

    // 不断增高的银币堆
    const stackN = Math.min(12, Math.floor(lerp(2, 12, seg(t, 13.0, 18.4))));
    drawCoinStack(fr, -70, 195, stackN, 1);
    drawCoinStack(fr, 20, 195, Math.max(1, stackN - 2), 1);
    drawCoinStack(fr, 105, 195, Math.max(1, stackN - 4), 1);
    fr.text('总督银库被疯狂掏空', 0, 232, { font: 'sansm', size: 21, color: '#EEC672' });
  });
}

/* ---------- S4（18.8–25.8s）：取消悬赏（0文钱） ➔ 笼门大开全城放生，毒蛇指数爆表 148！ ---------- */
function s4(fr, t) {
  const released = t >= 21.4;
  drawDelhiStreet(fr, { alert: released });

  // 上方：被盖上“废止悬赏”巨型红章的告示牌（文字上移，与下方红印完全错开不重叠）
  fr.g({ at: [1080, 238], s: 0.78 }, () => {
    fr.rect(-430, -175, 860, 350, { r: 16, fill: '#3A2618' });
    fr.rect(-414, -159, 828, 318, { r: 10, fill: '#E5D6B8', color: '#8A6642', w: 3 });
    fr.text('总督府紧急通告：银库亏空', 0, -118, { font: 'sansh', size: 32, color: '#3A2A1D' });
    fr.text('即日起：上交死眼镜蛇 = 0 枚银币（分文不给）', 0, -64, { font: 'sansh', size: 28, color: '#5E4632' });

    // 19.2s 狠狠盖下红色废止大印（置于 y = 52，绝不遮挡上方两行通告字）
    const stampK = E.out3(seg(t, 19.2, 19.55));
    if (stampK > 0) {
      fr.g({ at: [0, 52], rot: -0.07, s: lerp(1.7, 1.0, stampK), a: stampK }, () => {
        fr.rect(-295, -54, 590, 108, { r: 12, fill: '#C82E1E', color: '#FFE5DC', w: 4 });
        fr.text('悬赏废止 · 死蛇分文不值！', 0, 2, { font: 'sansh', size: 42, color: '#FFF7F2', track: 3 });
      });
    }
  });

  // 21.3s 之后：左侧敞开的蛇笼细节（带折断铁栏杆与红色放生箭头）
  const openK = ss(t, 21.3, 22.0);
  if (openK > 0) {
    fr.g({ at: [210, 535], a: openK }, () => {
      fr.rect(-130, -105, 260, 185, { r: 10, fill: '#231710', color: '#FC593F', w: 3 });
      fr.rect(-130, -105, 260, 34, { r: 8, fill: '#4E2A1E' });
      fr.text('后院蛇笼 · 笼门大开', 0, -87, { font: 'sansh', size: 20, color: '#FF9E8A' });
      // 两侧掀开的断栏杆与向右涌出的箭头
      fr.line(-95, -65, -115, 65, { color: '#9E8B74', w: 3 });
      fr.line(95, -65, 115, 65, { color: '#9E8B74', w: 3 });
      fr.text('空笼', -30, -10, { font: 'sansh', size: 30, color: '#6E5544' });
      fr.path('M 20,-10 L 95,-10 M 75,-26 L 98,-10 L 75,6', { color: '#FC593F', w: 5, cap: 'round' });
      fr.text('“留着也是赔钱，全放上街！”', 0, 108, { font: 'sansm', size: 21, color: '#F7C8B8' });
    });
  }

  // 街头蛇群数量：21.4s 前只有 2 条，21.4s 后从笼中疯狂涌出 14 条，铺满画面！
  const horde = [
    { x: 370,  y: 725, s: 1.02, dir: 1,  t0: 21.4 },
    { x: 510,  y: 810, s: 1.18, dir: 1,  t0: 21.5 },
    { x: 650,  y: 705, s: 0.96, dir: 1,  t0: 18.8 },
    { x: 780,  y: 785, s: 1.24, dir: -1, t0: 21.6 },
    { x: 920,  y: 725, s: 1.08, dir: 1,  t0: 21.7 },
    { x: 1050, y: 825, s: 1.28, dir: -1, t0: 21.8 },
    { x: 1185, y: 715, s: 1.00, dir: 1,  t0: 18.8 },
    { x: 1315, y: 790, s: 1.20, dir: -1, t0: 21.9 },
    { x: 1455, y: 730, s: 1.10, dir: -1, t0: 22.0 },
    { x: 1595, y: 815, s: 1.22, dir: -1, t0: 22.1 },
    { x: 1735, y: 745, s: 1.05, dir: -1, t0: 22.2 },
    { x: 575,  y: 660, s: 0.86, dir: 1,  t0: 22.3 },
    { x: 1115, y: 662, s: 0.88, dir: -1, t0: 22.4 },
    { x: 1395, y: 665, s: 0.86, dir: -1, t0: 22.5 },
  ];
  for (let i = 0; i < horde.length; i++) {
    const h = horde[i];
    const ka = ss(t, h.t0, h.t0 + 0.45);
    if (ka <= 0) continue;
    const slide = h.t0 > 20 ? lerp(-90 * h.dir, 0, E.out3(ka)) : 0;
    drawCobra(fr, h.x + slide, h.y, h.s, {
      t: t * 1.35, dir: h.dir, phase: i * 1.1, a: ka, alert: t >= 22.0
    });
  }
}

/* ---------- S5（25.8–32.0s）：鎏金片名卡《眼镜蛇效应》 ---------- */
function s5(fr, t) {
  fr.rect(0, 0, W, H, { fill: '#120E0A' });
  const lt = t - T.s5;
  K.titleGilt(fr, lt, {
    la: 'THE COBRA EFFECT · GOODHART’S LAW',
    zh: '眼镜蛇效应',
    cy: 415,
    size: 176,
    track: 20,
    tag: '当指标变成目标 · 激励就会变成灾难',
    tagDy: 350,
    motif(fr, lt, a) {
      const mk = ss(lt, 0.55, 1.35) * a;
      if (mk <= 0) return;
      // 片名下方母题：分段金线连接“悬赏银币 ➔ 泛滥毒蛇”，中间留空不穿过箭头
      fr.g({ at: [W / 2, 620], a: mk }, () => {
        fr.line(-240, 0, -190, 0, { color: '#DDBD74', w: 2.5, a: 0.65 });
        fr.line(-110, 0, -36, 0, { color: '#DDBD74', w: 2.5, a: 0.65 });
        fr.line(36, 0, 105, 0, { color: '#DDBD74', w: 2.5, a: 0.65 });
        fr.line(190, 0, 240, 0, { color: '#DDBD74', w: 2.5, a: 0.65 });
        drawCoin(fr, -150, 0, 28, mk);
        fr.text('悬赏指标', -150, 54, { font: 'sans', size: 22, color: '#CFA55E' });
        fr.text('➔', 0, 0, { font: 'sansh', size: 34, color: '#FC593F' });
        drawCobra(fr, 148, 22, 0.56, { t, dir: -1, phase: 0.5, alert: true });
        fr.text('泛滥失控', 150, 54, { font: 'sansh', size: 22, color: '#FC593F' });
      });
    },
  });
}

const SHOTS = [
  [0,    T.s2, s1],
  [T.s2, T.s3, s2],
  [T.s3, T.s4, s3],
  [T.s4, T.s5, s4],
  [T.s5, T.end, s5],
];

/* 左上角实时毒蛇指数仪表盘（贯穿前四幕 0..25.8s，x=76 留足左margin防止caption贴边） */
function drawSnakeGauge(fr, t) {
  if (t >= T.s5) return;
  const ga = Math.min(ss(t, 0.4, 1.0), 1 - ss(t, T.s5 - 0.5, T.s5));
  const val = K3(t, [
    [0.0,  65],
    [6.8,  65],
    [10.6, 38],
    [12.2, 38],
    [18.2, 96],
    [21.2, 96],
    [23.6, 148],
    [32.0, 148],
  ]);
  let cap = '街头野生蛇患';
  if (t >= 21.4) cap = '{!养蛇户全城放生 · 爆表！}';
  else if (t >= 18.8) cap = '{!银库亏空 · 官方废止悬赏}';
  else if (t >= 11.6) cap = '{!全城偷偷在家孵蛇套利}';
  else if (t >= 5.6) cap = '悬赏初期 · 街头野蛇减少';

  K.gauge(fr, 76, 42, {
    value: val,
    max: 150,
    redFrom: 100,
    label: '全城毒蛇数量指数',
    zone: '失控',
    caption: cap,
    a: ga,
  });
}

VK.film({
  dur: T.end,
  theme: 'flat',
  meta: { title: '眼镜蛇效应 · 越悬赏越泛滥', root: 2 },
  draw(fr, t) {
    fr.look.bgo = { color: '#17120E' };
    const sh = SHOTS.find(s => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1];
    const cut = Math.min(
      ss(t, sh[0], sh[0] + (sh[0] ? 0.22 : 0.45)),
      1 - ss(t, sh[1] - (sh[1] >= T.end ? 0.6 : 0.22), sh[1])
    );

    fr.g({ a: cut }, () => {
      sh[2](fr, t);
      // 片头 0..4.2s 叠一层 1900 老照片泛黄滤镜
      const sepK = (1 - ss(t, 3.2, 4.8)) * 0.45;
      if (sepK > 0.01) K.sepia(fr, sepK, { weave: false });

      // 电影级暗角与底部字幕衬底渐变
      const x = fr.x;
      const b = x.createLinearGradient(0, 830, 0, H);
      b.addColorStop(0, 'rgba(18,12,10,0)');
      b.addColorStop(0.55, 'rgba(18,12,10,0.78)');
      b.addColorStop(1, 'rgba(18,12,10,0.92)');
      fr.rect(0, 830, W, 250, { fill: b });
    });

    // 左上角贯穿全片的毒蛇指数仪表盘
    drawSnakeGauge(fr, t);

    // 转场闪白与音效编排
    K.flash(fr, t, 19.25, { color: '#FF6B4A', rise: 0.05, fall: 0.35, peak: 0.55 });
    K.flash(fr, t, T.s5 + 0.08, { color: '#F3DFB4', rise: 0.18, fall: 0.45, peak: 0.75 });

    fr.sfx(0.3,  'chord', { root: 0, gain: 0.58 });
    fr.sfx(3.2,  'ping',  { pitch: 5, gain: 0.55 });
    fr.sfx(5.7,  'thud',  { gain: 0.65 });
    fr.sfx(7.3,  'tock',  { pitch: 4, gain: 0.6 });
    fr.sfx(8.3,  'tock',  { pitch: 6, gain: 0.6 });
    fr.sfx(9.3,  'tock',  { pitch: 8, gain: 0.6 });
    fr.sfx(11.8, 'chord', { root: -2, gain: 0.55 });
    for (let i = 0; i < 6; i++) {
      fr.sfx(13.2 + i * 0.8, 'tick', { pitch: i * 2, gain: 0.45 });
    }
    fr.sfx(19.25, 'hit',   { gain: 0.85 });
    fr.sfx(21.4,  'sweep', { dur: 1.2, gain: 0.7 });
    fr.sfx(22.2,  'chord', { root: -5, gain: 0.78 });
    fr.sfx(25.9,  'hit',   { gain: 0.82 });
    fr.sfx(26.1,  'chord', { root: 0, dur: 5.2, gain: 0.72 });

    K.subs(fr, t, SUBS, 'flat');
  },
});
})();
