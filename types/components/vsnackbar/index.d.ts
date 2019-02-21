import Vue, { PluginObject } from 'vue';
declare const _default: PluginObject<{}>;
export default _default;
declare const VSnackbarComponent_base: import("vue").VueConstructor<Record<never, any> & Vue>;
export declare class VSnackbarComponent extends VSnackbarComponent_base {
    close(): void;
}
export declare const defaultParam: VSnackbarProgrammaticParam;
export declare const VSnackbarProgrammatic: {
    open: (this: Vue, params: VSnackbarProgrammaticParam) => {
        vsnackbar: VSnackbarComponent | null;
        promise: Promise<{}>;
    };
    alert: (this: Vue, params: string | VSnackbarProgrammaticParam) => import("../../types/VSnackbar").VSnackbarPromise;
};
export interface VSnackbarProgrammaticParam {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    message?: string;
    timeout?: number;
    onClose?: () => any;
}
