<template>
  <div>
    <Card>
        <Form ref="searchForm" :model="searchForm"  inline>
            <FormItem prop="user">
                <i-input type="text" style="width:400px;" clearable v-model="searchForm.keyword" placeholder="输入关键字搜索，支持名称和内容">
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
        <Form :model="noticeInfo" :label-width="80">
            <FormItem label="名称">
                <Input v-model="noticeInfo.name" />
            </FormItem>
            <FormItem label="内容">
                <Input v-model="noticeInfo.content" />
            </FormItem>
            <FormItem label="范围">
                <Input v-model="noticeInfo.useRange" />
            </FormItem>
            <FormItem label="备注">
                <Input v-model="noticeInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="showUpdate"
        title="修改"
        @on-ok="updateHandler"
        @on-cancel="showUpdate=false">
        <Form :model="noticeInfo" :label-width="80">
            <FormItem label="名称">
                <Input v-model="noticeInfo.name" />
            </FormItem>
             <FormItem label="内容">
                <Input v-model="noticeInfo.content" />
            </FormItem>
             <FormItem label="范围">
                <Input v-model="noticeInfo.useRange" />
            </FormItem>
            <FormItem label="备注">
                <Input v-model="noticeInfo.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import {
  readNoticeList,
  readNoticeById,
  createNotice,
  updateNoticeById,
  deleteNoticeById
} from '@/api/notice'
export default {
  name: 'notice_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      showCreate: false,
      showUpdate: false,
      noticeInfo: {
        remark: '',
        name: '',
        content: '',
        useRange: ''
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
          title: '范围',
          key: 'useRange'
        },
        {
          title: '备注',
          key: 'remark'
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
              params.row.dataStatus === 1 ? '启用' : '禁用'
            )
          }
        },
        {
          title: '操作',
          key: 'actions',
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
                      readNoticeById(params.row.id).then(resData => {
                        if (resData.data.ret === 0) {
                          this.showUpdate = true
                          this.noticeInfo = resData.data.notice[0]
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
                params.row.dataStatus === 1 ? '禁用' : '启用'
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
    this.readNoticeList()
  },
  methods: {
    changePage () {},
    readNoticeList () {
      readNoticeList({
        limit: 20,
        offset: 1,
        keyword: this.searchForm.keyword
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
      createNotice(this.noticeInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.readNoticeList()
          this.$Message.success('操作成功')
          this.noticeInfo = {}
          this.showCreate = false
        } else {
          this.$Message.error(resData.data.msg)
        }
      })
    },
    searchHandler () {
      this.readNoticeList()
    },
    deleteHandler (id, dataStatus) {
      deleteNoticeById(id, dataStatus).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.readNoticeList()
        } else {
          this.$Message.success(resData.data.msg)
        }
      })
    },
    updateHandler () {
      updateNoticeById(this.noticeInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success('操作成功')
          this.noticeInfo = {}
          this.showUpdate = false
          this.readNoticeList()
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
