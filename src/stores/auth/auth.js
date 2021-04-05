
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use( VueCookies )

const state = {
  isAuthenticated: false,
  isLoading:false,
  permissions: new Array(),
  roles: new Array(),
  companyId:'',
  companyName:'',
  user:{
    id:'',
    name:'',
    email:''
  }
}

const mutations = {
  authenticate( state, token, user ) {
    state.isAuthenticated=true;
    state.user=user; 
    state.permissions= permission;
    state.roles= role;
    state.companyId= companyId;
    state.companyName= companyName;
  },
  deauthenticate( state ) {
    state.token="";
    state.isAuthenticated=false;
  },
  setLoading( state, value ){
    state.isLoading = value
  },
  setAuthentication( state, value ){
    state.isAuthenticated = value
  },
  setUser( state, value ){
    state.user = value
  },
  setPermission( state, value ){
    state.permissions = value
  },
  setRole( state, value ){
    state.roles = value
  },
  setCompany( state, value ){
    state.companyId = value
  },
  setCompanyName( state, value ){
    state.companyName = value
  },
}

const getters = {
  isAuthenticated: (state) => {
    return state.isAuthenticated
  },
  getpermission: ( state ) => {
    return state.permissions
  },
  getrole: ( state ) => {
    return state.roles
  },
  getCompany: ( state ) => {
    return state.companyId
  },
  getCompanyName: ( state ) => {
    return state.companyName
  }
}

const actions = {
  authenticate ( context, data ){
    
    const user = {
      id:data.id,
      name:data.name,
      email:data.email,
    }

    context.commit('setLoading', true);
    context.commit('setAuthentication', true);
    context.commit('setUser', user);
    context.commit('setPermission', data.permissions);
    context.commit('setRole', data.roles);
    context.commit('setCompany', data.companyId);
    context.commit('setCompanyName', data.companyName);
    VueCookies.set('token', data.token, 36000);
    context.commit('setLoading', false);
  },

  validate ( context, data ){
    
    const user = {
      id:data.id,
      name:data.name,
      email:data.email,
    }

    context.commit('setLoading', true);
    context.commit('setAuthentication', true);
    context.commit('setUser', user);
    context.commit('setPermission', data.permissions);
    context.commit('setRole', data.roles);
    context.commit('setCompany', data.companyId);
    context.commit('setCompanyName', data.companyName);
    context.commit('setLoading', false);
  },

  deauthenticate( context ){
    const user = {
      id:null,
      name:null
    }
    context.commit('setLoading', true);
    context.commit('setAuthentication', false);
    context.commit('setPermission',  new Array());
    context.commit('setRole',  new Array());
    context.commit('setCompany',  '');
    context.commit('setCompanyName',  '');
    context.commit('setUser', user);
    VueCookies.remove('token');
    context.commit('setLoading', false);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
