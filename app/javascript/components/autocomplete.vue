<template>
  <div>
    <text-input :initVal="value" @inputChanged="getData($event)"></text-input>
    <div v-if="value == ''">
      <span>Start typing above...</span>
    </div>
    <div v-else-if="results.length && truncated">
      <span>Found {{ count }} result(s). Showing first 15 results.</span>
    </div>
    <div v-else>
      <span>Found {{ count }} result(s)</span>
    </div>
    <ul>
      <list-item v-for="result in results" :item="result"></list-item>
    </ul>
  </div>
</template>

<script>
import TextInput from './text-input.vue'
import ListItem from './list-item.vue'

export default {
  data() {
    return {
      value: '',
      results: [],
      count: 0,
      truncated: false
    }
  },
  methods: {
    getData(e) {
      const url = `https://wagon-dictionary.herokuapp.com/autocomplete/${escape(e)}`
      let that = this;
      Rails.ajax({
        type: "GET",
        url,
        success: function(response){
          that.value = e;
          if (response.words) {
            that.results = response.words;
            that.count = response.count;
            that.truncated = response.truncated_result;
          } else {
            that.results = [];
          }
        },
        error: function(response){
          console.log(response)
        }
      })
    }
  },
  components: { ListItem, TextInput }
}
</script>

<style scoped>
</style>
