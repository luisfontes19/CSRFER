export interface RequestStruct {
    headers: Record<string, string>;
    body: string;
    url: string;
    method: string;
}
export declare class HTTPParser {
    static fromString(fileContent: string): RequestStruct | null;
    static fromFile(filepath: string): Promise<RequestStruct | null>;
}
