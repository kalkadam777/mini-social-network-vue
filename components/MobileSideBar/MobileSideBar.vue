<script>
import { ref } from "vue";
import {
  collapsed,
  toggleSidebar,
  sidebarWidth,
} from "@/components/header/state";
import {
  selectedCategory,
  changeSelectedCategory,
} from "@/components/peopleCards/state";

export default {
  // data() {
  //   return {
  //     selectedCategory,
  //   };
  // },
  // methods: {
  //   handleBlogClick(category) {
  //     changeSelectedCategory(category);
  //     toggleIcon();
  //   },
  // },
  setup() {
    const isArrowDown = ref(true);
    const selectedCategory = ref("");
    const toggleIcon = () => {
      isArrowDown.value = !isArrowDown.value;
    };

    const handleBlogClick = (category) => {
      changeSelectedCategory(category);
      toggleIcon();
    };

    return {
      isArrowDown,
      toggleIcon,
      handleBlogClick,
      selectedCategory,
    };
  },
};
</script>
<template>
  <div
    class="main_container"
    :style="{ bottom: !isArrowDown ? '-80px' : '-770px' }"
  >
    <div class="menu_container">
      <img src="../../static/assets/message_square_lines.svg" alt="" />
      <img
        class="arrow"
        :src="isArrowDown ? '/assets/menu_t.svg' : '/assets/arrow_down.svg'"
        alt=""
        @click="toggleIcon"
      />
      <img src="../../static/assets/heart.svg" alt="" />
    </div>
    <div class="block_blog">
      <div class="box">
        <img
          src="../../static/assets/car.svg"
          alt=""
          @click="handleBlogClick('Travel')"
        />
        <p>ADVENTURE</p>
      </div>
      <div class="box">
        <img
          src="../../static/assets/globe.svg"
          alt=""
          @click="handleBlogClick('Education')"
        />
        <p>EDUCATION</p>
      </div>
      <div class="box">
        <img
          src="../../static/assets/bag.svg"
          alt=""
          @click="handleBlogClick('Food')"
        />
        <p>FOOD</p>
      </div>
      <div class="box">
        <img
          src="../../static/assets/modern.svg"
          alt=""
          @click="handleBlogClick('Sport')"
        />
        <p>SPORT</p>
      </div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
</template>

<style scoped>
.main_container {
  position: absolute;
  bottom: -770px;
  transition: bottom 0.6s ease-out;
  display: flex;
  flex-direction: column;
  gap: 80px;
  height: 100vh;
  background: #8fab44;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
}
.menu_container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  border-radius: 10px 10px 0px 0px;
  background: #7f9a3e;
  height: 73px;
  width: 100%;
}
.block_blog {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  row-gap: 20px;
  padding-left: 7px;
  padding-right: 5px;
}
.box {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background: #b0d17c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
p {
  color: #fff;
  text-align: center;
  font-family: "Inknut Antiqua";
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.arrow {
  width: 54px;
  height: 53px;
}
</style>
