<template>
    <div>
        <h1>view2</h1>
        <a href="view1.html">view1</a>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <a href="index.html">index</a>
        <!-- 
        <p>elememt test</p>
        <div>
            <el-row>
              <el-button>默认按钮</el-button>
              <el-button type="primary">主要按钮</el-button>
              <el-button type="success">成功按钮</el-button>
              <el-button type="info">信息按钮</el-button>
              <el-button type="warning">警告按钮</el-button>
              <el-button type="danger">危险按钮</el-button>
            </el-row>            
        </div>
         -->
        <div class="red">
            yoyoy
            <div class="yellow">
                yel
            </div>
            <p>red length = <span id='count'></span></p>
        </div>
        <pages></pages>
    </div>
</template>

<script>
  import pages from '@/components/pages'
    export default {
      name: "view2",
      components: {
        pages
      },
      data() {
        return {
         
        }
      },
      mounted(){
        this.domInit();
      },
      methods: {
        domInit() {
          $('#count').html($('.red').length)
        },
        getDataFun(){
          console.log('翻页啦')
        }           
      }
    }
</script>

<style scoped lang="scss">
    .red{
        color:red;
        .yellow{
            color:yellow;
        }
    }
</style>