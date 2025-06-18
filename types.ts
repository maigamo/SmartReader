/**
 * 插件设置接口
 */
export interface SmartReaderSettings {
    // 功能启用状态
    isEnabled: boolean;
    
    // 自动处理设置
    autoProcess: boolean;
    autoProcessDelay: number;
    
    // 文件过滤设置
    excludedFolders: string[];
    minProcessLength: number;
    
    // 高亮样式设置
    highlightStyle: 'bold' | 'color' | 'underline' | 'bold_underline';
    highlightColor: string;
    
    // 间隔设置
    intervalType: 'word' | 'character';
    intervalValue: number;
}

/**
 * 默认设置
 */
export const DEFAULT_SETTINGS: SmartReaderSettings = {
    isEnabled: true,
    
    autoProcess: true,
    autoProcessDelay: 2,
    
    excludedFolders: [
        'Templates/',
        '*.excalidraw'
    ],
    minProcessLength: 200,
    
    highlightStyle: 'bold_underline',
    highlightColor: '#FF0000',
    
    intervalType: 'word',
    intervalValue: 5
}; 