import { MarkdownView, WorkspaceLeaf } from 'obsidian';
import { SmartReaderPlugin } from './main';
import { DocumentOperationHandler } from './document-operation-handler';
import { DocumentProcessor } from './document-processor';
import { logger } from './logger';

/**
 * 事件处理器类
 * 负责监听和处理Obsidian中的各种事件
 */
export class EventHandler {
    private plugin: SmartReaderPlugin;
    private documentOperationHandler: DocumentOperationHandler;
    private boundScrollHandler: () => void;
    private scrollTimeout: number | null = null;
    private isProcessingScroll: boolean = false;
    
    constructor(plugin: SmartReaderPlugin) {
        this.plugin = plugin;
        this.documentOperationHandler = new DocumentOperationHandler(plugin);
        // 绑定滚动处理函数，确保引用一致
        this.boundScrollHandler = this.handleScroll.bind(this);
    }
    
    /**
     * 初始化事件监听器
     */
    public initialize(): void {
        this.registerWorkspaceEvents();
        this.registerFileEvents();
        this.registerScrollEvents();
        this.registerSettingsEvents();
    }
    
    /**
     * 注册工作区事件
     */
    private registerWorkspaceEvents(): void {
        // 监听活动叶子变化
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('active-leaf-change', (leaf: WorkspaceLeaf | null) => {
                if (leaf) {
                    this.documentOperationHandler.handleActiveLeafChange(leaf);
                }
            })
        );
        
        // 监听布局变化
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('layout-change', () => {
                // 布局变化时重新绑定滚动事件
                this.bindScrollEvents();
            })
        );
    }
    
    /**
     * 注册文件事件
     */
    private registerFileEvents(): void {
        // 监听文件修改事件
        this.plugin.registerEvent(
            this.plugin.app.vault.on('modify', async (file) => {
                // 获取当前活动的叶子节点
                const activeLeaf = this.plugin.app.workspace.activeLeaf;
                if (activeLeaf) {
                    const view = activeLeaf.view;
                    
                    // 如果是预览模式，且开启了自动处理，处理文件变更
                    if (view instanceof MarkdownView && 
                        view.getMode() === 'preview' && 
                        this.plugin.settings.isEnabled && 
                        this.plugin.settings.autoProcess) {
                        
                        // 延迟处理文档以避免频繁刷新
                        const delay = Math.max(this.plugin.settings.autoProcessDelay * 1000, 1000);
                        setTimeout(() => {
                            this.documentOperationHandler.processDocument(activeLeaf);
                        }, delay);
                    }
                }
            })
        );
    }
    
    /**
     * 注册滚动事件
     */
    private registerScrollEvents(): void {
        // 初始绑定滚动事件
        this.bindScrollEvents();
    }
    
    /**
     * 绑定滚动事件到预览容器
     */
    private bindScrollEvents(): void {
        // 等待DOM更新
        setTimeout(() => {
            const previewContainer = document.querySelector('.markdown-preview-view');
            if (previewContainer && !previewContainer.hasAttribute('data-smart-reader-bound')) {
                previewContainer.addEventListener('scroll', this.boundScrollHandler, { passive: true });
                previewContainer.setAttribute('data-smart-reader-bound', 'true');
                
                logger.debug('绑定滚动监听器到预览容器');
            }
        }, 100);
    }
    
    /**
     * 处理滚动事件
     */
    private handleScroll(): void {
        // 防抖处理
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        this.scrollTimeout = setTimeout(() => {
            this.processVisibleElements();
        }, 150) as unknown as number;
    }
    
    /**
     * 处理可见元素
     */
    private processVisibleElements(): void {
        if (this.isProcessingScroll) {
            return;
        }
        
        this.isProcessingScroll = true;
        
        try {
            // 检查是否启用功能
            if (!this.plugin.settings.isEnabled) {
                return;
            }
            
            // 获取当前活动叶子
            const activeLeaf = this.plugin.app.workspace.activeLeaf;
            if (!activeLeaf || !(activeLeaf.view instanceof MarkdownView)) {
                return;
            }
            
            // 检查是否为预览模式
            if (activeLeaf.view.getMode() !== 'preview') {
                return;
            }
            
            // 在这里可以添加增量处理逻辑
            // 目前简化为记录日志
            logger.debug('处理滚动事件中的可见元素');
            
        } finally {
            this.isProcessingScroll = false;
        }
    }
    
    /**
     * 注册设置变化事件
     */
    private registerSettingsEvents(): void {
        // 当设置变化时，更新文档操作处理器
        this.plugin.register(() => {
            this.documentOperationHandler.updateDocumentProcessor();
        });
    }
    
    // 代理方法，保持向后兼容
    public processDocument(leaf: WorkspaceLeaf): void {
        this.documentOperationHandler.processDocument(leaf);
    }
    
    public clearDocument(leaf: WorkspaceLeaf): void {
        this.documentOperationHandler.clearDocument(leaf);
    }
    
    public toggleProcessing(): void {
        this.documentOperationHandler.toggleProcessing();
    }
} 