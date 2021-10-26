import axios from "axios";
import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);


const actions = {
  searchCity(context, value) {
    axios.get(`http://localhost:8080/api/location/search/?query=${value}`).then(
      response => {
        if (response.data.length) {
          axios.get(`http://localhost:8080/api/location/${response.data[0].woeid}/`).then(
            response2 => {
              console.log("請求成功了");
              context.commit("UPDATE_CityData", {
                city: response.data[0].title,
                weatherDatas: response2.data.consolidated_weather,
                isLoading: false,
                errMsg: "",
              });
            },
            error2 => {
              context.commit("UPDATE_CityData", { errMsg: error2.message, });
            }
          )
        } else {
          alert("查無此城市, 請重新輸入正確城市名");
          context.commit("UPDATE_CityData", { isLoading: false });
        }
      },
      error => {
        console.log(error);
        context.commit("UPDATE_CityData", { errMsg: error.message });
      }
    )
  },
  async initData(context) {
    const { data } = await axios.get(`http://localhost:8080/api/location/2306179/`)
    context.commit('UPDATE_CityData', { weatherDatas: data.consolidated_weather })
  }
};

const mutations = {
  UPDATE_CityData(state, value) {
    state.cityInfo = { ...state.cityInfo, ...value }
  },

  UPDATAE_SHOW(state, value) {
    console.log(value);
    state.currentSelect = value;
  },
};

const state = {
  cityInfo: {
    isLoading: false,
    errMsg: "",
    city: "Taipei",
    weatherDatas: [],
  },
  currentSelect: 0,
};


//創建並暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
