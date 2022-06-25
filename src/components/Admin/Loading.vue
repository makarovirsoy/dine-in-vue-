<template>
  <div class="flex justify-center items-center" v-if="loading === true">
    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span class="visually-hidden">.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props:{
    loading : Boolean,
  }
}
</script>

<style scoped>

</style>