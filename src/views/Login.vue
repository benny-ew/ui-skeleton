<template>
  <div class="flex-row c-app align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login" > 
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <p v-if="isError" class="alert alert-danger" role="alert">{{ error }}</p>
                  <CInput
                    v-model="email"
                    name="email"
                    placeholder="Email"
                    autocomplete="username email"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    v-model="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" type="submit" >Login</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard><CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  to="register"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import Axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email:'',
      password:'',
      error:'',
      isError:false
    }
  },
  created () {

    const token = VueCookies.get('token')

    if (token === 'undefined') {
        VueCookies.remove('token')
    }

    if (token != null && token.length > 100){
      this.checkAuth( token )
    }
    
  },
  methods: {
    login () {
      Axios({
        url: process.env.VUE_APP_API_HOST+'auth/login',
        method:'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          email:this.email,
          password:this.password,
        }
      })
      .then((response) => {
         this.$store.dispatch('authenticate', response.data.data)
          .then(() => {
            this.$router.push('/');
          })
      })
      .catch(( error ) => {
          this.isError = true
          this.error = error.response.data.data.error
          this.email = ''
          this.password = ''
      })
    },

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
                this.$store.dispatch('validate', response.data.data)
                this.$router.push('/')
          })
          .catch( (error) => {
              this.isError = true
              this.error = error.response.data.message
          })      
    }
  }
}
</script>
