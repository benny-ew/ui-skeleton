<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134"
      />
      
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="navItems"/>
    
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import store from '@/store'
import constant from '@/constant'

const amountWithPoint = ( x ) => {
    return 'Rp. '+ x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const contains = (target, pattern) => {
    var value = false;
    pattern.forEach(function(word){
      value = target.includes(word);
    });
    return (value === true)
}

const AllMenuItems = [
  {
    _name: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-chart-pie',
    permission: constant.permissions.get('DASHBOARD'),
  },
];

export default {
  name: 'TheSidebar',
  data (){
    return {
      menuList:'',
    }
  },
  beforeCreate () {

  },
  methods:{
    
  },

  computed: {
    navItems(){
      return [
        {
          _name: 'CSidebarNav',
          _children: this.currentItems
        }
      ]
    },
    currentItems() {
      return AllMenuItems.filter(item => {
        return store.state.auth.permissions.includes(item.permission) || item.permission == 'none';
      });
    },
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
