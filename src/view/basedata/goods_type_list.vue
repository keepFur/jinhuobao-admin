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
        <Form :model="goodsTypeInfo" :label-width="80">
            <FormItem label="名称">
                <Input v-model="goodsTypeInfo.name" />
            </FormItem>
            <FormItem label="备注">
                <Input v-model="goodsTypeInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="showUpdate"
        title="修改"
        @on-ok="updateHandler"
        @on-cancel="showUpdate=false">
        <Form :model="goodsTypeInfo" :label-width="80">
            <FormItem label="名称">
                <Input v-model="goodsTypeInfo.name" />
            </FormItem>
            <FormItem label="备注">
                <Input v-model="goodsTypeInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
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
  name: 'goods_type_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      groupList: [],
      showCreate: false,
      showUpdate: false,
      goodsTypeInfo: {
        name: '',
        content: ''
      },
      columns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '备注',
          key: 'content'
        },
        {
          title: '日期',
          key: 'createdDate',
          sortable: true
        },
        {
          title: '状态',
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
          width: 250,
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
                          this.goodsTypeInfo = resData.data.todo[0]
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
      createTodo(this.goodsTypeInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.readTodoList()
          this.$Message.success('操作成功')
          this.goodsTypeInfo = {}
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
      updateTodoById(this.goodsTypeInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.goodsTypeInfo = {}
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
