<template>
  <div>
    <nav-header></nav-header>
    <div class="easy">yoyoyoyo</div>
    <div class="wrap">hello everyone</div>
  </div>
</template>

<script>
  import navHeader from '@/components/header'
  export default {
    data() {
      return {

      }
    },
    components: {
      navHeader
    },
    mounted(){

    },
    methods: {
      
    },
    props: []      
  }
</script>

<style scoped lang="stylus">
  .easy
    color red
    background-color pink
    border-radius 4px
    border-color #999
    width 500px
</style>