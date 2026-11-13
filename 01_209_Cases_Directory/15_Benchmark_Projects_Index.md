# Claude Fable 5.2 纯代码视频与交互动画案例库（全量源码、原始项目与 Prompt 提示词总册）

> **收录时间**：2026-11-12
> **原始提示词（Prompts）专册**：👉 `**《PROMPTS_全量原始提示词与生成指令总汇.md》**`

本目录完整收录了 X 平台上 2026 年 11 月 9 日 **Claude Fable 5.2**（及同波次 Mythos 5.2 / Fable 5.5）发布后爆火的 **209 个纯代码视频 / 零外部资源 3D 交互场景与游戏清单**，并将其中**所有能找到公开仓库、Patch 仓库、Vercel 原生模块树或单页 HTML 的 15 大源码工程系列（共 30+ 个完整原始项目 + 260+ 份原始生成 Prompt）** 全部扒取落地到本机。

---

## 一、目录结构与本地源码 & Prompt 速查表

| 编号 | 案例名称与作者 | 本地源码目录 | 是否含原始项目源码 | 是否含原始生成 Prompt |
|---|---|---|---|---|
| **00** | **全网四大 Fable 5.2 汇总索引库 + 180 条视频 Prompt 档案** | `汇总索引/` | 含 209 条核验总表 + 329 条用例库 | ✅ **含 180 份 `prompts/*.md` 档案** |
| **01** | **Saltline 单文件 FPS** (`@felixrieseberg`) + `@wquguru` 中文复现包 | `源码与工程/01_Saltline_单文件FPS/` | ✅ 原版 `1.4 MB` 单文件 HTML + 4 个中文复现 HTML | ✅ **含 Felix 原话一句话 Prompt + 中文 4 步 Prompt & 无人值守 System Prompt** |
| **02** | **Oil Paint 150万笔触油画森林** + `@BlendiByl` 其余 3 部 Patch 开源作 | `源码与工程/02_Oil_Paint_150万笔触油画森林/` | ✅ **4 个完整 Git 仓库**（`oil-paint`、`painted-valley` 吉卜力山谷、`patchwork-quilt` 拼布世界、`impossible-spaces` 非欧空间） | ✅ 含完整架构与设计说明 |
| **03** | **Evensong 魂类 Boss 战** (`@kevin_t_ngo`) | `源码与工程/03_Evensong_魂类Boss战/` | ✅ 完整提取 **58 个原生 ES2022 模块源码** | ✅ 源码注释内含 Kevin Ngo 迭代指令与 `MODULES` 契约 |
| **04** | **Gilt & Gutter 双色 1v1 对战** (`@kevin_t_ngo`) | `源码与工程/04_Gilt_and_Gutter_双色1v1对战/` | ✅ 完整提取 **73 个原生 ES2022 模块源码** | ✅ 含 `SPECS` 模块契约表与自动化测试钩子 |
| **05** | **The Lost Storm 等距动作 RPG** (`@marginsystems`) | `源码与工程/05_The_Lost_Storm_等距ARPG/` | ✅ **MIT 完整仓库**（Three.js + TS + Blender 生成脚本） | ✅ 含完整架构文档 |
| **06** | **Core-Breach 零资源浏览器生存 FPS** (`@ShahZuabir`) | `源码与工程/06_Core_Breach_零资源生存FPS/` | ✅ **MIT 完整仓库**（零构建 ES Modules + Three.js + Web Audio） | ✅ 含完整说明 |
| **07** | **living-canvas 纯 SVG/Canvas 动画讲解 Skill** (`@shouvik_palit`) | `源码与工程/07_Living_Canvas_纯SVG动画Skill/` | ✅ 完整 Claude Skill 源码（`SKILL.md` + `render_mp4.py`） | ✅ `SKILL.md` 即完整生成提示词 |
| **08** | **Chetaslua 纯代码插画动画双连发** (`@chetaslua`) | `源码与工程/08_Chetaslua_纯代码插画动画_已开源/` | ✅ **2 个完整仓库**：`godzilla-nights`（哥斯拉之夜）+ `pelican-riding-a-bicycle`（60秒手绘水粉动画短片） | ✅ 含故事分镜脚本 `src/story.js` |
| **09** | **同批开源纯代码动画短片合集（5 部）** | `源码与工程/09_同批开源纯代码动画短片合集/` | ✅ **5 个完整原始项目**：`blackout`（含 MP4）、`one-sweep`（含 MP4）、`ballpoint`、`kagami`、`ryu` | ✅ 含分镜表、情绪曲线 `cuesheet.md` 与并行 Agent 分工说明 |
| **10** | **Outpost Siege 沙漠前哨战单文件 FPS** (`@itsfazley`) | `源码与工程/10_Outpost_Siege_沙漠前哨战单文件FPS/` | ✅ 作者在评论区公开的 `463 KB` 单文件 `index.html` | ✅ 含主帖与补链说明 |
| **11** | **Pelican on a Bicycle (Blender 4800行 Python)** (`@techfren`) | `源码与工程/11_Techfren_Blender鹈鹕骑车_4800行Python/repo/` | ✅ **完整 Hugging Face 仓库**（`source/*.py` 4800 行 Blender 脚本） | ✅ **含 `trace/main_session.jsonl` 406 轮完整对话日志与第 0 行原始 Prompt！** |
| **12** | **Worm Rider 沙虫骑士 3D** (`@AmirMushich`) | `源码与工程/12_Worm_Rider_沙虫骑士3D/repo/` | ✅ **MIT 完整仓库**（3400 行纯代码建模与渲染） | ✅ 含 10 轮构建说明 |
| **13** | **MiaAI 76 个单文件 HTML 艺术与物理交互合集** (`@MiaAI_lab`) | `源码与工程/13_MiaAI_76个单文件HTML合集_含Prompt/repo/` | ✅ **76 个独立单文件 `.html`** | ✅ **配齐全部 76 份同名 `.txt` 原始英文 Prompt！** |
| **14** | **Kevin Ngo《What the Water Keeps》8 梦境水世界游船** | `源码与工程/14_清单内全部Claude_Artifact与Vercel源码补全/` | ✅ 完整提取 **34 个原生 ES Modules 源码**（含水粉着色器 `gouache.js`） | ✅ 含 `src/realms/` 8 大世界源码 |
| **15** | **清单内其余 GitHub 开源项目全量补齐** | `源码与工程/15_清单内其余GitHub与Patch开源仓库全量补齐/` | ✅ 含 `op7418_guizang-game-skill`（归藏《雾锁山门》3D动作游戏+Skill）、`loktar00_lanternfall`、`finderchangchang_cloud-stunt-3d`（云上叠罗汉 3 版本）、`loktar00_pine-hollow`、`xianxie6_animals-planner-2027`、`tetriss22_pc-build-lab` | ✅ 归藏仓库内含完整 3D 游戏生成 `SKILL.md` 提示词工程 |
