import axios from "axios";
import Swal from 'sweetalert2'

import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);


const actions = {
  async searchCity(context, value) {
    try {
      const { data } = await axios.get(`https://www.metaweather.com/api/location/search/?query=${value}`)
      if (data.length) {
        context.dispatch('getCityData', data[0].woeid)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '無效的城市名!'
        })
        context.commit("UPDATE_CITYDATA", { isLoading: false });
      }
    }
    catch (err) {
      console.log('catch', err);
      context.commit("UPDATE_CITYDATA", { errMsg: err });
    }
  },
  async getCityData(context, value) {
    try {
      const { data } = await axios.get(`https://www.metaweather.com/api/location/${value}/`)
      console.log("請求成功了");
      context.commit("UPDATE_CITYDATA", {
        city: data.title,
        weatherDatas: data.consolidated_weather,
        isLoading: false,
        errMsg: "",
      });
    }
    catch (err) {
      console.log('catch', err);
    }
  },
  async initData(context) {
    const { data } = await axios.get(`https://www.metaweather.com/api/location/2306179/`)
    context.commit('UPDATE_CITYDATA', { weatherDatas: data.consolidated_weather, isLoading: false })
  }
};

const mutations = {
  UPDATE_CITYDATA(state, value) {
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
    weatherDatas: [
      {
        applicable_date: "",
        the_temp: 0,
        max_temp: 0,
        min_temp: 0,
        humidity: 0,
        weather_state_abbr: "hc",
      }
    ],
  },
  currentSelect: 0,
};


//創建並暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
