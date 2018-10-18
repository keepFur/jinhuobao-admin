<template>
  <div>
    <Card>
        <Form ref="searchForm" :model="searchForm"  inline>
            <FormItem prop="user">
                <i-input type="text" style="width:400px;" clearable v-model="searchForm.keyword" placeholder="输入关键字搜索">
                </i-input>
            </FormItem>
            <FormItem>
                <Button  @click="searchHandler('formInline')">搜索</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="createHandler">创建</Button>
            </FormItem>
      </Form>
      <Table :data="tableData" :columns="columns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="1" :page-size="20"  @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { readBlogList, deleteBlogById } from '@/api/blog'
import { mapMutations } from 'vuex'
export default {
  name: 'goods_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      columns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '类型',
          key: 'groupName'
        },
        {
          title: '售价/进价/数量',
          key: 'author'
        },
        {
          title: '描述',
          key: 'groupName'
        },
        {
          title: '图片',
          key: 'author'
        },
        {
          title: '备注',
          key: 'author'
        },
        {
          title: '日期',
          key: 'createdDate',
          sortable: true
        },
        {
          title: '状态',
          key: ''
        },
        {
          title: '数据状态',
          key: 'status',
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  color: params.row.status === 1 ? '#5cadff' : '#ed4014'
                }
              },
              params.row.status === 1 ? '启用' : '禁用'
            )
          }
        },
        {
          title: '操作',
          key: 'actions',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.salineHandler()
                    }
                  }
                },
                '上架'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.editHandler(params.row.id, params.row.title)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteHandler(
                        params.row.id,
                        params.row.status === 1 ? 0 : 1
                      )
                    }
                  }
                },
                params.row.status === 1 ? '禁用' : '启用'
              )
            ])
          }
        }
      ],
      tableData: [],
      total: 0
    }
  },
  watch: {
    $route (to, from) {
      if (
        to.name === 'list_blog_page' &&
        (from.name === 'edit_blog_page' || from.name === 'create_blog_page')
      ) {
        this.readBlogList()
      }
    }
  },
  created () {
    this.readBlogList()
  },
  methods: {
    ...mapMutations(['addTag']),
    changePage () {},
    readBlogList () {
      readBlogList({
        limit: 20,
        offset: 1,
        keyword: this.searchForm.keyword,
        isSuper: 1
      })
        .then(res => {
          if (res.data.ret === 0) {
            this.tableData = res.data.rows
            this.total = res.data.total
          } else {
            this.$Message.success(res.data.msg)
          }
        })
        .catch(err => {
          this.$Message.success(err.message)
        })
    },
    createHandler () {
      this.$router.push('create_goods_page')
    },
    searchHandler () {
      this.readBlogList()
    },
    salineHandler (id, title) {
      this.$Message.success('操作成功')
    },
    deleteHandler (id, status) {
      deleteBlogById(id, status).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.readBlogList()
        } else {
          this.$Message.success(resData.data.msg)
        }
      })
    },
    editHandler (id, title) {
      const route = {
        name: 'edit_goods_page',
        params: {
          id
        },
        meta: {
          title: `编辑商品-${title}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    }
  }
}
</script>

<style>
</style>
