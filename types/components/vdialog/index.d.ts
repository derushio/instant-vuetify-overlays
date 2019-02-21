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
    open: (this: Vue, params: VDialogProgrammaticParam) => Promise<{}> & {
        vdialog: VDialogComponent | null;
    };
    alert: (this: Vue, params: string | VDialogProgrammaticParam) => {
        vdialog: VDialogComponent;
    } & Promise<VDialogProgrammaticResult>;
    confirm: (this: Vue, params: string | VDialogProgrammaticParam) => {
        vdialog: VDialogComponent;
    } & Promise<VDialogProgrammaticResult>;
    prompt: (this: Vue, params: string | VDialogProgrammaticParam) => {
        vdialog: VDialogComponent;
    } & Promise<VDialogProgrammaticResult>;
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
