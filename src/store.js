import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/stores/auth/auth'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  unpaidInvoice:2,
  openedTransaction:3,
  currentDeposit:1000000,
  toasts:0,
  toastItem:{
    title:'',
    message:'',
    color:''
  }
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  setToastItem (state, data) {
    state.toastItem = data
  },
  addToast (state) {
    state.toasts ++
  }
}

const getters = {
  getToastItem: ( state ) => {
    return state.toastItem
  },
}

const actions = {
  toasting ( context, data ) {
    context.commit('addToast')
    context.commit('setToastItem', data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    auth,
  },
})