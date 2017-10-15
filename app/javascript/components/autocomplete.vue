<template>
  <div>
    <input type="text" class="form-control" v-model="value" v-on:keyup="getData">
    <span>Found {{ results.length }} result(s)</span>
    <ul>
      <li v-for="result in results">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      value: '',
      results: []
    }
  },
  methods: {
    getData () {
      console.log('ajax fired for: ' + this.value)
      const that = this;
      Rails.ajax({
        type: 'GET',
        url: "https://wagon-dictionary.herokuapp.com/autocomplete/" + this.value,
        success: function(response){
          if (response.words) {
            that.results = response.words;
          } else {
            that.results = [];
          }
        },
        error: function(response){
          console.log(response);
        }
      })
    }
  }
}
</script>

<style scoped>
p {
  color: red;
  font-size: 2em;
  text-align: center;
}
</style>
