<template>
  <div>
    <input type="text" class="form-control marginized" v-model="value" @keyup="getData">
    <div v-if="l_value == ''">
      <span>Start typing above...</span>
    </div>
    <div v-else-if="results.length && truncated">
      <span>Found {{ count }} result(s). Showing first 15 results.</span>
    </div>
    <div v-else>
      <span>Found {{ count }} result(s)</span>
    </div>
    <ul>
      <list-item v-for="result in results" :item="result" :key="result"></list-item>
    </ul>
  </div>
</template>

<script>
import ListItem from './list-item.vue'

export default {
  data: function () {
    return {
      value: '',
      l_value: '',
      results: [],
      count: 0,
      truncated: false
    }
  },
  methods: {
    getData () {
      const that = this;
      Rails.ajax({
        type: 'GET',
        url: `https://wagon-dictionary.herokuapp.com/autocomplete/${escape(this.value)}`,
        success: function(response){
          if (response.words) {
            that.results = response.words;
            that.count = response.count;
            that.truncated = response.truncated_result;
          } else {
            that.results = [];
          }
          // this is needed to not trigger an immediate re-render on value change
          that.l_value = that.value;
        },
        error: function(response){
          console.log(response);
        }
      })
    }
  },
  components: { ListItem }
}
</script>

<style scoped>
</style>
