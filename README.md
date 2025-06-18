# SmartReader - Obsidian Speed Reading Plugin

SmartReader is an Obsidian plugin that helps you read faster by intelligently highlighting key words in your documents. It automatically detects the language (Chinese or English) and applies appropriate processing to enhance your reading speed.

## Features

- Smart highlighting of key words based on configurable intervals
- Automatic language detection (Chinese/English)
- Support for different highlighting styles (bold, color, underline, bold+underline)
- Non-destructive processing (never modifies your source files)
- Completely local processing (no data leaves your device)
- Multiple language interface (English, Chinese, Japanese)

## Installation

1. In Obsidian, go to Settings > Community plugins
2. Disable Safe mode
3. Click "Browse" and search for "SmartReader"
4. Install the plugin and enable it

## Usage

1. Open any document in Reading view
2. Toggle SmartReader with the command palette or using the ribbon icon
3. Adjust settings to customize the highlighting interval and style

## Development Status

This plugin is currently in development.

### Development Log

#### Phase 1: Project Initialization (Completed on 2023-07-30)
- Created basic project structure
- Set up TypeScript configuration
- Initialized package dependencies
- Created plugin loading/unloading mechanisms
- Added build script to output files to build directory
- Implemented error handling and logging basics

#### Phase 2: Internationalization Framework (Completed on 2023-07-30)
- Created language files for English, Chinese, and Japanese
- Implemented translation function (t)
- Developed language detection and switching mechanism
- Created internationalization test interface
- Established translation key naming conventions
- Optimized text length for mobile display compatibility

#### Phase 3: Settings Interface (Completed on 2023-07-31)
- Designed and implemented complete settings UI
- Created three logical sections: Behavior & Activation, Highlighting Rules, Appearance & Style
- Added icons for all clickable elements using Obsidian's setIcon function
- Implemented hover animations and visual feedback
- Created responsive design considerations
- Added status bar integration with click-to-toggle functionality

#### Phase 4: Text Processing Engine (Completed on 2023-07-31)
- Implemented TextProcessor class with language detection
- Created separate processing logic for Chinese and English text
- Added support for character-based and word-based intervals
- Implemented proper handling of punctuation and whitespace
- Added debugging output for development and testing
- **Fixed large interval value issue**: Changed from position-based to modulo-based highlighting algorithm
- **Enhanced highlighting styles**: Added bold+underline combination for maximum visibility
- **Improved user experience**: Added clear error messages explaining reading mode requirement

#### Recent Fixes and Improvements (2023-07-31)
1. **Large Interval Value Fix**: 
   - Problem: Interval values like 200 didn't work because the algorithm used position-based calculation
   - Solution: Switched to modulo arithmetic (`wordCount % intervalValue === 0`) ensuring highlighting works regardless of interval size
   - Impact: Now supports any interval value from 5 to 500 effectively

2. **Enhanced Highlighting Visibility**:
   - Added new "Bold + Underline" style option for maximum text visibility
   - Updated all existing styles to include both bold and underline by default
   - Improved CSS styling with better color contrast and text shadows

3. **Better User Guidance**:
   - Added clear error messages explaining why reading mode is required
   - Enhanced command availability checking with user-friendly notifications
   - Improved translation coverage for all error scenarios

4. **Reading Mode Requirement Analysis**:
   - **Why this limitation exists**: The plugin modifies DOM elements to add highlighting, which is only possible in reading/preview mode
   - **Technical reason**: In edit mode, the content is in CodeMirror editor where direct DOM manipulation would interfere with editing
   - **User benefit**: This ensures the plugin never interferes with the editing experience
   - **Conclusion**: This limitation is reasonable and necessary for proper functionality

#### Current Issues and Solutions (2023-07-31)
1. **Long Document Scrolling Issue**:
   - **Problem**: In documents with 20,000+ characters, only the initial visible content gets highlighted. When scrolling down, new content doesn't get processed.
   - **Root Cause**: Current implementation processes all content at once initially, but scroll-based lazy loading isn't working correctly.
   - **Solution**: Implement improved scroll event handling with proper viewport detection and lazy processing of visible content.
   - **Status**: ⚠️ Partially Fixed - CSS and input fixes completed, scroll handling needs runtime testing

2. **Highlight Style Options Not Working Correctly**:
   - **Problem**: All highlight styles (Bold, Color, Underline, Bold+Underline) are showing the same effect with both bold and underline.
   - **Root Cause**: CSS styles are incorrectly applying multiple effects to all style options.
   - **Solution**: Fix CSS to apply only the selected style effect for each option.
   - **Status**: ✅ Fixed - Each style now applies only its intended effect

3. **Settings Input Focus Loss**:
   - **Problem**: When typing in the interval value input box, focus is lost after each character input.
   - **Root Cause**: The onChange handler calls `this.display()` which re-renders the entire settings interface.
   - **Solution**: Update only the specific UI elements instead of re-rendering the entire interface.
   - **Status**: ✅ Fixed - Input box now maintains focus during continuous typing

#### Testing Files
- `test-interval.md` - Tests different interval values and highlighting styles
- `test-long-document.md` - Tests scrolling pagination with 20,000+ character content
- `fixes.md` - Detailed explanation of problems and solutions

### Next Development Phases

#### Phase 5: Document Processing System (Planned)
- Implement DocumentProcessor class for handling full documents
- Add progress indication for large document processing
- Create element filtering and selection logic
- Implement batch processing capabilities

#### Phase 6: Event Handling System (Planned)
- Create EventHandler class for managing user interactions
- Implement auto-processing on document open
- Add scroll-based lazy processing
- Handle view mode changes and file switches

#### Phase 7: Advanced Features (Planned)
- Add reading progress tracking
- Implement reading speed analytics
- Create customizable highlighting patterns
- Add export functionality for processed content

#### Phase 8: Performance Optimization (Planned)
- Optimize processing algorithms for large documents
- Implement caching mechanisms
- Add memory usage optimization
- Create performance monitoring tools

#### Phase 9: User Experience Enhancement (Planned)
- Add keyboard shortcuts for common actions
- Implement context menus and quick actions
- Create tutorial and onboarding experience
- Add accessibility features

#### Phase 10: Final Polish and Release (Planned)
- Comprehensive testing across different themes
- Performance benchmarking and optimization
- Documentation completion
- Community plugin store submission preparation

## Testing

Use the included `test-interval.md` file to test different interval values and highlighting styles. This file contains text specifically designed to test both small (20) and large (200) interval values in both Chinese and English.

## Contributing

This project is in active development. Contributions, bug reports, and feature requests are welcome.

## License

MIT License 

## 开发日志

### 阶段一：项目初始化与基础架构 ✅
- [x] 项目结构创建完成
- [x] 基本配置文件设置完成
- [x] TypeScript 配置完成
- [x] 构建系统设置完成

### 阶段二：国际化框架实现 ✅
- [x] 多语言支持框架完成
- [x] 英文、中文、日文语言包完成
- [x] 动态语言切换功能完成
- [x] 国际化测试模态框完成

### 阶段三：设置界面开发 ✅
- [x] 完整的设置界面实现
- [x] 三个逻辑分区：行为与激活、高亮规则、外观样式
- [x] 所有设置项都有对应图标
- [x] 动态显示/隐藏相关选项
- [x] 状态栏集成与点击切换功能
- [x] 响应式设计与动画效果

### 最新修复 ✅
- [x] **间隔值实时生效修复** - 修复了间隔值（intervalValue）和间隔类型（intervalType）修改后需要重新打开文档才生效的问题
- [x] **计数逻辑确认** - 确认换行和空行不会重置计数器，保持高亮间隔的一致性
- [x] **设置变化即时响应** - 所有高亮相关设置修改后都会立即重新处理当前文档
- [x] **间隔值范围优化** - 将间隔值范围从5-500调整为5-80，提供更实用的速读间隔选择
- [x] **完整文档清理修复** - 修复了关闭速读模式时只清理可见区域的问题，现在会清理整个文档的所有高亮样式
- [x] **长文档滚动处理改进** - 优化了滚动事件绑定和可见性检测算法，提高长文档处理的准确性 