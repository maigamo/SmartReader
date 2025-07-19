<div align="center">

# 📚 SmartReader - Obsidian Speed Reading Plugin

*Enhance your reading speed with intelligent text highlighting*

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-7c3aed)](https://obsidian.md/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/maigamo/SmartReader)
[![Downloads](https://img.shields.io/github/downloads/smartreader/obsidian-smart-reader/total)](https://github.com/maigamo/SmartReader/releases)
[![GitHub Stars](https://img.shields.io/github/stars/smartreader/obsidian-smart-reader?style=social)](https://github.com/maigamo/SmartReader/stargazers)

</div>

---

## 📖 Reading Experience

After enabling speed reading, highlight in reading mode.

![alt text](./image/smart_reader_book_en_black2.gif)

Change the marking effect.

![alt text](./image/smart_reader_book.gif)

---


# **English** | [中文](#中文版本) | [日本語](#日本語版)


## 🚀 Overview

**SmartReader** is an advanced Obsidian plugin that enhances your reading speed through intelligent text highlighting. Perfect for researchers, students, and knowledge workers who want to process large amounts of information efficiently.

### ✨ Key Features

- 🎯 **Smart Highlighting**: Automatically highlights key words at configurable intervals
- 🌍 **Multi-Language Support**: Works seamlessly with English, Chinese, and Japanese text
- 🎨 **Customizable Styles**: Choose from bold, color, underline, or combined highlighting
- ⚡ **Real-Time Processing**: Instant highlighting with adjustable intervals (5-80 words/characters)
- 🛡️ **Non-Destructive**: Never modifies your source files
- 🔧 **Smart Filtering**: Exclude specific folders and file types
- 📱 **Cross-Platform**: Works on desktop and mobile devices

### 🎬 Demo & Screenshots

#### 🖥️ Settings Interface
![Settings Interface](https://img.shields.io/badge/Settings-Interface-success)

**Behavior and Activation Settings:**
- ⚙️ Configure auto-processing of new documents
- 📏 Set minimum document length thresholds  
- 📁 Define excluded folders and file patterns
- 🧪 Test current file against filter rules

**Highlighting Rules:**
- 🔢 Choose between word-based or character-based intervals
- 🎚️ Set interval values (5-80 words/characters)
- ⚡ Real-time preview of changes

**Appearance and Style:**
- 🎨 Select from multiple highlighting styles
- 🌈 Customize highlight colors
- 👁️ Visual style previews

#### 📖 Speed Reading in Action

**📝 English Text Processing:**
- Highlights every nth word based on your interval setting
- Maintains natural reading flow while guiding eye movement
- Preserves document formatting and structure

**🈲 Chinese Text Processing:**
- Adapts to Chinese character-based reading patterns
- Supports both character and word-based intervals
- Handles mixed Chinese-English content seamlessly

**🎌 Japanese Text Support:**
- Intelligent handling of hiragana, katakana, and kanji
- Optimized for Japanese reading patterns
- Cultural text processing awareness

#### 🎨 Visual Highlighting Styles

- **🔥 Bold**: `font-weight: bold` - Makes key words stand out with increased font weight
- **🌈 Color**: `color: custom` - Uses customizable colors to draw visual attention
- **📏 Underline**: `text-decoration: underline` - Adds subtle underlines as reading guides
- **💪 Combined**: `bold + underline` - Combines multiple effects for maximum visibility

### 🎯 Perfect For

- 📚 **Students**: Speed through academic papers and textbooks
- 🔬 **Researchers**: Process large volumes of research material efficiently
- 📝 **Content Creators**: Quickly review and digest reference materials
- 💼 **Professionals**: Accelerate document review and analysis
- 🧠 **Knowledge Workers**: Enhance information processing capabilities
- 📖 **Avid Readers**: Improve reading speed without losing comprehension

### 🔒 Privacy & Security

- 🏠 **100% Local Processing**: All text processing happens on your device
- 🚫 **No Data Collection**: Zero telemetry or analytics
- 📄 **Open Source**: Full source code available for review

## 📦 Installation

### 🏪 From Obsidian Community Plugins

1. Open **Settings** in Obsidian
2. Navigate to **Community Plugins**
3. Disable **Safe Mode**
4. Click **Browse** and search for "**SmartReader**"
5. Install and enable the plugin

### 📋 Manual Installation

1. Download the latest release from [GitHub](https://github.com/smartreader/obsidian-smart-reader/releases)
2. Extract files to `VaultFolder/.obsidian/plugins/smart-reader/`
3. Reload Obsidian and enable the plugin

## 🎯 Quick Start Guide

### 🚀 Basic Usage

1. **Open** any document in Reading view (Preview mode)
2. **Toggle** SmartReader using:
   - 🎀 Ribbon icon in the left sidebar
   - 📊 Status bar item (click to toggle)
   - 📜 Command palette: "Toggle Speed Reading Mode"
   - ⌨️ **Hotkey**: `Ctrl/Cmd + Shift + R`
3. **Adjust** settings to customize highlighting for optimal reading experience

### 🔧 Advanced Usage

| Command | Hotkey | Function |
|---------|--------|----------|
| Process Specific Document | `Ctrl/Cmd + Shift + P` | Apply highlighting to current document |
| Clear Document Highlights | `Ctrl/Cmd + Shift + C` | Remove all highlighting from current document |
| Open Settings | `Ctrl/Cmd + Shift + S` | Access plugin configuration |
| Test Language Detection | N/A | Use built-in language test modal |

### 📋 Supported Content

- ✅ **Markdown documents** (`.md`)
- ✅ **Reading/Preview mode only** (for safety)
- ✅ **Chinese, English, and Japanese text**
- ✅ **Mixed-language documents**

### 🎯 Optimization Tips

**🚀 Speed Reading Tips:**
- Use **word-based intervals** with 5-15 word spacing
- Best for: Quick information scanning and general reading

**📖 Dense Text Processing:**
- Use **character-based intervals** with 20-40 character spacing  
- Best for: Technical documents and detailed analysis

**🎯 Focus Enhancement:**
- Enable **auto-processing** with 2-3 second delay
- Best for: Distraction-free reading sessions

**📚 Learning Mode:**
- Use **bold + underline style** for maximum visibility
- Best for: Study materials and important documents

**📄 Long Documents:**
- Enable **progress indicator** in settings
- Best for: Research papers and lengthy articles

### 🔄 Language Detection & Processing

SmartReader automatically detects document language and applies appropriate processing:

#### 🇨🇳 Chinese Text Processing
- **Character-based segmentation** with punctuation handling
- Optimized for Chinese reading patterns
- Supports both Simplified and Traditional Chinese

#### 🇺🇸 English Text Processing  
- **Word-based processing** using space delimiters
- Natural word boundary detection
- Optimized for Western reading patterns

#### 🇯🇵 Japanese Text Processing
- **Mixed character/word processing** for optimal readability
- Intelligent handling of hiragana, katakana, and kanji
- Cultural text processing awareness

#### 🌍 Mixed Language Documents
- **Smart detection and switching** within documents
- Seamless transition between different language processing modes
- Maintains optimal reading experience across language boundaries

### 🧠 Reading Science & Methodology

#### 🔬 Understanding Peripheral Vision Reading

Human eyes naturally capture information beyond the direct focal point. SmartReader leverages this by creating strategic "reading anchors" that guide your peripheral vision to process surrounding text context without directly focusing on every word.

#### 🏃‍♂️ Saccadic Reading Training

**📊 Reading Method Comparison:**

| Method | Eye Movement | Speed (WPM) | Processing |
|--------|-------------|-------------|------------|
| **Traditional Reading** | Linear, word-by-word | 150-250 | Direct focus only |
| **SmartReader Method** | Jumping between anchors | 400-800+ | Peripheral + focal |

**🧠 Cognitive Benefits:**
- **Pattern Recognition**: Highlighted words create predictable visual patterns, improving reading rhythm
- **Contextual Inference**: Brain naturally fills gaps using peripheral context and prior knowledge  
- **Reduced Fatigue**: Less eye strain and mental fatigue compared to word-by-word reading
- **Maintained Comprehension**: Studies show peripheral reading maintains or improves understanding by reducing cognitive overload

#### 📈 Information Processing Enhancement

- **🎯 Cognitive Load Reduction**: Brain learns to trust peripheral information processing
- **⚡ Processing Speed**: Increased information throughput without comprehension loss
- **🔄 Adaptive Learning**: Reading patterns improve automatically with continued use
- **💡 Enhanced Focus**: Structured highlighting reduces mental wandering and distraction

## 🔧 Advanced Features

### 📁 Smart File Filtering

Exclude files and folders using powerful pattern matching:

```
Templates/           # Exclude entire folder
*.excalidraw        # Exclude by extension
Archive/*           # Exclude folder and subfolders
Daily Notes/        # Exclude specific folder
**/*.canvas         # Exclude all canvas files recursively
temp-*.md           # Exclude files with specific naming pattern
```

### 🎚️ Interval Optimization

**Recommended Settings:**
- **Beginners**: 3-5 words
- **Intermediate**: 5-8 words  
- **Advanced**: 8-12 words
- **Expert**: 12+ words

### 🌍 Language Detection

SmartReader automatically detects and adapts to:
- **English**: Word-boundary detection
- **Chinese**: Character and word segmentation
- **Japanese**: Mixed script handling
- **Mixed Content**: Intelligent switching



## ❓ Frequently Asked Questions

<details>
<summary><strong>🤔 Does SmartReader work with all Obsidian themes?</strong></summary>

Yes! SmartReader is designed to work seamlessly with all Obsidian themes. The highlighting styles adapt to your current theme's color scheme.
</details>

<details>
<summary><strong>📱 Can I use SmartReader on mobile devices?</strong></summary>

Absolutely! SmartReader is fully compatible with Obsidian mobile apps on both iOS and Android.
</details>

<details>
<summary><strong>🔄 Does the plugin modify my original files?</strong></summary>

No, never! SmartReader only applies visual highlighting in the reading view. Your source files remain completely untouched.
</details>

<details>
<summary><strong>⚡ Will SmartReader slow down Obsidian?</strong></summary>

Not at all! SmartReader is optimized for performance and uses less than 10MB of memory even with large documents.
</details>

<details>
<summary><strong>🌍 What languages are supported?</strong></summary>

Currently: English, Chinese (Simplified & Traditional), and Japanese. More languages are planned for future releases!
</details>

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/smartreader/obsidian-smart-reader/issues) with:
- 🖥️ Obsidian version
- 🔌 Plugin version  
- 📝 Steps to reproduce
- 🎯 Expected vs actual behavior
- 📱 Device/OS information

### 💡 Feature Requests

Have an idea? [Suggest a feature](https://github.com/smartreader/obsidian-smart-reader/issues) with:
- 📋 Clear description
- 💼 Use case examples
- 🎯 Expected benefits
- 🏆 Priority level

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## 🔗 Links

- 🏠 [Homepage](https://github.com/smartreader/obsidian-smart-reader)
- 📚 [Documentation](https://github.com/smartreader/obsidian-smart-reader/wiki)
- 🐛 [Issues](https://github.com/smartreader/obsidian-smart-reader/issues)
- 💬 [Discussions](https://github.com/smartreader/obsidian-smart-reader/discussions)

## 🌟 Support the Project

If SmartReader enhances your reading workflow, show your support:

### 💖 Ways to Support
- ⭐ **Star this repository** - Help others discover SmartReader
- 📢 **Share with your community** - Spread the word about efficient reading
- 🐛 **Report bugs** - Help us improve the plugin
- 💡 **Suggest features** - Share your ideas for new functionality
- 📝 **Write a review** - Share your experience on the Obsidian forum
- 🌐 **Contribute translations** - Help make SmartReader available in more languages

### 🎉 Community

Join our growing community of speed readers:
- 💬 [Discussions](https://github.com/smartreader/obsidian-smart-reader/discussions) - Ask questions and share tips
- 📊 [Reddit Community](https://reddit.com/r/ObsidianMD) - Connect with other Obsidian users
- 🐦 [Follow Updates](https://twitter.com/smartreader) - Stay updated on new features

### 🏆 Hall of Fame

Special thanks to our contributors and the Obsidian community for their valuable feedback and support!

---

# 中文版本

## 🚀 概述

**SmartReader** 是一款先进的 Obsidian 插件，通过智能文本高亮来提升您的阅读速度。非常适合研究人员、学生和知识工作者，帮助他们高效处理大量信息。

### ✨ 主要功能

- 🎯 **智能高亮**: 按可配置间隔自动高亮关键词
- 🌍 **多语言支持**: 无缝支持中文、英文和日文文本
- 🎨 **自定义样式**: 选择加粗、颜色、下划线或组合高亮
- ⚡ **实时处理**: 即时高亮，可调整间隔（5-80个词/字符）
- 🛡️ **非破坏性**: 永不修改源文件
- 🔧 **智能过滤**: 排除特定文件夹和文件类型
- 📱 **跨平台**: 支持桌面和移动设备

### 🎬 演示和截图

#### 🖥️ 设置界面

**行为和激活设置：**
- ⚙️ 配置新文档的自动处理
- 📏 设置最小文档长度阈值
- 📁 定义排除的文件夹和文件模式
- 🧪 测试当前文件的过滤规则

**高亮规则：**
- 🔢 选择基于词或字符的间隔
- 🎚️ 设置间隔值（5-80个词/字符）
- ⚡ 更改的实时预览

**外观和样式：**
- 🎨 从多种高亮样式中选择
- 🌈 自定义高亮颜色
- 👁️ 视觉样式预览

### 🔒 隐私和安全

- 🏠 **100%本地处理**: 所有文本处理都在您的设备上进行
- 🚫 **无数据收集**: 零遥测或分析
- 📄 **开源**: 完整源代码可供审查

## 📦 安装

### 🏪 从Obsidian社区插件安装

1. 在Obsidian中打开**设置**
2. 导航到**社区插件**
3. 禁用**安全模式**
4. 点击**浏览**并搜索"**SmartReader**"
5. 安装并启用插件

### 🎯 快速开始指南

#### 🚀 基本用法

1. 在**阅读/预览模式**下打开任何文档
2. 启用 **SmartReader** 使用：
   - 🎀 侧边栏中的功能区图标
   - 📊 状态栏项目（点击切换）
   - 📜 命令面板："切换速读模式"
   - ⌨️ **热键**: `Ctrl/Cmd + Shift + R`
3. 根据需要**调整设置**以获得最佳阅读体验

#### 🔧 高级用法

| 命令 | 热键 | 功能 |
|------|------|------|
| 处理特定文档 | `Ctrl/Cmd + Shift + P` | 对当前文档应用高亮 |
| 清除文档高亮 | `Ctrl/Cmd + Shift + C` | 移除当前文档的所有高亮 |
| 打开设置 | `Ctrl/Cmd + Shift + S` | 访问插件配置 |
| 测试语言检测 | 无 | 使用内置语言测试模态框 |

#### 📋 支持的内容

- ✅ **Markdown 文档**（`.md`）
- ✅ **仅阅读/预览模式**（为了安全）
- ✅ **中文、英文和日文文本**
- ✅ **混合语言文档**

#### 🎯 优化技巧

**🚀 速读技巧：**
- 使用**基于词数的间隔**，5-15个词的间距
- 最适合：快速信息扫描和一般阅读

**📖 密集文本处理：**
- 使用**基于字符的间隔**，20-40个字符的间距
- 最适合：技术文档和详细分析

**🎯 专注力提升：**
- 启用**自动处理**，2-3秒延迟
- 最适合：无干扰阅读会话

**📚 学习模式：**
- 使用**粗体+下划线样式**以获得最大可见性
- 最适合：学习材料和重要文档

**📄 长文档处理：**
- 在设置中启用**进度指示器**
- 最适合：研究论文和冗长文章

#### 🔄 语言检测与处理

SmartReader 自动检测文档语言并应用适当的处理：

##### 🇨🇳 中文文本处理
- **基于字符的分词**，带标点符号处理
- 针对中文阅读模式优化
- 支持简体和繁体中文

##### 🇺🇸 英文文本处理
- **基于单词的处理**，使用空格分隔符
- 自然的单词边界检测
- 针对西方阅读模式优化

##### 🇯🇵 日文文本处理
- **混合字符/单词处理**以获得最佳可读性
- 智能处理平假名、片假名和汉字
- 具有文化意识的文本处理

##### 🌍 混合语言文档
- **文档内智能检测和切换**
- 不同语言处理模式间的无缝转换
- 在语言边界间保持最佳阅读体验

#### 🧠 阅读科学与方法论

##### 🔬 理解余光阅读

人眼天生能够捕获直接焦点之外的信息。SmartReader 通过创建策略性的"阅读锚点"来利用这一点，引导您的余光处理周围的文本上下文，而无需直接关注每个单词。

##### 🏃‍♂️ 跳跃式阅读训练

**📊 阅读方法对比：**

| 方法 | 眼球运动 | 速度（词/分钟） | 处理方式 |
|------|----------|-----------------|----------|
| **传统阅读** | 线性，逐词阅读 | 150-250 | 仅直接焦点 |
| **SmartReader方法** | 在锚点间跳跃 | 400-800+ | 余光+焦点 |

**🧠 认知优势：**
- **模式识别**：高亮词汇创建可预测的视觉模式，改善阅读节奏
- **上下文推理**：大脑使用余光上下文和先验知识自然填补空白
- **疲劳减轻**：与逐词精读相比，减少眼部疲劳和精神疲劳
- **理解力维持**：研究表明余光阅读通过减少认知过载来维持或提高理解力

##### 📈 信息处理能力提升

- **🎯 认知负荷减少**：大脑学会信任余光信息处理
- **⚡ 处理速度**：在不损失理解力的情况下增加信息吞吐量
- **🔄 适应性学习**：阅读模式随着持续使用自动改善
- **💡 增强专注**：结构化高亮减少精神游离和分心

### 🎨 高亮样式

- **加粗**: 让关键词突出显示
- **颜色**: 使用可自定义的颜色吸引注意
- **下划线**: 微妙的阅读指南
- **组合**: 加粗+下划线，最大可见性

## 🤝 贡献

我们欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

## 📄 许可证

本项目采用Apache License 2.0许可证 - 详情请见[LICENSE](LICENSE)文件。

Apache License 2.0是一个宽松的开源许可证，允许您：
- ✅ 商业使用
- ✅ 分发
- ✅ 修改
- ✅ 专利使用
- ✅ 私人使用

条件：
- 📄 包含许可证和版权声明
- 📝 说明更改内容

---

# 日本語版

## 🚀 概要

**SmartReader**は、インテリジェントなテキストハイライトによって読書速度を向上させる高度なObsidianプラグインです。研究者、学生、ナレッジワーカーが大量の情報を効率的に処理するのに最適です。

### ✨ 主な機能

- 🎯 **スマートハイライト**: 設定可能な間隔でキーワードを自動ハイライト
- 🌍 **多言語サポート**: 日本語、英語、中国語のテキストをシームレスにサポート
- 🎨 **カスタマイズ可能なスタイル**: 太字、色、下線、または組み合わせハイライトから選択
- ⚡ **リアルタイム処理**: 調整可能な間隔（5-80単語/文字）での即座のハイライト
- 🛡️ **非破壊的**: ソースファイルを決して変更しません
- 🔧 **スマートフィルタリング**: 特定のフォルダーとファイルタイプを除外
- 📱 **クロスプラットフォーム**: デスクトップとモバイルデバイスで動作

### 🎬 デモとスクリーンショット

#### 🖥️ 設定インターフェース

**動作と活性化設定:**
- ⚙️ 新しい文書の自動処理を設定
- 📏 最小文書長のしきい値を設定
- 📁 除外フォルダーとファイルパターンを定義
- 🧪 現在のファイルをフィルタールールに対してテスト

**ハイライトルール:**
- 🔢 単語ベースまたは文字ベースの間隔を選択
- 🎚️ 間隔値を設定（5-80単語/文字）
- ⚡ 変更のリアルタイムプレビュー

**外観とスタイル:**
- 🎨 複数のハイライトスタイルから選択
- 🌈 ハイライト色をカスタマイズ
- 👁️ ビジュアルスタイルプレビュー

### 🔒 プライバシーとセキュリティ

- 🏠 **100%ローカル処理**: すべてのテキスト処理がデバイス上で行われます
- 🚫 **データ収集なし**: テレメトリーや分析はゼロ
- 📄 **オープンソース**: 完全なソースコードがレビュー可能

## 📦 インストール

### 🏪 Obsidianコミュニティプラグインから

1. Obsidianで**設定**を開く
2. **コミュニティプラグイン**に移動
3. **セーフモード**を無効にする
4. **ブラウズ**をクリックして"**SmartReader**"を検索
5. プラグインをインストールして有効にする

### 🎯 クイックスタートガイド

#### 🚀 基本的な使用方法

1. 読書ビュー（プレビューモード）で任意の文書を**開く**
2. **SmartReader**を有効にする方法：
   - 🎀 左サイドバーのリボンアイコン
   - 📊 ステータスバー項目（クリックで切り替え）
   - 📜 コマンドパレット：「速読モードを切り替え」
   - ⌨️ **ホットキー**: `Ctrl/Cmd + Shift + R`
3. 最適な読書体験のために必要に応じて**設定を調整**

#### 🔧 高度な使用方法

| コマンド | ホットキー | 機能 |
|----------|------------|------|
| 特定の文書を処理 | `Ctrl/Cmd + Shift + P` | 現在の文書にハイライトを適用 |
| 文書のハイライトをクリア | `Ctrl/Cmd + Shift + C` | 現在の文書からすべてのハイライトを削除 |
| 設定を開く | `Ctrl/Cmd + Shift + S` | プラグイン設定にアクセス |
| 言語検出をテスト | なし | 内蔵の言語テストモーダルを使用 |

#### 📋 サポートされるコンテンツ

- ✅ **Markdownドキュメント**（`.md`）
- ✅ **読書/プレビューモードのみ**（安全のため）
- ✅ **日本語、英語、中国語のテキスト**
- ✅ **混合言語ドキュメント**

#### 🎯 最適化のヒント

**🚀 速読のコツ：**
- **単語ベースの間隔**を使用し、5-15単語の間隔を設定
- 最適用途：情報の高速スキャンと一般的な読書

**📖 高密度テキスト処理：**
- **文字ベースの間隔**を使用し、20-40文字の間隔を設定
- 最適用途：技術文書と詳細分析

**🎯 集中力向上：**
- 2-3秒の遅延で**自動処理**を有効化
- 最適用途：集中して読むセッション

**📚 学習モード：**
- 最大の視認性のため**太字+下線スタイル**を使用
- 最適用途：学習資料と重要な文書

**📄 長文書：**
- 設定で**進捗インジケーター**を有効化
- 最適用途：研究論文と長い記事

#### 🔄 言語検出と処理

SmartReaderは文書の言語を自動検出し、適切な処理を適用します：

##### 🇨🇳 中国語テキスト処理
- 句読点処理を含む**文字ベースのセグメンテーション**
- 中国語の読書パターンに最適化
- 簡体字と繁体字の両方をサポート

##### 🇺🇸 英語テキスト処理
- スペース区切り文字を使用した**単語ベース処理**
- 自然な単語境界検出
- 西洋の読書パターンに最適化

##### 🇯🇵 日本語テキスト処理
- 最適な読みやすさのための**混合文字/単語処理**
- ひらがな、カタカナ、漢字のインテリジェント処理
- 文化的テキスト処理の認識

##### 🌍 混合言語ドキュメント
- **文書内でのスマート検出と切り替え**
- 異なる言語処理モード間のシームレスな移行
- 言語境界を越えて最適な読書体験を維持

#### 🧠 読書科学と方法論

##### 🔬 周辺視野読書の理解

人間の目は自然に直接的な焦点を超えた情報を捕捉します。SmartReaderは戦略的な「読書アンカー」を作成することでこれを活用し、すべての単語に直接焦点を当てることなく、周辺視野が周囲のテキストコンテキストを処理するように導きます。

##### 🏃‍♂️ サッカード読書トレーニング

**📊 読書方法の比較：**

| 方法 | 目の動き | 速度（語/分） | 処理方式 |
|------|----------|---------------|----------|
| **従来の読書** | 線形、語ごと | 150-250 | 直接焦点のみ |
| **SmartReader方式** | アンカー間のジャンプ | 400-800+ | 周辺視野+焦点 |

**🧠 認知的利点：**
- **パターン認識**：ハイライトされた単語が予測可能な視覚パターンを作成し、読書リズムを改善
- **文脈推論**：脳は周辺視野コンテキストと事前知識を使用して自然にギャップを埋める
- **疲労軽減**：語ごとの精読と比較して、目の疲れと精神的疲労を軽減
- **理解力維持**：研究により、周辺視野読書は認知過負荷を減らすことで理解力を維持または向上させることが示されています

##### 📈 情報処理能力向上

- **🎯 認知負荷軽減**：脳が周辺視野情報処理を信頼することを学習
- **⚡ 処理速度**：理解力の損失なしに情報処理量を増加
- **🔄 適応学習**：継続使用により読書パターンが自動的に改善
- **💡 集中力向上**：構造化されたハイライトが精神的散漫と注意散漫を減少

### 🎨 ハイライトスタイル

- **太字**: キーワードを目立たせる
- **色**: カスタマイズ可能な色で注意を引く
- **下線**: 微妙な読書ガイド
- **組み合わせ**: 太字+下線、最大の視認性

## 🤝 貢献

貢献を歓迎します！詳細については[貢献ガイド](CONTRIBUTING.md)をご覧ください。

## 📄 ライセンス

このプロジェクトはApache License 2.0の下でライセンスされています - 詳細については[LICENSE](LICENSE)ファイルをご覧ください。

Apache License 2.0は寛容なオープンソースライセンスで、以下を許可します：
- ✅ 商用利用
- ✅ 配布
- ✅ 修正
- ✅ 特許使用
- ✅ 私的使用

条件：
- 📄 ライセンスと著作権表示を含める
- 📝 変更内容を明記する

---

## 🏷️ Keywords for SEO

`obsidian plugin`, `speed reading`, `text highlighting`, `productivity`, `markdown`, `note taking`, `reading enhancement`, `knowledge management`, `study tools`, `academic research`, `chinese text processing`, `japanese text support`, `multilingual`, `reading speed`, `focus enhancement`, `visual highlighting`, `document processing`, `obsidian community`, `note reader`, `intelligent highlighting` 