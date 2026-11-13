# Claude Fable 5.2 纯代码视频 / 交互动画 / 游戏案例与源码清单

Anthropic 于 **2026 年 11 月 9 日** 发布 Claude Fable 5.2（同时发布面向受核验机构的 Mythos 5.2，官方称二者是同一模型的两扇门）。本清单收集此后在 X 上出现的、用代码生成而非视频模型出帧的动画、短片、可玩场景与游戏，并尽可能附上源码、仓库或可玩页。

整理时间：**2026-11-12**（美东时间，America/New_York）。可玩与仓库链接已在当日用 HTTP 请求核对：保留 200，以及明确存在但返回 403 的地址；404 已剔除。部分 `claude.ai/artifact` 链接在本环境返回 200，但在部分地区可能提示不可用，遇到时请直接看对应 X 原帖视频，或从页面 HTML 拷源码。

说明与边界：

- 只收录帖子或仓库明确写明由 **Claude Fable 5.2**（或同一波次的 Mythos 5.2）生成的作品。
- `living-canvas`（https://github.com/shouvik12/living-canvas ，X：https://x.com/shouvik_palit/status/2120316410203369754 ）**未纳入**：该 skill 创建于 2026-10-27、最后提交于 11 月 7 日，早于 Fable 5.2 发布；原帖是用它来讲解 5.2，并非 5.2 做出的项目。
- 使用 Tripo 等外部生成网格、再交给 Fable 做合成的混合流程（如部分 VFX、概念图建模的开放世界宣传片）默认不作为“纯代码”案例。
- 工具罗列帖（Remotion / anime.js 等盘点）若没有实际交出 Fable 作品和文件，不收录。
- 油彩森林等 Patch 项目作者称开源，但独立 Git 地址未找到，已在条目中注明。
- 社区还有若干汇总仓库，例如 [fengyiqicoder/awesome-fable-5.2](https://github.com/fengyiqicoder/awesome-fable-5.2)（自称 2026-11-12 复查链接）。本清单在其基础上做了链接复核，并补录了若干它未收的源码/可玩项与官方实验。

共收录 **209** 条：其中 **108** 条有源码或可玩/可打开的页面，**101** 条目前只能在 X 上看成片。

部分条目的一句话说明沿用英文社区目录原文（已对照 X 帖与可玩页）；补录条目为中文说明。日期由 X 帖时间换算为美东时间。

---

## 一、有源码或可玩链接

条目按类型排列。每条尽量给出：项目名、作者、一句话说明、源码/仓库、可玩或演示页、对应 X 帖（主帖 + 补链回复）、日期（美东时间）。标注 **【补录】** 的是相对此前已知清单新核验补上的项目。

### 游戏

**1. 【补录】 Outpost Siege（单 HTML FPS）**

- **作者：** @itsfazley
- **说明：** 单文件 HTML、零美术资源的第一人称射击：沙漠前哨战，对抗蜘蛛机器人。Fable 5.2 high 约 70 分钟写出步枪、手部和场景。主帖先发了视频，作者后来在回复里放出了可玩页（约 474KB 的单页 HTML，源码即页面本身）。
- **源码/仓库：**
  - https://experiments.fazleyrabbi.xyz/outpost-siege/index.html
- **具体文件：**
  - 可玩页 / 单文件 HTML 源码：https://experiments.fazleyrabbi.xyz/outpost-siege/
  - index.html 直链：https://experiments.fazleyrabbi.xyz/outpost-siege/index.html
- **可玩/演示页：** https://experiments.fazleyrabbi.xyz/outpost-siege/
- **对应 X 帖：**
  - 主帖：https://x.com/itsfazley/status/2120398367125803454
  - 补充/回复：https://x.com/itsfazley/status/2120491921336627352
  - 补充/回复：https://x.com/itsfazley/status/2120545065890353434
- **日期：** 2026-11-11 01:09（美东时间）

**2. 【补录】 Core-Breach**

- **作者：** @ShahZuabir
- **说明：** 浏览器生存 FPS：三套敌人 AI、无尽波次，0 图片/音频文件（声音实时生成），声称 54 项测试通过。MIT。
- **源码/仓库：**
  - https://github.com/Zubair-hussain/Core-Breach
- **具体文件：**
  - 仓库：https://github.com/Zubair-hussain/Core-Breach
  - 在线试玩：https://core-breach.netlify.app/
- **可玩/演示页：** https://core-breach.netlify.app/
- **对应 X 帖：** https://x.com/ShahZuabir/status/2120852183868399711
- **日期：** 2026-11-12 07:12（美东时间）

**3. 【补录】 The Lost Storm**

- **作者：** @marginsystems
- **说明：** 等距动作 RPG，Three.js + TypeScript，约 2 小时直播 vibe coding。MIT。含库存、技能树、法术与升级。
- **源码/仓库：**
  - https://github.com/marginsystems/the-lost-storm
- **具体文件：**
  - 仓库：https://github.com/marginsystems/the-lost-storm
  - 在线试玩：https://theloststorm.com/play/
  - 官网介绍：https://theloststorm.com/
  - 入口 HTML：https://github.com/marginsystems/the-lost-storm/blob/main/index.html
  - 游戏页：https://github.com/marginsystems/the-lost-storm/tree/main/play
  - 源码目录：https://github.com/marginsystems/the-lost-storm/tree/main/src
  - Blender 目录：https://github.com/marginsystems/the-lost-storm/tree/main/blender
- **可玩/演示页：** https://theloststorm.com/play/
- **对应 X 帖：** https://x.com/marginsystems/status/2120546439613051247
- **日期：** 2026-11-11 10:57（美东时间）

**4. Saltline — first-person shooter**

- **作者：** @felixrieseberg
- **说明：** By an Anthropic engineer. One-shot prompts, no human feedback, 8 hours, ~$550. Models, sounds and textures all generated in code.
- **源码/仓库：** 官方可玩页即为单文件 HTML，源码在页面内
- **具体文件：**
  - 官方 Artifact（源码在 HTML 内）：https://claude.ai/artifact/BGY1SztrAYcJQHSsnHHGmp
  - 非官方镜像仓库（社区转存，非 Felix 本人发布）：https://github.com/realcodebear/saltline-fable-5.2
  - 非官方镜像可玩页 / 单文件 index.html：https://realcodebear.github.io/saltline-fable-5.2/
  - 另一社区镜像仓库：https://github.com/1873575791/saltline-fable-5.2
- **可玩/演示页：** https://claude.ai/artifact/BGY1SztrAYcJQHSsnHHGmp
- **对应 X 帖：**
  - 主帖：https://x.com/felixrieseberg/status/2119925633564463609
  - 补充/回复：https://x.com/felixrieseberg/status/2120245629725409758
- **日期：** 2026-11-09 17:50（美东时间）
- **备注：** 官方可玩页即单文件 HTML，源码在页面内。本机请求返回 200，但 claude.ai Artifact 在部分地区可能提示不可用。

**5. CROSSTOWN — open-world New York (early preview)**

- **作者：** @mattshumer_
- **说明：** "Rockstar took 8 years. Fable 5.2 is gonna do it in 7 days." Only part of the city is in so far; press B to send feedback.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://nyc.somethingbig.ai/
- **对应 X 帖：** https://x.com/mattshumer_/status/2120282133503820150
- **日期：** 2026-11-10 17:27（美东时间）

**6. Oil Paint — hand-painted game**

- **作者：** @BlendiByl
- **说明：** Made in under an hour. Every frame is about 1.5 million brush strokes, running at 200 fps in a browser tab. Open source.
- **源码/仓库：** 作者称开源，但未找到独立 Git 仓库（见备注）
- **可玩/演示页：** https://patch.gg/blendi/oil-paint
- **对应 X 帖：**
  - 主帖：https://x.com/BlendiByl/status/2120341251178594532
  - 补充/回复：https://x.com/sorenxet/status/2120514197674975640
  - 补充/回复：https://x.com/sorenxet/status/2120514202704265256
- **日期：** 2026-11-10 21:22（美东时间）
- **备注：** 作者 @BlendiByl 与转发帖 @sorenxet 均称源码开放；可玩页在 Patch。独立 git.patch.gg/blendi/oil-paint 返回 404，未找到单独的 GitHub 仓库，源码应在 Patch 项目内查看/克隆。

**7. Starry Nightrider**

- **作者：** @ebbyamir
- **说明：** Van Gogh riding through his Starry Night, as a game.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://starrynightrider.com
- **对应 X 帖：** https://x.com/ebbyamir/status/2120284261089673376
- **日期：** 2026-11-10 17:35（美东时间）

**8. What the Water Keeps**

- **作者：** @kevin_t_ngo
- **说明：** A boat ride through 8 dreamlike worlds, playable in the browser.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://what-the-water-keeps.vercel.app/
- **对应 X 帖：** https://x.com/kevin_t_ngo/status/2119868968307695818
- **日期：** 2026-11-09 14:05（美东时间）

**9. Mirror Earth**

- **作者：** @mattshumer_
- **说明：** The whole planet as a destructible game world, with weather that matches the real Earth in real time.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://www.spawn.co/@mattshumer/earth?room=local
- **对应 X 帖：** https://x.com/mattshumer_/status/2119877065701036047
- **日期：** 2026-11-09 14:37（美东时间）

**10. Evensong**

- **作者：** @kevin_t_ngo
- **说明：** A dark-fantasy souls-like boss fight, playable in the browser.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://evensong-phi.vercel.app/
- **对应 X 帖：**
  - 主帖：https://x.com/kevin_t_ngo/status/2120238844754923874
  - 补充/回复：https://x.com/kevin_t_ngo/status/2120238846223040561
- **日期：** 2026-11-10 14:35（美东时间）
- **备注：** 可玩页可打开；站点与原帖未给出公开 GitHub 仓库。

**11. Portals: Endless Worlds**

- **作者：** @emollick
- **说明：** 25,000 agents built 450+ code-only 3D worlds inspired by books, art and places, linked by portals you drift through.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://portals-endless-worlds.netlify.app/
- **对应 X 帖：** https://x.com/emollick/status/2119918307457577163
- **日期：** 2026-11-09 17:21（美东时间）

**12. LANTERNFALL**

- **作者：** @loktar00
- **说明：** The whole game — animations, models, everything — generated by Fable. Watch the effect when enemies die.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://loktar00.github.io/lanternfall/
- **对应 X 帖：** https://x.com/loktar00/status/2120192761542615271
- **日期：** 2026-11-10 11:32（美东时间）

**13. Rooftop Rally — pickleball in Unreal 5.9**

- **作者：** @chongdashu
- **说明：** Fable 5.2 with the Unreal Engine 5.9 preview. Characters from Tripo; the other 3D assets and the rest by Fable.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://wavedash.com/games/rooftop-rally
- **对应 X 帖：** https://x.com/chongdashu/status/2120154573356793883
- **日期：** 2026-11-10 09:00（美东时间）

**14. Three Games (Saltline · The Clockmaker's Heart · Tidewright)**

- **作者：** @vineerpasam
- **说明：** Signed by Felix Rieseberg: "All games made with Claude Fable 5.2. First drafts, no human feedback." The most-shared link of launch day.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/MXxb36zKgN261ckbGhmNin
- **对应 X 帖：** https://x.com/vineerpasam/status/2119955306096857145
- **日期：** 2026-11-09 19:48（美东时间）

**15. Voxel Engine**

- **作者：** @mattshumer_
- **说明：** Built from a single prompt. Sound on.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://www.spawn.co/@mattshumer/voxel-engine
- **对应 X 帖：** https://x.com/mattshumer_/status/2119870965106483384
- **日期：** 2026-11-09 14:13（美东时间）

**16. I Would Have Gotten Away With It**

- **作者：** @emollick
- **说明：** A reverse Scooby-Doo: you are the villain scaring off meddling kids. Fable also made the trailer, music and sound.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://i-would-have-gotten-away-with-it.netlify.app/
- **对应 X 帖：** https://x.com/emollick/status/2119876449494540554
- **日期：** 2026-11-09 14:35（美东时间）

**17. Childhood Rug Racer**

- **作者：** @noclipepe
- **说明：** A racing game on your childhood play rug, same prompt as GPT-6.2 Sol. The author calls the model "Fable 5.5 (routing)".
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://noclipepe.pages.dev/rug/
- **对应 X 帖：** https://x.com/noclipepe/status/2119728047754547326
- **日期：** 2026-11-09 04:45（美东时间）

**18. Mist-Locked Mountain Gate — 3D action game**

- **作者：** @op7418
- **说明：** One afternoon, 4.5 billion tokens. Models, scenes and moves all by Fable, packed into a single 30 MB HTML file.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://op7418.github.io/guizang-game-skill/
- **对应 X 帖：** https://x.com/op7418/status/2120694045299327187
- **日期：** 2026-11-11 20:43（美东时间）

**19. Gilt & Gutter**

- **作者：** @kevin_t_ngo
- **说明：** A 1v1 first-person shooter with two playable characters.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://gilt-and-gutter.vercel.app/
- **对应 X 帖：**
  - 主帖：https://x.com/kevin_t_ngo/status/2119900487688622171
  - 补充/回复：https://x.com/kevin_t_ngo/status/2119900488993010147
- **日期：** 2026-11-09 16:10（美东时间）
- **备注：** 可玩页可打开；站点与原帖未给出公开 GitHub 仓库。

**20. Dread & District**

- **作者：** @emollick
- **说明：** A fantasy transport sim "with heart": one vague paragraph, then a bunch of agents arguing about art, lore and jokes. Good logistics defeats evil.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://dread-and-district.netlify.app
- **对应 X 帖：** https://x.com/emollick/status/2120248525254742318
- **日期：** 2026-11-10 15:13（美东时间）

**21. Hogwarts Royale**

- **作者：** @mattshumer_
- **说明：** "Create a mashup of Harry Potter and Fortnite" — a playable battle royale.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://www.spawn.co/@mattshumer/hogwarts-royale
- **对应 X 帖：** https://x.com/mattshumer_/status/2119872098306810226
- **日期：** 2026-11-09 14:17（美东时间）

**22. First Crush**

- **作者：** @kieranklaassen
- **说明：** A winemaking game: scrub the vat, crush 250 kg of fruit, read the hydrometer, pick a yeast — and it explains why. Click "Try it" on the page.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://frontier.every.to/experiments/first-crush
- **对应 X 帖：** https://x.com/kieranklaassen/status/2119871673294037280
- **日期：** 2026-11-09 14:16（美东时间）

**23. YARDCLASH**

- **作者：** @AugustCastilIo
- **说明：** Neighborhood 7v7 football: lots of characters, league progression, play with friends.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://yardclash.vercel.app/
- **对应 X 帖：** https://x.com/AugustCastilIo/status/2120302122776342865
- **日期：** 2026-11-10 18:46（美东时间）

**24. Cloud Stunt 3D**

- **作者：** @jev_chat
- **说明：** Generated in 30 minutes; an optimized "golden" version is linked too.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://finderchangchang.github.io/cloud-stunt-3d/
- **对应 X 帖：** https://x.com/jev_chat/status/2120015641151426838
- **日期：** 2026-11-09 23:48（美东时间）

**25. Worm Rider**

- **作者：** @AmirMushich
- **说明：** Open source. 220 KB, 3,400 lines, 10 prompts, every model built from scratch in Claude Code.
- **源码/仓库：** https://github.com/amirmushichge/worm-rider
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/AmirMushich/status/2119937977426338283
- **日期：** 2026-11-09 18:39（美东时间）

**26. Fable 5.2 FPS Repro**

- **作者：** @wquguru
- **说明：** Four single-file 3D FPS demos: models, sound and textures all in code. Method and source are open.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://wquguru.github.io/fable52-fps-repro/
- **对应 X 帖：** https://x.com/wquguru/status/2120383332722905400
- **日期：** 2026-11-11 00:09（美东时间）

**27. Turbo Tails**

- **作者：** @petergyang
- **说明：** 3D kart racer: 6 racers, drifting, ramps, items, single and multiplayer.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://turbo-tails.vercel.app
- **对应 X 帖：** https://x.com/petergyang/status/2119901658394358005
- **日期：** 2026-11-09 16:15（美东时间）

**28. Rambo Dino**

- **作者：** @noclipepe
- **说明：** The Chrome T-Rex game, rebuilt. Compared against Opus 5.5, Gemini 4 Carbon and GPT-6 Astra.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://noclipepe.pages.dev/dino
- **对应 X 帖：** https://x.com/noclipepe/status/2119927838321328577
- **日期：** 2026-11-09 17:59（美东时间）

**29. Frontline Warfare Deathmatch**

- **作者：** @alightinastorm
- **说明：** A Call of Duty-style shooter in the browser.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://spawn.co/@robot/frontline-warfare-deathmatch
- **对应 X 帖：** https://x.com/alightinastorm/status/2120020469487440210
- **日期：** 2026-11-10 00:07（美东时间）

**30. Lumina Zombies**

- **作者：** @LuminaBench
- **说明：** A brand-new map with easter eggs in a few prompts, plus upgrades that halved hardware demand and latency on the other two maps.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://luminazombies.com/
- **对应 X 帖：** https://x.com/LuminaBench/status/2120660076927099048
- **日期：** 2026-11-11 18:28（美东时间）

**31. Feed the Backrooms**

- **作者：** @LexnLin
- **说明：** The Backrooms, reversed: you are the monster and your job is to catch people.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://feed-backrooms.vercel.app
- **对应 X 帖：** https://x.com/LexnLin/status/2119966127149429093
- **日期：** 2026-11-09 20:31（美东时间）

**32. The Waking River**

- **作者：** @flxrnc
- **说明：** One prompt and a few follow-ups: five sleeping worlds that wake as you sail through, with a score made from code.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://rivergame-kappa.vercel.app
- **对应 X 帖：** https://x.com/flxrnc/status/2120494277528580110
- **日期：** 2026-11-11 07:30（美东时间）

**33. SKYWAKE**

- **作者：** @aniketjart
- **说明：** A flying quest game made with Fable 5.2, Opus 5.5, Crayon and three.js.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://app.usecrayon.ai/play/992c2130-43da-416b-a577-aed9514d3057
- **对应 X 帖：** https://x.com/aniketjart/status/2120378493729222700
- **日期：** 2026-11-10 23:50（美东时间）

**34. Ringfall**

- **作者：** @rehan_shei
- **说明：** A Destiny-inspired FPS. Open source and remixable.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://patch.gg/games/rehan/ringfall
- **对应 X 帖：** https://x.com/rehan_shei/status/2119994607291584962
- **日期：** 2026-11-09 22:24（美东时间）

**35. Chairmageddon**

- **作者：** @argofowl
- **说明：** Destroy a peaceful town of blue chairs. Yes, you can vortex the baby stroller.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://fowllabs.com/fable-5-2/chairmageddon/
- **对应 X 帖：** https://x.com/argofowl/status/2120568779537273263
- **日期：** 2026-11-11 12:26（美东时间）

**36. Fighting game (plays on phones)**

- **作者：** @s_shigel
- **说明：** A fighting game iterated overnight, playable in a mobile browser.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/QvSjL7Hexf3nKdUP9Zerr7
- **对应 X 帖：** https://x.com/s_shigel/status/2120300080569975034
- **日期：** 2026-11-10 18:38（美东时间）

**37. VOWLORN**

- **作者：** @higgsfield_ai
- **说明：** A dark RPG where even the voices are code, deployed through Higgsfield MCP. Links go to the play pages with full workflows.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://higgsfield.ai/@higgsfield.studio/blogs/fable-5-2-built-this-rpg-from-pure-code-here-s-every-step
- **对应 X 帖：** https://x.com/higgsfield_ai/status/2119997122896601269
- **日期：** 2026-11-09 22:34（美东时间）

**38. Open-world kart adventure**

- **作者：** @realWeZZard
- **说明：** One-shot in three hours; the main quest takes about half an hour.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/FpdQ81sJs1KiV1a6JCY4jj
- **对应 X 帖：** https://x.com/realWeZZard/status/2120379500492185939
- **日期：** 2026-11-10 23:54（美东时间）

**39. Giant Leap**

- **作者：** @handsher_NGU
- **说明：** Jump from the Moon to the Earth. You just jump.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://giant-leap.vercel.app
- **对应 X 帖：** https://x.com/handsher_NGU/status/2120287667141374212
- **日期：** 2026-11-10 17:49（美东时间）

**40. Farewell Light**

- **作者：** @RyanSael
- **说明：** A gameplay demo made overnight.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://sael.net/demo/farewell-light/
- **对应 X 帖：** https://x.com/RyanSael/status/2120695866684231998
- **日期：** 2026-11-11 20:51（美东时间）

**41. IRONDUSK — Yard 7**

- **作者：** @vista8
- **说明：** One prompt asking for a tiny FPS level that can keep up with AAA visuals. A second prompt made a 3D brick breaker with AI and two-player modes.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://qiaomu.t5t6.com/irondusk-yard-7/
- **对应 X 帖：** https://x.com/vista8/status/2120383046239285264
- **日期：** 2026-11-11 00:08（美东时间）

**42. Dead Headway**

- **作者：** @AugustCastilIo
- **说明：** A subway raid shooter in the browser. The author is speedrunning it — post your time.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://dead-headway.vercel.app/
- **对应 X 帖：** https://x.com/AugustCastilIo/status/2120628693420904489
- **日期：** 2026-11-11 16:24（美东时间）

**43. Midnight Pass**

- **作者：** @andreysuperior
- **说明：** One HTML file, 603 lines, zero assets: real drift physics, a generated mountain, synthesized engine and tyres.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/UD9pGEN4QFA8F5EadRw8eL
- **对应 X 帖：** https://x.com/andreysuperior/status/2120666660130746458
- **日期：** 2026-11-11 18:55（美东时间）

**44. Tilt Labyrinth**

- **作者：** @mylifcc
- **说明：** A wooden ball maze in 2,000 lines of three.js. Fable profiled it from 55 ms to 9 ms per frame on its own.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://blog.silencestar.com/posts/tilt-labyrinth/play/
- **对应 X 帖：** https://x.com/mylifcc/status/2120054646282870910
- **日期：** 2026-11-10 02:23（美东时间）

**45. Patchwork Quilt**

- **作者：** @BlendiByl
- **说明：** A patchwork, stop-motion style game slice. The whole map is code. Open source.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://patch.gg/blendi/patchwork-quilt
- **对应 X 帖：** https://x.com/BlendiByl/status/2120746541636047347
- **日期：** 2026-11-12 00:12（美东时间）

**46. Stray Cat**

- **作者：** @aimikoda
- **说明：** Rescue kittens, hiss at dogs, yowl at an old tomcat. Every sound is synthesized.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/4nPXUKJjQWNsZEHVNmXXCt
- **对应 X 帖：** https://x.com/aimikoda/status/2120120133712593118
- **日期：** 2026-11-10 06:43（美东时间）

**47. Silicon Seduction**

- **作者：** @ZryMiller
- **说明：** Can you make it out without being seduced?
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://silicon-seduction.vercel.app/
- **对应 X 帖：** https://x.com/ZryMiller/status/2119918766691954691
- **日期：** 2026-11-09 17:23（美东时间）

**48. Roost**

- **作者：** @tejas3732
- **说明：** 3D dirt-bike racing in one chat: 5 prompts, 15 minutes, 3 tracks, AI rivals, nitro, handlebar cam.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/DLnFodkTwvawCNwurDmSZK?sk=5N6PtC07f1niB7h3I6clZQ
- **对应 X 帖：** https://x.com/tejas3732/status/2120091513657139549
- **日期：** 2026-11-10 04:49（美东时间）

**49. Four-character fighting game**

- **作者：** @promodenstudio
- **说明：** Fable 5.2 + ElevenLabs MCP for 39 voice and sound clips, including an announcer it designed. Desktop + keyboard.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/1QGGhB68jMCjjjeeKtKNUo
- **对应 X 帖：** https://x.com/promodenstudio/status/2120085977079107788
- **日期：** 2026-11-10 04:27（美东时间）

**50. Vippi**

- **作者：** @Shrit1401
- **说明：** A COD-style shooter. The author's creepy-game benchmark is linked too.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://vippi.vercel.app/
- **对应 X 帖：** https://x.com/Shrit1401/status/2120060593763926314
- **日期：** 2026-11-10 02:46（美东时间）

### 3D 世界与场景

**51. Claude App on a Blender laptop**

- **作者：** @rileybrown
- **说明：** One prompt built the whole room in Blender and rendered it in 4K. This is the web page shown on the laptop screen.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/QGWUAjRrzRzZWGcQzSMLfa
- **对应 X 帖：** https://x.com/rileybrown/status/2119902109709537708
- **日期：** 2026-11-09 16:17（美东时间）

**52. Rome, AD 320**

- **作者：** @petergostev
- **说明：** One prompt, Fable 5.2 (Max) running overnight, $2,618.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://fable-rome.surge.sh/
- **对应 X 帖：** https://x.com/petergostev/status/2120167560700383572
- **日期：** 2026-11-10 09:51（美东时间）

**53. Painted Valley**

- **作者：** @BlendiByl
- **说明：** A Ghibli-inspired hand-painted valley you can walk through. Open source.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://patch.gg/blendi/painted-valley
- **对应 X 帖：** https://x.com/BlendiByl/status/2120694003230560585
- **日期：** 2026-11-11 20:43（美东时间）

**54. 1 km² of Indiranagar**

- **作者：** @anshu4321
- **说明：** A live 3D slice of Bengaluru from map data and one prompt.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://indiranagar-live.vercel.app
- **对应 X 帖：** https://x.com/anshu4321/status/2119938067758772403
- **日期：** 2026-11-09 18:39（美东时间）

**55. Bay Area Through Time**

- **作者：** @theojaffee
- **说明：** Zoom to any city or neighborhood, pick any year back to 1769 and see what it looked like.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://bay.theojaffee.net
- **对应 X 帖：** https://x.com/theojaffee/status/2120312766544437738
- **日期：** 2026-11-10 19:28（美东时间）

**56. Procedural Arm Rig**

- **作者：** @apekshik
- **说明：** Instead of one-shotting a AAA game: a single arm with bone armature, weight-painted mesh, IK, and muscles that swell as the fist tightens.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://procedural-arm-rig.vercel.app
- **对应 X 帖：** https://x.com/apekshik/status/2120224530367119758
- **日期：** 2026-11-10 13:38（美东时间）

**57. A Claude demo you can walk into**

- **作者：** @dfeinition
- **说明：** Inspired by @rileybrown: walk in and sit at any computer.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/R6YBDkAm2GjAC5A65D9djx
- **对应 X 帖：** https://x.com/dfeinition/status/2120330644261589051
- **日期：** 2026-11-10 20:39（美东时间）

**58. Impossible Spaces**

- **作者：** @BlendiByl
- **说明：** A trippy "impossible spaces" experience. Open source.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://patch.gg/blendi/impossible-spaces
- **对应 X 帖：** https://x.com/BlendiByl/status/2120314459793355262
- **日期：** 2026-11-10 19:35（美东时间）

**59. Pirate Ship**

- **作者：** @notjazii
- **说明：** One shot, ~1.5 hours, ~35M tokens (~$34).
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://tests.jazii.dev/
- **对应 X 帖：** https://x.com/notjazii/status/2119905661505122575
- **日期：** 2026-11-09 16:31（美东时间）

**60. Orca Jelly**

- **作者：** @vib3coded
- **说明：** A soft-body gummy orca material study. Opus 5.5's version is linked for comparison.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/2PBXuQAnWDS2NpiPXHNLfL
- **对应 X 帖：** https://x.com/vib3coded/status/2119951060752375827
- **日期：** 2026-11-09 19:31（美东时间）

**61. 3D Sailing Ship**

- **作者：** @marcthecreatorr
- **说明：** Pure Three.js, no Blender or external assets. ~38 minutes, ~$17.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/7ge282etTXSS4edGFTFa85
- **对应 X 帖：** https://x.com/marcthecreatorr/status/2119890973560054072
- **日期：** 2026-11-09 15:32（美东时间）

**62. SR-71 engine teardown**

- **作者：** @konstantinsaifo
- **说明：** The SR-71 at 80,000 ft with one engine cut open. One knob, the speed: watch the inlet take over from the engine.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://airsup.ai/lab/sr-71?mach=3.2
- **对应 X 帖：** https://x.com/konstantinsaifo/status/2120518933103182193
- **日期：** 2026-11-11 09:08（美东时间）

**63. Voxel World in a Bottle**

- **作者：** @vib3coded
- **说明：** 30 minutes, $12.81.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/9EgZpErM17kH2a9Q3WXW6f
- **对应 X 帖：** https://x.com/vib3coded/status/2120104517282775514
- **日期：** 2026-11-10 05:41（美东时间）

**64. Jerusalem at Passover**

- **作者：** @kplikethebird
- **说明：** An immersive, historically grounded 3D Jerusalem built with Blender. Wander the streets.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://fable-jerusalem.vercel.app/
- **对应 X 帖：** https://x.com/kplikethebird/status/2119900775727902732
- **日期：** 2026-11-09 16:11（美东时间）

**65. Vancouver From Above**

- **作者：** @tokifyi
- **说明：** The city rebuilt in three.js.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://vancouver.webly.site
- **对应 X 帖：** https://x.com/tokifyi/status/2120020272153764172
- **日期：** 2026-11-10 00:06（美东时间）

**66. Pine Hollow — a living ski hill**

- **作者：** @loktar00
- **说明：** A 3D ski hill based on an old 2D version, asked to "give it some character".
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://loktar00.github.io/pine-hollow/
- **对应 X 帖：** https://x.com/loktar00/status/2120432591606067359
- **日期：** 2026-11-11 03:25（美东时间）

**67. Matrix Vibe**

- **作者：** @tornikegomareli
- **说明：** A city in the Matrix mood — rain, lightning, clouds. Fly through it.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://feelthematrix.com
- **对应 X 帖：** https://x.com/tornikegomareli/status/2120227696261120225
- **日期：** 2026-11-10 13:50（美东时间）

**68. Galaxy Dive**

- **作者：** @handsher_NGU
- **说明：** "God took 6 days, Fable 5.2 took 20 min." Fly into a galaxy.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://galaxy-dive.vercel.app
- **对应 X 帖：** https://x.com/handsher_NGU/status/2119910478025789655
- **日期：** 2026-11-09 16:50（美东时间）

**69. Calibre 5.2 watch**

- **作者：** @Andrew_Blumson
- **说明：** No reference image: one text prompt, one shot. three.js and WebGPU.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://calibre-watch-snowy.vercel.app/
- **对应 X 帖：** https://x.com/Andrew_Blumson/status/2120097749177606559
- **日期：** 2026-11-10 05:14（美东时间）

**70. Voxel Colosseum**

- **作者：** @aGim_asf
- **说明：** Walk around the ruined inner ring. Opus 5.5's diorama version is linked for comparison.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/7nmzhxeamcunJbKVK32ptz
- **对应 X 帖：** https://x.com/aGim_asf/status/2119918363799376270
- **日期：** 2026-11-09 17:21（美东时间）

**71. One-way Trip to a Black Hole**

- **作者：** @ZondarkAI
- **说明：** A personal site rebuilt as a scroll journey from Earth to a black hole.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://zondark.com（HTTP 403，页面存在但可能有防爬或访问限制）
- **对应 X 帖：** https://x.com/ZondarkAI/status/2120106341423571097
- **日期：** 2026-11-10 05:48（美东时间）

**72. Belt Stress Test**

- **作者：** @fadihares95
- **说明：** ~20,000 orbiting asteroids; it keeps adding rocks until your device drops below 30 fps.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/FETrKoitcqxPQjbQvZd79C
- **对应 X 帖：** https://x.com/fadihares95/status/2119885634814857500
- **日期：** 2026-11-09 15:11（美东时间）

**73. A Hamlet on a Giant Snail**

- **作者：** @L34342Lin
- **说明：** "Bring a 3D castle to life in an HTML file." Hand-written WebGL2, no libraries, ~5,500 trees, day/night cycle.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/BCDCNHRTq3y9W4Px3xc4DN
- **对应 X 帖：** https://x.com/L34342Lin/status/2120030246108066195
- **日期：** 2026-11-10 00:46（美东时间）

**74. Wooden Pagoda Transformation**

- **作者：** @acupofai
- **说明：** 3,357 parts assemble a five-storey pagoda that turns into a swordswoman. Music computed in code.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/UqU4w7jSr6pzF2McsbyQjJ
- **对应 X 帖：** https://x.com/acupofai/status/2120119243043995748
- **日期：** 2026-11-10 06:39（美东时间）

### 网页与交互工具

**75. Robotics Lab**

- **作者：** @0xMovez
- **说明：** Eight real boards (Arduino Uno, Raspberry Pi 4…) in 3D: place chips, solder them in, wire real circuits.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://robotics-lab-app.vercel.app
- **对应 X 帖：** https://x.com/0xMovez/status/2120239217880268919
- **日期：** 2026-11-10 14:36（美东时间）

**76. 76 single-file HTML pieces**

- **作者：** @MiaAI_lab
- **说明：** Generative art, physics, type and UI, each with its original prompt.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/
- **对应 X 帖：** https://x.com/MiaAI_lab/status/2119930229661503893
- **日期：** 2026-11-09 18:08（美东时间）

**77. Keep — password strength meter**

- **作者：** @crtvTeknologist
- **说明：** A password strength indicator rendered as a living pixel world.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://pixel-worlds.vercel.app/keep/
- **对应 X 帖：** https://x.com/crtvTeknologist/status/2119894073024606617
- **日期：** 2026-11-09 15:45（美东时间）

**78. Spine Menu**

- **作者：** @seanaiux
- **说明：** "Have you ever seen a menu that looks better?" The page includes the prompt.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://uberdesigner.ai/t/spine-menu
- **对应 X 帖：** https://x.com/seanaiux/status/2120222459110789574
- **日期：** 2026-11-10 13:30（美东时间）

**79. Claudia Gallery**

- **作者：** @anabology
- **说明：** "Make the video of your dreams" — two shots, 9 hours.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://claudia.gallery
- **对应 X 帖：** https://x.com/anabology/status/2120010995309457643
- **日期：** 2026-11-09 23:29（美东时间）

**80. Animals at Work — 3D planner**

- **作者：** @Xian0063
- **说明：** A paper planner rebuilt in 3D: drag to turn pages, tap a date to write, 90 stickers you can peel and stick. Opus 5.5 built the skeleton; Fable 5.2 refined materials against real footage.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://xianxie6.github.io/animals-planner-2027/
- **对应 X 帖：** https://x.com/Xian0063/status/2120417834694250522
- **日期：** 2026-11-11 02:26（美东时间）

**81. Ambient Town**

- **作者：** @kieranklaassen
- **说明：** An ambient DAW built over a week of nights by a former film composer: Ableton Push support, mics, effects, a synth and an agent that composes with you. Click "Try it" on the page.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://frontier.every.to/experiments/ambient-town
- **对应 X 帖：** https://x.com/kieranklaassen/status/2119868196773929160
- **日期：** 2026-11-09 14:02（美东时间）

**82. The History of Writing**

- **作者：** @rileybrown
- **说明：** An interactive film from one prompt; prompt and files shared.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://v2.video/riley/the-history-of-writing/v1
- **对应 X 帖：** https://x.com/rileybrown/status/2119946022767980985
- **日期：** 2026-11-09 19:11（美东时间）

**83. Where Is Everybody?**

- **作者：** @emollick
- **说明：** Asked to "solve the Fermi Paradox": it marshals data, tests hypotheses and pressure-tests them against critics.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://where-is-everybody-fermi.netlify.app/
- **对应 X 帖：** https://x.com/emollick/status/2120359214157603139
- **日期：** 2026-11-10 22:33（美东时间）

**84. Which Vitamins to Buy in India**

- **作者：** @itspsneha
- **说明：** Built after reading lab reports for 109 tested batches.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://itspsneha.com/supplements
- **对应 X 帖：** https://x.com/itspsneha/status/2120048494761451974
- **日期：** 2026-11-10 01:58（美东时间）

**85. Typed**

- **作者：** @clairevo
- **说明：** A fully working typewriter: type or click keys, writing timers, whiteout, autocorrect.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://typed.page/
- **对应 X 帖：** https://x.com/clairevo/status/2119905651359142132
- **日期：** 2026-11-09 16:31（美东时间）

**86. anymove**

- **作者：** @rehan_shei
- **说明：** Solves the moves in an AI video clip onto a real 3D rig — no mocap suit, no keyframes. Open source.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://patch.gg/patch/anymove
- **对应 X 帖：** https://x.com/rehan_shei/status/2120409150870159414
- **日期：** 2026-11-11 01:51（美东时间）

**87. Ribbon Hero**

- **作者：** @viktoroddy
- **说明：** A hero section made with Fable 5.2 + GPT Image 2.6.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://motionsites.ai/?prompt=vante-ribbon-hero
- **对应 X 帖：** https://x.com/viktoroddy/status/2119985044542705916
- **日期：** 2026-11-09 21:46（美东时间）

**88. nikechan.com redesign**

- **作者：** @tegnike
- **说明：** A personal site redesigned end to end.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://nikechan.com/
- **对应 X 帖：** https://x.com/tegnike/status/2120110145841578173
- **日期：** 2026-11-10 06:03（美东时间）

**89. PC Build Lab**

- **作者：** @Tetriss112
- **说明：** Assemble a $1,279 gaming rig part by part in 3D, in 8 steps — and wreck it on purpose before touching real parts.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://tetriss22.github.io/pc-build-lab/
- **对应 X 帖：** https://x.com/Tetriss112/status/2120520587411935288
- **日期：** 2026-11-11 09:14（美东时间）

**90. Best Seat in the House**

- **作者：** @RyanSael
- **说明：** Concert seat maps where you see the exact view from every seat before you buy. Fully interactive.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://sael.net/seat-arena
- **对应 X 帖：** https://x.com/RyanSael/status/2120544205558915329
- **日期：** 2026-11-11 10:48（美东时间）

**91. 20 Landing Page Redesigns**

- **作者：** @Tmeister
- **说明：** 20 alternatives to a JWT plugin's landing page from one simple prompt.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://jwt-designs-preview.noone-697.workers.dev/
- **对应 X 帖：** https://x.com/Tmeister/status/2119983842841018482
- **日期：** 2026-11-09 21:41（美东时间）

**92. Driftwood (Fable vs Opus)**

- **作者：** @AsumaCodes
- **说明：** Same prompt, one shot each, both pages live. Also: a Pomodoro focus room and a bug hunt.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://www.asumacodes.xyz/arena/driftwood
- **对应 X 帖：** https://x.com/AsumaCodes/status/2120130668848177432
- **日期：** 2026-11-10 07:25（美东时间）

**93. Bay Drum Kit**

- **作者：** @BretKerr
- **说明：** Every hit reverberates across the bay.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/9yQkezie4jY3oz2YDLFDiq
- **对应 X 帖：** https://x.com/BretKerr/status/2119995870854988177
- **日期：** 2026-11-09 22:29（美东时间）

**94. Dub Techno Track + Visualizer**

- **作者：** @bartdecrem
- **说明：** One shot.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/Pk6rHPyRwfShT37kiU1sT6
- **对应 X 帖：** https://x.com/bartdecrem/status/2119926997422133417
- **日期：** 2026-11-09 17:55（美东时间）

**95. House Design Proposal**

- **作者：** @pnumech
- **说明：** A detached-house design proposal (Korean), made in a day.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/TiymxxFXzMo7xhWUaecbzk
- **对应 X 帖：** https://x.com/pnumech/status/2120117665041940807
- **日期：** 2026-11-10 06:33（美东时间）

**96. Ramayana Family Tree**

- **作者：** @chhavsz
- **说明：** The lead actor's ties by blood and marriage to 65 Bollywood stars.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/5ufHvxgvXTf5YgQeTR8TbG
- **对应 X 帖：** https://x.com/chhavsz/status/2119942973958078785
- **日期：** 2026-11-09 18:59（美东时间）

**97. Demoscene Demo**

- **作者：** @ndril
- **说明：** "Make a demo in the demoscene tradition that runs in the browser."
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/4aEy6FtUi7jrm9U7uYgp8K
- **对应 X 帖：** https://x.com/ndril/status/2119899340642894235
- **日期：** 2026-11-09 16:06（美东时间）

**98. 112 Forms of Meditation**

- **作者：** @RishabJ108
- **说明：** Visualized for techies.
- **源码/仓库：** 源码在可玩页的 HTML 内（未找到单独仓库）
- **可玩/演示页：** https://claude.ai/artifact/H8E7AonW2KFrzdRimaLeXb
- **对应 X 帖：** https://x.com/RishabJ108/status/2120042407484084558
- **日期：** 2026-11-10 01:34（美东时间）

### 动画与成片（有源码）

**99. 【补录】 Pelican on a Bicycle（Blender / 约 4800 行 Python）**

- **作者：** @techfren
- **说明：** Fable 5.2 在无界面、纯命令行条件下为 Blender 编写约 4800 行 Python，在 RTX 5080 上用 Cycles 渲染 444 帧（约 56 分钟）。作者后来把“收据”和源码上传到 Hugging Face 数据集。
- **源码/仓库：**
  - https://huggingface.co/datasets/techfren/pelican-fable-trace
- **具体文件：**
  - 数据集（含 source / trace）：https://huggingface.co/datasets/techfren/pelican-fable-trace
  - 源码目录：https://huggingface.co/datasets/techfren/pelican-fable-trace/tree/main/source
  - source/pelican.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/pelican.py
  - source/pel_geom.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/pel_geom.py
  - source/bike.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/bike.py
  - source/env.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/env.py
  - source/anim.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/anim.py
  - source/scene.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/scene.py
  - source/render.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/render.py
  - source/common.py：https://huggingface.co/datasets/techfren/pelican-fable-trace/blob/main/source/common.py
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：**
  - 主帖：https://x.com/techfren/status/2119924958134702276
  - 补充/回复：https://x.com/techfren/status/2119926681716834440
  - 补充/回复：https://x.com/techfren/status/2120203574483550694
- **日期：** 2026-11-09 17:47（美东时间）

**100. The Pelican, Tired of the Road**

- **作者：** @chetaslua
- **说明：** A 60-second hand-painted-look film about the SVG-test pelican. One HTML file; every pixel and every sound is code.
- **源码/仓库：**
  - https://github.com/ChetasLua/pelican-riding-a-bicycle
- **具体文件：**
  - 仓库：https://github.com/ChetasLua/pelican-riding-a-bicycle
  - 成片 HTML（film.html）：https://github.com/ChetasLua/pelican-riding-a-bicycle/blob/main/film.html
  - 源码目录：https://github.com/ChetasLua/pelican-riding-a-bicycle/tree/main/src
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/chetaslua/status/2120438091647218025
- **日期：** 2026-11-11 03:46（美东时间）
- **备注：** 未发现 GitHub Pages 在线演示（仓库 Pages 返回 404）；可下载 film.html 本地打开。

**101. Ballpoint**

- **作者：** @camperaigg
- **说明：** Macro ASMR of a ballpoint pen, open-sourced to prove it is code, not a video model.
- **源码/仓库：** https://github.com/crossps/ballpoint
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/camperaigg/status/2119777467074580741
- **日期：** 2026-11-09 08:01（美东时间）

**102. One Sweep**

- **作者：** @anstapnever
- **说明：** A 78-second anime fight in pure Three.js, six agent teams in parallel. Author says "Fable 5.5".
- **源码/仓库：** https://github.com/anstapnever/one-sweep
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/anstapnever/status/2119772039037014524
- **日期：** 2026-11-09 07:40（美东时间）

**103. Godzilla Nights**

- **作者：** @chetaslua
- **说明：** Images drawn in pure code, lightly animated.
- **源码/仓库：** 见下列文件
- **具体文件：**
  - 仓库：https://github.com/ChetasLua/godzilla-nights
  - 入口 HTML：https://github.com/ChetasLua/godzilla-nights/blob/main/index.html
  - 可玩页：https://chetaslua.github.io/godzilla-nights/
- **可玩/演示页：** https://chetaslua.github.io/godzilla-nights/
- **对应 X 帖：** https://x.com/chetaslua/status/2119981510199808368
- **日期：** 2026-11-09 21:32（美东时间）

**104. Blackout**

- **作者：** @anstapnever
- **说明：** A 79-second anime short, all code.
- **源码/仓库：** https://github.com/anstapnever/blackout
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/anstapnever/status/2119915123070644263
- **日期：** 2026-11-09 17:08（美东时间）

**105. Robot Hand on a Spiral Staircase**

- **作者：** @Luckyballa
- **说明：** Fable 5.2 + the Steel physics engine: a hand walking on its fingers.
- **源码/仓库：** https://github.com/skild-ai/steel-webgpu/pull/7
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/Luckyballa/status/2119915557663506720
- **日期：** 2026-11-09 17:10（美东时间）

**106. Kagami**

- **作者：** @flxrnc
- **说明：** 84 seconds of anime where every frame is code. Author says "Fable 5.5".
- **源码/仓库：** https://github.com/Florencvv/kagami
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/flxrnc/status/2119767052021903831
- **日期：** 2026-11-09 07:20（美东时间）

**107. Ryu**

- **作者：** @seeconvm
- **说明：** A mountain wakes up as a dragon. No image or video models. Author says "Fable 5.5".
- **源码/仓库：** https://github.com/seeconever/ryu
- **可玩/演示页：** 无（源码或成片文件见上）
- **对应 X 帖：** https://x.com/seeconvm/status/2119777169542938662
- **日期：** 2026-11-09 08:00（美东时间）

**108. Kumiko Launch Film**

- **作者：** @sudoaptaj
- **说明：** Given only the music and the website, one shot. The plugin used is linked.
- **源码/仓库：** 未找到独立仓库；可玩页可能含可查看的前端代码
- **可玩/演示页：** https://usekumiko.app/
- **对应 X 帖：** https://x.com/sudoaptaj/status/2119937909373460990
- **日期：** 2026-11-09 18:39（美东时间）

---

## 二、仅有成片 / 视频、未找到公开文件

以下作品确认由 Fable 5.2 生成，但截至整理时只在 X 上看到视频或截图，没有找到可下载的源码、仓库或可玩页。**源码：未找到。** 标注 **【补录】** 的为本次额外核验补上的条目。

**1. 【补录】 官方早期实验串：纯代码 3D 细胞**

- **作者：** @claudeai
- **说明：** Anthropic 官方线程首帖。Kevin Ngo 用纯代码、一个细胞器一个细胞器搭出的 3D 细胞。仅视频。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/claudeai/status/2120174844822298730
- **日期：** 2026-11-10 10:20（美东时间）

**2. 【补录】 官方早期实验：折纸动物与折叠模拟器**

- **作者：** @claudeai
- **说明：** 同一官方线程。Fable 5.2 设计原创折纸动物并给出可打印步骤，用自建折叠模拟器检验。未见公开仓库。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/claudeai/status/2120174847435162015
- **日期：** 2026-11-10 10:20（美东时间）

**3. 【补录】 官方早期实验：黑板逐步讲解**

- **作者：** @claudeai
- **说明：** 同一官方线程，由 @TylerNishida 用 Fable 5.2 做的黑板逐步答题动画。未见公开文件。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/claudeai/status/2120174863210201316
- **日期：** 2026-11-10 10:20（美东时间）

**4. 【补录】 官方早期实验：金字塔播客（纯代码绘制）**

- **作者：** @claudeai
- **说明：** 同一官方线程，Kevin Ngo 用纯代码画出的埃及金字塔主题播客画面。未见公开文件。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/claudeai/status/2120174860252897530
- **日期：** 2026-11-10 10:20（美东时间）

**5. 【补录】 Every frame drawn with JavaScript**

- **作者：** @kevin_t_ngo
- **说明：** Kevin Ngo 用 JavaScript 逐帧绘制的动画短片。仅成片，未见仓库。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/kevin_t_ngo/status/2119938129079808282
- **日期：** 2026-11-09 18:40（美东时间）

**6. 【补录】 JavaScript drawing by Claude Fable 5.2**

- **作者：** @kevin_t_ngo
- **说明：** 另一组纯 JS 绘图静帧/作品，仅图片，未见源码。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/kevin_t_ngo/status/2120722200001122321
- **日期：** 2026-11-11 22:35（美东时间）

**7. 【补录】 Music video（Python + Blender）**

- **作者：** @kevin_t_ngo
- **说明：** Fable 5.2 用代码做的音乐视频，在 Python 中动画、Blender 中渲染。未见仓库。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/kevin_t_ngo/status/2120198663062622581
- **日期：** 2026-11-10 11:55（美东时间）

**8. 【补录】 40,000 只鸟的 flock 模拟短片（自写渲染器）**

- **作者：** @techfren
- **说明：** 作者让 Fable 5.2 自选最震撼的运动设计主题。模型写了自己的渲染器（约 5 千行 Python + GLSL），在 RTX 5080 上渲染约 4600 帧、61 分钟；0:44 处 4 万只鸟是从零写的 flock 模拟。背景音乐后加自 Suno。未找到公开源码（与鹈鹕自行车那套 HF 源码不是同一项目）。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：**
  - 主帖：https://x.com/techfren/status/2119899949756539056
  - 补充：https://x.com/techfren/status/2119945743507058740
- **日期：** 2026-11-09 16:08（美东时间）

**9. 【补录】 机械表机芯运动设计（纯代码建模）**

- **作者：** @techfren
- **说明：** 同一“最震撼 3D 运动设计”提问下，模型选择机械表并用代码搭出整套机芯。仅成片，未找到源码文件。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/techfren/status/2119911343633682916
- **日期：** 2026-11-09 16:53（美东时间）

**10. 【补录】 壁炉模拟器（three.js，声音亦为纯代码）**

- **作者：** @maxt3chno
- **说明：** 让 Fable 5.2 做一个简单壁炉模拟，结果做出完整舒适场景；three.js，连声音都是代码写的。约 42 分钟。未分享文件。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/maxt3chno/status/2120534514552221821
- **日期：** 2026-11-11 10:10（美东时间）

**11. 【补录】 一栋房子打磨 6 小时（Blender Python）**

- **作者：** @maxt3chno
- **说明：** 在 Blender 里用 Python 按原木尺寸建模小屋，重写光照，为悬空树补石台，并用光线步进写出流体火焰。仅成片，未找到源码。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/maxt3chno/status/2120624681086529660
- **日期：** 2026-11-11 16:08（美东时间）

**12. 【补录】 40KB 纯代码 PBR 战术手枪**

- **作者：** @McQueenCui
- **说明：** 受 Saltline 单文件 FPS 启发，用纯代码生成完整 PBR 战术手枪资产，整个资产约 40KB（一侧 CPU 程序化 16 万顶点，一侧 GPU raymarching）。有技术博客，但未找到可下载的代码文件或仓库。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/McQueenCui/status/2120524484197400720
- **日期：** 2026-11-11 09:30（美东时间）
- **相关文章：** https://blog.lumio.games/posts/fable-5-2-code-as-3d-asset.html（文中亦未提供可下载源码）

**13. 【补录】 《清明上河图》纯代码动画对比**

- **作者：** @lokeshforai
- **说明：** 同一提示词对比 Fable 5.2、GPT 6 Astra 与 Deepseek-v4.1-flash，把《清明上河图》做成纯代码动画。仅成片，未见源码。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/lokeshforai/status/2120830306630479986
- **日期：** 2026-11-12 05:45（美东时间）

**14. 【补录】 鸟鸣作曲（9 只物理建模鸟，0 采样）**

- **作者：** @chetaslua
- **说明：** 9 只物理建模鸟都调在同一个音上，直到一只哀鸽醒来开唱；真实黎明时间与星空，全部代码、无采样。仅成片，未见仓库。
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/chetaslua/status/2120616372434837677
- **日期：** 2026-11-11 15:35（美东时间）

**15. Anthropic: pre-release projects**

- **作者：** @claudeai
- **说明：** What Fable 5.2 and Mythos 5.2 built across fields during testing.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/claudeai/status/2119899459761131615
- **日期：** 2026-11-09 16:06（美东时间）

**16. A 3D film explaining Zeno's paradox**

- **作者：** @anxuanng
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/anxuanng/status/2120088745139638375
- **日期：** 2026-11-10 04:38（美东时间）

**17. A symphony shaped like a training run**

- **作者：** @imjustnewatai
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/imjustnewatai/status/2120383964686729410
- **日期：** 2026-11-11 00:11（美东时间）

**18. The history of computer graphics, animated**

- **作者：** @aollivier82
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/aollivier82/status/2120260208245043663
- **日期：** 2026-11-10 16:00（美东时间）

**19. Age of Dragon, an open world by a non-coder**

- **作者：** @M__Houser
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/M__Houser/status/2120253236309569696
- **日期：** 2026-11-10 15:32（美东时间）

**20. Fishslop run**

- **作者：** @theo
- **说明：** 76 minutes, ~$42.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/theo/status/2119926277801144695
- **日期：** 2026-11-09 17:53（美东时间）

**21. Da Vinci's notebooks, interactive**

- **作者：** @alexalbert__
- **说明：** A 500-year-old notebook PDF turned into inventions you can play with.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/alexalbert__/status/2119916954337349737
- **日期：** 2026-11-09 17:16（美东时间）

**22. Arena FPS with portals**

- **作者：** @_sholtodouglas
- **说明：** Playtested in the office.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/_sholtodouglas/status/2119935331499925557
- **日期：** 2026-11-09 18:29（美东时间）

**23. Fast-camera 3D scene**

- **作者：** @LexnLin
- **说明：** 30 minutes with a few Opus 5.5 subagents.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/LexnLin/status/2119880654858977333
- **日期：** 2026-11-09 14:51（美东时间）

**24. Previz run cycles from three words**

- **作者：** @akakuma0219
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/akakuma0219/status/2120030634248929556
- **日期：** 2026-11-10 00:47（美东时间）

**25. A message to video editors**

- **作者：** @ChrisGPT
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/ChrisGPT/status/2119998815856218494
- **日期：** 2026-11-09 22:41（美东时间）

**26. Bugatti Tourbillon modeled and rendered in Blender**

- **作者：** @xikhar
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/xikhar/status/2119966147328299284
- **日期：** 2026-11-09 20:31（美东时间）

**27. An operating system from an empty folder**

- **作者：** @chetaslua
- **说明：** Anthropic's demo of 1,000+ coordinated agents.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/chetaslua/status/2119870650722763052
- **日期：** 2026-11-09 14:12（美东时间）

**28. Addictive volume slider**

- **作者：** @vib3coded
- **说明：** 10 minutes, $8.43.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/vib3coded/status/2119876781700505627
- **日期：** 2026-11-09 14:36（美东时间）

**29. Glass Pool (Fable vs Opus)**

- **作者：** @MrTacticalX
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/MrTacticalX/status/2119955647542542439
- **日期：** 2026-11-09 19:49（美东时间）

**30. A '90s toy commercial**

- **作者：** @kevin_t_ngo
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/kevin_t_ngo/status/2119972124211454139
- **日期：** 2026-11-09 20:55（美东时间）

**31. Woke up to this: game environment in Blender + Unreal**

- **作者：** @RezAIT00
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/RezAIT00/status/2120498246426706176
- **日期：** 2026-11-11 07:45（美东时间）

**32. One-prompt GTA 6**

- **作者：** @ericmaskfr
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/ericmaskfr/status/2119910195325481026
- **日期：** 2026-11-09 16:49（美东时间）

**33. A first-person shooter in Three.js, no external assets**

- **作者：** @JaydenDavisNC
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/JaydenDavisNC/status/2120306434575392793
- **日期：** 2026-11-10 19:03（美东时间）

**34. A Tamagotchi: PCB, enclosure and render**

- **作者：** @adamdotnew
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/adamdotnew/status/2120071630139621540
- **日期：** 2026-11-10 03:30（美东时间）

**35. "Show me your best video" — with a twist**

- **作者：** @rute1203d
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/rute1203d/status/2120077147872391540
- **日期：** 2026-11-10 03:52（美东时间）

**36. A '90s cereal commercial**

- **作者：** @kevin_t_ngo
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/kevin_t_ngo/status/2120308118127309173
- **日期：** 2026-11-10 19:10（美东时间）

**37. 37-second uncut flight over endless terrain**

- **作者：** @KanaWorks_AI
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/KanaWorks_AI/status/2120098607382880627
- **日期：** 2026-11-10 05:17（美东时间）

**38. A looping short made in Blender**

- **作者：** @ICO_AIvideo
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/ICO_AIvideo/status/2120311646933680355
- **日期：** 2026-11-10 19:24（美东时间）

**39. Claude logo animation**

- **作者：** @LexnLin
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/LexnLin/status/2120167637133238295
- **日期：** 2026-11-10 09:52（美东时间）

**40. One-shot reel**

- **作者：** @WesRoth
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/WesRoth/status/2119953913160093817
- **日期：** 2026-11-09 19:42（美东时间）

**41. A mechanical keyboard in Blender, typing included**

- **作者：** @MrTacticalX
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/MrTacticalX/status/2120342453807157720
- **日期：** 2026-11-10 21:26（美东时间）

**42. "Beauty", a short film from one sentence**

- **作者：** @thomaszhou_
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/thomaszhou_/status/2120389154970509666
- **日期：** 2026-11-11 00:32（美东时间）

**43. A walkthrough of a house not built yet**

- **作者：** @oalanicolas
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/oalanicolas/status/2120266468780585456
- **日期：** 2026-11-10 16:24（美东时间）

**44. A three.js apartment recreated in Blender**

- **作者：** @MengTo
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/MengTo/status/2120316203738829180
- **日期：** 2026-11-10 19:42（美东时间）

**45. Opus 5.5 vs Fable 5.2**

- **作者：** @dom_scholz
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/dom_scholz/status/2119933150025363661
- **日期：** 2026-11-09 18:20（美东时间）

**46. An animated show intro**

- **作者：** @kevin_t_ngo
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/kevin_t_ngo/status/2120540964909711415
- **日期：** 2026-11-11 10:35（美东时间）

**47. Designed a font, then a documentary about it**

- **作者：** @jsnnsa
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/jsnnsa/status/2120161161803088061
- **日期：** 2026-11-10 09:26（美东时间）

**48. A whole movie in code**

- **作者：** @mattshumer_
- **说明：** Voices, graphics, everything.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/mattshumer_/status/2119900920347828670
- **日期：** 2026-11-09 16:12（美东时间）

**49. AAA three.js basketball**

- **作者：** @alightinastorm
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/alightinastorm/status/2120010936584945922
- **日期：** 2026-11-09 23:29（美东时间）

**50. A data-pipeline write-up that became a design**

- **作者：** @theo
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/theo/status/2120104895646937409
- **日期：** 2026-11-10 05:42（美东时间）

**51. Ink letters**

- **作者：** @op7418
- **说明：** Type a character and it becomes live fluid ink, with sound.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/op7418/status/2120085300185833878
- **日期：** 2026-11-10 04:24（美东时间）

**52. Rocket launch (Fable vs Opus)**

- **作者：** @Bhavani_00007
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/Bhavani_00007/status/2119902204320780676
- **日期：** 2026-11-09 16:17（美东时间）

**53. A video edited by Fable about editing with Fable**

- **作者：** @rileybrown
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/rileybrown/status/2119973951027724385
- **日期：** 2026-11-09 21:02（美东时间）

**54. A cinematic 3D journey through the history of science**

- **作者：** @DeryaTR_
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/DeryaTR_/status/2119974354260013293
- **日期：** 2026-11-09 21:04（美东时间）

**55. A stylized MMO world in a day**

- **作者：** @Izkimar
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/Izkimar/status/2119931740940640542
- **日期：** 2026-11-09 18:14（美东时间）

**56. Tropical-island FPS**

- **作者：** @imantiai
- **说明：** One prompt.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/imantiai/status/2119979537320534135
- **日期：** 2026-11-09 21:24（美东时间）

**57. App redesign, 5.1 vs 5.2**

- **作者：** @RuslanKyrch
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/RuslanKyrch/status/2119896220814762218
- **日期：** 2026-11-09 15:53（美东时间）

**58. BRYCEBALL: a renderer used as a game engine**

- **作者：** @pleometric
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/pleometric/status/2119973274402668852
- **日期：** 2026-11-09 20:59（美东时间）

**59. Same prompt, Fable vs Opus**

- **作者：** @notjazii
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/notjazii/status/2119886035421442097
- **日期：** 2026-11-09 15:13（美东时间）

**60. Chalk art comes alive**

- **作者：** @dfeinition
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/dfeinition/status/2119881243990859818
- **日期：** 2026-11-09 14:54（美东时间）

**61. Fabric and light**

- **作者：** @dfeinition
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/dfeinition/status/2119886262211625062
- **日期：** 2026-11-09 15:14（美东时间）

**62. Blender + Reaper sound design**

- **作者：** @AmirMushich
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/AmirMushich/status/2119903338078564844
- **日期：** 2026-11-09 16:21（美东时间）

**63. Lawn-mowing simulator**

- **作者：** @_MaxBlade
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/_MaxBlade/status/2119992020076814436
- **日期：** 2026-11-09 22:14（美东时间）

**64. An ad with the ElevenLabs MCP**

- **作者：** @ElevenCreative
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/ElevenCreative/status/2120025947709837525
- **日期：** 2026-11-10 00:29（美东时间）

**65. Blender castle (Fable vs Opus)**

- **作者：** @Stefan_3D_AI
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/Stefan_3D_AI/status/2120041169719894165
- **日期：** 2026-11-10 01:29（美东时间）

**66. Superman flies through CG history, pure JS**

- **作者：** @chetaslua
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/chetaslua/status/2120548065044234504
- **日期：** 2026-11-11 11:03（美东时间）

**67. Pelican riding a bicycle in Blender**

- **作者：** @themianoo
- **说明：** ~4,800 lines of Python, 444 frames.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/themianoo/status/2120042064666882266
- **日期：** 2026-11-10 01:33（美东时间）

**68. Sword-fighting game**

- **作者：** @EvanMilenko
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/EvanMilenko/status/2119969113762082931
- **日期：** 2026-11-09 20:43（美东时间）

**69. Music video**

- **作者：** @WesRoth
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/WesRoth/status/2119911161386934330
- **日期：** 2026-11-09 16:53（美东时间）

**70. A dragon game in Three.js**

- **作者：** @EvanMilenko
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/EvanMilenko/status/2120322640048959503
- **日期：** 2026-11-10 20:08（美东时间）

**71. Crochet coral reef**

- **作者：** @petergostev
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/petergostev/status/2120125927086600681
- **日期：** 2026-11-10 07:06（美东时间）

**72. 4 hours in Unreal Engine 5.9 via MCP**

- **作者：** @_MaxBlade
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/_MaxBlade/status/2120109725740159390
- **日期：** 2026-11-10 06:02（美东时间）

**73. 1886 New York floating in the sky**

- **作者：** @semichenkko
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/semichenkko/status/2119960596951236675
- **日期：** 2026-11-09 20:09（美东时间）

**74. Monica's apartment in three.js**

- **作者：** @chetaslua
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/chetaslua/status/2120111159726727321
- **日期：** 2026-11-10 06:07（美东时间）

**75. SwiftUI eye-color app**

- **作者：** @solotechdev
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/solotechdev/status/2120071690482794603
- **日期：** 2026-11-10 03:30（美东时间）

**76. A symphony**

- **作者：** @RJasonHA
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/RJasonHA/status/2120007540713099768
- **日期：** 2026-11-09 23:16（美东时间）

**77. A robot you could build at home**

- **作者：** @mattshumer_
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/mattshumer_/status/2119889518564147409
- **日期：** 2026-11-09 15:27（美东时间）

**78. Pelican on a bicycle (classic test)**

- **作者：** @abhinavflac
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/abhinavflac/status/2119884257145581980
- **日期：** 2026-11-09 15:06（美东时间）

**79. Claymation**

- **作者：** @dfeinition
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/dfeinition/status/2119892208937517201
- **日期：** 2026-11-09 15:37（美东时间）

**80. Four game-machine concepts**

- **作者：** @techartist_
- **说明：** VFX, mechanics and physics tests.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/techartist_/status/2119946891106394518
- **日期：** 2026-11-09 19:15（美东时间）

**81. A library at midnight**

- **作者：** @lemomo_ai
- **说明：** 24,000 pages take flight.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/lemomo_ai/status/2120118194409193682
- **日期：** 2026-11-10 06:35（美东时间）

**82. A Bach-style fugue**

- **作者：** @aug5thmusic
- **说明：** Written in LilyPond.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/aug5thmusic/status/2119907891419480107
- **日期：** 2026-11-09 16:40（美东时间）

**83. Motion blending, explained by a robot**

- **作者：** @dfeinition
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/dfeinition/status/2119870838606381391
- **日期：** 2026-11-09 14:12（美东时间）

**84. Recreating a Bora Bora photo**

- **作者：** @AlchainHust
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/AlchainHust/status/2120065556003102731
- **日期：** 2026-11-10 03:06（美东时间）

**85. Rubik's cube robot (Fable vs Opus)**

- **作者：** @charliejhills
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/charliejhills/status/2120105823737397644
- **日期：** 2026-11-10 05:46（美东时间）

**86. A studio rebuilt from photos**

- **作者：** @rpnickson
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/rpnickson/status/2119969928304357507
- **日期：** 2026-11-09 20:46（美东时间）

**87. A launch film from one sentence**

- **作者：** @wangray
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/wangray/status/2120040640423850168
- **日期：** 2026-11-10 01:27（美东时间）

**88. Kids' English cartoon**

- **作者：** @linxiaobei888
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/linxiaobei888/status/2119978892861829227
- **日期：** 2026-11-09 21:22（美东时间）

**89. Sea serpent in Blender**

- **作者：** @Stefan_3D_AI
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/Stefan_3D_AI/status/2120039417981333599
- **日期：** 2026-11-10 01:22（美东时间）

**90. Four models, one text effect**

- **作者：** @leppppp1
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/leppppp1/status/2119960122713899015
- **日期：** 2026-11-09 20:07（美东时间）

**91. Virus capsid from 420 subunits**

- **作者：** @TekonBurns
- **说明：** One prompt, one HTML file.
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/TekonBurns/status/2119871565311660260
- **日期：** 2026-11-09 14:15（美东时间）

**92. Game with and without ElevenLabs audio**

- **作者：** @ElevenCreative
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/ElevenCreative/status/2119963230403776554
- **日期：** 2026-11-09 20:19（美东时间）

**93. Sound-on piece**

- **作者：** @guanmo_ai
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/guanmo_ai/status/2119989925038985382
- **日期：** 2026-11-09 22:06（美东时间）

**94. Lion from a carpet (Fable vs Gemini)**

- **作者：** @kinderlayer
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/kinderlayer/status/2120112222227648957
- **日期：** 2026-11-10 06:11（美东时间）

**95. A $36 Game of Thrones dragon**

- **作者：** @Lummox_eth
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/Lummox_eth/status/2120093679243194793
- **日期：** 2026-11-10 04:58（美东时间）

**96. A mobile game running as an Artifact**

- **作者：** @ChrisGPT
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/ChrisGPT/status/2119989626568126509
- **日期：** 2026-11-09 22:04（美东时间）

**97. A day-one film (prompt PDF shared)**

- **作者：** @flxrnc
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/flxrnc/status/2119961301791174720
- **日期：** 2026-11-09 20:12（美东时间）

**98. Tesla Roadster kickflip in Blender**

- **作者：** @Stefan_3D_AI
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/Stefan_3D_AI/status/2120101582444597446
- **日期：** 2026-11-10 05:29（美东时间）

**99. Chinatown in code**

- **作者：** @RJasonHA
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/RJasonHA/status/2120075740222005569
- **日期：** 2026-11-10 03:47（美东时间）

**100. Paris on a floating island**

- **作者：** @ItsmeAjayKV
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/ItsmeAjayKV/status/2119896772713849174
- **日期：** 2026-11-09 15:55（美东时间）

**101. Snow Globe (Fable vs Opus)**

- **作者：** @MrTacticalX
- **源码/仓库：** 未找到
- **可玩/演示页：** 无
- **对应 X 帖：** https://x.com/MrTacticalX/status/2119949557664735583
- **日期：** 2026-11-09 19:25（美东时间）

---

## 附录：链接核对摘要

- 清单中的可玩页、仓库与文件链接已在 2026-11-12 用 HTTP 请求复查。
- `http://robotics-lab-app.vercel.app` 与 `http://procedural-arm-rig.vercel.app` 的 HTTP 明文地址曾返回 500，**HTTPS 版本返回 200**，正文已改用 https。
- `https://zondark.com` 返回 403，页面应存在但有访问限制，仍予保留并标注。
- Saltline 官方地址为 Claude Artifact；社区另有 HTML 镜像，已标明非官方。
- @itsfazley 的 Outpost Siege 主帖起初只发视频，后在同一对话回复中放出了可玩 HTML，已从“仅视频”改列为可玩/有源码。

