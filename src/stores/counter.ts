import { ref, computed } from "vue";
import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const titleName = ref<string>("主页");
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //   count.value++
    // }
    const logininfo = ref<any>(null);
    // return { count, doubleCount, increment }
    return { titleName, logininfo };
  },
  {
    persist: true,
  }
);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
