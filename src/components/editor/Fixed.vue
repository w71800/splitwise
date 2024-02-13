<template lang="pug">
#editor.fixed
  Apportionment(v-for="a in apportionments" :data="a")
    template(v-slot:fixed)
      .wrapper
        input(placeholder="0.00")
  
  //- label 還剩下多少未分：
  //- span {{ restValue }} 元
</template>

<script setup>
import { inject, computed } from 'vue';
import Apportionment from '../Apportionment.vue';
const totalValue = inject("totalValue")
const props = defineProps(["data"])
const { data: apportionments } = props

const restValue = computed(()=>{
  let nowTotal = apportionments.reduce( (total, a) => total + a.calculation, 0 )
  return totalValue.value - nowTotal
})


</script>

<style lang="sass" scoped>
.wrapper
  &::before
    content: "$"
    position: absolute
    top: 50%
    left: -10px
    transform: translateY(-50%)
    font-size: .7rem
    color: rgba(#999, .8)
    display: block
    width: auto
    height: auto

</style>