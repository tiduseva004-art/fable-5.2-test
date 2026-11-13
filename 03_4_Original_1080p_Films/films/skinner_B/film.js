/* ★ 不确定的奖赏 · 斯金纳箱（B 寓言扁平插画 flat）
 * 事实出处：B. F. Skinner & C. B. Ferster (1957), Schedules of Reinforcement, Harvard Pigeon Lab.
 * 画面中白鸽、喂食箱落粮、深夜手机下拉刷新与渴求读数仪表为教学可视化示意。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, smooth, ss, E, fade, hash, rng, rgba, mix, scene } = VK;
const K = VKit, P = K.PAL.flat;

const T = {
  s1: 0.0,
  s2: 6.4,
  s3: 13.6,
  s4: 20.6,
  s5: 27.2,
  end: 33.5,
};

const SUBS = [
  { a: 0.45, b: 6.05, zh: '啄一下就掉一颗谷子，鸽子{吃饱就停}。' },
  { a: 6.65, b: 13.25, zh: '把按钮改成{!看运气掉粮}，它反而像着了魔一样狂啄不止。' },
  { a: 13.85, b: 20.25, zh: '哪怕把粮食彻底断掉，被{!随机喂养}的那只也久久不肯离开。' },
  { a: 20.85, b: 26.85, zh: '七十年后，深夜里的手指一次次{!下拉刷新}，等的是同一颗谷子。' },
  { a: 27.65, b: 32.95, zh: '让人上瘾的从不是奖赏本身，而是{下一次也许会有}。', tone: 'gold' },
];

/* ---------- 角色：扁平几何色块白鸽（无描边，支持朝向 dir=1/-1、低头啄 peck=0..1、迈步 walk） ---------- */
function drawPigeon(fr, cx, cy, s, o = {}) {
  const a = o.a == null ? 1 : o.a;
  if (a <= 0) return;
  const dir = o.dir == null ? 1 : o.dir;
  const peck = clamp(o.peck || 0, 0, 1);
  const walk = o.walk || 0;

  fr.g({ at: [cx, cy], s, a }, () => {
    // 地面柔和投影
    fr.ellipse(0, 74, 68, 11, { fill: '#2B2118', a: 0.24 });

    fr.g({ at: [0, 0] }, () => {
      const x = fr.x;
      x.save();
      x.scale(dir, 1);

      // 橘红细腿（随步态轻微交替）
      const legSwing = Math.sin(walk * 8) * 7;
      fr.line(-10, 32, -14 + legSwing, 72, { color: '#D95F38', w: 5.5 });
      fr.line(12, 32, 10 - legSwing, 72, { color: '#C24E2B', w: 5.5 });
      fr.line(-20 + legSwing, 72, -2 + legSwing, 72, { color: '#D95F38', w: 4.5 });
      fr.line(4 - legSwing, 72, 22 - legSwing, 72, { color: '#C24E2B', w: 4.5 });

      // 躯干与尾羽随啄击前倾
      const bodyTilt = peck * 0.34;
      fr.g({ at: [4, 14], rot: bodyTilt }, () => {
        // 灰蓝尾羽
        fr.poly([[-44, -2], [-96, -18], [-88, 10], [-36, 16]], { close: true, fill: '#7B8791' });
        // 暖白圆润身体
        fr.ellipse(-4, -2, 56, 36, { rot: -0.14, fill: '#F3EEE3' });
        // 灰蓝折叠翅羽色块（两道简洁横斑）
        fr.ellipse(-12, -4, 38, 22, { rot: -0.1, fill: '#BFC7CC' });
        fr.rect(-32, -12, 8, 26, { r: 3, fill: '#6A7580' });
        fr.rect(-16, -14, 8, 28, { r: 3, fill: '#6A7580' });

        // 脖颈与头部（低头啄击时额外前探）
        fr.g({ at: [34, -22], rot: peck * 0.48 }, () => {
          // 颈部虹彩灰绿小色块
          fr.ellipse(-2, 4, 18, 24, { rot: 0.18, fill: '#8BA39A' });
          // 圆头
          fr.circle(8, -16, 20, { fill: '#F7F3EA' });
          // 橘红圆眼 + 深色瞳仁
          fr.circle(14, -19, 5.2, { fill: '#E26236' });
          fr.circle(15, -19, 2.5, { fill: '#1D1916' });
          // 尖喙
          fr.poly([[25, -20], [46, -13], [25, -9]], { close: true, fill: '#DD612C' });
          fr.ellipse(27, -18, 5, 3.2, { fill: '#FBF7EE' });
        });
      });

      x.restore();
    });
  });
}

/* ---------- 道具：斯金纳喂食箱立面（无描边扁平木箱 + 发光圆钮 + 落粮斜槽 + 食盆） ---------- */
function drawFeeder(fr, cx, cy, s, o = {}) {
  const a = o.a == null ? 1 : o.a;
  if (a <= 0) return;
  const hot = Boolean(o.hot);
  const press = clamp(o.press || 0, 0, 1);
  const btnCol = hot ? '#E8402A' : '#4E8E72';
  const side = o.side || 'right'; // 'right' = 按钮在箱体左侧朝向右边鸽子, 'left' = 朝左

  fr.g({ at: [cx, cy], s, a }, () => {
    const dir = side === 'left' ? -1 : 1;
    fr.x.save();
    fr.x.scale(dir, 1);

    // 木质实验箱主体
    fr.rect(-125, -185, 210, 310, { r: 14, fill: '#4A3828' });
    fr.rect(-110, -168, 180, 276, { r: 10, fill: '#35271C' });

    // 顶部粮仓玻璃视窗与谷物层
    fr.rect(-82, -148, 124, 72, { r: 8, fill: '#221912' });
    if (!o.empty) {
      fr.rect(-78, -116, 116, 36, { r: 5, fill: '#DDAE4A' });
      fr.text(hot ? '随机落粮器' : '定量落粮器', -20, -132, { font: 'sansm', size: 17, color: '#D8CFBF' });
    } else {
      fr.text('粮仓已切断', -20, -112, { font: 'sansm', size: 18, color: '#E86A54' });
    }

    // 侧面凸出的啄击圆钮（随啄击向内回弹并发光）
    const bx = 84 - press * 7, by = -28;
    if (press > 0.05 || hot) {
      fr.glow(bx + 8, by, hot ? 76 : 48, btnCol, (hot ? 0.22 : 0.14) + press * 0.28);
    }
    fr.rect(72, by - 28, 22, 56, { r: 6, fill: '#241B14' });
    fr.circle(bx + 12, by, 22, { fill: btnCol });
    fr.text(hot ? '?' : '1', bx + 12, by + 1, { font: 'sansh', size: 22, color: '#FFFAEB' });

    // 底部接粮食槽
    fr.poly([[68, 72], [142, 72], [130, 118], [68, 118]], { close: true, fill: '#5E4835' });
    fr.rect(64, 66, 82, 10, { r: 4, fill: '#7B6048' });

    // 食盆内积攒的玉米粒
    const seeds = o.seeds || 0;
    for (let i = 0; i < seeds; i++) {
      const sx = 86 + (i % 4) * 13, sy = 62 - Math.floor(i / 4) * 8;
      fr.circle(sx, sy, 5.5, { fill: '#F0C259' });
    }

    // 正在下落的玉米粒轨迹 (dropK: 0..1)
    if (o.dropK > 0 && o.dropK < 1) {
      const count = o.dropCount || 1;
      for (let k = 0; k < count; k++) {
        const kk = clamp(o.dropK * 1.25 - k * 0.16, 0, 1);
        if (kk <= 0) continue;
        const gx = lerp(74, 98 + k * 11, kk);
        const gy = lerp(24, 62, E.in2(kk));
        fr.circle(gx, gy, 6.2, { fill: '#FFD46B', glow: 8 });
      }
    }

    fr.x.restore();
  });
}

/* ==========================================================================
 * 场景 1 (0.0s – 6.4s)：1950 哈佛鸽舍 · 确定奖赏（K.sepia 老纪录片暖黄质感）
 * ========================================================================== */
const S1_PECKS = [1.45, 3.05];

function sceneFixedLab(fr, t) {
  const a = fade(t, T.s1, T.s2 + 0.35, 0.35, 0.45);
  if (a <= 0) return;

  // 计算啄击动作包络
  let peck = 0, dropK = 0, seeds = 0;
  for (const pt of S1_PECKS) {
    const u = seg(t, pt, pt + 0.42);
    if (u > 0 && u < 1) peck = Math.max(peck, Math.sin(u * Math.PI));
    const d = seg(t, pt + 0.18, pt + 0.68);
    if (d > 0 && d < 1) dropK = d;
    if (t > pt + 0.62) seeds++;
    if (Math.abs(t - (pt + 0.16)) < 0.02) {
      fr.sfx(pt + 0.16, 'tock', { pitch: 2, gain: 0.75 });
      fr.sfx(pt + 0.34, 'tick', { pitch: 4, gain: 0.65 });
    }
  }

  const stepBack = ss(t, 4.3, 5.4);

  // 三层扁平场景（远景墙面与高窗 -> 实验台与喂食器+白鸽 -> 前景暗边）
  fr.layer({ a }, () => {
    // 远景：暖米灰实验室墙面 + 斜射阳光束
    fr.rect(0, 0, W, H, { fill: '#D9CEB8' });
    fr.poly([[1180, 0], [1640, 0], [1340, 680], [820, 680]], { close: true, fill: '#EFE6D2', fa: 0.55 });
    fr.rect(1260, 68, 320, 210, { r: 6, fill: '#E8DFCA' });
    fr.line(1420, 68, 1420, 278, { color: '#B7AA92', w: 6 });
    fr.line(1260, 173, 1580, 173, { color: '#B7AA92', w: 6 });

    // 中景：木质实验台面自然向下压暗至画幅底边（给底部暖白字幕提供温润高对比度暗木衬底）
    const floorGrad1 = fr.grad(0, 650, 0, H, [[0, '#B59B78'], [0.42, '#7D654B'], [1, '#2E2319']]);
    fr.rect(0, 650, W, H - 650, { fill: floorGrad1 });
    fr.rect(0, 650, W, 14, { fill: '#C8B08E' });

    // 左侧定量喂食箱
    drawFeeder(fr, 690, 526, 1.0, { hot: false, press: peck, dropK, dropCount: 1, seeds });

    // 白鸽：4.3s 吃饱后悠闲后退半步昂头停下
    const px = lerp(925, 1020, stepBack);
    drawPigeon(fr, px, 576, 1.12, { dir: -1, peck, walk: stepBack * 1.4 });

    // 引线标注
    const noteA = ss(t, 4.4, 5.0);
    if (noteA > 0) {
      fr.line(px + 20, 468, px + 88, 418, { color: '#4B3B2B', w: 2, a: noteA });
      fr.text('预期 100% 确定 · 吃饱即停 ✓', px + 235, 408, { font: 'sans', size: 30, color: '#3E2F21', a: noteA });
    }

    // 右侧温和计数
    fr.text('啄击频率', 1510, 215, { font: 'sansm', size: 30, color: '#5A4A3A' });
    fr.text(String(seeds * 6), 1510, 295, { font: 'sansh', size: 84, color: '#3B2E22' });
    fr.text('次 / 分钟（平稳）', 1510, 355, { font: 'sansr', size: 24, color: '#6E5C49' });
  });

  // 20 世纪中叶纪录片泛黄效果：只作用在已画好的实验室场景上，不染仪表和字幕
  K.sepia(fr, 0.78 * a, { weave: true });

  // 顶部年代说明行 + 左上本能读数仪表
  fr.text('1950 · 哈佛大学斯金纳鸽舍实验', W / 2, 62, { font: 'sans', size: 32, track: 3.5, color: '#F3EBDA', a, shadow: 0.65 });
  const gaugeVal = lerp(42, 52, peck) - stepBack * 10;
  K.gauge(fr, 54, 42, { value: gaugeVal, label: '渴求读数', zone: '超常', caption: '对象：确定奖赏', a });
}

/* ==========================================================================
 * 场景 2 (6.4s – 13.6s)：随机掉粮实验 · 渴求读数冲破红区 136
 * ========================================================================== */
const S2_PECKS = [6.9, 7.55, 8.2, 8.95, 9.45, 9.9, 10.35, 10.78, 11.2, 11.6, 12.0, 12.4, 12.8];
const S2_REWARD_IDX = new Set([2, 7]); // 只有第 3 次、第 8 次意外掉出 3 颗谷子！

function sceneRandomLab(fr, t) {
  const a = fade(t, T.s2 - 0.25, T.s3 + 0.35, 0.45, 0.45);
  if (a <= 0) return;

  let peck = 0, dropK = 0, peckCount = 0, seeds = 0;
  S2_PECKS.forEach((pt, idx) => {
    const u = seg(t, pt, pt + 0.32);
    if (u > 0 && u < 1) peck = Math.max(peck, Math.sin(u * Math.PI));
    if (t >= pt) peckCount++;
    if (Math.abs(t - (pt + 0.12)) < 0.02) {
      fr.sfx(pt + 0.12, 'tock', { pitch: Math.min(9, idx), gain: 0.72 });
    }
    if (S2_REWARD_IDX.has(idx)) {
      const d = seg(t, pt + 0.14, pt + 0.64);
      if (d > 0 && d < 1) dropK = d;
      if (t > pt + 0.5) seeds += 2;
      if (Math.abs(t - (pt + 0.18)) < 0.02) {
        fr.sfx(pt + 0.18, 'shimmer', { gain: 0.9 });
      }
    }
  });

  // 镜头轻微推近强化紧张感
  const zoom = lerp(1.0, 1.07, ss(t, T.s2, T.s3));
  fr.layer({ a, s: zoom, cx: W / 2, cy: 520 }, () => {
    // 暖沙对比背景 + 自然压暗木台直通底边
    const sky = fr.grad(0, 0, 0, 660, [[0, '#7F939C'], [1, '#DECFAF']]);
    fr.rect(0, 0, W, 660, { fill: sky });
    const floorGrad2 = fr.grad(0, 650, 0, H, [[0, '#C2A882'], [0.42, '#7A6045'], [1, '#261C14']]);
    fr.rect(0, 650, W, H - 650, { fill: floorGrad2 });
    fr.rect(0, 650, W, 12, { fill: '#DEC9A4' });

    // 随机问号喂食箱（红热状态）
    drawFeeder(fr, 680, 526, 1.04, { hot: true, press: peck, dropK, dropCount: 3, seeds: Math.min(6, seeds) });
    drawPigeon(fr, 920, 578, 1.15, { dir: -1, peck });

    // 空响 vs 爆奖实时反馈气泡
    const missA = fade(t, 7.0, 8.1, 0.15, 0.2);
    if (missA > 0) {
      fr.text('空响 × 2（没掉粮）', 810, 355, { font: 'sans', size: 27, color: '#5A4A3C', a: missA });
    }
    const jackpotA = fade(t, 8.3, 9.7, 0.15, 0.25);
    if (jackpotA > 0) {
      fr.glow(790, 480, 120, '#FC593F', 0.25 * jackpotA);
      fr.text('突然掉出 3 颗！多巴胺暴涨', 865, 345, { font: 'sansh', size: 30, color: '#D9381E', a: jackpotA });
    }
  });

  // 右侧夸张红字计数飙升
  const rate = Math.round(lerp(18, 142, E.in2(seg(t, 7.2, 12.9))));
  fr.text('啄击频率（随机组）', 1500, 205, { font: 'sans', size: 32, color: '#3E3124', a });
  fr.text(String(rate), 1500, 302, { font: 'sansh', size: 96, color: rate >= 80 ? '#FC593F' : '#3E3124', a, shadow: 0.25 });
  fr.text('次 / 分钟 · 停不下来', 1500, 368, { font: 'sans', size: 25, color: '#C93820', a });

  // 左上仪表冲过 100 超常红线直达 136
  const gVal = lerp(54, 136, E.io3(seg(t, 7.0, 11.8)));
  K.gauge(fr, 54, 42, { value: gVal, label: '渴求读数', zone: '超常', caption: '对象：{!不确定奖赏}', a });
}

/* ==========================================================================
 * 场景 3 (13.6s – 20.6s)：断粮消退实验 —— 左右双栏同屏对照
 * ========================================================================== */
function sceneExtinction(fr, t) {
  const a = fade(t, T.s3 - 0.25, T.s4 + 0.35, 0.45, 0.45);
  if (a <= 0) return;
  if (Math.abs(t - 13.8) < 0.02) fr.sfx(13.8, 'chord', { root: -2, gain: 0.7 });

  fr.layer({ a }, () => {
    // 左右分栏暖色底
    fr.rect(0, 0, W / 2, H, { fill: '#D5CFC2' });
    fr.rect(W / 2, 0, W / 2, H, { fill: '#DFCEC0' });
    fr.line(W / 2, 110, W / 2, 825, { color: '#8C7E6B', w: 3 });

    // 台面自然压暗至底边，确保底部字幕清晰醒目
    const floorGrad3 = fr.grad(0, 665, 0, H, [[0, '#B69F7E'], [0.4, '#6E5943'], [1, '#241B14']]);
    fr.rect(0, 665, W, H - 665, { fill: floorGrad3 });
    fr.rect(0, 665, W, 10, { fill: '#CDB798' });

    // 顶部通栏实验条件标题
    fr.rect(W / 2 - 280, 34, 560, 56, { r: 28, fill: '#231C16' });
    fr.text('断粮测试：两边同时彻底停止掉粮', W / 2, 62, { font: 'sans', size: 28, track: 2, color: '#FFFAEB' });

    // 左栏：确定组 —— 啄 3 下（14.1..15.6s）就转身走开
    const leftPeckPhase = seg(t, 14.1, 15.6);
    const leftPeck = leftPeckPhase > 0 && leftPeckPhase < 1 ? Math.abs(Math.sin(leftPeckPhase * Math.PI * 3)) : 0;
    const walkAway = E.io3(seg(t, 16.0, 18.8));
    drawFeeder(fr, 255, 548, 0.82, { hot: false, empty: true, press: leftPeck });
    drawPigeon(fr, lerp(455, 740, walkAway), 592, 0.94, {
      dir: walkAway > 0.12 ? 1 : -1,
      peck: leftPeck,
      walk: walkAway * 3.2
    });
    fr.text('确定奖赏组', 480, 158, { font: 'sansh', size: 34, color: '#3A3128' });
    fr.text(walkAway > 0.2 ? '确认没粮，果断离开 ✓' : '试探空啄 3 次…', 480, 212, {
      font: 'sans', size: 26, color: '#4E7A61'
    });

    // 右栏：随机组 —— 全程高频执着猛啄空食槽！
    const rightFreq = (t - T.s3) * 3.4;
    const rightPeck = t > 14.0 ? Math.pow(Math.abs(Math.sin(rightFreq * Math.PI)), 1.6) : 0;
    if (t > 14.2 && t < 19.8 && Math.abs((rightFreq % 1) - 0.5) < 0.08) {
      fr.sfx(Math.round(t * 4) / 4, 'tock', { pitch: 6, gain: 0.45 });
    }
    drawFeeder(fr, 1195, 548, 0.82, { hot: true, empty: true, press: rightPeck });
    drawPigeon(fr, 1395, 592, 0.94, { dir: -1, peck: rightPeck });

    const persistCount = Math.min(210, Math.round(lerp(12, 196, seg(t, 14.0, 20.0))));
    fr.text('随机奖赏组', 1440, 158, { font: 'sansh', size: 34, color: '#B8321E' });
    fr.text(`已空啄 ${persistCount} 次 · 仍在赌下一次！`, 1440, 212, { font: 'sansh', size: 27, color: '#E8402A' });
  });
}

/* ==========================================================================
 * 场景 4 (20.6s – 27.2s)：现代深夜书桌 · 手指下拉刷新（三层扁平插画）
 * ========================================================================== */
const PULLS = [21.2, 22.9, 24.6];

function sceneNightPhone(fr, t) {
  const a = fade(t, T.s4 - 0.25, T.s5 + 0.2, 0.5, 0.55);
  if (a <= 0) return;
  if (Math.abs(t - 20.8) < 0.02) fr.sfx(20.8, 'soft', { gain: 0.85 });

  // 计算拇指下拉刷新周期（前两次空白，第三次跳出一颗红心）
  let pull = 0, spin = 0, rewardHeart = 0;
  PULLS.forEach((pt, idx) => {
    const p = seg(t, pt, pt + 0.55);
    if (p > 0 && p < 1) pull = Math.sin(p * Math.PI);
    const sp = seg(t, pt + 0.35, pt + 1.15);
    if (sp > 0 && sp < 1) spin = sp;
    if (Math.abs(t - (pt + 0.2)) < 0.02) fr.sfx(pt + 0.2, 'rise', { dur: 0.45, gain: 0.55 });
    if (idx === 2) {
      rewardHeart = fade(t, pt + 0.95, pt + 2.1, 0.18, 0.35);
      if (Math.abs(t - (pt + 1.0)) < 0.02) fr.sfx(pt + 1.0, 'tick', { pitch: 8, gain: 0.9 });
    }
  });

  const camPush = lerp(1.0, 1.06, ss(t, T.s4, T.s5));
  fr.layer({ a }, () => {
    // 第 1 层（远景）：深夜窗外蓝紫城市光斑（视差慢移）
    const bgShift = (camPush - 1) * -180;
    fr.rect(0, 0, W, H, { fill: '#0D101B' });
    fr.rect(980 + bgShift, 54, 760, 440, { r: 12, fill: '#151B2E' });
    const r = rng(904);
    for (let i = 0; i < 18; i++) {
      const bx = 1030 + r() * 660 + bgShift, by = 110 + r() * 330, br = 12 + r() * 26;
      const col = i % 3 === 0 ? '#E89B5A' : i % 3 === 1 ? '#5B78B8' : '#C95A6E';
      fr.circle(bx, by, br, { fill: col, a: 0.22 + r() * 0.2 });
    }

    // 第 2 层（主体）：暖木书桌自然延伸至底边 + 凉掉的马克杯 + 发光智能手机屏幕
    const deskGrad = fr.grad(0, 520, 0, H, [[0, '#362012'], [0.55, '#24150B'], [1, '#120B06']]);
    fr.poly([[0, 560], [W, 520], [W, H], [0, H]], { close: true, fill: deskGrad });
    // 桌上的马克杯剪影
    fr.rect(1430, 470, 92, 108, { r: 12, fill: '#3E2B20' });
    fr.arc(1522, 524, 26, -1.3, 1.3, { color: '#3E2B20', w: 12 });

    // 手机屏幕暖蓝辉光投在脸和桌面
    const px = W / 2 + 40, py = 455;
    fr.glow(px, py, 340, rewardHeart > 0 ? '#FC593F' : '#6F95D8', 0.24 + rewardHeart * 0.18);

    fr.g({ at: [px, py], rot: -0.06, s: camPush }, () => {
      // 手机机身
      fr.rect(-155, -275, 310, 520, { r: 34, fill: '#1B1E26' });
      fr.rect(-141, -255, 282, 480, { r: 24, fill: '#F4EFE6' });

      // 顶部下拉刷新弹簧区
      const pullOffset = pull * 68;
      if (pull > 0.05 || spin > 0) {
        const ang = (spin || pull) * Math.PI * 4;
        fr.arc(0, -210 + pullOffset * 0.5, 16, ang, ang + 4.2, { color: '#FC593F', w: 4 });
      }

      // 信息流卡片（随下拉整体下移回弹）
      for (let c = 0; c < 3; c++) {
        const cy = -145 + c * 136 + pullOffset;
        if (cy > 180) continue;
        const isHotCard = c === 0 && rewardHeart > 0.05;
        fr.rect(-118, cy, 236, 114, { r: 14, fill: isHotCard ? '#FFE6DF' : '#E5DDD0' });
        fr.rect(-98, cy + 20, 128, 16, { r: 6, fill: isHotCard ? '#E8402A' : '#B8AEA0' });
        fr.rect(-98, cy + 48, 182, 12, { r: 5, fill: '#C8BFB2' });
        fr.rect(-98, cy + 70, 146, 12, { r: 5, fill: '#C8BFB2' });

        if (isHotCard) {
          fr.circle(78, cy + 56, 24 * lerp(0.6, 1.15, E.outBack(rewardHeart)), { fill: '#FC593F' });
          fr.text('+99', 78, cy + 57, { font: 'sansh', size: 19, color: '#FFFAEB' });
        }
      }

      // 右侧拇指扁平色块：做出真实的「按住往下滑 -> 松开」动作
      const thumbY = 70 + pull * 82;
      fr.g({ at: [132, thumbY], rot: -0.38 + pull * 0.22 }, () => {
        fr.rect(-28, -18, 145, 54, { r: 27, fill: '#DFA887' });
        fr.ellipse(-10, 4, 14, 11, { fill: '#EEC1A6' });
      });
    });

    // 第 3 层（前景边缘虚化暗框，拉开空间景深）
    const fgShift = (camPush - 1) * 260;
    fr.poly([[0, 0], [150 - fgShift, 0], [60 - fgShift, H], [0, H]], { close: true, fill: '#07080E', fa: 0.55 });
  });

  // 左上角同一把尺子：渴求读数飙至全片最高 144！
  const phoneGauge = lerp(128, 144, ss(t, 21.2, 25.8));
  K.gauge(fr, 54, 42, { value: phoneGauge, label: '渴求读数', zone: '超常', caption: '对象：{!下一次刷新}', a });
}

/* ==========================================================================
 * 场景 5 (27.2s – 33.5s)：0.55s 压暗进鎏金片名卡 K.titleGilt
 * ========================================================================== */
function sceneTitle(fr, t) {
  scene(fr, t, T.s5, T.end, (lt, env) => {
    if (lt < 0.08) fr.sfx(T.s5 + 0.05, 'bloom', { root: 0, gain: 0.9 });
    K.titleGilt(fr, lt, {
      la: 'SCHEDULES OF REINFORCEMENT · B. F. SKINNER · 1957',
      zh: '不确定的奖赏',
      tag: '',
      a: env,
      cy: 410,
      motif: (f, mlt, ma) => {
        const k = E.io3(seg(mlt, 0.55, 1.55));
        if (k <= 0) return;
        f.circle(W / 2, 608, 34, { color: '#E2C07A', w: 1.8, a: ma * k, glow: 8 });
        f.text('?', W / 2, 610, { font: 'latinm', size: 42, color: '#F7E8C2', a: ma * k });
        f.line(W / 2 - 240 * k, 608, W / 2 - 52, 608, { color: '#C39A52', w: 1.4, a: ma * 0.65 * k });
        f.line(W / 2 + 52, 608, W / 2 + 240 * k, 608, { color: '#C39A52', w: 1.4, a: ma * 0.65 * k });
      }
    });
  }, 0.55, 0.55);
}

VK.film({
  dur: T.end,
  theme: 'flat',
  meta: { title: '不确定的奖赏 · 斯金纳箱', root: 2, drone: 0.85 },
  draw(fr, t) {
    const intoTitle = ss(t, T.s5 - 0.55, T.s5 + 0.1);
    fr.look.bg = intoTitle > 0.6 ? 'gilt' : 'flat';
    fr.look.bgo = intoTitle > 0.6
      ? { warm: 0.45, pool: 0.75, floor: 0.15, dust: 0.9 }
      : { color: '#1A1612' };
    fr.look.bloom = lerp(0.12, 0.34, intoTitle);

    sceneFixedLab(fr, t);
    sceneRandomLab(fr, t);
    sceneExtinction(fr, t);
    sceneNightPhone(fr, t);
    sceneTitle(fr, t);

    K.subs(fr, t, SUBS, intoTitle > 0.6 ? 'gilt' : 'flat');
  },
});
})();
