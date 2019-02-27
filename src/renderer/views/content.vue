<template>
  <div class="p-content">
    <b-form-textarea
            v-for="(text, index) in aDoc"
            :key="index"
            max-rows="10"
            :no-resize="true"
            @focus.native="copyAll($event)"
            @blur.native="cleanEmpty($event)"
            v-if="aDoc[index]"
            v-model="aDoc[index]"
    />
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        text: ''
      }
    },
    computed: {
      ...mapState({
        title: state => state.nowDoc.title,
        aDoc: state => {
          if (!state.nowDoc.content) {
            return ''
          }
          let content = state.nowDoc.content
          return content.split('\n\n')
        }
      })
    },
    components: {},
    methods: {
      copyAll (event) {
        event.target.select()
        document.execCommand('copy')
      },
      cleanEmpty (el) {
        if (!el.target.innerHTML) {
          el.target = null
        }
        console.log('123', el.target.innerHTML)
      }
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
