import Vue from 'vue';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const store = new Vuex.Store({
    state: {
        menuitems: [{
                name: 'restList',
                icon: 'list-ul'
            },
            {
                name: 'restAdd',
                icon: 'plus-circle'
            },
            {
                name: 'restMap',
                icon: 'pin-map'
            },
        ],
        activeitem: 'restList'
    },
    getters: {
        menuitems: state => {
            return state.menuitems;
        },
        activeitem: state => {
            return state.activeitem;
        }
    },
    mutations: {
        activeitem (state, payload) {
            state.activeitem = payload;
        }
    }
})

var app = new Vue({
    el: '#app',
    template: "<App/>",
    components: { App },
    store: store
});