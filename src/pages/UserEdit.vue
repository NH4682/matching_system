<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          :name="editName"
          :label="editName"
          :placeholder="`请输入${editName}`"
          :rules="[{ required: true, message: '请填写内容' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
// useRoute()、useRouter()本质是两个函数，是用于获取路由相关信息。useRoute()：用于返回当前路由信息对象用于接收路由参数。
//useRouter()： 用于返回当前路由实例，常用于实现路由跳转。使用方法先引入且需要调用两个函数才可以得到相关信息。
import myAxios from "@/myaxios";
import { currentUser } from "@/myaxios/api";
import { useCounterStore } from "@/stores/counter";
import { showFailToast, showSuccessToast } from "vant";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const {
  query: { currentValue, editKey, editName },
} = route;

const username = ref<any>(currentValue);

//发送修改请求
const onSubmit = async (values: any) => {
  // console.log("submit", username.value);

  //获取当前登录用户信息
  const user = await currentUser();

  //发送修改请求
  const isupdateUser = await myAxios
    .post("/user/updateUser", {
      id: user.id,
      [editKey]: username.value,
    })
    .then(function (response) {
      // 处理成功情况
      return response.data?.data;
    })
    .catch(function (error) {
      // 处理错误情况
      return error;
    });
  console.log(isupdateUser);

  //判断是否修改成功
  if (isupdateUser) {
    //处理成功情况
    showSuccessToast("修改成功");
    //useCounterStore().logininfo = await currentUser();
    router.push("/user");
  } else {
    //处理错误情况
    showFailToast("修改失败");
  }
};
</script>

<style scoped></style>
