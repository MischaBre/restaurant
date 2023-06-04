import Vue from "vue";
import Vuex from "vuex";

import restaurants from './modules/restaurants';
import navigation from './modules/navigation';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        restaurants: restaurants,
        navigation: navigation
    }
});