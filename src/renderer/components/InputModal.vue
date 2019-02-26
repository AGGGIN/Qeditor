<template>
  <div class="m-input-modal">
    <b-modal :centered="true" :visible="true"
             id="modal-tall"
             ref="inputModal"
             :no-close-on-esc="true"
             scrollable title="插入文本">
      <div class="modal-box">
        <b-textarea :no-resize="true" placeholder="输入内容"
                    rows="16"
                    v-model="content"></b-textarea>
      </div>
      <input class="title-input" placeholder="输入标题" slot="modal-title" type="text" v-model="title">
      <div class="footer" slot="modal-footer">
        <b-button @click="replaceTxt">执行脚本</b-button>
        <b-button @click="saveDoc" variant="primary">保存文档</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  const rules = require('../assets/rules')
  export default {
    name: 'input-modal',
    data () {
      return {
        content: '',
        title: ''
      }
    },
    methods: {
      ...mapMutations(['hideInputDialog']),
      hideHandler () {
        this.$refs.inputModal.hide()
        setTimeout(() => {
          this.hideInputDialog()
        }, 500)
      },
      replaceTxt () {
        for (let key in rules) {
          this.content = this.content.replace(new RegExp(key, 'g'), rules[key])
        }
      },
      saveDoc () {
        this.$store.commit('addDoc', {
          title: this.title,
          content: this.content,
          type: 'doc',
          date: Date.now()
        })
        this.hideHandler()
        this.$router.push('content')
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  .m-input-modal {
    .footer {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      
      button {
        margin-left: 10px;
      }
    }
    
    .title-input {
      border: none;
      outline: none;
      color: #333;
    }
    
    .modal-box {
      textarea {
        font-size: 14px;
      }
    }
    
    .modal-title {
      width: 80%;
      input{
        display: inline-block;
        width: 100%;
      }
    }
  }
</style>
