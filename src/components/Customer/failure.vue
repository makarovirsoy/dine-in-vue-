<template>
  <div class="flex flex-col h-screen">
    failure

    <button @click="goHome()">Zurück</button>
  </div>


</template>

<script>


export default {
  name: "failure",


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
