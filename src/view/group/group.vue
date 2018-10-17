<template>
  <div>
    <Card>
      <Form ref="searchForm" :model="searchForm"  inline>
            <FormItem prop="user">
                <i-input type="text" style="width:400px;" @on-enter="searchHandler" clearable v-model="searchForm.keyword" placeholder="输入关键字搜索">
                </i-input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="showCreate=true">创建</Button>
            </FormItem>
      </Form>
      <Table :data="tableData" :columns="columns" stripe></Table>
    </Card>
    <Modal
        v-model="showCreate"
        title="创建"
        @on-ok="createHandler"
        @on-cancel="showCreate=false">
        <Form ref="createForm" :model="createForm">
            <FormItem>
                <i-input type="text" autofocus clearable v-model="createForm.name" placeholder="输入名称"/>
            </FormItem>
            <FormItem label="分组">
                <Select v-model="createForm.type">
                    <Option  value="1">博客</Option>
                    <Option  value="2">日程</Option>
                    <Option  value="3">图片</Option>
                    <Option  value="4">音频</Option>
                    <Option  value="5">视频</Option>
                </Select>
            </FormItem>
      </Form>
    </Modal>
    <Modal
        v-model="showUpdate"
        title="编辑"
        @on-ok="updateHandler"
        @on-cancel="showUpdate=false">
        <Form ref="updateForm" :model="updateForm">
            <FormItem>
                <i-input type="text" autofocus clearable v-model="updateForm.name"/>
            </FormItem>
            <FormItem label="分组">
                <Select v-model="updateForm.type">
                    <Option  value="1">博客</Option>
                    <Option  value="2">日程</Option>
                    <Option  value="3">图片</Option>
                    <Option  value="4">音频</Option>
                    <Option  value="5">视频</Option>
                </Select>
            </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  readGroupList,
  createGroup,
  deleteGroupById,
  updateGroupById
} from "@/api/group";
import { mapMutations } from "vuex";
export default {
  name: "group_list_page",
  components: {},
  data() {
    return {
      searchForm: {
        keyword: ""
      },
      type: ["博客", "日程", "图片", "音频", "视频"],
      createForm: {
        name: "",
        type: "1"
      },
      updateForm: {
        type: 1,
        name: ""
      },
      showCreate: false,
      showUpdate: false,
      columns: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "类别",
          key: "type",
          render: (h, params) => {
            return h("span", {}, this.type[params.row.type - 1]);
          }
        },
        {
          title: "日期",
          key: "createdDate",
          sortable: true
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: params.row.status === 1 ? "#5cadff" : "#ed4014"
                }
              },
              params.row.status === 1 ? "启用" : "禁用"
            );
          }
        },
        {
          title: "操作",
          key: "actions",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.showUpdate = true;
                      this.updateForm.name = params.row.name;
                      this.updateForm.id = params.row.id;
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteHandler(
                        params.row.id,
                        params.row.status === 1 ? 0 : 1
                      );
                    }
                  }
                },
                params.row.status === 1 ? "禁用" : "启用"
              )
            ]);
          }
        }
      ],
      tableData: [],
      tempData: []
    };
  },
  created() {
    this.readGroupList();
  },
  methods: {
    changePage() {},
    readGroupList() {
      readGroupList({
        limit: 20,
        offset: 1,
        keyword: this.searchForm.keyword,
        isSuper: 1
      })
        .then(res => {
          if (res.data.ret === 0) {
            this.tableData = res.data.rows;
            this.tempData = res.data.rows;
          } else {
            this.$Message.success(res.data.msg);
          }
        })
        .catch(err => {
          this.$Message.success(err.message);
        });
    },
    createHandler() {
      createGroup({
        name: this.createForm.name,
        type: this.createForm.type,
        userId: 1
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.readGroupList();
        } else {
          this.$Message.error(resData.data.msg);
        }
      });
    },
    searchHandler() {
      if (this.searchForm.keyword) {
        this.tableData = this.tempData.filter(item => {
          return item.name.match(this.searchForm.keyword);
        });
      } else {
        this.tableData = this.tempData;
      }
    },
    deleteHandler(id, status) {
      this.$Message.success("操作成功");
      var item = this.tableData.find(item => {
        return item.id === id;
      });
      item.status = status;
      deleteGroupById(id, status);
    },
    updateHandler() {
      var item = this.tableData.find(i => {
        return i.id === this.updateForm.id;
      });
      item.type = this.updateForm.type;
      item.name = this.updateForm.name;
      this.$Message.success("操作成功");
      updateGroupById({
        id: this.updateForm.id,
        type: this.updateForm.type,
        name: this.updateForm.name
      });
    }
  }
};
</script>