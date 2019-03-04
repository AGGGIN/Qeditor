<template>
  <div class="p-index">
    <history-list class="history-list"></history-list>
  </div>
</template>

<script>
  import HistoryList from '@/components/HistoryList'
  export default {
    data () {
      return {
        text: ''
      }
    },
    components: {
      HistoryList
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  .p-index{
    position: relative;
    overflow: auto;
    height: 100%;
  }
</style>
