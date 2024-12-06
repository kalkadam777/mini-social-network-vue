<template>
  <div id="app">
    <AppHeader />
    <div class="top_content">
      <div class="img_container" @click="goBack">
        <img
          src="../static/assets/big_arrow_left.svg"
          alt=""
          class="img_arrow"
        />
        <img src="../static/assets/Ellipse.svg" alt="" class="img_ell" />
      </div>
      <h1 class="fav-title">Statistic</h1>
    </div>
    <div class="bar">
      <BarChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
    <div class="date-input">
      <DatePicker
        v-model="dateRange"
        range
        placeholder="Select Date Range"
        format="YYYY-MM-DD"
      />
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import AppHeader from "../components/header/AppHeader.vue";
import { ref, onMounted, watch, computed, getCurrentInstance } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Регистрация модулей Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    BarChart: Bar,
    AppHeader,
    DatePicker,
  },
  setup() {
    const chartData = ref({
      labels: [], // Даты
      datasets: [
        {
          label: "Post Counts",
          data: [], // Количество постов
          backgroundColor: "rgba(17, 255, 231, 1)",
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      // maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Posts Per Day",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
            drawTicks: false,
          },
          ticks: {
            stepSize: 1,
            font: {
              size: 16,
              color: "#000000",
            },
          },
        },
      },
    });

    const dateRange = ref([null, null]);
    const beginDate = ref(""); // Начальная дата
    const endDate = ref(""); // Конечная дата

    // const { proxy } = getCurrentInstance(); // Доступ к `this`
    // const username = ref(proxy.$store.getters.getUsername);
    // console.log(username.value);
    const username = ref("kalkadam");

    const fetchStatistics = async () => {
      if (!username.value) {
        console.warn("Имя пользователя отсутствует.");
        return;
      }
      try {
        const url = new URL(
          `http://127.0.0.1:8000/api/posts/${username.value}/stats/`
        );
        if (beginDate.value)
          url.searchParams.append("start_date", beginDate.value);
        if (endDate.value) url.searchParams.append("end_date", endDate.value);

        const response = await fetch(url);
        const data = await response.json();

        // Обновляем данные графика
        chartData.value.labels = data.map((item) => {
          const date = new Date(item.period);
          return date.toISOString().split("T")[0]; // Получаем только дату без времени
        });
        chartData.value.datasets[0].data = data.map((item) => item.total);
      } catch (error) {
        console.error("Ошибка загрузки статистики:", error);
      }
    };

    watch(dateRange, (newVal) => {
      if (newVal[0])
        beginDate.value = new Date(newVal[0]).toISOString().split("T")[0];
      if (newVal[1])
        endDate.value = new Date(newVal[1]).toISOString().split("T")[0];
      fetchStatistics();
    });

    // Загружаем данные при монтировании
    onMounted(fetchStatistics);

    return {
      chartData,
      chartOptions,
      beginDate,
      endDate,
      dateRange,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.bar {
  height: 400px;
  width: 100%;
  background-color: #cbe7f073;
}
.date-input {
  position: absolute;
  top: 220px;
  right: 50px;
}

.top_content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 100px;
  padding-right: 100px;
  align-items: center;
  padding-top: 5px;
  margin-top: 50px;
}

.fav-title {
  font-family: "Inknut Antiqua", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 1;
  color: #ffffff;
}

.img_container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 122px;
  height: 75px;
}

.img_ell {
  width: 100%;
  height: 100%;
}

.img_arrow {
  position: absolute;
  width: 65px;
  height: 65px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
