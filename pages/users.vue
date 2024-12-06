<template>
  <div id="app">

    <AppHeader/>
    <h1>Other Users' Profiles</h1>
    <div v-if="profiles.length > 0">
      <div v-for="profile in profiles" :key="profile.id" class="profile-card">
        <h3>{{ profile.full_name }}</h3>
        <p>{{ profile.location }}</p>
        <p>Age: {{ profile.age }}</p>
        <p>Rating: {{ profile.rating }}</p>
        <router-link :to="`/${profile.user_username}`"><button>View Profile</button></router-link>
      </div>
    </div>
    <div v-else>
      <p>No profiles found.</p>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";

export default {
  components: {AppHeader},
  data() {
    return {
      profiles: []
    };
  },
  mounted() {
    this.fetchProfiles();
  },
  methods: {
    async fetchProfiles() {
      try {
        const response = await this.$axios.get('/users/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        });
        this.profiles = response.data;
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    },
  }
};
</script>

<style scoped>
.profile-card {
  height: 300px;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  width: 200px;
  display: inline-block;
  text-align: center;
}
.profile-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.profile-card button {
  margin-top: 10px;
}
</style>
