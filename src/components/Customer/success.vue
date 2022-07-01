<template>
  <div class="flex flex-col h-screen">
    success

    <button @click="goHome()">Zurück</button>
  </div>


</template>

<script>


export default {
  name: "success",


  methods: {
    goHome() {
      this.$router.push('/1');

    },


    mounted() {

    },
  }
}
;
</script>
