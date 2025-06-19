import { MarkdownView, Notice, TFile, WorkspaceLeaf } from 'obsidian';
import { SmartReaderPlugin } from './main';
import { DocumentProcessor } from './document-processor';
import { getFileContent, isFileExcluded, meetMinimumLength } from './utils';
import { t } from './i18n';

/**
 * 事件处理器类
 * 负责监听和处理Obsidian中的各种事件
 */
export class EventHandler {
    private plugin: SmartReaderPlugin;
    private documentProcessor: DocumentProcessor;
    private processingTimeout: number | null = null;
    private processingFile: string | null = null;
    private scrollTimeout: number | null = null;
    private isProcessingScroll: boolean = false;
    private boundScrollHandler: () => void; // 保存绑定的滚动处理函数引用
    
    constructor(plugin: SmartReaderPlugin) {
        this.plugin = plugin;
        this.documentProcessor = new DocumentProcessor(plugin.settings);
        // 绑定滚动处理函数，确保引用一致
        this.boundScrollHandler = this.handleScroll.bind(this);
    }
    
    /**
     * 更新文档处理器
     * @param newProcessor 新的文档处理器实例
     */
    public updateDocumentProcessor(newProcessor: DocumentProcessor): void {
        this.documentProcessor = newProcessor;
    }
    
    /**
     * 初始化事件监听器
     */
    public initialize(): void {
        // 注册工作区事件
        this.registerWorkspaceEvents();
        
        // 注册编辑器事件
        this.registerEditorEvents();
        
        // 注册设置变化事件
        this.registerSettingsEvents();
        
        // 注册文件事件
        this.registerFileEvents();
        
        // 注册滚动事件
        this.registerScrollEvents();
    }
    
    /**
     * 注册工作区相关事件
     */
    private registerWorkspaceEvents(): void {
        // 切换活动叶子节点时
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('active-leaf-change', (leaf: WorkspaceLeaf | null) => {
                if (!leaf) return;
                
                // 处理活动叶子变化
                this.handleActiveLeafChange(leaf);
            })
        );
        
        // 布局变化时
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('layout-change', () => {
                // 获取当前活动叶子节点
                const activeLeaf = this.plugin.app.workspace.activeLeaf;
                if (activeLeaf) {
                    this.handleActiveLeafChange(activeLeaf);
                }
            })
        );
    }
    
    /**
     * 注册编辑器相关事件
     */
    private registerEditorEvents(): void {
        // 编辑器模式变化时（源码/预览切换）
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('editor-change', (editor: any, view: any) => {
                if (view instanceof MarkdownView) {
                    // 从源码切换到预览时
                    if (view.getMode() === 'preview') {
                        // 获取当前叶子节点
                        const activeLeaf = this.plugin.app.workspace.activeLeaf;
                        if (activeLeaf) {
                            // 延迟处理，等待预览渲染完成
                            setTimeout(() => {
                                this.handleActiveLeafChange(activeLeaf);
                            }, 300);
                        }
                    }
                }
            })
        );
    }
    
    /**
     * 注册滚动事件
     */
    private registerScrollEvents(): void {
        // 监听工作区布局变化，动态绑定滚动事件
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('layout-change', () => {
                this.bindScrollListeners();
            })
        );
        
        // 监听活动叶子变化，重新绑定滚动事件
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('active-leaf-change', () => {
                this.bindScrollListeners();
            })
        );
        
        // 初始绑定
        this.bindScrollListeners();
    }
    
    /**
     * 绑定滚动监听器到当前活动视图
     */
    private bindScrollListeners(): void {
        // 获取当前活动的Markdown视图
        const activeLeaf = this.plugin.app.workspace.activeLeaf;
        if (!activeLeaf || !(activeLeaf.view instanceof MarkdownView)) {
            return;
        }
        
        const view = activeLeaf.view as MarkdownView;
        if (view.getMode() !== 'preview') {
            return;
        }
        
        // 查找预览容器
        const previewContainer = view.contentEl.querySelector('.markdown-preview-view');
        if (!previewContainer) {
            return;
        }
        
        // 移除之前的监听器（使用保存的函数引用）
        previewContainer.removeEventListener('scroll', this.boundScrollHandler);
        
        // 添加新的滚动监听器（使用保存的函数引用）
        previewContainer.addEventListener('scroll', this.boundScrollHandler, { passive: true });
        
        }
    
    /**
     * 处理滚动事件
     */
    private handleScroll(): void {
        // 如果功能未启用，忽略
        if (!this.plugin.settings.isEnabled) {
            return;
        }
        
        // 如果正在处理滚动，忽略
        if (this.isProcessingScroll) {
            return;
        }
        
        // 节流处理，避免频繁处理
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        this.scrollTimeout = setTimeout(() => {
            this.processVisibleContent();
        }, 200) as unknown as number; // 减少延迟以提高响应性
    }
    
    /**
     * 处理可见区域内容
     */
    private async processVisibleContent(): Promise<void> {
        // 标记为正在处理
        this.isProcessingScroll = true;
        
        try {
            // 获取当前活动的叶子节点
            const activeLeaf = this.plugin.app.workspace.activeLeaf;
            if (!activeLeaf || !(activeLeaf.view instanceof MarkdownView)) {
                return;
            }
            
            const view = activeLeaf.view as MarkdownView;
            
            // 检查是否为预览模式
            if (view.getMode() !== 'preview') {
                return;
            }
            
            // 获取预览视图的容器
            const previewContainer = view.contentEl.querySelector('.markdown-preview-view');
            if (!previewContainer) {
                return;
            }
            
            // 查找所有未处理的可见元素
            const visibleElements = this.findVisibleUnprocessedElements(previewContainer as HTMLElement);
            
            // 如果有可见的未处理元素，处理它们
            if (visibleElements.length > 0) {
                this.documentProcessor.processElements(visibleElements);
            }
        } catch (error) {
            // 静默处理错误
        } finally {
            // 重置处理标记
            this.isProcessingScroll = false;
        }
    }
    
    /**
     * 查找可见且未处理的元素
     * @param container 容器元素
     * @returns 可见且未处理的元素数组
     */
    private findVisibleUnprocessedElements(container: HTMLElement): HTMLElement[] {
        // 查找所有可处理的元素
        const allElements = container.querySelectorAll('p, h2, h3, h4, h5, h6, li, td, th');
        const visibleUnprocessed: HTMLElement[] = [];
        
        // 获取容器的滚动信息和可见区域
        const containerRect = container.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        
        // 计算可见区域范围（相对于容器内容）
        const visibleTop = scrollTop;
        const visibleBottom = scrollTop + containerHeight;
        
        // 添加缓冲区，提前处理即将进入视口的元素
        const buffer = containerHeight * 0.5; // 半屏高度的缓冲区
        const expandedTop = Math.max(0, visibleTop - buffer);
        const expandedBottom = visibleBottom + buffer;
        
        // 遍历元素，检查是否在扩展可见区域内且未处理
        Array.from(allElements).forEach(el => {
            const element = el as HTMLElement;
            
            // 检查元素是否已处理
            if (element.classList.contains('smart-reader-processed')) {
                return;
            }
            
            // 获取元素相对于容器的位置
            const elementRect = element.getBoundingClientRect();
            const containerTopOffset = containerRect.top;
            
            // 计算元素在容器内的位置
            const elementTopInContainer = elementRect.top - containerTopOffset + scrollTop;
            const elementBottomInContainer = elementRect.bottom - containerTopOffset + scrollTop;
            
            // 检查元素是否在扩展的可见区域内
            const isVisible = 
                (elementTopInContainer >= expandedTop && elementTopInContainer <= expandedBottom) || 
                (elementBottomInContainer >= expandedTop && elementBottomInContainer <= expandedBottom) ||
                (elementTopInContainer <= expandedTop && elementBottomInContainer >= expandedBottom);
            
            if (isVisible) {
                visibleUnprocessed.push(element);
            }
        });
        
        return visibleUnprocessed;
    }
    
    /**
     * 注册文件相关事件
     */
    private registerFileEvents(): void {
        // 文件内容修改时
        this.plugin.registerEvent(
            this.plugin.app.vault.on('modify', (file: any) => {
                if (!(file instanceof TFile) || file.extension !== 'md') {
                    return;
                }
                
                // 如果不是当前活动文件，忽略
                const activeFile = this.plugin.app.workspace.getActiveFile();
                if (!activeFile || activeFile.path !== file.path) {
                    return;
                }
                
                // 获取活动叶子节点
                const activeLeaf = this.plugin.app.workspace.activeLeaf;
                if (activeLeaf) {
                    const view = activeLeaf.view;
                    
                    // 如果是预览模式，且开启了自动处理，处理文件变更
                    if (view instanceof MarkdownView && 
                        view.getMode() === 'preview' && 
                        this.plugin.settings.isEnabled && 
                        this.plugin.settings.autoProcess) {
                        
                        // 清除之前的计时器
                        this.clearProcessingTimeout();
                        
                        // 设置新的处理计时器，延迟处理以避免频繁刷新
                        const delay = Math.max(this.plugin.settings.autoProcessDelay * 1000, 1000);
                        this.processingTimeout = setTimeout(() => {
                            this.processDocument(activeLeaf);
                        }, delay) as unknown as number;
                    }
                }
            })
        );
    }
    
    /**
     * 注册设置变化事件
     */
    private registerSettingsEvents(): void {
        // 当设置变化时，更新处理器
        this.plugin.register(() => {
            this.documentProcessor = new DocumentProcessor(this.plugin.settings, this.plugin.progressIndicator);
        });
    }
    
    /**
     * 处理活动叶子变化事件
     * @param leaf 活动叶子节点
     */
    private async handleActiveLeafChange(leaf: WorkspaceLeaf): Promise<void> {
        // 检查是否启用功能
        if (!this.plugin.settings.isEnabled) {
            return;
        }
        
        // 检查是否为Markdown视图
        const view = leaf.view;
        if (!(view instanceof MarkdownView)) {
            return;
        }
        
        // 检查是否为预览模式
        if (view.getMode() !== 'preview') {
            return;
        }
        
        // 获取当前文件
        const file = view.file;
        if (!file) {
            return;
        }
        
        // 如果正在处理同一个文件，忽略
        if (this.processingFile === file.path) {
            return;
        }
        
        // 先清理该文档的所有旧样式（可能是之前的会话残留）
        this.documentProcessor.clearActiveDocument(leaf);
        
        // 检查文件是否在排除列表中
        if (isFileExcluded(file, this.plugin.settings)) {
            return;
        }
        
        // 检查文件长度是否满足最小处理要求
        try {
            const content = await getFileContent(file, this.plugin.app.vault);
            if (!meetMinimumLength(content, this.plugin.settings)) {
                return;
            }
        } catch (error) {
            // 静默处理错误
        }
        
        // 判断是否需要自动处理
        if (this.plugin.settings.autoProcess) {
            // 清除之前的计时器
            this.clearProcessingTimeout();
            
            // 标记正在处理的文件
            this.processingFile = file.path;
            
            // 延迟处理文档
            const delay = this.plugin.settings.autoProcessDelay * 1000;
            this.processingTimeout = setTimeout(() => {
                this.processDocument(leaf);
                this.processingFile = null;
            }, delay) as unknown as number;
        }
    }
    
    /**
     * 清除处理计时器
     */
    private clearProcessingTimeout(): void {
        if (this.processingTimeout) {
            clearTimeout(this.processingTimeout);
            this.processingTimeout = null;
        }
    }
    
    /**
     * 处理文档
     * @param leaf 叶子节点
     */
    public processDocument(leaf: WorkspaceLeaf): void {
        // 获取当前文件
        const view = leaf.view;
        if (!(view instanceof MarkdownView)) {
            return;
        }
        
        const file = view.file;
        if (!file) {
            return;
        }
        
        // 标记正在处理的文件
        this.processingFile = file.path;
        
        // 处理文档
        const success = this.documentProcessor.processActiveDocument(leaf);
        
        if (success) {
            } else {
            new Notice(t(this.plugin.app, 'smartreader.messages.processing_error'));
        }
        
        // 清除正在处理的文件标记
        setTimeout(() => {
            this.processingFile = null;
        }, 100);
    }
    
    /**
     * 清除文档处理
     * @param leaf 叶子节点
     */
    public clearDocument(leaf: WorkspaceLeaf): void {
        // 获取当前文件
        const view = leaf.view;
        if (!(view instanceof MarkdownView)) {
            return;
        }
        
        const file = view.file;
        if (!file) {
            return;
        }
        
        // 标记正在处理的文件
        this.processingFile = file.path;
        
        // 清除文档处理
        const success = this.documentProcessor.clearActiveDocument(leaf);
        
        if (success) {
            } else {
            new Notice(t(this.plugin.app, 'smartreader.messages.clearing_error'));
        }
        
        // 清除正在处理的文件标记
        setTimeout(() => {
            this.processingFile = null;
        }, 100);
    }
    
    /**
     * 切换文档处理状态
     */
    public toggleProcessing(): void {
        const activeLeaf = this.plugin.app.workspace.activeLeaf;
        if (!activeLeaf) {
            return;
        }
        
        // 根据当前启用状态切换处理
        if (this.plugin.settings.isEnabled) {
            this.processDocument(activeLeaf);
        } else {
            // 关闭速读模式时，清理整个文档的所有高亮样式
            this.clearEntireDocument(activeLeaf);
        }
    }
    
    /**
     * 清理整个文档的所有高亮样式（包括滚动过的内容）
     * @param leaf 叶子节点
     */
    private clearEntireDocument(leaf: WorkspaceLeaf): void {
        // 获取当前文件
        const view = leaf.view;
        if (!(view instanceof MarkdownView)) {
            return;
        }
        
        const file = view.file;
        if (!file) {
            return;
        }
        
        // 检查是否为预览模式
        if (view.getMode() !== 'preview') {
            return;
        }
        
        // 获取预览视图的容器
        const previewContainer = view.contentEl.querySelector('.markdown-preview-view');
        if (!previewContainer) {
            return;
        }
        
        // 查找所有高亮元素（无论是否在可见区域）
        const allHighlights = previewContainer.querySelectorAll('.smart-reader-highlight, .smart-reader-highlight-color, .smart-reader-highlight-underline, .smart-reader-highlight-bold-underline');
        
        allHighlights.forEach(highlight => {
            const parent = highlight.parentNode;
            if (parent) {
                // 将高亮元素的内容移到父节点
                while (highlight.firstChild) {
                    parent.insertBefore(highlight.firstChild, highlight);
                }
                // 移除高亮元素
                parent.removeChild(highlight);
            }
        });
        
        // 查找所有已处理标记并移除
        const processedElements = previewContainer.querySelectorAll('.smart-reader-processed');
        processedElements.forEach(element => {
            element.classList.remove('smart-reader-processed');
        });
        
        // 规范化文本节点
        (previewContainer as HTMLElement).normalize();
        
        }
} 