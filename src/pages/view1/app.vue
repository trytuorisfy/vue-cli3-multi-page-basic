<template>
    <div>
        <h1>view1</h1>
        <a href="index.html">index</a>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <a href="view2.html">view2</a>
        <div v-for="item in roomDetail">{{ item.address }}</div>
    </div>
</template>

<script>
    export default {
      name: "view1",
      data() {
        return {
          roomDetail:[],
        }
      },
      mounted(){
        this.getRoomDetail();
      },
      methods: {
        getRoomDetail() {
          this.$http.get('https://easy-mock.com/mock/5b7a296e2a67c635a14e910f/example/mock').then(
            res => {
              console.log(res)
            },
            err => {
              console.log("接受数据错误" + err);
            }
          ).catch(err => {
            console.log("服务器错误" + err);
          })
        }            
      }
    }
</script>

<style scoped>

</style>