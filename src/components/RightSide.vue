<template>
  <div class="info-side">
    <div class="today-info-container">
      <div class="today-info">
        <!-- MaxT -->
        <div class="MaxT clear">
          <span class="title">最高溫</span>
          <div class="valuebar">
            <div class="bar-value" :style="'width: ' + maxT + '%'"></div>
          </div>
          <span class="value"
            >{{
              Math.round(cityInfo.weatherDatas[currentSelect].max_temp)
            }}°C</span
          >
        </div>
        <!-- MinT -->
        <div class="MinT clear">
          <span class="title">最低溫</span>
          <div class="valuebar">
            <div class="bar-value" :style="'width: ' + minT + '%'"></div>
          </div>
          <span class="value"
            >{{
              Math.round(cityInfo.weatherDatas[currentSelect].min_temp)
            }}°C</span
          >
        </div>
      </div>
    </div>

    <WeekList />

    <Search />
  </div>
</template>

<script>
import Search from "./Search.vue";
import WeekList from "./WeekList.vue";
import { mapState } from "vuex";
export default {
  name: "RightSide",
  components: {
    Search,
    WeekList,
  },
  computed: {
    ...mapState(["cityInfo", "currentSelect"]),
    maxT() {
      return (
        100 *
        (Math.round(this.cityInfo.weatherDatas[this.currentSelect].max_temp) /
          50)
      );
    },
    minT() {
      return (
        100 *
        (Math.round(this.cityInfo.weatherDatas[this.currentSelect].min_temp) /
          50)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
//--- right part start ---
.info-side {
  width: 450px;
  padding-top: 25px;
  margin-right: 10px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.today-info {
  padding: 15px 15px 5px 15px;
  margin: 0 25px 25px 25px;
  box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.4);
  border-radius: 10px;

  div {
    margin-bottom: 10px;
  }
  .title {
    float: left;
  }
  .value {
    float: right;
  }
  .MaxT,
  .MinT,
  .humidity {
    position: relative;
  }
  .valuebar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 70px;
    background-color: #fff;
    width: 200px;
    height: 4px;
    .bar-value {
      width: 100px;
      height: 100%;
      background-color: rgb(59, 125, 224);
      transition: 0.3s;
    }
  }
}
</style>
