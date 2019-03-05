<template>
  <div class="toolbar">
    <!--加号菜单-->
    <b-dropdown dropdown no-caret size="sm" variant="link">
      <template slot="button-content">
        <i style="cursor: pointer;" class="fas fa-plus"></i>
      </template>
      <span class="arrow"></span>
      <b-dropdown-item @click="showInputDialog">添加新文本</b-dropdown-item>
      <b-dropdown-item @click="showQC=!showQC">显示/隐藏快速复制</b-dropdown-item>
      <b-dropdown-item v-if="$route.name === 'content'"
                       @click="replaceTxt">执行替换符号脚本</b-dropdown-item>
      <b-dropdown-item @click="$router.push('set')">设置</b-dropdown-item>
      <b-dropdown-item @click="closeSoft">退出</b-dropdown-item>
    </b-dropdown>
    <div class="drag-area" style="-webkit-app-region: drag;"></div>
    <div class="g-quick-cp" v-if="showQC">
      <b-button-group size="sm">
        <b-button :key="index "
                  @click="copyTxt(text)"
                  v-for="(text, index) in textSet"
                  variant="link">
          {{text}}
        </b-button>
      </b-button-group>
    </div>
    <i @click="closeHandle" class="fas fa-times" v-if="$route.name !== 'index'"></i>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  const ipc = require('electron').ipcRenderer

  const clipboard = require('electron').clipboard

  export default {
    name: 'tool-bar',
    data () {
      return {
        text: '',
        showQC: false
      }
    },
    computed: {
      ...mapState({
        textSet: state => state.config.qcList.split('')
      })
    },
    created () {
      this.showQC = this.$store.state.config.qcOpen
    },
    methods: {
      ...mapMutations(['showInputDialog', 'replaceTxt']),
      copyTxt (text) {
        clipboard.writeText(text)
      },
      closeHandle () {
        this.$store.commit('addDoc')
        this.$router.push('index')
      },
      closeSoft () {
        ipc.send('window-close')
      }
    }
  }
</script>

<style lang="scss">
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    box-shadow: 3px 3px 5px #eee;
    height: 40px;
    .drag-area{
      width: 100%;
      height: 100%;
      -webkit-app-region: drag;
    }
    
    i {
      cursor: pointer;
      font-size: 20px;
    }
    .btn-group{
      cursor: pointer;
      button{
        text-decoration: none;
      }
    }
    
    button{
      display: flex;
      align-items: center;
      &:hover{
        text-decoration: none;
      }
    }
    
    .fa-plus {
      color: orange;
    }
    
    .fa-times {
      padding: 4px 8px;
      color: red;
    }
    
    .dropdown-item {
      padding: 5px 20px;
      font-size: 12px;
      line-height: 18px;
      
      &:hover {
        color: orange;
        background-color: #f6f6f6;
      }
    }
    
    .dropdown-menu {
      border: none;
      box-shadow: 0px 0px 5px orange;
    }
    
    .g-quick-cp {
      position: absolute;
      bottom: -35px;
      left: 0px;
      background-color: #fff;
      border: 1px solid #eee;
      button:active{
        background-color: #eee;
      }
    }
    
    .arrow {
      position: absolute;
      left: 12px;
      top: -6px;
      width: 0;
      height: 0;
      border-width: 0 6px 6px;
      border-style: solid;
      border-color: transparent transparent orange;
      
      &:before {
        content: '';
        position: absolute;
        left: -6px;
        display: block;
        width: 0;
        height: 0;
        border-width: 0 6px 6px;
        border-style: solid;
        border-color:  transparent transparent #fff;
      }
    }
    
  }
</style>
