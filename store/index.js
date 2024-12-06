// store/index.js
export const state = () => ({
  username: "",
  posts: [],
});

export const mutations = {
  setUsername(state, username) {
    state.username = username;
  },
  setPosts(state, posts) {
    state.posts = posts;
  },
};

export const actions = {
  async fetchPosts({ commit }, { startDate, endDate }) {
    try {
      const response = await this.$axios.$get("/api/posts/stats", {
        params: { start_date: startDate, end_date: endDate },
      });
      commit("setPosts", response);
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    }
  },
  async fetchUsername({ commit }) {
    try {
      const response = await this.$axios.$get("/profile");
      if (response && response.username) {
        commit("setUsername", response.username);
      } else {
        console.warn("Пустой username в ответе от API.");
      }
    } catch (error) {
      console.error("Ошибка при загрузке имени пользователя:", error);
    }
  },
};

export const getters = {
  getUsername: (state) => state.username,
  getPosts: (state) => state.posts,
};
