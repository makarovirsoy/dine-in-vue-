<template>
  <div class="flex flex-col h-screen">

    <div class="h-96 bg-amber-400 py-10 px-60 flex flex-col justify-between bg-cover bg-no-repeat"
         style="background-image: url('https://wallpaper.dog/large/20491982.jpg')">

      <div class="flex flex-row justify-end">
        <div class="flex flex-row bg-orange-500 p-2 rounded-2xl hover:cursor-pointer" @click="openCartModal()">
          <div class="rounded-xl bg-white p-2">5</div>
          <div class="ml-2 py-2">Bestellung ansehen</div>
          <div class="ml-2 py-2">55€</div>
        </div>
      </div>

      <div class="inline text-5xl text-white">Wilkommen</div>
    </div>

    <div class="p-4 justify-center">
      <div class="flex flex-nowrap my-4 p-4 w-1/3 mx-auto overflow-scroll overflow-y-auto">
        <div class="mx-2 p-2 border border-orange-400 rounded-xl text-orange-500" v-for="index in 10" :key="index">
          category
        </div>
      </div>
    </div>

    <div class="mx-20 md:mx-80 mx-auto">
      <div class="flex flex-row flex-wrap justify-center">
        <div class="bg-white rounded-xl border border-orange-200 shadow-md m-2 w-1/4 hover:cursor-pointer"
             v-for="index in 10" :key="index" @click="openDishModal()">
          <img class="rounded-t-lg"
               src="https://www.dashef.com/wp-content/uploads/2016/11/Depositphotos_71652087_original-min.jpg" alt="">
          <div class="p-5">
            <div class="flex justify-between">
              <h5 class="text-2xl font-bold">Speise salat mit reis</h5>
              <p class="text-xl text-orange-500">15 €</p>
            </div>
            <p class="mt-2 font-normal text-gray-900 dark:text-gray-400">exerptexerptexerptexerptexerptexerpt
              exerptexerptexerptexerpt</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TransitionRoot as="template" :show="this.$data.dish">
    <Dialog as="div" class="relative z-10" @close="this.$data.dish = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full border border-orange-500">

              <div class="h-96 bg-amber-400 flex flex-col justify-between bg-cover bg-no-repeat items-end "
                   style="background-image: url('https://www.dashef.com/wp-content/uploads/2016/11/Depositphotos_71652087_original-min.jpg')">
                <div @click="this.$data.dish = false"
                     class="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 h-10 w-10 mt-2 mr-4 hover:cursor-pointer">
                  <XIcon class="h-6 w-6 text-orange-600" aria-hidden="true"/>
                </div>
              </div>

              <div class="m-5">
                <div class="flex justify-between">
                  <h5 class="text-2xl font-bold">Speise salat mit reis</h5>
                  <p class="text-xl text-orange-500">15 €</p>
                </div>
                <p class="mt-2 font-normal text-gray-500">exerpt exerptexerptexe rptexerptexerpt
                  exerptexer ptexe rptexerpt</p>
                <hr class="my-4">
                <h4 class="mt-4 text-xl font-bold">Zusatsstoffe</h4>
                <div class="flex flex-wrap">
                  <p class="mt-2 font-normal text-gray-500 mr-2" v-for="index in 15" :key="index"> Stoff</p>
                </div>
                <hr class="my-4">
                <h4 class="mt-4 text-xl font-bold ">Allergene</h4>
                <div class="flex flex-wrap">
                  <p class="mt-2 font-normal text-gray-500 mr-2 " v-for="index in 10" :key="index"> allergene</p>
                </div>
                <hr class="my-4">
              </div>
              <div class="flex mx-5 justify-around mb-2 text-white mb-5">
                <div class=" flex bg-orange-500 rounded-xl">
                  <div class="py-2 p-4 hover:cursor-pointer text-xl">-</div>
                  <div class="py-2 px-4 text-xl">1</div>
                  <div class="py-2 p-4 hover:cursor-pointer text-xl">+</div>
                </div>
                <div class="flex bg-orange-500 rounded-xl hover:cursor-pointer">
                  <div class="py-2 px-4 text-xl">Bestellung aktualisieren</div>
                  <div class="py-2 px-4 text-xl">15 €</div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template" :show="this.$data.cart">
    <Dialog as="div" class="relative z-10" @close="this.$data.cart = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full border border-orange-500">

              <div class="m-5">
                <div class="flex justify-between">
                  <h5 class="text-2xl font-bold">Bestellung</h5>
                  <div @click="this.$data.cart = false"
                       class="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-orange-100  hover:cursor-pointer">
                    <XIcon class="h-4 w-4 text-orange-600" aria-hidden="true"/>
                  </div>
                </div>

                <hr class="my-4">

                <div class="flex flex-wrap">
                  <div class="font-normal flex w-full justify-between items-center my-2" v-for="index in 10"
                       :key="index">
                    <div class="flex">
                      <img
                          src="https://www.dashef.com/wp-content/uploads/2016/11/Depositphotos_71652087_original-min.jpg"
                          class="w-20 h-20 rounded-lg"/>
                      <div class="flex flex-col ml-2">
                        <h4 class="mt-4 text-xl font-bold">speise</h4>
                        <p class="text-xl text-orange-500">15 €</p>
                      </div>
                    </div>
                    <div class=" flex bg-orange-500 rounded-xl h-fit ">
                      <div class="p-2 hover:cursor-pointer text-xl">-</div>
                      <div class="p-2 text-xl">1</div>
                      <div class="p-2 hover:cursor-pointer text-xl">+</div>
                    </div>
                  </div>
                </div>
                <hr class="my-4">
              </div>
              <div class="flex mx-5 justify-around mb-2 text-white mb-5">
                <div class="flex bg-orange-500 rounded-xl hover:cursor-pointer w-full">
                  <div class="py-2 px-4 mx-auto text-xl " @click="openCheckoutModal()">Zur Kasse</div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template" :show="this.$data.checkout">
    <Dialog as="div" class="relative z-10" @close="this.$data.checkout = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full border border-orange-500">

              <div class="m-5">
                <div class="flex justify-between">
                  <h5 class="text-2xl font-bold">Kasse</h5>
                  <div @click="this.$data.checkout = false"
                       class="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-orange-100  hover:cursor-pointer">
                    <XIcon class="h-4 w-4 text-orange-600" aria-hidden="true"/>
                  </div>
                </div>

                <hr class="my-4">

                <div class="flex flex-col">
                  <input placeholder="name" type="text" id="name" class="bg-orange-50 border border-orange-300 text-orange-900 text-xl rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 mb-4">
                  <input placeholder="email" type="email" id="email" class="bg-orange-50 border border-orange-300 text-orange-900 text-xl rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 mb-4">
                  <input placeholder="tel" type="tel" id="tel" class="bg-orange-50 border border-orange-300 text-orange-900 text-xl rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 mb-4">
                  <input placeholder="tel" type="tel" id="tel" class="bg-orange-50 border border-orange-300 text-orange-900 text-xl rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 mb-4">
                  <input placeholder="tish" type="tel" id="tel" class="bg-orange-50 border border-orange-300 text-orange-900 text-xl rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 mb-4">
                  <textarea placeholder="tish" type="tel" id="tel" class="bg-orange-50 border border-orange-300 text-orange-900 text-xl rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"></textarea>
                </div>

                <hr class="my-4">
              </div>
              <div class="flex mx-5 justify-around mb-2 text-white mb-5">
                <div class="flex bg-orange-500 rounded-xl hover:cursor-pointer w-full">
                  <div class="py-2 px-4 mx-auto text-xl ">Zahlen</div>
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

import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {XIcon} from '@heroicons/vue/outline'

export default {
  name: "home",
  components: {XIcon, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot},

  data() {
    return {
      dish: false,
      cart: false,
      checkout: false,
    }
  },
  methods: {
    openDishModal() {
      this.$data.dish = true;
    },
    openCartModal() {
      this.$data.cart = true;
    },
    openCheckoutModal() {
      this.$data.cart = false;
      this.$data.checkout = true;
    },
  }
}
</script>
