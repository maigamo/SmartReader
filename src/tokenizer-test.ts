import { Modal, App } from 'obsidian';

/**
 * 分词器测试模态窗口
 * 用于测试不同语言的分词效果
 */
export class TokenizerTestModal extends Modal {
    /**
     * 显示分词测试界面
     */
    onOpen() {
        const { contentEl } = this;
        
        // 创建标题
        contentEl.createEl('h2', { text: 'SmartReader Tokenizer Test' });
        
        // 创建测试界面
        this.createTestInterface(contentEl);
    }
    
    /**
     * 创建测试界面
     */
    private createTestInterface(contentEl: HTMLElement) {
        const container = contentEl.createDiv({ cls: 'tokenizer-test-container' });
        
        // 英文分词测试
        const englishSection = container.createDiv();
        englishSection.createEl('h3', { text: 'English Tokenization' });
        
        // 英文输入
        const englishInput = englishSection.createEl('textarea', {
            attr: {
                placeholder: 'Enter English text here...',
                rows: '4',
                style: 'width: 100%; margin-bottom: 10px;'
            }
        });
        englishInput.value = 'The quick brown fox jumps over the lazy dog. It was the best of times, it was the worst of times.';
        
        // 英文测试按钮
        const englishButton = englishSection.createEl('button', {
            text: 'Tokenize English',
            attr: {
                style: 'margin-right: 10px;'
            }
        });
        
        // 英文结果区域
        const englishResult = englishSection.createDiv({
            cls: 'tokenizer-result',
            attr: {
                style: 'margin-top: 10px; padding: 10px; border: 1px solid #ccc; min-height: 50px;'
            }
        });
        
        // 英文按钮点击事件
        englishButton.addEventListener('click', () => {
            this.processEnglish(englishInput.value, englishResult);
        });
        
        // 添加分隔线
        container.createEl('hr');
        
        // 中文分词测试
        const chineseSection = container.createDiv({
            attr: {
                style: 'margin-top: 20px;'
            }
        });
        chineseSection.createEl('h3', { text: '中文分词测试' });
        
        // 中文输入
        const chineseInput = chineseSection.createEl('textarea', {
            attr: {
                placeholder: '请在此输入中文文本...',
                rows: '4',
                style: 'width: 100%; margin-bottom: 10px;'
            }
        });
        chineseInput.value = '北京大学是中国最著名的大学之一。今天天气真好，我们一起去公园散步吧。';
        
        // 中文测试按钮
        const chineseButton = chineseSection.createEl('button', {
            text: '分词测试',
            attr: {
                style: 'margin-right: 10px;'
            }
        });
        
        // 中文结果区域
        const chineseResult = chineseSection.createDiv({
            cls: 'tokenizer-result',
            attr: {
                style: 'margin-top: 10px; padding: 10px; border: 1px solid #ccc; min-height: 50px;'
            }
        });
        
        // 中文按钮点击事件
        chineseButton.addEventListener('click', () => {
            this.processChinese(chineseInput.value, chineseResult);
        });
    }
    
    /**
     * 处理英文分词
     */
    private processEnglish(text: string, resultEl: HTMLElement) {
        resultEl.empty();
        
        try {
            // 简单的空格分词
            const tokens = text.split(/(\s+|[.,!?;:'"()\[\]{}])/);
            const filteredTokens = tokens.filter(t => t.trim() !== '');
            
            // 显示结果
            resultEl.createEl('div', {
                text: `Found ${filteredTokens.length} tokens`,
                attr: { style: 'font-weight: bold; margin-bottom: 10px;' }
            });
            
            // 显示标记
            const tokensEl = resultEl.createDiv({
                cls: 'tokens-container',
                attr: { style: 'display: flex; flex-wrap: wrap; gap: 5px;' }
            });
            
            tokens.forEach(token => {
                if (token.trim() === '') return;
                
                tokensEl.createSpan({
                    text: token,
                    attr: {
                        style: 'background-color: #f0f0f0; padding: 3px 6px; border-radius: 3px; font-family: monospace;'
                    }
                });
            });
            
            // 显示性能信息
            const infoEl = resultEl.createDiv({
                attr: { style: 'margin-top: 15px; font-size: 0.9em; color: #666;' }
            });
            
            infoEl.createEl('div', {
                text: `Note: This is a simplified tokenization. In the actual plugin, we use the compromise.js library for better results.`,
                attr: { style: 'font-style: italic;' }
            });
            
            // 显示原始文本
            resultEl.createEl('div', {
                text: 'Original text:',
                attr: { style: 'margin-top: 15px; font-weight: bold;' }
            });
            
            resultEl.createEl('div', {
                text: text,
                attr: { style: 'font-family: monospace; white-space: pre-wrap;' }
            });
        } catch (error) {
            console.error('Error tokenizing English text:', error);
            resultEl.setText('Error processing text');
        }
    }
    
    /**
     * 处理中文分词
     */
    private processChinese(text: string, resultEl: HTMLElement) {
        resultEl.empty();
        
        try {
            // 简单的字符分词（实际应使用结巴分词）
            const tokens = Array.from(text);
            
            // 显示结果
            resultEl.createEl('div', {
                text: `找到 ${tokens.length} 个标记`,
                attr: { style: 'font-weight: bold; margin-bottom: 10px;' }
            });
            
            // 显示标记
            const tokensEl = resultEl.createDiv({
                cls: 'tokens-container',
                attr: { style: 'display: flex; flex-wrap: wrap; gap: 5px;' }
            });
            
            tokens.forEach(token => {
                tokensEl.createSpan({
                    text: token,
                    attr: {
                        style: 'background-color: #f0f0f0; padding: 3px 6px; border-radius: 3px; font-family: monospace;'
                    }
                });
            });
            
            // 显示说明
            resultEl.createEl('div', {
                text: `注：这是简化的分词方式。在实际插件中，我们使用结巴分词（jieba-wasm）获得更好的效果。`,
                attr: { style: 'margin-top: 15px; font-style: italic; font-size: 0.9em; color: #666;' }
            });
            
            // 显示原始文本
            resultEl.createEl('div', {
                text: '原始文本:',
                attr: { style: 'margin-top: 15px; font-weight: bold;' }
            });
            
            resultEl.createEl('div', {
                text: text,
                attr: { style: 'font-family: monospace; white-space: pre-wrap;' }
            });
        } catch (error) {
            console.error('Error tokenizing Chinese text:', error);
            resultEl.setText('处理文本时出错');
        }
    }
    
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
} 