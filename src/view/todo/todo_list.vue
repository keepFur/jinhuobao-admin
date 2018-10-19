<template>
  <div>
    <Card>
        <Form ref="searchForm" :model="searchForm"  inline>
            <FormItem prop="user">
                <i-input type="text" style="width:200px;" clearable v-model="searchForm.keyword" placeholder="输入关键字搜索，支持名称和内容">
                </i-input>
            </FormItem>
            <FormItem>
                <Select v-model="searchForm.type" style="width:200px;" clearable>
                    <Option value="1">紧急</Option>
                    <Option value="2">重要</Option>
                    <Option value="3">紧急重要</Option>
                    <Option value="4">紧急不重要</Option>
                    <Option value="5">重要不紧急</Option>
                </Select>
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
        <Form :model="todoInfo" :label-width="80">
            <FormItem label="分类">
                <Select v-model="todoInfo.type" clearable>
                    <Option value="1">紧急</Option>
                    <Option value="2">重要</Option>
                    <Option value="3">紧急重要</Option>
                    <Option value="4">紧急不重要</Option>
                    <Option value="5">重要不紧急</Option>
                </Select>
            </FormItem>
            <FormItem label="名称">
                <Input v-model="todoInfo.name" />
            </FormItem>
            <FormItem label="内容">
                <Input v-model="todoInfo.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="showUpdate"
        title="修改"
        @on-ok="updateHandler"
        @on-cancel="showUpdate=false">
        <Form :model="todoInfo" :label-width="80">
            <FormItem label="分类">
                 <Select v-model="todoInfo.type" clearable>
                    <Option value="1">紧急</Option>
                    <Option value="2">重要</Option>
                    <Option value="3">紧急重要</Option>
                    <Option value="4">紧急不重要</Option>
                    <Option value="5">重要不紧急</Option>
                </Select>
            </FormItem>
            <FormItem label="名称">
                <Input v-model="todoInfo.name" />
            </FormItem>
            <FormItem label="内容">
                <Input v-model="todoInfo.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
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
const types = ['', '紧急', '重要', '紧急重要', '紧急不重要', '重要不紧急']
export default {
  name: 'todo_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: '',
        type: ''
      },

      showCreate: false,
      showUpdate: false,
      todoInfo: {
        name: '',
        content: '',
        type: ''
      },
      columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '分类',
          key: 'type',
          render: (h, params) => {
            return h('span', types[params.row.type])
          }
        },
        {
          title: '日期',
          key: 'createDate',
          sortable: true
        },
        {
          title: '状态',
          key: 'dataStatus',
          render: (h, params) => {
            return h(
              'span',
              {
                style: {
                  color: params.row.dataStatus === 1 ? '#5cadff' : '#ed4014'
                }
              },
              params.row.dataStatus === 1 ? '已完成' : '未完成'
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
                          this.todoInfo = resData.data.todo[0]
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
                        params.row.dataStatus === 1 ? 0 : 1
                      )
                    }
                  }
                },
                params.row.dataStatus === 1 ? '未完成' : '已完成'
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
  },
  methods: {
    changePage () {},
    readTodoList () {
      readTodoList({
        limit: 20,
        offset: 1,
        keyword: this.searchForm.keyword,
        type: this.searchForm.type
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
      createTodo(this.todoInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.readTodoList()
          this.$Message.success('操作成功')
          this.todoInfo = {}
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
      updateTodoById(this.todoInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.todoInfo = {}
          this.showUpdate = false
          this.readTodoList()
        } else {
          this.$Message.success(resData.data.msg)
        }
      })
    }
  }
}
</script>

<style>
</style>
