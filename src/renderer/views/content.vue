<template>
  <div class="p-content">
    <tool-bar></tool-bar>
    <div class="container">
      <b-textarea :no-resize="true"
                  v-model="text"></b-textarea>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        text: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .p-content {
  
  }
</style>
