<template>
  <div class="location-container">
    <input type="text" placeholder="Please input a city" v-model="keyWord" />
    <button class="location-button" @click="searchCity">
      <span>Search</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchCity() {
      this.$store.commit("UPDATE_CityData", { isLoading: true, errMsg: "" });
      this.$store.dispatch("searchCity", this.keyWord);
    },
  },
};
</script>

<style lang="scss" scoped>
$colorGradient: linear-gradient(135deg, #72edf1 10%, #5151e6 100%);

.location-container {
  position: relative;
  padding: 25px 35px;
  width: 320px;
  height: 126px;

  input {
    outline: none;
    width: 300px;
    height: 28px;
    padding: 6px;
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 30px;
    left: calc(50% - 120px);

    color: #222831;
    border: none;
    border-radius: 5px;
  }
  button {
    width: 320px;
    padding: 8px;
    box-sizing: border-box;
    border: none;
    color: #fff;
    background-image: $colorGradient;
    border-radius: 25px;
    font-weight: bold;
    box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.2s;
    position: absolute;
    bottom: 60px;
    left: calc(50% - 130px);

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
