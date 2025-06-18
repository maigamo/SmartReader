# 📖 SmartReader - Obsidian Speed Reading Plugin

🇺🇸 English | 🇨🇳 中文 | 🇯🇵 日本語

#### Train your eyes for peripheral reading and dramatically boost information processing capabilities

![SmartReader Demo](https://img.shields.io/badge/Obsidian-Plugin-8b5cf6?style=for-the-badge&logo=obsidian&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

---

## English

### ✨ Introduction

**SmartReader** is a revolutionary Obsidian plugin that transforms the way you read by leveraging the power of peripheral vision and jump-reading techniques. Unlike traditional line-by-line reading, SmartReader trains your brain to process information through strategic highlighting patterns, allowing your peripheral vision to capture surrounding context while your focus moves efficiently across key anchor points.

**The Science Behind SmartReader**: Research shows that proficient readers don't need to read every single word - your peripheral vision naturally captures surrounding information while your eyes jump between key focal points. SmartReader harnesses this natural ability by highlighting strategic words that serve as "reading anchors," dramatically improving your information processing speed and comprehension.

Perfect for **speed reading**, **document review**, **research**, and **study sessions** in Obsidian. Build the habit of jump-reading and develop the ability to process large amounts of information in short periods.

### 🚀 Key Features

* 🎯 **Smart Highlighting**: Intelligently highlights words at customizable intervals (5-80 words/characters)
* 🌐 **Multi-language Support**: Supports Chinese, English, Japanese with automatic language detection
* 🎨 **Customizable Styles**: Choose from Bold, Color, Underline, or Bold+Underline highlighting
* 📱 **Cross-Platform**: Works seamlessly on desktop and mobile Obsidian
* 🔒 **Privacy-First**: All processing happens locally - your data never leaves your device
* ⚡ **Non-Destructive**: Never modifies your original files, only visual presentation
* 🎛️ **Flexible Configuration**: Extensive settings for personalized reading experience
* 📊 **Real-time Processing**: Instant highlighting updates as you navigate documents

### 🔧 Advanced Features

* **Automatic Processing**: Auto-highlight new documents when opened
* **Exclude Patterns**: Skip specific folders or file types
* **Manual Language Override**: Force specific language processing when needed
* **Progress Indicators**: Visual feedback for large document processing
* **Hotkey Support**: Quick toggle with customizable keyboard shortcuts
* **Status Bar Integration**: One-click enable/disable from status bar

### 📥 Installation

#### From Obsidian Community Plugins
1. Open Obsidian and go to **Settings** → **Community Plugins**
2. Click **Browse** and search for **"SmartReader"**
3. Click **Install**, then **Enable** the plugin
4. Configure your preferences in the SmartReader settings

#### Manual Installation
1. Download the latest release from GitHub
2. Extract files to your vault's `.obsidian/plugins/smart-reader/` directory
3. Enable the plugin in Community Plugins settings

### ⚙️ Configuration

Access plugin settings through **Settings** → **SmartReader** or use the command palette.

#### Behavior & Activation
- **Auto-process new documents**: Automatically highlight when opening notes
- **Auto mode delay**: Delay before processing (1-30 seconds)
- **Minimum length**: Skip documents shorter than specified length
- **Excluded paths**: Exclude specific folders or files using wildcards
- **Interface Language**: Choose from Auto, English, 中文, or 日本語

#### Highlighting Rules
- **Interval Type**: Word count or character count based highlighting
- **Interval Value**: Number of words/characters between highlights (5-80)

#### Appearance & Style
- **Highlight Style**: Bold, Color, Underline, or Bold+Underline
- **Highlight Color**: Custom color picker for color-based styles

### 📚 Usage

#### Basic Usage
1. **Open any document** in Reading/Preview mode
2. **Enable SmartReader** using:
   - Ribbon icon in the sidebar
   - Status bar item (click to toggle)
   - Command palette: "Toggle speed reading mode"
   - Hotkey: `Ctrl/Cmd + Shift + R`
3. **Adjust settings** as needed for optimal reading experience

#### Advanced Usage
- **Process specific document**: `Ctrl/Cmd + Shift + P`
- **Clear document highlighting**: `Ctrl/Cmd + Shift + C`
- **Open settings**: `Ctrl/Cmd + Shift + S`
- **Test language detection**: Use the built-in language test modal

#### Supported Content
- Markdown documents (.md)
- Reading/Preview mode only (for safety)
- Chinese, English, and Japanese text
- Mixed-language documents

### 🎯 Optimization Tips

1. **For Speed Reading**: Use word-based intervals with 5-15 word gaps
2. **For Dense Text**: Use character-based intervals with 20-40 character gaps
3. **For Focus**: Enable auto-processing with 2-3 second delay
4. **For Study**: Use Bold+Underline style for maximum visibility
5. **For Long Documents**: Enable progress indicators in settings

### 🔄 Language Detection

SmartReader automatically detects document language and applies appropriate processing:

- **Chinese**: Character-based segmentation with punctuation handling
- **English**: Word-based processing with space-delimited tokens
- **Japanese**: Mixed character/word processing for optimal readability
- **Mixed Languages**: Intelligent detection and switching within documents

### 🧠 Reading Science & Methodology

**Understanding Peripheral Vision Reading**: 
Human eyes naturally capture information beyond their direct focus point. SmartReader leverages this by creating strategic "reading anchors" that guide your peripheral vision to process surrounding text context without requiring direct focus on every word.

**Jump-Reading Training**:
- **Traditional Reading**: Eyes move linearly word-by-word (150-250 WPM average)
- **SmartReader Method**: Eyes jump between highlighted anchor points while peripheral vision processes gaps (400-800+ WPM potential)
- **Cognitive Load**: Reduced mental effort as your brain learns to trust peripheral information processing

**Information Processing Enhancement**:
- **Pattern Recognition**: Highlighted words create predictable visual patterns that improve reading rhythm
- **Context Inference**: Your brain naturally fills gaps using peripheral context and prior knowledge
- **Fatigue Reduction**: Less eye strain and mental fatigue compared to intensive word-by-word reading
- **Comprehension Maintenance**: Studies show peripheral reading maintains or improves comprehension by reducing cognitive overload

### 🛠️ Development & Contributing

This project is actively maintained and welcomes contributions!

#### Development Setup
```bash
# Clone the repository
git clone https://github.com/maigamo/SmartReader.git


# Install dependencies
npm install

# Build the plugin
npm run build

# Development mode with hot reload
npm run dev
```

#### Contributing Guidelines
- 🐛 **Bug Reports**: Use GitHub Issues with detailed reproduction steps
- 💡 **Feature Requests**: Describe your use case and expected behavior
- 🔧 **Pull Requests**: Include tests and update documentation
- 📚 **Documentation**: Help improve setup guides and usage examples

### 📄 License

MIT License - see [LICENSE](LICENSE) for details.

### 🙏 Acknowledgments

- Obsidian community for inspiration and feedback
- Contributors and beta testers
- Open source libraries and tools used in development

---

## 中文

### ✨ 简介

**SmartReader** 是一款革命性的 Obsidian 插件，通过利用余光阅读和跳跃式阅读技术来彻底改变您的阅读方式。与传统的逐行逐字阅读不同，SmartReader 通过策略性的高亮模式训练您的大脑处理信息，让您的余光捕获周围上下文，同时您的焦点在关键锚点之间高效移动。

**SmartReader 背后的科学原理**：研究表明，熟练的读者无需阅读每一个单词 - 您的余光会自然地捕获周围的信息，而您的眼睛在关键焦点之间跳跃。SmartReader 利用这种自然能力，通过高亮作为"阅读锚点"的策略性词汇，大幅提升您的信息处理速度和理解力。

SmartReader 会让您习惯跳跃式阅读，帮助您大幅度提升信息处理能力，让您形成短时间阅读大量信息的能力。非常适合在 Obsidian 中进行**速读**、**文档审阅**、**研究**和**学习**。

### 🚀 核心功能

* 🎯 **智能高亮**: 在可自定义间隔（5-80个词/字符）智能高亮单词
* 🌐 **多语言支持**: 支持中文、英文、日文，自动语言检测
* 🎨 **可定制样式**: 选择粗体、颜色、下划线或粗体+下划线高亮
* 📱 **跨平台**: 在桌面和移动端 Obsidian 上无缝工作
* 🔒 **隐私优先**: 所有处理都在本地进行 - 您的数据不会离开设备
* ⚡ **非破坏性**: 从不修改原始文件，只改变视觉呈现
* 🎛️ **灵活配置**: 丰富的设置选项，提供个性化阅读体验
* 📊 **实时处理**: 浏览文档时即时更新高亮

### 🔧 高级功能

* **自动处理**: 打开新文档时自动高亮
* **排除模式**: 跳过特定文件夹或文件类型
* **手动语言覆盖**: 需要时强制使用特定语言处理
* **进度指示器**: 大型文档处理的视觉反馈
* **热键支持**: 使用可自定义键盘快捷键快速切换
* **状态栏集成**: 从状态栏一键启用/禁用

### 📥 安装

#### 从 Obsidian 社区插件安装
1. 打开 Obsidian，转到 **设置** → **社区插件**
2. 点击 **浏览** 并搜索 **"SmartReader"**
3. 点击 **安装**，然后 **启用** 插件
4. 在 SmartReader 设置中配置您的偏好

#### 手动安装
1. 从 GitHub 下载最新版本
2. 将文件解压到您的仓库的 `.obsidian/plugins/smart-reader/` 目录
3. 在社区插件设置中启用插件

### ⚙️ 配置

通过 **设置** → **SmartReader** 或使用命令面板访问插件设置。

#### 行为与激活
- **自动处理新文档**: 打开笔记时自动高亮
- **自动模式延迟**: 处理前的延迟时间（1-30秒）
- **最小长度**: 跳过短于指定长度的文档
- **排除的路径**: 使用通配符排除特定文件夹或文件
- **界面语言**: 从自动、English、中文或日本語中选择

#### 高亮规则
- **间隔类型**: 基于词数或字符数的高亮
- **间隔值**: 高亮之间的词/字符数（5-80）

#### 外观样式
- **高亮样式**: 粗体、颜色、下划线或粗体+下划线
- **高亮颜色**: 基于颜色样式的自定义颜色选择器

### 📚 使用方法

#### 基本用法
1. **打开任何文档** 在阅读/预览模式下
2. **启用 SmartReader** 使用:
   - 侧边栏中的功能区图标
   - 状态栏项目（点击切换）
   - 命令面板："切换速读模式"
   - 热键：`Ctrl/Cmd + Shift + R`
3. **根据需要调整设置** 以获得最佳阅读体验

#### 高级用法
- **处理特定文档**: `Ctrl/Cmd + Shift + P`
- **清除文档高亮**: `Ctrl/Cmd + Shift + C`
- **打开设置**: `Ctrl/Cmd + Shift + S`
- **测试语言检测**: 使用内置语言测试模态框

#### 支持的内容
- Markdown 文档 (.md)
- 仅阅读/预览模式（为了安全）
- 中文、英文和日文文本
- 混合语言文档

### 🎯 优化技巧

1. **速读**: 使用基于词数的间隔，5-15个词的间距
2. **密集文本**: 使用基于字符的间隔，20-40个字符的间距
3. **专注**: 启用自动处理，2-3秒延迟
4. **学习**: 使用粗体+下划线样式以获得最大可见性
5. **长文档**: 在设置中启用进度指示器

### 🔄 语言检测

SmartReader 自动检测文档语言并应用适当的处理：

- **中文**: 基于字符的分词，带标点符号处理
- **英文**: 基于单词的处理，使用空格分隔符
- **日文**: 混合字符/单词处理，以获得最佳可读性
- **混合语言**: 文档内智能检测和切换

### 🧠 阅读科学与方法论

**理解余光阅读**：
人眼天生能够捕获直接焦点之外的信息。SmartReader 通过创建策略性的"阅读锚点"来利用这一点，引导您的余光处理周围的文本上下文，而无需直接关注每个单词。

**跳跃式阅读训练**：
- **传统阅读**: 眼睛逐词线性移动（平均150-250词/分钟）
- **SmartReader方法**: 眼睛在高亮锚点之间跳跃，余光处理间隙（潜力400-800+词/分钟）
- **认知负荷**: 大脑学会信任余光信息处理，减少心理负担

**信息处理能力提升**：
- **模式识别**: 高亮词汇创建可预测的视觉模式，改善阅读节奏
- **上下文推理**: 大脑使用余光上下文和先验知识自然填补空白
- **疲劳减轻**: 与逐词精读相比，减少眼部疲劳和精神疲劳
- **理解力维持**: 研究表明余光阅读通过减少认知过载来维持或提高理解力

### 📄 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE)。

---

## 日本語

### ✨ 紹介

**SmartReader** は、周辺視野とジャンプ読み技術の力を活用して読書方法を革新する、革命的なObsidianプラグインです。従来の行ごと、単語ごとの読書とは異なり、SmartReaderは戦略的なハイライトパターンを通じて情報を処理するように脳を訓練し、周辺視野が周囲の文脈を捉える間に、焦点が重要なアンカーポイント間を効率的に移動できるようにします。

**SmartReaderの背景にある科学**：研究によると、熟練した読者はすべての単語を読む必要がありません - 周辺視野は目が重要な焦点間をジャンプする間に周囲の情報を自然にキャプチャします。SmartReaderは、「読書アンカー」として機能する戦略的な単語をハイライトすることで、この自然な能力を活用し、情報処理速度と理解力を劇的に向上させます。

Obsidianでの**速読**、**文書レビュー**、**研究**、**学習セッション**に最適です。ジャンプ読みの習慣を身に着け、短時間で大量の情報を処理する能力を開発します。

### 🚀 主な機能

* 🎯 **スマートハイライト**: カスタマイズ可能な間隔（5-80語/文字）で単語をインテリジェントにハイライト
* 🌐 **多言語サポート**: 中国語、英語、日本語をサポート、自動言語検出
* 🎨 **カスタマイズ可能なスタイル**: 太字、色、下線、太字+下線のハイライトから選択
* 📱 **クロスプラットフォーム**: デスクトップとモバイルのObsidianでシームレスに動作
* 🔒 **プライバシー第一**: すべての処理がローカルで行われ、データがデバイスを離れることはありません
* ⚡ **非破壊的**: 元のファイルを変更せず、視覚的な表示のみを変更
* 🎛️ **柔軟な設定**: パーソナライズされた読書体験のための豊富な設定
* 📊 **リアルタイム処理**: 文書をナビゲートする際の即座のハイライト更新

### 🔧 高度な機能

* **自動処理**: 新しい文書を開いたときに自動でハイライト
* **除外パターン**: 特定のフォルダやファイルタイプをスキップ
* **手動言語オーバーライド**: 必要時に特定の言語処理を強制
* **進行状況インジケーター**: 大きな文書処理の視覚的フィードバック
* **ホットキーサポート**: カスタマイズ可能なキーボードショートカットで素早く切り替え
* **ステータスバー統合**: ステータスバーからワンクリックで有効/無効化

### 📥 インストール

#### Obsidianコミュニティプラグインから
1. Obsidianを開き、**設定** → **コミュニティプラグイン** に移動
2. **ブラウズ** をクリックして **"SmartReader"** を検索
3. **インストール** をクリックし、プラグインを **有効化**
4. SmartReader設定で好みを設定

#### 手動インストール
1. GitHubから最新リリースをダウンロード
2. ファイルをVaultの `.obsidian/plugins/smart-reader/` ディレクトリに解凍
3. コミュニティプラグイン設定でプラグインを有効化

### ⚙️ 設定

**設定** → **SmartReader** またはコマンドパレットからプラグイン設定にアクセスします。

#### 動作と活性化
- **新しい文書を自動処理**: ノートを開く際に自動でハイライト
- **自動モード遅延**: 処理前の遅延（1-30秒）
- **最小長さ**: 指定した長さより短い文書をスキップ
- **除外パス**: ワイルドカードを使用して特定のフォルダやファイルを除外
- **インターフェース言語**: 自動、English、中文、日本語から選択

#### ハイライトルール
- **間隔タイプ**: 単語数または文字数ベースのハイライト
- **間隔値**: ハイライト間の単語/文字数（5-80）

#### 外観とスタイル
- **ハイライトスタイル**: 太字、色、下線、太字+下線
- **ハイライト色**: 色ベースのスタイル用のカスタムカラーピッカー

### 📚 使用方法

#### 基本的な使用法
1. **任意の文書を開く** 読書/プレビューモードで
2. **SmartReaderを有効化** 以下を使用:
   - サイドバーのリボンアイコン
   - ステータスバー項目（クリックで切り替え）
   - コマンドパレット："速読モードの切り替え"
   - ホットキー：`Ctrl/Cmd + Shift + R`
3. **必要に応じて設定を調整** 最適な読書体験のために

#### 高度な使用法
- **特定の文書を処理**: `Ctrl/Cmd + Shift + P`
- **文書のハイライトをクリア**: `Ctrl/Cmd + Shift + C`
- **設定を開く**: `Ctrl/Cmd + Shift + S`
- **言語検出をテスト**: 内蔵の言語テストモーダルを使用

#### サポートされるコンテンツ
- Markdown文書（.md）
- 読書/プレビューモードのみ（安全のため）
- 中国語、英語、日本語のテキスト
- 混合言語文書

### 🎯 最適化のヒント

1. **速読用**: 5-15語の間隔で単語ベースの間隔を使用
2. **密集したテキスト用**: 20-40文字の間隔で文字ベースの間隔を使用
3. **集中用**: 2-3秒の遅延で自動処理を有効化
4. **学習用**: 最大の視認性のために太字+下線スタイルを使用
5. **長い文書用**: 設定で進行状況インジケーターを有効化

### 🔄 言語検出

SmartReaderは文書の言語を自動検出し、適切な処理を適用します：

- **中国語**: 句読点処理を含む文字ベースのセグメンテーション
- **英語**: スペース区切りトークンを使用した単語ベース処理
- **日本語**: 最適な読みやすさのための混合文字/単語処理
- **混合言語**: 文書内でのインテリジェントな検出と切り替え

### 🧠 読書科学と方法論

**周辺視野読書の理解**：
人間の目は自然に直接の焦点を超えた情報を捉えます。SmartReaderは戦略的な「読書アンカー」を作成することでこれを活用し、周辺視野がすべての単語に直接焦点を合わせることなく周囲のテキストコンテキストを処理できるよう導きます。

**ジャンプ読みトレーニング**：
- **従来の読書**: 目が単語ごとに線形移動（平均150-250語/分）
- **SmartReader方式**: 目がハイライトされたアンカーポイント間をジャンプし、周辺視野がギャップを処理（400-800+語/分の潜在能力）
- **認知負荷**: 脳が周辺情報処理を信頼することを学び、精神的負担を軽減

**情報処理能力の向上**：
- **パターン認識**: ハイライトされた単語が予測可能な視覚パターンを作成し、読書リズムを改善
- **文脈推論**: 脳が周辺文脈と事前知識を使用して自然にギャップを埋める
- **疲労軽減**: 集中的な単語ごとの読書と比較して、目の疲れと精神的疲労が少ない
- **理解力維持**: 研究により、周辺読書は認知過負荷を減らすことで理解力を維持または向上させることが示されている

### 📄 ライセンス

MIT ライセンス - 詳細は [LICENSE](LICENSE) をご覧ください。

---

## 🔗 Links & Resources

* **GitHub Repository**: [SmartReader](https://github.com/maigamo/SmartReader)
* **Obsidian Community**: [Plugin Page](https://obsidian.md/plugins?id=smart-reader)
* **Documentation**: [Wiki](https://github.com/maigamo/SmartReader/wiki)
* **Bug Reports**: [Issues](https://github.com/maigamo/SmartReader/issues)
* **Feature Requests**: [Discussions](https://github.com/maigamo/SmartReader/discussions)

## 📊 Keywords & SEO

**Speed Reading** | **Obsidian Plugin** | **Text Highlighting** | **Reading Enhancement** | **Document Processing** | **Multi-language** | **Productivity** | **Study Tools** | **Reading Comprehension** | **Focus Enhancement** | **Academic Research** | **Note Taking** | **Knowledge Management** | **Chinese Text Processing** | **English Text Processing** | **Japanese Text Processing** | **Text Analysis** | **Reading Speed** | **Markdown Enhancement** | **Visual Highlighting** | **Peripheral Vision Reading** | **Jump Reading** | **Information Processing** | **Cognitive Enhancement** | **Reading Training** | **Eye Movement** | **Visual Patterns** | **Reading Efficiency** | **Mental Processing** | **Reading Science** | **Neuroscience Reading** | **Brain Training** | **Reading Psychology** | **Text Scanning** | **Fast Reading** | **Reading Methodology** | **Cognitive Load Reduction** | **Pattern Recognition** | **Context Processing** | **Reading Habits** | **Reading Techniques** 