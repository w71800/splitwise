<template lang="pug">
#editor.ratio
  h1 Ratio
  .edit(v-for="a in apportionments")
    .name {{ a.name }}
    label 百分比
    input.portion(type="number" v-model.number="a.portion" min=0 max=100)
    span %
    br
    span 金額 &nbsp; {{ a.calculation }} 元
  div
    span 剩下 {{ restValue }} %
</template>

<script setup>
import { computed, inject } from 'vue';

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

</style>