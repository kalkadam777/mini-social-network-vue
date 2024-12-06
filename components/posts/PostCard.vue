<script>
import fullStar from "static/assets/stars/star.png";
import halfStar from "static/assets/stars/half-star.png";

export default {
  name: "PostCard",
  props: {
    post: Object,
    buttonType: {
      type: String,
      required: false,
      default: "like",
    },
  },
  data() {
    return {
      avatarUrl: null,
      isLoaded: false,
    };
  },
  computed: {
    fullAvatarUrl() {
      return this.avatarUrl
        ? `http://localhost:8000${this.avatarUrl}`
        : "http://localhost:8000/media/avatars/default.jpg";
    },
    isLike() {
      return this.buttonType === "like";
    },
    isDelete() {
      return this.buttonType === "delete";
    },
  },
  methods: {
    async fetchProfile(username) {
      try {
        const response = await this.$axios.get(`/profile/${username}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        this.$router.push("/login");
      }
    },
    async getProfile(creator) {
      try {
        const profile = await this.fetchProfile(creator);
        this.avatarUrl = profile
          ? profile.avatar
          : "/media/avatars/default.jpg";
        this.isLoaded = true;
      } catch (error) {
        console.error("Error in getProfile:", error);
        this.avatarUrl = "/media/avatars/default.jpg";
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
    formattedPubDate(pubDate) {
      return new Date(pubDate).toLocaleDateString();
    },
    increaseRating(postId) {
      this.$emit("increase-rating", postId);
    },
    deletePost(postId) {
      this.$emit("delete-post", postId);
    },
  },
  async mounted() {
    await this.getProfile(this.post.creator);
  },
};
</script>

<template>
  <div class="card">
    <div class="person-info">
      <div class="textAndRating">
        <span class="person-name">
          <p>{{ post.creator }}</p>
          <p>{{ formattedPubDate(post.pubDate) }}</p>
        </span>

        <span class="rating">
          <div class="text-rating">Rating</div>
          <div class="rating-stars">
            <img
              v-for="star in 5"
              :key="star"
              :src="getStarType(star, post.rating)"
              class="star-icon"
              width="22px"
              alt=""
            />
          </div>
        </span>
      </div>

      <span class="person-image" v-if="isLoaded">
        <router-link :to="`/${post.creator}`">
          <img :src="fullAvatarUrl" width="100" height="112" alt="" />
        </router-link>
      </span>
    </div>

    <span class="comment_section">
      {{ post.commentary }}
    </span>

    <button class="like-button" @click="increaseRating(post.id)" v-if="isLike">
      LIKE
    </button>
    <button class="delete-button" @click="deletePost(post.id)" v-if="isDelete">
      DELETE
    </button>
  </div>
</template>

<style scoped>
.card {
  margin-left: 30px;
  padding: 20px;
  width: 462px;
  height: 194px;
  border-radius: 10px;
  background: #5bb9cd;
  font-family: "Jersey 15", sans-serif;
  font-size: 30px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: white;
}

.person-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  color: white;
  margin-bottom: 40px;
}

.textAndRating {
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.person-name {
  width: 101px;
  height: 72px;
  border-radius: 10px;
  background: #fffff526;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 25px;
  padding: 10px;
}

.rating {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.rating-stars {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 20px;
}

.star-empty {
  color: white;
}

.filled {
  color: yellow;
}

.person-image {
  width: 71px;
  height: 92px;
  border-radius: 10px;
}

.person-image img {
  border-radius: 10px;
}

.like-button {
  float: right;
  margin-top: 30px;
  background: #43ef27;
  color: white;
  border: none;
  width: 62px;
  height: 29px;
  border-radius: 8px;
  font-family: "Jersey 15", sans-serif;
  font-size: 27px;
  font-weight: 400;
  line-height: 1;
}

.comment_section {
  /* margin-top: 60px; */
  padding-left: 20px;
}
.like-button:hover {
  background: #45c330;
}

.delete-button {
  float: right;
  margin-top: 10px;

  background: #ef2757;
  color: white;

  border: none;
  width: 62px;
  height: 22px;
  border-radius: 8px;

  font-family: "Jersey 15", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
}

.delete-button:hover {
  background: rgb(206, 35, 76);
}

@media (max-width: 480px) {
  .card {
    background: #7f9a3e;
    width: 100%;
    height: auto;
    margin-left: 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .rating {
    /* display: none; */
    flex-direction: row;
    align-items: center;
    margin-top: 0px;
  }

  .text-rating {
    display: none;
  }

  .textAndRating {
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .rating-stars {
    margin-top: 0px;
  }

  .person-info {
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 20px;
    /* padding-left: 10px; */
    /* padding-right: 10px; */
    margin-bottom: 0;
  }

  .person-name {
    flex-direction: row;
    width: 230px;
    height: auto;
  }

  .person-image img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }

  .like-button {
    float: none;
    margin-top: 5px;
    width: 62px;
    height: 29px;
  }

  .comment_section {
    padding-left: 0;
    height: 40px;
    width: 90%;
    margin-bottom: 5px;
  }
}
</style>
