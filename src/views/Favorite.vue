<template>
  <section>
    <Header page="Favorite" />
    <ul class="favorite-conatiner flex auto-center wrap">
      <li
        class="flex auto-center column hover-box"
        v-for="fav in favorite"
        :key="fav.id"
        @click="setLocation(fav)"
      >
        <p class="city-name">{{ fav.name }}</p>
        <div class="temperature flex column auto-center">
          <p class="value">
            {{ temperature(fav.lastData.hourData.Temperature.Value) }}
          </p>
          <p class="phrase">{{ fav.lastData.hourData.IconPhrase }}</p>
        </div>
        <p>Last update:</p>
        <p>{{ updatedAt(fav) }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import Header from "../components/Header";
import { cToF } from "../service/util.service";
const moment = require("moment");

export default {
  components: { Header },
  methods: {
    temperature(c) {
      return this.isCelsius ? c + "°C" : cToF(c) + "°F";
    },
    updatedAt({ lastData }) {
      return moment(lastData.updatedAt).fromNow();
    },
    async setLocation({ name, key }) {
      this.$store.dispatch({
        type: "setLocation",
        location: { name, key, search: true },
      });
      window.$cookies.set("locKey", location.key);
      window.$cookies.set("locName", location.name);
      this.$router.push("/");
      await this.$store.dispatch({ type: "setWeather" });
    },
  },
  computed: {
    isCelsius() {
      return this.$store.getters.getIsCelsius;
    },
    favorite() {
      return this.$store.getters.getFavorite;
    },
  },
};
</script>
