<template>
  <Layout>
    <div>
      <div
          class=" m-auto  w-1/2 h-auto outline-none overflow-x-hidden overflow-y-auto border border-emerald-500 rounded-2xl"
          id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog relative w-auto pointer-events-none">
          <div
              class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
                class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-emerald-200 rounded-t-md">
              <h5 class="text-xl font-medium leading-normal text-emerald-800" id="exampleModalLabel">Neue Speise
                hinzufügen</h5>
            </div>
            <div class="modal-body justify-around p-4">
              <form class=" mx-auto">
                <div class="mb-6">
                  <label for="name" class="block mb-2 text-lg font-medium text-emerald-500">Name</label>
                  <input type="text" id="name"
                         class="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xl rounded-lg focus:ring-blue-500 focus:border-emerald-500 block w-1/2 p-2 "
                         v-model="form.dish.name">
                </div>
                <div class="mb-6">
                  <label for="price" class="block mb-2 text-lg font-medium text-emerald-500">Preis</label>
                  <input type="text" id="price"
                         class="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xl rounded-lg focus:ring-blue-500 focus:border-emerald-500 block w-1/2 p-2 "
                         v-model="form.dish.price">
                </div>

                <div class="mb-6">
                  <label for="description"
                         class="block mb-2 text-lg font-medium text-emerald-500">Beschreibung</label>
                  <textarea id="description" rows="4"
                            class="block p-2 w-1/2 text-xl text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Beschreiben Sie die Speise" v-model="form.dish.description"></textarea>
                </div>
                <div class="mb-6">
                  <label for="additives" class="block mb-2 text-lg font-medium text-emerald-500">Zusatzstoffe</label>
                  <textarea id="additives" rows="4"
                            class="block p-2 w-1/2 text-xl text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Zusatzstoffe" v-model="form.dish.additive"></textarea>
                </div>
                <div class="mb-6">
                  <label for="allergy" class="block mb-2 text-lg font-medium text-emerald-500">Allergene</label>
                  <textarea id="allergy" rows="4"
                            class="block p-2 w-1/2 text-xl text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Allergene" v-model="form.dish.allergy"></textarea>
                </div>

                <div class="mb-6">
                  <label for="photo" class="block mb-2 text-lg font-medium text-emerald-500">Bild Hochladen</label>
                  <input
                      class="w-1/2 text-sm text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent"
                      aria-describedby="cover" id="photo" type="file" accept="image/*" @change="handleImage">
                </div>

                <div class="mb-6">
                  <label for="availability"
                         class="block mb-2 text-lg font-medium text-emerald-500">verfügbarkeit</label>
                  <div class="flex items-center" id="availability">
                    <input id="availability" aria-describedby="checkbox-1" type="checkbox"
                           class="w-4 h-4 text-emerald-600 bg-emerald-50  rounded border-emerald-300 focus:ring-emerald-500 focus:ring-2"
                           checked v-model="form.dish.availability">
                    <label for="availability" class="ml-3 text-sm font-medium text-emerald-900">Speise wird auf dem Menu angezeigt</label>
                  </div>
                </div>

                <div class="mb-6">
                  <label for="countries" class="block mb-2 text-lg font-medium text-emerald-500">Kategorie</label>
                  <select id="countries"
                          class="border border-emerald-300 bg-emerald-50 text-emerald-600 text-lg rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-1/2 p-2"
                          v-model="form.categoryId">
                    <option v-for="category in this.$data.categories" :value="category.id">{{ category.name }}
                    </option>
                  </select>
                </div>
              </form>
            </div>
            <div
                class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-emerald-200 rounded-b-md">
              <button type="button"
                      class="px-6 py-2.5 bg-white text-emerald font-medium text-xs leading-tight uppercase rounded-md border border-emerald-500 shadow-md hover:bg-emerald-200 hover:shadow-lg focus:bg-emerald-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-400 active:shadow-lg transition duration-150 ease-in-out"
                      @click.prevent="$router.push('/dishes')">Zurück
              </button>
              <button type="button" @click="submit()"
                      class="px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out  ml-1">
                Speichern
              </button>
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
import Layout from "../Layout.vue";
import router from "../../../router";

export default {
  name: 'create',
  components: {Layout},


  props: {},

  data() {
    return {
      categories: null,
      form: {
        dish: {
          name: 'null',
          price: 'null',
          description: 'null',
          additive: 'null',
          allergy: 'null',
          base64Image: null,
          availability: true,
        },
        categoryId: null,
      }
    };
  },

  computed: {},

  methods: {
    submit: function () {
      console.log(this.$data.form);

      axios.post('https://ewdschrott.herokuapp.com/api/adddishtocategory', this.$data.form, {
        headers: {Authorization: `Bearer ${VueCookies.get('token')}`,}
      }).then(response => {
        $router.push('/dishes')
      });
    },
    handleImage(e) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.form.dish.base64Image = e.target.result;
      };
      reader.readAsBinaryString(selectedImage);
    },
  },

  mounted() {
    axios.get('https://ewdschrott.herokuapp.com/api/categories', {
      headers: {Authorization: 'Bearer ' + this.$cookies.get('token')}
    }).then(response => {
      this.$data.categories = response.data;
    });
  },
};
</script>