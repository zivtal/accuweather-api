<template>
  <section class="search-conatiner">
    <div class="search-input-holder" :class="{ focus: inputFocus }">
      <input
        @focus="inputFocus = true"
        @blur="inputFocus = false"
        autocomplete="off"
        type="text"
        id="search"
        class="search-input"
        placeholder="Search Location"
        v-model="value"
      />
    </div>
    <div v-if="results" class="search-result-holder">
      <span v-if="!results.length" class="search-result no-result"
        >No Result Found</span
      >
      <button
        v-else
        v-for="(search, index) in results"
        :key="index"
        class="search-result"
        v-on:click="setLocation(search)"
      >
        {{ search.LocalizedName }} / {{ search.Country.LocalizedName }}
      </button>
    </div>
  </section>
</template>

<script>
import { debounce } from "../service/util.service";

export default {
  data() {
    return {
      isShow: false,
      value: null,
      inputFocus: false,
    };
  },
  methods: {
    async setLocation(selected) {
      this.value = "";
      const location = {
        name: selected.LocalizedName,
        key: selected.Key,
        search: true,
      };
      this.$store.dispatch({ type: "setLocation", location });
      window.$cookies.set("locKey", location.key);
      window.$cookies.set("locName", location.name);
      await this.$store.dispatch({ type: "setWeather" });
    },
  },
  computed: {
    location() {
      return this.$store.getters.getLocation;
    },
    results() {
      return this.isShow ? this.$store.getters.getResults : null;
    },
  },
  watch: {
    value(query) {
      if (query.length > 2) {
        debounce(
          async () => {
            await this.$store.dispatch({
              type: "setCities",
              value: query,
            });
            this.isShow = true;
            this.$emit("set", true);
          },
          "SEARCH_CITY",
          500
        );
      } else {
        this.isShow = false;
        this.$emit("set", false);
      }
    },
  },
};
</script>

<style></style>
