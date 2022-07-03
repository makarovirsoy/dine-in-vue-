<template>
  <div class="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col m-auto w-1/4 mt-10 bg-green-100">
    <div class="text-xl">Ihere bestellung wuede aufgenommen!</div>
    <button @click="goHome()" class="bg-green-400 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded mt-4">Zurück zum Menü</button>
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
