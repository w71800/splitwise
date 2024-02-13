<template lang="pug">
.apportionment
  .icon
    img(:src="apportionment.userImg_src")
  .name {{ apportionment.name }}
    .ratio_calculation(v-if="method == 'ratio'") ${{ apportionment.calculation }}
  .input
    slot(name="equal")
    slot(name="fixed")
    slot(name="percentage")
    slot(name="ratio")
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps(["data"])
const { data: apportionment } = props
const method = inject("method")

</script>

<style lang="sass" scoped>
.input
  position: absolute
  right: $container_padding
.ratio_calculation
  color: rgba(#999, .8)
  font-size: .6rem

</style>