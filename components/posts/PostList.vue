<template>
  <div class="posts-container" v-if="profile">
    <span class="date">
      {{ todayDate }}
    </span>

    <div class="configuration">
      <span class="category-title">
        {{ selectedCategory }}
      </span>

      <span class="filter-section">
        <img
          src="../../static/assets/peopleList/selector.svg"
          alt="select"
          class="selector-image"
        />
        <select v-model="selectedFilter" @change="applyFilters">
          <option value="Rating">Rating</option>
          <option value="PubDate">Date</option>
        </select>
      </span>

      <span class="pagination" @click="nextPage">
        <img
          src="../../static/assets/peopleList/Arrow.svg"
          alt="arrow"
          class="pagination-arrow"
        />
        <p>{{ currentPage }}/{{ totalPages }}</p>
      </span>
    </div>

    <div class="cards-grid">
      <div v-for="post in paginatedPosts" :key="post.id" class="card">
        <PostCard :post="post" @increase-rating="increaseRating"></PostCard>
      </div>
    </div>
  </div>
</template>

<script>
import { getTodayDate } from "~/store/utils/dateUtils";

import { selectedCategory } from "~/components/peopleCards/state";
import fullStar from "static/assets/stars/star.png";
import halfStar from "static/assets/stars/half-star.png";
import _ from "lodash";
import PostCard from "~/components/posts/PostCard.vue";

export default {
  components: { PostCard },
  data() {
    return {
      posts: [],
      todayDate: getTodayDate(),
      selectedCategory: selectedCategory,
      selectedFilter: "Rating",
      currentPage: 1,
      perPage: 4,
      isLoaded: false,
      profile: null,
    };
  },
  async mounted() {
    await this.fetchPosts();
    try {
      const response = await this.$axios.get("profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      this.profile = response.data;
      console.log(this.profile);
    } catch (error) {
      console.error(error);
      this.$router.push("/login");
    }
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
    async increaseRating(postId) {
      try {
        const response = await this.$axios.post(
          `/posts/${postId}/increase-rating/`,
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedRating = response.data.rating;

        const post = this.posts.find((p) => p.id === postId);
        if (post) post.rating = updatedRating;
      } catch (error) {
        console.error("Error increasing rating:", error);
      }
    },
    isValid(post) {
      return this.profile.user_username !== post.creator;
    },
    applyFilters() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      } else {
        this.currentPage = 1;
      }
    },
    getStarType(star, RATING) {
      const rating = RATING;

      if (star <= Math.floor(rating)) {
        return fullStar; // Полная звезда
      } else if (star === Math.ceil(rating) && rating % 1 !== 0) {
        return halfStar; // Половинная звезда
      } else {
        return "";
      }
    },
    formattedPubDate(DATE) {
      const date = new Date(DATE);
      return date.toLocaleDateString();
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredPeople.length / this.perPage);
    },
    filteredPeople() {
      let filteredByCategory = this.posts;

      if (this.selectedCategory) {
        filteredByCategory = filteredByCategory.filter(
          (post) => post.topic === this.selectedCategory
        );
      }
      if (this.selectedCategory === "All") {
        filteredByCategory = this.posts;
      }

      this.currentPage = 1;

      if (this.profile && this.profile.user_username) {
        filteredByCategory = filteredByCategory.filter(
          (post) => post.creator !== this.profile.user_username
        );
      }

      if (this.selectedFilter === "PubDate") {
        return _.orderBy(filteredByCategory, ["pubDate"], ["desc"]);
      } else if (this.selectedFilter === "Rating") {
        return _.orderBy(filteredByCategory, ["rating"], ["desc"]);
      }

      return filteredByCategory;
    },
    paginatedPosts() {
      const isMobile = window.innerWidth <= 480; // Check if the screen width is mobile size

      if (isMobile) {
        return this.filteredPeople; // Return all posts without pagination for mobile
      }

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredPeople.slice(start, end);
    },
  },
};
</script>

<style scoped>
.posts-container {
  color: white;
  background: linear-gradient(
    180deg,
    rgba(254, 254, 254, 0.9) 0%,
    rgba(206, 210, 210, 0.9) 40%,
    rgba(193, 197, 197, 0.9) 62%,
    rgba(184, 187, 187, 0.9) 100%
  );

  width: 1200px;
  height: 800px;
  border: 1px;

  display: flex;
  flex-direction: column;

  margin-top: 100px;
  margin-left: 227px;

  border-radius: 13px;
  box-sizing: border-box;

  /* padding-top: 200px; */
  /* padding-bottom: 200px; */
}

.date {
  width: 249px;
  height: 42px;
  border-radius: 8px;

  background: #5bb9cd;

  margin-top: 30px;
  margin-left: 30px;

  font-family: "Inknut Antiqua", sans-serif;
  font-size: 36px;
  font-weight: 400;
  line-height: 93px;

  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.configuration {
  display: flex;

  margin-top: 40px;
  margin-left: 30px;
  margin-bottom: 100px;

  height: auto;
}

.category-title {
  width: 351px;
  height: 51px;
  border-radius: 10px;

  background: #5bb9cd;

  font-family: "Jersey 15", sans-serif;
  font-size: 64px;
  font-weight: 400;
  line-height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-section {
  margin-left: 130px;
  height: 38px;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  background: #eefcf7;
}

.filter-section select {
  background: #eefcf7;
  background: url("static/assets/peopleList/polygon.svg") no-repeat right 5px
    top 8px;
  appearance: none;

  width: 187px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Jersey 15", sans-serif;
  font-size: 36px;
  font-weight: 400;
  line-height: 36px;
  text-align: center;

  color: #1de390;
  z-index: 999;
}

.selector-image {
  position: absolute;
  left: 750px;
  top: 230px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-left: 230px;

  width: auto;
}

.pagination p {
  font-family: "Inknut Antiqua", sans-serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 60px;
  text-align: left;

  margin-top: 0;
}

.pagination-arrow {
  position: absolute;
  top: 180px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 480px) {
  .posts-container {
    background: none;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-left: 0;
    margin-top: 50px;
    /* margin-bottom: 100px; */
  }
  .date,
  .filter-section,
  .pagination {
    display: none;
  }
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    margin-bottom: 140px;
  }

  .category-title {
    background: #7f9a3e;
  }

  .configuration {
    margin-left: 20px;
    margin-bottom: 50px;
  }
}
</style>
