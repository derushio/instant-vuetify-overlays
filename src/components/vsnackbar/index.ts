import Vue, { PluginObject } from 'vue';
import { registerComponentProgrammatic } from '../../utils/plugin';
import { VSnackbar, VBtn } from 'vuetify/lib';
import { aswait } from '../../utils/AsyncTimeout';

export default {
    install(MyVue: typeof Vue) {
        registerComponentProgrammatic(MyVue, '$vsnackbar', VSnackbarProgrammatic);
    },
} as PluginObject<{}>;

export class VSnackbarComponent extends Vue.extend(VSnackbar as Vue) {
    public close() {
        this.$data.isActive = false;
    }
}

export const defaultParam = {
    message: '',
    timeout: 5000,
    onClose: () => null,
} as VSnackbarProgrammaticParam;

export const VSnackbarProgrammatic = {
    // tslint:disable-next-line:object-literal-shorthand
    open: function(this: Vue, params: VSnackbarProgrammaticParam) {
        let vsnackbar = null as VSnackbarComponent | null;
        const promise = new Promise((resolve, reject) => {
            const propsData = Object.assign({}, defaultParam, params);

            // add element
            const element = document.createElement('div');
            this.$root.$el.appendChild(element);

            // build content
            const VSnackbarContent = Vue.extend({
                parent: this,
                ...Vue.compile(`<div>${propsData.message!}</div>`),
                components: {
                    ...this.$options.components,
                    VBtn,
                },

                methods: {
                    // tslint:disable-next-line:object-literal-shorthand
                    close: function(this: Vue) {
                        this.$emit('close');
                    },
                },

                // tslint:disable-next-line:object-literal-shorthand
                mounted: function(this: Vue) {
                    this.$parent.$emit('close');
                },
            });

            // build snackbar
            vsnackbar = new VSnackbarComponent({
                parent: this.$root,
                el: element,
                components: { VSnackbarContent },
                propsData,

                // tslint:disable-next-line:object-literal-shorthand
                beforeMount: function(this: VSnackbarComponent) {
                    // build slot
                    this.$slots.default = [
                        this.$createElement('v-snackbar-content', {
                            class: [ 'v-snack__content' ],
                            style: {
                                padding: '0',
                                margin: '0',
                            },
                        }),
                    ];
                },
                // tslint:disable-next-line:object-literal-shorthand
                mounted: function(this: VSnackbarComponent) {
                    this.$on('close', () => {
                        this.close();
                    });
                },
                watch: {
                    /**
                     * destroy
                     */
                    // tslint:disable-next-line:object-literal-shorthand
                    isActive: async function(this: VSnackbarComponent, value) {
                        if (!value) {
                            await aswait(1000);

                            propsData.onClose!();
                            resolve();

                            this.$el.remove();
                            this.$destroy();
                            this.$parent.$forceUpdate();
                        }
                    },
                },
            });

            // display
            vsnackbar.$data.isActive = true;
        });

        return { vsnackbar, promise };
    },

    // tslint:disable-next-line:object-literal-shorthand
    alert: function(this: Vue, params: string | VSnackbarProgrammaticParam) {
        const propsData = (typeof params === String.name.toLowerCase())
            ? Object.assign({}, defaultParam, { message: params })
            : Object.assign({}, defaultParam, params);

        return this.$vsnackbar.open({
            right: true,
            bottom: true,
            ...propsData,
            message:
                `<span>${propsData.message}</span>` +
                '<v-btn flat color="warning" @click="close">OK</v-btn>',
        });
    },
};

export interface VSnackbarProgrammaticParam {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    message?: string;
    timeout?: number;
    onClose?: () => any;
}
