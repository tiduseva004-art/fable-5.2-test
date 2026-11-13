/* ★ 幸存者偏差 · 看不见的弹孔（C 夜曲）
 * 事实出处：Abraham Wald, Statistical Research Group (SRG), Columbia University, 1943.
 * 画面中战机轮廓与 58 处返航弹孔分布、12 架编队穿越防空火网为教学可视化示意。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, smooth, ss, E, fade, hash, rng, rgba, mix, scene } = VK;
const K = VKit, P = K.PAL.night;

const T = {
  s1: 0.0,
  s2: 5.2,
  s3: 10.6,
  s4: 20.2,
  s5: 26.5,
  end: 33.5,
};

const SUBS = [
  { a: 0.4,  b: 5.0,  zh: '返航的战机上，机翼密密麻麻全是{!弹孔}，引擎却干干净净。', en: 'Returning bombers were riddled with bullet holes on the wings, yet the engines were untouched.' },
  { a: 5.3,  b: 7.8,  zh: '如果装甲只够贴一处，你会贴在哪？', en: 'If heavy armor can only cover one spot, where would you bolt it?' },
  { a: 8.0,  b: 10.4, zh: '军方想贴在弹孔最多的机翼上——数学家{沃尔德}却拦住了他们。', en: 'The generals wanted to armor the wings—mathematician Abraham Wald stopped them.' },
  { a: 10.9, b: 15.2, zh: '机翼被打穿的飞机，还能{活着飞回来}让你数弹孔。', en: 'Planes hit in the wings could still fly home to be counted.' },
  { a: 15.5, b: 19.9, zh: '而引擎中弹的那些，早就{!沉在了海底}。', en: 'Those hit in the engines were already at the bottom of the sea.' },
  { a: 20.5, b: 23.3, zh: '那些干干净净的地方，不是没挨打——', en: 'The untouched places were not spared—' },
  { a: 23.5, b: 26.3, zh: '而是挨了一枪，就{!再也回不来}了。', en: 'a single hit there meant never coming back.' },
  { a: 27.0, b: 32.8, zh: '{看不见的样本}，往往比看得见的更致命。', en: 'What is missing from the data is often what matters most.' },
];

const MARKS = [
  { t: 0.2,  no: '01', zh: '返航统计 · 1943',   en: 'DAMAGE SURVEY' },
  { t: 5.2,  no: '02', zh: '直觉陷阱 · 贴哪儿', en: 'INTUITION TRAP' },
  { t: 10.6, no: '03', zh: '出击全貌 · 12 架',  en: 'THE MISSING FOUR' },
  { t: 20.2, no: '04', zh: '致命盲区 · 沃尔德', en: 'WALD’S INVERSION' },
];

/* ---------- 预生成确定性弹孔坐标（机身局部坐标系，机头朝上 (0,-260)，翼展 [-380,380]） ---------- */
const HOLES_SURV = [];
{
  const r = rng(194307);
  // 左外翼 14 处、右外翼 14 处（避开 x=±145 的引擎短舱）
  for (let i = 0; i < 14; i++) {
    HOLES_SURV.push({ x: -195 - r() * 160, y: -22 + r() * 58, z: 'wingL', d: i * 0.04 });
    HOLES_SURV.push({ x:  195 + r() * 160, y: -22 + r() * 58, z: 'wingR', d: (i + 14) * 0.04 });
  }
  // 左右内翼根 8 处（|x| in 48..95）
  for (let i = 0; i < 4; i++) {
    HOLES_SURV.push({ x: -50 - r() * 44, y: -42 + r() * 82, z: 'rootL', d: (28 + i) * 0.04 });
    HOLES_SURV.push({ x:  50 + r() * 44, y: -42 + r() * 82, z: 'rootR', d: (32 + i) * 0.04 });
  }
  // 中后机身 10 处（y in 20..185）
  for (let i = 0; i < 10; i++) {
    HOLES_SURV.push({ x: (r() - 0.5) * 44, y: 24 + r() * 160, z: 'body', d: (36 + i) * 0.04 });
  }
  // 尾翼 12 处（y in 208..252, x in -125..125）
  for (let i = 0; i < 12; i++) {
    HOLES_SURV.push({ x: (r() - 0.5) * 240, y: 210 + r() * 42, z: 'tail', d: (46 + i) * 0.04 });
  }
}

const HOLES_FATAL = [];
{
  const r = rng(194399);
  // 左引擎 8 处 (-145, -52)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + r() * 0.4, d = 8 + r() * 24;
    HOLES_FATAL.push({ x: -145 + Math.cos(a) * d * 0.85, y: -48 + Math.sin(a) * d * 1.35, src: 0 });
  }
  // 右引擎 8 处 (+145, -52)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + r() * 0.4, d = 8 + r() * 24;
    HOLES_FATAL.push({ x:  145 + Math.cos(a) * d * 0.85, y: -48 + Math.sin(a) * d * 1.35, src: 1 });
  }
  // 驾驶舱 8 处 (0, -165)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + r() * 0.4, d = 6 + r() * 22;
    HOLES_FATAL.push({ x: Math.cos(a) * d * 0.85, y: -162 + Math.sin(a) * d * 1.35, src: i % 2 + 2 });
  }
}

/* ---------- 战机工程俯视图绘制函数 ---------- */
function drawBomber(fr, t, o = {}) {
  const col = o.color || P.ice, a = o.a == null ? 1 : o.a, w = o.w || 2.0, detail = o.detail == null ? 1 : o.detail;
  const fillCol = o.fill || '#09182C', fa = o.fa == null ? 0.55 : o.fa;

  // 1. 主机翼（左右对称多边形）
  const wingPts = [
    [-34, -88], [-120, -68], [-172, -56], [-365, -24], [-386, -4], [-386, 22], [-362, 42], [-172, 54], [-120, 58], [-34, 64],
    [34, 64], [120, 58], [172, 54], [362, 42], [386, 22], [386, -4], [365, -24], [172, -56], [120, -68], [34, -88]
  ];
  fr.poly(wingPts, { close: true, fill: fillCol, fa: fa * a, color: col, w, a: a * 0.9, glow: o.glow || 8 });

  // 机翼内部结构肋线
  if (detail > 0.3) {
    const ribA = a * 0.22 * detail;
    fr.line(-365, -6, 365, -6, { color: col, w: 1, a: ribA, dash: [6, 6] });
    fr.line(-355, 22, 355, 22, { color: col, w: 1, a: ribA });
    for (const rx of [-330, -285, -240, -195, -95, -62, 62, 95, 195, 240, 285, 330]) {
      const u = Math.abs(rx) / 386, y0 = lerp(-76, -22, u), y1 = lerp(60, 40, u);
      fr.line(rx, y0, rx, y1, { color: col, w: 1, a: ribA });
    }
  }

  // 2. 水平尾翼与双垂尾
  const tailPts = [
    [-22, 194], [-134, 216], [-144, 228], [-144, 250], [-128, 256], [-20, 248],
    [20, 248], [128, 256], [144, 250], [144, 228], [134, 216], [22, 194]
  ];
  fr.poly(tailPts, { close: true, fill: fillCol, fa: fa * a, color: col, w: w * 0.9, a: a * 0.88 });
  fr.rect(-148, 206, 8, 56, { r: 3, fill: col, fa: 0.35 * a, color: col, w: 1.4, a });
  fr.rect( 140, 206, 8, 56, { r: 3, fill: col, fa: 0.35 * a, color: col, w: 1.4, a });

  // 3. 机身
  const bodyPts = [
    [0, -262], [-18, -246], [-32, -205], [-38, -140], [-38, -20], [-34, 90], [-24, 195], [-12, 262], [0, 274],
    [12, 262], [24, 195], [34, 90], [38, -20], [38, -140], [32, -205], [18, -246]
  ];
  fr.poly(bodyPts, { close: true, fill: '#0B1E36', fa: (fa + 0.15) * a, color: col, w: w * 1.05, a, glow: o.glow || 10 });

  if (detail > 0.3) {
    fr.line(0, -258, 0, 270, { color: col, w: 1, a: a * 0.25, dash: [8, 6] });
    for (const by of [-110, -55, 0, 55, 110, 165]) {
      const bw = by < 0 ? 36 : lerp(36, 25, by / 180);
      fr.line(-bw, by, bw, by, { color: col, w: 1, a: a * 0.2 });
    }
    fr.circle(0, -28, 16, { color: col, w: 1.2, a: a * 0.45 });
  }

  // 4. 驾驶舱风挡（y: -195 .. -130）
  const cockCol = o.vitalColor || col;
  const cockGlow = o.vitalGlow || 0;
  fr.ellipse(0, -162, 24, 38, { fill: cockCol, fa: (o.vitalFillA || 0.12) * a, color: cockCol, w: w * 0.95, a: a * 0.95, glow: cockGlow });
  if (detail > 0.3) {
    fr.line(-22, -162, 22, -162, { color: cockCol, w: 1.1, a: a * 0.5 });
    fr.line(0, -198, 0, -125, { color: cockCol, w: 1.1, a: a * 0.5 });
    fr.line(-16, -184, 16, -184, { color: cockCol, w: 1.0, a: a * 0.45 });
  }

  // 5. 左右双引擎短舱（x = ±145, y = -48）与旋转螺旋桨
  for (const sx of [-1, 1]) {
    const ex = sx * 145, ey = -48;
    const engCol = o.vitalColor || col;
    fr.rect(ex - 26, ey - 54, 52, 108, {
      r: 20,
      fill: o.vitalColor ? mix('#0B1E36', o.vitalColor, 0.22) : '#0B1E36',
      fa: 0.85 * a,
      color: engCol,
      w: w * 1.05,
      a,
      glow: cockGlow
    });
    if (detail > 0.3) {
      fr.line(ex - 24, ey - 28, ex + 24, ey - 28, { color: engCol, w: 1.3, a: a * 0.55 });
      fr.circle(ex, ey - 8, 14, { color: engCol, w: 1.2, a: a * 0.5 });
    }
    const py = ey - 60;
    fr.line(ex, ey - 54, ex, py - 8, { color: engCol, w: 3, a });
    const bladeW = 36 * (0.35 + 0.65 * Math.abs(Math.cos(t * 22 + sx)));
    fr.line(ex - 38, py, ex + 38, py, { color: '#DCEBFF', w: 2.2, a: a * 0.45 });
    fr.line(ex - bladeW, py, ex + bladeW, py, { color: '#FFFFFF', w: 3.2, a: a * 0.85 });
  }
}

/* ---------- 绘制金色重装甲组件（深古铜底防辉光过曝，标签清晰锐利） ---------- */
function drawArmorPlate(fr, cx, cy, w, h, a, label, highlight = 0) {
  if (a <= 0) return;
  fr.g({ at: [cx, cy], a }, () => {
    fr.glow(0, 0, Math.max(w, h) * 0.72, P.gold, 0.14 + 0.12 * highlight);
    fr.rect(-w / 2, -h / 2, w, h, {
      r: 10,
      fill: '#141008',
      fa: 0.94,
      color: P.gold,
      w: 2.4,
      glow: 8 + highlight * 6
    });
    // 装甲内衬斜纹与四角铆钉
    fr.rect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, { r: 6, color: P.gold, w: 1, a: 0.42, dash: [5, 4] });
    for (const [rx, ry] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      fr.circle(rx * (w / 2 - 11), ry * (h / 2 - 11), 2.8, { fill: P.gold });
    }
    if (label) {
      fr.text(label, 0, 0, { font: 'sansm', size: 18, track: 2, color: P.gold });
    }
  });
}

/* ==========================================================================
 * 场景 1 & 2 (0.0s – 10.6s)：
 * 返航战机的 58 处弹孔统计 + 军方的直觉陷阱（把装甲贴向机翼被红叉弹开）
 * ========================================================================== */
function sceneSurveyAndTrap(fr, t) {
  scene(fr, t, T.s1, T.s3, (lt, env) => {
    const cx = W * 0.5 - 65 * ss(t, 5.0, 6.2), cy = H * 0.45;
    const planeScale = 1.05;

    if (lt < 0.1) fr.sfx(0.15, 'sweep', { dur: 1.2, f0: 90, f1: 240 });

    fr.g({ at: [cx, cy], s: planeScale }, () => {
      drawBomber(fr, t, { a: ss(lt, 0, 0.9), color: P.ice });

      // 58 颗幸存者弹孔逐颗亮起 (0.5s -> 3.0s)
      HOLES_SURV.forEach((h, idx) => {
        const hk = ss(lt, 0.45 + h.d, 0.68 + h.d);
        if (hk <= 0) return;
        if (idx % 5 === 0) fr.sfx(0.5 + h.d, 'tick', { freq: 1100 + (idx % 7) * 90 });
        const pulse = 1 + 0.25 * Math.sin(t * 4 + idx);
        fr.glow(h.x, h.y, 14 * hk * pulse, P.rose, 0.55 * hk);
        fr.circle(h.x, h.y, 4.6 * E.outBack(hk), { fill: '#FF5E88', color: '#FFD4DF', w: 1.2, a: hk });
      });

      // 2.6s 起：用冰蓝虚线圈出“干干净净”的双引擎与驾驶舱
      const cleanK = fade(t, 2.5, 10.3, 0.5, 0.5);
      if (cleanK > 0) {
        const dashOff = -t * 28;
        fr.circle(-145, -48, 44, { color: P.iceHi, w: 2.0, dash: [8, 6], dashOff, a: cleanK * 0.9, glow: 10 });
        fr.circle( 145, -48, 44, { color: P.iceHi, w: 2.0, dash: [8, 6], dashOff, a: cleanK * 0.9, glow: 10 });
        fr.circle(   0, -162, 42, { color: P.iceHi, w: 2.0, dash: [8, 6], dashOff, a: cleanK * 0.9, glow: 10 });
      }
    });

    // 左侧统计标注：机翼与机尾 58 处弹孔
    const statL = fade(t, 1.2, 10.3, 0.5, 0.5);
    if (statL > 0) {
      const count = Math.round(58 * ss(t, 0.5, 2.8));
      const lx = 260, ly = 330;
      fr.rect(lx - 150, ly - 78, 300, 156, { r: 12, fill: '#081224', fa: 0.78 * statL, color: P.rose, w: 1.5, a: statL * 0.7 });
      fr.text('返航表面弹孔统计', lx, ly - 44, { font: 'sansm', size: 22, track: 3, color: P.sub, a: statL });
      fr.text(`${count} 处`, lx, ly + 4, { font: 'serifh', size: 54, color: P.rose, glow: 12, a: statL });
      fr.text('机翼 36 · 机尾 12 · 机身 10', lx, ly + 50, { font: 'sansr', size: 19, color: P.label, a: statL });
      fr.line(lx + 150, ly, cx - 255 * planeScale, cy - 10, { color: P.rose, w: 1.5, dash: [6, 5], a: statL * 0.65 });
    }

    // 右侧（第一阶段 2.6s–5.3s）：双引擎与驾驶舱 0 处弹孔
    const statR1 = fade(t, 2.6, 5.4, 0.45, 0.4);
    if (statR1 > 0) {
      const rx = 1640, ry = 330;
      fr.rect(rx - 150, ry - 78, 300, 156, { r: 12, fill: '#081224', fa: 0.78 * statR1, color: P.ice, w: 1.5, a: statR1 * 0.75 });
      fr.text('双引擎 · 驾驶舱', rx, ry - 44, { font: 'sansm', size: 22, track: 3, color: P.sub, a: statR1 });
      fr.text('0 处', rx, ry + 4, { font: 'serifh', size: 54, color: P.iceHi, glow: 12, a: statR1 });
      fr.text('完好无损 · 干干净净', rx, ry + 50, { font: 'sansr', size: 19, color: P.ice, a: statR1 });
      fr.line(rx - 150, ry - 15, cx + 145 * planeScale, cy - 48 * planeScale, { color: P.ice, w: 1.5, dash: [6, 5], a: statR1 * 0.65 });
    }

    // 第二阶段 (5.2s–10.6s)：提问 + 军方直觉把装甲贴向机翼被红叉弹回
    const armK = fade(t, 5.2, 10.4, 0.45, 0.5);
    if (armK > 0) {
      fr.sfx(5.35, 'bell', { freq: 520 });
      const moveIn = E.io3(seg(t, 7.6, 8.65));
      const reject = E.outBack(seg(t, 8.75, 9.45));
      const homeX = 1560, homeY = 435;
      const wingX = cx - 265 * planeScale, wingY = cy + 6;
      const curX = lerp(lerp(homeX, wingX, moveIn), homeX - 30, reject);
      const curY = lerp(lerp(homeY, wingY, moveIn), homeY + 25, reject);

      if (t < 8.8) {
        fr.line(homeX - 95, homeY, wingX + 75, wingY, { color: P.gold, w: 2, dash: [8, 7], dashOff: -t * 40, a: armK * 0.55 });
      }

      drawArmorPlate(fr, curX, curY, 176, 84, armK, '重装甲板', 1 - reject * 0.5);

      const qK = fade(t, 5.3, 7.8, 0.35, 0.35);
      if (qK > 0) {
        fr.text('该贴在哪？', homeX, homeY - 82, { font: 'serif', size: 32, track: 4, color: P.gold, glow: 8, a: qK });
        fr.text('配重上限：仅够保护 1 处部位', homeX, homeY + 76, { font: 'sansr', size: 20, color: P.label, a: qK });
      }

      // 8.7s：贴上机翼瞬间亮起红叉 ✕ 与警告框（加宽至 436px 防文字贴边）
      const errK = fade(t, 8.65, 10.4, 0.12, 0.45);
      if (errK > 0) {
        fr.sfx(8.7, 'hit', { freq: 140 });
        K.ripple(fr, t, 8.7, wingX, wingY, { r0: 20, r1: 220, dur: 0.9, color: P.rose });
        fr.g({ at: [wingX, wingY], a: errK, s: E.outBack(seg(t, 8.65, 8.95)) }, () => {
          fr.circle(0, 0, 52, { fill: '#2B0712', fa: 0.85, color: P.rose, w: 3, glow: 16 });
          fr.line(-24, -24, 24, 24, { color: '#FF6B90', w: 5.5, glow: 10 });
          fr.line( 24, -24, -24, 24, { color: '#FF6B90', w: 5.5, glow: 10 });
        });
        const cardX = 1530, cardY = 290, cardW = 436, cardH = 114;
        fr.rect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, { r: 12, fill: '#101626', fa: 0.92 * errK, color: P.gold, w: 1.8, a: errK });
        fr.text('军方直觉：哪里弹孔多补哪里 ✕', cardX, cardY - 22, { font: 'sansm', size: 21, color: P.rose, a: errK });
        fr.text('沃尔德：你们只看见了活着回来的飞机', cardX, cardY + 22, { font: 'serif', size: 22, color: P.gold, a: errK });
      }
    }
  }, 0.5, 0.5);
}

/* ==========================================================================
 * 场景 3 (10.6s – 20.2s)：
 * 当场做一遍 —— 12 架战机出击穿越防空火网：8 架机翼中弹返航 vs 4 架引擎中弹坠海
 * ========================================================================== */
const SQUAD = [
  { id: 0,  y0: 195, t0: 11.0, fate: 'surv',  hitPart: '左翼中弹' },
  { id: 1,  y0: 248, t0: 11.2, fate: 'crash', hitPart: '左引擎起火', crashX: 640 },
  { id: 2,  y0: 301, t0: 11.4, fate: 'surv',  hitPart: '机尾中弹' },
  { id: 3,  y0: 354, t0: 11.6, fate: 'surv',  hitPart: '右翼中弹' },
  { id: 4,  y0: 407, t0: 11.8, fate: 'crash', hitPart: '驾驶舱中弹', crashX: 810 },
  { id: 5,  y0: 460, t0: 12.0, fate: 'surv',  hitPart: '左翼中弹' },
  { id: 6,  y0: 513, t0: 12.2, fate: 'surv',  hitPart: '后机身中弹' },
  { id: 7,  y0: 566, t0: 12.4, fate: 'crash', hitPart: '右引擎爆炸', crashX: 980 },
  { id: 8,  y0: 619, t0: 12.6, fate: 'surv',  hitPart: '右翼中弹' },
  { id: 9,  y0: 672, t0: 12.8, fate: 'surv',  hitPart: '尾翼中弹' },
  { id: 10, y0: 725, t0: 13.0, fate: 'crash', hitPart: '双引擎中弹', crashX: 1150 },
  { id: 11, y0: 778, t0: 13.2, fate: 'surv',  hitPart: '左翼中弹' },
];

function drawMiniPlane(fr, x, y, rot, col, hitType, hitK, a) {
  fr.g({ at: [x, y], rot, a }, () => {
    fr.poly([[28, 0], [10, -7], [-26, -4], [-28, 0], [-26, 4], [10, 7]], { close: true, fill: '#0A192F', color: col, w: 1.6 });
    fr.poly([[4, -6], [-6, -32], [-14, -30], [-8, -5], [-8, 5], [-14, 30], [-6, 32], [4, 6]], { close: true, fill: '#0A192F', color: col, w: 1.5 });
    fr.poly([[-18, -3], [-26, -15], [-29, -13], [-24, 0], [-29, 13], [-26, 15], [-18, 3]], { close: true, color: col, w: 1.3 });
    if (hitK > 0) {
      if (hitType === 'surv') {
        fr.spark(-4, -20, 4.5 * hitK, P.rose, hitK);
        fr.spark(-16, 14, 4.0 * hitK, P.rose, hitK);
      } else {
        fr.spark(10, -10, 7.5 * hitK, P.gold, hitK);
        fr.glow(10, 0, 24 * hitK, P.rose, 0.85 * hitK);
      }
    }
  });
}

function sceneSortie(fr, t) {
  scene(fr, t, T.s3, T.s4, (lt, env) => {
    const xStart = 210, xFlak = 580, xBase = 1350, seaY = 820;
    const flightDur = 2.8;

    // 1. 顶部区域标题（下移至 y=144 避开左上角章节标）
    fr.text('出击编队 · 12 架', xStart, 142, { font: 'serif', size: 28, color: P.ink });
    fr.text('100% 完整出航样本', xStart, 172, { font: 'sansr', size: 17, color: P.label });

    // 防空火网带 (x: 500 .. 660)
    fr.rect(xFlak - 80, 105, 160, seaY - 105, { r: 8, fill: '#260812', fa: 0.35, color: P.rose, w: 1.2, dash: [8, 6], a: 0.65 });
    fr.text('防空火网 FLAK', xFlak, 132, { font: 'sansm', size: 22, track: 2, color: P.rose, glow: 8 });
    for (let i = 0; i < 9; i++) {
      const cyc = ((t * 1.4 + i * 0.37) % 1);
      const bx = xFlak - 60 + hash(i * 19 + Math.floor(t * 2)) * 120;
      const by = seaY - 30 - cyc * (seaY - 175);
      fr.line(bx, by + 45, bx, by, { color: P.rose, w: 1.8, a: (1 - cyc) * 0.65 });
      if (cyc > 0.72) {
        const pk = Math.sin(((cyc - 0.72) / 0.28) * Math.PI);
        fr.spark(bx, by, 6 * pk, P.rose, pk * 0.75);
      }
    }

    // 底部深海/坠毁消亡区（640, 810, 980, 1150 间隔 170px 彻底防重叠）
    fr.line(480, seaY, 1270, seaY, { color: P.rose, w: 1.6, a: 0.55 });
    fr.rect(480, seaY, 790, 72, { fill: '#19050C', fa: 0.5 });

    // 2. 12 架轰炸机逐架飞越火网
    let survArrived = 0, crashedCount = 0;
    SQUAD.forEach((p, idx) => {
      const u = seg(t, p.t0, p.t0 + flightDur);
      if (u <= 0) return;
      if (t - p.t0 < 0.04) fr.sfx(p.t0, 'whoosh', { dur: 0.35 });

      const hitU = (xFlak - xStart) / (xBase - xStart); // ~0.325
      const hitK = ss(u, hitU - 0.03, hitU + 0.08);

      if (p.fate === 'surv') {
        const px = lerp(xStart, xBase, E.io3(u));
        const wobble = u > hitU ? Math.sin((u - hitU) * 28 + idx) * 6 * (1 - u) : 0;
        const py = p.y0 + wobble;
        fr.line(xStart, p.y0, px, py, { color: P.ice, w: 1.3, a: 0.38 });
        if (u > hitU) {
          fr.circle(xFlak, p.y0, 4, { fill: P.rose, a: 0.8 });
        }
        if (u >= 0.96) survArrived++;
        drawMiniPlane(fr, px, py, wobble * 0.015, P.ice, 'surv', hitK, 1);
      } else {
        if (Math.abs(t - (p.t0 + flightDur * hitU)) < 0.03) fr.sfx(p.t0 + flightDur * hitU, 'hit', { freq: 110 });
        if (u <= hitU) {
          const px = lerp(xStart, xFlak, u / hitU);
          fr.line(xStart, p.y0, px, p.y0, { color: P.ice, w: 1.3, a: 0.38 });
          drawMiniPlane(fr, px, p.y0, 0, P.ice, 'crash', 0, 1);
        } else {
          const fu = clamp((u - hitU) / (1 - hitU));
          const px = lerp(xFlak, p.crashX, E.out2(fu));
          const py = lerp(p.y0, seaY - 6, fu * fu);
          const rot = lerp(0, 0.95, fu);
          const trail = [];
          for (let s = 0; s <= 12; s++) {
            const su = (s / 12) * fu;
            trail.push([lerp(xFlak, p.crashX, E.out2(su)), lerp(p.y0, seaY - 6, su * su)]);
          }
          fr.poly(trail, { color: P.rose, w: 2.0, dash: [5, 4], a: 0.8, glow: 6 });
          fr.spark(xFlak, p.y0, 7, P.gold, 0.9);
          if (fu < 0.96) {
            drawMiniPlane(fr, px, py, rot, P.rose, 'crash', 1, 1);
          } else {
            crashedCount++;
            fr.glow(p.crashX, seaY, 32, P.rose, 0.55);
            fr.line(p.crashX - 9, seaY - 18, p.crashX + 9, seaY - 18, { color: P.rose, w: 2.8 });
            fr.line(p.crashX, seaY - 28, p.crashX, seaY - 4, { color: P.rose, w: 2.8 });
            fr.ellipse(p.crashX, seaY + 4, 26, 6, { color: P.rose, w: 1.4, a: 0.7 });
            fr.text(p.hitPart, p.crashX, seaY + 26, { font: 'sansr', size: 17, color: '#FF94AE', a: 0.95 });
          }
        }
      }
    });

    const sinkK = ss(t, 13.8, 15.0);
    if (sinkK > 0) {
      fr.text(`中途坠海 · ${crashedCount} 架（引擎/座舱中弹 · 沉默样本，永远无法返航）`, 875, seaY + 56, {
        font: 'serif', size: 23, track: 2, color: P.rose, glow: 8, a: sinkK
      });
    }

    // 3. 右侧返航基地面板：8 架幸存者的弹孔叠加成开头那张图
    const rx = 1640, ry = 465;
    fr.rect(rx - 210, 105, 420, 710, { r: 16, fill: '#071326', fa: 0.82, color: P.ice, w: 1.6, a: 0.8 });
    fr.text(`返航幸存 · ${survArrived} 架`, rx, 148, { font: 'serif', size: 32, color: P.iceHi, glow: 8 });
    fr.text('军方唯一能统计到的样本', rx, 184, { font: 'sansr', size: 19, color: P.label });

    fr.g({ at: [rx, ry + 35], s: 0.46 }, () => {
      drawBomber(fr, t, { a: 0.9, color: P.ice, detail: 0.5 });
      const showN = Math.round((survArrived / 8) * HOLES_SURV.length);
      for (let i = 0; i < showN; i++) {
        const h = HOLES_SURV[i];
        fr.circle(h.x, h.y, 6.5, { fill: P.rose, color: '#FFD4DF', w: 1 });
      }
    });
    fr.text('机翼弹孔 = 挨打也能活下来的安全区', rx, 765, { font: 'sansm', size: 20, color: P.gold, a: ss(t, 14.0, 15.2) });
  }, 0.5, 0.5);
}

/* ==========================================================================
 * 场景 4 (20.2s – 26.5s)：
 * 反过来 —— 机翼红点褪去，24 颗金色致命弹孔填满引擎与驾驶舱，金色重装甲精准锁死！
 * ========================================================================== */
function sceneInversion(fr, t) {
  scene(fr, t, T.s4, T.s5, (lt, env) => {
    const cx = W * 0.5, cy = H * 0.45, planeScale = 1.08;

    if (lt < 0.15) fr.sfx(20.3, 'chord', { freq: 220 });
    K.flash(fr, t, 20.35, { color: '#DCEBFF', peak: 0.45, fall: 0.4 });
    K.ripple(fr, t, 20.35, cx, cy, { r0: 50, r1: 720, dur: 1.3, color: P.gold });

    const dimSurv = ss(t, 20.6, 21.8);
    const riseGold = ss(t, 21.1, 22.8);
    const lockArmor = E.outBack(seg(t, 23.6, 24.5));
    const armorCover = seg(t, 23.6, 24.2);

    if (Math.abs(t - 23.7) < 0.03) fr.sfx(23.7, 'bell', { freq: 660 });

    fr.g({ at: [cx, cy], s: planeScale }, () => {
      drawBomber(fr, t, {
        a: 1,
        color: mix(P.ice, '#52708C', dimSurv * 0.45),
        vitalColor: riseGold > 0 ? mix(P.ice, P.gold, riseGold) : P.ice,
        vitalGlow: riseGold * 10 * (1 - armorCover * 0.6),
        vitalFillA: 0.12 + riseGold * 0.22 * (1 - armorCover * 0.5)
      });

      // 58 颗机翼弹孔褪色为半透明暗蓝
      HOLES_SURV.forEach(h => {
        const col = mix(P.rose, '#4A6378', dimSurv);
        const al = lerp(0.9, 0.32, dimSurv);
        fr.circle(h.x, h.y, 4.2, { fill: col, a: al });
      });

      // 24 颗海底坠毁战机的致命弹孔（装甲扣合后压低亮度防过曝）
      if (riseGold > 0) {
        HOLES_FATAL.forEach((h, i) => {
          const k = E.io3(seg(t, 21.0 + i * 0.04, 22.2 + i * 0.04));
          if (k <= 0) return;
          if (i % 4 === 0 && k < 0.15) fr.sfx(21.1 + i * 0.04, 'tick', { freq: 1480 + i * 35 });
          const sx = (h.src - 1.5) * 260, sy = 380;
          const px = lerp(sx, h.x, k), py = lerp(sy, h.y, k);
          fr.spark(px, py, 5.2, P.gold, k * (1 - armorCover * 0.78));
        });
      }

      // 23.6s：三块弧形金色重装甲严丝合缝扣合在左引擎、右引擎与驾驶舱
      if (lockArmor > 0) {
        const offL = (1 - lockArmor) * -140, offR = (1 - lockArmor) * 140, offC = (1 - lockArmor) * -110;
        drawArmorPlate(fr, -145 + offL, -48, 86, 122, armorCover, '左发装甲', 0.4);
        drawArmorPlate(fr,  145 + offR, -48, 86, 122, armorCover, '右发装甲', 0.4);
        drawArmorPlate(fr,    0, -162 + offC, 86, 92, armorCover, '座舱装甲', 0.4);
      }
    });

    // 左右对照结论标注卡片（加宽至 380px 并控制辉光）
    const cardK = fade(t, 21.6, 26.3, 0.5, 0.4);
    if (cardK > 0) {
      fr.rect(80, 360, 370, 148, { r: 12, fill: '#081222', fa: 0.85 * cardK, color: '#4A6378', w: 1.5, a: cardK });
      fr.text('看得见的红点（58 处）', 265, 400, { font: 'sansm', size: 22, color: '#8FA3B5', a: cardK });
      fr.text('冗余区 · 挨打也能返航', 265, 442, { font: 'serif', size: 26, color: P.sub, a: cardK });
      fr.text('无需优先加装重装甲', 265, 482, { font: 'sansr', size: 18, color: P.label, a: cardK });

      fr.rect(1470, 360, 370, 148, { r: 12, fill: '#181208', fa: 0.92 * cardK, color: P.gold, w: 2.0, a: cardK, glow: 8 });
      fr.text('看不见的空白（0 处返航）', 1655, 400, { font: 'sansm', size: 22, color: P.gold, a: cardK });
      fr.text('致命区 · 沃尔德真正的装甲位', 1655, 442, { font: 'serif', size: 25, color: '#FFF6DC', a: cardK });
      fr.text('二战美军据此改装，挽救上千机组', 1655, 482, { font: 'sansr', size: 18, color: P.goldLo, a: cardK });
    }
  }, 0.4, 0.6);
}

/* ==========================================================================
 * 场景 5 (26.5s – 33.5s)：
 * 命名 —— 点阵聚成《幸存者偏差》片名卡
 * ========================================================================== */
function sceneTitle(fr, t) {
  scene(fr, t, T.s5, T.end, (lt, env) => {
    if (lt < 0.1) fr.sfx(T.s5 + 0.1, 'shimmer', { dur: 2.5 });
    K.titleNight(fr, lt * 1.25, {
      zh: '幸存者偏差',
      sub: '别只听幸存者说话 · 1943 ABRAHAM WALD',
      en: 'SURVIVORSHIP BIAS · COUNT THE SILENT ONES',
      a: env
    });
  }, 0.6, 0.6);
}

VK.film({
  dur: T.end,
  theme: 'night',
  meta: { title: '幸存者偏差 · 看不见的弹孔' },
  draw(fr, t) {
    const dip = K.dips(t, [T.s3, T.s4, T.s5], 0.45);
    fr.look.bgo = { core: 0.95 * dip, stars: 1.0 };

    sceneSurveyAndTrap(fr, t);
    sceneSortie(fr, t);
    sceneInversion(fr, t);
    sceneTitle(fr, t);

    K.chapterMark(fr, t, MARKS, T.s5);
    K.subs(fr, t, SUBS, 'night');
  },
});
})();
