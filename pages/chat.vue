<template>
  <div id="app">
    <AppHeader />
    <div class="chat-container" ref="chatContainer">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message-container', message.alignment]"
      >
        <!-- :src="message.avatar" -->
        <img :src="message.avatar" alt="Avatar" class="avatar" />
        <div :class="['message-info', message.alignment]">
          <div :class="['user-info', message.alignment]">
            <div>{{ message.username }}</div>
            <span class="time">{{ message.time }}</span>
          </div>
          <div class="message">{{ message.text }}</div>
        </div>
      </div>
      <div class="input-container">
        <input
          v-model="userInput"
          type="text"
          placeholder="Enter a message..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/header/AppHeader.vue";
export default {
  components: { AppHeader },
  data() {
    return {
      myProfile: null,
      interlocutorProfile: null,
      myAvatarUrl: this.$route.query.my_avatar,
      myName: this.$route.query.my_name,
      interlocutorAvatarUrl: this.$route.query.interlocutor_avatar,
      interlocutorName: this.$route.query.interlocutor_name,
      userInput: "",
      messages: [],
    };
  },

  mounted() {
    // Пример добавления первого сообщения после инициализации данных
    this.messages.push({
      id: 1,
      username: this.interlocutorName,
      text: "Hey! Thanks for following me!",
      alignment: "left",
      time: "Just now",
      avatar: this.interlocutorAvatarUrl,
    });
  },
  methods: {
    sendMessage() {
      if (!this.userInput.trim()) return;

      // Добавление сообщения пользователя
      this.messages.push({
        id: Date.now(),
        username: this.myName,
        text: this.userInput,
        alignment: "right",
        time: "For now",
        avatar: this.myAvatarUrl,
      });

      // Очистка поля ввода
      this.userInput = "";

      // Прокрутка чата вниз
      this.scrollToBottom();

      // Автоматический ответ
      setTimeout(this.generateResponse, 1000);
    },
    generateResponse() {
      const responses = [
        "Hi! How are you?",
        "Thanks for the message!",
        "What can I do for you?",
        "That`s an interesting question.",
        "Sure, I can do that.",
        "I`ll be back soon, stay in touch!",
        "Have you tried this solution?",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      this.messages.push({
        id: Date.now(),
        username: this.interlocutorName,
        text: randomResponse,
        alignment: "left",
        time: "For now",
        avatar: this.interlocutorAvatarUrl,
      });

      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatContainer.scrollTop =
          this.$refs.chatContainer.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  height: 70vh;
  overflow-y: auto;
  margin-top: 80px;
}
.message-container {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  /* gap: 2px; */
}
.message-container.right {
  justify-content: flex-start;
  flex-direction: row-reverse;
  align-items: flex-end;
  gap: 5px;
}
.avatar {
  width: 84px;
  height: 90px;
  border-radius: 30%;
  margin-right: 10px;
}
.message-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* max-width: 70%; */
}

.message-info.right {
  flex-direction: row-reverse;
  gap: 20px;
}
.user-info {
  color: #de13ff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Inknut Antiqua", sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 2;
}

.user-info.right {
  color: #2713ff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Inknut Antiqua", sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 2;
}

.time {
  color: #23ff13;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-text-stroke-color: #000;
  font-family: "Inknut Antiqua";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 2;
}
.message {
  background: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  color: #000;
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: rgba(0, 0, 0, 0.5);
  font-family: "Inknut Antiqua";
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding-right: 100px;
}
.input-container {
  display: flex;
  margin-top: 15px;
  color: #fff;
  font-family: "Inknut Antiqua";
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
input[type="text"] {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-family: "Inknut Antiqua";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  font-family: "Inknut Antiqua";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  margin-left: 10px;
}
</style>
