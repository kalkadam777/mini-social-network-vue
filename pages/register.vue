<!-- <template>
  <div id="app">

    <AppHeader/>

    <div class="register">
      <h2 class="register-title">Profile | Registration</h2>
      <form @submit.prevent="register" class="register-form">

        <p class="input-label">Enter username</p>
        <input v-model="username" type="text" placeholder="Username" required class="register-input"/>

        <p class="input-label">Enter email</p>
        <input v-model="email" type="email" placeholder="Email" required class="register-input"/>

        <p class="input-label">Enter password</p>
        <input v-model="password" type="password" placeholder="Password" required class="register-input"/>

        <button type="submit" class="submit-button">Register</button>
      </form>
    </div>

    <router-link to="login"><h3 class="login">Login→</h3></router-link>


  </div>
</template> -->

<template>
  <div id="app">
    <AppHeader />
    <div class="registration">
      <div class="title">PROFILE | REGISTRATION</div>
      <div class="register-form">
        <form method="POST">
          <div class="label">Enter your email:</div>
          <input type="email" v-model="email" required />
          <div class="label">Create username:</div>
          <input type="text" v-model="username" required />
          <div class="label">Create your password:</div>
          <input type="password" v-model="password" required />
          <div class="label">Confirm password:</div>
          <input type="password" v-model="confirmPassword" required />
        </form>

        <button @click="isopenconfirm = true" id="create_button">
          CREATE USER
        </button>
      </div>
    </div>
    <div class="confirm" v-if="isopenconfirm">
      <div id="confirm-title">TO CREATE ACCOUNT DO NEXT STEPS</div>
      <div id="confirm-main">
        <div id="confirm-email">
          <div>CONFIRM YOUR EMAIL</div>
          <button id="button-conform">CLICK TO CONFIRM</button>
        </div>
        <div id="enter">
          <div>ENTER THE SECRET PHRASE</div>
          <input id="secret" type="password" />
        </div>
      </div>
      <button id="create" @click="register()">CREATE {{ username }}</button>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";

export default {
  components: { AppHeader },
  data() {
    return {
      isopenconfirm: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      if (this.password == this.confirmPassword) {
        try {
          const response = await this.$axios.post("register/", {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          alert("Registration successful");
          this.$router.push("/login");
        } catch (error) {
          console.error(error);
          this.$router.push("/login");
        }
      } else {
        this.isopenconfirm = false;
        alert("Passwords do not match");
      }
    },
  },
};
</script>

<style scoped>
.registration {
  height: 80vh;
  margin-top: 140px;
  padding-left: 100px;
  padding-right: 100px;
}
.title {
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 100px;
  color: #ffffff;
  font-family: "Inknut Antiqua";
  font-size: 17px;
  font-weight: 700;
  line-height: 43.84px;
  text-align: left;
  gap: 0px;
  border-radius: 14px;
  opacity: 0px;
  background: #63e3eb;
}
.register-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.label {
  font-family: "Inknut Antiqua";
  font-size: 17px;
  font-weight: 700;
  line-height: 43.84px;
  text-align: left;
  color: white;
}
p {
  font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 700;
  line-height: 43.84px;
  text-align: left;
}
input {
  color: white;
  font-family: "Inknut Antiqua";
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  gap: 0px;
  border-style: none;
  border-radius: 16px;
  opacity: 0px;
  background: #74f0f0;
  width: 30em;
  height: 3em;
  padding-left: 10px;
  /* padding-top: 10px;
    padding-bottom: 10px; */
}
input[type="text"] {
  text-decoration: underline;
}
input[type="password"] {
  -webkit-text-security: square;
}
#create_button {
  color: #ffffff;
  font-family: "Inknut Antiqua";
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  align-self: flex-end;
  width: 216px;
  border-style: none;
  height: 55px;
  top: 1006px;
  left: 1388px;
  border-radius: 12px;
  background: #49f364;
}
.confirm {
  color: white;
  position: absolute;
  top: 100px;
  left: 75px;
  width: 1500px;
  height: 800px;
  gap: 0px;
  opacity: 0px;
  background: linear-gradient(180deg, #62f0e8 0%, #50beb7 60%, #2f8781 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
#confirm-email,
#enter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 60px;
  color: #fff;
  font-family: "Inknut Antiqua";
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
#confirm-email {
  gap: 115px;
}

#confirm-title {
  color: #1c1c1c;
  font-family: "Inknut Antiqua";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 1em;
  gap: 0px;
  border-radius: 18px 18px 18px 18px;
  opacity: 0px;
  background-color: white;
}
#confirm-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
}
#button-conform {
  font-family: "Inknut Antiqua";
  font-size: 24px;
  font-weight: 800;
  line-height: 61.9px;
  text-align: center;
  width: 332px;
  height: 66px;
  border: none;
  background: #d6e343;
  border-radius: 40px;
}
#secret {
  width: 332px;
  height: 66px;
  background: #44b3d6;
  border: none;
}
#create {
  font-family: "Inknut Antiqua";
  font-size: 17px;
  font-weight: 800;
  text-align: center;
  width: 332px;
  height: 66px;
  border: none;
  border-radius: 40px;
  background: #44b3d6;
  color: #fff;
  margin-bottom: 2em;
}
</style>

<!-- <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap');

.login {
  position: absolute;
  top: 100px;
  right: 100px;

  color: white;

  background: #63E3EB;
  border-radius: 5px;
  padding: 10px;

  transition: 0.3s ease-in-out;
}

.login:hover {
  background: #3b8c9d;
}

.register {
  margin-top: 90px;
  margin-left: 130px;

  display: flex;
  flex-direction: column;
}

.register-title {
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

  width: 300px;
  height: 60px;

  background: #63E3EB;
  border-radius: 14px;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.register-input {
  width: 441px;
  height: 44px;

  background: #74F0F0;
  border-radius: 16px;
  border: none;

}

.register-input::placeholder {

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

.register-input {
  margin-bottom: 60px;

  padding-left: 10px;
  font-family: 'Inknut Antiqua', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 32px;

  color: #FFFFFF;
}

.submit-button {
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

.submit-button:hover {
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



</style> -->
