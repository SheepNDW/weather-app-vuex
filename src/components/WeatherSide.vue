<template>
  <div class="weather-side">
    <div class="gradient"></div>
    <div class="date-container">
      <h2 class="day-name">日期</h2>
      <span class="date-day">
        {{ cityInfo.weatherDatas[currentSelect].applicable_date }}
      </span>
      <span id="location">
        <i class="pin icon"></i>
        <p>{{ cityInfo.city }}</p>
      </span>
    </div>

    <div class="weather-container">
      <!-- icon -->
      <span><img :src="iconUrl" alt="" /></span>
      <div class="weather-temp">
        {{ Math.round(cityInfo.weatherDatas[currentSelect].the_temp) }}°C
      </div>
      <div class="weather-desc">
        {{ cityInfo.weatherDatas[currentSelect].weather_state_name }}
      </div>
    </div>
    <div class="humidity-chart">
      <div class="pie-chart" :style="pieStyle"></div>
      <span>濕度: {{ cityInfo.weatherDatas[currentSelect].humidity }}%</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WeatherSide",
  computed: {
    ...mapState(["cityInfo", "currentSelect"]),
    pieStyle() {
      return {
        background: `conic-gradient(#3b7df4 0 ${
          this.cityInfo.weatherDatas[this.currentSelect].humidity
        }%, rgba(255,255,255,0.8) 0 ${
          100 - this.cityInfo.weatherDatas[this.currentSelect].humidity
        }%)`,
      };
    },
    iconUrl() {
      return `https://www.metaweather.com/static/img/weather/${
        this.cityInfo.weatherDatas[this.currentSelect].weather_state_abbr
      }.svg`;
    },
  },
};
</script>

<style lang="scss" scoped>
$colorBackground: #424242;
$colorContainer: #222831;
$colorGradient: linear-gradient(135deg, #72edf1 10%, #5151e6 100%);
//--- left part start ---
.weather-side {
  position: relative;
  width: 300px;
  height: 100%;
  border-radius: 25px 0 0 25px;
  box-shadow: 0 0 35px -10px rgba(0, 0, 0, 0.2);
}

.gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: $colorGradient;
  border-radius: 25px 0 0 25px;
  opacity: 0.8;
}

.date-container {
  position: absolute;
  top: 25px;
  left: 25px;

  .date-day {
    display: block;
    margin-top: 4px;
  }

  #location {
    display: flex;
    position: relative;
    margin-top: 4px;

    p {
      margin-left: 4px;
      font-size: 1.2em;
    }

    .pin.icon {
      color: #fff;
      // position: absolute;
      margin-left: 4px;
      margin-top: 2px;
      width: 12px;
      height: 12px;
      border: solid 1px currentColor;
      border-radius: 7px 7px 7px 0;
      transform: rotate(-45deg);

      &:before {
        content: "";
        position: absolute;
        left: 3px;
        top: 3px;
        width: 4px;
        height: 4px;
        border: solid 1px currentColor;
        border-radius: 3px;
      }
    }
  }
}

.weather-container {
  position: absolute;
  bottom: 25px;
  left: 25px;

  #Layer_1 {
    transform: scale(0.7);
  }
  .weather-temp {
    font-size: 4em;
    font-weight: bold;
  }
  .weather-desc {
    font-size: 20px;
  }
}

.humidity-chart {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  right: 5px;
  bottom: 16px;
  width: 100px;
  height: 100px;
  span {
    opacity: 0.8;
  }

  .pie-chart {
    position: relative;
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
    border-radius: 50%;
    animation: show 1s ease-in-out;
    // border: 1px solid #fff;
    // background: conic-gradient(#3b7df4 0 75%, #fff 0 25%);

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b7df4 10%, #5151e6 100%);
    }
  }
}
//--- left part end ---
@keyframes show {
  0% {
    transform: scale(0) rotate(720deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>
