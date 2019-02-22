<template>
  <div id="app">
    <div class="g-tool-bar">
      <tool-bar></tool-bar>
    </div>
    <div class="main" v-if="false">
      <template v-for="(text, index) in aDoc">
        <b-form-textarea
                :key="index"
                :no-resize="true"
                @click.native="copyAll($event)"
                v-if="aDoc[index]"
                v-model="aDoc[index]"
        />
      </template>
    </div>
    <div class="main">
      <router-view></router-view>
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
  
  textarea.form-control {
    margin: 10px 0;
    border: none;
  }
  
  .main {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding: 60px 10px;
  }
</style>
