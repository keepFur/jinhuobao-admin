<template>
  <div>
    <Form :model="storeInfo" label-position="top">
        <FormItem label="类型">
            <Select v-model="storeInfo.type" ref='group_select' @on-open-change="openChangerHandler">
              <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="名称">
            <Input v-model="storeInfo.name" placeholder=""/>
        </FormItem>
        <FormItem label="电话">
            <Input v-model="storeInfo.phone" placeholder=""/>
        </FormItem>
        <FormItem label="老板">
            <Input v-model="storeInfo.boss" placeholder=""/>
        </FormItem>
        <FormItem label="地址">
            <Input v-model="storeInfo.address" placeholder=""/>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="storeInfo.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}"/>
        </FormItem>
    </Form>
    <Button type="primary" @click="saveHandler">保存</Button>
  </div>
</template>

<script>
import Editor from '_c/editor'
import { createBlog } from '@/api/blog'
import { readGroupList } from '@/api/group'
export default {
  name: 'create_store_page',
  components: {
    Editor
  },
  data () {
    return {
      storeInfo: {
        name: '',
        type: 1,
        address: '',
        phone: '',
        boss: '',
        authorId: 1,
        remark: ''
      },
      groupList: []
    }
  },
  mounted () {
    this.readGroupList()
  },
  methods: {
    saveHandler () {
      createBlog(this.storeInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.$router.push({
            name: 'blog_list_page'
          })
        } else {
          this.$Message.error(resData.data.msg)
        }
      })
    },
    openChangerHandler (isOpen) {
      if (
        isOpen &&
        this.$refs.group_select.$children[1].$el.style.zIndex !== 10002
      ) {
        this.$refs.group_select.$children[1].$el.style.zIndex = 10002
      }
    },
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
    }
  }
}
</script>
