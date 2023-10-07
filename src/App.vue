<template>
  <!-- <BasicLayouts></BasicLayouts> -->
  <router-view></router-view>
</template>

<script setup lang="ts">
import "vant/es/toast/style";
import { ref, reactive } from "vue";
import BasicLayouts from "./layouts/BasicLayouts.vue";
</script>

<style scoped></style>
