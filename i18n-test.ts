import { App, Modal, Setting, Notice } from 'obsidian';
import { t, getCurrentLang, clearTranslationCache } from './i18n';

/**
 * 国际化测试模态窗口
 * 用于测试不同语言的翻译效果
 */
export class I18nTestModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    /**
     * 显示国际化测试界面
     */
    onOpen() {
        const { contentEl } = this;

        contentEl.createEl('h2', { text: 'Smart Reader - Language Test' });

        // 创建语言选择测试
        new Setting(contentEl)
            .setName('Test Language Detection')
            .setDesc('Current detected language')
            .addButton(button => 
                button
                    .setButtonText('Detect Language')
                    .onClick(() => {
                        const currentLang = getCurrentLang(this.app);
                        new Notice(`Current language: ${currentLang}`);
                        console.log(`SmartReader: Current language detected: ${currentLang}`);
                    })
            );

        // 创建翻译缓存清除测试
        new Setting(contentEl)
            .setName('Clear Translation Cache')
            .setDesc('Force refresh language settings')
            .addButton(button => 
                button
                    .setButtonText('Clear Cache')
                    .onClick(() => {
                        clearTranslationCache();
                        new Notice('Translation cache cleared. Language will be re-detected.');
                    })
            );

        // 测试常用翻译键
        const testKeys = [
            'smartreader.settings.behavior',
            'smartreader.settings.auto_process',
            'smartreader.settings.highlight_style',
            'smartreader.commands.toggle',
            'smartreader.status.enabled'
        ];

        contentEl.createEl('h3', { text: 'Translation Test' });
        
        testKeys.forEach(key => {
            const translation = t(this.app, key);
            const div = contentEl.createDiv();
            div.innerHTML = `<strong>${key}:</strong> ${translation}`;
        });

        // 添加手动语言切换测试
        contentEl.createEl('h3', { text: 'Manual Language Test' });
        
        const languageTestDiv = contentEl.createDiv();
        languageTestDiv.style.marginTop = '10px';
        
        ['auto', 'en', 'zh', 'ja'].forEach(lang => {
            const button = languageTestDiv.createEl('button', {
                text: lang === 'auto' ? 'Auto' : lang.toUpperCase(),
                cls: 'mod-cta'
            });
            button.style.marginRight = '10px';
            button.addEventListener('click', () => {
                // 模拟不同语言设置
                const mockSettings = { language: lang as 'auto' | 'en' | 'zh' | 'ja' };
                const testTranslation = t(this.app, 'smartreader.settings.behavior', mockSettings);
                new Notice(`Language: ${lang}, Translation: ${testTranslation}`);
            });
        });

        // 添加关闭按钮
        new Setting(contentEl)
            .addButton(button => 
                button
                    .setButtonText('Close')
                    .onClick(() => {
                        this.close();
                    })
            );
    }
    
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
} 