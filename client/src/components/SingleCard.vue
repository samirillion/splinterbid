<template>
    <div class="card-wrapper">
      <div class="playing-card">
        <div :class="'denomination card-' + cardMap.denomination[card.denomination].string">
          {{ cardMap.denomination[card.denomination].abbrev }} of 
        </div>
        <div :class="'suit suit-' + cardMap.suit[card.suit].full">
          {{ cardMap.suit[card.suit].full }}s
        </div>
      </div>
    </div>
</template>

<script>
import { denominationMap, suitMap } from '@/helpers/CardMap'
export default {
  name: 'SingleCard',
  data() {
    return {
      card: {
        denomination: '3',
        suit: '1',
      },
      cardMap: {
        denomination: denominationMap,
        suit: suitMap
      }
    }
  },
  props: {
    cardValue: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-wrapper {
  min-width: 50px;
  min-height: 75px;
  width: 8vw;
  height: 12vw;
  background: white;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px .5px 0px rgba(0,0,0,0.4);
  -moz-box-shadow: 1px 1px .5px 0px rgba(0,0,0,0.4);
  box-shadow: 1px 1px .5px 0px rgba(0,0,0,0.4);
}
</style>
