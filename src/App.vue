<template>
  <div id="app" v-cloak>
    <!-- 顶栏   -->
    <Mihead v-bind:pagename='nowpage' :class="{pgindex0:!hdyc,pgindex1:hdyc}"></Mihead>
    <!-- 内容区 -->
    <transition :name='ami'>
      <router-view class='Router'></router-view>
    </transition>
    <!-- 消息框 -->
    <msgbox></msgbox>
    <div class="clear"></div>
    <!-- 底栏 -->
    <Mifooter v-bind:mftwidth='scrW' :class="{pgindex2:ftyc,pgindex3:!ftyc}"></Mifooter> 
  </div>
</template>

<script>
import Router from 'vue-router'
import {mapGetters,mapActions} from 'vuex'
import Mifooter from './components/mifooter'
import Mihead from './components/mihead'
import msgbox from './components/msgbox'

export default {
  name: 'App',
  data(){
    return{
      ami:'slide1-right',
      scrW:'',
      pagen:'pageindex',
      tmparr:{
        index:99,
        category:88,
        cart:77,
        myhome:66
      },
      ftyc:false,//底栏隐藏
      ftycPage:['pagecart','pagesearch','detail','pageaddress','pageorder'],//底栏隐藏页数组
      hdyc:false,//顶栏隐藏
    }
  },
  computed:{
    ...mapGetters(['pageTLD','nowpage','remdmsg'])
  },
  watch:{
    pageTLD(){
      // console.log(this.pageTLD);
      //顶栏隐藏控制
      if(this.pageTLD == 'pageindex'){
         this.hdyc = false;
      }else{
         this.hdyc = true;
      }
      //底栏隐藏控制
      for(var i = 0,j=this.ftycPage.length;i<j;i++){
        if(this.ftycPage[i] == this.pageTLD){
          this.ftyc = true;
          return
        }
      }
      this.ftyc = false;      
    },
    '$route'(to,from){
      // console.log(to,from.path,this);
      var topath=to.path.split('/')[1];
      var frompath=from.path.split('/')[1];
      //console.log(topath,frompath);
      if(frompath == 'detail'){
        this.ami = 'slide1-left';
        return
      }
      if(to.path=='/'){
        topath = 'index';
      }
      if(from.path=='/'){
        frompath = 'index';
      }
      if(this.tmparr[topath]-this.tmparr[frompath]>0){
        this.ami = 'slide1-left';
      }else{
        this.ami = 'slide1-right';
      }
    }
  },
  methods:{
    ...mapActions(['updataPageName','getterdata'])
  },
  mounted:function(){
    this.scrW = window.screen.width; 
    if(this.scrW>720){
      this.scrW=720;
    }
    document.getElementById('app').style.fontSize =  this.scrW/7.2+'px';
    window.onresize = function(){
      this.scrW = window.screen.width;
      console.log(this.scrW) ;   
      if(this.scrW>720){
        this.scrW=720;
      }
      document.getElementById('app').style.fontSize =  this.scrW/7.2+'px';
    }
    var url = window.location.href.split('#')[1];
    if(url){
      this.$router.push({path:url});
      var name1 = url.split('/');
      console.log(name1,url);
      if(name1[1] == 'index'){
        this.updataPageName('page'+name1[1])
        this.getterdata(name1[2]);
      }    
    }
},
components:{Mifooter,Mihead,msgbox}
}
</script>

<style>
.Router{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 720px;
  transition: all 0.5s;
  top: 0;
}
.slide1-left-enter,
.slide1-right-leave-active {
    transform: translate3d(-100%, 0, 0);
}
.slide1-left-leave-active,
.slide1-right-enter {
    transform: translate3d(100%, 0, 0);
}
*{
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
    width: 0px;
}
ul,li{
  list-style: none;
}
a:link,a:visited{
  color:#444;
  text-decoration:none;
}
.clear{
  clear: both;
}
.tpline{
  height: 0.15em;
  background: rgb(245, 245, 245);
}
img{
  display: block;
  animation: opcity1 .3s;
}
input{
  outline: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  max-width: 720px;
  margin: 0 auto;
  position: absolute;
  overflow-x: hidden;
}
[v-cloak]{
  display: none !important;
}
@keyframes opcity1{
  from{opacity: 0;}
  to{opacity: 1;}
}
.pgindex0{
  transform: translate3d(0,0,0);
  transition: transform 0.3s;
}
.pgindex1{
  transform: translate3d(0,-84px,0);
  transition: transform 0.3s;
}
.pgindex2{
  transform: translate3d(0,52px,0);
  transition: transform 0.3s;
}
.pgindex3{
  transform: translate3d(0,0,0);
  transition: transform 0.3s;
}
</style>
