<template>
  <div>
    <van-card
      v-for="user in userList"
      :key="user.id"
      desc="这个人什么都没写 ~ ~ ~"
      :title="user.username"
      :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-space :size="6">
          <van-tag
            v-for="(item, index) in user.tags"
            :key="index"
            plain
            type="danger"
            >{{ item }}</van-tag
          >
        </van-space>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
interface userList {
  userList: [];
}
defineProps<userList>();
</script>

<style scoped></style>
