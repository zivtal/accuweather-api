<template>
  <header>
    <div class="location-holder">
      <img
        src="../assets/icon/location.svg"
        @click="() => $store.dispatch({ type: 'setCities' })"
      />
      <a
        v-if="location"
        :href="'https://www.google.com/maps/place/' + location"
        rel="noopener noreferrer"
        target="_blank"
        class="location"
        v-text="location"
      ></a>
      <router-link class="location" v-else to="/" v-text="page"></router-link>
    </div>
    <nav>
      <ul>
        <li @click="$store.dispatch({ type: 'toggleCelsius' })">
          <img v-if="!isCelsius" src="../assets/icon/celsius.svg" />
          <img v-else src="../assets/icon/fahrenheit.svg" />
        </li>
        <li>
          <a href="#" @click="changeMode">
            <img src="../assets/icon/dark-mode.svg" />
          </a>
        </li>
        <li v-if="page !== 'Home'">
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
  props: {
    page: null,
    location: null,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    changeMode() {
      const body = document.querySelector("body");
      if (this.isDarkMode) {
        this.isDarkMode = false;
        body.classList.remove("dark");
        window.$cookies.set("theme", "default");
      } else {
        this.isDarkMode = true;
        body.classList.add("dark");
        window.$cookies.set("theme", "dark");
      }
    },
  },
  computed: {
    isCelsius() {
      return this.$store.getters.getIsCelsius;
    },
  },
  mounted() {
    const body = document.querySelector("body");
    const mode = window.$cookies.get("theme");
    if (mode) {
      if (mode === "default") {
        this.isDarkMode = false;
        body.classList.remove("dark");
      } else {
        this.isDarkMode = true;
        body.classList.add("dark");
      }
    } else {
      window.$cookies.set("theme", "default");
    }
  },
};
</script>

<style></style>
