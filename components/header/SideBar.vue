<template>
  <div>
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <span class="title" @click="toggleSidebar">
        <h1>MENU</h1>
      </span>

      <div class="category-list">
        <span class="category" @click="handleBlogClick('All')">
          <h1>ALL BLOG</h1>
        </span>

        <span class="category" @click="handleBlogClick('Travel')">
          <h1>TRAVEL BLOG</h1>
        </span>

        <span class="category" @click="handleBlogClick('Sport')">
          <h1>SPORT BLOG</h1>
        </span>

        <span class="category" @click="handleBlogClick('Education')">
          <h1>STUDY BLOG</h1>
        </span>

        <span class="category" @click="handleBlogClick('Food')">
          <h1>FOOD BLOG</h1>
        </span>

        <span class="contact-section">
          <h1>CONTACTS</h1>
          <div class="info">
            <p>PHONE: +1(234)-23-45-22</p>
            <p>ADDRESS: Green st., Yalow park</p>
            <p>EMAIL: Yallow@park.info</p>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      collapsed,
      sidebarWidth,
      selectedCategory,
    };
  },
  methods: {
    handleBlogClick(category) {
      changeSelectedCategory(category);
      toggleSidebar();
      this.$router.push("/");
    },
    toggleSidebar() {
      this.collapsed = !this.collapsed; // Логика для закрытия боковой панели
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jersey+15&display=swap");

.sidebar {
  color: white;
  background: #c1ebf1;

  float: left;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  transition: 0.5s ease;

  display: flex;
  flex-direction: column;

  font-family: "Jersey 15", sans-serif;
  height: 100vh;
  padding: 13px;

  cursor: pointer;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

  color: #615c5c;

  background: #ffffff;
  border-radius: 10px;
  height: 37px;
}

.title h1 {
  font-size: 36px;
  line-height: 36px;
  text-align: left;
  font-weight: bolder;
}

.category-list {
  display: flex;
  flex-direction: column;

  height: 750px;
  width: 285px;
  border-radius: 12px;

  background: #ffffff;
  margin-top: 40px;
  margin-left: 13px;
}

.category {
  width: 285px;
  height: 51px;
  margin-top: 10px;

  background: linear-gradient(180deg, #aff090 0%, #45c330 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

  cursor: pointer;
}

.category h1 {
  font-size: 36px;
  font-weight: 400;
  line-height: 36px;
  text-align: center;
}

.contact-section {
  background: linear-gradient(180deg, #aff090 0%, #45c330 100%);
  margin-top: 140px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 247px;
  height: 229px;
  border-radius: 10px;
  margin-left: 19px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info p {
  width: 200px;
  color: #fff;
  font-family: "Jersey 15";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
