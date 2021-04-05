<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://byrn.io" target="_blank">Byrn</a>
      <span class="ml-1">&copy; 2021 - {{new Date().getFullYear()}} SMTLabs.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://coreui.io/vue">CoreUI</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
