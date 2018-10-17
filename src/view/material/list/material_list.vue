<template>
  <div>
      <Tabs v-model="materialType">
        <TabPane label="图片" name="1">
        </TabPane>
        <TabPane label="音频" name="2">
        </TabPane>
        <TabPane label="视频" name="3">
        </TabPane>
      </Tabs>
      <Row>
        <Tabs>
          <TabPane label="全部" id="all"></TabPane>
          <TabPane :label="item.name" :id="item.id" v-for="(item,index) in groupList" :key="index"></TabPane>
        </Tabs>
      </Row>
      <Row :gutter="8" v-if="materialType==='1'">
        <i-col :span="24" v-if="!picture.length">
          <h3>无数据</h3>
        </i-col>
        <i-col :span="6" v-for="(item,index) in picture" :key="index">
          <Card>
            <p slot="title">{{item.name}}</p>
            <div>
              <img :src="item.path" width="100%" alt="">
            </div>
            <div class="card-action" slot="extra">
              <Button size="small" icon="md-swap" shape="circle" @click="showSwap = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="deleteHandler(item.id)"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
      <Row :gutter="8" v-if="materialType==='2'">
        <i-col :span="24" v-if="!mp3.length">
          <h3>无数据</h3>
        </i-col>
        <i-col :span="8" v-for="(item,index) in mp3" :key="index">
          <Card>
            <p slot="title">{{item.name}}</p>
            <div style="text-align:center;">
              <audio :src="item.path" controls="controls">
                您的浏览器不支持音频功能，建议更新到新版本。
              </audio>
            </div>
            <div class="card-action" slot="extra">
              <Button size="small" icon="md-swap" shape="circle" @click="showSwap = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="deleteHandler(item.id)"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
      <Row :gutter="8" v-if="materialType==='3'">
        <i-col :span="24" v-if="!video.length">
          <h3>无数据</h3>
        </i-col>
        <i-col :span="6" v-for="(item,index) in video" :key="index">
          <Card>
            <p slot="title">{{item.name}}</p>
            <div>
              <video :src="item.path" controls="controls" width="100%" height="200px">
                您的浏览器不支持 video 标签。
              </video>
            </div>
            <div class="card-action" slot="extra">
              <Button size="small" icon="md-swap" shape="circle"  @click="swapClientHandler(item.id)"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="deleteHandler(item.id)"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
    <Modal
        v-model="showSwap"
        title="修改"
        @on-ok="swapServerHandler"
        @on-cancel="showSwap=false">
        <Form :model="materialInfo" :label-width="80">
            <FormItem label="分组">
                <Select v-model="materialInfo.groupId">
                    <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import {
  readMaterialList,
  readMaterialById,
  updateMaterialById,
  deleteMaterialById
} from "@/api/material";
import { readGroupList } from "@/api/group";
export default {
  name: "material_list_page",
  components: {},
  data() {
    return {
      searchForm: {
        keyword: ""
      },
      materialInfo: {
        groupId: ""
      },
      materialId: "",
      materialType: "1",
      groupList: [],
      mp3: [],
      picture: [],
      video: [],
      showSwap: false,
      showSwap: false,
      showDelete: false
    };
  },
  mounted() {
    this.readMaterialList();
    this.readGroupList();
  },
  watch: {
    materialType() {
      this.readMaterialList();
      this.readGroupList();
    }
  },
  methods: {
    readMaterialList() {
      readMaterialList({
        type: this.materialType
      }).then(resData => {
        if (resData.data.ret === 0) {
          resData = resData.data.rows.map(item => {
            const dir = () => {
              return;
            };
            var realPath =
              item.type === 1 ? "image" : item.type === 2 ? "audio" : "video";
            item.path = require(`ser/materials/${realPath}/${item.path}`);
            return item;
          });
          switch (this.materialType) {
            case "1":
              this.picture = resData;
              break;
            case "2":
              this.mp3 = resData;
              break;
            case "3":
              this.video = resData;
              break;
            default:
              break;
          }
        }
      });
    },
    readGroupList() {
      readGroupList({
        type: parseInt(this.materialType) + 2
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.groupList = resData.data.rows;
        }
      });
    },
    createHandler() {
      createTodo(this.todoInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.readTodoList();
          this.$Message.success("操作成功");
          this.todoInfo = {};
          this.showSwap = false;
        } else {
          this.$Message.error(resData.data.msg);
        }
      });
    },
    searchHandler() {
      this.readMaterialList();
    },
    deleteHandler(id) {
      deleteMaterialById(id).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.readMaterialList();
        } else {
          this.$Message.success(resData.data.msg);
        }
      });
    },
    swapClientHandler(id) {
      this.showSwap = true;
      this.materialId = id;
    },
    swapServerHandler() {
      updateTodoById(this.materialId, {
        groupId: this.materialInfo.groupId
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.showSwap = false;
          this.readMaterialList();
        } else {
          this.$Message.success(resData.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-action {
  & button:first-child {
    margin-right: 8px;
  }
}
</style>
