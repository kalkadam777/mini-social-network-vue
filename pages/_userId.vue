<template>
  <div id="app">
    <AppHeader />

    <div v-if="profile && profile.avatar && my_profile && posts">
      <h1 class="title">Profile</h1>
      <div class="person-container">
        <span class="person-image">
          <img :src="fullAvatarUrl" alt="avatar" />
        </span>

        <div class="person-info">
          <p class="person-name">{{ profile.full_name }}</p>
          <p class="person-age">Age: {{ profile.age }}</p>
          <p class="person-location">{{ profile.location }}</p>
          <p class="person-activity">Activity: was 5 minute ago</p>

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
        <button class="like-button" @click="increaseRating"><p>LIKE</p></button>
        <router-link
          :to="{
            path: '/chat',
            query: {
              my_avatar: fullAvatarUrl_my,
              my_name: my_profile.full_name,
              interlocutor_avatar: fullAvatarUrl,
              interlocutor_name: profile.full_name,
            },
          }"
        >
          <button class="chat-button">
            <p>CHAT NOW</p>
          </button>
        </router-link>
        <button class="like-button" v-if="!isFavorite" @click="addFavorite">
          <p>FOLLOW</p>
        </button>
        <button
          class="like-button"
          v-if="isFavorite"
          @click="removeFavorite"
          style="background: red"
        >
          <p>UNFOLLOW</p>
        </button>
      </div>

      <div class="person-posts">
        <p class="posts-title">Latest posts</p>
      </div>

      <div class="pagination" @click="nextPage">
        <img src="../static/assets/arrow_left.svg" alt="" />
        <p class="pagination_page">{{ currentPage }}/{{ totalPages }}</p>
        <img src="../static/assets/arrow_right.svg" alt="" />
      </div>

      <div class="cards-grid">
        <div v-for="post in paginatedPosts" :key="post.id" class="card">
          <PostCard :post="post" :button-type="'none'"></PostCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";
import fullStar from "static/assets/stars/star.png";
import halfStar from "static/assets/stars/half-star.png";
import PostCard from "~/components/posts/PostCard.vue";

export default {
  components: { PostCard, AppHeader },
  data() {
    return {
      profile: null,
      my_profile: null,
      isFavorite: false,
      posts: null,
      currentPage: 1,
      perPage: 2,
    };
  },
  async mounted() {
    await this.fetchProfile();
    try {
      const response = await this.$axios.get("profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      this.my_profile = response.data;
      this.isFavorite = this.my_profile.favourite_profiles.some(
        (profile) => profile.full_name === this.profile.full_name
      );
    } catch (error) {
      console.error(error);
    }
    await this.fetchPosts();
    console.log(this.fullAvatarUrl);
  },
  computed: {
    fullAvatarUrl() {
      return `http://localhost:8000/${this.profile.avatar}`;
    },
    fullAvatarUrl_my() {
      return `http://localhost:8000/${this.my_profile.avatar}`;
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
  methods: {
    async fetchPosts() {
      try {
        const response = await this.$axios.get("/posts/");
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async fetchProfile() {
      const userId = this.$route.params.userId;
      console.log("Fetching profile for user ID:", userId);
      try {
        const response = await this.$axios.get(`/profile/${userId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        this.profile = response.data;
        console.log(this.profile.id);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // this.$router.push('/login');
      }
    },
    async increaseRating() {
      const userId = this.$route.params.userId;
      try {
        const response = await this.$axios.post(
          `/profile/${userId}/increase-rating/`,
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        this.profile.rating = response.data.rating;
      } catch (error) {
        console.error("Error increasing rating:", error);
      }
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
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      } else {
        this.currentPage = 1;
      }
    },
    applyFilters() {
      this.currentPage = 1;
    },
    async addFavorite() {
      const userId = this.$route.params.userId;
      try {
        const response = await this.$axios.post(
          `/profile/${userId}/add-favorite/`,
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        this.isFavorite = true;
        console.log("Profile added to favorites:", response.data);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    },

    async removeFavorite() {
      const userId = this.$route.params.userId;
      try {
        const response = await this.$axios.post(
          `/profile/${userId}/remove-favorite/`,
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        this.isFavorite = false;
        console.log("Profile removed from favorites:", response.data);
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    },
  },
  watch: {
    "$route.params.userId": "fetchProfile",
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap");

.title {
  position: absolute;
  right: 0;

  width: 322px;
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
  /* width: 241px; */
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
}

.like-button {
  width: 243px;
  height: 52px;
  margin-top: 30px;

  background: #77fc6b;
  border: 1px solid #5bb9cd;

  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.chat-button {
  width: 243px;
  height: 52px;
  margin-top: 30px;

  background: #fffefe;
  border: none;

  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.chat-button p {
  margin-top: -8px;
  color: #000;
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: #000;
  font-family: "Inknut Antiqua", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.like-button:hover {
  background: #45c330;
}

.like-button p {
  margin-top: -17px;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: #000;
  font-family: "Inknut Antiqua";
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

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
</style>
