<template>
  <div class="c-history">
    <div class="title">
      <h5 v-if="docList.length">最近打开</h5>
      <b-button size="lg"
                v-if="docList.length"
                v-b-modal.modal-delConfirm
                variant="link">
        <i class="fas fa-backspace"></i>
      </b-button>
    </div>
    <b-modal id="modal-delConfirm" cancel-title="不了"
             ok-title="好的"
             @ok="deleteAll" title="认真的吗" >
      <p class="my-4">确定要删除所有的文档吗？</p>
    </b-modal>
    <b-list-group class="list">
      <b-list-group-item :key="index"
                         @click="clickDoc(item)"
                         class="flex-column align-items-start"
                         href="#"
                         v-for="(item, index) in docList"
                         v-if="item.cDown >= 0">
        <div class="top" v-if="item.title">
          <h5>{{item.title}}</h5>
          <small>{{item.date | relTime}}</small>
        </div>
        <p class="summary">
          {{item.content}}
        </p>
        <div class="bottom">
          <template v-if="item.cDown === MAX">
            <b-button @click.stop="startCountDown(item)" size="sm" variant="link">删除文档</b-button>
          </template>
          <template v-else>
            <b-button @click.stop="deleteDoc(item)" size="sm" variant="link">立即删除</b-button>
            <b-button @click.stop="cancelDel(item)" style="color: green" size="sm" variant="link">取消</b-button>
            <b-progress :max="4" :value="item.cDown" animated size="mini"></b-progress>
          </template>
          <small v-if="!item.title">{{item.date | relTime}}</small>
        </div>
      </b-list-group-item>
    </b-list-group>
    <div class="empty" v-if="docList.length === 0">
      <img src="../assets/images/null.svg" alt="">
      <h4>什么都没有</h4>
    </div>
  </div>
</template>

<script>
  import 'dayjs/locale/zh-cn'
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  const MAX = 5

  dayjs.locale('zh-cn')
  dayjs.extend(relativeTime)

  export default {
    data () {
      return {
        text: '',
        docList: [],
        MAX: MAX
      }
    },
    components: {},
    filters: {
      relTime (time) {
        return dayjs().from(dayjs(time))
      }
    },
    methods: {
      deleteAll () {
        this.docList = []
        this.$db.remove({}, {multi: true}, (err, ret) => {
          console.log(err, ret)
        })
      },
      deleteDoc (doc) {
        doc.cDown = -1
        clearInterval(doc.timmer)
        this.$db.remove({_id: doc._id}, (err, ret) => {
          if (err) throw err
        })
      },
      cancelDel (doc) {
        doc.cDown = MAX
        clearInterval(doc.timmer)
        doc.timmer = null
      },
      startCountDown (doc) {
        doc.cDown = MAX - 1
        doc.timmer = setInterval(() => {
          if (doc.cDown < 0) {
            this.deleteDoc(doc)
          }
          doc.cDown -= 1
        }, 1000)
      },
      clickDoc (doc) {
        if (doc.cDown < MAX) {
          return false
        }
        this.$store.commit('setNowDoc', doc)
        this.$router.push('content')
      }
    },
    created () {
      this.$db.find({type: 'doc'}).sort({date: -1}).exec((err, ret) => {
        if (err) throw err
        if (ret.length) {
          ret.map((item) => {
            item.cDown = 5
            item.timmer = null
          })
        }
        this.docList = ret
      })
    }
  }
</script>

<style lang="scss">
  .c-history {
    .title {
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button{
        padding: 0;
        margin: 0;
        color: #999;
        &:hover{
          color: #666;
        }
      }
    }
    .list {
      padding: 5px 0;
      .top{
        display: flex;
        justify-content: space-between;
        i{
          font-size: 20px;
          color: #333;
        }
      }
      .bottom{
        padding-top: 10px;
        line-height: 26px;
      }
      button {
        margin: 0;
        padding: 0;
        font-size: 12px;
      }
      
      p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 13px;
      }
      
      h5 {
        font-size: 16px;
      }
      
      small {
        float: right;
        font-size: 12px;
        color: #999;
      }
    }
    .empty{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      h4{
        margin-top: 15px;
        font-size: 30px;
        color: #eee;
      }
    }
  }
</style>
