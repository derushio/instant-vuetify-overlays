import { VSnackbarComponent, VSnackbarProgrammaticParam } from '../components/vsnackbar/index';

export interface VSnackbarProgrammatic {
    open: (param: VSnackbarProgrammaticParam) => VSnackbarPromise;
    alert: (message: string | VSnackbarProgrammaticParam) => VSnackbarPromise;
}

export interface VSnackbarPromise {
    vsnackbar: VSnackbarComponent;
    promise: Promise<void>;
}
