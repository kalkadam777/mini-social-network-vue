<template>
  <div class="person-card" :key="person.id">
    <div class="person-info">
      <span class="person-name">
        {{ person.PersonName }}
        {{ formattedPubDate }}
      </span>

      <span class="rating">
        RATING
        <div class="rating-stars">
          <img
              v-for="star in 5"
              :key="star"
              :src="getStarType(star)"
              class="star-icon"
              width="17px"
              alt=""
          />
        </div>
      </span>

      <span class="person-image">
        <img :src="person.Avatar" alt="avatar">
      </span>
    </div>

    <span class="comment-section">
      {{ person.Commentary }}
    </span>

    <button class="like-button" v-if="!hideLikeButton" @click="like">
      LIKE
    </button>
  </div>
</template>

<script>
import fullStar from '@/static/assets/stars/star.png';
import halfStar from '@/static/assets/stars/half-star.png';
export default {
  name: 'PersonCard',
  props: {
    person: {
      type: Object,
      required: true,
      validator(value) {
        const requiredKeys = ['id', 'PersonName', 'Avatar', 'PubDate', 'Rating', 'Commentary', 'Topic'];
        return requiredKeys.every(key => key in value);
      },
    },
    hideLikeButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedPubDate() {
      const date = new Date(this.person.PubDate);
      return date.toLocaleDateString();
    }
  },
  methods: {
    like() {
      this.$emit('like', this.person.id);
    },
    getStarType(star) {
      const rating = this.person.Rating;

      if (star <= Math.floor(rating)) {
        return fullStar; // Полная звезда
      } else if (star === Math.ceil(rating) && rating % 1 !== 0) {
        return halfStar; // Половинная звезда
      } else {
        return '';
      }
    },
  }
};
</script>

<style scoped>
.person-card {
  margin-left: 30px;
  padding: 10px;

  width: 362px;
  height: 144px;

  border-radius: 10px;

  background: #5BB9CD;

  font-family: "Jersey 15", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

}

.person-info {
  display: flex;
  justify-content: space-between;
}

.person-name {
  width: 101px;
  height: 72px;
  border-radius: 10px;

  background: #FFFFF526;

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  padding: 10px;
}

.rating {
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  text-align: center;
}

.rating-stars {
  display: flex;
  justify-content: space-between;

  margin-top: 20px;
}

.star-empty {
  color: white;
}

.filled {
  color: yellow;
}

.person-image {
  width: 71px;
  height: 92px;

  border-radius: 4px;

}

.like-button {
  float: right;
  margin-top: 10px;

  background: #43EF27;
  color: white;

  border: none;
  width: 62px;
  height: 22px;
  border-radius: 8px;

  font-family: "Jersey 15", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
}

.like-button:hover {
  background: #45C330;

}


</style>
