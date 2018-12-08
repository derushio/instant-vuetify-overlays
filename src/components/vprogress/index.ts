import Vue, { PluginObject } from 'vue';
import { registerComponentProgrammatic } from '../../utils/plugin';

export default {
    install(MyVue: typeof Vue) {
        registerComponentProgrammatic(MyVue, '$vprogress', VProgressProgrammatic);
    },
} as PluginObject<{}>;

export const defaultParam = {
    timeout: 0,
    onClose: (result: VProgressProgrammaticResult) => null,
} as VProgressProgrammaticParam;

export const VProgressProgrammatic = {
    // tslint:disable-next-line:object-literal-shorthand
    circular: function(this: Vue, params?: string | VProgressProgrammaticParam) {
        // TODO: メッセージ対応
        const propsData = (typeof params === String.name.toLowerCase())
            ? Object.assign({}, defaultParam, { message: params })
            : Object.assign({}, defaultParam, params);

        const result = this.$vdialog.open({
            ...propsData,
            persistent: true,
            fullscreen: true,
            message:
                '<v-container fluid fill-height ' +
                        'style="height: 100%; background-color: rgba(33, 33, 33, 0.46);">' +
                    '<v-layout align-center justify-center>' +
                        '<v-progress-circular indeterminate color="primary" size="50"' +
                                'style="overflow: hidden;">' +
                        '</v-progress-circular>' +
                    '</v-layout>' +
                '</v-container>',
        });

        if (0 < propsData.timeout!) {
            window.setTimeout(() => result.vdialog.ok(), propsData.timeout);
        }

        return result;
    },
    // tslint:disable-next-line:object-literal-shorthand
    circularLoading: async function<T>(this: Vue,
            action: () => T, params?: string | VProgressProgrammaticParam) {
        const circular = this.$vprogress.circular(params);

        try {
            const result = await action();
            circular.vdialog.ok();
            return result;
        } catch (e) {
            circular.vdialog.cancel();
            throw e;
        }
    },
    // tslint:disable-next-line:object-literal-shorthand
    circularProgress: async function<T>(this: Vue,
            action: (setProgress: (percent: number) => void) => T,
            params?: string | VProgressProgrammaticParam) {

        // TODO: メッセージ対応
        const propsData = (typeof params === String.name.toLowerCase())
            ? Object.assign({}, defaultParam, { message: params })
            : Object.assign({}, defaultParam, params);

        let circularData = { progress: 0 };
        const circular = this.$vdialog.open({
            ...propsData,
            persistent: true,
            fullscreen: true,
            message:
                '<v-container fluid fill-height ' +
                        'style="height: 100%; background-color: rgba(33, 33, 33, 0.46);">' +
                    '<v-layout align-center justify-center>' +
                        '<v-progress-circular color="primary" size="100"' +
                                'style="overflow: hidden;" :rotate="-90" :value="circularData.progress">' +
                        '</v-progress-circular>' +
                    '</v-layout>' +
                '</v-container>',
            computed: {
                circularData: {
                    get() {
                        return circularData;
                    },
                    set(value: any) {
                        circularData = value;
                    },
                },
            },
            onEvents: {
                // tslint:disable-next-line:object-literal-shorthand
                updateProgress: function(this: Vue & { [key: string]: any }
                        , value: number) {
                    this.circularData.progress = value;
                    this.$forceUpdate();
                },
            },
        });

        try {
            const result = await action((percent) => {
                circular.vdialog.$emit('updateProgress', percent);
            });
            circular.vdialog.ok();
            return result;
        } catch (e) {
            circular.vdialog.cancel();
            throw e;
        }
    },

    // tslint:disable-next-line:object-literal-shorthand
    circularTimer: async function<T>(this: Vue, millisec: number,
            params?: string | VProgressProgrammaticParam): Promise<void> {
        await this.$vprogress.circularProgress(async (setProgress) => {
            return await new Promise(async (resolve, reject) => {
                const tick = 500;
                const per1 = 100 / (millisec / tick);
                let i = 1;
                const timer = window.setInterval(() => {
                    i++;
                    setProgress(per1 * i);

                    if (100 < per1 * i) {
                        window.clearInterval(timer);
                        resolve();
                    }
                }, tick);
            });
        });
    },
};

export interface VProgressProgrammaticParam {
    timeout?: number;
    onClose?: (result: VProgressProgrammaticResult) => any;
}

export interface VProgressProgrammaticResult {
    confirm: boolean;
    text: string;
}
