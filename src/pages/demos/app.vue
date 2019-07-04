<template>
    <div>
      <nav-header></nav-header>
      <h3>axios获取数据</h3>
      <button type="button" class="btn btn-primary mar-r-15" @click="getMainData(1,true)">get方式拿数据</button>
      <button type="button" class="btn btn-outline-primary mar-r-15" @click="getPostMainData(1,true)">post方式拿数据</button>
      <h3>数据展示区</h3>
      <p>数据来自easy mock</p>
      <div style="min-height: 200px">
        <div v-for="item in mainData">{{ item.no }} : {{ item.name }}</div>
      </div>
      <div v-show="errMsg">{{ errMsg }}</div>
      <h3>分页</h3>
      <pages ref="pagesRef"></pages>
      <h3>按钮</h3>
      <div class="mar-l-15">
        <button type="button" class="btn btn-primary mar-r-15">主色</button>
        <button type="button" class="btn btn-outline-primary mar-r-15">主色带边框</button>
        <button type="button" class="btn btn-primary mar-r-15 btn-sm">主色</button>
        <a class="btn btn-primary mar-r-15">a链接主色</a>
        <a class="btn btn-outline-primary mar-r-15">a链接主色带边框</a>
        <button class="btn btn-primary disabled mar-r-15">a链接主色disabled</button>
        <button class="btn btn-outline-primary disabled mar-r-15">a链接主色带边框disabled</button> 
        <button type="button" class="btn btn-default mar-r-15">btn-default</button>         
        <div style="width: 200px">
          <button type="button" class="btn btn-outline-primary btn-sm btn-block">块状按钮</button>         
        </div>                       
      </div>
      <div class="alert-msg" id="alert-msg">uuuu</div>
      <h3>布局</h3>
      <div class="pad-30">
        <div class="row">
          <div class="col-4">col-4</div>
          <div class="col-4">col-4</div>          
          <div class="col-4">col-4</div>          
        </div>
      </div>
      <h3>边框</h3>
      <div class="border">边框</div>
      <h3>less全局变量</h3>
      <div>
        <span class="bgc-blue">背景蓝色生效</span>
      </div>
      <h3>图片背景</h3>
      <div class="bg-img"></div>
      <h3>es6</h3>
      <div>
        字符串拼接<br>
        {{ stringMsg }}
      </div>
      <h3>flex布局</h3>
      <div class="wrap big">
        <div class="flex-wrap">
          <div class="flex-item" v-for="item in 5">
            666
            <!-- <img src="./juju.png" alt=""> -->
          </div>
        </div>
      </div>
      <h3>axios cancel request</h3>
      <div>
        <a class="btn btn-primary mar-r-15" @click="getData()">获取用户信息</a>
        <a class="btn btn-default mar-r-15" @click="cancelGetData()">取消请求</a>
        <div class="min-h">
          {{ userData.name }}
        </div>
      </div>
      <main-footer></main-footer>
    </div>
</template>

<script>
  import navHeader from '@/components/header'
  import mainFooter from '@/components/footer'
  import pages from '@/components/pages'
    export default {
      name: "demos",
      components: {
        navHeader,
        mainFooter,
        pages,
      },
      data() {
        return {
         mainData:[],
         errMsg:'',
         loading:false,
         stringMsg:'',
         msg:'yoyoyo',
         userData:'',
         cancel: null //取消请求的函数
        }
      },
      mounted(){
        this.stringMsg = `我是string拼接了如下msg：${this.msg}`
      },
      methods: {
        domInit() {

        },
        getData(){

          let CancelToken = this.$http.CancelToken;
          let me = this;

          // setTimeout(() => {
          //   source.cancel('Operation canceled by the user.');
          // },200)

          this.$http.get('/user',{
            cancelToken: new CancelToken(function executor(c) {
              me.cancel = c
              console.log(c)
              // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
            })
          }).then(
            res => {
              console.log(res)
              this.userData = res.data;
            },
            err => {
              console.log("接受数据错误" + err);
            }
          ).catch(err => {
            console.log("服务器错误" + err);
            if (this.$http.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              // handle error
            }
          })        
        },
        cancelGetData () {
          this.cancel()
        },
        getSimpleMainData(){
          this.$http.get('/user').then(
            res => {
              console.log(res.data)
            },
            err => {
              console.log("接受数据错误" + err);
              console.log(err.data)
            }
          )
        },
        getMainData(nowPage,status){
          console.log('getMainData')
          this.errMsg = '';
          if(status){
            this.loading = true;
            this.mainData = [];
            nowPage = 1;
          }
          if(!nowPage){
            nowPage = 1;
          }
          let url = '/list';
          url += "?page=" + nowPage;
          this.$http.get(url).then(
            res => { 
              this.loading = false;
              let data = res.data;
              if(data.data.length){
                this.mainData = data.data;                 
              }else{
                this.mainData = [];
                this.errMsg = '无匹配数据';
              }
              this.$refs.pagesRef.getPageData(data.page,data.pages);
            }
          );
        },
        getPostMainData(nowPage,status){
          this.errMsg = '';
          if(status){
            this.loading = true;
            this.mainData = [];
            nowPage = 1;
          }
          if(!nowPage){
            nowPage = 1;
          }
          let url = '/send';
          let sendArry = {'page':nowPage}
          this.$http.post(url,sendArry).then(
            res => { 
              this.loading = false;
              let data = res.data;
              if(data.data.length){
                this.mainData = data.data;                 
              }else{
                this.mainData = [];
                this.errMsg = '无匹配数据';
              }
              this.$refs.pagesRef.getPageData(data.page,data.pages);
            }, 
            err => {
              this.errMsg = err.data.err_msg;
            }
          );
        },
        getDataFun(nowPage){
          this.getMainData(nowPage,false)
        },
        getUrlParam(name){
          var url = location.href;
          name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
          if (name!='backurl') {
          var regexS = "[\\?&]"+name+"=([^&#]*)";
          } else{
          var regexS = "[\\?&]"+name+"=(.*)";
          };
          var regex = new RegExp( regexS );
          var results = regex.exec( url );
          return results == null ? '' : results[1];       
        }         
      }
    }
</script>

<style scoped lang="less">
  .wrap{
    width: 1200px;
    margin:0 auto;
    // background-color: pink;
  }
  .alert-msg{
    display: none;
  }
  .bgc-pink{
    background-color: pink;
  }
  .bgc-blue{
    background-color: @blue;
  }
  .bg-img{
    width: 100px;
    height: 100px;
    background: url('../../assets/logo.png') no-repeat center;
    background-size: contain;
  }
  .flex-wrap{
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
    .flex-item{
      height: 200px;
      width: calc(~"100%/5 - 20px");
      margin-bottom: 20px;
      // background-color: orange;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .min-h{
    min-height: 200px;
  }
</style>