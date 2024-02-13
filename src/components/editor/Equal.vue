<template lang="pug">
#editor.equal
  Apportionment(v-for="a in apportionments" :data="a")
    template(v-slot:equal)
      .checker(:class="{ checked: a.isPayer }" @click="a.isPayer = !a.isPayer")
        .check(v-if="a.isPayer")
          img(src="@/assets/img/check.png")
</template>

<script setup>
import { inject, watch, ref, computed } from 'vue';
import Apportionment from '../Apportionment.vue';

const totalValue = inject("totalValue")
const props = defineProps(["data"])
const { data: apportionments } = props

watch(() => totalValue.value, (newValue, oldValue) => {
  apportionments.forEach( (a, i) => {
    let dividedValue = 
      apportionments.length != 0 ?
      totalValue.value / apportionments.length :
      0
    
    apportionments[i].calculation = Math.round(dividedValue * 10) / 10
  })
})

</script>

<style lang="sass" scoped>
.checker
  width: 20px
  height: 20px
  border-radius: 50%
  overflow: hidden
  border: 1px solid rgba(#999, .3)
  &.checked
    border: none
    
.check
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  background-color: $color_primary
  img
    width: 100%
    height: 100%
    transform: scale(.5)
</style>