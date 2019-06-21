<template>
    <div>
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
</template>

<script>
  import pages from '@/components/pages'
    export default {
      components: {
        pages
      },
      data() {
        return {
         
        }
      },
      mounted(){
        
      },
      methods: {

      }
    }
</script>

<style scoped lang="scss">

</style>