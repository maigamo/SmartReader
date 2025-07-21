import { logger } from './logger';

/**
 * 主题管理器
 * 负责管理插件的所有样式，确保与主题兼容
 */
export class ThemeManager {
    private container: HTMLElement;
    private currentStyle: string = 'style1';
    private currentColor: string = '#ffeb3b';

    constructor() {
        this.container = document.documentElement;
        this.initializeTheme();
    }

    /**
     * 初始化主题系统
     */
    private initializeTheme(): void {
        this.addThemeClasses();
        this.updateCSSVariables();
    }

    /**
     * 添加主题相关的CSS类到body
     */
    private addThemeClasses(): void {
        document.body.classList.add('smart-reader-active');
    }

    /**
     * 更新CSS变量
     */
    private updateCSSVariables(): void {
        this.container.style.setProperty('--smart-reader-highlight-color', this.currentColor);
        this.container.style.setProperty('--smart-reader-style', this.currentStyle);
    }

    /**
     * 设置高亮样式
     */
    public setHighlightStyle(style: string): void {
        const oldStyle = this.currentStyle;
        this.currentStyle = style;
        
        // 移除旧的样式类
        document.body.classList.remove(`smart-reader-${oldStyle}`);
        // 添加新的样式类
        document.body.classList.add(`smart-reader-${style}`);
        
        this.updateCSSVariables();
        logger.debug(`样式从 ${oldStyle} 切换到 ${style}`);
    }

    /**
     * 设置高亮颜色
     */
    public setHighlightColor(color: string): void {
        this.currentColor = color;
        this.updateCSSVariables();
        logger.debug(`颜色更新为 ${color}`);
    }

    /**
     * 获取当前高亮样式
     */
    public getCurrentStyle(): string {
        return this.currentStyle;
    }

    /**
     * 获取当前高亮颜色
     */
    public getCurrentColor(): string {
        return this.currentColor;
    }

    /**
     * 应用设置中的样式
     */
    public applySettings(settings: { highlightStyle: string; highlightColor: string }): void {
        this.setHighlightStyle(settings.highlightStyle);
        this.setHighlightColor(settings.highlightColor);
    }

    /**
     * 清理主题相关的类和变量
     */
    public cleanup(): void {
        document.body.classList.remove('smart-reader-active');
        document.body.classList.remove(`smart-reader-${this.currentStyle}`);
        
        // 移除CSS变量
        this.container.style.removeProperty('--smart-reader-highlight-color');
        this.container.style.removeProperty('--smart-reader-style');
        
        logger.debug('主题清理完成');
    }

    /**
     * 创建带有样式类的元素
     */
    public createStyledElement(tagName: string, className?: string): HTMLElement {
        const element = document.createElement(tagName);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    /**
     * 为进度条元素应用样式
     */
    public styleProgressBar(element: HTMLElement, progress: number): void {
        element.classList.add('smart-reader-progress-bar');
        element.style.setProperty('--progress-width', `${progress}%`);
    }

    /**
     * 为设置面板元素应用样式
     */
    public styleSettingsElement(element: HTMLElement, type: 'slider' | 'input'): void {
        element.classList.add(`smart-reader-settings-${type}`);
    }
} 