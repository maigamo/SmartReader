import { App, Plugin, MarkdownView, setIcon, addIcon, Notice } from 'obsidian';
import { SmartReaderSettings, DEFAULT_SETTINGS } from './types';
import { t } from './i18n';
import { I18nTestModal } from './i18n-test';
import { SmartReaderSettingTab } from './settings';
import { EventHandler } from './event-handler';
import { DocumentProcessor } from './document-processor';
import { TokenizerTestModal } from './tokenizer-test';
import { ProgressIndicator } from './progress-indicator';
import { StyleManager } from './style-manager';
import { SMART_READER_ICON, SMART_READER_SETTINGS_ICON } from './icons';

export class SmartReaderPlugin extends Plugin {
	settings: SmartReaderSettings;
	statusBarEl: HTMLElement;
	eventHandler: EventHandler;
	documentProcessor: DocumentProcessor;
	progressIndicator: ProgressIndicator;
	styleManager: StyleManager;
	ribbonIcon: HTMLElement | null = null;

	async onload() {
		console.log('Loading SmartReader plugin');
		
		// 注册自定义图标
		this.registerIcons();
		
		// 加载设置
		await this.loadSettings();
		
		// 初始化进度指示器
		this.progressIndicator = new ProgressIndicator(this);
		
		// 初始化样式管理器
		this.styleManager = new StyleManager(this);
		
		// 初始化处理器
		this.documentProcessor = new DocumentProcessor(this.settings, this.progressIndicator);
		
		// 初始化事件处理器
		this.eventHandler = new EventHandler(this);
		this.eventHandler.initialize();
		
		// 添加设置选项卡
		this.addSettingTab(new SmartReaderSettingTab(this.app, this));
		
		// 添加状态栏项
		this.setupStatusBar();
		
		// 添加功能区图标
		this.setupRibbonIcon();
		
		// 注册命令：开关速读功能
		this.addCommand({
			id: 'toggle-smart-reader',
			name: t(this.app, 'smartreader.commands.toggle'),
			icon: 'book-open-check',
			callback: () => {
				// 切换状态
				this.settings.isEnabled = !this.settings.isEnabled;
				// 保存设置
				this.saveSettings();
				// 更新状态栏和功能区图标
				this.updateStatusBar();
				this.updateRibbonIcon();
				
				// 应用处理或清除
				this.eventHandler.toggleProcessing();
				
				// 状态反馈
				const status = this.settings.isEnabled 
					? t(this.app, 'smartreader.status.enabled') 
					: t(this.app, 'smartreader.status.disabled');
				new Notice(status);
			},
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 'r',
				}
			]
		});
		
		// 注册命令：立即处理当前文档
		this.addCommand({
			id: 'process-current-document',
			name: t(this.app, 'smartreader.commands.process_current'),
			icon: 'highlighter',
			checkCallback: (checking: boolean) => {
				// 检查当前是否有激活的叶子节点
				const activeLeaf = this.app.workspace.activeLeaf;
				if (!activeLeaf) {
					if (!checking) {
						new Notice(t(this.app, 'smartreader.messages.no_active_file'));
					}
					return false;
				}
				
				// 检查是否为Markdown视图
				const view = activeLeaf.view;
				if (!(view instanceof MarkdownView)) {
					if (!checking) {
						new Notice(t(this.app, 'smartreader.messages.not_markdown_view'));
					}
					return false;
				}
				
				// 检查是否为预览模式
				const isPreviewMode = view.getMode() === 'preview';
				if (!isPreviewMode) {
					if (!checking) {
						new Notice(t(this.app, 'smartreader.messages.not_preview_mode'));
					}
					return false;
				}
				
				// 如果只是检查命令是否可用，返回true
				if (checking) {
					return true;
				}
				
				// 实际执行命令
				this.eventHandler.processDocument(activeLeaf);
				return true;
			},
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 'p',
				}
			]
		});
		
		// 注册命令：清除当前文档处理
		this.addCommand({
			id: 'clear-current-document',
			name: t(this.app, 'smartreader.commands.clear_current'),
			icon: 'eraser',
			checkCallback: (checking: boolean) => {
				// 检查当前是否有激活的叶子节点
				const activeLeaf = this.app.workspace.activeLeaf;
				if (!activeLeaf) {
					if (!checking) {
						new Notice(t(this.app, 'smartreader.messages.no_active_file'));
					}
					return false;
				}
				
				// 检查是否为Markdown视图
				const view = activeLeaf.view;
				if (!(view instanceof MarkdownView)) {
					if (!checking) {
						new Notice(t(this.app, 'smartreader.messages.not_markdown_view'));
					}
					return false;
				}
				
				// 检查是否为预览模式
				const isPreviewMode = view.getMode() === 'preview';
				if (!isPreviewMode) {
					if (!checking) {
						new Notice(t(this.app, 'smartreader.messages.not_preview_mode'));
					}
					return false;
				}
				
				// 如果只是检查命令是否可用，返回true
				if (checking) {
					return true;
				}
				
				// 实际执行命令
				this.eventHandler.clearDocument(activeLeaf);
				return true;
			},
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 'c',
				}
			]
		});
		
		// 注册命令：打开插件设置
		this.addCommand({
			id: 'open-smart-reader-settings',
			name: t(this.app, 'smartreader.commands.open_settings'),
			icon: 'settings',
			callback: () => {
				this.app.setting.open();
				this.app.setting.openTabById('obsidian-smart-reader');
			},
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 's',
				}
			]
		});
		
		// 添加测试国际化命令
		this.addCommand({
			id: 'test-i18n',
			name: 'Test internationalization',
			icon: 'globe',
			callback: () => {
				new I18nTestModal(this.app).open();
			}
		});
		
		// 添加分词器测试命令
		this.addCommand({
			id: 'test-tokenizer',
			name: 'Test tokenizer',
			icon: 'text',
			callback: () => {
				new TokenizerTestModal(this.app).open();
			}
		});
		
		// 添加处理全文档命令（用于测试）
		this.addCommand({
			id: 'process-full-document',
			name: 'Process full document (test)',
			icon: 'file-text',
			checkCallback: (checking: boolean) => {
				// 检查当前是否有激活的叶子节点
				const activeLeaf = this.app.workspace.activeLeaf;
				if (!activeLeaf) {
					if (!checking) {
						new Notice('No active file');
					}
					return false;
				}
				
				// 检查是否为Markdown视图
				const view = activeLeaf.view;
				if (!(view instanceof MarkdownView)) {
					if (!checking) {
						new Notice('Please open a Markdown document');
					}
					return false;
				}
				
				// 检查是否为预览模式
				const isPreviewMode = view.getMode() === 'preview';
				if (!isPreviewMode) {
					if (!checking) {
						new Notice('Please switch to preview mode');
					}
					return false;
				}
				
				// 如果只是检查命令是否可用，返回true
				if (checking) {
					return true;
				}
				
				// 实际执行命令 - 处理整个文档
				const success = this.documentProcessor.processActiveDocument(activeLeaf, true);
				if (success) {
					new Notice('Full document processed successfully');
				} else {
					new Notice('Failed to process full document');
				}
				return true;
			}
		});
		
		// 添加显示进度测试命令
		this.addCommand({
			id: 'test-progress',
			name: 'Test progress indicator',
			icon: 'loader',
			callback: () => {
				this.progressIndicator.show();
				let progress = 0;
				
				// 模拟进度更新
				const interval = setInterval(() => {
					progress += 5;
					this.progressIndicator.updateProgress(progress);
					
					if (progress >= 100) {
						clearInterval(interval);
						this.progressIndicator.showComplete('测试完成！');
					}
				}, 200);
			}
		});
		
		// 加载CSS样式
		this.loadStyles();
	}

	onunload() {
		console.log('Unloading SmartReader plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	
	/**
	 * 更新处理器设置
	 */
	updateProcessorSettings() {
		// 更新文档处理器的设置
		this.documentProcessor = new DocumentProcessor(this.settings, this.progressIndicator);
		
		// 更新事件处理器中的文档处理器
		if (this.eventHandler) {
			this.eventHandler.updateDocumentProcessor(this.documentProcessor);
		}
		
		// 更新CSS变量
		document.documentElement.style.setProperty('--highlight-color', this.settings.highlightColor);
	}
	
	/**
	 * 清理所有文档的旧样式
	 */
	async cleanupAllDocuments() {
		// 获取所有打开的Markdown视图
		const markdownLeaves = this.app.workspace.getLeavesOfType('markdown');
		
		for (const leaf of markdownLeaves) {
			const view = leaf.view;
			if (view instanceof MarkdownView && view.getMode() === 'preview') {
				// 清除该文档的所有处理
				this.documentProcessor.clearActiveDocument(leaf);
			}
		}
	}
	
	// 注册自定义图标
	registerIcons() {
		// 注册自定义的SmartReader图标
		addIcon('smart-reader', SMART_READER_ICON);
		
		// 注册设置图标
		addIcon('smart-reader-settings', SMART_READER_SETTINGS_ICON);
	}
	
	loadStyles() {
		// 加载CSS样式
		const styleEl = document.createElement('style');
		styleEl.id = 'smart-reader-styles';
		styleEl.textContent = `
		/* 主题变量 - 适配深色和浅色主题 */
		:root {
			--highlight-color: ${this.settings.highlightColor};
		}
		`;
		document.head.appendChild(styleEl);
		
		// 设置CSS变量
		document.documentElement.style.setProperty('--highlight-color', this.settings.highlightColor);
	}
	
	// 设置状态栏
	setupStatusBar() {
		this.statusBarEl = this.addStatusBarItem() as HTMLElement;
		this.statusBarEl.addClass('smart-reader-status');
		
		// 点击状态栏可以切换启用状态
		this.statusBarEl.addEventListener('click', () => {
			this.settings.isEnabled = !this.settings.isEnabled;
			this.saveSettings();
			this.updateStatusBar();
			this.updateRibbonIcon();
			
			// 应用处理或清除
			this.eventHandler.toggleProcessing();
			
			// 状态反馈
			const status = this.settings.isEnabled 
				? t(this.app, 'smartreader.status.enabled') 
				: t(this.app, 'smartreader.status.disabled');
			new Notice(status);
		});
		
		// 初始化状态栏
		this.updateStatusBar();
	}
	
	// 设置功能区图标
	setupRibbonIcon() {
		// 添加功能区图标
		this.ribbonIcon = this.addRibbonIcon(
			'smart-reader', 
			t(this.app, 'smartreader.commands.toggle'), 
			(evt) => {
				// 切换状态
				this.settings.isEnabled = !this.settings.isEnabled;
				this.saveSettings();
				this.updateStatusBar();
				this.updateRibbonIcon();
				
				// 应用处理或清除
				this.eventHandler.toggleProcessing();
				
				// 状态反馈
				const status = this.settings.isEnabled 
					? t(this.app, 'smartreader.status.enabled') 
					: t(this.app, 'smartreader.status.disabled');
				new Notice(status);
			}
		) as HTMLElement;
		
		// 更新图标状态
		this.updateRibbonIcon();
	}
	
	// 更新功能区图标状态
	updateRibbonIcon() {
		if (!this.ribbonIcon) return;
		
		if (this.settings.isEnabled) {
			this.ribbonIcon.addClass('is-active');
		} else {
			this.ribbonIcon.removeClass('is-active');
		}
	}
	
	// 更新状态栏显示
	updateStatusBar() {
		this.statusBarEl.empty();
		
		// 创建图标
		const iconEl = this.statusBarEl.createSpan({cls: 'smart-reader-icon'});
		const statusText = this.statusBarEl.createSpan({cls: 'smart-reader-status-text'});
		
		if (this.settings.isEnabled) {
			setIcon(iconEl, 'book-open-check');
			statusText.setText(t(this.app, 'smartreader.status.enabled'));
			this.statusBarEl.removeClass('disabled');
			this.statusBarEl.addClass('enabled');
		} else {
			setIcon(iconEl, 'book-open');
			statusText.setText(t(this.app, 'smartreader.status.disabled'));
			this.statusBarEl.removeClass('enabled');
			this.statusBarEl.addClass('disabled');
		}
	}
}

// 默认导出插件类
export default SmartReaderPlugin; 