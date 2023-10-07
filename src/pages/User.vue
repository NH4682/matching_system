<template>
  <div v-if="user !== null">
    <van-row justify="center">
      <van-col span="12.5">
        <van-uploader :after-read="afterRead">
          <van-image
            round
            width="10rem"
            height="10rem"
            fit="cover"
            position="center"
            :src="user.avatarUrl"
          />
        </van-uploader>
      </van-col>
    </van-row>

    <van-cell
      icon="user-o"
      title="昵称"
      is-link
      @click="toEdit('username', '昵称', user.username)"
      :value="user.username"
    />
    <van-cell icon="user-circle-o" title="用户名" :value="user.userAccount" />
    <!-- <van-cell icon="friends-o" title="头像" is-link to="index" value="内容" /> -->
    <van-cell
      icon="like-o"
      title="性别"
      is-link
      @click="toEdit('gender', '性别', user.gender === 1 ? '男' : '女')"
      :value="user.gender === 1 ? '男' : '女'"
    />
    <van-cell
      icon="phone-o"
      title="电话"
      is-link
      @click="toEdit('phone', '电话', user.phone)"
      :value="user.phone"
    />
    <van-cell
      icon="envelop-o"
      title="邮箱"
      is-link
      @click="toEdit('email', '邮箱', user.email)"
      :value="user.email"
    />
    <van-cell
      icon="clock-o"
      title="注册时间"
      :value="moment(user.createTime).format('YYYY-MM-DD')"
    />
    <van-button block type="primary" @click="outLogin">退出登录</van-button>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import router from "@/router";
import Avatar from "../pages/Index.vue";
import { useCounterStore } from "@/stores/counter";
import { ref, reactive, onMounted } from "vue";
import myAxios from "@/myaxios";
import { showFailToast, showSuccessToast } from "vant";
import { currentUser } from "@/myaxios/api";

let user = ref(useCounterStore().logininfo);
// let user = ref<any>(null);
// {
//   id: 123,
//   username: "苦逼丶青年",
//   userAccount: "kubi9080",
//   avatarUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
//   gender: 1,
//   phone: "15157718458",
//   email: "2423423@qq.com",
//   tags: ["Java", "C++", "JS"],
//   createTime: new Date(),
// };

onMounted(async () => {
  if (user.value === null) {
    user.value = await currentUser();
    // myAxios
    //   .get("/user/currentUser")
    //   .then(function (response) {
    //     // 处理成功情况
    //     console.log(response);
    //     return response.data?.data;
    //   })
    //   .catch(function (error) {
    //     // 处理错误情况
    //     console.log(error);
    //   });
  }
});

const afterRead = (file: any) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};
//退出登录
const outLogin = async () => {
  const loginData = await myAxios
    .post("/user/outLogin")
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  //判断退出失败
  if (loginData.data === null) {
    showFailToast(loginData.message);
    return;
  }
  //退出成功
  showSuccessToast("退出成功");
  //删除pinia的用户信息
  useCounterStore().logininfo = null;
  //跳转到主页
  router.push({
    path: "/login",
  });
};

//跳转到修改页面
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue,
    },
  });
};
</script>

<style scoped>
.my-value {
  /* 添加样式以控制内容长度 */
  width: 200px;
}
</style>
