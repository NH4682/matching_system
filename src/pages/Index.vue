<template>
  <div id="home">
    <UserCard :user-list="userList"></UserCard>
  </div>
</template>

<script setup lang="ts">
import UserCard from "@/components/userCard.vue";
import myAxios from "@/myaxios";
import { useCounterStore } from "@/stores/counter";
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
let userList = ref<any>([]);
onMounted(async () => {
  userList.value = await myAxios
    .get("/user/recommend", {
      params: {
        pageNum: 1,
        pageSize: 8,
      },
    })
    .then(function (response) {
      // 处理成功情况
      //console.log(response);
      response.data?.data.records.forEach((element: any) => {
        element.tags = JSON.parse(element.tags);
      });
      return response.data?.data.records;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    });
});
</script>

<style scoped></style>
