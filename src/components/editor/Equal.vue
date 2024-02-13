<template lang="pug">
#editor.equal
  h1 Ratio
  .edit(v-for="a in apportionments")
    .name {{ a.name }}
    label 金額
    span &nbsp; {{ a.calculation }} 元
</template>

<script setup>
import { inject, watch } from 'vue';

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

</style>