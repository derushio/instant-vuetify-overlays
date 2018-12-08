declare const _default: any;
export default _default;
declare const VSnackbarComponent_base: any;
export declare class VSnackbarComponent extends VSnackbarComponent_base {
    close(): void;
}
export declare const defaultParam: VSnackbarProgrammaticParam;
export declare const VSnackbarProgrammatic: {
    open: (this: any, params: VSnackbarProgrammaticParam) => {
        vsnackbar: VSnackbarComponent | null;
        promise: Promise<{}>;
    };
    alert: (this: any, params: string | VSnackbarProgrammaticParam) => any;
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
