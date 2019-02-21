import Vue, { PluginObject } from 'vue';
declare const _default: PluginObject<{}>;
export default _default;
declare const VDialogComponent_base: import("vue").VueConstructor<Record<never, any> & Vue>;
export declare class VDialogComponent extends VDialogComponent_base {
    ok(): {
        confirm: any;
        text: any;
    };
    cancel(): {
        confirm: any;
        text: any;
    };
}
export declare const defaultParam: VDialogProgrammaticParam;
export declare const VDialogProgrammatic: {
    open: (this: Vue, params: VDialogProgrammaticParam) => {
        vdialog: VDialogComponent | null;
        promise: Promise<{}>;
    };
    alert: (this: Vue, params: string | VDialogProgrammaticParam) => import("../../types/VDialog").VDialogPromise;
    confirm: (this: Vue, params: string | VDialogProgrammaticParam) => import("../../types/VDialog").VDialogPromise;
    prompt: (this: Vue, params: string | VDialogProgrammaticParam) => import("../../types/VDialog").VDialogPromise;
};
export interface VDialogProgrammaticParam {
    component?: typeof Vue;
    propsData?: any;
    computed?: {
        [key: string]: {
            get: () => any;
            set: (value: any) => void;
        };
    };
    onEvents?: {
        [key: string]: (args: any) => any;
    };
    needCard?: boolean;
    title?: string;
    message?: string;
    fullscreen?: boolean;
    width?: number;
    persistent?: boolean;
    onClose?: (result: VDialogProgrammaticResult) => any;
    [key: string]: any;
}
export interface VDialogProgrammaticResult {
    confirm: boolean;
    text: string;
}
