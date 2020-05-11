 import Vue from 'https://unpkg.com/vue@2.6.10/dist/vue.esm.browser.min.js';
    
    import VueRouter from 'https://unpkg.com/vue-router@3.1.3/dist/vue-router.esm.browser.min.js';
    Vue.use(VueRouter);
    let routes = [];
    const router = new VueRouter({
        mode: 'history',
        routes
    });

    import Vuex from 'https://unpkg.com/vuex@3.1.1/dist/vuex.esm.browser.min.js';
    Vue.use(Vuex);

    import rect from "./store/modules/rect/index.js";
    const store = new Vuex.Store({
        namespaced: true,
        state: {},
        mutations: {},
        actions: {},
        getters: {},
        modules: {'rect':  rect },
        strict: true
    });

    import app from "./app.js";
    import * as svgicon from './vue-svgicon.js';

    Vue.use(svgicon, {
        tagName: 'svgicon'
    });


    window.vm = new Vue({
    store,
    router,
    mixins:[],
    data(){ 
        return {
        }
    },
    el:'#app',
    methods:{},
    computed:{},
    watch: {},
    components: { app },
    template: '<app/>',
    // render : h => h(App),
    beforeCreate  () { /* console.log('beforeCreate'); */ },
    created       () { /* console.log('created'); */ },
    beforeMount   () { /* console.log('beforeMount'); */ },
    mounted       () { /* console.log('mounted'); */    },
    beforeUpdate  () { /* console.log('beforeUpdate'); */ },
    updated       () { /* console.log('updated'); */ },
    beforeDestroy () { /* console.log('beforeDestroy'); */ },
    destroyed     () { /* console.log('destroyed'); */ },
    })	
