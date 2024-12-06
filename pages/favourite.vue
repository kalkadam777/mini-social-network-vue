<script>
import AppHeader from "~/components/header/AppHeader.vue";

export default {
  name: "favourite",
  components: { AppHeader },
  data() {
    return {
      profile: null,
      favourite_profiles: null,
      isFavorite: false,
      showRenameModal: false, // Управление видимостью модального окна
      currentProfile: null, // Хранит текущий профиль для изменения имени
      newName: "", // Новое имя
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.get("profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      this.profile = response.data;
      this.favourite_profiles = response.data.favourite_profiles;
      console.log(this.favourite_profiles);
    } catch (error) {
      console.error(error);
      this.$router.push("/login");
    }
  },
  methods: {
    async removeFavorite(user) {
      const userId = user;
      try {
        const response = await this.$axios.post(
          `/profile/${userId}/remove-favorite/`,
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        this.favourite_profiles = this.favourite_profiles.filter(
          (profile) => profile.user_username !== userId
        );
        console.log("Profile removed from favorites:", response.data);
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    },
    openRenameModal(profile) {
      this.currentProfile = profile;
      this.newName = profile.full_name;
      this.showRenameModal = true;
    },
    closeRenameModal() {
      this.showRenameModal = false;
      this.currentProfile = null;
      this.newName = "";
    },
    async renameUser() {
      if (!this.currentProfile || !this.newName.trim()) return;
      try {
        const response = await this.$axios.patch(
          `/profile/${this.currentProfile.user_username}/rename/`,
          { new_name: this.newName },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        this.currentProfile.full_name = this.newName;
        console.log("Name updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating name:", error);
      } finally {
        this.closeRenameModal();
      }
    },
  },
};
</script>

<template>
  <div id="app">
    <AppHeader />
    <h1 class="fav-title">My Friends</h1>
    <div class="container">
      <div v-for="profile in favourite_profiles" class="fav-list">
        <div class="fav-item">
          <div class="item-info">
            <img
              :src="`http://localhost:8000${profile.avatar}`"
              alt=""
              class="item-img"
            />
            <div class="name_and_activ">
              <p class="item-name">{{ profile.full_name }}</p>
              <p class="item-activ">Activity: 1 hours ago</p>
            </div>
          </div>

          <div class="item-buttons">
            <button
              class="unfollow-btn"
              @click="removeFavorite(profile.user_username)"
            >
              <p>UNFOLLOW</p>
            </button>

            <button class="view-btn" @click="openRenameModal(profile)">
              <p>RENAME</p>
            </button>
            <router-link :to="`/${profile.user_username}`"
              ><button class="chat-btn"><p>CHAT</p></button></router-link
            >
          </div>
        </div>
      </div>
    </div>

    <div v-if="showRenameModal" class="modal">
      <div class="modal-content">
        <h3>Rename User</h3>
        <input
          v-model="newName"
          type="text"
          placeholder="Enter new name"
          class="rename-input"
        />
        <div class="modal-buttons">
          <button @click="renameUser" class="confirm-btn">Save</button>
          <button @click="closeRenameModal" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.rename-input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.confirm-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button {
  cursor: pointer;
}

.container {
  margin-top: 230px;
  margin-left: 150px;
}

.fav-title {
  position: absolute;

  right: 30px;
  width: 473px;
  height: 139px;

  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 165px;

  color: #ffffff;
}

.fav-list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.item-info {
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 20px;
}

.name_and_activ {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item-activ {
  color: #ff0004;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Inknut Antiqua";
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.item-img {
  width: 55px;
  height: 55px;

  border-radius: 20%;
}
.fav-item {
  display: flex;
  margin-bottom: 20px;
}

.item-name {
  text-align: left;
  margin-left: 40px;
  width: 420px;
  font-family: "Inknut Antiqua", sans-serif;
  margin-top: -9px;
  min-width: 224px;
  height: 83px;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 83px;
  height: 60px;
  color: #294bff;
  -webkit-text-stroke: 0.8px black;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.item-buttons {
  display: flex;
  margin-top: 20px;
}

.unfollow-btn {
  min-width: 123px;
  height: 33px;

  background: #ec1c1c;
  border-radius: 12px;

  border: none;

  margin-left: 30px;
}

.unfollow-btn p {
  margin-top: 0;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 36px;

  color: #ffffff;
}

.view-btn {
  min-width: 123px;
  height: 33px;

  background: #3ad1d9;
  border-radius: 12px;

  border: none;

  margin-left: 30px;
}

.view-btn p {
  margin-top: 0;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 36px;

  color: #ffffff;
}

.chat-btn {
  min-width: 123px;
  height: 33px;

  background: #92f2c2;
  border-radius: 12px;

  border: none;

  margin-left: 30px;
}

.chat-btn p {
  margin-top: 0;
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 36px;

  color: #ffffff;
}
</style>
