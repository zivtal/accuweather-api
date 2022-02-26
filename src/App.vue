<template>
  <section>
    <Header />
    <div class="container">
      <router-view />
      <notifications classes="message shadow" position="left bottom" />
    </div>
    <Footer />
  </section>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
