<template>
  <div>
    <Card>
        <Form ref="searchForm" :model="searchForm"  inline>
            <FormItem>
                <i-input type="text" style="width:200px;" clearable v-model="searchForm.keyword" placeholder="输入关键字搜索,支持订单号">
                </i-input>
            </FormItem>
            <FormItem>
               <Select v-model="searchForm.star" style="width:200px;" placeholder="选择是否关注" clearable>
                    <Option value="1">关注</Option>
                    <Option value="0">未关注</Option>
                </Select>
            </FormItem>
            <FormItem>
               <Select v-model="searchForm.paymethod" style="width:200px;" placeholder="选择付款方式" clearable>
                    <Option value="1">线上</Option>
                    <Option value="2">线下</Option>
                </Select>
            </FormItem>
            <FormItem>
               <Select v-model="searchForm.status" style="width:200px;" placeholder="选择订单状态" clearable>
                    <Option value="1">待支付</Option>
                    <Option value="2">待配送</Option>
                    <Option value="3">配送中</Option>
                    <Option value="4">已完成</Option>
                    <Option value="5">已取消</Option>
                </Select>
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
import { readOrderList, deleteOrderById } from '@/api/order'
import { mapMutations } from 'vuex'
const orderStatus = ['待支付', '待配送', '配送中', '已完成', '已取消']
export default {
  name: 'order_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: '',
        star: '',
        status: '',
        paymethod: ''
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
          key: 'paySerialNum',
          width: 150
        },
        {
          title: '商家',
          key: 'store',
          width: 150
        },
        {
          title: '送达时间',
          key: 'arrivedDate',
          width: 150
        },
        {
          title: '数量',
          key: 'count',
          width: 150
        },

        {
          title: '总金额/优惠金额/实际支付金额/运费',
          key: 'groupName',
          width: 250,
          render: (h, params) => {
            let row = params.row
            return h(
              'span',
              `${row.totalPrice}/${row.discountPrice}/${row.actualPrice}/${
                row.runPrice
              }`
            )
          }
        },
        {
          title: '支付方式',
          key: 'paymethod',
          width: 150,
          render: (h, params) => {
            return h('span', params.row.paymethod === 1 ? '线上' : '线下')
          }
        },
        {
          title: '状态',
          width: 150,
          key: 'status',
          render: (h, parmas) => {
            return h('span', orderStatus[params.row.status - 1])
          }
        },
        {
          title: '日期',
          key: 'createdDate',
          width: 150,
          sortable: true
        },
        {
          title: '备注',
          key: 'remark',
          width: 150
        },
        {
          title: '数据状态',
          key: 'dataStatus',
          width: 150,
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  color: params.row.dataStatus === 1 ? '#5cadff' : '#ed4014'
                }
              },
              params.row.dataStatus === 1 ? '启用' : '禁用'
            )
          }
        },
        {
          title: '关注',
          key: 'star',
          width: 80,
          render: (h, params) => {
            return h('Icon', {
              props: {
                size: 24,
                color: params.row.star === 1 ? '#ff9900' : '',
                type: params.row.star === 1 ? 'ios-star' : 'ios-star-outline'
              }
            })
          }
        },
        {
          title: '操作',
          key: 'actions',
          width: 300,
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
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.deleteHandler(
                        params.row.id,
                        params.row.dataStatus === 1 ? 0 : 1
                      )
                    }
                  }
                },
                params.row.dataStatus === 1 ? '禁用' : '启用'
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
                        params.row.star === 1 ? 0 : 1
                      )
                    }
                  }
                },
                params.row.star === 1 ? '取关' : '关注'
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
        to.name === 'list_order_page' &&
        (from.name === 'edit_order_page' || from.name === 'create_order_page')
      ) {
        this.readOrderList()
      }
    }
  },
  created () {
    this.readOrderList()
  },
  methods: {
    ...mapMutations(['addTag']),
    changePage () {},
    readOrderList () {
      readOrderList({
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
      this.readOrderList()
    },
    printHandler () {
      this.$Message.success('操作成功')
    },
    viewHandler (id, title) {
      const route = {
        name: 'view_order_page',
        params: {
          id
        },
        meta: {
          title: `浏览订单-${title}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    deleteHandler (id, status) {
      deleteOrderById(id, status).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.readOrderList()
        } else {
          this.$Message.success(resData.data.msg)
        }
      })
    },
    editHandler (id, title) {
      const route = {
        name: 'edit_order_page',
        params: {
          id
        },
        meta: {
          title: `编辑订单-${title}`
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
