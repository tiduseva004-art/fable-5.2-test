# Claude Fable 5.2 纯代码视频 / 交互动画 / 3D 游戏「原始生成提示词（Prompts）」全量总汇

> **整理时间**：2026-11-12

本手册专门汇总 X 平台上爆火的 Claude Fable 5.2 纯代码视频、交互动画与零资源 3D 游戏背后的**原始提示词（作者生成该作品时输入的“那几句话”或完整导演级 Brief）**。

通过对比这 280+ 份真实提示词，你会发现 Fable 5.2 的纯代码创作只有**两种提示词流派**：
1. **「一句话极简放权流」**（1–3 句话）：只定**题材、体裁（单文件 HTML / 纯代码零外部资源）、审美标杆（AAA 画质 / 吉卜力 / 剧场版动画）**，加一句“不要问我问题，自己截图自检直到满意”。
2. **「导演分镜与物理契约流」**（结构化多段式）：明确规定 **`HERO`（主角尺寸与材质）、`WORLD`（场景尺度）、`STORY / TIMELINE`（按秒或按帧分镜）、`SOUND`（BPM 节拍与 WebAudio 合成器）、`CHECKS`（渲染前脚本自检穿模/帧率/暴露 `window.renderAt(t)`）**。

---

## 一、核心标杆大作的「那几句话」原始提示词（中英对照）

### 1. 《Saltline》单文件 3A 级雨夜港口 FPS（`@felixrieseberg`，Anthropic 工程师）
- **本地源码**：`01_Saltline_单文件FPS/index.html`（1.4 MB / 6,193 行）
- **作者输入的原始一句话 Prompt**：
  ```text
  Build me a FPS. Insanely detailed quality pls, something that looks visually like it can keep up with AAA. Make it small in scope (like a tiny level) but otherwise impressive photorealistic graphics
  ```
  > **中文大意**：「给我做一个第一人称射击游戏（FPS）。请务必做到极其细腻的画质，视觉上要能追平 3A 大作。规模可以做小一点（比如只有一个微型关卡），但画面必须达到令人震撼的照片级写实感。」
- **`@wquguru` 中文分步复现版（40 分钟 / $15.96 跑出 131KB 单文件 FPS）的配套 System Prompt 与 4 步提示词**：
  - 本地文件：`prompts/builder_system.md`、`01-audio.md`、`02-materials.md`、`03-models.md`、`04-fps.md`
  - **关键无人值守系统提示词（让模型连续跑几小时不中断的秘诀）**：
    ```text
    你在独立完成一个创作任务。用户只给一次需求，之后不会再回答任何问题，所有决定你自己做，直到作品完成。
    - 产物只写到任务指定的目录。
    - 可以用 agent-browser（open / screenshot / eval / console）在本机 Chrome 里打开自己的页面截图自检，发现问题就改。
    - 涉及声音时，你听不到声音：用 OfflineAudioContext 渲染后检查峰值、削波和静音段，在汇报里写明「未经人耳试听」。
    ```

---

### 2. 《Pelican on a Bicycle》4,800 行 Blender Python 写实鹈鹕骑车短片（`@techfren`）
- **本地源码与完整 406 轮对话日志**：`11_Techfren_Blender鹈鹕骑车_4800行Python/repo/trace/main_session.jsonl`
- **从对话日志第 0 行提取的作者首轮原始 Prompt**：
  ```text
  Make a video of a 3D pelican riding a bicycle, as realistic as you can make it: believable anatomy and feathers, a real bicycle with working drivetrain motion, physically plausible riding animation, real-world lighting and camera. Take the time it needs. Deliver a finished video file.
  ```
  > **中文大意**：「制作一段 3D 鹈鹕骑自行车的视频，尽你所能做到最写实：可信的解剖结构与羽毛、带有真实传动链条运动的自行车、物理上合理的骑行动作、真实世界的光照与运镜。需要多少时间都可以，最终交付一个渲染完成的视频文件。」

---

### 3. 《雾锁山门 (Mist-Locked Mountain Gate)》30MB 单文件 3D 仙侠动作游戏（`@op7418` 归藏）
- **本地源码与完整 Skill**：`15_清单内其余GitHub与Patch开源仓库全量补齐/op7418_guizang-game-skill/README.md`
- **作者使用的触发 Prompt（配合该仓库内的 `SKILL.md`）**：
  ```text
  做一个武侠/仙侠题材的俯视角 3D 动作游戏：一个场景、一段小怪遭遇战、一场 Boss 战，有剧情和配音，打包成一个单文件 HTML。
  ```

---

### 4. 《1888 巴黎埃菲尔铁塔建造体素浮空岛》14 秒纯代码确定性短片（`@RezAIT00` / `@semichenkko`）
- **本地归档**：`rezait00-767656.md`
- **完整原始 Prompt（极具参考价值！注意第一句强制暴露 `window.renderAt(t)` 以便逐帧截屏导出高清 MP4）**：
  ```text
  Build a single self-contained three.js HTML page that renders a 14-second animation (1280x720, 30fps, deterministic: expose window.renderAt(t) so every frame can be captured).
  Scene: a floating voxel diorama island - Paris, 1888, the Eiffel Tower under construction. Everything is already moving on frame 1.
  Island:
  - floating chunk with layered rock underside, the Seine curving across the front with stone quays and an arched bridge
  - Champ de Mars: dirt work yard, stacks of iron girders, wooden sheds, a steam engine with a smoking chimney
  - around it: rows of Haussmann buildings with cream walls, grey zinc roofs, chimneys, tiny trees along the boulevards
  The tower (the hero):
  - dark reddish-brown wrought iron lattice made of thin voxel beams with real X-bracing, not solid blocks
  - four curved legs and the first platform finished, the second level half built, the top section only a skeleton
  - wooden scaffolding towers under the legs, small creeper cranes on the structure lifting girders on chains
  - glowing orange rivet sparks where workers hammer, small puffs of steam
  Life (hundreds of tiny voxel people, ~3 voxels tall):
  - riveting teams on every level with hammers swinging, workers walking along beams
  - girders hoisted by cranes swinging slowly into place
  - horse-drawn carts carrying iron across the yard, crowds of onlookers in 1880s clothes with top hats and parasols
  - a riverboat with a smoking funnel moving along the Seine, carriages crossing the bridge, pigeons circling the tower
  Camera and look:
  - wide view of the whole island, slow orbit (~25 degrees) with a gentle push-in toward the tower
  - warm late-afternoon sun, soft shadows, ambient occlusion, light haze, rounded voxels, ACES tone mapping, soft bloom on sparks
  ```

---

### 5. 《No. 9 蒸汽机车变形机器人》90 秒 2,160 帧剧场版手绘风动漫短片（`@0kncn`）
- **本地归档**：`0kncn-543073.md`
- **核心 Prompt 结构摘录（展示了如何让 Claude 写出零穿模的复杂变形动画）**：
  ```text
  Create a 2D anime short. It must look completely like real Japanese anime, as if it were taken directly from a finished theatrical anime film...
  Build everything in Blender from Python, render it in Eevee, then ink and paint every frame in a second pass. Deliver one 1920x1080, 24 fps MP4 with a synthesized soundtrack...
  The film is 90 seconds long (2160 frames), in 42 shots. Its hero is a steam locomotive that transforms into a robot.

  TRANSFORM
  One transformation, at full speed, 120 frames, in five stages of 24 frames. Every part is rigid: nothing stretches, nothing vanishes, nothing appears. Each part travels on a hinge or a slide you can see...

  FORMAT
  Write the film as a Python story clock: one state per frame for every pose, camera, wheel angle, rod position, transformation part, wagon, effect and sound cue.

  CHECKS
  Before the final render a script tests every frame on the real meshes: no part of No. 9 goes through another part, in either form or at any frame of the transformation; the total volume of its parts is the same in both forms; every wheel on a rail turns exactly as far as it travels; planted feet do not move...
  ```

---

### 6. 全网疯传的「一句话极简 Prompt」爆款视频合集（作者公开的原话）

| 案例名称与作者 | 作者公开的原始几句话 Prompt | 本地详情文件 |
|---|---|---|
| **告别 Opus 5.5 的 15 秒片头 Showreel** (`@kaif9998`) | 第 1 句：`"make a 15 second animated video that says final goodbye to Opus 5.5 as Fable 5.2 is here and I switched to it"`<br>第 2 句：`"make the video like it's your showreel"` | `kaif9998-761287.md` |
| **从混沌粒子凝聚成 Hello 的震撼开场片** (`@ici_dab`) | `"I need you to create the most impressive thing I can share with people when you launch. It needs to be embeddable in a post and i can preface it however you like. it needs to have a visceral impact on people to show what you can do and the range of capabilities. It should grab them quickly. Be amazingly clever about this."` | `ici-dab-098351.md` |
| **Fable 5.2 用 57 分钟给自己写的纯代码发布会视频** (`@furkancavlakcom`) | `"Kendi lansman videonu yap. Sadece kodla."`（土耳其语：**「为你自己做一条发布宣传片。只许用代码。」**） | `furkancavlakcom-695521.md` |
| **调用 Opus 5.5 子智能体做 60 秒官宣动画** (`@grafikcem`) | `"Bugün duyurulmana özel Fable 5.2 modeli için opus 5.5 subagentları kullanarak kendine 60 saniyelik bir tanıtım animasyon filmi hazırla."`（**「用 Opus 5.5 子智能体为你今天发布的 Fable 5.2 制作一部 60 秒的介绍动画短片。」**） | `grafikcem-937806.md` |
| **古耶路撒冷沉浸式 3D 历史复原** (`@kplikethebird`) | `"Build an immersive, historically accurate 3D model of Jerusalem during the week of Jesus's final visit using Blender."` | `kplikethebird-902732.md` |
| **项目社交媒体炫酷宣传片（Hyperframes）** (`@midudev` / `@al_maxgo`) | `"Create an animated video trailer for this project to share on social media. I want you to sell it in a spectacular way—with amazing sound and animations. Use hyperframes."` | `al-maxgo-591040.md` |
| **UFO 降落 51 区问候人类 30 秒大片** (`@danteeonsol`) | `"make me a 30 second video of a UFO visiting Area 51 and greeting humans, ultra detailed, cinematic lighting"` | `danteeonsol-077213.md` |
| **Clawd 小巫师炼出 Fable 5.2 动画** (`@other__reality`) | `"Create an animated video of clawd creating and releasing Claude Fable 5.2"` | `other-reality-913784.md` |
| **3D 镀铬金属网格 Logo 揭示动画** (`@hello_amani`) | `"make my logo reveal in 3D with chromatic metal and grids"` | `hello-amani-237842.md` |
| **哈利波特 × 堡垒之夜大逃杀** (`@mattshumer_`) | `"Fable 5.2, create a mashup of Harry Potter and Fortnite"` | `mattshumer-810226.md` |
| **火柴人动漫打斗（含黑白闪帧与合成配乐）** (`@camperaigg`) | `"Make me a video of 2 stickman fighting, anime style."` | 见 `awesome-fable-5.2-use-cases_README.md` |
| **擎天柱式重卡 51 关节变形动画** (`@camperaigg`) | `"Make me a transformer truck with animations of its transforming."` | 见 `awesome-fable-5.2-use-cases_README.md` |
| **传递光芒的抽象治愈短片** (`@abhinavflac`) | `"Show me what kindness means to you"` | 见 `awesome-fable-5.2-use-cases_README.md` |

---

## 二、本机已完整下载的 3 大原始提示词宝库（共 260+ 份独立文件）

1. **`@MiaAI_lab` 的 76 个单文件 HTML 艺术/物理/交互作品 + 76 份完整 `.txt` 原始提示词**：
   - 目录路径：`13_MiaAI_76个单文件HTML合集_含Prompt/repo/`
   - 每个 `NNN-xxx.html` 旁边都有一个同名的 `NNN-xxx.txt`，里面是生成该单文件网页时的**一字不差完整英文 Prompt**（涵盖流墨画盘、飞艇翻页钟、羊角面包解剖、灯塔守夜、机械计算尺、800米南极冰芯、复古合成器、微距植物图谱等 76 个主题）。
2. **`yihui-dev/awesome-fable5-2-videos` 的 180 份视频推文与 Prompt 独立档案**：
   - 目录路径：`汇总索引/yihui-dev_awesome-fable5-2-videos/prompts/`
   - 共 180 个 `.md` 文件，包含每条视频的 CDN 播放直链（`media.skillry.dev`）、原帖正文引用以及 20 份完整可复制长 Prompt。
3. **`@wquguru` 中文单文件 3D 游戏复现的 6 份提示词文件**：
   - 目录路径：`01_Saltline_单文件FPS/wquguru_中文复现与Prompt/prompts/`
   - 含 `01-audio.md`（纯 WebAudio 合成器）、`02-materials.md`（纯 Shader PBR 材质）、`03-models.md`（纯代码硬表面建模）、`04-fps.md`（完整 FPS）及 `builder_system.md`（无人值守自检系统提示词）。
