<template>
  <div>
    <input type="text" class="form-control marginized" v-model="value" v-on:keyup="getData">
    <div v-if="l_value == ''">
      <span>Start typing above...</span>
    </div>
    <div v-else-if="found">
      <span>{{ l_value }} is a word!</span>
    </div>
    <div v-else>
      <span>{{ l_value }} is not a word...</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      value: '',
      l_value: '',
      found: null
    }
  },
  methods: {
    getData () {
      const url = `https://wagon-dictionary.herokuapp.com/${escape(this.value)}`
      this.$http.get(url, {
        before(request) {

          if (this.previousRequest) {
            this.previousRequest.abort();
          }

          this.previousRequest = request;
        }
      }).then(response => {
          const data = response.data;

          if (data.found) {
            this.found = true;
          } else {
            this.found = false;
          }
          // this is needed to not trigger an immediate re-render on value change
          this.l_value = this.value;
        }, response => {
           console.log(response)
        });
    }
  }
}
</script>

<style scoped>
</style>
