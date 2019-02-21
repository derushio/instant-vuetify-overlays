import {
    VDialogComponent, VDialogProgrammaticParam, VDialogProgrammaticResult,
} from '../components/vdialog/index';

export interface VDialogProgrammatic {
    open: (param: VDialogProgrammaticParam) => { vdialog: VDialogComponent } & Promise<VDialogProgrammaticResult>;
    alert: (message: string | VDialogProgrammaticParam) => { vdialog: VDialogComponent } & Promise<VDialogProgrammaticResult>;
    confirm: (message: string | VDialogProgrammaticParam) => { vdialog: VDialogComponent } & Promise<VDialogProgrammaticResult>;
    prompt: (message: string | VDialogProgrammaticParam) => { vdialog: VDialogComponent } & Promise<VDialogProgrammaticResult>;
}

export interface VDialogPromise {
    vdialog: VDialogComponent;
    promise: Promise<VDialogProgrammaticResult>;
}
