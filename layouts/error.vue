<!-- layouts/error.vue -->
<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Page Not Found (404)</h1>
    <h1 v-if="error.statusCode === 500">Server Error (500)</h1>
    <p v-if="error.message">{{ error.message }}</p>
    <nuxt-link to="/">Go to Home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"], // Передаем объект ошибки в компонент
};
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>
