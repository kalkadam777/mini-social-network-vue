<template>
  <div id="app">
    <AppHeader />
    <h1 class="title">POST</h1>
    <div class="form-container">
      <form @submit.prevent="createPost">
        <div class="form-input">
          <label for="topic">Topic:</label>
          <select v-model="newPost.topic" id="topic">
            <option>Travel</option>
            <option>Food</option>
            <option>Education</option>
            <option>Sport</option>
          </select>
        </div>

        <div class="form-input">
          <label for="commentary">Commentary:</label>
          <textarea v-model="newPost.commentary" id="commentary"></textarea>
        </div>

        <button type="submit" class="save-button"><p>Create</p></button>
      </form>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";

export default {
  components: { AppHeader },
  data() {
    return {
      newPost: {
        topic: "Travel",
        commentary: "",
        rating: 1.0,
      },
    };
  },
  methods: {
    async createPost() {
      try {
        const response = await this.$axios.post("/posts/", this.newPost, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        alert("Post created successfully!");
        this.newPost = { topic: "Travel", commentary: "", rating: 1.0 }; // Reset form
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post.");
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

  width: 322px;
  height: 139px;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 165px;

  color: #ffffff;
}

.form-container {
  position: absolute;
  top: 146px;
  left: 110px;

  font-family: "Inknut Antiqua", sans-serif;
  margin-left: 80px;
  text-align: left;
}

.form input,
textarea,
select {
  width: 441px;
  height: 44px;

  background: #8acde3;
  border-radius: 16px;
  border: none;

  padding-left: 10px;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 32px;

  color: #ffffff;
}

form input::placeholder,
textarea::placeholder {
  width: 195px;
  height: 44px;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;

  color: #ffffff;
}

.form-input {
  display: flex;
  flex-direction: column;
}

.save-button {
  width: 162px;
  height: 42px;
  margin-top: 20px;

  background: #00ffa3;
  border: none;

  border-radius: 20px;
}
.save-button p {
  /* margin-top: -20px; */
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 1;

  color: #ffffff;
}
</style>
