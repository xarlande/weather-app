<template>
  <div>123</div>
</template>

<script lang="ts" setup>
import { getGeolocation } from "~/api/weather";

const initComponent = async () => {
  const resp = await getGeolocation("Львів");
  console.log(resp);
};
initComponent();
</script>
