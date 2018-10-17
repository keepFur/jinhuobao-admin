<template>
  <div>
    <Form :model="blogInfo" label-position="top">
        <FormItem label="分组">
            <Select v-model="blogInfo.groupId">
              <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="标题">
            <Input v-model="blogInfo.title"/>
        </FormItem>
        <FormItem label="内容">
            <editor ref="editor" :cache="false" v-model="blogInfo.content"/>
        </FormItem>
    </Form>
    <Button type="primary" @click="saveHandler">保存</Button>
  </div>
</template>

<script>
import Editor from '_c/editor'
import { readBlogById, updateBlogById } from '@/api/blog'
import { readGroupList } from '@/api/group'
export default {
  name: 'edit_blog_page',
  components: {
    Editor
  },
  data () {
    return {
      blogInfo: {
        title: '',
        groupId: 1,
        content: ''
      },
      groupList: []
    }
  },
  created () {
    readBlogById(this.$route.params.id).then(resData => {
      if (resData.data.ret === 0) {
        this.blogInfo = resData.data.blog[0]
        this.$refs.editor.setHtml(this.blogInfo.content)
      } else {
        this.$Message.success(resData.data.msg)
      }
    })
    this.readGroupList()
  },
  methods: {
    readGroupList () {
      readGroupList({
        limit: 20,
        offset: 1,
        type: 1
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.groupList = resData.data.rows
        }
      })
    },
    saveHandler () {
      updateBlogById(this.$route.params.id, this.blogInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.$router.push({
            name: 'blog_list_page'
          })
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
