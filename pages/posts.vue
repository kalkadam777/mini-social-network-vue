<template>
  <div id="app">
    <h1>Blog Posts</h1>
    <div v-if="posts && posts.length">
      <div v-for="post in posts" :key="post.id">
        <h2>{{ post.topic }}</h2>
        <p>{{ post.commentary }}</p>
      </div>
    </div>
    <div v-else>
      <p>No posts available.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.get('posts/');
      this.posts = response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
