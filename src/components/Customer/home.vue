<template>

  <div class="flex flex-col h-screen">
    <div
        class="
        md:w-screen
        h-64
        lg:h-96
        bg-amber-400
        py-8
        md:px-40
        flex flex-col
        justify-between
        bg-cover bg-no-repeat
      "
        style="background-image: url('https://wallpaper.dog/large/20491982.jpg')"
    >
      <div class="flex flex-row justify-end">
        <div
            class="
            flex flex-row
            bg-orange-500
            p-2
            rounded-2xl
            hover:cursor-pointer
            hidden
            lg:flex
          "
            @click="openCartModal()"
        >
          <div class="rounded-xl bg-white p-2">
            {{ this.$data.cartProducts }}
          </div>

          <div class="ml-2 py-2">Bestellung ansehen</div>

          <div class="ml-2 py-2">{{ this.$data.checkoutForm.sum }} €</div>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-xl inline lg:text-5xl text-white">Willkommen</div>
        <div
            class="
            font-sans
            block
            mt-4
            inline-block
            mt-0
            ml-6
            align-middle
            text-orange-600
            hover:text-gray-700
            lg:hidden
            mr-4
          "
            @click="openCartModal()"
        >
          <div class="relative flex">
            <svg class="flex-1 w-8 h-8 fill-current" viewbox="0 0 24 24">
              <path
                  d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"
              />
            </svg>
            <span
                class="
                absolute
                right-0
                top-0
                rounded-full
                bg-white
                w-4
                h-4
                top
                right
                p-0
                m-0
                text-black
                font-mono
                text-sm
                leading-tight
                text-center
              "
            >{{ this.$data.cartProducts }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 justify-center shadow shadow-2xl">
      <div
          class="
          flex flex-nowrap
          my-4
          p-4
          w-full
          md:w-1/2
          mx-auto
          overflow-scroll overflow-y-auto
          scrollbar-hide
        "
      >
        <div
            class="
            mx-2
            p-2
            border border-orange-400
            rounded-xl
            text-orange-500
            hover:cursor-pointer
          "
            v-for="category in categories"
            :key="category.id"
        >
          <a :href="'#'+category.id">{{ category.name }}</a>
        </div>
      </div>
    </div>

    <div class="mt-4 mx-4 md:mt-10 md:mx-80 mx-auto">
      <div v-for="category in categories"
           :key="category.id" class="text font-bold mt-0 mb-6">

        <div class="text-center m-4 p-2 border border-orange-400 rounded-xl text-orange-500 hover:cursor-pointer" >{{ category.name }}</div>
        <div class="flex flex-row flex-wrap justify-center scroll-auto mb-16">

          <div :id="category.id"
               class="
            bg-white
            rounded-xl
            border border-orange-200
            shadow-md
            m-2
            lg:w-3/4
            xl:w-1/4
            w-full
            hover:cursor-pointer

          "
               v-for="dish in category.dishes"
               :key="index"
               @click="openDishModal(dish)"
          >
            <img
                class="rounded-t-lg object-cover h-64 w-full"
                :src="dish.base64Image"
                alt="dish "
            />
            <div class="p-5">
              <div class="flex justify-between">
                <h5 class="text-lg lg:text-2xl font-bold">{{ dish.name }}</h5>
                <p class="text-xl text-orange-500">{{ dish.price }} €</p>
              </div>
              <p class="mt-2 font-normal text-gray-900 dark:text-gray-400">
                {{ dish.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <TransitionRoot as="template" :show="this.$data.showDish">
    <Dialog as="div" class="relative z-10" @close="this.$data.showDish = false">
      <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
            class="
            flex
            items-end
            sm:items-center
            justify-center
            min-h-full
            p-4
            text-center
            sm:p-0
          "
        >
          <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
                class="
                relative
                bg-white
                rounded-lg
                text-left
                overflow-hidden
                shadow-xl
                transform
                transition-all
                sm:w-full
                md:w-3/4
                xl:w-1/4
                border border-orange-500
              "
            >
              <div
                  @click="this.$data.showDish = false"
                  class="
                  mx-auto
                  flex-shrink-0 flex
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-100
                  h-10
                  w-10
                  top-4
                  right-4
                  hover:cursor-pointer
                  absolute
                "
              >
                <XIcon class="h-6 w-6 text-orange-600" aria-hidden="true"/>
              </div>
              <img
                  class="object-cover h-64 w-full"
                  :src="currentDish.base64Image"
              />

              <div class="m-5">
                <div class="flex justify-between">
                  <h5 class="text-2xl font-bold">
                    {{ this.$data.currentDish.name }}
                  </h5>
                  <p class="text-xl text-orange-500">
                    {{ this.$data.currentDish.price }} €
                  </p>
                </div>
                <p class="mt-2 font-normal text-gray-500">
                  {{ this.$data.currentDish.description }}
                </p>
                <hr class="my-4"/>
                <h4 class="mt-4 text-xl font-bold">Zusatsstoffe</h4>
                <div class="flex flex-wrap">
                  <p class="mt-2 font-normal text-gray-500 mr-2">
                    {{ this.$data.currentDish.additive }}
                  </p>
                </div>
                <hr class="my-4"/>
                <h4 class="mt-4 text-xl font-bold">Allergene</h4>
                <div class="flex flex-wrap">
                  <p class="mt-2 font-normal text-gray-500 mr-2">
                    {{ this.$data.currentDish.allergy }}
                  </p>
                </div>
                <hr class="my-4"/>
              </div>
              <div class="flex mx-5 justify-around mb-2 text-white mb-5">
                <div class="flex bg-orange-500 rounded-xl">
                  <div
                      class="py-2 p-4 hover:cursor-pointer text-xl"
                      @click="decrementOrderToPlace()"
                  >
                    -
                  </div>
                  <div class="py-2 px-4 text-xl">{{ toOrderDishCount }}</div>
                  <div
                      class="py-2 p-4 hover:cursor-pointer text-xl"
                      @click="incrementOrderToPlace()"
                  >
                    +
                  </div>
                </div>
                <div
                    class="flex bg-orange-500 rounded-xl hover:cursor-pointer"
                    @click="addToCart()"
                >
                  <div class="text-lg py-2 px-4 md:text-xl">Bestellen</div>
                  <div class="text-lg py-2 px-4 md:text-xl">
                    {{ currentDish.price * toOrderDishCount }} €
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template" :show="this.$data.ShowCart">
    <Dialog as="div" class="relative z-10" @close="this.$data.ShowCart = false">
      <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
            class="
            flex
            items-end
            sm:items-center
            justify-center
            min-h-full
            p-4
            text-center
            sm:p-0
          "
        >
          <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
                class="
                relative
                bg-white
                rounded-lg
                text-left
                overflow-hidden
                shadow-xl
                transform
                transition-all
                sm:w-full
                md:w-3/4
                xl:w-1/4
                border border-orange-500
              "
            >
              <div class="m-5">
                <div class="flex justify-between">
                  <h5 class="text-2xl font-bold">Bestellung</h5>
                  <div
                      @click="this.$data.ShowCart = false"
                      class="
                      flex-shrink-0 flex
                      items-center
                      justify-center
                      h-8
                      w-8
                      rounded-full
                      bg-orange-100
                      hover:cursor-pointer
                    "
                  >
                    <XIcon class="h-4 w-4 text-orange-600" aria-hidden="true"/>
                  </div>
                </div>

                <hr class="my-4"/>

                <div v-if="this.$data.cart.length === 0">
                  Fügen Sie Ihre lieblings Speise.
                </div>

                <div class="flex flex-wrap">
                  <div
                      class="
                      font-normal
                      flex
                      w-full
                      justify-between
                      items-center
                      my-2
                    "
                      v-for="(orderedProduct, index) in this.$data.cart"
                      :key="index"
                  >
                    <div class="flex">
                      <div>
                        <img
                            :src="orderedProduct.product.base64Image"
                            class="w-20 h-20 rounded-lg"
                            alt="image"
                        />
                      </div>
                      <div class="flex flex-col ml-2">
                        <h4 class="mt-4 text-xl font-bold">
                          {{ orderedProduct.product.name }}
                        </h4>
                        <p class="text-xl text-orange-500">
                          {{
                            orderedProduct.count * orderedProduct.product.price
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="flex bg-orange-500 rounded-xl h-fit">
                      <div
                          class="p-2 hover:cursor-pointer text-xl"
                          @click="
                          orderedProductCountDecrement(orderedProduct, index)
                        "
                      >
                        -
                      </div>
                      <div class="p-2 text-xl">{{ orderedProduct.count }}</div>
                      <div
                          class="p-2 hover:cursor-pointer text-xl"
                          @click="orderedProductCountIncrement(orderedProduct, index)"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4"/>
              </div>
              <div class="flex mx-5 justify-around mb-2 text-white mb-5">
                <div
                    class="
                    flex
                    bg-orange-500
                    rounded-xl
                    hover:cursor-pointer
                    w-full
                  "
                >
                  <div
                      class="py-2 px-4 mx-auto text-xl"
                      @click="openCheckoutModal()"
                      v-if="cartProducts > 0"
                  >
                    Zur Kasse
                    {{ this.$data.checkoutForm.sum }}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template" :show="this.$data.checkout">
    <Dialog as="div" class="relative z-10" @close="this.closeCheckoutModal()">
      <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
            class="
            flex
            items-end
            sm:items-center
            justify-center
            min-h-full
            p-4
            text-center
            sm:p-0
          "
        >
          <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
                class="
                relative
                bg-white
                rounded-lg
                text-left
                overflow-hidden
                shadow-xl
                transform
                transition-all
                sm:w-full
                md:w-3/4
                xl:w-1/4
                border border-orange-500
              "
            >
              <div class="m-5">
                <div class="flex justify-between">
                  <h5 class="text-2xl font-bold">Kasse</h5>
                  <div
                      @click="this.$data.checkout = false"
                      class="
                      flex-shrink-0 flex
                      items-center
                      justify-center
                      h-8
                      w-8
                      rounded-full
                      bg-orange-100
                      hover:cursor-pointer
                    "
                  >
                    <XIcon class="h-4 w-4 text-orange-600" aria-hidden="true"/>
                  </div>
                </div>

                <hr class="my-4"/>

                <div class="flex flex-col">
                  <label>Name</label>
                  <input
                      placeholder="name"
                      type="text"
                      id="name"
                      v-model="this.$data.checkoutForm.client.name"
                      class="
                      bg-orange-50
                      border border-orange-300
                      text-orange-900 text-xl
                      rounded-lg
                      focus:ring-orange-500 focus:border-orange-500
                      block
                      p-2
                      mb-4
                    "
                  />

                  <label>Email</label>
                  <input
                      placeholder="email"
                      type="email"
                      id="email"
                      v-model="this.$data.checkoutForm.client.email"
                      class="
                      bg-orange-50
                      border border-orange-300
                      text-orange-900 text-xl
                      rounded-lg
                      focus:ring-orange-500 focus:border-orange-500
                      block
                      p-2
                      mb-4
                    "
                  />

                  <label>Telefon</label>
                  <input
                      placeholder="tel"
                      type="tel"
                      id="tel"
                      v-model="this.$data.checkoutForm.client.phone"
                      class="
                      bg-orange-50
                      border border-orange-300
                      text-orange-900 text-xl
                      rounded-lg
                      focus:ring-orange-500 focus:border-orange-500
                      block
                      p-2
                      mb-4
                    "
                  />

                  <label class="mb-4">Tishnummer : {{ this.$data.checkoutForm.table }}</label>


                  <label>Zahlungsmethode</label>
                  <div class="flex items-center mr-4 mb-4">
                    <input
                        id="paypal"
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked
                        v-model="this.$data.checkoutForm.payment"
                    />
                    <label for="radio1" class="ml-2 flex items-center cursor-pointer">
                      Stripe</label
                    >
                  </div>

                  <div class="flex items-center mr-4 mb-4">
                    <input
                        id="cash"
                        type="radio"
                        name="payment"
                        value="cash"
                        v-model="this.$data.checkoutForm.payment"
                    />
                    <label
                        for="radio2"
                        class="ml-2 flex items-center cursor-pointer"
                    >
                      Bar geld</label
                    >
                  </div>

                  <label>Anmerkungen</label>
                  <textarea
                      placeholder="Anmerkungen"
                      type="text"
                      id="text"
                      v-model="this.$data.checkoutForm.comment"
                      class="
                      bg-orange-50
                      border border-orange-300
                      text-orange-900 text-xl
                      rounded-lg
                      focus:ring-orange-500 focus:border-orange-500
                      block
                      p-2
                    "
                  ></textarea>
                </div>

                <hr class="my-4"/>
              </div>
              <div class="flex mx-5 justify-around mb-2 text-white mb-5">
                <div
                    class="
                    flex
                    bg-orange-500
                    rounded-xl
                    hover:cursor-pointer
                    w-full
                  "
                >
                  <div class="py-2 px-4 mx-auto text-xl" @click="postOrder()">
                    Bezahlen - {{ this.$data.checkoutForm.sum }} €
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style>
@import './home.css';
</style>

<script>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {XIcon} from "@heroicons/vue/outline";
import axios from "axios";
import {url_api, url_front} from "../../const/api";
import VueCookies from "vue-cookies";


export default {
  name: "home",
  components: {
    XIcon,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },

  data() {
    return {
      showDish: false,
      ShowCart: false,
      checkout: false,
      categories: null,
      currentCategory: null,
      currentDish: null,
      toOrderDishCount: 1,
      cartProducts: 0,
      cart: [],
      checkoutForm: {
        table: this.$route.params.id,
        payment: 'paypal',
        comment: "kein Salz",
        sum: 0,
        client: {
          name: "Student " + this.$route.params.id,
          email: "amTisch" + this.$route.params.id + "@gmail.com",
          phone: "+49958827622",
        },
      },
    };
  },
  methods: {
    getDishByIdFromCategories(id) {
      for (let i = 0; i < this.categories.length; i++) {
        let dishes = this.categories[i].dishes.filter((dish) => {
          return dish.id == id;
        });
        if (dishes.length > 0) {
          console.log("dishes: ", dishes);
          return dishes;
        }
      }
    },

    updateCartCookie() {
      // console.log(JSON.stringify(this.$data.currentDish.id));
      let orderedDishesIds = [];
      this.cart.map((dish) => {
        let value = {
          id: dish.product.id,
          count: dish.count,
        };
        orderedDishesIds.push(value);
      });
      this.$cookies.set("cart", JSON.stringify(orderedDishesIds));
      console.log("Cookies: ", JSON.parse(this.$cookies.get("cart")));
    },

    openDishModal(dish) {
      this.$data.showDish = true;
      this.$data.currentDish = dish;
      this.$data.toOrderDishCount = 1;
    },

    openCartModal() {
      this.$data.ShowCart = true;
    },

    openCheckoutModal() {
      this.$data.ShowCart = false;
      this.$data.checkout = true;
    },

    closeCheckoutModal() {
      this.$data.checkout = false;
    },

    updateCurrentCategory(category) {
      this.$data.currentCategory = category;
    },

    decrementOrderToPlace() {
      if (this.$data.toOrderDishCount > 1) {
        this.$data.toOrderDishCount--;
      }
    },

    incrementOrderToPlace() {
      this.$data.toOrderDishCount++;
    },

    addToCart() {
      let orderedProduct = {
        product: this.$data.currentDish,
        count: this.$data.toOrderDishCount,
      };

      if (
          this.$data.cart.some((item) => item.product === this.$data.currentDish)
      ) {
        let index = this.$data.cart.findIndex(
            (item) => item.product.id === this.$data.currentDish.id
        );
        this.$data.cart[index].count++;
        this.$data.showDish = false;

        this.$cookies.remove("cart");
        this.updateCartCookie();
        return;
      }
      this.$data.cart = [...this.$data.cart, orderedProduct];
      this.$data.showDish = false;
      this.$cookies.remove("cart");
      this.updateCartCookie();
    },

    orderedProductCountDecrement(product, index) {
      product.count--;
      if (product.count === 0) {
        this.$data.cart.splice(index, 1);
      }
      this.updateCartCookie();

    },

    orderedProductCountIncrement(product, index) {
      product.count++;

      this.updateCartCookie();
    },

    calculateCartProducts() {
      this.$data.cartProducts = 0;
      this.$data.cart.forEach((cart) => {
        this.$data.cartProducts = this.$data.cartProducts + cart.count;
      });
    },

    calculateSum() {
      this.$data.checkoutForm.sum = 0;
      this.$data.cart.forEach((cart) => {
        if (cart.product) {
          this.$data.checkoutForm.sum =
              this.$data.checkoutForm.sum + cart.product.price * cart.count;
        }
      });
    },

    postOrder() {
      console.log(this.$data.checkoutForm.payment);
      this.closeCheckoutModal();

      let orderStatus = 'pending';

      if (this.$data.checkoutForm.payment === 'paypal') {
        orderStatus = 'payed';
      }

      const request = {
        order: this.$data.checkoutForm,
        cart: this.$data.cart,
        status: orderStatus,
      };

      axios.post(url_api + "api/orders", request).then((response) => {
        this.$data.cart = [];
        this.closeCheckoutModal();
        this.$cookies.set('order_id', response.data);
        this.$cookies.remove('cart');
        console.log("message", this.$cookies.get('order_id'));
        if (orderStatus === 'payed') {
          this.$router.push({
            name: "payment",
            params: {
              productsCount: this.$data.cartProducts,
            },
          });
        } else {
          alert("bitte die bestellnummer an der Kasse zeigen: " + this.$cookies.get('order_id'));
          this.$router.push('/order');
        }
      })
    },
  },

  watch: {
    cart: {
      handler(n, o) {
        this.calculateCartProducts();
        this.calculateSum();
      },
      deep: true,
    },
  },

  mounted() {
    axios.get(url_api + "api/categories").then((response) => {
      this.$data.categories = response.data;
      this.$data.currentCategory = this.$data.categories[0];

      if (this.$cookies.isKey("cart")) {
        let orderedDishesIds;
        orderedDishesIds = JSON.parse(this.$cookies.get("cart"));
        orderedDishesIds.map((value) => {
          let dish = this.getDishByIdFromCategories(value.id);
          let orderedProduct = {
            product: dish[0],
            count: value.count,
          };
          this.$data.cart = [...this.$data.cart, orderedProduct];
        });
        console.log("this.$data.cart", this.$data.cart[0].product);
      }
    });
  },
};
</script>
