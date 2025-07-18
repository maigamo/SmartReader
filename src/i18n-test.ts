import { App, Modal, Setting } from 'obsidian';
import { getCurrentLang, t } from './i18n';

/**
 * 国际化测试模态窗口
 * 用于测试不同语言的翻译效果
 */
export class I18nTestModal extends Modal {
    /**
     * 显示国际化测试界面
     */
    onOpen() {
        const { contentEl } = this;
        const currentLang = getCurrentLang(this.app);
        
        // 创建标题
        contentEl.createEl('h2', { text: 'SmartReader I18n Test' });
        
        // 显示当前语言
        contentEl.createEl('p', { 
            text: `Current language: ${currentLang}`,
            attr: { style: 'font-weight: bold;' }
        });
        
        // 添加语言切换按钮
        const buttonContainer = contentEl.createDiv({ cls: 'language-buttons' });
        ['en', 'zh', 'ja'].forEach(lang => {
            const btn = buttonContainer.createEl('button', { text: lang.toUpperCase() });
            btn.addEventListener('click', () => {
                // 在实际情况下，这里会切换语言并刷新界面
                // 由于无法在运行时更改Obsidian的语言设置，这里只是显示消息
                const message = contentEl.createEl('p', {
                    text: `Would change language to ${lang} (Demo only)`,
                    attr: { style: 'color: #0a84ff;' }
                });
                
                // 3秒后移除消息
                setTimeout(() => message.remove(), 3000);
            });
        });
        
        // 创建翻译测试表格
        this.createTranslationTable(contentEl);
    }
    
    /**
     * 创建翻译测试表格
     */
    private createTranslationTable(contentEl: HTMLElement) {
        // 创建表格
        const table = contentEl.createEl('table');
        table.addClass('i18n-test-table');
        
        // 添加表头
        const header = table.createEl('tr');
        header.createEl('th', { text: 'Translation Key' });
        header.createEl('th', { text: 'Translation Value' });
        
        // 添加一些测试键值
        const testKeys = [
            'smartreader.settings.behavior',
            'smartreader.settings.auto_process',
            'smartreader.settings.highlight_style',
            'smartreader.commands.toggle',
            'smartreader.status.enabled',
            'smartreader.messages.no_active_file'
        ];
        
        // 为每个键创建一行
        testKeys.forEach(key => {
            const row = table.createEl('tr');
            row.createEl('td', { text: key });
            row.createEl('td', { text: t(this.app, key) });
        });
    }
    
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
} 