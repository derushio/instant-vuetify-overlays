import Vue, { PluginObject } from 'vue';
import { registerComponentProgrammatic } from '../../utils/plugin';
import {
    VDialog,
    VBtn, VDivider, VSpacer, VLayout,
    VCard, VCardTitle, VCardText, VCardActions,
    VForm, VContainer, VTextField,
    VProgressCircular, VProgressLinear,
} from 'vuetify/lib';
import { aswait } from '../../utils/AsyncTimeout';

export default {
    install(MyVue: typeof Vue) {
        registerComponentProgrammatic(MyVue, '$vdialog', VDialogProgrammatic);
    },
} as PluginObject<{}>;

export class VDialogComponent extends Vue.extend(VDialog as Vue) {
    public ok() {
        if (this.$data.isActive) {
            this.$data.isActive = false;

            // 閉じた後にokを押されたときの考慮
            const content = this.$refs.vDialogContent as Vue;
            this.$data.confirm = content.$data.confirm;
            this.$data.text = content.$data.text;
        }
        return {
            confirm: this.$data.confirm,
            text: this.$data.text,
        };
    }
    public cancel() {
        if (this.$data.isActive) {
            this.$data.isActive = false;

            // 閉じた後にcancelを押されたときの考慮
            const content = this.$refs.vDialogContent as Vue;
            this.$data.confirm = content.$data.confirm;
            this.$data.text = content.$data.text;
        }
        return {
            confirm: this.$data.confirm,
            text: this.$data.text,
        };
    }
}

export const defaultParam = {
    component: undefined,
    propsData: {},
    computed: {},
    onEvents: {},
    needCard: false,
    title: '',
    message: '',
    fullscreen: false,
    width: 500,
    persistent: false,
    onClose: (result: VDialogProgrammaticResult) => null,
} as VDialogProgrammaticParam;

export const VDialogProgrammatic = {
    // tslint:disable-next-line:object-literal-shorthand
    open: function(this: Vue, params: VDialogProgrammaticParam) {
        let vdialog = null as VDialogComponent | null;
        const promise = new Promise((resolve, reject) => {
            const propsData = Object.assign({}, defaultParam, params);

            // add element
            const element = document.createElement('div');
            this.$root.$el.appendChild(element);

            // build content
            const vm = (propsData.component == null) ? Vue : propsData.component;
            const VDialogContent = vm.extend({
                parent: this,
                ...((propsData.component == null)
                    ? Vue.compile(`<div>${propsData.message!}</div>`)
                    : {}),
                components: {
                    ...this.$options.components,
                    VBtn, VDivider, VSpacer, VLayout,
                    VCard, VCardTitle, VCardText, VCardActions,
                    VForm, VContainer, VTextField,
                    VProgressCircular, VProgressLinear,
                },

                data: () => { return {
                    confirm: false,
                    text: '',
                }; },
                methods: {
                    // tslint:disable-next-line:object-literal-shorthand
                    ok: function(this: Vue) {
                        this.$emit('ok');
                    },
                    // tslint:disable-next-line:object-literal-shorthand
                    cancel: function(this: Vue) {
                        this.$emit('cancel');
                    },
                },
                props: {
                    ...Object.keys(propsData.propsData).reduce((prev, prop) => {
                        prev[prop] = propsData.propsData[prop].constructor;
                        return prev;
                    }, {} as any),
                },
                computed: propsData.computed,

                // tslint:disable-next-line:object-literal-shorthand
                mounted: function(this: Vue) {
                    for (const key of Object.keys(propsData.onEvents!)) {
                        this.$on(key, propsData.onEvents![key]);
                    }

                    // tslint:disable-next-line:object-literal-shorthand
                    this.$on('ok', function(this: Vue) {
                        this.$data.confirm = true;
                        let self = this;
                        // 親を探す
                        for (let i = 0; i < 3; i++) {
                            if (self.$parent instanceof VDialogComponent) {
                                self.$parent.$emit('ok');
                            } else {
                                self = self.$parent;
                            }
                        }
                    });
                    // tslint:disable-next-line:object-literal-shorthand
                    this.$on('cancel', function(this: Vue) {
                        this.$data.confirm = false;
                        let self = this;
                        // 親を探す
                        for (let i = 0; i < 3; i++) {
                            if (self.$parent instanceof VDialogComponent) {
                                self.$parent.$emit('cancel');
                            } else {
                                self = self.$parent;
                            }
                        }
                    });
                },
            });

            // build dialog
            vdialog = new VDialogComponent({
                parent: this.$root,
                el: element,
                components: {
                    VDialogContent, VCard,
                },
                propsData,

                // tslint:disable-next-line:object-literal-shorthand
                beforeMount: function(this: VDialogComponent) {
                    // build slot
                    let vNode = this.$createElement('v-dialog-content', {
                        ref: 'vDialogContent',
                        style: propsData.fullscreen
                            ? {
                                'height': '100%',
                                'display': 'flex',
                                'flex-direction': 'column',
                            }
                            : {},
                        props: propsData.propsData,
                    });

                    if (propsData.needCard) {
                        vNode = this.$createElement('v-card', {
                            class: [
                                'pa-2',
                            ],
                        }, [
                            vNode,
                        ]);
                    }

                    this.$slots.default = [ vNode ];
                },
                // tslint:disable-next-line:object-literal-shorthand
                mounted: function(this: VDialogComponent) {
                    this.$on('ok', () => {
                        this.ok();
                    });
                    this.$on('cancel', () => {
                        this.cancel();
                    });

                    // vDialogContentにイベントを中継
                    const dc = this.$refs.vDialogContent as Vue;
                    for (const key of Object.keys(propsData.onEvents!)) {
                        this.$on(key, (args: any) => {
                            dc.$emit(key, args);
                        });
                    }
                },
                watch: {
                    /**
                     * destroy
                     */
                    // tslint:disable-next-line:object-literal-shorthand
                    isActive: async function(this: VDialogComponent, value) {
                        if (!value) {
                            await aswait(1000);

                            const content = this.$refs.vDialogContent as Vue;
                            const result = {
                                confirm: content.$data.confirm,
                                text: content.$data.text,
                            };
                            propsData.onClose!(result);
                            resolve(result);

                            this.$el.remove();
                            this.$destroy();
                            this.$parent.$forceUpdate();
                        }
                    },
                },
            });

            // display
            vdialog.$data.isActive = true;
        });

        // promiseにcomponentのパラメータを付与
        return Object.assign(promise, { vdialog });
    },

    // tslint:disable-next-line:object-literal-shorthand
    alert: function(this: Vue, params: string | VDialogProgrammaticParam) {
        const propsData = (typeof params === String.name.toLowerCase())
            ? Object.assign({}, defaultParam, { message: params })
            : Object.assign({}, defaultParam, params);

        return this.$vdialog.open({
            ...propsData,
            message:
                '<v-card' +
                        (propsData.fullscreen
                            ? ' style="min-height: 100%; display: flex; flex-direction: column;"'
                            : '') +
                        '>' +
                    '<v-card-title class="title grey lighten-2" headline>' +
                        propsData.title +
                    '</v-card-title>' +
                    '<v-card-text>' +
                        propsData.message +
                    '</v-card-text>' +
                    (propsData.fullscreen ? '<v-spacer></v-spacer>' : '' ) +
                    '<v-divider></v-divider>' +
                    '<v-card-actions>' +
                        '<v-spacer></v-spacer>' +
                        '<v-btn color="primary" flat @click="ok">OK</v-btn>' +
                    '</v-card-actions>' +
                '</v-card>',
        });
    },

    // tslint:disable-next-line:object-literal-shorthand
    confirm: function(this: Vue, params: string | VDialogProgrammaticParam) {
        const propsData = (typeof params === String.name.toLowerCase())
            ? Object.assign({}, defaultParam, { message: params })
            : Object.assign({}, defaultParam, params);

        return this.$vdialog.open({
            ...propsData,
            message:
                '<v-card' +
                        (propsData.fullscreen
                            ? ' style="min-height: 100%; display: flex; flex-direction: column;"'
                            : '') +
                        '>' +
                    '<v-card-title class="title grey lighten-2" headline>' +
                        propsData.title +
                    '</v-card-title>' +
                    '<v-card-text>' +
                        propsData.message +
                    '</v-card-text>' +
                    (propsData.fullscreen ? '<v-spacer></v-spacer>' : '' ) +
                    '<v-divider></v-divider>' +
                    '<v-card-actions>' +
                        '<v-spacer></v-spacer>' +
                        '<v-btn color="warning" flat @click="cancel">CANCEL</v-btn>' +
                        '<v-btn color="primary" flat @click="ok">OK</v-btn>' +
                    '</v-card-actions>' +
                '</v-card>',
        });
    },

    // tslint:disable-next-line:object-literal-shorthand
    prompt: function(this: Vue, params: string | VDialogProgrammaticParam) {
        const propsData = (typeof params === String.name.toLowerCase())
            ? Object.assign({}, defaultParam, { message: params })
            : Object.assign({}, defaultParam, params);

        return this.$vdialog.open({
            ...propsData,
            message:
                '<v-card' +
                        (propsData.fullscreen
                            ? ' style="min-height: 100%; display: flex; flex-direction: column;"'
                            : '') +
                        '>' +
                    '<v-card-title class="title grey lighten-2" headline>' +
                        propsData.title +
                    '</v-card-title>' +
                    '<v-card-text>' +
                        propsData.message +
                    '</v-card-text>' +
                    '<v-divider></v-divider>' +
                    '<v-form>' +
                        '<v-container>' +
                            '<v-text-field v-model="text"></v-text-field>' +
                        '</v-container>' +
                    '</v-form>' +
                    (propsData.fullscreen ? '<v-spacer></v-spacer>' : '' ) +
                    '<v-divider></v-divider>' +
                    '<v-card-actions>' +
                        '<v-spacer></v-spacer>' +
                        ((!propsData.persistent)
                            ? '<v-btn color="warning" flat @click="cancel">CANCEL</v-btn>'
                            : '') +
                        '<v-btn color="primary" flat @click="ok">OK</v-btn>' +
                    '</v-card-actions>' +
                '</v-card>',
        });
    },
};

export interface VDialogProgrammaticParam {
    component?: typeof Vue;
    propsData?: any;
    computed?: { [key: string]: { get: () => any, set: (value: any) => void } };
    onEvents?: { [key: string]: (args: any) => any };
    needCard?: boolean;
    title?: string;
    message?: string;
    fullscreen?: boolean;
    width?: number;
    persistent?: boolean;
    onClose?: (result: VDialogProgrammaticResult) => any;
    [key: string]: any;
}

export interface VDialogProgrammaticResult {
    confirm: boolean;
    text: string;
}
