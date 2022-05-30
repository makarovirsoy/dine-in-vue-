<template>
  <div @click="logout()"
       class="p-6 bg-red-300 border-2 border-red-500 rounded-full text-center text-lg text-red-500 hover:bg-red-200  hover:cursor-pointer row-end-1">
    logout
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import router from "../../router";

export default {
  name: 'layout',
  router: useRouter(),
  props: {},

  data() {
    return {};
  },

  computed: {},

  methods: {
    logout: function () {
      this.$cookies.remove('token');
      router.push('/login')
    }
  },

  mounted() {

  },
};
</script>