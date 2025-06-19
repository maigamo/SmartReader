import { App, PluginSettingTab, Setting, setIcon, Notice } from 'obsidian';
import { SmartReaderPlugin } from './main';
import { t, clearTranslationCache } from './i18n';

export class SmartReaderSettingTab extends PluginSettingTab {
	plugin: SmartReaderPlugin;

	constructor(app: App, plugin: SmartReaderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.addClass('smart-reader-settings');
		
		this.renderBehaviorSettings(containerEl);
		this.renderHighlightingSettings(containerEl);
		this.renderAppearanceSettings(containerEl);
	}

	// 第一章节：行为与激活
	renderBehaviorSettings(containerEl: HTMLElement): void {
		// 章节标题
		const behaviorHeading = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.behavior', this.plugin.settings))
			.setHeading();
			
		// 添加图标到标题
		const behaviorIcon = behaviorHeading.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(behaviorIcon, 'sliders-horizontal');

		// 自动处理新文档
		const autoProcessSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.auto_process', this.plugin.settings))
			.setDesc(t(this.app, 'smartreader.settings.auto_process_description', this.plugin.settings))
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoProcess)
				.onChange(async (value) => {
					this.plugin.settings.autoProcess = value;
					await this.plugin.saveSettings();
					// 刷新界面，显示/隐藏相关设置项
					this.display();
				})
			);
			
		// 添加图标
		const autoProcessIcon = autoProcessSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(autoProcessIcon, 'toggle-right');

		// 如果自动处理开启，显示自动模式延迟设置
		if (this.plugin.settings.autoProcess) {
			const delaySetting = new Setting(containerEl)
				.setName(t(this.app, 'smartreader.settings.delay', this.plugin.settings))
				.setDesc(t(this.app, 'smartreader.settings.delay_description', this.plugin.settings))
				.addSlider(slider => slider
					.setLimits(1, 30, 1)
					.setValue(this.plugin.settings.autoProcessDelay)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.autoProcessDelay = value;
						await this.plugin.saveSettings();
					})
				)
				.addText(text => text
					.setPlaceholder('10')
					.setValue(this.plugin.settings.autoProcessDelay.toString())
					.onChange(async (value) => {
						const numValue = parseInt(value);
						if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
							this.plugin.settings.autoProcessDelay = numValue;
							await this.plugin.saveSettings();
							this.display(); // 刷新以更新滑块
						}
					})
				);
				
			// 添加图标
			const delayIcon = delaySetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
			setIcon(delayIcon, 'clock');
		}

		// 最小处理长度
		const minLengthSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.min_length', this.plugin.settings))
			.setDesc(t(this.app, 'smartreader.settings.min_length_description', this.plugin.settings))
			.addSlider(slider => slider
				.setLimits(0, 1000, 50)
				.setValue(this.plugin.settings.minProcessLength)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.minProcessLength = value;
					await this.plugin.saveSettings();
				})
			)
			.addText(text => text
				.setPlaceholder('200')
				.setValue(this.plugin.settings.minProcessLength.toString())
				.onChange(async (value) => {
					const numValue = parseInt(value);
					if (!isNaN(numValue) && numValue >= 0) {
						this.plugin.settings.minProcessLength = numValue;
						await this.plugin.saveSettings();
						this.display(); // 刷新以更新滑块
					}
				})
			);
			
		// 添加图标
		const minLengthIcon = minLengthSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(minLengthIcon, 'ruler');

		// 排除的文件夹
		const excludedFoldersSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.excluded_folders', this.plugin.settings))
			.setDesc(t(this.app, 'smartreader.settings.excluded_folders_description', this.plugin.settings));
		
		// 添加图标
		const excludedFoldersIcon = excludedFoldersSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(excludedFoldersIcon, 'folder-x');
		
		// 添加文本区域
		excludedFoldersSetting.addTextArea(textarea => {
			textarea
				.setPlaceholder('Templates/\nDaily Notes/\n*.excalidraw\nArchive/*')
				.setValue(this.plugin.settings.excludedFolders.join('\n'))
				.onChange(async (value) => {
					this.plugin.settings.excludedFolders = value
						.split('\n')
						.map(s => s.trim())
						.filter(s => s.length > 0);
					await this.plugin.saveSettings();
				});
			
			// 设置文本区域的高度
			textarea.inputEl.rows = 4;
			textarea.inputEl.cols = 25;
		});
		
		// 添加通配符帮助文本
		const helpText = containerEl.createDiv({cls: 'setting-item-description'});
		helpText.textContent = t(this.app, 'smartreader.settings.excluded_folders_help', this.plugin.settings);
		
		// 添加测试按钮
		const testFiltersSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.test_filters', this.plugin.settings))
			.setDesc(t(this.app, 'smartreader.settings.test_filters_description', this.plugin.settings))
			.addButton(button => button
				.setButtonText(t(this.app, 'smartreader.settings.test_button', this.plugin.settings))
				.setCta()
				.onClick(() => {
					this.testCurrentFileAgainstFilters();
				})
			);
		
		// 添加图标	
		const testFiltersIcon = testFiltersSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(testFiltersIcon, 'check-circle-2');

		// 语言设置
		const languageSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.language', this.plugin.settings))
			.setDesc(t(this.app, 'smartreader.settings.language_description', this.plugin.settings))
			.addDropdown(dropdown => {
				dropdown
					.addOption('auto', t(this.app, 'smartreader.settings.language_auto', this.plugin.settings))
					.addOption('en', t(this.app, 'smartreader.settings.language_en', this.plugin.settings))
					.addOption('zh', t(this.app, 'smartreader.settings.language_zh', this.plugin.settings))
					.addOption('ja', t(this.app, 'smartreader.settings.language_ja', this.plugin.settings))
					.setValue(this.plugin.settings.language)
					.onChange(async (value: 'auto' | 'en' | 'zh' | 'ja') => {
						this.plugin.settings.language = value;
						await this.plugin.saveSettings();
						
						// 清除翻译缓存，确保新语言立即生效
						clearTranslationCache();
						
						// 刷新设置界面以使用新语言
						this.display();
						
						// 显示语言切换成功的通知
						const currentLang = value === 'auto' ? 'auto (follow Obsidian)' : value;
						new Notice(`Language changed to: ${currentLang}`);
					});
			});
			
		// 添加图标
		const languageIcon = languageSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(languageIcon, 'globe');
	}

	// 第二章节：高亮规则
	renderHighlightingSettings(containerEl: HTMLElement): void {
		// 章节标题
		const highlightingHeading = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.highlighting', this.plugin.settings))
			.setHeading();
			
		// 添加图标到标题
		const highlightingIcon = highlightingHeading.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(highlightingIcon, 'highlighter');

		// 间隔类型
		const intervalTypeSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.interval_type', this.plugin.settings))
			.addDropdown(dropdown => {
				dropdown
					.addOption('word', t(this.app, 'smartreader.settings.word_count', this.plugin.settings))
					.addOption('character', t(this.app, 'smartreader.settings.character_count', this.plugin.settings))
					.setValue(this.plugin.settings.intervalType)
					.onChange(async (value: 'word' | 'character') => {
						this.plugin.settings.intervalType = value;
						await this.plugin.saveSettings();
						
						// 立即重新处理当前文档以应用新的间隔类型
						this.reprocessCurrentDocument();
					});
			});
			
		// 添加图标
		const intervalTypeIcon = intervalTypeSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(intervalTypeIcon, 'type');

		// 间隔值
		const intervalValueSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.interval_value', this.plugin.settings))
			.setDesc(t(this.app, 'smartreader.settings.interval_value_description', this.plugin.settings))
			.addSlider(slider => slider
				.setLimits(5, 80, 1)
				.setValue(this.plugin.settings.intervalValue)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.intervalValue = value;
					// 更新文本输入框
					const textInput = intervalValueSetting.controlEl.querySelector('input[type="text"]');
					if (textInput) {
						(textInput as HTMLInputElement).value = value.toString();
					}
					await this.plugin.saveSettings();
					
					// 立即重新处理当前文档以应用新的间隔值
					this.reprocessCurrentDocument();
				})
			)
			.addText(text => text
				.setPlaceholder('10')
				.setValue(this.plugin.settings.intervalValue.toString())
				.onChange(async (value) => {
					const numValue = parseInt(value);
					if (!isNaN(numValue) && numValue >= 5 && numValue <= 80) {
						this.plugin.settings.intervalValue = numValue;
						await this.plugin.saveSettings();
						// 更新滑块值，但不重新渲染整个界面
						const sliderInput = intervalValueSetting.controlEl.querySelector('input[type="range"]');
						if (sliderInput) {
							(sliderInput as HTMLInputElement).value = numValue.toString();
						}
						
						// 立即重新处理当前文档以应用新的间隔值
						this.reprocessCurrentDocument();
					}
				})
			);
			
		// 调整滑块和输入框的宽度
		const sliderEl = intervalValueSetting.controlEl.querySelector('.slider') as HTMLElement;
		if (sliderEl) {
			sliderEl.addClass('smart-reader-slider'); }
		
		const inputEl = intervalValueSetting.controlEl.querySelector('input[type="text"]') as HTMLElement;
		if (inputEl) {
			inputEl.addClass('smart-reader-input'); }
		
		// 添加图标
		const intervalValueIcon = intervalValueSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(intervalValueIcon, 'chevrons-right');
	}

	// 第三章节：外观样式
	renderAppearanceSettings(containerEl: HTMLElement): void {
		// 章节标题
		const appearanceHeading = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.appearance'))
			.setHeading();
			
		// 添加图标到标题
		const appearanceIcon = appearanceHeading.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(appearanceIcon, 'palette');

		// 高亮样式
		const highlightStyleSetting = new Setting(containerEl)
			.setName(t(this.app, 'smartreader.settings.highlight_style'))
			.addDropdown(dropdown => {
				dropdown
					.addOption('bold', t(this.app, 'smartreader.settings.style_bold'))
					.addOption('color', t(this.app, 'smartreader.settings.style_color'))
					.addOption('underline', t(this.app, 'smartreader.settings.style_underline'))
					.addOption('bold_underline', t(this.app, 'smartreader.settings.style_bold_underline'))
					.setValue(this.plugin.settings.highlightStyle)
					.onChange(async (value: 'bold' | 'color' | 'underline' | 'bold_underline') => {
						const oldStyle = this.plugin.settings.highlightStyle;
						this.plugin.settings.highlightStyle = value;
						await this.plugin.saveSettings();
						
						// 更新CSS变量
						// 如果当前有活动文档且插件已启用，重新处理文档以应用新样式
						this.reprocessCurrentDocument();
						
						// 刷新界面，显示/隐藏颜色选择器
						this.display();
					});
			});
			
		// 添加图标
		const highlightStyleIcon = highlightStyleSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
		setIcon(highlightStyleIcon, this.getStyleIcon(this.plugin.settings.highlightStyle));

		// 如果高亮样式为颜色相关，显示颜色选择器
		if (this.plugin.settings.highlightStyle === 'color' || this.plugin.settings.highlightStyle === 'bold_underline') {
			const colorSetting = new Setting(containerEl)
				.setName(t(this.app, 'smartreader.settings.highlight_color'))
				.addColorPicker(color => color
					.setValue(this.plugin.settings.highlightColor)
					.onChange(async (value) => {
						this.plugin.settings.highlightColor = value;
						await this.plugin.saveSettings();
						
						// 更新CSS变量，实时预览效果
						// 如果当前有活动文档且插件已启用，重新处理文档以应用新颜色
						this.reprocessCurrentDocument();
					})
				);
				
			// 添加图标
			const colorIcon = colorSetting.nameEl.createSpan({cls: 'smart-reader-icon setting-icon'});
			setIcon(colorIcon, 'droplet');
		}
	}
	
	// 根据样式类型获取对应的图标
	private getStyleIcon(style: 'bold' | 'color' | 'underline' | 'bold_underline'): string {
		switch (style) {
			case 'bold': return 'bold';
			case 'color': return 'droplet';
			case 'underline': return 'underline';
			case 'bold_underline': return 'highlighter';
			default: return 'highlighter';
		}
	}
	
	// 测试当前文件是否会被过滤规则排除
	private async testCurrentFileAgainstFilters(): Promise<void> {
		// 获取当前活动文件
		const activeFile = this.app.workspace.getActiveFile();
		
		if (!activeFile) {
			new Notice(t(this.app, 'smartreader.messages.no_active_file'));
			return;
		}
		
		// 引入工具函数进行测试
		const { isFileExcluded, meetMinimumLength, getFileContent } = require('./utils');
		
		try {
			// 检查文件路径是否被排除
			const isExcluded = isFileExcluded(activeFile, this.plugin.settings);
			
			// 获取文件内容并检查长度
			const content = await getFileContent(activeFile, this.app.vault);
			const hasMinLength = meetMinimumLength(content, this.plugin.settings);
			
			// 显示测试结果
			let message = '';
			
			if (isExcluded) {
				message = t(this.app, 'smartreader.messages.test_excluded_path');
			} else if (!hasMinLength) {
				message = t(this.app, 'smartreader.messages.test_too_short');
			} else {
				message = t(this.app, 'smartreader.messages.test_will_process');
			}
			
			// 添加文件路径信息
			message += `\n${activeFile.path}`;
			
			// 显示通知
			new Notice(message, 5000);
		} catch (error) {
			new Notice(t(this.app, 'smartreader.messages.test_error'));
		}
	}

	private reprocessCurrentDocument(): void {
		const activeLeaf = this.app.workspace.activeLeaf;
		if (activeLeaf && this.plugin.settings.isEnabled) {
			const view = activeLeaf.view;
			if (view instanceof MarkdownView && view.getMode() === 'preview') {
				this.plugin.eventHandler.processDocument(activeLeaf);
			}
		}
	}
} 