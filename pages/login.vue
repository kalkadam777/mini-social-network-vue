<template>
  <div id="app">
    <AppHeader />

    <div class="login">
      <h1 class="login-title">Profile | Login</h1>
      <form @submit.prevent="login" class="login-form">
        <p class="input-label">Enter username</p>
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          required
          class="login-input"
        />

        <p class="input-label">Enter password</p>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="login-input"
        />
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>

    <router-link to="register"><h3 class="register">Register→</h3></router-link>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";

export default {
  components: { AppHeader },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post("login/", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token); // Save token
        this.$router.push("/profile");
      } catch (error) {
        console.error(error);
        alert("Invalid credentials");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap");

.register {
  position: absolute;
  top: 100px;
  right: 100px;

  color: white;

  background: #63e3eb;
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

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;

  color: #ffffff;

  text-align: center;

  display: flex;
  align-content: center;
  justify-content: center;

  width: 200px;

  background: #63e3eb;
  border-radius: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-input {
  width: 441px;
  height: 44px;

  background: #74f0f0;
  border-radius: 16px;
  border: none;
}

.login-input::placeholder {
  /* user@example.com */
  width: 195px;
  height: 44px;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;

  color: #ffffff;
}

.login-input {
  margin-bottom: 60px;

  padding-left: 10px;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 32px;

  color: #ffffff;
}

.login-button {
  width: 176px;
  height: 50px;

  background: #49f364;
  border-radius: 12px;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;
  /* identical to box height */

  color: #ffffff;

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

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;
  color: #ffffff;

  margin: 0;
}

@media (max-width: 480px) {
  .login {
    margin-top: 90px;
    margin-left: 30px;
  }

  .login-title {
    margin-top: 80px;
    margin-bottom: 50px;
  }

  .register {
    top: 80px;
    right: 248px;
  }

  .login-input {
    width: 300px;
  }

  .login-button {
    margin-top: 30px;
    margin-left: 70px;
  }
}
</style>
