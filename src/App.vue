<template>
  <div id="app">
    <div class="container" v-show="!cityInfo.isLoading">
      <!-- weather(left) -->
      <WeatherSide />

      <!-- info(right) -->
      <RightSide />
    </div>
    <!-- 載入中&錯誤提示 -->
    <LoadingPage />
  </div>
</template>

<script>
import WeatherSide from "./components/WeatherSide.vue";
import RightSide from "./components/RightSide.vue";
import LoadingPage from "./components/LoadingPage.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    WeatherSide,
    RightSide,
    LoadingPage,
  },
  created() {
    this.$store.dispatch("initData");
  },
  computed: {
    ...mapState(["cityInfo", "currentSelect"]),
  },
};
</script>

<style lang="scss">
$colorBackground: #424242;
$colorContainer: #222831;
$colorGradient: linear-gradient(135deg, #72edf1 10%, #5151e6 100%);

* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: Arial, Helvetica, sans-serif;
}

.clear::after {
  content: "";
  display: block;
  clear: both;
}

body {
  width: 100%;
  height: 100vh;
  // background-color: $colorBackground;
  background: url(./assets/天空.png);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  position: relative;
  display: flex;
  width: 750px;
  height: 435px;
  background-color: $colorContainer;
  border-radius: 25px;
  box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
  color: #fff;
}

//--- right part end ---
</style>
