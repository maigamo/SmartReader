import { MarkdownView, WorkspaceLeaf } from 'obsidian';
import { SmartReaderPlugin } from './main';
import { SmartReaderSettings } from './types';

/**
 * 样式管理器类
 * 负责处理样式切换、清理和同步
 */
export class StyleManager {
    private plugin: SmartReaderPlugin;
    
    constructor(plugin: SmartReaderPlugin) {
        this.plugin = plugin;
    }
    
    /**
     * 当样式设置改变时调用
     * @param oldStyle 旧样式
     * @param newStyle 新样式
     */
    public async onStyleChanged(oldStyle: string, newStyle: string): Promise<void> {
        // 更新CSS变量
        this.updateCSSVariables();
        
        // 重新处理当前活动文档
        await this.reprocessCurrentDocument();
    }
    
    /**
     * 当颜色设置改变时调用
     * @param newColor 新颜色
     */
    public async onColorChanged(newColor: string): Promise<void> {
        // 使用CSS属性而不是直接设置样式
        document.body.setAttribute('data-highlight-color', newColor);
        
        // 如果当前样式使用颜色，重新处理文档
        if (this.isColorBasedStyle(this.plugin.settings.highlightStyle)) {
            await this.reprocessCurrentDocument();
        }
    }
    
    /**
     * 清理所有文档的旧样式
     */
    public async cleanupAllDocuments(): Promise<void> {
        const markdownLeaves = this.plugin.app.workspace.getLeavesOfType('markdown');
        
        for (const leaf of markdownLeaves) {
            const view = leaf.view;
            if (view instanceof MarkdownView && view.getMode() === 'preview') {
                await this.cleanupDocument(leaf);
            }
        }
    }
    
    /**
     * 清理单个文档的样式
     * @param leaf 文档叶子节点
     */
    public async cleanupDocument(leaf: WorkspaceLeaf): Promise<void> {
        const view = leaf.view;
        if (!(view instanceof MarkdownView) || view.getMode() !== 'preview') {
            return;
        }
        
        // 获取预览容器
        const previewContainer = view.contentEl.querySelector('.markdown-preview-view');
        if (!previewContainer) {
            return;
        }
        
        // 移除所有高亮标记
        this.removeAllHighlights(previewContainer as HTMLElement);
    }
    
    /**
     * 文档加载时的初始化清理
     * @param leaf 文档叶子节点
     */
    public async onDocumentLoad(leaf: WorkspaceLeaf): Promise<void> {
        // 清理可能残留的旧样式
        await this.cleanupDocument(leaf);
        
        // 短暂延迟后，如果插件启用则处理文档
        setTimeout(() => {
            if (this.plugin.settings.isEnabled && this.plugin.settings.autoProcess) {
                this.plugin.eventHandler.processDocument(leaf);
            }
        }, 100);
    }
    
    /**
     * 更新CSS变量
     */
    private updateCSSVariables(): void {
        // 使用CSS属性而不是直接设置样式
        document.body.setAttribute('data-highlight-color', this.plugin.settings.highlightColor);
    }
    
    /**
     * 重新处理当前活动文档
     */
    private async reprocessCurrentDocument(): Promise<void> {
        const activeLeaf = this.plugin.app.workspace.activeLeaf;
        if (!activeLeaf || !this.plugin.settings.isEnabled) {
            return;
        }
        
        const view = activeLeaf.view;
        if (!(view instanceof MarkdownView) || view.getMode() !== 'preview') {
            return;
        }
        
        // 先清除旧样式
        await this.cleanupDocument(activeLeaf);
        
        // 短暂延迟后重新处理
        setTimeout(() => {
            this.plugin.eventHandler.processDocument(activeLeaf);
        }, 100);
    }
    
    /**
     * 检查样式是否基于颜色
     * @param style 样式名称
     * @returns 是否基于颜色
     */
    private isColorBasedStyle(style: string): boolean {
        return style === 'color' || style === 'bold_underline';
    }
    
    /**
     * 移除所有高亮标记
     * @param container 容器元素
     */
    private removeAllHighlights(container: HTMLElement): void {
        // 查找所有高亮元素
        const highlights = container.querySelectorAll('.smart-reader-highlight, .smart-reader-highlight-color, .smart-reader-highlight-underline, .smart-reader-highlight-bold-underline');
        
        highlights.forEach(highlight => {
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
        const processedElements = container.querySelectorAll('.smart-reader-processed');
        processedElements.forEach(element => {
            element.classList.remove('smart-reader-processed');
        });
        
        // 规范化文本节点
        container.normalize();
    }

    /**
     * 更新高亮颜色
     * @param newColor 新的颜色值
     */
    updateHighlightColor(newColor: string): void {
        // 更新设置
        this.plugin.settings.highlightColor = newColor;
        
        // 使用CSS类而不是直接设置样式
        document.body.setAttribute('data-highlight-color', newColor);
        
        // 应用新样式到所有已处理的元素
        this.applyHighlightStyle();
    }

    /**
     * 初始化样式管理器
     */
    initialize(): void {
        this.loadStyles();
        // 设置初始颜色属性
        document.body.setAttribute('data-highlight-color', this.plugin.settings.highlightColor);
    }
} 