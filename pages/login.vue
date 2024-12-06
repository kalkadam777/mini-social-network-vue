<template>
  <div id="app">
    <AppHeader/>

    <div class="login">
      <h1 class="login-title">Profile | Login</h1>
      <form @submit.prevent="login" class="login-form">
        <p class="input-label">Enter username</p>
        <input v-model="username" type="text" placeholder="Username" required class="login-input" />

        <p class="input-label">Enter password</p>
        <input v-model="password" type="password" placeholder="Password" required class="login-input"/>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>

    <router-link to="register"><h3 class="register">Register→</h3></router-link>

  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";

export default {
  components: {AppHeader},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('login/', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', response.data.token); // Save token
        this.$router.push('/profile');
      } catch (error) {
        console.error(error);
        alert('Invalid credentials');
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap');

.register {
  position: absolute;
  top: 100px;
  right: 100px;

  color: white;

  background: #63E3EB;
  border-radius: 5px;
  padding: 10px;

  transition: 0.3s ease-in-out;
}

.register:hover {
  background: #3b8c9d;
}

.login {
  margin-top: 90px;
  margin-left: 130px;

  display: flex;
  flex-direction: column;
}

.login-title {
  margin-top: 40px;
  margin-bottom: 100px;

  font-family: 'Inknut Antiqua', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;

  color: #FFFFFF;

  text-align: center;

  display: flex;
  align-content: center;
  justify-content: center;

  width: 200px;

  background: #63E3EB;
  border-radius: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-input {
  width: 441px;
  height: 44px;

  background: #74F0F0;
  border-radius: 16px;
  border: none;

}

.login-input::placeholder {

  /* user@example.com */
  width: 195px;
  height: 44px;

  font-family: 'Inknut Antiqua', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;

  color: #FFFFFF;
}

.login-input {
  margin-bottom: 60px;

  padding-left: 10px;
  font-family: 'Inknut Antiqua', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 32px;

  color: #FFFFFF;
}

.login-button {
  width: 176px;
  height: 50px;

  background: #49F364;
  border-radius: 12px;

  font-family: 'Inknut Antiqua', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;
  /* identical to box height */

  color: #FFFFFF;

  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  margin-top: -100px;
  margin-left: 840px;
}

.login-button:hover {
  background: #2ec146;
}

.input-label {
  text-align: left;
  /* Enter your email */

  width: 164px;
  height: 44px;

  font-family: 'Inknut Antiqua', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;
  color: #FFFFFF;

  margin: 0;
}



</style>
