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
      <list-item v-for="result in results" :item="result"></list-item>
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
      const url = `https://wagon-dictionary.herokuapp.com/autocomplete/${escape(this.value)}`
      this.$http.get(url, {
        before(request) {

          if (this.previousRequest) {
            this.previousRequest.abort();
          }

          this.previousRequest = request;
        }
      }).then(response => {
          const data = response.data;

          if (data.words) {
            this.results = data.words;
            this.count = data.count;
            this.truncated = data.truncated_result;
          } else {
            this.results = [];
          }
          // this is needed to not trigger an immediate re-render on value change
          this.l_value = this.value;
        }, response => {
           console.log(response)
        });
    }
  },
  components: { ListItem }
}
</script>

<style scoped>
</style>
