<template>
    <div>
      <nav-header></nav-header>
      <p>axios获取数据</p>
      <p>
        <button type="button" class="btn btn-primary mar-r-15" @click="getMainData(true)">拿数据</button>
      </p>
      <p>数据展示区</p>
      <div style="min-height: 200px">
        <p v-for="item in mainData">{{ item.name }}</p>
      </div>
      <p>分页</p>
      <pages ref="pagesRef"></pages>
      <p>按钮</p>
      <div class="mar-l-15">
        <button type="button" class="btn btn-primary mar-r-15">主色</button>
        <button type="button" class="btn btn-outline-primary mar-r-15">主色带边框</button>
        <button type="button" class="btn btn-primary mar-r-15 btn-sm">主色</button>
        <a class="btn btn-primary mar-r-15">a链接主色</a>
        <a class="btn btn-outline-primary mar-r-15">a链接主色带边框</a>        
        <div style="width: 200px">
          <button type="button" class="btn btn-outline-primary btn-sm btn-block">块状按钮</button>         
        </div>                       
      </div>
      <div class="alert-msg" id="alert-msg">uuuu</div>
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
          var url = '/api/estimate_history/list';

          let state = '',
              result = '',
              platform = '',
              time_type = 'infinite',
              categories = [],
              basic_specs_ids = [],
              keyword = ''     

          let sendArry = {'state':state,'result':result,'platform':platform,'time_type':time_type,'categories':categories,'basic_specs_ids':basic_specs_ids,'page':nowPage,'keyword':keyword,'pagesize':5}
          this.$http.post(url,sendArry).then(
            res => { 
              this.loading = false;
              let data = res.data;
              if(data.rows.length){
                this.mainData = data.rows;                 
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
</style>