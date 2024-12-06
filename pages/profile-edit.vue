<template>
  <div id="app">
    <AppHeader />

    <h1 class="title">Edit</h1>

    <div class="person-container" v-if="profile">
      <span class="person-image">
        <img :src="fullAvatarUrl" alt="avatar" />
      </span>

      <div class="person-info">
        <form @submit.prevent="updateProfile" class="form">
          <div class="form-input">
            <label for="full_name">Full Name</label>
            <input type="text" id="full_name" v-model="profile.full_name" />
          </div>

          <div class="form-input">
            <label for="age">Age</label>
            <input type="number" id="age" v-model="profile.age" />
          </div>

          <div class="form-input">
            <label for="location">Location</label>
            <input type="text" id="location" v-model="profile.location" />
          </div>

          <div>
            <label for="avatar">Profile Picture</label>
            <input type="file" id="avatar" @change="handleFileChange" />
          </div>

          <button type="submit" class="edit-button"><p>Save</p></button>
        </form>
      </div>
    </div>

    <div class="profile-buttons">
      <router-link to="profile"
        ><button class="profile-button"><p>Profile</p></button></router-link
      >
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";

export default {
  components: { AppHeader },
  data() {
    return {
      profile: {
        full_name: "",
        age: null,
        location: "",
        avatar: "",
      },
      avatarFile: null,
    };
  },
  computed: {
    fullAvatarUrl() {
      return this.profile.avatar
        ? `http://localhost:8000/${this.profile.avatar}`
        : "";
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get("profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      this.profile = response.data;
    } catch (error) {
      console.error(error);
      this.$router.push("/login");
    }
  },
  methods: {
    async updateProfile() {
      const formData = new FormData();
      formData.append("full_name", this.profile.full_name);
      formData.append("age", this.profile.age);
      formData.append("location", this.profile.location);

      if (this.avatarFile) {
        formData.append("avatar", this.avatarFile);
      }

      try {
        const response = await this.$axios.put("profile/", formData, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        this.profile = response.data;
        alert("Profile updated successfully!");
      } catch (error) {
        console.error(error);
        alert("Error updating profile");
      }
    },
    handleFileChange(event) {
      this.avatarFile = event.target.files[0];
    },
    async logout() {
      try {
        await this.$axios.post(
          "logout/",
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.removeItem("token");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Logout failed");
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
  position: absolute;
  top: 146px;
  left: 210px;

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

  color: #de13ff;

  -webkit-text-stroke: 0.8px black;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.profile-buttons {
  position: absolute;
  top: 200px;
  right: 60px;

  display: flex;
  flex-direction: column;
}

.logout-button {
  width: 162px;
  height: 42px;

  background: #be1010;
}
.logout-button p {
  margin-top: -16px;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 62px;

  color: #ffffff;
}

.edit-button {
  width: 162px;
  height: 42px;
  margin-top: 20px;

  background: #00ffa3;
  border: none;
}

.profile-button {
  width: 162px;
  height: 42px;
  margin-top: 20px;

  background: #5bb9cd;
  border: none;
}

.edit-button p,
.profile-button p {
  margin-top: -16px;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 62px;

  color: #ffffff;
}

.form-input {
  display: flex;
  flex-direction: column;
}

.form-input input {
  width: 441px;
  height: 44px;

  background: #d1cdcd;
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

.form-input input::placeholder {
  width: 195px;
  height: 44px;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 44px;

  color: #ffffff;
}

@media (max-width: 480px) {
  .title {
    font-size: 23px;
  }

  .person-image {
    margin-top: 100px;
    margin-left: 120px;
  }

  .person-image img {
    width: 90px;
  }

  .person-info {
    top: 300px;
    left: 10px;
  }

  .form-input input {
    width: 250px;
  }
}
</style>
