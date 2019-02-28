<template>
  <div id="app">
    <div class="g-tool-bar">
      <tool-bar></tool-bar>
    </div>
    <div class="main" id="drag">
      <router-view style="padding: 10px"></router-view>
    </div>
    <input-modal ref="inputModal"></input-modal>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar'
  import InputModal from '@/components/InputModal'
  import AutoArea from '@/components/AutoArea'
  const path = require('path')
  const mammoth = require('mammoth')

  export default {
    name: 'qeditor',
    data () {
      return {
        aDoc: []
      }
    },
    methods: {
      saveFile (filePath) {
        mammoth.extractRawText({path: filePath}).then((result) => {
          let content = result.value
          content = content.replace(/\n{3}/g, '\n\n')
          content = content.replace(/\n{2}/g, '\n')
          const title = path.basename(filePath)
          this.$refs.inputModal.saveDoc(content, title)
        }).done()
      }
    },
    components: {ToolBar, InputModal, AutoArea},
    mounted () {
      const area = document.getElementById('drag')
      area.ondragenter = area.ondragover = area.ondragleave = (e) => {
        e.preventDefault()
      }
      area.ondrop = (e) => {
        e.preventDefault()
        let filePath = e.dataTransfer.files[0].path
        this.saveFile(filePath)
      }
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
