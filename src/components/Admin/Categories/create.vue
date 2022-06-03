<template>
  <Layout>
  <div >
    <div class=" m-auto  w-3/4 h-auto outline-none overflow-x-hidden overflow-y-auto border border-fuchsia-500 rounded-2xl"
        id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog relative w-auto pointer-events-none">
        <div
            class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div
              class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-fuchsia-200 rounded-t-md">
            <h5 class="text-xl font-medium leading-normal text-fuchsia-800" id="exampleModalLabel">Neue Kategorie hinzufügen</h5>
          </div>
          <div class="modal-body relative p-4">


              <div class="mb-6">
                <label for="name" class="block mb-2 text-lg font-medium text-fuchsia-500">Kategorie Name</label>
                <input type="text" id="name-input"
                       class="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-900 text-xl rounded-lg focus:ring-blue-500 focus:border-fuchsia-500 block w-1/2 p-2 " v-model="form.name">
              </div>
              <div
                  class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-fuchsia-200 rounded-b-md">
                <button type="submit" class="px-6
          py-2.5
          bg-white
          text-fuchsia
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded-md
          border
          border-fuchsia-500
          shadow-md
          hover:bg-fuchsia-200 hover:shadow-lg
          focus:bg-fuchsia-200 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-fuchsia-400 active:shadow-lg
          transition
          duration-150
          ease-in-out" @click.prevent="close">Abbrechen
                </button>
                <button type="submit" class="px-6
      py-2.5
      bg-fuchsia-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-fuchsia-700 hover:shadow-lg
      focus:bg-fuchsia-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-fuchsia-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1" @click.prevent="submit">Speichern
                </button>

              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Layout>
</template>

<script>

import axios from "axios";
import VueCookies from "vue-cookies";
import router from "../../../router";
import Layout from "../layout.vue";

export default {
  name: 'create',
  components: {Layout},
  props: {
  },

  data() {
    return {
      form: {
        name: null,
      },
    };
  },

  computed: {},

  methods: {
    submit() {
      console.log(this.$data.form);
      axios.post('https://ewdschrott.herokuapp.com/api/categories', this.$data.form, {
        headers: {Authorization: `Bearer ${VueCookies.get('token')}`,}
      })
      router.push('/categories');
    },
  },

  mounted() {

  },
};
</script>