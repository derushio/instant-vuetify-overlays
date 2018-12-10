import Vue, { PluginObject } from 'vue';
import { VSnackbarComponent } from './components/vsnackbar';
import { VDialogComponent } from './components/vdialog';
import components from './components';

export default {
    install: (MyVue: typeof Vue) => {
        // Components
        for (const component of components) {
            MyVue.use(component);
        }
    },
} as PluginObject<{}>;

<<<<<<< HEAD
export { VSnackbarComponent, VDialogComponent };
=======
export { VSnackbarComponent, VDialogComponent }
>>>>>>> 012d220d42b8645a780a7e4586c2f98d96ec0c55
