import Vue from 'vue';
export declare const use: (plugin: any) => void;
export declare const registerComponent: (MyVue: import("vue").VueConstructor<Vue>, component: import("vue").VueConstructor<Vue>) => void;
export declare const registerComponentProgrammatic: (MyVue: import("vue").VueConstructor<Vue>, property: string, component: {
    [key: string]: any;
}) => void;
