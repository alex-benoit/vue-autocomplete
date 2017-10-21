<template>
  <div>
    <text-input :initVal="value" @inputChanged="getData($event)"></text-input>
    <div v-if="value == ''">
      <span>Start typing above...</span>
    </div>
    <div v-else-if="found">
      <span>{{ value }} is a word!</span>
    </div>
    <div v-else>
      <span>{{ value }} is not a word...</span>
    </div>
  </div>
</template>

<script>
import TextInput from './text-input.vue'

export default {
  data: function () {
    return {
      value: '',
      found: null
    }
  },
  methods: {
    getData(e) {
      const url = `https://wagon-dictionary.herokuapp.com/${escape(e)}`
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
          that.value = e;
        },
        error: function(response){
          console.log(response)
        }
      })
    }
  },
  components: { TextInput }
}
</script>

<style scoped>
</style>
