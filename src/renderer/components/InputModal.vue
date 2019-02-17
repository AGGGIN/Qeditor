<template>
  <div class="input-modal">
    <b-modal id="modal-tall" scrollable :visible="true"
             @hide="hideHandler"
             @ok="saveDoc"
             :centered="true" title="复制翻译文本">
      <div class="modal-b1ox">
          <b-textarea rows="16" v-model="content"
                      :no-resize="true"></b-textarea>
        <b-button v-if="content"
                  @click="replaceFun"
                  size="sm" block variant="outline-success">
          执行脚本
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  const clipboard = require('electron').clipboard

  export default {
    name: 'input-modal',
    data () {
      return {
        content: ''
      }
    },
    methods: {
      ...mapMutations(['hideInputDialog']),
      copyTxt (text) {
        clipboard.writeText(text)
      },
      hideHandler () {
        setTimeout(() => {
          this.hideInputDialog()
        }, 500)
      },
      saveDoc () {
        this.$emit('save', this.content)
        this.hideHandler()
      },
      replaceFun () {
        this.content.replace()
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
</style>
