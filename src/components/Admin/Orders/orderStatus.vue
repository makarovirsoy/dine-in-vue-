<template>
  <Layout>
    <slot>
      <div class="flex flex-row">
        <div class="flex flex-col mb-10 ">
          <div>Bestellungsnummer : {{ this.order.id }}</div>
          <div>Tischnummer : {{ this.order.table }}</div>
          <div>Kommentar : {{ this.order.comment }}</div>
          <div>kunde : {{ this.order.client.name }}</div>
        </div>
        <div class="ml-20 py-4 flex-grow flex flex-col  items-center">
          <div class="items-center">
            <div v-for="(dish,index) in this.products" @click="done(index)"
                 class=" items-center border border-orange-500 mb-10 rounded w-fit flex flex-row p-4 bg-green-200 hover:cursor-pointer">
              <img :src="dish.product.base64Image" width="100">
              <div class="p-5">
                <div>Kategory: {{ dish.product.categoryName }}</div>
                <div>Speise: {{ dish.product.id }} : {{ dish.product.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-20 py-4 flex-grow flex flex-col  items-center">
          <div class="items-center">
            <div v-for="dish in this.productsDone"
                 class=" items-center border border-orange-500 mb-10 rounded w-fit flex flex-row p-4 bg-red-300">
              <img :src="dish.product.base64Image" width="100">
              <div class="p-5">
                <div>Kategory: {{ dish.product.categoryName }}</div>
                <div>Speise: {{ dish.product.id }} : {{ dish.product.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </Layout>
</template>

<script>
import axios from "axios";
import {url_api} from "../../../const/api";
import Layout from "../layout.vue";

export default {
  name: "orderStatus",
  components: {Layout},
  data() {
    return {
      order: null,
      ordersDone: null,
      products: [],
      productsDone: []
    }
  },

  created() {
    this.loadOrders();
  },


  watch: {
    products: {
      handler(n, o) {
        console.log(this.$data.products.length);
        if (this.$data.products.length === 0){
        this.updateStatus();
        }
      },
      deep: true,
    },
  },

  methods: {
    done(id) {
      this.$data.productsDone.push(this.products[id]);
      this.$data.products = this.$data.products.filter(function(value, index, arr=this.$data.products){
        return index !== id;
      });
    },

    updateStatus(){
      axios.put(url_api + 'api/orders/' + 68, {
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('token'),
        },
        data: { status: 'done'}
      }).then(response => {
        this.$data.products = JSON.parse(response.data.cart);
        this.$data.order = response.data;
      });
    },

    loadOrders(){
      axios.get(url_api + 'api/orders', {
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('token'),
          status : 'payed',
        }
      }).then(response => {
        this.$data.products = JSON.parse(response.data.cart);
        this.$data.order = response.data;
      });
    }
  }
}
</script>
