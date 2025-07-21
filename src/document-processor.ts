import { MarkdownView, WorkspaceLeaf } from "obsidian";
import { SmartReaderSettings } from "./types";
import { ProgressIndicator } from "./progress-indicator";
import { findProcessableElements, removeAllProcessing, isElementProcessed, markElementAsProcessed, safelySetInnerHTML } from "./utils";
import { TextProcessor } from "./processor";
import { logger } from './logger';

/**
 * 文档处理器类
 * 负责处理文档的高亮标记
 */
export class DocumentProcessor {
    private settings: SmartReaderSettings;
    private progressIndicator: ProgressIndicator | null = null;
    private textProcessor: TextProcessor;
    
    constructor(settings: SmartReaderSettings, progressIndicator?: ProgressIndicator) {
        this.settings = settings;
        this.progressIndicator = progressIndicator || null;
        this.textProcessor = new TextProcessor(settings);
    }
    
    /**
     * 处理当前活动文档
     * @param leaf 工作区叶子
     * @param processAll 是否处理全部内容，默认false只处理可见区域
     * @returns 是否成功处理
     */
    public processActiveDocument(leaf: WorkspaceLeaf, processAll: boolean = false): boolean {
        try {
            // 检查是否为Markdown视图
            const view = leaf.view;
            if (!(view instanceof MarkdownView)) {
                return false;
            }
            
            // 检查是否为预览模式
            if (view.getMode() !== 'preview') {
                return false;
            }
            
            // 获取预览模式内容容器
            const contentEl = view.contentEl.querySelector('.markdown-preview-view');
            if (!contentEl) {
                return false;
            }
            
            // 显示处理进度
            if (this.progressIndicator) {
                this.progressIndicator.show();
            }
            
            // 清除现有处理
            this.clearActiveDocument(leaf);
            
            let elements: HTMLElement[];
            
            if (processAll) {
                // 处理所有元素
                elements = findProcessableElements(contentEl as HTMLElement);
            } else {
                // 只处理可见区域的元素
                elements = this.findVisibleElements(contentEl as HTMLElement);
            }
            
            // 如果没有可处理的元素，直接返回
            if (elements.length === 0) {
                if (this.progressIndicator) {
                    this.progressIndicator.showComplete();
                }
                return true;
            }
            
            logger.debug(`处理 ${elements.length} 个元素 (processAll: ${processAll})`);
            
            // 处理每个元素
            elements.forEach((element, index) => {
                this.processElement(element);
                
                // 更新进度
                if (this.progressIndicator) {
                    const progress = Math.round((index + 1) / elements.length * 100);
                    this.progressIndicator.updateProgress(progress);
                }
            });
            
            return true;
        } catch (error) {
            console.error('Error processing document:', error);
            
            // 显示错误
            if (this.progressIndicator) {
                this.progressIndicator.showError();
            }
            
            return false;
        }
    }
    
    /**
     * 查找可见区域的元素
     * @param container 容器元素
     * @returns 可见区域的可处理元素数组
     */
    private findVisibleElements(container: HTMLElement): HTMLElement[] {
        // 获取所有可处理的元素
        const allElements = findProcessableElements(container);
        const visibleElements: HTMLElement[] = [];
        
        // 获取视口的可见区域
        const viewportTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportBottom = viewportTop + window.innerHeight;
        
        // 添加较大的缓冲区，确保初始加载时处理足够的内容
        const buffer = window.innerHeight * 1; // 一屏高度的缓冲区
        const expandedTop = Math.max(0, viewportTop - buffer);
        const expandedBottom = viewportBottom + buffer;
        
        // 遍历元素，检查是否在扩展可见区域内
        allElements.forEach(element => {
            // 获取元素相对于页面的位置
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + viewportTop;
            const elementBottom = rect.bottom + viewportTop;
            
            // 检查元素是否在扩展的可见区域内
            const isVisible = 
                (elementTop >= expandedTop && elementTop <= expandedBottom) || 
                (elementBottom >= expandedTop && elementBottom <= expandedBottom) ||
                (elementTop <= expandedTop && elementBottom >= expandedBottom);
            
            if (isVisible) {
                visibleElements.push(element);
            }
        });
        
        return visibleElements;
    }
    
    /**
     * 处理元素数组
     * @param elements 要处理的元素数组
     */
    public processElements(elements: HTMLElement[]): void {
        if (elements.length === 0) return;
        
        try {
            // 处理每个元素
            elements.forEach(element => {
                this.processElement(element);
            });
        } catch (error) {
            console.error('Error processing elements:', error);
        }
    }
    
    /**
     * 清除当前活动文档的处理
     * @param leaf 工作区叶子
     * @returns 是否成功清除
     */
    public clearActiveDocument(leaf: WorkspaceLeaf): boolean {
        try {
            // 检查是否为Markdown视图
            const view = leaf.view;
            if (!(view instanceof MarkdownView)) {
                return false;
            }
            
            // 检查是否为预览模式
            if (view.getMode() !== 'preview') {
                return false;
            }
            
            // 获取预览模式内容容器
            const contentEl = view.contentEl.querySelector('.markdown-preview-view');
            if (!contentEl) {
                return false;
            }
            
            // 移除所有处理
            removeAllProcessing(contentEl as HTMLElement);
            
            return true;
        } catch (error) {
            console.error('Error clearing document:', error);
            return false;
        }
    }
    
    /**
     * 处理单个元素
     * @param element 要处理的元素
     */
    private processElement(element: HTMLElement): void {
        // 如果元素已处理，跳过
        if (isElementProcessed(element)) {
            return;
        }
        
        // 标记为已处理
        markElementAsProcessed(element);
        
        // 获取元素内容
        const text = element.textContent || '';
        
        // 使用TextProcessor处理文本
        const html = this.textProcessor.process(text);
        
        // 更新元素内容
        safelySetInnerHTML(element, html);
    }
} 