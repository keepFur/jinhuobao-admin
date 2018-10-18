<template>
  <div>
    <Form :model="goodsInfo" label-position="top">
        <FormItem label="类型">
            <Select v-model="goodsInfo.type" ref='group_select' @on-open-change="openChangerHandler">
              <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="名称">
            <Input v-model="goodsInfo.name" placeholder=""/>
        </FormItem>
        <FormItem label="售价/进价/数量">
          <InputNumber :max="1000" :min="0.1" v-model="goodsInfo.outPrice" :step="0.1" style="margin-right:32px;" placeholder="售价"></InputNumber>
          <InputNumber :max="1000" :min="0.1" v-model="goodsInfo.inPrice" :step="0.1" style="margin-right:32px;" placeholder="进价"></InputNumber>
          <InputNumber :max="1000" :min="1" v-model="goodsInfo.count" :step="5" placeholder="数量"></InputNumber>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="goodsInfo.desc" type="textarea" :autosize="{minRows: 5,maxRows: 5}"/>
        </FormItem>
        <FormItem label="图片">
          <Upload
              type="drag"
              action="http://jsonplaceholder.typicode.com/posts/">
              <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击或拖动上传</p>
              </div>
          </Upload>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="goodsInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
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
  name: 'create_goods_page',
  components: {
    Editor
  },
  data () {
    return {
      goodsInfo: {
        name: '',
        type: 1,
        desc: '',
        inPrice: '',
        outPrice: '',
        count: '',
        picture: 1,
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
      createBlog(this.goodsInfo).then(resData => {
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
