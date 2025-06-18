import { App } from 'obsidian';

// 支持的语言
export const SUPPORTED_LANGUAGES = ['en', 'zh', 'ja'];

// 翻译字典类型
type Translations = {
    [key: string]: string | Translations;
};

// 内联翻译数据（确保即使加载失败也有基本翻译）
const inlineTranslations: { [lang: string]: Translations } = {
    en: {
        smartreader: {
            settings: {
                behavior: "Behavior & Activation",
                highlighting: "Highlighting Rules",
                appearance: "Appearance & Style",
                
                auto_process: "Auto-process new documents",
                auto_process_description: "Automatically apply highlighting when opening notes",
                delay: "Auto mode delay",
                delay_description: "Seconds to wait before processing",
                min_length: "Minimum length",
                min_length_description: "Skip documents shorter than this",
                excluded_folders: "Excluded paths",
                excluded_folders_description: "One pattern per line, supports wildcards (*)",
                excluded_folders_help: "Examples:<br>- <code>Templates/</code> - excludes all files in Templates folder<br>- <code>*.excalidraw</code> - excludes all .excalidraw files<br>- <code>Archive/*</code> - excludes all files in Archive and subfolders",
                test_filters: "Test current file",
                test_filters_description: "Check if the current file would be processed or excluded",
                test_button: "Test",
                
                interval_type: "Interval type",
                interval_value: "Interval value",
                interval_value_description: "Number of words or characters between highlights. Accepts values from 5 to 80.",
                word_count: "Word count",
                character_count: "Character count",
                
                highlight_style: "Highlight style",
                highlight_color: "Highlight color",
                style_bold: "Bold",
                style_color: "Color",
                style_underline: "Underline",
                style_bold_underline: "Bold + Underline"
            },
            commands: {
                toggle: "Toggle speed reading mode",
                process_current: "Process current document",
                clear_current: "Clear current document processing",
                open_settings: "Open SmartReader settings"
            },
            status: {
                enabled: "Speed reading mode enabled",
                disabled: "Speed reading mode disabled",
                processing: "Processing document...",
                processed: "Document processed",
                cleared: "Document processing cleared",
                error: "Error processing document"
            },
            messages: {
                file_excluded: "This file is excluded from processing",
                file_too_short: "File too short to process",
                not_preview_mode: "Please switch to preview mode",
                no_active_file: "No active file to process",
                processing_error: "Error processing document",
                clearing_error: "Error clearing document formatting",
                test_excluded_path: "This file would be excluded: path matches exclusion rules",
                test_too_short: "This file would be excluded: file length too short",
                test_will_process: "This file would be processed",
                test_error: "Error testing file filters"
            }
        }
    },
    zh: {
        smartreader: {
            settings: {
                behavior: "行为与激活",
                highlighting: "高亮规则",
                appearance: "外观样式",
                
                auto_process: "自动处理新文档",
                auto_process_description: "打开笔记时自动应用高亮",
                delay: "自动模式延迟",
                delay_description: "处理前等待的秒数",
                min_length: "最小长度",
                min_length_description: "跳过短于此长度的文档",
                excluded_folders: "排除的路径",
                excluded_folders_description: "每行一个模式，支持通配符(*)",
                excluded_folders_help: "示例：<br>- <code>Templates/</code> - 排除Templates文件夹中的所有文件<br>- <code>*.excalidraw</code> - 排除所有.excalidraw文件<br>- <code>Archive/*</code> - 排除Archive及其子文件夹中的所有文件",
                test_filters: "测试当前文件",
                test_filters_description: "检查当前文件是否会被处理或排除",
                test_button: "测试",
                
                interval_type: "间隔类型",
                interval_value: "间隔值",
                interval_value_description: "高亮之间的单词或字符数。接受值从5到80。",
                word_count: "按词数",
                character_count: "按字符数",
                
                highlight_style: "高亮样式",
                highlight_color: "高亮颜色",
                style_bold: "加粗",
                style_color: "颜色",
                style_underline: "下划线",
                style_bold_underline: "加粗+下划线"
            },
            commands: {
                toggle: "切换速读模式",
                process_current: "处理当前文档",
                clear_current: "清除当前文档处理",
                open_settings: "打开SmartReader设置"
            },
            status: {
                enabled: "速读模式已启用",
                disabled: "速读模式已禁用",
                processing: "正在处理文档...",
                processed: "文档已处理",
                cleared: "文档处理已清除",
                error: "处理文档时出错"
            },
            messages: {
                file_excluded: "该文件已被排除处理",
                file_too_short: "文件太短，无法处理",
                not_preview_mode: "请切换到预览模式",
                no_active_file: "没有活动文件可处理",
                processing_error: "处理文档时出错",
                clearing_error: "清除文档格式时出错",
                test_excluded_path: "此文件将被排除，原因：路径匹配排除规则",
                test_too_short: "此文件将被排除，原因：文件长度太短",
                test_will_process: "此文件将会被处理",
                test_error: "测试文件过滤器时出错"
            }
        }
    },
    ja: {
        smartreader: {
            settings: {
                behavior: "動作と起動",
                highlighting: "ハイライトルール",
                appearance: "外観",
                
                auto_process: "自動処理",
                auto_process_description: "ノートを開く時に自動的にハイライトを適用する",
                delay: "自動処理の遅延",
                delay_description: "処理前に待機する秒数",
                min_length: "最小長さ",
                min_length_description: "この長さより短い文書はスキップ",
                excluded_folders: "除外パス",
                excluded_folders_description: "1行に1パターン、ワイルドカード(*)対応",
                excluded_folders_help: "例：<br>- <code>Templates/</code> - Templatesフォルダのすべてのファイルを除外<br>- <code>*.excalidraw</code> - すべての.excalidrawファイルを除外<br>- <code>Archive/*</code> - Archiveとサブフォルダのすべてのファイルを除外",
                test_filters: "現在のファイルをテスト",
                test_filters_description: "現在のファイルが処理されるか除外されるかチェック",
                test_button: "テスト",
                
                interval_type: "間隔タイプ",
                interval_value: "間隔値",
                interval_value_description: "ハイライト間の単語数または文字数。5から500の値を受け入れます。",
                word_count: "単語数で",
                character_count: "文字数で",
                
                highlight_style: "ハイライトスタイル",
                highlight_color: "ハイライト色",
                style_bold: "太字",
                style_color: "色付け",
                style_underline: "下線"
            },
            commands: {
                toggle: "速読モード切替",
                process_current: "現在の文書を処理",
                clear_current: "現在の文書の処理をクリア",
                open_settings: "SmartReader設定を開く"
            },
            status: {
                enabled: "速読モード有効",
                disabled: "速読モード無効",
                processing: "文書処理中...",
                processed: "文書処理完了",
                cleared: "文書処理クリア",
                error: "文書処理エラー"
            },
            messages: {
                file_excluded: "このファイルは処理から除外されています",
                file_too_short: "ファイルが短すぎて処理できません",
                not_preview_mode: "プレビューモードに切り替えてください",
                no_active_file: "処理するアクティブファイルがありません",
                processing_error: "文書処理中にエラーが発生しました",
                clearing_error: "文書フォーマットのクリア中にエラーが発生しました",
                test_excluded_path: "このファイルは除外されます：パスが除外ルールに一致",
                test_too_short: "このファイルは除外されます：ファイル長が短すぎる",
                test_will_process: "このファイルは処理されます",
                test_error: "ファイルフィルターテスト中にエラーが発生しました"
            }
        }
    }
};

// 翻译字典缓存
const translationCache: {
    [lang: string]: Translations
} = {
    ...inlineTranslations
};

/**
 * 获取当前语言
 * @param app Obsidian App实例
 * @returns 语言代码
 */
export function getCurrentLang(app: App): string {
    // 检查系统语言设置
    let lang = 'en'; // 默认英语
    
    try {
        // @ts-ignore - 访问内部属性
        lang = app.vault.config?.lang || navigator.language || 'en';
        
        // 将语言代码转换为支持的语言
        if (lang.startsWith('zh')) {
            lang = 'zh';
        } else if (lang.startsWith('ja')) {
            lang = 'ja';
        } else {
            lang = 'en'; // 默认英语
        }
    } catch (e) {
        console.error('Failed to detect language:', e);
    }
    
    return lang;
}

/**
 * 加载翻译
 * @param lang 语言代码
 * @returns 翻译字典Promise
 */
async function loadTranslations(lang: string): Promise<Translations> {
    // 如果已缓存，直接返回
    if (translationCache[lang]) {
        return translationCache[lang];
    }
    
    try {
        // 从文件加载翻译
        const response = await fetch(`lang/${lang}.json`);
        const translations = await response.json();
        
        // 缓存并返回
        translationCache[lang] = translations;
        return translations;
    } catch (e) {
        console.error(`Failed to load translations for ${lang}:`, e);
        
        // 如果加载失败，使用内联翻译
        return inlineTranslations[lang] || inlineTranslations.en;
    }
}

/**
 * 获取翻译值
 * @param translations 翻译字典
 * @param key 翻译键
 * @returns 翻译值或键本身
 */
function getTranslation(translations: Translations, key: string): string {
    // 分割键路径
    const parts = key.split('.');
    let current: any = translations;
    
    // 遍历键路径
    for (const part of parts) {
        if (current[part] === undefined) {
            // 找不到翻译，尝试英文回退
            if (translations !== inlineTranslations.en) {
                return getTranslation(inlineTranslations.en, key);
            }
            return key; // 最终找不到翻译，返回键本身
        }
        current = current[part];
    }
    
    return typeof current === 'string' ? current : key;
}

/**
 * 翻译函数
 * @param app Obsidian App实例
 * @param key 翻译键
 * @param args 替换参数
 * @returns 翻译后的文本
 */
export function t(app: App, key: string, ...args: any[]): string {
    const lang = getCurrentLang(app);
    
    // 获取翻译
    const translations = translationCache[lang] || inlineTranslations.en;
    const translation = getTranslation(translations, key);
    
    // 替换参数
    if (args.length > 0) {
        return String(translation).replace(/{(\d+)}/g, (match, index) => {
            return args[index] !== undefined ? args[index] : match;
        });
    }
    
    return translation;
} 