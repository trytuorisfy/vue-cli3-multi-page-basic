<template>
  <div>
    <ul class="pagination mar-t-15 mar-l-15">
      <li :class="{'disabled':nowPage == 1}"><a href="javascript:void(0)" @click="prePage()">上一页</a></li>
      <li v-for="item in pageData" :class="{'active':item == nowPage}"><a href="javascript:void(0)" @click="jumpToPage(item)">{{ item }}</a></li>
      <li :class="{'disabled':nowPage == pageTotal}"><a href="javascript:void(0)" @click="nextPage()">下一页</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowPage:1,
      pageTotal:1,
      pageData:[1],
    }
  },
  name: "pages",
  id: 'pagesRef',
  mounted(){

  },
  methods: {
    getPageData(nowPage,pageTotal){
      nowPage = parseInt(nowPage)
      pageTotal = parseInt(pageTotal)
      this.nowPage = nowPage;
      this.pageTotal = pageTotal;
      var pageData = [];         
      // 判断分页最大值
      if(pageTotal <= 10){
        var maxPage;
        maxPage = pageTotal;
        for (var i = 1; i <= maxPage; i++) {
          pageData.push(i);
        }               
      }else{
        if(pageTotal - 5 < nowPage ){
          for (var j = pageTotal-9; j <= pageTotal; j++) {
            pageData.push(j);
          }                       
        }else if(nowPage - 5 < 1){
          for (var l = 1; l <= 10; l++) {
            pageData.push(l);
          }                   
        }else{
          for (var k = nowPage-5; k < nowPage + 5; k++) {
            pageData.push(k);
          }
        }
      
      }
      this.pageData = pageData;
    },
    jumpToPage(page){
      console.log('jump page')
      if(page <= this.pageTotal){
        this.nowPage = page;
        this.getDataFun();
      }      
    },
    prePage(){        
      if(this.nowPage > 1){
        this.nowPage = this.nowPage - 1;
        this.getDataFun();
      }
    },
    nextPage(){     
      if(this.nowPage < this.pageTotal){
        this.nowPage = this.nowPage + 1;
        this.getDataFun();
      }
    },
    getDataFun(){
      this.$parent.getDataFun(this.nowPage);
    }  
  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .pagination {
      display: inline-block;
      padding-left: 0;
      margin: 20px 0;
      border-radius: 4px;
      li{
        display: inline;
          &:first-child>a{
              margin-left: 0;
          }
          &.active a{
            background-color: #f0f0f0;
            border-color: #ddd;            
          }
          a{
              position: relative;
              float: left;
              padding: 6px 12px;
              margin-left: -1px;
              line-height: 1.5;
              color: #337ab7;
              text-decoration: none;
              background-color: #fff;
              border: 1px solid #ddd;
          }        
      }
  }
</style>
