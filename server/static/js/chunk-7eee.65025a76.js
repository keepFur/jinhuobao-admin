(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7eee"],{"0141":function(t,e,a){},"1c4a":function(t,e,a){"use strict";var i=a("0141"),r=a.n(i);r.a},"23ba":function(t,e,a){"use strict";a.d(e,"a",function(){return r}),a.d(e,"c",function(){return n}),a.d(e,"d",function(){return o}),a.d(e,"b",function(){return s});a("7f7f");var i=a("66df"),r=function(t){var e=t.name,a=t.type,r=t.userId;return i["a"].request({url:"/api/group/create_group",data:{name:e,type:a,userId:r},method:"post"})},n=function(t){var e=t.limit,a=void 0===e?20:e,r=t.offset,n=void 0===r?1:r,o=t.keyword,s=t.type;return i["a"].request({url:"/api/group/read_group_list",params:{limit:a,offset:n,isSuper:1,keyword:o,type:s},method:"get"})},o=function(t){var e=t.id,a=t.name,r=t.type;return i["a"].request({url:"/api/group/update_group_by_id",method:"post",data:{id:e,name:a,type:r}})},s=function(t,e){return i["a"].request({url:"/api/group/delete_group_by_id",method:"post",data:{id:t,status:e}})}},"49de":function(t,e,a){"use strict";a.d(e,"a",function(){return r}),a.d(e,"c",function(){return n}),a.d(e,"b",function(){return o});var i=a("66df"),r=function(t){var e=t.file,a=t.groupId,r=t.isSuper,n=void 0===r?1:r,o=t.type,s=t.authorId;return i["a"].request({url:"/api/material/create_material",data:{file:e,authorId:s,isSuper:n,groupId:a,type:o},method:"post"})},n=function(t){var e=t.limit,a=void 0===e?20:e,r=t.offset,n=void 0===r?1:r,o=t.isSuper,s=void 0===o?1:o,u=t.type;return i["a"].request({url:"/api/material/read_material_list",params:{limit:a,offset:n,isSuper:s,type:u},method:"get"})},o=function(t){return i["a"].request({url:"/api/material/delete_material_by_id",method:"post",data:{id:t}})}},"69c32":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Form",{attrs:{model:t.martialInfo,"label-position":"top"}},[a("FormItem",{attrs:{label:"类型"}},[a("Select",{ref:"type",on:{"on-change":t.changeHander},model:{value:t.martialInfo.type,callback:function(e){t.$set(t.martialInfo,"type",e)},expression:"martialInfo.type"}},[a("Option",{attrs:{value:"1"}},[t._v("图片")]),a("Option",{attrs:{value:"2"}},[t._v("音频")]),a("Option",{attrs:{value:"3"}},[t._v("视频")])],1)],1),a("FormItem",{attrs:{label:"分组"}},[a("Select",{ref:"group",attrs:{clearable:!0},model:{value:t.martialInfo.groupId,callback:function(e){t.$set(t.martialInfo,"groupId",e)},expression:"martialInfo.groupId"}},t._l(t.groupList,function(e,i){return a("Option",{key:i,attrs:{value:e.id}},[t._v(t._s(e.name))])}))],1),a("FormItem",{attrs:{label:"文件"}},[a("Row",[t._l(t.uploadList,function(e,i){return a("div",{key:i,staticClass:"demo-upload-list"},["finished"===e.status?["1"===t.martialInfo.type?a("img",{attrs:{src:e.url}}):t._e(),"2"===t.martialInfo.type?a("audio",{attrs:{src:e.url,controls:"controls"}},[t._v("\n                          您的浏览器不支持音频功能，建议更新到新版本\n                      ")]):t._e(),"3"===t.martialInfo.type?a("video",{attrs:{src:e.url,controls:"controls",width:"100%",height:"300px"}},[t._v("\n                          您的浏览器不支持视频功能，建议更新到新版本\n                      ")]):t._e(),a("div",{staticClass:"demo-upload-list-cover"},["1"===t.martialInfo.type?a("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(a){t.handleView(e.url)}}}):t._e(),a("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(a){t.handleRemove(e)}}})],1)]:t._e()],2)}),a("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"300px"},attrs:{"show-upload-list":!1,format:t.getFormat(),accept:t.getAccept(),"max-size":t.maxSize,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload,multiple:"",action:"",headers:t.uploadHeader,type:"drag",name:"material"}},[a("div",{staticStyle:{width:"300px",height:"300px","line-height":"300px"}},[a("Icon",{attrs:{type:"ios-cloud-upload-outline",size:"52",color:"#2d8cf0"}})],1)]),a("Modal",{attrs:{title:"图片预览"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.imgName}})])],2)],1)],1),a("Button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.saveHandler(e)}}},[t._v("保存")])],1)},r=[],n=(a("7f7f"),a("cadf"),a("551c"),a("097d"),a("49de")),o=a("23ba"),s={name:"create_material",data:function(){return{martialInfo:{type:"1",groupId:"1"},uploadHeader:{"Content-Type":"multipart/form-data"},groupList:[],groupListTemp:[],maxSize:4096,imgName:"",visible:!1,uploadList:[]}},methods:{getFormat:function(){var t=[["PNG","JPEG","SVG","JPG"],["MP3"],["MP4"]];return t[this.martialInfo.type-1|0]},getAccept:function(){var t=[".PNG,.JPEG,.SVG,.JPG",".MP3",".MP4"];return t[this.martialInfo.type-1|0]},readGroupList:function(){var t=this;Object(o["c"])({}).then(function(e){0===e.data.ret&&(t.groupListTemp=e.data.rows,t.changeHander())})},changeHander:function(){var t=this;this.groupList=this.groupListTemp.filter(function(e){return e.type===parseInt(t.martialInfo.type)+2}),this.$refs.group.clearSingleSelect()},handleView:function(t){this.imgName=t,this.visible=!0},handleRemove:function(t){var e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1)},handleFormatError:function(t){this.$Notice.warning({title:"格式错误",desc:"文件"+t.name+"格式错误，请选择"+this.getAccept()+"类型的文件"})},handleMaxSize:function(t){this.$Notice.warning({title:"大小不符",desc:"文件  "+t.name+" 太大了, 不得大于"+this.maxSize+"KB"})},handleBeforeUpload:function(t){var e=this.uploadList.length<9,a={},i=this;if(!e)return this.$Notice.warning({title:"一次最多最多上传9张"}),e;var r=new FileReader;return r.readAsDataURL(t),r.onloadend=function(e){a.name=t.name,a.url=r.result,a.status="finished",i.uploadList.push(a)},!1},saveHandler:function(){var t=this;Object(n["a"])({file:this.uploadList,groupId:this.martialInfo.groupId,authorId:1,type:this.martialInfo.type}).then(function(e){0===e.data.ret?(t.$Message.success("创建成功"),t.$router.push({name:"material_list_page"})):t.$Message.error(e.data.msg)})}},mounted:function(){this.uploadList=this.$refs.upload.fileList,this.readGroupList(),Object(n["c"])({isSuper:1})}},u=s,l=(a("1c4a"),a("a6f2"),a("2877")),d=Object(l["a"])(u,i,r,!1,null,null,null);d.options.__file="create_material.vue";e["default"]=d.exports},a6f2:function(t,e,a){"use strict";var i=a("b27b"),r=a.n(i);r.a},b27b:function(t,e,a){}}]);