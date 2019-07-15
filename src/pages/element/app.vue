<template>
  <div class="outer">
    <div class="fix-header">头部</div>
    <div class="fix-aside">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title" class="min-hide">导航二</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title" class="min-hide">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title" class="min-hide">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title" class="min-hide">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <h1>element ui</h1>
      <a href="index.html">index</a>
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
    </div>

  </div>
</template>

<script>
  import pages from '@/components/pages'
    export default {
      components: {
        pages
      },
      data() {
        return {
         isCollapse: true
        }
      },
      mounted(){

      },
      methods: {

      }
    }
</script>

<style scoped lang="less">
  .outer{
    padding-left: 160px;
    padding-top: 60px;
  }
  .fix-header{
    position: fixed;
    left:0;
    height:60px;
    right:0;
    top:0;
    background-color: black;   
  }

  .fix-aside{
    position: fixed;
    left:0;
    width: 160px;
    bottom:0;
    top:0;
    background-color: pink;
    overflow: hidden;
  }
  @media screen and (max-width:1400px) {
    .min-hide{
      display: none;
    }
    .outer{
      padding-left: 68px;
    }
    .fix-aside{
      width: 68px;
    }
  }

</style>