<template>
  <div>
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

<style lang="sass" scoped>
</style>
