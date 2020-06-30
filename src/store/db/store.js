import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'



const state = {
    id_no: '',

};

const getters = {
    getId: () => state.id_no,

};

const actions = {


    async setCustomerId({commit}, data) {
        await data
        commit('setCustomerId', data)
    },

    getUserState(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('/getUserState', {id_no:data.id_no})
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })

    
  
    },

    setContact(context,data) {
        return new Promise((resolve, reject) => {
            axios.post('/setContact', {
                contact:data.contact,
                id_no:data.id_no
            })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
  
    },
    


};

const mutations = {
    setCustomerId: (state, data) => (state.id_no = data)

};

export default {
    state,
    getters,
    actions,
    mutations
};
