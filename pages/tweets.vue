<template>
  <!-- 猿圈，微博，交流 -->
  <el-row class="tweets">

    <el-col :span="4" class="left-sidebar">
      <div id="nav" class="aside-nav">
        <nuxt-link to="/music" class="item">
          <span style="padding-left: 8px;" v-text="$i18n.text.it"/>
        </nuxt-link>
        <nuxt-link to="/vlog" class="item">
          <span style="padding-left: 8px;" v-text="$i18n.text.interesting"/>
        </nuxt-link>
        <nuxt-link to="/about" class="item">
          <span style="padding-left: 8px;" v-text="$i18n.text.creativity"/>
        </nuxt-link>
        <nuxt-link to="/service" class="item">
          <span style="padding-left: 8px;" v-text="$i18n.text.workStack"/>
          <span class="superscript"/>
        </nuxt-link>
      </div>
    </el-col>

    <el-col :span="14" class="tweets-list">

      <div class="publish">
        <el-input
          :rows="4"
          v-model="textarea"
          clear="textarea-input"
          type="textarea"
          placeholder="猿圈一下~"
          resize="none"/>
        <el-row class="ext-btn">
          <el-col :span="12">
            <ul >
              <li><a style="color:#007fff" href="#">表情</a></li>
              <li><a style="color:#007fff" href="#">图片</a></li>
              <li><a style="color:#007fff" href="#">链接</a></li>
              <li><a style="color:#007fff" href="#">#话题</a></li>
            </ul>
          </el-col>
          <el-col :span="9" class="tips">
            <span >Ctrl or ⌘ + Enter</span>
          </el-col>
          <el-col :span="3">
            <div class="">
              <el-button type="primary" style="float:right">发布</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div v-for="(tweet, index) in tweets" :key="index" class="item-content">

        <el-row type="flex" class="account-group">
          <el-col :span="3" class="account-image">
            <img
              class="user-profile"
              src="https://user-gold-cdn.xitu.io/2019/3/27/169bf874107c170f?imageView2/1/w/64/h/64/q/85/interlace/1">
          </el-col>
          <el-col :span="7">
            <div class="">
              <div>昵称</div>
              <div style="color: #8a9aa9;"> 摸鱼打杂·1小时前 </div>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="" style="float: right;">
              <el-button size="mini" round>关注</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="content">
              🎉🎉🎉
              终于可以告别臃肿的 Expo 了，
              官方将 SDK 拆分成了多个包，
              可以只添加用到的依赖了。
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="content">
              <img
                style="width: 40%;"
                src="https://user-gold-cdn.xitu.io/2019/6/23/16b849c3a56cb4e2?imageView2/2/w/800/q/100">
            </div>
          </el-col>
        </el-row>
        <el-row class="action-box">
          <el-col :span="8">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-caozuo-dianzan"/>
            </svg>
            <a>0</a>
          </el-col>
          <el-col :span="8" class="action-box-center" >
            <nuxt-link to="/tweet/1" text="">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"/>
              </svg>
            </nuxt-link>
            0
          </el-col>
          <el-col :span="8">
            <svg class="icon" aria-hidden="true" style="padding-bottom: 8px;">
              <use xlink:href="#icon-fenxiang"/>
            </svg>
            分享
          </el-col>
        </el-row>
      </div>
    </el-col>

    <el-col :span="6">
      <div>
        <aside-view key="aside" />
      </div>
    </el-col>
  </el-row>

</template>

<script>
import AsideView from '~/components/layout/pc/aside/main'
export default {
  name: 'Tweets',
  head() {
    return {
      title: `${this.isEnLang ? '' : this.$i18n.nav.tweets + ' | '}event`
    }
  },
  components: {
    AsideView
  },
  data() {
    return {
      textarea: ''
    }
  },
  fetch({ store }) {
    return store.dispatch('events/fetchEvents')
  },
  computed: {
    tweets() {
      return this.$store.state.events.events.data
    },
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

  .tweets {

    .left-sidebar {
      width: 15%;
      border-right: 1px solid #d6d9dc;
      .aside-nav {
        width: 19em;
        display: inline-block;
        width: 11.5em;
        top: 5.5em;
        left: calc((100% - 75em) / 2);
        >.item {
          border: none;
          display: block;
          width: 100%;
          height: 3em;
          line-height: 3em;
          padding: 0 1em;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          border-radius: 1px;
          color: $secondary;
          font-family: webfont-normal, DINRegular;
          letter-spacing: 0.5px;
          margin-bottom: .5em;
          position: relative;
          &:hover {
            background-color: rgba(0, 154, 97, 0.08);
            ;
          }
      }
      }
    }

    .tweets-list {
      >.publish{
        margin-bottom:1em;
        background-color: #fff;
         padding: 1em 1em 1em 1em;
        >.ext-btn{
          ul{
            display: flex;
            padding-top: 9px;
            justify-content: space-evenly;
            list-style: none;
          }
          .tips{
            padding-top: 9px;
            >span{
              float: right;
              color: #c2c2c2;
            }
          }
        }
      }

      .item-content {
        margin-bottom:1em;
        background-color: #fff;
        >.account-group {
          padding: 1em 0 0;
          >.account-image{
            width: 10.5%;
            >.user-profile {
                width: 51px;
                height: 51px;
                border-radius: 50%;
                align-items: center;
                justify-content: center;
                overflow: hidden;
              }
          }
        }
        .content {
          font-size: 15px;
          margin: 0 2em 0 4em
        }
        >.action-box{
          text-align: center;
          border-top: 1px solid #ebebeb;
          >svg{
            padding-bottom: 8px;
          }
          .icon {
            height: 30px;
            width: 20px;
          }
          >.action-box-center{
            border-right: 2px solid #ebebeb;
            border-left: 2px solid #ebebeb;
          }
        }
        padding-left: 1em;
      }
    }
  }
</style>
