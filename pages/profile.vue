<template>
  <div id="app">
    <AppHeader />

    <div v-if="profile && profile.avatar && posts" class="container">
      <h1 class="title">My Profile</h1>
      <div class="person-container">
        <span class="person-image">
          <img :src="fullAvatarUrl" alt="avatar" />
        </span>

        <div class="person-info">
          <p class="person-name">{{ profile.full_name }}</p>
          <p class="person-age">Age: {{ profile.age }}</p>
          <p class="person-location">{{ profile.location }}</p>
          <p class="person-activity">Activity: for now</p>

          <span class="person-rating">
            <p>Current rating:</p>
            <div class="rating-stars">
              <img
                v-for="star in 5"
                :key="star"
                :src="getStarType(star)"
                class="star-icon"
                width="24px"
              />
            </div>
          </span>
        </div>
      </div>

      <div class="profile-buttons">
        <router-link to="profile-edit"
          ><button class="edit-button"><p>EDIT</p></button></router-link
        >
        <router-link to="favourite"
          ><button class="edit-button-friends">
            <p class="friends">FRIENDS</p>
          </button></router-link
        >
        <router-link to="posts-create"
          ><button class="edit-button"><p>ADD POST</p></button></router-link
        >
        <router-link to="statistic"
          ><button class="edit-button"><p>STATISTIC</p></button></router-link
        >
        <button @click="logout" class="logout-button"><p>LOG OUT</p></button>
      </div>

      <div class="person-posts">
        <p class="posts-title">Latest posts</p>
      </div>

      <div class="pagination" @click="nextPage" v-if="totalPages !== 0">
        <img src="../static/assets/arrow_left.svg" alt="" />
        <p class="pagination_page">{{ currentPage }}/{{ totalPages }}</p>
        <img src="../static/assets/arrow_right.svg" alt="" />
      </div>

      <div class="cards-grid">
        <div v-for="post in paginatedPosts" :key="post.id" class="card">
          <PostCard
            :post="post"
            :button-type="'delete'"
            @delete-post="deletePost"
          ></PostCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";
import fullStar from "@/static/assets/stars/star.png";
import halfStar from "@/static/assets/stars/half-star.png";
import PostCard from "~/components/posts/PostCard.vue";

export default {
  components: { PostCard, AppHeader },
  data() {
    return {
      profile: null,
      posts: null,
      currentPage: 1,
      perPage: 2,
    };
  },
  computed: {
    fullAvatarUrl() {
      return `http://localhost:8000/${this.profile.avatar}`;
    },
    filteredPosts() {
      let posts = this.posts;

      if (this.profile) {
        posts = posts.filter(
          (post) => post.creator === this.profile.user_username
        );
      }
      return posts;
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredPosts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.perPage);
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get("profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      this.profile = response.data;
    } catch (error) {
      console.error(error);
      this.$router.push("/login");
    }
    await this.fetchPosts();
  },
  methods: {
    async logout() {
      try {
        await this.$axios.post(
          "logout/",
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.removeItem("token");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Logout failed");
      }
    },
    async deletePost(postId) {
      try {
        await this.$axios.delete(`/posts/${postId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.applyFilters();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    applyFilters() {
      this.currentPage = 1;
    },
    getStarType(star) {
      const rating = this.profile.rating;

      if (star <= Math.floor(rating)) {
        return fullStar;
      } else if (star === Math.ceil(rating) && rating % 1 !== 0) {
        return halfStar;
      } else {
        return "";
      }
    },
    async fetchPosts() {
      try {
        const response = await this.$axios.get("/posts/");
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      } else {
        this.currentPage = 1;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap");

.title {
  position: absolute;
  right: 0;

  width: 422px;
  height: 139px;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 165px;

  color: #ffffff;
}

.person-container {
  box-sizing: border-box;
  display: flex;
}

.person-image {
  margin-top: 160px;
  margin-left: 80px;

  width: 169px;
  height: 209px;

  border-radius: 118px;
}

.person-image img {
  margin-top: 20px;
  width: 160px;
  border-radius: 34px;
}

.person-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  position: absolute;
  top: 116px;
  left: 260px;

  font-family: "Inknut Antiqua", sans-serif;
  margin-left: 80px;
  text-align: left;
}

.person-name {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 83px;

  height: 60px;

  color: #294bff;

  -webkit-text-stroke: 0.8px black;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.person-age,
.person-location {
  height: 30px;
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 41px;

  color: #fcff62;

  -webkit-text-stroke: 0.8px black;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.person-activity {
  width: 241px;
  height: 31px;

  font-style: normal;
  font-weight: 800;
  font-size: 23px;
  line-height: 41px;

  color: #00ffa3;

  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.person-rating {
  display: flex;
  align-items: center;
  height: 30px;
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 52px;
  color: #ffffff;
  -webkit-text-stroke: 0.6px black;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.rating-stars {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-left: 10px;
}

.star-icon {
  margin-left: 10px;
}

.posts-title {
  position: absolute;
  width: 113px;
  height: 32px;

  bottom: 400px;
  left: 100px;

  background: #fffbfb;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;

  color: #000000;

  border: 1px solid rgba(0, 0, 0, 0.2);
}

.person-posts {
  margin-top: 530px;
  margin-left: -190px;
}

.profile-buttons {
  position: absolute;
  top: 200px;
  right: 60px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.logout-button {
  width: 192px;
  height: 42px;

  margin-top: 20px;
  background: #be1010;
}
.logout-button p {
  margin-top: -16px;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 62px;

  color: #ffffff;
}

.edit-button {
  padding: 5px;
  min-width: 192px;
  height: 42px;
  margin-top: 20px;
  background: #6bebfc;
  border: 1px solid #5bb9cd;
}

.edit-button-friends {
  padding: 5px;
  min-width: 192px;
  height: 42px;
  margin-top: 20px;
  background: #9ce4fe;
  border: 1px solid #5bb9cd;
}

.friends {
  margin-top: -16px;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 62px;
  color: #ffffff;
}
.edit-button p {
  margin-top: -16px;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 62px;
  color: #ffffff;
}

.cards-grid {
  margin-top: -320px;
  margin-left: 60px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, auto);
  gap: 20px;
}

.pagination {
  background: #5bb9cd;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5px;
  position: absolute;
  bottom: 60px;
  right: 250px;
  width: auto;
}

.pagination_page {
  color: #fff;
  font-family: "Jersey 15";
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

@media (max-width: 480px) {
  .cards-grid,
  .pagination,
  .person-posts,
  .person-rating,
  .person-activity {
    display: none;
  }

  .title {
    font-size: 40px;
    left: 100px;
    top: 60px;
    line-height: 1;
    width: 250px;
    height: 100px;
  }

  .profile-buttons {
    top: 400px;
    right: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Две равные колонки */
    grid-template-rows: auto auto auto; /* Три строки */
    gap: 20px; /* Расстояние между кнопками */
    justify-items: center; /* Центрирование кнопок по горизонтали */
    align-items: center;
  }

  .profile-buttons:last-child() {
    position: absolute;
    left: 150px;
  }

  .logout-button p,
  .edit-button-friends,
  .friends,
  .edit-button p {
    font-size: 15px;
    /* line-height: 1; */
  }

  .edit-button,
  .edit-button-friends {
    border-radius: 30px;
    border: none;
    min-width: 160px;
  }

  .logout-button {
    width: 160px;
    border-radius: 30px;
    border: none;
    grid-column: 1 / 3; /* Растянуть кнопку на всю ширину (2 колонки) */
    justify-self: center;
  }

  .logout-button p {
    margin-top: -10px;
  }

  .container {
    width: 100%;
  }

  #app {
    background: linear-gradient(90deg, #dfe267 0.08%, #cbee83 99.92%);
    width: 100%;
  }

  .person-image {
    margin-left: 0px;
    margin-top: 130px;
  }

  .person-image img {
    width: 90px;
    border-radius: 34px;
  }

  .person-info {
    margin-left: 0px;
    left: 150px;
    top: 160px;
    gap: 10px;
  }

  .person-name {
    font-size: 18px;
    line-height: 1;
    height: 20px;
    width: 230px;
  }

  .person-age,
  .person-location {
    font-size: 16px;
    line-height: 1;
    height: 20px;
  }
}
</style>
