<template>
  <router-view>
  </router-view>
</template>

<script>

import VueCookies from 'vue-cookies'
import store from '@/store'
import router from '@/router/index'
import Axios from 'axios'
import Vue from 'vue'
import VueMask from 'v-mask'
Vue.use(VueMask)

export default {
  name: 'App',
  async mounted () {
    console.log('app created');

    const token = VueCookies.get('token');
    if (token == undefined) {
      VueCookies.remove('token');    
    }

    if (token != null && token.length > 100){
      
      console.log('checking token');
      this.checkAuth(token);
    }
  },
  methods: {
  checkAuth (token) {
      Axios({
            url:process.env.VUE_APP_API_HOST+'auth/validate',
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer' + ' ' + token,
            }
          })
          .then(( response ) => {
              this.$store.dispatch('validate', response.data.data);
          })
          .catch( (error) => {
              store.dispatch('deauthenticate')
              .then(()=> router.push('/pages/login'))
          })      
    }
}
};

</script>

<style lang="scss">
  @import 'assets/scss/style';

</style>