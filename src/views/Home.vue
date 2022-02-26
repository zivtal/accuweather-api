<template>
  <section>
    <Search @set="(isShow) => (isSearch = isShow)" />
    <template v-if="!isSearch">
      <div v-if="weather.hourData && weather.fiveDayData" class="location-info">
        <div class="favorite flex auto-center" @click="toggleFavorite">
          <img
            v-if="!isFavorite"
            class="bwicon"
            src="../assets/icon/like.svg"
            alt=""
          />
          <img v-else src="../assets/icon/ilike.svg" alt="" />
        </div>
        <div class="temperature flex column auto-center">
          <p class="value">
            {{ temperature(weather.hourData.Temperature.Value) }}
          </p>
          <p class="phrase">{{ weather.hourData.IconPhrase }}</p>
        </div>
        <div class="days flex auto-center wrap">
          <div
            class="temperature flex column auto-center shadow rounded"
            v-for="(day, index) in weather.fiveDayData.DailyForecasts"
            :key="index"
          >
            <p class="value">
              {{ temperature(day.Temperature.Maximum.Value) }}
            </p>
            <p class="date">
              {{
                new Date(day.EpochDate * 1000).toLocaleString("en-US", {
                  day: "2-digit",
                  year: "2-digit",
                  month: "2-digit",
                })
              }}
            </p>
          </div>
        </div>
      </div>
      <Loader v-else />
    </template>
  </section>
</template>

<script>
import Loader from "../components/Loader.vue";
import Search from "../components/Search.vue";
import { cToF } from "../service/util.service";

export default {
  name: "Home",
  components: {
    Loader,
    Search,
  },
  data() {
    return {
      isSearch: false,
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch({ type: "setWeather" });
      this.$notify({
        type: "info",
        text: `${this.location.name}'s forecast loaded`,
      });
    } catch (err) {
      this.$notify({ type: "error", text: err });
    }
  },
  methods: {
    temperature(c) {
      return this.isCelsius ? c + "°C" : cToF(c) + "°F";
    },
    toggleFavorite() {
      this.$store.dispatch({ type: "setFavorite" });
      this.$notify({
        type: "info",
        text: `${this.location.name} has been ${
          this.isFavorite ? "added to" : "removed from"
        } favorite.`,
      });
    },
  },
  computed: {
    isCelsius() {
      return this.$store.getters.getIsCelsius;
    },
    isFavorite() {
      const key = this.location.key;
      const favorite = this.$store.getters.getFavorite;
      return favorite.find((fav) => fav.key === key);
    },
    location() {
      return this.$store.getters.getLocation;
    },
    weather() {
      return this.$store.getters.getWeather;
    },
  },
};
</script>
