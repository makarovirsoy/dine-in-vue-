<template>
  <form @submit.prevent="submit">
    <div class="flex h-screen justify-center">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8  flex flex-col m-auto w-1/4">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username"
                 type="text"
                 v-model="this.$data.username"
                 placeholder="Username" required>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                 id="password"
                 type="password"
                 v-model="this.$data.password"
                 placeholder="******************"
                 required>
        </div>

        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" type="submit">
          Sign In
        </button>

      </div>
    </div>

  </form>
</template>

<script>
import axios from 'axios';
import {useRouter} from "vue-router";
import router from "../router";

export default {

  name: 'login',

  router: useRouter(),

  props: {},

  data() {
    return {
      username: 'yosri',
      password: 'yosri',
    }
  },

  computed: {},

  methods: {
    submit: function () {
      axios.get("https://ewdschrott.herokuapp.com/api/login", {
        'headers': {'Authorization': 'Basic ' + btoa(this.$data.username + ':' + this.$data.password)},
      }).then(response => {
        if (response.headers.token){
        this.$cookies.set('token', response.headers.token);
        router.push('/dashboard')
        }
      })
    }
  },

  mounted() {
  }
  ,
}
;
</script>