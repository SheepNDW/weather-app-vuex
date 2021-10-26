<template>
  <div class="loadingPage" v-show="cityInfo.isLoading">
    <div class="monster">
      <div class="eye">
        <div class="eyeBall"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <h2 v-show="!cityInfo.errMsg">Loading...</h2>
    <h2 v-show="cityInfo.errMsg">{{ cityInfo.errMsg }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoadingPage",
  computed: {
    ...mapState(["cityInfo"]),
  },
};
</script>

<style lang="scss" scoped>
$colorContainer: #222831;

.loadingPage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 750px;
  height: 435px;
  background-color: $colorContainer;
  border-radius: 25px;
  color: #fff;

  .monster {
    width: 110px;
    height: 110px;
    background-color: #e55a54;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    cursor: pointer;
    margin: 10px;
    position: relative;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
    animation: jumping 0.8s infinite alternate;

    .eye {
      width: 40%;
      height: 40%;
      border-radius: 50%;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .eyeBall {
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: #0c4475;
    }

    .mouth {
      width: 32%;
      height: 12px;
      background-color: white;
      border-radius: 12px;
      margin-top: 15%;
    }

    &:before,
    &:after {
      content: "";
      display: block;
      width: 20%;
      height: 10px;
      background-color: white;
      position: absolute;
      left: 50%;
      top: -10px;
      border-radius: 10px;
    }

    &:before {
      transform: translateX(-70%) rotate(45deg);
    }

    &:after {
      transform: translateX(-30%) rotate(-45deg);
    }

    &.blue {
      background-color: #0c4475;
      animation-delay: 0.5s;

      .mouth,
      .eyeBall {
        background-color: #e55a54;
      }
    }
  }
  @keyframes jumping {
    50% {
      top: 0;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    }
    100% {
      top: -50px;
      box-shadow: 0px 120px 50px rgba(0, 0, 0, 0.2);
    }
  }
  @keyframes eyeMove {
    0%,
    10% {
      transform: translate(50%);
    }
    90%,
    100% {
      transform: translate(-50%);
    }
  }
  .monster .eyeBall {
    animation: eyeMove 1.6s infinite alternate;
  }
}
</style>
