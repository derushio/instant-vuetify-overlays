declare const _default: any;
export default _default;
export declare const defaultParam: VProgressProgrammaticParam;
export declare const VProgressProgrammatic: {
    circular: (this: any, params?: string | VProgressProgrammaticParam | undefined) => any;
    circularLoading: <T>(this: any, action: () => T, params?: string | VProgressProgrammaticParam | undefined) => Promise<T>;
    circularProgress: <T>(this: any, action: (setProgress: (percent: number) => void) => T, params?: string | VProgressProgrammaticParam | undefined) => Promise<T>;
    circularTimer: <T>(this: any, millisec: number, params?: string | VProgressProgrammaticParam | undefined) => Promise<void>;
};
export interface VProgressProgrammaticParam {
    timeout?: number;
    onClose?: (result: VProgressProgrammaticResult) => any;
}
export interface VProgressProgrammaticResult {
    confirm: boolean;
    text: string;
}
