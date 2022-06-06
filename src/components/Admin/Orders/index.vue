<template>
  <Layout>
    <slot>
      <div class="ml-20 py-4 flex-grow flex flex-col">
        <h1 class="block mb-4 mx-auto  text-xl font-medium text-purple-600">Bestellungen</h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-20">
          <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-purple-500 uppercase bg-purple-100 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Bestellungsnummer
              </th>
              <th scope="col" class="px-6 py-3">
                status
              </th>
              <th scope="col" class="px-6 py-3">
                Tisch
              </th>
              <th scope="col" class="px-6 py-3">
                Preis
              </th>
              <th scope="col" class="px-6 py-3">
                Zahlung
              </th>
            </tr>
            </thead>

            <tbody>
            <tr class="bg-white border-b text-purple-400">
              <th scope="row" class="px-6 py-4 font-medium text-purple-900 whitespace-nowrap" v-for="order in this.$data.orders">
                 order.id
              </th>
              <td class="px-6 py-4">
                lifetung
              </td>
              <td class="px-6 py-4">
                order.status
              </td>
              <td class="px-6 py-4">
                 order.sum
              </td>
              <td class="px-6 py-4">
                 order.payment
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </slot>
  </Layout>
</template>

<script>
import Layout from '../layout.vue'
import axios from "axios";
import {url_api} from "../../../const/api";


export default {
  name: 'index',
  components: {Layout},
  props: {},

  data() {
    return {
      orders: null,
    };
  },

  computed: {},

  methods: {},

  mounted() {
    axios.get(url_api + 'api/orders', {
      headers: {Authorization: 'Bearer ' + this.$cookies.get('token')}
    }).then(response => {
      this.$data.orders = response.data;
    });
  },

};
</script>