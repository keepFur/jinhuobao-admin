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
                <Button type="primary" @click="showCreate = true">创建</Button>
            </FormItem>
      </Form>
      <Table :data="tableData" :columns="columns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="1" :page-size="20"  @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
    <Modal
        v-model="showCreate"
        title="创建"
        @on-ok="createHandler"
        @on-cancel="showCreate=false">
        <Form :model="discountInfo" :label-width="80">
            <FormItem label="名称">
                <Input v-model="discountInfo.name" />
            </FormItem>
            <FormItem label="范围">
                <Input v-model="discountInfo.range" />
            </FormItem>
            <FormItem label="内容">
                <Input v-model="discountInfo.content" />
            </FormItem>
            <FormItem label="总金额">
                <Input v-model="discountInfo.totalPrice" />
            </FormItem>
            <FormItem label="优惠金额">
                <Input v-model="discountInfo.discountPrice" />
            </FormItem>
            <FormItem label="总数量">
                <Input v-model="discountInfo.totalCount" />
            </FormItem>
            <FormItem label="备注">
                <Input v-model="discountInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="showUpdate"
        title="修改"
        @on-ok="updateHandler"
        @on-cancel="showUpdate=false">
        <Form :model="discountInfo" :label-width="80">
             <FormItem label="名称">
                <Input v-model="discountInfo.name" />
            </FormItem>
            <FormItem label="范围">
                <Input v-model="discountInfo.range" />
            </FormItem>
            <FormItem label="内容">
                <Input v-model="discountInfo.content" />
            </FormItem>
            <FormItem label="总金额">
                <Input v-model="discountInfo.totalPrice" />
            </FormItem>
            <FormItem label="优惠金额">
                <Input v-model="discountInfo.discountPrice" />
            </FormItem>
            <FormItem label="总数量">
                <Input v-model="discountInfo.totalCount" />
            </FormItem>
            <FormItem label="备注">
                <Input v-model="discountInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import {
  readTodoList,
  readTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById
} from '@/api/todo'
import { readGroupList } from '@/api/group'
export default {
  name: 'discount_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      groupList: [],
      showCreate: false,
      showUpdate: false,
      discountInfo: {
        name: '',
        content: '',
        reamrk: '',
        totalPrice: '',
        discountPrice: '',
        totalCount: '',
        useCount: '',
        range: '',
        groupId: 1
      },
      columns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '总金额',
          key: 'content'
        },
        {
          title: '优惠金额',
          key: 'content'
        },
        {
          title: '使用范围',
          key: 'content'
        },
        {
          title: '总数量',
          key: 'content'
        },
        {
          title: '已使用数量',
          key: 'content'
        },
        {
          title: '状态',
          key: 'content'
        },
        {
          title: '创建日期',
          key: 'createdDate'
        },
        {
          title: '备注',
          key: 'createdDate'
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
                      readTodoById(params.row.id).then(resData => {
                        if (resData.data.ret === 0) {
                          this.showUpdate = true
                          this.discountInfo = resData.data.todo[0]
                        } else {
                          this.$Message.error(resData.data.msg)
                        }
                      })
                    }
                  }
                },
                '派发'
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
                      readTodoById(params.row.id).then(resData => {
                        if (resData.data.ret === 0) {
                          this.showUpdate = true
                          this.discountInfo = resData.data.todo[0]
                        } else {
                          this.$Message.error(resData.data.msg)
                        }
                      })
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
  created () {
    this.readTodoList()
    this.readGroupList()
  },
  methods: {
    changePage () {},
    readTodoList () {
      readTodoList({
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
      createTodo(this.discountInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.readTodoList()
          this.$Message.success('操作成功')
          this.discountInfo = {}
          this.showCreate = false
        } else {
          this.$Message.error(resData.data.msg)
        }
      })
    },
    searchHandler () {
      this.readTodoList()
    },
    deleteHandler (id, status) {
      deleteTodoById(id, status).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.readTodoList()
        } else {
          this.$Message.success(resData.data.msg)
        }
      })
    },
    updateHandler () {
      updateTodoById(this.discountInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.discountInfo = {}
          this.showUpdate = false
          this.readTodoList()
        } else {
          this.$Message.success(resData.data.msg)
        }
      })
    },
    readGroupList () {
      readGroupList({
        limit: 20,
        offset: 1,
        type: 2
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.groupList = resData.data.rows
        }
      })
    }
  }
}
</script>

<style>
</style>
