import { MarkdownView, Notice, TFile, WorkspaceLeaf } from 'obsidian';
import { SmartReaderPlugin } from './main';
import { DocumentProcessor } from './document-processor';
import { getFileContent, isFileExcluded, meetMinimumLength } from './utils';
import { t } from './i18n';
import { logger } from './logger';

/**
 * 文档操作处理器类
 * 负责处理文档的处理、清除等操作
 */
export class DocumentOperationHandler {
    private plugin: SmartReaderPlugin;
    private documentProcessor: DocumentProcessor;
    private processingTimeout: number | null = null;
    private processingFile: string | null = null;

    constructor(plugin: SmartReaderPlugin) {
        this.plugin = plugin;
        this.documentProcessor = new DocumentProcessor(
            this.plugin.settings, 
            this.plugin.progressIndicator
        );
    }

    /**
     * 处理活动叶子变化事件
     * @param leaf 活动叶子节点
     */
    public async handleActiveLeafChange(leaf: WorkspaceLeaf): Promise<void> {
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
            logger.debug('文件被排除:', file.path);
            return;
        }
        
        // 检查文件长度是否满足最小处理要求
        try {
            const content = await getFileContent(file, this.plugin.app.vault);
            if (!meetMinimumLength(content, this.plugin.settings)) {
                logger.debug('文件太短:', file.path);
                return;
            }
        } catch (error) {
            console.error('Error reading file:', error);
            return;
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
            logger.debug('文档处理成功:', file.path);
        } else {
            logger.error('文档处理失败:', file.path);
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
            logger.debug('文档处理已清除:', file.path);
        } else {
            logger.error('清除文档处理失败:', file.path);
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
        
        logger.debug('清除整个文档高亮:', file.path);
        
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
        
        logger.debug(`已清除 ${allHighlights.length} 个高亮和 ${processedElements.length} 个处理标记`);
    }

    /**
     * 更新文档处理器（当设置变化时调用）
     */
    public updateDocumentProcessor(): void {
        this.documentProcessor = new DocumentProcessor(
            this.plugin.settings, 
            this.plugin.progressIndicator
        );
    }
} 