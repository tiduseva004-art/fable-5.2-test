/* ★ 三门问题 · 换不换门？（A 鎏金暗场 gilt）
 * 事实出处：Steve Selvin (1975), American Statistician; Marilyn vos Savant (1990), Parade Magazine.
 * 画面中三扇拱门、跑车与山羊剪影、三条平行世界线推演为教学可视化示意。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, smooth, ss, E, fade, hash, rng, rgba, mix, scene } = VK;
const K = VKit, P = K.PAL.gilt;

const T = {
  s1: 0.0,
  s2: 5.4,
  s3: 11.4,
  s4: 16.6,
  s5: 27.0,
  end: 33.5,
};

const SUBS = [
  { a: 0.4,  b: 5.1,  zh: '三扇门后藏着一辆{跑车}和两只{!山羊}，你先选定了 1 号门。' },
  { a: 5.6,  b: 8.6,  zh: '知道底牌的主持人，替你推开了后面是{!山羊}的 3 号门。' },
  { a: 8.8,  b: 11.2, zh: '现在他问你：{换不换} 2 号门？', big: 1 },
  { a: 11.6, b: 16.3, zh: '几乎所有人都觉得，剩下两扇门是{!五五开}——连上千名博士都这么想。' },
  { a: 16.9, b: 21.8, zh: '把三种可能全演一遍：只要你一开始选到{!羊}，主持人就得替你排掉另一只羊。' },
  { a: 22.1, b: 26.7, zh: '换门，等于把另外两扇门{三分之二}的赢面，打包收进囊中。' },
  { a: 27.5, b: 32.8, zh: '信息一旦改变，{概率}就会悄悄搬家。', tone: 'gold' },
];

const CHAPTERS = [
  {
    t: 0.2,
    year: '1975',
    place: '加州 · 塞尔文博弈信件',
    src: { la: 'A Problem in Probability', zh: '《三门博弈问题》', by: '史蒂夫·塞尔文 · 美洲统计学家 · 1975', until: 11.0 }
  },
  {
    t: 11.4,
    year: '1990',
    place: '纽约 · 玛丽莲专栏论战',
    src: { la: 'Ask Marilyn · Parade', zh: '《一万封读者来信之争》', by: '玛丽莲·沃斯·莎凡特 · 纽约 · 1990', until: 15.2 }
  },
];

/* ---------- 道具 1：金色跑车剪影（一眼认出的流线型超跑 + 车轮 + 大灯星芒） ---------- */
function drawCar(fr, cx, cy, s = 1, a = 1, showLabel = true) {
  if (a <= 0) return;
  fr.g({ at: [cx, cy], s, a }, () => {
    fr.glow(0, -10, 95, P.gold, 0.35);
    // 地面投影
    fr.ellipse(0, 34, 78, 9, { fill: '#000', a: 0.45 });
    // 车身流线轮廓
    const body = [
      [-74, 20], [-78, 4], [-68, -6], [-42, -10], [-22, -32], [18, -32], [42, -10],
      [72, -4], [78, 8], [74, 20]
    ];
    fr.poly(body, { close: true, fill: '#3A2A12', color: P.goldHi, w: 2.6, glow: 10 });
    // 车窗玻璃
    fr.poly([[-36, -10], [-19, -27], [15, -27], [35, -10]], { close: true, fill: '#1C140A', color: P.gold, w: 1.5 });
    fr.line(-2, -27, -2, -10, { color: P.gold, w: 1.5 });
    // 金色腰线与车头大灯
    fr.line(-70, 5, 70, 5, { color: P.gold, w: 1.6, a: 0.7 });
    fr.spark(72, 2, 5.5, '#FFF5D6', 0.95);
    // 前后轮毂
    for (const wx of [-44, 44]) {
      fr.circle(wx, 20, 16, { fill: '#140F0A', color: P.goldHi, w: 2.6 });
      fr.circle(wx, 20, 7, { fill: P.gold });
    }
    if (showLabel) {
      fr.text('大奖 · 跑车', 0, 56, { font: 'serifm', size: 20, track: 2, color: P.goldHi });
    }
  });
}

/* ---------- 道具 2：山羊剪影（弯角 + 胡须 + 四条腿，一眼认出是山羊） ---------- */
function drawGoat(fr, cx, cy, s = 1, a = 1, label = '山羊') {
  if (a <= 0) return;
  fr.g({ at: [cx, cy], s, a }, () => {
    fr.ellipse(0, 36, 52, 8, { fill: '#000', a: 0.4 });
    const col = P.red, fillCol = '#2A1410';
    // 四条腿
    for (const lx of [-28, -14, 14, 26]) {
      fr.line(lx, 4, lx, 34, { color: col, w: 4.2 });
    }
    // 躯干与翘尾
    fr.ellipse(0, -4, 38, 22, { fill: fillCol, color: col, w: 2.2 });
    fr.line(-36, -12, -48, -24, { color: col, w: 3.5 });
    // 脖子与头
    fr.poly([[18, -12], [32, -42], [44, -40], [32, -4]], { close: true, fill: fillCol, color: col, w: 2 });
    fr.ellipse(42, -42, 16, 11, { rot: 0.25, fill: fillCol, color: col, w: 2.2 });
    // 标志性弯山羊角（两道向后弯的弧线）
    fr.poly([[34, -50], [22, -68], [8, -64]], { color: P.goldLo, w: 3.0 });
    fr.poly([[38, -50], [28, -64], [16, -59]], { color: P.goldLo, w: 2.4 });
    // 山羊胡须与眼睛
    fr.poly([[50, -34], [54, -20], [46, -24]], { color: col, w: 2.0 });
    fr.circle(44, -44, 2.2, { fill: P.ivory });
    if (label) {
      fr.text(label, 0, 58, { font: 'serifm', size: 20, track: 2, color: col });
    }
  });
}

/* ---------- 道具 3：古典鎏金拱门（支持透视 X 光显影、开门动画、选中聚光） ----------
 * o: { no:'I', open:0..1, picked:0..1, prize:'car'|'goat', xray:0..1, dim:0..1, tag, tagCol } */
function drawDoor(fr, cx, cy, w, h, o = {}) {
  const a = (o.a == null ? 1 : o.a) * (1 - (o.dim || 0) * 0.55);
  if (a <= 0) return;
  const open = o.open || 0, picked = o.picked || 0, xray = o.xray || 0;
  const borderCol = picked > 0.1 ? P.goldHi : P.goldLo;

  fr.g({ at: [cx, cy], a }, () => {
    // 选中时的顶部舞台聚光灯束
    if (picked > 0) {
      fr.glow(0, 0, w * 1.15, P.gold, 0.28 * picked);
      fr.poly([[-w * 0.35, -h * 0.72], [w * 0.35, -h * 0.72], [w * 0.75, h * 0.58], [-w * 0.75, h * 0.58]], {
        close: true, fill: P.gold, fa: 0.08 * picked
      });
    }

    // 门洞黑底（门打开或 X 光透视时露出里面的奖品）
    fr.rect(-w / 2, -h / 2, w, h, { r: [w * 0.42, w * 0.42, 6, 6], fill: '#090604', color: borderCol, w: 3 + picked * 1.5, glow: picked * 14 });

    // 门后藏着的跑车或山羊（开门或透视时可见）
    const insideA = Math.max(open, xray * 0.78);
    if (insideA > 0.02) {
      const sc = Math.min(1, w / 210);
      if (o.prize === 'car') drawCar(fr, 0, h * 0.02, sc, insideA, open > 0.3);
      else drawGoat(fr, 0, h * 0.02, sc, insideA, open > 0.3 ? (o.goatLabel || '山羊') : '');
    }

    // 门扇本体（绕左侧门轴 [-w/2, 0] 向外旋开：宽度按 cos 压缩，底边倾斜）
    if (open < 0.98) {
      const leafW = w * Math.max(0.12, 1 - open * 0.86);
      const skewY = -open * 28;
      const leafA = 1 - xray * 0.55;
      fr.g({ a: leafA }, () => {
        fr.rect(-w / 2, -h / 2 + skewY * 0.2, leafW, h, {
          r: [leafW * 0.42, leafW * 0.42, 4, 4],
          fill: mix('#1D150C', '#2E2112', picked),
          fa: 0.96,
          color: borderCol,
          w: 2.4
        });
        // 门面古典雕花内框
        if (leafW > w * 0.35) {
          fr.rect(-w / 2 + 16, -h / 2 + 22, leafW - 32, h * 0.42, {
            r: [leafW * 0.32, leafW * 0.32, 4, 4],
            color: borderCol, w: 1.2, a: 0.55
          });
          fr.rect(-w / 2 + 16, 4, leafW - 32, h * 0.38, {
            r: 4, color: borderCol, w: 1.2, a: 0.55
          });
          // 黄铜门把手
          fr.circle(-w / 2 + leafW - 26, 2, 6, { fill: P.goldHi, glow: 6 });
          // 门号（罗马数字 + 中文）
          fr.text(o.no || 'I', -w / 2 + leafW / 2, -h * 0.22, { font: 'latinm', size: Math.round(w * 0.28), color: P.goldHi, glow: picked * 10 });
          fr.text(o.title || '1 号门', -w / 2 + leafW / 2, h * 0.32, { font: 'serifm', size: Math.round(w * 0.12), track: 3, color: P.dim });
        }
      });
    }

    // 门顶外框编号（开门后依然清楚显示是几号门）
    if (open >= 0.35) {
      fr.text(o.title || '3 号门', 0, -h / 2 - 26, { font: 'serifm', size: 24, track: 2, color: P.dim });
    }
  });
}

/* ==========================================================================
 * 场景 1, 2, 3 (0.0s – 16.6s)：
 * 三扇门舞台：初选 1 号门 (1/3) -> 主持人开 3 号羊门 -> 直觉 50:50 被朱印「错」砸碎
 * ========================================================================== */
function sceneStage(fr, t) {
  scene(fr, t, T.s1, T.s4, (lt, env) => {
    const cy = 470, dw = 220, dh = 340;
    const xs = [480, 960, 1440];

    // 0.8s..2.3s：短暂透视门后（1辆车 + 2只羊），让观众明白底牌配置
    const xray = fade(t, 0.7, 2.5, 0.4, 0.5);
    // 2.6s：观众选定 1 号门
    const pick1 = ss(t, 2.5, 3.1);
    if (Math.abs(t - 2.6) < 0.03) fr.sfx(2.6, 'stamp', { gain: 0.7 });

    // 6.0s：主持人推开 3 号门露出山羊
    const open3 = E.io3(seg(t, 5.8, 7.0));
    if (Math.abs(t - 5.9) < 0.03) fr.sfx(5.9, 'rise', { dur: 0.9, gain: 0.85 });
    if (Math.abs(t - 7.1) < 0.03) fr.sfx(7.1, 'stamp', { gain: 0.75 });

    // 绘制三扇鎏金拱门
    drawDoor(fr, xs[0], cy, dw, dh, {
      no: 'I', title: '1 号门', prize: 'goat', xray, picked: pick1,
    });
    drawDoor(fr, xs[1], cy, dw, dh, {
      no: 'II', title: '2 号门', prize: 'car', xray,
      picked: ss(t, 8.8, 9.6) * 0.85,
    });
    drawDoor(fr, xs[2], cy, dw, dh, {
      no: 'III', title: '3 号门', prize: 'goat', xray, open: open3,
      dim: ss(t, 7.5, 8.5) * 0.4,
    });

    // 1 号门上方：你的初选朱印 + 1/3 概率锁死
    if (pick1 > 0) {
      K.seal(fr, xs[0] + 88, cy - 145, 28, ['选', '定'], pick1, { rot: -0.08 });
      fr.rect(xs[0] - 95, cy + 195, 190, 56, { r: 10, fill: '#18120B', fa: 0.9 * pick1, color: P.gold, w: 1.6, a: pick1 });
      fr.text('初选赢面：1 / 3', xs[0], cy + 223, { font: 'serifm', size: 24, color: P.goldHi, a: pick1 });
    }

    // 3.2s..11.2s：下方大括号标出「2 号门 + 3 号门合占 2/3 赢面」
    const poolK = fade(t, 3.2, 11.2, 0.5, 0.4);
    if (poolK > 0) {
      const bx0 = xs[1] - 110, bx1 = xs[2] + 110, by = cy + 205;
      fr.line(bx0, by, bx1, by, { color: P.gold, w: 2, a: poolK * 0.75 });
      fr.line(bx0, by - 12, bx0, by, { color: P.gold, w: 2, a: poolK * 0.75 });
      fr.line(bx1, by - 12, bx1, by, { color: P.gold, w: 2, a: poolK * 0.75 });
      fr.rect((bx0 + bx1) / 2 - 170, by + 10, 340, 54, { r: 10, fill: '#18120B', fa: 0.92 * poolK, color: P.gold, w: 1.8, a: poolK });
      fr.text('其余两扇门合占：2 / 3', (bx0 + bx1) / 2, by + 37, { font: 'serifm', size: 24, color: P.goldHi, a: poolK });
    }

    // 7.1s：3 号门盖上「排除」印章，概率流向 2 号门
    const elimK = ss(t, 7.0, 7.5);
    if (elimK > 0) {
      K.seal(fr, xs[2] + 85, cy - 140, 28, ['排', '除'], elimK, { rot: 0.1, fill: '#8E281B' });
    }

    // 8.8s..11.3s：2 号门上方悬起金色大问号「换不换？」
    const askK = fade(t, 8.7, 11.3, 0.35, 0.35);
    if (askK > 0) {
      if (Math.abs(t - 8.8) < 0.03) fr.sfx(8.8, 'soft', { gain: 0.9 });
      fr.rect(xs[1] - 115, cy - 255, 230, 62, { r: 12, fill: '#241A0D', fa: 0.94 * askK, color: P.goldHi, w: 2.2, a: askK, glow: 12 });
      fr.text('换不换 2 号门？', xs[1], cy - 224, { font: 'serif', size: 27, track: 2, color: P.goldHi, a: askK });
    }

    // 第三阶段 (11.4s – 16.6s)：直觉「50% = 50%」被朱红大印「错」当场砸碎！
    const mythK = fade(t, 11.5, 16.4, 0.4, 0.4);
    if (mythK > 0) {
      const mx = (xs[0] + xs[1]) / 2, my = cy - 235;
      const smash = ss(t, 13.4, 13.75);
      if (Math.abs(t - 13.45) < 0.03) fr.sfx(13.45, 'thud', { gain: 0.95 });

      fr.rect(mx - 260, my - 42, 520, 84, {
        r: 14, fill: '#1C130C', fa: 0.94 * mythK,
        color: smash > 0 ? P.red : P.dim, w: 2.0, a: mythK
      });
      fr.text('大众直觉：1 号门 50%  =  2 号门 50%', mx - 18, my, {
        font: 'serifm', size: 25, color: smash > 0 ? P.mute : P.ink, a: mythK
      });
      if (smash > 0) {
        fr.line(mx - 225, my, mx + 185, my, { color: P.red, w: 4, a: smash * mythK });
        K.seal(fr, mx + 248, my - 6, 35, ['错'], smash * mythK, { rot: -0.14, s: lerp(1.8, 1.0, E.outBack(smash)) });
      }

      // 13.8s：2 号门下方亮出真正的 2/3 赢面卡片
      const trueK = ss(t, 13.7, 14.4) * mythK;
      if (trueK > 0) {
        if (Math.abs(t - 13.8) < 0.03) fr.sfx(13.8, 'bloom', { root: 5, gain: 0.75 });
        // 3 号门的 1/3 沿着金色弧线并入 2 号门
        const arcPts = [];
        for (let i = 0; i <= 20; i++) {
          const u = i / 20;
          arcPts.push([lerp(xs[2], xs[1], u), cy + 190 + Math.sin(u * Math.PI) * 55]);
        }
        fr.poly(arcPts, { k: trueK, color: P.goldHi, w: 3, dash: [8, 6], glow: 10 });
        fr.rect(xs[1] - 130, cy + 195, 260, 62, { r: 12, fill: '#261B0B', fa: 0.95 * trueK, color: P.goldHi, w: 2.6, a: trueK, glow: 14 });
        fr.text('换门真实赢面：2 / 3', xs[1], cy + 226, { font: 'serifh', size: 26, color: P.goldHi, a: trueK });
      }
    }
  }, 0.5, 0.5);
}

/* ==========================================================================
 * 场景 4 (16.6s – 27.0s)：
 * 当场做一遍 —— 3 条平行世界线同屏推演：为什么换门稳赢 2 局（2/3）？
 * ========================================================================== */
const CASES = [
  {
    no: '世界线 ①（概率 1/3）',
    desc: '车在 1 号门：你初选即中跑车',
    prizes: ['car', 'goat', 'goat'],
    hostOpen: 2,
    switchTo: 1,
    winIfSwitch: false,
    verdict: '换门 = 换成山羊（输）',
    t0: 17.0,
  },
  {
    no: '世界线 ②（概率 1/3）',
    desc: '车在 2 号门：你初选 1 号（山羊）',
    prizes: ['goat', 'car', 'goat'],
    hostOpen: 2,
    switchTo: 1,
    winIfSwitch: true,
    verdict: '主持人必排 3 号羊 -> 换 2 号必得跑车（赢！）',
    t0: 18.4,
  },
  {
    no: '世界线 ③（概率 1/3）',
    desc: '车在 3 号门：你初选 1 号（山羊）',
    prizes: ['goat', 'goat', 'car'],
    hostOpen: 1,
    switchTo: 2,
    winIfSwitch: true,
    verdict: '主持人必排 2 号羊 -> 换 3 号必得跑车（赢！）',
    t0: 19.8,
  },
];

function sceneParallel(fr, t) {
  scene(fr, t, T.s4, T.s5, (lt, env) => {
    fr.text('把全部 3 种等概率世界线当场演一遍（假设你永远初选 1 号门）', W * 0.38, 126, {
      font: 'serif', size: 30, track: 2, color: P.goldHi
    });

    CASES.forEach((c, idx) => {
      const k = ss(t, c.t0, c.t0 + 0.8);
      if (k <= 0) return;
      if (Math.abs(t - c.t0) < 0.03) fr.sfx(c.t0, 'tick', { freq: 920 + idx * 180 });

      const ry = 250 + idx * 215;
      const borderCol = c.winIfSwitch ? P.gold : '#6E5A4F';
      fr.rect(80, ry - 82, 1180, 178, {
        r: 16, fill: c.winIfSwitch ? '#1A140B' : '#14100E', fa: 0.92 * k,
        color: borderCol, w: c.winIfSwitch ? 2.4 : 1.5, a: k, glow: c.winIfSwitch ? 8 : 0
      });

      // 左侧文字说明
      fr.text(c.no, 112, ry - 42, { font: 'serif', size: 24, color: c.winIfSwitch ? P.goldHi : P.dim, align: 'l', a: k });
      fr.text(c.desc, 112, ry - 4, { font: 'sansr', size: 19, color: P.mute, align: 'l', a: k });
      fr.text(c.verdict, 112, ry + 42, {
        font: 'sansm', size: 20, color: c.winIfSwitch ? P.goldHi : P.red, align: 'l', a: k
      });

      // 右侧三扇迷你门演示（1号初选 -> 主持人排除羊门 -> 换门落点）
      const stepOpen = ss(t, c.t0 + 0.5, c.t0 + 1.1);
      const stepSwitch = ss(t, c.t0 + 1.1, c.t0 + 1.7);
      if (Math.abs(t - (c.t0 + 1.2)) < 0.03 && c.winIfSwitch) fr.sfx(c.t0 + 1.2, 'soft', { gain: 0.85 });

      for (let m = 0; m < 3; m++) {
        const mx = 680 + m * 175, my = ry + 4;
        const isHost = m === c.hostOpen;
        const isTarget = m === c.switchTo;
        const isCar = c.prizes[m] === 'car';

        fr.rect(mx - 64, my - 62, 128, 124, {
          r: 12,
          fill: isTarget && stepSwitch > 0 ? (isCar ? '#2B200E' : '#261210') : '#0E0B08',
          fa: 0.95 * k,
          color: isTarget && stepSwitch > 0 ? (isCar ? P.goldHi : P.red) : P.mute,
          w: isTarget && stepSwitch > 0 ? 2.6 : 1.4,
          a: k * (isHost && stepOpen > 0 ? 0.42 : 1)
        });
        fr.text(m === 0 ? '1号门(初选)' : `${m + 1} 号门`, mx, my - 42, {
          font: 'sansm', size: 16, color: m === 0 ? P.gold : P.dim, a: k
        });

        if (isCar) {
          drawCar(fr, mx, my + 2, 0.50, k, false);
        } else {
          drawGoat(fr, mx, my + 2, 0.50, k, '');
        }

        if (isHost && stepOpen > 0) {
          fr.line(mx - 48, my - 44, mx + 48, my + 44, { color: P.red, w: 3, a: stepOpen * k });
          fr.text('主持人排掉', mx, my + 44, { font: 'sansm', size: 15, color: P.red, a: stepOpen * k });
        }
        if (isTarget && stepSwitch > 0) {
          fr.text(isCar ? '换门中车 ✓' : '换门得羊 ✕', mx, my + 44, {
            font: 'sans', size: 16, color: isCar ? P.goldHi : P.red, a: stepSwitch * k
          });
        }
      }
    });

    // 右侧全局总账看板 (x: 1310 .. 1840)
    const sumK = ss(t, 21.2, 22.2);
    if (sumK > 0) {
      if (Math.abs(t - 21.4) < 0.03) fr.sfx(21.4, 'chord', { freq: 240 });
      const sx = 1575, sy = 465;
      fr.rect(1310, 168, 530, 595, { r: 20, fill: '#181209', fa: 0.95 * sumK, color: P.goldHi, w: 2.8, a: sumK, glow: 14 });
      fr.text('三局总账对比', sx, 222, { font: 'serifh', size: 34, color: P.goldHi, a: sumK });

      // 不换 vs 换门 柱状/比分直观对照
      fr.rect(1350, 270, 450, 130, { r: 14, fill: '#120D0A', color: P.mute, w: 1.5, a: sumK });
      fr.text('死守 1 号门（不换）', 1575, 310, { font: 'sansm', size: 22, color: P.dim, a: sumK });
      fr.text('3 局只赢 1 局  =  1 / 3', 1575, 362, { font: 'serifh', size: 34, color: P.red, a: sumK });

      fr.rect(1350, 430, 450, 165, { r: 14, fill: '#281D0D', color: P.goldHi, w: 2.6, a: sumK, glow: 12 });
      fr.text('果断换门（听玛丽莲的）', 1575, 472, { font: 'sansm', size: 23, color: P.gold, a: sumK });
      fr.text('3 局稳赢 2 局  =  2 / 3', 1575, 530, { font: 'serifh', size: 40, color: P.goldHi, a: sumK });
      fr.text('主持人替你筛掉了错误答案！', 1575, 572, { font: 'sansr', size: 19, color: P.ivory, a: sumK });

      K.seal(fr, 1785, 682, 34, ['必', '换'], sumK, { rot: -0.08 });
      fr.text('赢面整整翻倍', 1530, 682, { font: 'serif', size: 30, track: 3, color: P.goldHi, a: sumK });
    }
  }, 0.5, 0.5);
}

/* ==========================================================================
 * 场景 5 (27.0s – 33.5s)：
 * 命名 —— 鎏金万道光芒片名卡 K.titleGilt
 * ========================================================================== */
function sceneTitle(fr, t) {
  scene(fr, t, T.s5, T.end, (lt, env) => {
    if (lt < 0.1) fr.sfx(T.s5 + 0.05, 'shimmer', { dur: 2.4 });
    K.flash(fr, t, T.s5 + 0.05, { rise: 0.05, fall: 0.45, peak: 0.65 });
    K.titleGilt(fr, lt, {
      la: 'PARADOXUM MONTY HALL · 1975 / 1990',
      zh: '三门问题',
      tag: '被排除的错误答案，把 2/3 的赢面留给了剩下的门',
      a: env,
      motif: (f, mlt, ma) => {
        const k = E.io3(seg(mlt, 0.7, 1.6));
        if (k <= 0) return;
        f.line(580, 675, 1340, 675, { color: P.gold, w: 2, a: ma * 0.65 });
        f.text('不换 = 1/3', 720, 642, { font: 'serifm', size: 26, color: P.dim, a: ma * k });
        f.text('换门 = 2/3', 1200, 642, { font: 'serifh', size: 32, color: P.goldHi, a: ma * k, glow: 10 });
      }
    });
  }, 0.4, 0.6);
}

VK.film({
  dur: T.end,
  theme: 'gilt',
  meta: { title: '三门问题 · 换不换门' },
  draw(fr, t) {
    const dip = K.dips(t, [T.s4, T.s5], 0.45);
    fr.look.bgo = {
      warm: 0.88,
      pool: 0.9 * dip,
      floor: t < T.s4 ? 0.45 : 0.2,
      horizon: t < T.s4 ? 0.75 : 0,
      dust: 1.0
    };

    sceneStage(fr, t);
    sceneParallel(fr, t);
    sceneTitle(fr, t);

    K.hudYear(fr, t, CHAPTERS, T.s4);
    K.subs(fr, t, SUBS, 'gilt');
  },
});
})();
