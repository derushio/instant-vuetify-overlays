import * as externals from 'webpack-node-externals';
import Vue, { PluginObject } from 'vue';
import components from './components';

export default {
    install: (MyVue: typeof Vue) => {
        // Components
        for (const component of components) {
            MyVue.use(component);
        }
    },
} as PluginObject<{}>;
