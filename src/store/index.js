import { createStore } from 'vuex'
import Api from '@/api/api'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {


    topiclist(ctx,payload){
      return Api.topiclist(payload)
    }
  },
  modules: {
  }
})
