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
        <div class="row">
          <div class="col-auto">col-auto</div>
        </div>
      </div>
      <h3>边框</h3>
      <div class="border">边框</div>
      <h3>bass.less中的变量是否可以使用</h3>
      <div>
        <span class="bgc-blue">背景蓝色生效否</span>
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
         loading:false
        }
      },
      mounted(){

      },
      methods: {
        domInit() {

        },
        getSimpleMainData(){
          this.$http.get('/api/auth/userinfo').then(
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
          this.errMsg = '';
          if(status){
            this.loading = true;
            this.mainData = [];
            nowPage = 1;
          }
          if(!nowPage){
            nowPage = 1;
          }
          let url = 'https://easy-mock.com/mock/5b7a296e2a67c635a14e910f/example/list';
          url += "?page=" + nowPage;
          console.log(url)
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
            }, 
            err => {
              this.errMsg = err.data.err_msg;
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
          let url = 'https://easy-mock.com/mock/5b7a296e2a67c635a14e910f/example/send';
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
  .alert-msg{
    display: none;
  }
  .bgc-pink{
    background-color: pink;
  }
  .bgc-blue{
    background-color: @blue;
  }
</style>