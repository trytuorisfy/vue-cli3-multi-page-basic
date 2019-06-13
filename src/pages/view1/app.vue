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
        <p>代理接口</p>
        <div>
          
        </div>
        <div v-show="errMsg">{{ errMsg }}</div>
    </div>
</template>

<script>
    export default {
      name: "view1",
      data() {
        return {
          roomDetail:[],
          errMsg:''
        }
      },
      mounted(){
        // this.getRoomDetail();
        this.getData();
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
        },
        getData(){
          this.$http.get('/api/auth/userinfo').then(
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