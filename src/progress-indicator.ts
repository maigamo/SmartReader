import { Notice, setIcon } from 'obsidian';
import { t } from './i18n';
import { SmartReaderPlugin } from './main';

/**
 * 进度指示器类
 * 负责显示处理进度和状态反馈
 */
export class ProgressIndicator {
    private plugin: SmartReaderPlugin;
    private containerEl: HTMLElement;
    private progressBarEl: HTMLElement;
    private statusEl: HTMLElement | null = null;
    private isVisible: boolean = false;
    private progress: number = 0;
    private hideTimeout: number | null = null;
    
    constructor(plugin: SmartReaderPlugin) {
        this.plugin = plugin;
        
        // 创建进度指示器容器
        this.containerEl = document.createElement('div');
        this.containerEl.classList.add('smart-reader-progress-container');
        document.body.appendChild(this.containerEl);
        
        // 创建进度条
        this.createProgressBar();
    }
    
    /**
     * 创建进度条UI
     */
    private createProgressBar(): void {
        // 添加CSS类
        this.containerEl.addClass('smart-reader-progress-container');
        
        // 创建标题行
        const titleRow = this.containerEl.createDiv({
            cls: 'smart-reader-progress-title-row'
        });
        
        // 添加图标
        const iconEl = titleRow.createSpan({
            cls: 'smart-reader-progress-icon'
        });
        setIcon(iconEl, 'book-open');
        
        // 添加标题
        const titleEl = titleRow.createSpan({
            cls: 'smart-reader-progress-title',
            text: 'SmartReader'
        });
        
        // 添加关闭按钮
        const closeEl = titleRow.createSpan({
            cls: 'smart-reader-progress-close'
        });
        setIcon(closeEl, 'x');
        closeEl.addEventListener('click', () => {
            this.hide();
        });
        
        // 创建状态文本
        this.statusEl = this.containerEl.createDiv({
            cls: 'smart-reader-progress-status'
        });
        
        this.statusEl.setText(t(this.plugin.app, 'smartreader.status.processing'));
        
        // 创建进度条容器
        const progressContainer = this.containerEl.createDiv({
            cls: 'smart-reader-progress-bar-container'
        });
        
        // 创建进度条
        this.progressBarEl = progressContainer.createDiv({
            cls: 'smart-reader-progress-bar'
        });
        
        // 默认隐藏
        this.hide();
    }
    
    /**
     * 显示进度指示器
     */
    public show(): void {
        // 取消之前的隐藏计时器
        this.cancelHideTimeout();
        
        // 如果不可见，显示
        if (!this.isVisible) {
            this.containerEl.addClass('visible');
            this.isVisible = true;
            
            // 重置进度
            this.updateProgress(0);
        }
    }
    
    /**
     * 隐藏进度指示器
     */
    public hide(): void {
        // 取消之前的隐藏计时器
        this.cancelHideTimeout();
        
        // 如果可见，隐藏
        if (this.isVisible) {
            this.containerEl.removeClass('visible');
            this.isVisible = false;
        }
    }
    
    /**
     * 取消隐藏计时器
     */
    private cancelHideTimeout(): void {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
    
    /**
     * 更新进度值
     * @param progress 进度百分比（0-100）
     */
    public updateProgress(progress: number): void {
        // 确保进度在有效范围内
        this.progress = Math.max(0, Math.min(100, progress));
        
        // 更新进度条宽度
        this.progressBarEl.style.width = `${this.progress}%`;
        
        // 如果到达100%，显示完成
        if (this.progress >= 100) {
            this.showComplete();
        }
    }
    
    /**
     * 显示完成状态
     * @param message 可选的完成消息
     */
    public showComplete(message?: string): void {
        // 取消之前的隐藏计时器
        this.cancelHideTimeout();
        
        // 显示100%进度
        this.updateProgress(100);
        
        // 更新状态文本
        if (this.statusEl) {
            const statusKey = message ? '' : 'smartreader.status.processed';
            this.statusEl.setText(message || t(this.plugin.app, statusKey));
        }
        
        // 延迟3秒后自动隐藏
        this.hideTimeout = setTimeout(() => {
            this.hide();
        }, 3000) as unknown as number;
    }
    
    /**
     * 显示错误状态
     * @param message 可选的错误消息
     */
    public showError(message?: string): void {
        // 取消之前的隐藏计时器
        this.cancelHideTimeout();
        
        // 确保可见
        this.show();
        
        // 更新状态文本
        if (this.statusEl) {
            const statusKey = message ? '' : 'smartreader.status.error';
            this.statusEl.setText(message || t(this.plugin.app, statusKey));
        }
        
        // 延迟5秒后自动隐藏
        this.hideTimeout = setTimeout(() => {
            this.hide();
        }, 5000) as unknown as number;
    }
    
    /**
     * 更新状态文本
     * @param statusKey 状态文本的翻译键
     */
    public updateStatus(statusKey: string): void {
        if (this.statusEl) {
            this.statusEl.setText(t(this.plugin.app, statusKey));
        }
    }
    
    /**
     * 显示处理取消
     */
    public showCancelled(): void {
        // 更新状态文本
        this.updateStatus('smartreader.status.cleared');
        
        // 自动隐藏
        this.hide();
    }
} 