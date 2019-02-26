<template>
  <div id="app">
    <div class="g-tool-bar">
      <tool-bar></tool-bar>
    </div>
    <div class="main">
      <router-view style="padding: 10px"></router-view>
    </div>
    <input-modal @save="doc2arr" v-if="showDialog"></input-modal>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar'
  import InputModal from '@/components/InputModal'
  import AutoArea from '@/components/AutoArea'
  import {mapState} from 'vuex'

  export default {
    name: 'qeditor',
    data () {
      return {
        aDoc: []
      }
    },
    methods: {
      doc2arr (content) {
        this.aDoc = content.split('\n\n')
      },
      copyAll (event) {
        event.target.select()
        document.execCommand('copy')
      }
    },
    components: {ToolBar, InputModal, AutoArea},
    computed: {
      ...mapState({
        showDialog: state => state.inputDialogVisible
      })
    }
  }
</script>

<style lang="scss">
  /* CSS */
  body {
    width: 100vw;
    height: 100vh;
  }
  
  .g-tool-bar {
    position: fixed;
    width: 100%;
    z-index: 99;
    background-color: #fff;
  }
  
  .main {
    position: relative;
    width: 100vw;
    height: 100vh;
    padding-top: 40px;
    overflow: hidden;
  }
</style>
