<template>
  <div>
    <form action="/">
      <van-search
        @update:model-value="Onupdate"
        ref="search"
        show-action
        v-model="searchText"
        placeholder="请输入用户名"
        @search="onSearch"
        @cancel="onCancel"
      >
        <template #action>
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search>
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeId.length === 0">请添加标签</div>

    <van-space :size="20" wrap>
      <van-tag
        v-for="tag in activeId"
        :key="tag"
        closeable
        size="medium"
        type="primary"
        @close="close(tag)"
      >
        {{ tag }}
      </van-tag>
    </van-space>

    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="itemLiks"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { showFailToast } from "vant";
import { useRouter } from "vue-router";

const searchText = ref<any>("");

const onCancel = () => {
  itemLiks.value = itemLiks_data;
};

const router = useRouter();

let activeId = ref<any>([]);

const onClickButton = () => {
  if (activeId.value.length < 1) {
    showFailToast("请选择标签");
    itemLiks.value = itemLiks_data;
    searchText.value = "";
    return;
  }
  router.push({
    path: "/search/result",
    //一定要传对象{}
    query: {
      tags: activeId.value,
    },
  });

  itemLiks.value = itemLiks_data;
  searchText.value = "";
};
const search = ref();
onMounted(() => {
  search.value.focus();
});

const close = (tagId: any) => {
  activeId.value = activeId.value.filter((item: any) => {
    return item !== tagId;
  });
};

const activeIndex = ref(0);
const itemLiks_data = [
  {
    text: "性别",
    children: [
      { text: "男", id: "男" },
      { text: "女", id: "女" },
    ],
  },
  {
    text: "年级",
    children: [
      { text: "大一", id: "大一" },
      { text: "大二", id: "大二" },
      { text: "大三", id: "大三" },
      { text: "大四", id: "大四" },
      { text: "研究生", id: "研究生" },
      { text: "博士", id: "博士" },
    ],
  },
];

let itemLiks = ref(itemLiks_data);
const onSearch = (val: any) => {
  itemLiks.value = itemLiks_data.map((item) => {
    let clonedItem = { ...item }; // 进行浅拷贝
    let itemChildren = clonedItem.children.filter((tag) => {
      return tag.text === searchText.value;
    });
    clonedItem.children = itemChildren;
    return clonedItem;
  });
};

const Onupdate = (val: any) => {
  itemLiks.value = itemLiks_data.map((item) => {
    let clonedItem = { ...item }; // 进行浅拷贝
    let itemChildren = clonedItem.children.filter((tag) => {
      return tag.text === val;
    });
    clonedItem.children = itemChildren;
    return clonedItem;
  });
};
</script>

<style scoped></style>
