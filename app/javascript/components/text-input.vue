<template>
  <input type="text" class="form-control marginized" v-model="value" @input="emitChanged">
</template>

<script>
export default {
  data() {
    return {
      value: this.initVal
    }
  },
  methods: {
    emitChanged(e) {
      this.$emit('inputChanged', this.value)
    }
  },
  props: ['initVal']
}
</script>
