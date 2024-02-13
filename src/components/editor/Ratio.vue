<template lang="pug">
#editor.ratio
  Apportionment(v-for="a in apportionments" :data="a")
    template(#ratio)
      .wrapper(:class="{ notZero: a.portion == ''}")
        input(type="number" placeholder="0" v-model.number="a.portion")
</template>

<script setup>
import { reactive, ref, watchEffect, inject } from 'vue';
import Apportionment from '../Apportionment.vue';
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
.wrapper
  right: $container_padding
  &::after
    content: "份"
    position: absolute
    top: 52%
    right: -14px
    transform: translateY(-50%)
    font-size: .7rem
    color: rgba(#999, .8)
    display: block
    width: auto
    height: auto

</style>