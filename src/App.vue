<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// todos
// 1，清空旧数据
// 2，解决下拉框层级问题
// 3，清空项目中多余的文件
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
