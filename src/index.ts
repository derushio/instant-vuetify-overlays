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

export { VSnackbarComponent, VDialogComponent };
