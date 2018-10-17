<style lang="less">
@import "./common.less";
</style>
<template>
  <div>
    <Form :model="martialInfo" label-position="top">
        <FormItem label="类型">
            <Select v-model="martialInfo.type" ref="type" @on-change="changeHander">
              <Option value="1">图片</Option>
              <Option value="2">音频</Option>
              <Option value="3">视频</Option>
            </Select>
        </FormItem>
        <FormItem label="分组">
            <Select v-model="martialInfo.groupId" ref="group" :clearable="true">
                <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="文件">
            <Row>
              <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                    <template v-if="item.status === 'finished'">
                        <img v-if="martialInfo.type==='1'"  :src="item.url">
                        <audio v-if="martialInfo.type==='2'"  :src="item.url" controls="controls">
                            您的浏览器不支持音频功能，建议更新到新版本
                        </audio>
                        <video v-if="martialInfo.type==='3'" :src="item.url" controls="controls" width="100%" height="300px">
                            您的浏览器不支持视频功能，建议更新到新版本
                        </video>
                        <div class="demo-upload-list-cover">
                            <Icon v-if="martialInfo.type==='1'" type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
              </div>
              <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :format="getFormat()"
                  :accept="getAccept()"
                  :max-size="maxSize"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  action=""
                  :headers="uploadHeader"
                  type="drag"
                  name="material"
                  style="display: inline-block;width:300px;">
                  <div style="width: 300px;height:300px;line-height: 300px;">
                      <Icon type="ios-cloud-upload-outline" size="52"  color="#2d8cf0"/>
                  </div>
              </Upload>
              <Modal title="图片预览" v-model="visible">
                  <img :src="imgName" style="width: 100%">
              </Modal>
            </Row>
        </FormItem>
    </Form>
    <Button type="primary" @click.native="saveHandler">保存</Button>
  </div>
</template>
<script>
// todo
// 1，素材类型的接口
// 3，素材展示接口，按照类别，支持分页
// 5，素材的分组转移
import { createMaterial, readMaterialList } from "@/api/material";
import { readGroupList } from "@/api/group";
export default {
  name: "create_material",
  data() {
    return {
      martialInfo: {
        type: "1",
        groupId: "1"
      },
      uploadHeader: {
        "Content-Type": "multipart/form-data"
      },
      groupList: [],
      groupListTemp: [],
      maxSize: 4096,
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    getFormat() {
      var f = [["PNG", "JPEG", "SVG", "JPG"], ["MP3"], ["MP4"]];
      return f[(this.martialInfo.type - 1) | 0];
    },
    getAccept() {
      var a = [".PNG,.JPEG,.SVG,.JPG", ".MP3", ".MP4"];
      return a[(this.martialInfo.type - 1) | 0];
    },
    readGroupList() {
      readGroupList({}).then(resData => {
        if (resData.data.ret === 0) {
          this.groupListTemp = resData.data.rows;
          this.changeHander();
        }
      });
    },
    changeHander() {
      this.groupList = this.groupListTemp.filter(item => {
        return item.type === parseInt(this.martialInfo.type) + 2;
      });
      this.$refs.group.clearSingleSelect();
    },
    handleView(url) {
      this.imgName = url;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc:
          "文件" +
          file.name +
          "格式错误，请选择" +
          this.getAccept() +
          "类型的文件"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "大小不符",
        desc: "文件  " + file.name + " 太大了, 不得大于" + this.maxSize + "KB"
      });
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 9;
      const tempFile = {};
      var that = this;
      if (!check) {
        this.$Notice.warning({
          title: "一次最多最多上传9张"
        });
        return check;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = e => {
        tempFile.name = file.name;
        tempFile.url = reader.result;
        tempFile.status = "finished";
        that.uploadList.push(tempFile);
      };
      return false;
    },
    saveHandler() {
      createMaterial({
        file: this.uploadList,
        groupId: this.martialInfo.groupId,
        authorId: 1,
        type: this.martialInfo.type
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("创建成功");
          this.$router.push({
            name: "material_list_page"
          });
        } else {
          this.$Message.error(resData.data.msg);
        }
      });
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.readGroupList();
    readMaterialList({
      isSuper: 1
    });
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 300px;
  height: 300px;
  text-align: center;
  line-height: 300px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 50px;
  cursor: pointer;
  margin: 0 2px;
}
</style>