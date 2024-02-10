<template lang="pug">
#editor.fixed
  .edit(v-for="a in apportionments")
    .name {{ a.name }}
    label 金額
    input.calculation(type="number" v-model.number="a.calculation")
  label 還剩下多少未分：
  span {{ restValue }} 元
</template>

<script setup>
import { inject, computed } from 'vue';
const totalValue = inject("totalValue")
const props = defineProps(["data"])
const { data: apportionments } = props

const restValue = computed(()=>{
  let nowTotal = apportionments.reduce( (total, a) => total + a.calculation, 0 )
  return totalValue.value - nowTotal
})


</script>

<style lang="sass" scoped>

</style>