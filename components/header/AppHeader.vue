<template>
  <header>
    <SideBar v-if="!collapsed"></SideBar>
    <img
      src="../../static/assets/slider.svg"
      alt=""
      class="img_set"
      @click="toggleSidebar"
    />
    <div class="mid_div">
      <p class="main_text">
        <NuxtLink to="/">
          New trips on Fall season! Full details on our Instagram accounts.
        </NuxtLink>
      </p>
    </div>
    <NuxtLink to="/profile">
      <div class="img_container">
        <img src="../../static/assets/image_user.svg" alt="" class="img_user" />
        <img
          src="../../static/assets/ellipse_icon.svg"
          alt=""
          class="img_ell"
        />
      </div>
    </NuxtLink>
  </header>
</template>

<script>
import {
  collapsed,
  toggleSidebar,
  sidebarWidth,
} from "@/components/header/state";
import SideBar from "@/components/header/SideBar.vue";
import { computed } from "vue";

export default {
  components: { SideBar },
  data() {
    return {
      profile: null,
    };
  },
  setup() {
    const fullAvatarUrl = computed(() => {
      return `http://localhost:8000/${this.profile.avatar}`;
    });
    return { collapsed, toggleSidebar, sidebarWidth, fullAvatarUrl };
  },
};
</script>

<style scoped>
header {
  position: fixed;
  left: 0;
  right: 0;
  top: 5px;
  z-index: 10;
  height: 75px;
  background: rgba(255, 255, 255, 0.74);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 4px;
  padding-bottom: 4px;
  gap: 15px;
  cursor: pointer;
}
.img_container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80px;
  height: 77px;
}

.img_ell {
  width: 100%;
  height: 100%;
}

.img_user {
  position: absolute;
  width: 55px;
  height: 55px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mid_div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85vw;
  height: 70px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    #e5f67c 0%,
    #ecef64 33%,
    #d2e037 66%,
    #eaee3a 100%
  );
}
.main_text {
  font-family: "Inknut Antiqua";
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: linear-gradient(90deg, #ffadad 0%, #ff774c 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.img_set {
  width: 80px;
  height: 80px;
}

.profile {
  width: 65px;
  height: 62px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: #7eefff;
}

@media (max-width: 480px) {
  header {
    height: 60px;
    width: 100vw;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0px;
    padding-right: 0px;
    background: linear-gradient(90deg, #e5f67c 0%, #d2e037 66%, #eaee3a 100%);
    gap: 0px;
    margin-top: -8px;
  }

  .img_set,
  .img_ell {
    display: none;
  }

  .main_text {
    font-family: "Inknut Antiqua";
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: linear-gradient(90deg, #ffadad 0%, #ff774c 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 310px;
    height: 44px;
    padding-left: 5px;
  }
  .img_container {
    border-radius: 4px 0px 0px 4px;
    background: linear-gradient(180deg, #68bfdb 0%, #3a94a8 100%);
    width: 65px;
    height: 77px;
  }
  .mid_div {
    background: none;
  }
}
</style>
