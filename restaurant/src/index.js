import Vue from 'vue';
import Vuex from 'vuex';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import gql from 'graphql-tag'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: '/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.use(Vuex);
Vue.use(VueApollo);
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
        activeitem: 'restList',
        restaurants: [
            { id: 1, name: 'this', rating: 7, neighborhood: [{name: 'Ehrenfeld', level: 1}, {name: 'Neu-Ehrenfeld', level: 2}] },
            { id: 2, name: 'is'  },
            { id: 3, name: 'mock', rating: 5  },
            { id: 4, name: 'data', rating: 10  },
        ]
    },
    getters: {
        menuitems: state => {
            return state.menuitems;
        },
        activeitem: state => {
            return state.activeitem;
        },
        restaurants: state => {
            return state.restaurants;
        }
    },
    mutations: {
        activeitem (state, payload) {
            state.activeitem = payload;
        }
    },
    actions: {
        fetchAllRestaurantsAsync ({commit}) {
            console.log('hello');
        }
    }
});

var app = new Vue({
    el: '#app',
    template: "<App/>",
    components: { App },
    store: store,
    apolloProvider    
});