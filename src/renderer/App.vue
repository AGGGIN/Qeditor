<template>
  <div id="app">
    <div class="g-tool-bar">
      <tool-bar></tool-bar>
    </div>
    <div class="main" id="drag">
      <b-alert class="tip-alert" :show="alertCountDown"
               @dismissed="alertCountDown=0"
               @dismiss-count-down="e => alertCountDown = e"
               variant="warning" dismissible fade>目前只能处理纯文本和docx文件</b-alert>
      <router-view style="padding: 10px"></router-view>
    </div>
    <input-modal ref="inputModal"></input-modal>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar'
  import InputModal from '@/components/InputModal'
  const path = require('path')
  const mammoth = require('mammoth')
  const fs = require('fs')

  export default {
    name: 'qeditor',
    data () {
      return {
        aDoc: [],
        showAlert: false,
        alertCountDown: 0
      }
    },
    methods: {
      saveFile (filePath) {
        const extname = path.extname(filePath)
        let content = ''
        const title = path.basename(filePath)
        if (extname === '.docx') {
          mammoth.extractRawText({path: filePath}).then((result) => {
            content = result.value
            content = content.replace(/\n{3}/g, '\n\n')
            content = content.replace(/\n{2}/g, '\n')
            this.$refs.inputModal.saveDoc(content, title)
          }).done()
        } else if (extname === '.txt') {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) throw err
            content = data
            this.$refs.inputModal.saveDoc(content, title)
          })
        } else {
          this.showAlert = true
          this.alertCountDown = 3
          return false
        }
      },
      getConfig () {
        this.$db.find({type: 'config'}).exec((err, data) => {
          if (err) throw err
        })
      }
    },
    created () {
      this.getConfig()
    },
    components: {ToolBar, InputModal},
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
    .tip-alert{
      margin: 0;
    }
  }
</style>
