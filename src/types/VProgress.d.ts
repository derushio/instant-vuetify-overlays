import {
    VDialogComponent, VDialogProgrammaticParam, VDialogProgrammaticResult,
} from '../components/vdialog/index';
import {
    VProgressProgrammaticParam,
} from '../components/vprogress/index';

export interface VProgressProgrammatic {
    circular: (param?: string | VProgressProgrammaticParam) => { vdialog: VDialogComponent } & Promise<VDialogProgrammaticResult>;
    circularLoading: <T>(action: () => T | Promise<T>, param?: string | VProgressProgrammaticParam) => Promise<T>;
    circularProgress: <T>(action: (setProgress: (percent: number) => void) => T | Promise<T>,
        params?: string | VProgressProgrammaticParam) => Promise<T>;
    circularTimer: <T>(millisec: number,
        params?: string | VProgressProgrammaticParam) => Promise<void>;
}
