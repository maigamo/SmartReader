import { SmartReaderSettings } from './types';

/**
 * 文本处理器类
 * 负责对文本内容进行处理和高亮
 */
export class TextProcessor {
    private settings: SmartReaderSettings;
    
    constructor(settings: SmartReaderSettings) {
        this.settings = settings;
    }
    
    /**
     * 处理文本
     * @param text 要处理的文本
     * @returns 处理后的HTML
     */
    public process(text: string): string {
        // 根据文本特征选择合适的处理方法
        if (this.isChineseText(text)) {
            return this.processChineseText(text);
        } else {
            return this.processEnglishText(text);
        }
    }
    
    /**
     * 判断是否为中文文本
     * @param text 要检查的文本
     * @returns 是否为中文文本
     */
    private isChineseText(text: string): boolean {
        // 检查中文字符的占比
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
        if (!chineseChars) return false;
        
        // 如果中文字符占比超过15%，认为是中文文本
        return chineseChars.length / text.length > 0.15;
    }
    
    /**
     * 处理中文文本
     * @param text 中文文本
     * @returns 处理后的HTML
     */
    private processChineseText(text: string): string {
        if (this.settings.intervalType === 'character') {
            // 对于字符间隔模式，直接按字符处理整个文本
            return this.processTextByCharacters(text);
        } else {
            // 按词间隔处理中文文本
            // 先分割文本
            const sentences = this.splitChineseIntoSentences(text);
            
            // 将每个句子中的单个汉字视为一个"词"
            let result = '';
            // 将wordCount初始化为0，从第一个词开始计数
            let wordCount = 0;
            
            for (const sentence of sentences) {
                // 如果是标点符号或空白，直接添加
                if (/^[\s,.!?;:'"()\[\]{}，。？！：；""''（）【】《》\n\r]+$/.test(sentence)) {
                    result += sentence;
                    continue;
                }
                
                // 按词处理每个汉字
                const chars = Array.from(sentence);
                for (const char of chars) {
                    wordCount++;
                    
                    // 判断是否达到高亮位置（每隔intervalValue个词高亮一次）
                    if (wordCount % this.settings.intervalValue === 0) {
                        result += this.wrapWithHighlight(char);
                        console.log(`中文高亮词: '${char}' at 位置 ${wordCount}`);
                    } else {
                        result += char;
                    }
                }
            }
            
            return result;
        }
    }
    
    /**
     * 将中文文本分割为句子
     * @param text 中文文本
     * @returns 句子数组
     */
    private splitChineseIntoSentences(text: string): string[] {
        // 中文常见标点符号 - 使用Unicode编码避免源码编码问题
        const punctRegex = new RegExp('([\\u3002\\uff0c\\u3001\\uff1b\\uff1a\\uff1f\\uff01\\u201c\\u201d\\u2018\\u2019\\uff08\\uff09\\u3010\\u3011\\u300a\\u300b\\u2026\\u2014\\uff5e\\u00b7])|([\\s]+)', 'g');
        
        // 保留标点的分割
        const parts: string[] = [];
        let lastIndex = 0;
        
        // 查找所有标点和空白
        let match;
        while ((match = punctRegex.exec(text)) !== null) {
            // 添加标点前的文本
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            
            // 添加标点本身
            parts.push(match[0]);
            lastIndex = match.index + match[0].length;
        }
        
        // 添加最后部分
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        
        return parts;
    }
    
    /**
     * 处理英文文本
     * @param text 英文文本
     * @returns 处理后的HTML
     */
    private processEnglishText(text: string): string {
        if (this.settings.intervalType === 'character') {
            // 对于字符间隔模式，直接按字符处理整个文本
            return this.processTextByCharacters(text);
        } else {
            // 按词间隔处理英文文本
            const tokens = text.split(/(\s+|[.,!?;:'"()\[\]{}，。？！：；""''（）【】《》\n\r])/);
            let result = '';
            // 将wordCount初始化为0，从第一个词开始计数
            let wordCount = 0;
            
            for (const token of tokens) {
                // 跳过空白字符和标点
                if (/^[\s,.!?;:'"()\[\]{}，。？！：；""''（）【】《》\n\r]+$/.test(token)) {
                    result += token;
                    continue;
                }
                
                wordCount++;
                
                // 判断是否达到高亮位置（每隔intervalValue个词高亮一次）
                if (wordCount % this.settings.intervalValue === 0) {
                    result += this.wrapWithHighlight(token);
                    console.log(`英文高亮词: '${token}' at 位置 ${wordCount}`);
                } else {
                    result += token;
                }
            }
            
            return result;
        }
    }
    
    /**
     * 按字符处理文本
     * @param text 要处理的文本
     * @returns 处理后的HTML
     */
    private processTextByCharacters(text: string): string {
        console.log(`处理文本，字符间隔值: ${this.settings.intervalValue}`);
        
        // 创建一个结果数组
        const result: string[] = [];
        let effectiveCharCount = 0; // 有效字符计数（不包括空白和标点）
        
        // 获取所有字符
        const chars = Array.from(text);
        
        // 对每个字符位置进行处理
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            
            // 如果当前字符是空白或标点，直接添加并继续
            if (/^[\s,.!?;:'"()\[\]{}，。？！：；""''（）【】《》\n\r]$/.test(char)) {
                result.push(char);
                continue;
            }
            
            // 累计有效字符数
            effectiveCharCount++;
            
            // 检查是否达到了高亮间隔（每隔intervalValue个字符高亮一次）
            if (effectiveCharCount % this.settings.intervalValue === 0) {
                // 添加高亮字符
                result.push(this.wrapWithHighlight(char));
                console.log(`高亮字符: '${char}' at 位置 ${effectiveCharCount}`);
            } else {
                // 普通字符
                result.push(char);
            }
        }
        
        // 输出调试信息
        console.log(`总字符数: ${chars.length}, 有效字符数: ${effectiveCharCount}`);
        
        // 将结果数组连接为字符串
        return result.join('');
    }
    
    /**
     * 包装高亮标记
     * @param text 要高亮的文本
     * @returns 高亮HTML
     */
    private wrapWithHighlight(text: string): string {
        const className = this.getHighlightClass();
        return `<span class="smart-reader-highlight${className ? ' ' + className : ''}">${text}</span>`;
    }
    
    /**
     * 获取高亮样式类
     * @returns 高亮CSS类名
     */
    private getHighlightClass(): string {
        switch (this.settings.highlightStyle) {
            case 'color':
                return 'smart-reader-highlight-color';
            case 'underline':
                return 'smart-reader-highlight-underline';
            case 'bold_underline':
                return 'smart-reader-highlight-bold-underline';
            case 'bold':
            default:
                return '';
        }
    }
} 