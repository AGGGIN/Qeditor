<template>
  <div class="m-input-modal">
    <b-modal :centered="true" :visible="showDialog"
             id="modal-tall"
             ref="inputModal"
             @hidden="hideHandler"
             :no-close-on-esc="true"
             scrollable title="插入文本">
      <div class="modal-box">
        <b-textarea :no-resize="true" placeholder="输入内容"
                    rows="16"
                    v-model="content"></b-textarea>
      </div>
      <input class="title-input" placeholder="输入标题" slot="modal-title" type="text" v-model="title">
      <div class="footer" slot="modal-footer">
        <b-button @click="saveDoc()" variant="primary">OK</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  export default {
    name: 'input-modal',
    data () {
      return {
        content: '',
        title: ''
      }
    },
    computed: {
      ...mapState({
        showDialog: state => state.inputDialogVisible
      })
    },
    methods: {
      ...mapMutations(['hideInputDialog']),
      hideHandler () {
        this.$refs.inputModal.hide()
        setTimeout(() => {
          this.hideInputDialog()
        }, 500)
      },
      saveDoc (content, title) {
        this.$store.commit('addDoc', {
          title: title || this.title,
          content: content || this.content,
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
