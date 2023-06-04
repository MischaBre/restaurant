import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state =  {
    restaurants: [
        /*
        { id: 1, name: 'this', rating: 7, neighborhood: [{name: 'Ehrenfeld', level: 1}, {name: 'Neu-Ehrenfeld', level: 2}] },
        { id: 2, name: 'is'  },
        { id: 3, name: 'mock', rating: 5  },
        { id: 4, name: 'data', rating: 10  },
        */
    ]
};

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
};