<template>
  <div class="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col m-auto w-1/4 mt-10 bg-red-100">
    <div class="text-xl">Ihere bestellung wurde abgelehnt!</div>
    <button @click="goHome()" class="bg-red-400 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded mt-4">Zurück zum Menü</button>
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
