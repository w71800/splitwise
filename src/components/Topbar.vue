<template lang="pug">
#topbar
  RouterLink(to="").left 取消
  .title 分擔選項設定
  RouterLink(to="").right 完成
 

</template>

<script setup>

</script>

<style lang="sass" scoped>
#topbar
  display: flex
  justify-content: space-between
  padding: 8px 6px
.title
  font-weight: 400


</style>