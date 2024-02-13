<template lang="pug">
#option
  .description
    .main {{ description[0] }}
    .sub {{ description[1] }}
  .options
    .option(v-for="option in options")
      label(:for="option.name")
      input(name="option" type="radio" v-model="methodInput" :value="option.name" :id="option.name")
      img(:src="option.name == methodInput? option.checked_img_src : option.img_src", alt="")
  component(:is="editorComponent" :data="apportionments")
</template>

<script setup>
import { 
  computed, 
  reactive, 
  ref, 
  watchEffect, 
  provide } from 'vue';
import { getComponentName } from "@/assets/script/utils.js"
import Equal from "@/components/editor/Equal.vue"
import Ratio from "@/components/editor/Ratio.vue"
import Percentage from "@/components/editor/Percentage.vue"
import Fixed from "@/components/editor/Fixed.vue"

const editorComponents = { Equal, Fixed, Percentage, Ratio }
const options = [
  {
    name: "equal",
    img_src: "src/assets/img/equal.png",
    checked_img_src: "src/assets/img/equal_checked.png", 
    description: [
      "均等分擔",
      "請選擇需要負擔的成員"
    ]
  },
  {
    name: "fixed",
    img_src: "src/assets/img/fixed.png",
    checked_img_src: "src/assets/img/fixed_checked.png",
    description: [
      "精確分擔",
      "請輸入每個成員要分擔的金額"
    ]
  },
  {
    name: "percentage",
    img_src: "src/assets/img/percentage.png",
    checked_img_src: "src/assets/img/percentage_checked.png",
    description: [
      "百分比分擔",
      "請輸入各個成員須要分擔的百分比"
    ]
  },
  {
    name: "ratio",
    img_src: "src/assets/img/ratio.png",
    checked_img_src: "src/assets/img/ratio_checked.png",
    description: [
      "比例分擔",
      "請選擇各個成員須要分擔的比例"
    ]
  },

]


const totalValue = ref(300)
provide("totalValue", totalValue)
const methodInput = ref("ratio")
provide("method", methodInput)
const editorComponent = computed(()=>{
  let name = getComponentName(methodInput)
  return editorComponents[name]
})

const description = computed(()=>{
  let { description } = options.filter(o => o.name == methodInput.value)[0]

  return description
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
    userImg_src: "src/assets/img/user.jpg",
    portion: 1,
    calculation: 0,
    isPayer: true
  },
  {
    name: "Sharon",
    userImg_src: "src/assets/img/user.jpg",
    portion: 1,
    calculation: 0,
    isPayer: false
  },
  {
    name: "Nick",
    userImg_src: "src/assets/img/user.jpg",
    portion: 1,
    calculation: 0,
    isPayer: false
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
#option

.description
  padding: 30px 20px
  font-size: .8rem
  text-align: center
  .main 
    font-weight: 600
  .sub 
.options
  max-width: 320px
  display: flex
  // justify-content: space-between
  margin-bottom: 10px
  padding: 0px $container_padding

.option
  width: 55px
  height: 28px
  border: 1px solid rgba(#999, .3)
  margin-right: 10px
  label
    position: absolute
    width: 100%
    height: 100%
    z-index: 20
    cursor: pointer
  input[type="radio"]
    display: none
  img
    width: 100%
    height: 100%
    object-fit: cover
  
</style>