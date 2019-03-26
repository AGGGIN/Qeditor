<template>
  <div class="p-content">
    <b-form-textarea
            :key="index"
            :no-resize="true"
            @focus.native.once="smartSelect($event, item)"
            @select.native="item.hasSelect && selectHandle($event, item)"
            max-rows="20"
            rows="1"
            v-for="(item, index) in aDoc"
            v-if="item.content"
            v-model="item.content"
    />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import _ from 'lodash'

  export default {
    data () {
      return {
        text: '',
        selectReg: ''
      }
    },
    computed: {
      ...mapState({
        title: state => state.nowDoc.title,
        aDoc: state => {
          if (!state.nowDoc.content) {
            return []
          }
          let content = state.nowDoc.content.split('\n\n').map(item => {
            return {
              content: _.trim(item),
              hasSelect: false,
              count: 0,
              select: [],
              index: [],
              time: []
            }
          })
          return content
        },
        autoSelect: state => state.config.autoSelect
      })
    },
    components: {},
    methods: {
      copyAll (event) {
        event.target.select()
        document.execCommand('copy')
      },
      smartSelect (event, item) {
        // 开头单行的数字不选择
        setTimeout(() => {
          item.hasSelect = true
        }, 30)
        if (this.autoSelect === false) {
          this.copyAll(event)
          return true
        }
        let content = event.target.value
        let line = content.split('\n')[0]
        if (this.selectReg.test(line)) {
          event.target.setSelectionRange(line.length + 1, content.length)
          document.execCommand('copy')
        } else {
          this.copyAll(event)
        }
      },
      selectHandle (event, item) {
        let start = event.target.selectionStart
        let end = event.target.selectionEnd
        this.addRecord(item, start, end)
      },
      addRecord (item, start, end) {
        item.select.push(item.content.slice(start, end))
        item.index.push(`${start},${end}`)
        item.time.push(Date.now())
        item.count += 1
        let data = {
          count: item.count,
          content: item.content,
          type: 'log',
          select: item.select,
          time: item.time,
          index: item.index
        }
        if (item.count === 1) {
          this.$db.insert(data)
        }
        this.$db.update({content: item.content}, {
          $set: data
        })
      }
    },
    mounted () {
      // 一个通用的表达式
      let reg = new RegExp(/(\S+)?\s?\d+$/, 'g')
      let regArr = []
      this.aDoc.forEach(item => {
        let str = item.content.split('\n')[0]
        if (str && reg.test(str)) {
          regArr.push(str.match(reg)[0])
        } else {
          return false
        }
      })
      let aLike = _.groupBy(regArr, item => {
        return item.replace(/\d+/g, '')
      })
      let max = 0
      for (let key in aLike) {
        if (aLike[key].length > max) {
          max = aLike[key].length
          this.selectReg = new RegExp(`^${key}\\d+`, 'i')
        }
      }
      this.selectReg = this.selectReg ? this.selectReg : /\d+/
    }
  }
</script>

<style lang="scss">
  .p-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    
    textarea.form-control {
      margin-bottom: 10px;
      border: none;
      line-height: 28px;
    }
  }
</style>
