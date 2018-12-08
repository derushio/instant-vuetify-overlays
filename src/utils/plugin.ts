import Vue from 'vue';

export const use = (plugin: any) => {
    if (typeof window !== 'undefined' && (window as any).Vue) {
        (window as any).Vue.use(plugin);
    }
};

export const registerComponent = (MyVue: typeof Vue,
        component: typeof Vue) => {
    MyVue.component(component.name, component);
};

export const registerComponentProgrammatic = (MyVue: typeof Vue,
        property: string, component: { [key: string]: any }) => {
    MyVue.prototype.__defineGetter__(property, function(this: Vue) {
        const actions = {} as { [key: string]: any };
        for (const key of Object.keys(component)) {
            actions[key] = component[key].bind(this);
        }
        return actions;
    });
};
