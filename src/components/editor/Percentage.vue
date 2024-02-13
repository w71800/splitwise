<template lang="pug">
#editor.percentage
  Apportionment(v-for="a in apportionments" :data="a")
    template(#percentage)
      .wrapper(:class="{ notZero: a.portion == ''}")
        input(type="number" placeholder="0" v-model.number="a.portion")
  //- span 剩下 {{ restValue }} %
</template>

<script setup>
import { computed, inject } from 'vue';
import Apportionment from '../Apportionment.vue';

const totalValue = inject("totalValue")
const props = defineProps(["data"])
const { data: apportionments } = props

const restValue = computed(() => {
  let nowTotal = apportionments.reduce( (total, a) => total + a.portion, 0 )
  
  // side effect
  apportionments.forEach( (a, i) => {
    let calculation = totalValue.value * ( a.portion / 100 )
    apportionments[i].calculation = Math.round(calculation * 10) / 10
  })
  return 100 - parseInt(nowTotal)
})

</script>

<style lang="sass" scoped>
.wrapper
  right: $container_padding
  &::after
    content: "%"
    position: absolute
    top: 50%
    right: -12px
    transform: translateY(-50%)
    font-size: .7rem
    color: rgba(#999, .8)
    display: block
    width: auto
    height: auto

</style>