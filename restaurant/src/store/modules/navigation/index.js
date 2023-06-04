const state = {
    menuitems: [
        {
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
};

const getters = {
    menuitems: state => {
        return state.menuitems;
    },
    activeitem: state => {
        return state.activeitem;
    },
};

const mutations = {
    activeitem (state, payload) {
        state.activeitem = payload;
    }
};

const actions = {};

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};