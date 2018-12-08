import _Vue from 'vue';
import { VSnackbarProgrammatic } from './VSnackbar';
import { VDialogProgrammatic } from './VDialog';
import { VProgressProgrammatic } from './VProgress';

declare module 'vue/types/vue' {
    interface Vue {
        $vsnackbar: VSnackbarProgrammatic;
        $vdialog: VDialogProgrammatic;
        $vprogress: VProgressProgrammatic;
    }
}
