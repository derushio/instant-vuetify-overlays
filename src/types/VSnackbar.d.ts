import { VSnackbarComponent, VSnackbarProgrammaticParam } from '../components/vsnackbar/index';

export interface VSnackbarProgrammatic {
    open: (param: VSnackbarProgrammaticParam) => { vsnackbar: VSnackbarComponent } & Promise<void>;
    alert: (message: string | VSnackbarProgrammaticParam) => { vsnackbar: VSnackbarComponent } & Promise<void>;
}
