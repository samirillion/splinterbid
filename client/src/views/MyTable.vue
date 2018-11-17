<template>
  <section class="section common-room">
      <img alt="splinterbid logo" class="main-logo" src="../assets/logo.png">
      <SingleCard />
      <br>
  </section>
</template>

<script>
// @ is an alias to /src
import SingleCard from '@/components/SingleCard'

export default {
  name: 'MyTable',
  components: {
    SingleCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>