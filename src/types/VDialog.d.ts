import {
    VDialogComponent, VDialogProgrammaticParam, VDialogProgrammaticResult,
} from '../../instant-vuetify/components/vdialog/index';

export interface VDialogProgrammatic {
    open: (param: VDialogProgrammaticParam) => VDialogPromise;
    alert: (message: string | VDialogProgrammaticParam) => VDialogPromise;
    confirm: (message: string | VDialogProgrammaticParam) => VDialogPromise;
    prompt: (message: string | VDialogProgrammaticParam) => VDialogPromise;
}

export interface VDialogPromise {
    vdialog: VDialogComponent;
    promise: Promise<VDialogProgrammaticResult>;
}
