<template>
<div>
  <div class="switchTheme">
    <a href="javascript:" @click="switchTheme()">
      <span v-if="!light">🌞</span>
      <span v-else>🌙</span>
    </a>
  </div>
  <router-view />
</div>
</template>

<script>
export default {
  data() {
    return {
      light: true
    }
  },
  methods: {
    switchTheme() {
      let body = document.querySelector("body")
      if (body.getAttribute("class") === "light-theme") {
        body.setAttribute("class", "dark-theme")
        this.light = false
      } else {
        body.setAttribute("class", "light-theme")
        this.light = true
      }
    }
  }
}
</script>
<style scoped>
  .switchTheme {
    text-align: right;
    font-size: 30px;
    padding-right: 20px;
    padding-top: 5px;
  }
  .switchTheme a:hover {
    text-decoration: none;
  }
</style>
