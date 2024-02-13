<template lang="pug">
component(:is="subviewComponent")
</template>

<script setup>
import { ref, computed } from 'vue'
import { getComponentName } from '@/assets/script/utils.js'
import Init from '@/views/subviews/Init.vue'
import Edit from '@/views/subviews/Edit.vue'
import Option from '@/views/subviews/Option.vue'
import Summary from '@/views/subviews/Summary.vue'

const subviewComponents = { Init, Edit, Option, Summary }
const nowSubview = ref("option")
const subviewComponent = computed(() => {
  let compName = getComponentName(nowSubview)
  return subviewComponents[compName]
})





</script>

<style lang="sass" scoped>

</style>