import { TFile, Vault, sanitizeHTMLToDom } from "obsidian";
import { SmartReaderSettings } from "./types";

/**
 * 检查文件是否在排除的文件夹中
 * @param file 要检查的文件
 * @param settings 插件设置
 * @returns 是否被排除
 */
export function isFileExcluded(file: TFile, settings: SmartReaderSettings): boolean {
    if (!settings.excludedFolders || settings.excludedFolders.length === 0) {
        return false;
    }
    
    const filePath = file.path;
    
    // 检查文件路径是否匹配任一排除规则
    return settings.excludedFolders.some(pattern => {
        // 如果是空字符串，忽略
        if (!pattern.trim()) {
            return false;
        }
        
        // 支持通配符*匹配
        if (pattern.includes('*')) {
            return matchWildcard(filePath, pattern);
        }
        
        // 标准化文件夹路径，确保以 / 结尾（对于目录匹配）
        const normalizedPattern = pattern.endsWith('/') ? pattern : pattern + '/';
        
        // 如果是目录匹配
        if (pattern.endsWith('/') || !pattern.includes('.')) {
            return filePath.startsWith(normalizedPattern);
        }
        
        // 如果是完整路径匹配
        return filePath === pattern;
    });
}

/**
 * 支持通配符匹配文件路径
 * @param path 文件路径
 * @param pattern 匹配模式（支持*通配符）
 * @returns 是否匹配
 */
export function matchWildcard(path: string, pattern: string): boolean {
    // 将通配符模式转换为正则表达式
    const regexPattern = pattern
        .replace(/\./g, '\\.')   // 转义点号
        .replace(/\*/g, '.*');   // *替换为.*
    
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
}

/**
 * 检查文档是否满足最小处理长度要求
 * @param content 文档内容
 * @param settings 插件设置
 * @returns 是否满足最小长度
 */
export function meetMinimumLength(content: string, settings: SmartReaderSettings): boolean {
    // 如果未设置最小长度，则默认满足
    if (!settings.minProcessLength || settings.minProcessLength <= 0) {
        return true;
    }
    
    // 移除空白字符，仅计算实际内容长度
    const trimmedContent = content.replace(/\s+/g, '');
    
    return trimmedContent.length >= settings.minProcessLength;
}

/**
 * 获取文件内容
 * @param file 文件
 * @param vault 存储库
 * @returns Promise<文件内容>
 */
export async function getFileContent(file: TFile, vault: Vault): Promise<string> {
    return await vault.cachedRead(file);
}

/**
 * 安全地将HTML内容插入到元素中
 * @param element 目标元素
 * @param html HTML内容
 */
export function safelySetInnerHTML(element: HTMLElement, html: string): void {
    try {
        // 首先清空元素内容
        element.empty();
        
        // 使用Obsidian的sanitizeHTMLToDom函数
        const sanitizedElement = sanitizeHTMLToDom(html);
        
        // 将净化后的内容添加到目标元素
        element.appendChild(sanitizedElement);
    } catch (error) {
        console.error('Failed to set innerHTML:', error);
        
        // 出错时使用文本回退
        element.textContent = html.replace(/<[^>]*>/g, '');
    }
}



/**
 * 检查元素是否已处理
 * @param element 要检查的元素
 * @returns 是否已处理
 */
export function isElementProcessed(element: HTMLElement): boolean {
    return element.classList.contains('smart-reader-processed');
}

/**
 * 标记元素为已处理
 * @param element 要标记的元素
 */
export function markElementAsProcessed(element: HTMLElement): void {
    element.classList.add('smart-reader-processed');
}

/**
 * 移除元素的处理标记
 * @param element 要移除标记的元素
 */
export function unmarkElementAsProcessed(element: HTMLElement): void {
    element.classList.remove('smart-reader-processed');
}

/**
 * 找到文档中所有可处理的文本块
 * @param container 容器元素
 * @returns 可处理的元素数组
 */
export function findProcessableElements(container: HTMLElement): HTMLElement[] {
    // 查找所有段落、标题和列表项
    const processableElements: HTMLElement[] = [];
    
    // 段落
    container.querySelectorAll('p').forEach(el => {
        processableElements.push(el as HTMLElement);
    });
    
    // 标题（不包括文档标题h1）
    container.querySelectorAll('h2, h3, h4, h5, h6').forEach(el => {
        processableElements.push(el as HTMLElement);
    });
    
    // 列表项
    container.querySelectorAll('li').forEach(el => {
        processableElements.push(el as HTMLElement);
    });

    // 表格单元格
    container.querySelectorAll('td, th').forEach(el => {
        processableElements.push(el as HTMLElement);
    });
    
    // 过滤掉不应处理的元素
    return processableElements.filter(el => !shouldSkipElement(el));
}

/**
 * 判断是否应跳过处理该元素
 * @param element 要检查的元素
 * @returns 是否应跳过
 */
export function shouldSkipElement(element: HTMLElement): boolean {
    // 如果元素在代码块内，跳过
    if (element.closest('pre') || element.closest('code')) {
        return true;
    }
    
    // 如果元素是空的或只包含空白字符，跳过
    if (!element.textContent || element.textContent.trim() === '') {
        return true;
    }
    
    // 如果元素包含特殊内容，如图片、嵌入内容等，跳过
    if (element.querySelector('img, iframe, canvas, svg, .internal-embed')) {
        return true;
    }
    
    // 如果元素有特定的CSS类，跳过
    const skipClasses = ['code-block', 'math', 'callout', 'dataview'];
    if (skipClasses.some(cls => element.classList.contains(cls))) {
        return true;
    }

    // 如果元素太短(少于3个字符)，跳过
    if (element.textContent && element.textContent.trim().length < 3) {
        return true;
    }
    
    return false;
}

/**
 * 移除所有高亮处理
 * @param container 容器元素
 */
export function removeAllProcessing(container: HTMLElement): void {
    // 找到所有已处理的元素
    const processedElements = container.querySelectorAll('.smart-reader-processed');
    
    processedElements.forEach(el => {
        // 移除处理标记
        unmarkElementAsProcessed(el as HTMLElement);
        
        // 恢复原始内容（移除所有高亮span）
        const originalText = el.textContent || '';
        el.textContent = originalText;
    });
} 