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
              <th scope="col" class="px-6 py-3">
                Datum
              </th>
              <th scope="col" class="px-6 py-3">
                Kunde
              </th>
              <th scope="col" class="px-6 py-3">
                Rechnung
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white border-b text-purple-400" v-for="order in this.$data.orders">
              <th scope="row" class="px-6 py-4 font-medium text-purple-900 whitespace-nowrap">
                {{ order.id }}
              </th>
              <td class="px-6 py-4">
                {{ order.id }}
              </td>
              <td class="px-6 py-4">
                {{ order.table }}
              </td>
              <td class="px-6 py-4">
                {{ order.sum }}
              </td>
              <td class="px-6 py-4">
                {{ order.payment }}
              </td>
              <td class="px-6 py-4">
               {{ new Date(order.date).toLocaleString("de-DE", dateTimeFormat) }}
              </td>
              <td class="px-6 py-4">
                {{ order.client.email }}
              </td>
              <td class="px-6 py-4">
                <button @click="downloadPdf(order.id)">
                  pdf
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <Loading :loading="this.$data.loading"></Loading>
        </div>
      </div>
    </slot>
  </Layout>
</template>

<script>
import Layout from '../layout.vue'
import axios from "axios";
import {url_api} from "../../../const/api";
import Loading from "../Loading.vue";


export default {
  name: 'index',
  components: {Loading, Layout},
  props: {},

  data() {
    return {
      orders: null,
      loading:true,
      dateTimeFormat: { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },

    };
  },

  computed: {},

  methods: {
    downloadPdf(id) {
      axios.get(url_api + "api/orders/exporttopdf/" + id, {
        headers: {Authorization: 'Bearer ' + this.$cookies.get('token')},
        responseType:"blob",
      }).then(response => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "order.pdf";
        window.open(link);
      });
    },
  },

  mounted() {
    axios.get(url_api + 'api/orders', {
      headers: {Authorization: 'Bearer ' + this.$cookies.get('token')}
    }).then(response => {
      this.$data.orders = response.data;
      this.loading = false;
    });
  },

};
</script>