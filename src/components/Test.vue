<template lang="pug">
label 總共多少
input(type="number" value=300 v-model="totalValue")

label 預設
input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="normal" name="method" checked)
label 定額
input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="fixed" name="method")
label 百分比
input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="percentage" name="method")
label 比例
input(type="radio" v-model="methodInput" @change="executeSelectedMethod" value="ratio" name="method")

.edit(v-for="apportionment in apportionments")
  .name {{ apportionment.name }}
  label 比例
  input.portion(type="number" v-model.number="apportionment.portion")
  label 金額
  input.calculation(type="number" v-model.number="apportionment.calculation")

//- p {{ nowText }}
</template>

<script setup>
import { computed, reactive, ref, toRef, toRefs, watchEffect } from 'vue';
const totalValue = ref(300)
const nowText = ref("normal")
const methodInput = ref("normal")
const methods = {
  normal(){
    nowText.value = "normal"
  },
  fixed(){
    nowText.value = "fixed"
    return 1
  },
  percentage(){
    nowText.value = "percentage"
  },
  ratio(){
    nowText.value = "ratio"
  }
}

const executeSelectedMethod = () => {
  methods[methodInput.value]()
}

const members = reactive([
  {
    name: "IKA"
  },
  {
    name: "Sharon"
  }
])
const apportionments = reactive([...members].map( member => {
  return {
    ...member,
    portion: 1,
    calculation: 0
  }
}))

watchEffect(()=>{
  let portionTotal = apportionments.map( a => a.portion ).reduce( (total, p) => total + p , 0)

  apportionments.forEach( a => {
    let ratio = a.portion / portionTotal
    a.calculation = totalValue.value * ratio
  })
  
})

</script>

<style lang="sass" scoped>

</style>