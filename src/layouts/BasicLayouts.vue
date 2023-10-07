<template>
  <div id="basicLayouts">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :title="title.titleName"
      left-text=""
      left-arrow
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item to="/home" name="home" icon="home-o"
        >主页</van-tabbar-item
      >
      <van-tabbar-item to="/team" name="ranks" icon="friends-o"
        >队伍</van-tabbar-item
      >
      <van-tabbar-item to="/user" name="user" icon="user-o"
        >个人</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useCounterStore } from "@/stores/counter";
import { showToast } from "vant";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const title = useCounterStore();

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push("/search");
};

const value = ref("");
const onSearch = (val: string) => showToast(val);
const onCancel = () => showToast("取消");
</script>

<style scoped>
#basicLayouts {
  padding-bottom: 30px;
}
</style>
