<template>
  <div class="p-content">
    <b-form-textarea
            v-for="(text, index) in aDoc"
            :key="index"
            max-rows="10"
            :no-resize="true"
            @click.native="copyAll($event)"
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .p-content {
    textarea.form-control {
      margin: 5px 0;
      border: none;
      line-height: 28px;
    }
  }
</style>
