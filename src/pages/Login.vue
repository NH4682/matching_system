<template>
  <div>
    <img class="logo" src="https://z1.ax1x.com/2023/09/23/pPTezdA.png" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="userAccount"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-space direction="vertical" fill>
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
          <van-button round block type="primary">注册</van-button>
        </van-space>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import myAxios from "@/myaxios";
import { showFailToast, showSuccessToast } from "vant";
import { useCounterStore } from "@/stores/counter";
const username = ref("");
const password = ref("");
const router = useRouter();
//登录
const onSubmit = async (values: any) => {
  //发送登录请求
  const loginData = await myAxios
    .post("/user/login", values)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  //判断登录失败
  if (loginData.data === null) {
    showFailToast(loginData.message);
    return;
  }
  //登录成功
  showSuccessToast("登录成功");
  //存储登录数据到pinia
  useCounterStore().logininfo = loginData.data;

  //跳转到主页
  router.push({
    path: "/",
  });
};
</script>

<style scoped>
.logo {
  display: block;
  margin: 50px auto;
}
</style>
