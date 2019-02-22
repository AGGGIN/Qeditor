<template>
  <div class="toolbar">
    <i @click="showInputDialog" class="fas fa-plus"></i>
    <b-button-group size="sm" v-show="false">
      <b-button @click="copyTxt(text)"
                :key="index"
                v-for="(text, index) in textSet">
        {{text}}
      </b-button>
    </b-button-group>
    <i class="fas fa-times" v-if="$route.name !== 'index'"></i>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  const clipboard = require('electron').clipboard

  export default {
    name: 'tool-bar',
    data () {
      return {
        text: '',
        textSet: ['＠', '＃', '％', '￥', '♪', '♡', '※']
      }
    },
    methods: {
      ...mapMutations(['showInputDialog']),
      copyTxt (text) {
        clipboard.writeText(text)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 3px 3px 5px #eee;
    line-height: 40px;
    i{
      cursor: pointer;
    }
    .fa-plus {
      color: orange;
    }
    .fa-times{
      color: red;
    }
  }
</style>
