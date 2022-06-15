<template>
  <div class="flex flex-col h-screen">
    <div
        class="
        h-96
        bg-amber-400
        py-10
        px-60
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

      <div class="inline text-5xl text-white">Wilkommen</div>
    </div>

    <div class="p-4 justify-center">
      <div
          class="
          flex flex-nowrap
          my-4
          p-4
          w-1/3
          mx-auto
          overflow-scroll overflow-y-auto
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
            :key="index"
            @click="updateCurrentCategory(category)"
        >
          {{ category.name }}
        </div>
      </div>
    </div>

    <div class="mx-20 md:mx-80 mx-auto" v-if="currentCategory">
      <div class="flex flex-row flex-wrap justify-center">
        <div
            class="
            bg-white
            rounded-xl
            border border-orange-200
            shadow-md
            m-2
            w-1/4
            hover:cursor-pointer
          "
            v-for="dish in currentCategory.dishes"
            :key="index"
            @click="openDishModal(dish)"
        >
          <img
              class="rounded-t-lg"
              :src="dish.base64Image"
              alt="dish "
          />
          <div class="p-5">
            <div class="flex justify-between">
              <h5 class="text-2xl font-bold">{{ dish.name }}</h5>
              <p class="text-xl text-orange-500">{{ dish.price }}</p>
            </div>
            <p class="mt-2 font-normal text-gray-900 dark:text-gray-400">
              {{ dish.name }}
            </p>
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
                sm:my-8 sm:max-w-lg sm:w-full
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
              <img :src="currentDish.base64Image">

              <div class="m-5">
                <div class="flex justify-between">
                  <h5 class="text-2xl font-bold">
                    {{ this.$data.currentDish.name }}
                  </h5>
                  <p class="text-xl text-orange-500">
                    {{ this.$data.currentDish.price }}
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
                  <div class="py-2 px-4 text-xl">Bestellung aktualisieren</div>
                  <div class="py-2 px-4 text-xl">
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
                sm:my-8 sm:max-w-lg sm:w-full
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
                          @click="orderedProduct.count++"
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
                sm:my-8 sm:max-w-lg sm:w-full
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

                  <label>Tishnummer</label>
                  <input
                      placeholder="tish"
                      type="number"
                      id="table"
                      v-model="this.$data.checkoutForm.table"
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

                  <label>Zahlungsmethode</label>
                  <div class="flex items-center mr-4 mb-4">
                    <input
                        id="paypal"
                        type="radio"
                        name="paypal"
                        value="paypal"
                        checked
                        v-model="this.$data.checkoutForm.payment"
                    />
                    <label
                        for="radio1"
                        class="ml-2 flex items-center cursor-pointer"
                    >
                      Paypal</label
                    >
                  </div>

                  <div class="flex items-center mr-4 mb-4">
                    <input
                        id="cash"
                        type="radio"
                        name="cash"
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
import {url_api} from "../../const/api";

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
        table: "1",
        payment: "paypal",
        comment: "bitte pizza schneiden",
        sum: 0,
        client: {
          name: "Youssef Ben Abdallah",
          email: "youssef@gmail.com",
          phone: "+49FXXXZZZFFF",
        },
      },
    };
  },
  methods: {
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
        return;
      }
      this.$data.cart = [...this.$data.cart, orderedProduct];
      this.$data.showDish = false;
    },

    orderedProductCountDecrement(product, index) {
      product.count--;
      if (product.count === 0) {
        this.$data.cart.splice(index, 1);
      }
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
      this.closeCheckoutModal();
      const request = {
        order: this.$data.checkoutForm,
        cart: this.$data.cart,
      };
      axios.post(url_api + "api/orders", request).then((response) => {
        this.$data.cart = [];
        this.closeCheckoutModal();
        this.$router.push({
          name: 'payment',
          params: {
            productsCount: this.$data.cartProducts
          }
        })
        ;
      });
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
    axios.get(url_api + "api/categories")
        .then((response) => {
          this.$data.categories = response.data;
          this.$data.currentCategory = this.$data.categories[0];
        });
  },
};
</script>
