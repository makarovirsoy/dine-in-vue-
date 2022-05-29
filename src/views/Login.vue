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
                 v-model="form.username"
                 placeholder="Username" required>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                 id="password"
                 type="password"
                 v-model="form.password"
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
import {reactive} from "vue";
import {useRouter} from "vue-router";

export default {

  name: 'login',

  setup() {
    const form = reactive({
      username: 'yosri',
      password: 'yosri',
    })

    const router = useRouter();

    const submit = async () => {
      axios.post("https://ewd-backend-main.herokuapp.com/api/authenticate", form, /*{withCredentials: true}*/).then(response => {
        //this.cookies.set('user', response.data);
      }).then(router.push('/dashboard'));

    }

    return {
      form,
      submit
    }
  },

  props: {},

  data() {
    return {
      test: 'hello',
    }
  },

  computed: {},

  methods: {},

  mounted() {
  }
  ,
}
;
</script>