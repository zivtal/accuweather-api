<template>
  <section>
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </section>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>
