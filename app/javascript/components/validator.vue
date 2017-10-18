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
      let that = this;
      Rails.ajax({
        type: "GET",
        url,
        success: function(response){
          if (response.found) {
            that.found = true;
          } else {
            that.found = false;
          }
          // this is needed to not trigger an immediate re-render on value change
          that.l_value = that.value;
        },
        error: function(response){
          console.log(response)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
