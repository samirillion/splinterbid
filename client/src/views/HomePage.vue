<template>
  <section class="section home">
    <div class="header-wrapper">
      <img alt="splinterbid logo" class="main-logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Splinter Bid"/>
      <v-btn color="primary" :to="{name: 'NewRoom'}">Play Now</v-btn>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-wrapper {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
}
</style>
