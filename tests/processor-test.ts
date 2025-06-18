import { TextProcessor } from "../processor";
import { SmartReaderSettings, DEFAULT_SETTINGS } from "../types";

/**
 * 简单的文本处理器测试函数
 */
export function testTextProcessor(): void {
    console.group("TextProcessor Tests");
    
    // 创建测试用例
    const englishText = "This is a sample English text for testing the text processor. It should highlight every few words.";
    const chineseText = "这是一个用于测试文本处理器的中文示例文本。它应该每隔几个字或词进行高亮。";
    const mixedText = "This is a mixed text with some 中文 characters to test language detection.";
    
    // 测试不同设置
    testProcessorWithSettings(
        "English text with word interval",
        englishText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'word', intervalValue: 3 }
    );
    
    testProcessorWithSettings(
        "English text with character interval",
        englishText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'character', intervalValue: 5 }
    );
    
    testProcessorWithSettings(
        "Chinese text with word interval",
        chineseText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'word', intervalValue: 2 }
    );
    
    testProcessorWithSettings(
        "Chinese text with character interval",
        chineseText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'character', intervalValue: 3 }
    );
    
    testProcessorWithSettings(
        "Mixed text with word interval",
        mixedText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'word', intervalValue: 2 }
    );
    
    // 测试高亮样式
    testProcessorWithSettings(
        "Text with bold highlight",
        englishText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'word', intervalValue: 2, highlightStyle: 'bold' }
    );
    
    testProcessorWithSettings(
        "Text with color highlight",
        englishText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'word', intervalValue: 2, highlightStyle: 'color', highlightColor: '#FF5733' }
    );
    
    testProcessorWithSettings(
        "Text with underline highlight",
        englishText,
        { ...DEFAULT_SETTINGS, isEnabled: true, intervalType: 'word', intervalValue: 2, highlightStyle: 'underline' }
    );
    
    // 测试最小长度设置
    testProcessorWithSettings(
        "Text below minimum length",
        "Short text",
        { ...DEFAULT_SETTINGS, isEnabled: true, minProcessLength: 100 }
    );
    
    console.groupEnd();
}

/**
 * 使用指定设置测试文本处理器
 * @param testName 测试名称
 * @param text 测试文本
 * @param settings 测试设置
 */
function testProcessorWithSettings(testName: string, text: string, settings: SmartReaderSettings): void {
    console.group(testName);
    
    try {
        const processor = new TextProcessor(settings);
        const result = processor.process(text);
        
        console.log("Input:", text);
        console.log("Output:", result);
        console.log("Contains highlights:", result.includes("smart-reader-highlight"));
        
        // 简单验证
        if (settings.isEnabled && text.length >= settings.minProcessLength) {
            if (!result.includes("smart-reader-highlight")) {
                console.error("Test failed: Expected highlights but none found");
            } else {
                console.log("Test passed");
            }
        } else {
            if (result !== text) {
                console.error("Test failed: Text was modified when it shouldn't be");
            } else {
                console.log("Test passed");
            }
        }
    } catch (error) {
        console.error("Test error:", error);
    }
    
    console.groupEnd();
} 