<template>
  <div class="auto-area">
  </div>
</template>

<script>
  const clipboard = require('electron').clipboard

  export default {
    name: 'auto-area',
    data () {
      return {
      }
    },
    methods: {
      copyTxt (text) {
        clipboard.writeText(text)
      }
    }
  }
</script>

<style lang="scss">
  .auto-area {
  }
</style>
