<template>
  <div class="p-config">
    <b-card no-body>
      <b-nav pills slot="header">
        编辑器设置
      </b-nav>
      <b-card-body>
        <div class="panel">
          <div class="title">
            <h5>快速复制</h5>
            <p class="desc">在菜单可以开启快速复制的工具栏</p>
          </div>
          <div class="content">
            <b-form-checkbox name="check-button" size="sm" switch v-model="showQC">
              默认开启快速复制
            </b-form-checkbox>
            <div>
              <p class="desc">快速复制栏的符号，初始值为＠＃％￥♪♡※〝〞</p>
              <b-form-input placeholder="比如：＠＃％￥♪♡※" size="sm" type="text"
                            v-model="qcList"/>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="title">
            <h5>智能全选</h5>
            <p class="desc">避开页码和不需要的文本</p>
          </div>
          <div class="content">
            <b-form-checkbox name="check-button" size="sm" switch v-model="autoSelect">
              开启智能全选
            </b-form-checkbox>
          </div>
        </div>
        <div class="panel auto-update">
          <div class="title">
            <h5>自动更新</h5>
          </div>
          <div class="content">
            <b-form-checkbox name="check-button" size="sm" switch v-model="autoUpdate">
              开启自动更新
            </b-form-checkbox>
            <b-button class="update-btn" size="sm" variant="outline-primary">手动更新</b-button>
          </div>
        </div>
        <div class="panel log">
          <div class="title">
            <h5>日志</h5>
          </div>
          <div class="content">
            <b-button @click="exportLog"
                      size="sm"
                      variant="outline-success">导出日志
            </b-button>
            <b-button @click="deleteLog" size="sm">清除日志</b-button>
            <span class="delete-tip" v-if="showDelTip">清除完成！</span>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  const {dialog} = require('electron').remote
  const fs = require('fs')
  const path = require('path')

  export default {
    name: 'set',
    data () {
      return {
        isQcOpen: false,
        autoSelect: false,
        autoUpdate: true,
        qcList: '',
        showDelTip: false,
        playLog: []
      }
    },
    methods: {
      saveConfig () {
      },
      deleteLog () {
        // this.$db.remove({type: 'log'}, {multi: true})
        this.showDelTip = true
        setTimeout(() => {
          this.showDelTip = false
        }, 2000)
      },
      exportLog () {
        dialog.showOpenDialog({properties: ['openDirectory', 'createDirectory', 'promptToCreate', 'message']},
          filePaths => {
            let fileName = path.resolve(filePaths[0], `Qeditor-play${Date.now()}.log`)
            fs.writeFile(fileName, JSON.stringify(this.playLog), (err, data) => {
              if (err) throw err
            })
          })
      }
    },
    created () {
      this.showQC = this.$store.state.config.qcOpen
      this.$db.find({type: 'log'}, (err, data) => {
        if (err) throw err
        this.playLog = data
      })
    }
  }
</script>

<style lang="scss">
  .p-config {
    position: relative;
    overflow: auto;
    height: 100%;
    
    p {
      margin-bottom: 5px;
      font-size: 14px;
    }
    
    .card {
      height: auto;
      
      .nav-item {
        font-size: 14px;
        line-height: 16px;
      }
    }
    
    .card-body {
      height: auto;
    }
    
    .panel {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      margin-bottom: 10px;
      
      &:last-child {
        border: none !important;
        padding-bottom: 0px;
      }
      
      .title {
        display: flex;
        justify-content: space-between;
        
        h5 {
          font-size: 18px;
          line-height: 26px;
          border-left: 5px solid orange;
          padding-left: 10px;
        }
      }
      
      .content {
        > div {
          margin: 10px 0px;
          line-height: 24px;
        }
      }
      
      .custom-control {
        font-size: 12px;
      }
      
      .desc {
        display: inline-block;
        color: #999;
        font-size: 12px;
        margin-bottom: 0;
        
        &:before {
          content: '*';
        }
      }
    }
    
    .auto-update {
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        > div {
          margin: 0;
        }
      }
      
      .update-btn {
        display: inline-block;
        font-size: 12px;
        height: 30px;
      }
    }
    
    .log {
      .content {
        display: flex;
        margin: 10px 0 -10px 0;
        align-items: flex-end;
      }
      
      button {
        margin-right: 10px;
      }
      
      .delete-tip {
        font-size: 12px;
        color: green;
      }
    }
  }
</style>
