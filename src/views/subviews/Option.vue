<template lang="pug">
#option
  component(:is="editor" :data="apportionments")
</template>

<script setup>
import { 
  computed, 
  reactive, 
  ref, 
  watchEffect, 
  provide } from 'vue';
import Equal from "@/components/editor/Equal.vue"
import Ratio from "@/components/editor/Ratio.vue"
import Percentage from "@/components/editor/Percentage.vue"
import Fixed from "@/components/editor/Fixed.vue"

const editorComponents = {
  Equal,
  Ratio,
  Percentage,
  Fixed
}
const totalValue = ref(300)
provide("totalValue", totalValue)
const methodInput = ref("equal")
const editor = computed(()=>{
  let name = methodInput.value[0].toUpperCase() + methodInput.value.slice(1)
  return editorComponents[name]
})
const methods = {
  equal(){
    apportionments.forEach( (a, i) => {
      let dividedValue = 
        apportionments.length != 0 ?
        totalValue.value / apportionments.length :
        0

      apportionments[i] = { name: a.name, calculation: dividedValue }
    })
  },
  fixed(){
    apportionments.forEach( (a, i) => {
      apportionments[i] = { name: a.name, calculation: 0 }
    })
  },
  percentage(){
    apportionments.forEach( (a, i) => {
      apportionments[i] = { name: a.name, portion: 0, calculation: 0 }
    })
  },
  ratio(){
    apportionments.forEach( (a, i) => {
      apportionments[i] = { name: a.name, portion: 1, calculation: 0 }
    })
  }
}

const executeSelectedMethod = () => {
  methods[methodInput.value]()
}

const apportionments = reactive([
  {
    name: "IKA",
    portion: 1,
    calculation: 0
  },
  {
    name: "Sharon",
    portion: 1,
    calculation: 0
  },
  {
    name: "Nick",
    portion: 1,
    calculation: 0
  },
])

const addMember = () => {
  apportionments.push({
    name: Math.random(),
    portion: 1,
    calculation: 0
  })
}



</script>

<style lang="sass" scoped>
#editor
  // border: 1px solid green
</style>