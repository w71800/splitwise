<template lang="pug">
#test
  label 總共多少
  input(type="number" value=300 v-model.number="totalValue")
  br
  label 均分
  input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="equal" name="method" checked)
  br
  label 定額
  input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="fixed" name="method")
  br
  label 百分比
  input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="percentage" name="method")
  br
  label 比例
  input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="ratio" name="method")
  br
  component(:is="editor" :data="apportionments")
  button(@click="addMember") 新增

</template>

<script setup>
import { 
  computed, 
  reactive, 
  ref, 
  watchEffect, 
  provide } from 'vue';
import Equal from "@/components/Equal.vue"
import Ratio from "@/components/Ratio.vue"
import Percentage from "@/components/Percentage.vue"
import Fixed from "@/components/Fixed.vue"

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
  border: 1px solid green
</style>