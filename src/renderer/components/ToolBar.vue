<template>
  <div class="toolbar">
    
    <!--加号菜单-->
    <b-dropdown dropright no-caret size="sm" variant="link">
      <template slot="button-content">
        <i class="fas fa-plus"></i>
      </template>
      <span class="arrow"></span>
      <b-dropdown-item @click="showInputDialog">添加新文本</b-dropdown-item>
      <b-dropdown-item @click="showQC=!showQC">显示/隐藏快速复制</b-dropdown-item>
      <b-dropdown-item @click="$router.push('config')">设置</b-dropdown-item>
    </b-dropdown>
    
    <div class="g-quick-cp" v-if="false">
      <b-button-group size="sm">
        <b-button :key="index "
                  @click="copyTxt(text)"
                  v-for="(text, index) in textSet">
          {{text}}
        </b-button>
      </b-button-group>
    </div>
    <router-link to="index">
      <i class="fas fa-times" v-if="$route.name !== 'index'"></i>
    </router-link>
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
        showQC: false,
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

<style lang="scss">
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 5px 10px;
    box-shadow: 3px 3px 5px #eee;
    height: 40px;
    i {
      cursor: pointer;
      font-size: 20px;
    }
    
    .fa-plus {
      color: orange;
    }
    
    .fa-times {
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
    
    .arrow {
      position: absolute;
      left: -5px;
      top: 10px;
      width: 0;
      height: 0;
      border-width: 6px 6px 6px 0;
      border-style: solid;
      border-color: transparent orange transparent transparent;
      &:before {
        content: '';
        position: absolute;
        top: -6px;
        left: 1px;
        display: block;
        width: 0;
        height: 0;
        border-width: 6px 5px 6px 0;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
      }
    }
    
  }
</style>
