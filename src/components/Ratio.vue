<template lang="pug">
#editor.ratio
  h1 Ratio
  .edit(v-for="a in apportionments")
    .name {{ a.name }}
    span 金額 &nbsp; {{ a.calculation }} 元
    br
    label 比例
    input.portion(type="number" v-model.number="a.portion")
</template>

<script setup>
import { reactive, ref, watchEffect, inject } from 'vue';
const props = defineProps(["data"])
const { data: apportionments } = props

const totalValue = inject("totalValue")

watchEffect(()=>{
  let portionTotal = apportionments.reduce( (total, a) => total + a.portion , 0)
  
  // 還要去擋 portion 是負值的狀況
  apportionments.forEach( a => {
    let ratio = a.portion / portionTotal
    a.calculation = Math.round(totalValue.value * ratio)
  })
  
})

</script>

<style lang="sass" scoped>

</style>