import * as _obsidian from 'obsidian';

declare module 'obsidian' {
    export interface App {
        setting: {
            open: () => void;
            openTabById: (id: string) => void;
        };
        vault: Vault;
        workspace: Workspace;
    }

    export interface Vault {
        getRoot: () => any;
        on(name: 'modify', callback: (file: any) => any): EventRef;
        cachedRead(file: TFile): Promise<string>;
    }

    export interface Workspace {
        on(name: string, callback: (...args: any[]) => any): EventRef;
        activeLeaf: WorkspaceLeaf | null;
        getActiveFile(): TFile | null;
    }

    export interface WorkspaceLeaf {
        view: View;
    }

    export interface View {
        getMode(): string;
    }

    export interface MarkdownView extends View {
        file: TFile | null;
    }

    export interface EventRef {}

    export interface TFile {
        path: string;
        extension: string;
    }

    export interface HTMLElement {
        empty: () => void;
        addClass: (className: string) => void;
        removeClass: (className: string) => void;
        createEl: (tag: string, attrs?: any) => HTMLElement;
        createDiv: (attrs?: any) => HTMLElement;
        createSpan: (attrs?: any) => HTMLElement;
        setText: (text: string) => void;
    }

    export interface PluginSettingTab {
        containerEl: HTMLElement;
        app: App;
    }

    export interface Plugin {
        app: App;
        registerEvent: (event: any) => void;
        register: (cb: () => any) => void;
        addCommand: (command: any) => void;
        addSettingTab: (tab: any) => void;
        addStatusBarItem: () => HTMLElement;
        addRibbonIcon: (icon: string, title: string, callback: (evt: MouseEvent) => any) => HTMLElement;
        loadData: () => Promise<any>;
        saveData: (data: any) => Promise<void>;
    }

    export interface Modal {
        app: App;
        contentEl: HTMLElement;
        open: () => void;
        onClose: () => void;
    }

    export const addIcon: (iconId: string, svgContent: string) => void;
    export const setIcon: (parent: HTMLElement, iconId: string) => void;
    export class Notice {
        constructor(message: string, timeout?: number);
    }

    export class Setting {
        constructor(containerEl: HTMLElement);
        setName(name: string): this;
        setDesc(desc: string): this;
        setHeading(): this;
        addButton(cb: (button: any) => any): this;
        addToggle(cb: (toggle: any) => any): this;
        addText(cb: (text: any) => any): this;
        addTextArea(cb: (textarea: any) => any): this;
        addDropdown(cb: (dropdown: any) => any): this;
        addSlider(cb: (slider: any) => any): this;
        addColorPicker(cb: (colorPicker: any) => any): this;
        nameEl: HTMLElement;
    }

    export function MarkdownRenderer(markdown: string, el: HTMLElement, sourcePath: string, component: any): void;
} 