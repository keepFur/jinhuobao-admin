<template>
  <div>
    <Card>
        <h2 slot="title" style="text-align:center">{{blogInfo.title}}</h2>
        <span slot="extra">
           作者：{{blogInfo.author}} 分组： {{blogInfo.groupName}} 日期：{{blogInfo.createdDate}}
        </span>
        <div v-html="blogInfo.content">
        </div>
    </Card>
  </div>
</template>

<script>
import { readBlogById } from '@/api/blog'
export default {
  name: 'view_blog_page',
  data () {
    return {
      blogInfo: {
        title: '',
        author: '',
        createdDate: '',
        groupName: '',
        content: ``
      }
    }
  },
  mounted () {
    this.readBlogById()
  },
  watch: {
    $route (to, from) {
      if (to.name === 'view_blog_page') {
        this.readBlogById()
      }
    }
  },
  methods: {
    readBlogById () {
      readBlogById(this.$route.params.id).then(resData => {
        if (resData.data.ret === 0) {
          this.blogInfo = resData.data.blog[0]
        } else {
          this.$Message.success(resData.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
