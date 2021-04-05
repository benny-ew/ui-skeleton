<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Change Password
    </CDropdownItem>
    <CDropdownItem  @click="logout" >
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods:{
    logout(){

      const logoutRequest = () => {
        const uri = process.env.VUE_APP_API_HOST+'logout';
        console.log('do logging out');
      }
      
      this.$store.dispatch('deauthenticate')
        .then(()=>this.$router.push('/login'))
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>