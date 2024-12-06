<template>
  <div ref="backgroundContainer" class="content">
    <AppHeader />
    <PostList />
    <MobileSideBar v-show="isMobile" />
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";

import PostList from "~/components/posts/PostList.vue";
import MobileSideBar from "~/components/MobileSideBar/MobileSideBar.vue";
import { ref, onMounted } from "vue";

export default {
  name: "IndexPage",
  components: { AppHeader, PostList, MobileSideBar },
  setup() {
    const isMobile = ref(false);
    const backgroundContainer = ref(null);

    const applyDesktopBackground = () => {
      if (backgroundContainer.value) {
        backgroundContainer.value.style.backgroundImage =
          "url('/assets/background/bg.png')";
        backgroundContainer.value.style.backgroundSize = "cover";
        backgroundContainer.value.style.backgroundPosition = "center";
        backgroundContainer.value.style.backgroundRepeat = "no-repeat";
        backgroundContainer.value.style.height = "100%";
      }
    };

    const applyMobileBackground = () => {
      if (backgroundContainer.value) {
        backgroundContainer.value.style.background =
          "linear-gradient(90deg, #dfe267 0.08%, #cbee83 99.92%)";
        backgroundContainer.value.style.backgroundSize = "cover";
        backgroundContainer.value.style.height = "100vh";
      }
    };

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 768;
      if (isMobile.value) {
        applyMobileBackground();
      } else {
        applyDesktopBackground();
      }
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    return {
      isMobile,
      backgroundContainer,
    };
  },
};
</script>

<style scoped>
@media (max-width: 480px) {
  .content {
    height: 100vh;
    background: linear-gradient(90deg, #dfe267 0.08%, #cbee83 99.92%);
  }
}
</style>
