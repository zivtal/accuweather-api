<template>
  <header>
    <div class="location-holder">
      <img src="../assets/icon/location.svg" />
      <a
        v-if="title === location"
        :href="'https://www.google.com/maps/place/' + location"
        target="_blank"
        class="location"
        v-text="location"
      ></a>
      <router-link class="location" v-else to="/" v-text="title"></router-link>
    </div>
    <nav>
      <ul>
        <li @click="toggleTemp">
          <img v-if="!isCelsius" src="../assets/icon/celsius.svg" />
          <img v-else src="../assets/icon/fahrenheit.svg" />
        </li>
        <li>
          <a href="#" @click="toggleMode">
            <img src="../assets/icon/dark-mode.svg" />
          </a>
        </li>
        <li v-if="$route.name !== 'Home'">
          <router-link to="/">
            <img src="../assets/icon/home.svg" />
          </router-link>
        </li>
        <li v-else>
          <router-link to="/favorite">
            <img src="../assets/icon/favorite.svg" />
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleMode() {
      const body = document.querySelector("body");
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
      this.$notify({
        type: "info",
        text: `${this.isDarkMode ? "Dark" : "Light"} mode`,
      });
      window.$cookies.set("isDark", this.isDarkMode);
    },
    toggleTemp() {
      this.$notify({
        type: "info",
        text: `Unit: ${this.isCelsius ? "Fahrenheit" : "Celsius"}`,
      });
      this.$store.dispatch({ type: "toggleCelsius" });
    },
  },
  computed: {
    location() {
      return this.$store.getters.getLocation?.name;
    },
    title() {
      const page = this.$route.name;
      return page === "Home" && this.location ? this.location : page;
    },
    isCelsius() {
      return this.$store.getters.getIsCelsius;
    },
  },
  mounted() {
    const body = document.querySelector("body");
    this.isDarkMode = window.$cookies.get("isDark") === "true" || false;
    if (this.isDarkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  },
};
</script>

<style></style>
