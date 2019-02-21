import { VDialogPromise } from './VDialog';
import {
    VDialogComponent, VDialogProgrammaticParam, VDialogProgrammaticResult,
} from '../components/vdialog/index';
import {
    VProgressProgrammaticParam,
} from '../components/vprogress/index';

export interface VProgressProgrammatic {
    circular: (param?: string | VProgressProgrammaticParam) => VDialogPromise;
    circularLoading: <T>(action: () => T | Promise<T>, param?: string | VProgressProgrammaticParam) => Promise<T>;
    circularProgress: <T>(action: (setProgress: (percent: number) => void) => T | Promise<T>,
        params?: string | VProgressProgrammaticParam) => Promise<T>;
    circularTimer: <T>(millisec: number,
        params?: string | VProgressProgrammaticParam) => Promise<void>;
}