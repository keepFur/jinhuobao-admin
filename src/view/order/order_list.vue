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
                <Button type="primary" @click="printHandler">打印</Button>
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
  name: 'order_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '订单号',
          key: 'num',
          fixed: 'left',
          width: 150
        },
        {
          title: '支付流水号',
          key: 'title',
          width: 150
        },
        {
          title: '商家',
          key: 'groupName',
          width: 150
        },
        {
          title: '送达时间',
          key: 'author',
          width: 150
        },
        {
          title: '数量',
          key: 'title',
          width: 150
        },

        {
          title: '总金额/优惠金额/实际支付金额/运费',
          key: 'groupName',
          width: 250
        },
        {
          title: '支付方式',
          key: '',
          width: 150
        },
        {
          title: '送达时间',
          key: 'author',
          width: 150
        },
        {
          title: '状态',
          width: 150,
          key: 'status'
        },
        {
          title: '日期',
          key: 'createdDate',
          width: 150,
          sortable: true
        },
        {
          title: '备注',
          key: '',
          width: 150
        },
        {
          title: '数据状态',
          key: 'status',
          width: 150,
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
          width: 250,
          align: 'center',
          fixed: 'right',
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
                      this.viewHandler(params.row.id, params.row.title)
                    }
                  }
                },
                '查看商品'
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
                      this.viewHandler(params.row.id, params.row.title)
                    }
                  }
                },
                '打印'
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
    searchHandler () {
      this.readBlogList()
    },
    printHandler () {
      this.$Message.success('操作成功')
    },
    viewHandler (id, title) {
      const route = {
        name: 'view_blog_page',
        params: {
          id
        },
        meta: {
          title: `浏览博客-${title}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
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
        name: 'edit_blog_page',
        params: {
          id
        },
        meta: {
          title: `编辑博客-${title}`
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
