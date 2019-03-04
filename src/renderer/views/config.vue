<template>
  <div class="p-config">
    <b-card no-body>
      <b-nav pills slot="header">
        编辑器设置
      </b-nav>
      <b-card-body
              id="nav-scroller"
              ref="content">
        <div class="panel" id="qc">
          <div class="title">
            <h5>快速复制</h5>
            <p class="desc">在菜单可以开启快速复制的工具栏</p>
          </div>
          <div class="content">
            <b-form-checkbox size="sm" switch v-model="qcOpen" name="check-button">
              默认开启快速复制
            </b-form-checkbox>
            <div>
              <p class="desc">快速复制栏的符号，初始值为＠＃％￥♪♡※〝〞</p>
              <b-form-input size="sm" v-model="qcList" type="text"
                            placeholder="比如：＠＃％￥♪♡※" />
            </div>
          </div>
        </div>
        <div class="panel" id="select">
          <div class="title">
            <h5>智能全选</h5>
            <p class="desc">避开页码和不需要的文本</p>
          </div>
          <div class="content">
            <b-form-checkbox size="sm" switch v-model="autoSelect" name="check-button">
              开启智能全选
            </b-form-checkbox>
          </div>
        </div>
        <div class="panel auto-update">
          <div class="title">
            <h5>自动更新</h5>
          </div>
          <div class="content">
            <b-form-checkbox size="sm" switch v-model="autoUpdate" name="check-button">
              开启自动更新
            </b-form-checkbox>
            <b-button size="sm" class="update-btn" variant="outline-primary">手动更新</b-button>
          </div>
        </div>
        <b-button block variant="primary">保存设置</b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'config',
    data () {
      return {
        isQcOpen: false,
        autoSelect: false,
        autoUpdate: true,
        qcList: ''
      }
    },
    methods: {
      saveConfig () {
      }
    }
  }
</script>

<style lang="scss">
  .p-config{
    position: relative;
    overflow: auto;
    height: 100%;
    p{
      margin-bottom: 5px;
      font-size: 14px;
    }
    .card{
      height: 100%;
      .nav-item{
        font-size: 14px;
        line-height: 16px;
      }
    }
    
    .panel{
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      margin-bottom: 10px;
      &:last-child{
        background-color: red !important;
        border: none !important;
      }
      .title{
        display: flex;
        justify-content: space-between;
        h5{
          font-size: 18px;
          line-height: 26px;
          border-left: 5px solid orange;
          padding-left: 10px;
        }
      }
      .content{
        > div {
          margin-bottom: 10px;
          line-height: 24px;
        }
      }
      .custom-control{
        font-size: 12px;
      }
      .desc{
        display: inline-block;
        color: #999;
        font-size: 12px;
        margin-bottom: 0;
        &:before{
          content: '*';
        }
      }
    }
    .auto-update{
      .content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        >div{
          margin: 0;
        }
      }
      .update-btn{
        display: inline-block;
        font-size: 12px;
        height: 30px;
      }
    }
  }
</style>
