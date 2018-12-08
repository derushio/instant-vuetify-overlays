import Vue from 'vue';
declare const _default: any;
export default _default;
declare const VDialogComponent_base: any;
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
    open: (this: any, params: VDialogProgrammaticParam) => {
        vdialog: VDialogComponent | null;
        promise: Promise<{}>;
    };
    alert: (this: any, params: string | VDialogProgrammaticParam) => any;
    confirm: (this: any, params: string | VDialogProgrammaticParam) => any;
    prompt: (this: any, params: string | VDialogProgrammaticParam) => any;
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
