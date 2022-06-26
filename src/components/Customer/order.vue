<template>

</template>

<script>
import axios from "axios";
import {url_api} from "../../const/api";

export default {
  name: "order",
  mounted() {
    console.log(this.$cookies.get('order_id'));
    axios.get(url_api + "api/orders/exporttopdf/" + this.$cookies.get('order_id'),{
      responseType:"blob",
    }).then(response => {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "order.pdf";
      window.open(link);
      this.$cookies.remove('order_id');
      this.$cookies.remove('cart');
      this.$router.push('/');
    });
  }
}
</script>

<style scoped>

</style>