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
    <van-back-top right="5vw" bottom="10vh" />
    <van-empty
      v-if="userList.length < 1"
      image="search"
      description="无匹配项"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import myAxios from "../myaxios/index";
import qs from "qs";
const route = useRoute();
let userList = ref<any>([]);
onMounted(async () => {
  const tagList = route.query.tags;
  userList.value = await myAxios
    .get("/user/search/tags", {
      params: {
        tagList,
      },
      //序列化请求数据
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { indices: false }),
      },
    })
    .then(function (response) {
      response.data?.data.forEach((element: any) => {
        element.tags = JSON.parse(element.tags);
      });
      console.log(response.data?.data);
      return response.data?.data;
    })
    .catch(function (error) {
      console.log(error);
    });
});
</script>

<style scoped></style>
