export declare enum MODE {
    FETCH = 0,
    FORM = 1
}
export interface GeneratorData {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: string;
    mode: MODE;
    autoSubmit: boolean;
    visible: boolean;
    useTemplate: boolean;
    template: string | undefined;
}
export declare class Generator {
    static forbiddenHeaders: string[];
    static forbiddenHeaderPrefixes: string[];
    static forbiddenHeaderPrefixRegex: string;
    static PLACEHOLDER: string;
    static DEFAULT_TEMPLATE: string;
    static generate(data: GeneratorData): string;
    static isFormSubmitPossible(method: string, contentType: string): boolean;
    static getContentType(headers: Record<string, string>): string;
    static generateFetch(data: GeneratorData): string;
    static filterAllowedHeaders(headers: Record<string, string>): Record<string, string>;
    static formParse(body: string, decode?: boolean): Record<string, string>;
    static generateFormTag(name: string, value: string, visible: boolean): string;
    static generateForm(data: GeneratorData): string;
}
