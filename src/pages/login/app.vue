<template>
  <div>
    <div class="s-wrap tac">
      <div class="mar-b-15"><input type="text" placeholder="用户名" v-model="username"></div>
      <div class="mar-b-15"><input type="password" placeholder="密码" v-model="password"></div>
      <div class="mar-b-15"><button type="button" class="btn btn-primary" @click="loginIn()">登陆</button></div>
    </div>
  </div>
</template>

<script>
  import navHeader from '@/components/header'
  export default {
    data() {
      return {
        username:'',
        password:''
      }
    },
    components: {
      navHeader
    },
    mounted(){

    },
    methods: {
      loginIn(){
        let url = '/login';
        let sendArry = {'username':this.username,'password':this.password}
        this.$http.post(url,sendArry).then(
          res => { 
            let token = res.data.token;
            //先清下原来的token
            if(localStorage["token"]){
              localStorage.removeItem('token');
            }
            //全局存储token
            localStorage["token"] = token;
            console.log(localStorage) 

            //未登录被弹出后登陆成功后进入先前的页面
            var backUrlString = this.getUrlParam("backurl");
            if (backUrlString) {
              window.location.href = '/' + backUrlString;
            } else {
              window.location.href = "./home.html";
            }         
          },
          err => {
            this.errMsg = err.data.err_msg;
          }
        );
      },
      getUrlParam(name) {
        var url = location.href;
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        if (name != "backurl") {
          var regexS = "[\\?&]" + name + "=([^&#]*)";
        } else {
          var regexS = "[\\?&]" + name + "=(.*)";
        }
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? "" : results[1];
      },
    },
    props: []      
  }
</script>

<style scoped lang="less">
  .s-wrap{
    width: 300px;
    margin:100px auto;
  }
</style>