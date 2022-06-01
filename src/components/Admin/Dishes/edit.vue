<template>
  <Layout>
    <slot>
      <div
          class=" m-auto  w-1/2 h-auto outline-none overflow-x-hidden overflow-y-auto border border-emerald-500 rounded-2xl"
          id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog relative w-auto pointer-events-none">
          <div
              class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
                class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-emerald-200 rounded-t-md">
              <h5 class="text-xl font-medium leading-normal text-emerald-800" id="exampleModalLabel">Speise
                Bearbeiten</h5>

            </div>
            <form @submit.prevent="submit">
              <div class="modal-body justify-around p-4">
                <form class=" mx-auto">
                  <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-lg font-medium text-emerald-500">Name</label>
                    <input type="text" id="base-input"
                           class="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xl rounded-lg focus:ring-blue-500 focus:border-emerald-500 block w-1/2 p-2 " :value="form.name">
                  </div>
                  <div class="mb-6">
                    <label for="base-input" class="block mb-2 text-lg font-medium text-emerald-500">Preis</label>
                    <input type="text" id="price-input"
                           class="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xl rounded-lg focus:ring-blue-500 focus:border-emerald-500 block w-1/2 p-2 " :value="form.price">
                  </div>

                  <div class="mb-6">
                    <label for="base-input"
                           class="block mb-2 text-lg font-medium text-emerald-500">Beschreibung</label>
                    <textarea id="message" rows="4"
                              class="block p-2 w-1/2 text-xl text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="Beschreiben Sie die Speise" :value="form.description"></textarea>
                  </div>
                  <div class="mb-6">
                    <label for="additives"
                           class="block mb-2 text-lg font-medium text-emerald-500">Zusatzstoffe</label>
                    <textarea id="additives" rows="4"
                              class="block p-2 w-1/2 text-xl text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="Zusatzstoffe" :value="form.additive"></textarea>
                  </div>
                  <div class="mb-6">
                    <label for="allergene" class="block mb-2 text-lg font-medium text-emerald-500">Allergene</label>
                    <textarea id="allergene" rows="4"
                              class="block p-2 w-1/2 text-xl text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="Allergene" :value="form.allergy"></textarea>
                  </div>

                  <div class="mb-6">
                    <label for="photo" class="block mb-2 text-lg font-medium text-emerald-500">Bild Hochladen</label>
                    <div v-if="form.base64Image">
                    <img src="{{form.base64Image}}" />
                    </div>
                    <input
                        class="w-1/2 text-sm text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent"
                        aria-describedby="cover" id="photo" type="file" >
                  </div>

                  <div class="mb-6">
                    <label for="availability"
                           class="block mb-2 text-lg font-medium text-emerald-500">verfügbarkeit</label>
                    <div class="flex items-center" id="availability" >
                      <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox"
                             class="w-4 h-4 text-emerald-600 bg-emerald-50  rounded border-emerald-300 focus:ring-emerald-500 focus:ring-2"
                             :checked="form.availability" >
                      <label for="checkbox-1" class="ml-3 text-sm font-medium text-emerald-900">Speise wird auf dem
                        Menu
                        angezeigt</label>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label for="categories" class="block mb-2 text-lg font-medium text-emerald-500">Kategorie</label>
                    <select id="categories"
                            class="border border-emerald-300 bg-emerald-50 text-emerald-600 text-lg rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-1/2 p-2" >
                      <option v-for="category in this.$data.categories" value="{{ category.id }}" :selected="form.category">{{category.name}}
                      </option>
                    </select>
                  </div>
                </form>


              </div>
              <div
                  class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-emerald-200 rounded-b-md">
                <button type="button" class="px-6
          py-2.5
          bg-white
          text-emerald
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded-md
          border
          border-emerald-500
          shadow-md
          hover:bg-emerald-200 hover:shadow-lg
          focus:bg-emerald-200 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-emerald-400 active:shadow-lg
          transition
          duration-150
          ease-in-out" @click.prevent="$router.push('/dishes')">Zurück
                </button>
                <button type="submit" class="px-6
      py-2.5
      bg-emerald-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-emerald-700 hover:shadow-lg
      focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-emerald-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1">Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </slot>
  </Layout>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import Layout from "../Layout.vue";

export default {
  name: 'create',
  components: {Layout},


  props: {
    dish: [Array, Object],
    categories: [Array, Object],
  },

  data() {
    return {
      form: {
        id: null,
        name: null,
        price: null,
        description: null,
        additive: null,
        allergy: null,
        base64Image: null,
        category: null,
        availability: null,
      }
    };
  },

  computed: {},

  methods: {
    submit: function () {
      console.log(this.$data.form);
      axios.put('https://ewdschrott.herokuapp.com/api/dishs/'+this.$route.params.id, this.$data.form, {
        headers: {Authorization: `Bearer ${VueCookies.get('token')}`,}
      }).then(response => {
        console.log(response.data);
      });
    }


  },

  mounted() {
    axios.get('https://ewdschrott.herokuapp.com/api/categories', {
      headers: {Authorization: 'Bearer ' + this.$cookies.get('token')}
    }).then(response => {
      this.$data.categories = response.data;
    });

    axios.get('https://ewdschrott.herokuapp.com/api/dishes/' + this.$route.params.id, {
      headers: {Authorization: `Bearer ${VueCookies.get('token')}`,}
    }).then(response => {
      this.$data.form = response.data
    });
  },
};
</script>