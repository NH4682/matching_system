<template>
  <van-nav-bar
    @click-left="onClickLeft"
    title="标题"
    left-text="返回"
    left-arrow
  >
    <template #right>
      <!-- <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        shape="round"
      /> -->
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <slot name="content">具名插槽：默认内容</slot>

  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item name="ranks" icon="friends-o">队伍</van-tabbar-item>
    <van-tabbar-item name="user" icon="user-o">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { showToast } from "vant";
import { ref, reactive } from "vue";
const onClickLeft = () => alert("左");

const value = ref("");
const onSearch = (val: string) => showToast(val);
const onCancel = () => showToast("取消");

const active = ref("home");
const onChange = (index: any) => showToast(index);
</script>

<style scoped></style>
