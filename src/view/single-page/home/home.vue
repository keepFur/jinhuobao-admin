<template>
  <div>
    <Row :gutter="16">
        <i-col span="12">
            <Card style="margin-bottom:16px">
              <p slot="title">
                  <Icon type="ios-paper-outline" />
                  今日头条
              </p>
              <a href="#" slot="extra">
                  <Icon type="ios-loop-strong"></Icon>
                  更多
              </a>
              <ul>
                  <li v-for="(n,index) in news" :key="index">
                    <a :href="n.url" target="_blank"><h4>{{n.title}} <Tag :color="NEWS_TYPE[n.category].color">{{NEWS_TYPE[n.category].text}}</Tag></h4></a> 
                    <br>
                    <span>{{n.author_name}}</span>#<span>{{n.date}}</span>
                  </li>
              </ul>
            </Card>
        </i-col>
        <i-col span="12">
          <Card style="margin-bottom:16px">
              <p slot="title">
                <Icon type="ios-time-outline" />
                  历史上的今天
              </p>
              <a href="#" slot="extra">
                  <Icon type="ios-loop-strong"></Icon>
                  更多
              </a>
              <ul>
                  <li>
                    qweqe
                  </li>
              </ul>
            </Card>
        </i-col>
        <i-col span="12">
            <Card style="margin-bottom:16px">
              <p slot="title">
                  <Icon type="ios-happy-outline" />
                  开心一刻
              </p>
              <a href="#" slot="extra">
                  <Icon type="ios-loop-strong"></Icon>
                  更多
              </a>
              <ul>
                  <li>
                    qweqe
                  </li>
              </ul>
            </Card>
        </i-col>
        <i-col span="12">
          <Card style="margin-bottom:16px">
              <p slot="title">
                  <Icon type="ios-chatbubbles-outline" />
                  微信精选
              </p>
              <a href="#" slot="extra">
                  <Icon type="ios-loop-strong"></Icon>
                  更多
              </a>
              <ul>
                  <li>
                    qweqe
                  </li>
              </ul>
            </Card>
        </i-col>
    </Row>
  </div>
</template>

<script>
import { readNewsList } from "@/api/home.js";
export default {
  name: "home",
  data: function() {
    return {
      NEWS_APP_KEY: "0966e25ae00d46d3e15a4a303d3f0031",
      NEWS_API_URL: "http://v.juhe.cn/toutiao/index",
      NEWS_TYPE: {
        top: {
          text: "头条",
          color: "default"
        }, // 默认
        yule: {
          text: "娱乐",
          color: "error"
        },
        shehui: {
          text: "社会",
          color: "success"
        },
        guonei: {
          text: "国内",
          color: "magenta"
        },
        guoji: {
          text: "国际",
          color: "geekblue"
        },
        tiyu: {
          text: "体育",
          color: "volcano"
        },
        junshi: {
          text: "军事",
          color: "gold"
        },
        keji: {
          text: "科技",
          color: "purple"
        },
        caijing: {
          text: "财经",
          color: "primary"
        },
        shishang: {
          text: "时尚",
          color: "lime"
        }
      },
      newsType: "",
      news: [
        {
          uniquekey: "6c4caa0c3ba6e05e2a272892af43c00e",
          title: "杨幂的发际线再也回不去了么？网友吐槽像半秃",
          date: "2017-01-05 11:03",
          category: "yule",
          author_name: "腾讯娱乐",
          url:
            "http://mini.eastday.com/mobile/170105110355287.html?qid=juheshuju",
          thumbnail_pic_s:
            "http://03.imgmini.eastday.com/mobile/20170105/20170105110355_806f4ed3fe71d04fa452783d6736a02b_1_mwpm_03200403.jpeg",
          thumbnail_pic_s02:
            "http://03.imgmini.eastday.com/mobile/20170105/20170105110355_806f4ed3fe71d04fa452783d6736a02b_2_mwpm_03200403.jpeg",
          thumbnail_pic_s03:
            "http://03.imgmini.eastday.com/mobile/20170105/20170105110355_806f4ed3fe71d04fa452783d6736a02b_3_mwpm_03200403.jpeg"
        }
      ]
    };
  },
  mounted: function() {
    this.readNewsList();
  },
  methods: {
    readNewsList() {
      readNewsList(this.newsType).then(res => {
        if (res.data) {
          
        }
      });
    }
  }
};
</script>

<style lang="less">
li {
  list-style: none;
}
</style>
