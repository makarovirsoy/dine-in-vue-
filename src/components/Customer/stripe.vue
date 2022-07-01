<template>
  <div>
    <stripe-checkout
        ref="checkoutRef"
        mode="payment"
        :pk="this.$data.publishableKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="v => loading = v"
    />
  </div>
</template>

<script>

import {StripeCheckout} from '@vue-stripe/vue-stripe';
import {url_front} from "../../const/api";

export default {
  name: "stripe",
  components: {
    StripeCheckout,
  },

  props: {
    productsCount: Number,
  },

  data() {
    return {
      publishableKey: 'pk_test_51LB1lTIfZHesEHNYEg3lfFisJLB6HNBO870zoI9aKddrpCBKELKaZumwUO3PlJ3xVYdQ96xGk0NQ6Yu6vtklYFKs006GStO9MB',
      loading: false,
      lineItems: [
        {
          price: 'price_1LB2WnIfZHesEHNYe4Y5qgmi', // The id of the recurring price you created in your Stripe dashboard
          quantity: Number(this.$props.productsCount),
        },
      ],
      successURL: url_front + 'order',
      cancelURL: url_front + 'failure',
    };
  },
  methods: {},
  mounted() {
    this.$refs.checkoutRef.redirectToCheckout();
  }
};
</script>