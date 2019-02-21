import Vue, { PluginObject } from 'vue';
declare const _default: PluginObject<{}>;
export default _default;
export declare const defaultParam: VProgressProgrammaticParam;
export declare const VProgressProgrammatic: {
    circular: (this: Vue, params?: string | VProgressProgrammaticParam | undefined) => {
        vdialog: import("../vdialog").VDialogComponent;
    } & Promise<import("../vdialog").VDialogProgrammaticResult>;
    circularLoading: <T>(this: Vue, action: () => T | Promise<T>, params?: string | VProgressProgrammaticParam | undefined) => Promise<void | T>;
    circularProgress: <T>(this: Vue, action: (setProgress: (percent: number) => void) => T | Promise<T>, params?: string | VProgressProgrammaticParam | undefined) => Promise<T>;
    circularTimer: <T>(this: Vue, millisec: number, params?: string | VProgressProgrammaticParam | undefined) => Promise<void>;
};
export interface VProgressProgrammaticParam {
    timeout?: number;
    minTime?: number;
    onClose?: (result: VProgressProgrammaticResult) => any;
}
export interface VProgressProgrammaticResult {
    confirm: boolean;
    text: string;
}
