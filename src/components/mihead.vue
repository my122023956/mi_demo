<!-- 顶栏 -->
<template>
<div class="mihead">
	<div class="top">
		<div class="logo">
			<img src="../assets/img/ico (8).png">
		</div>
		<div class="mid" @click='gotosearch'>
			<div class=" midico">
				<img src="../assets/img/ico (3).png">
			</div>
		</div>
		<div class="mymsg" @click='gotomyhome'>
			<img src="../assets/img/ico (4).png">		
		</div>	
	</div>
	<div class="mhbot">
		<div class="bot" @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' :style='tf'>
			<div class="botbox"  v-for='v in headdata'>
				<span class="botli" :class="{botli0:pagename!=v.hdname,botli1:pagename==v.hdname}" v-bind:id='v.hdname'>{{v.hdtxt}}</span>
			</div>				
		</div>		
	</div>

</div>	
</template>
<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'

export default{
	data(){
		return{
			startX:0,//滑动开始坐标
			moveX:0,//滑动坐标
			disX:0,//滑动距离
			tf:'',//轮播图动画css属性
			endX:'',//结束坐标
			istouchmove:false,//最后次滑动结束坐标
			headdata:[{
				hdname:'tuijian',
				hdtxt:'推荐'
			},{
				hdname:'shouji',
				hdtxt:'手机'
			},{
				hdname:'zhineng',
				hdtxt:'智能'
			},{
				hdname:'dianshi',
				hdtxt:'电视'
			},{
				hdname:'diannao',
				hdtxt:'电脑'
			},{
				hdname:'shuangse',
				hdtxt:'双摄'
			},{
				hdname:'quanmian',
				hdtxt:'全面屏'
			},{
				hdname:'shenghuo',
				hdtxt:'生活周边'
			},{
				hdname:'hezi',
				hdtxt:'盒子'
			}]					
		}
	},
	name:'mihead',
	props:['pagename'],
	methods:{
		...mapActions([
			'getterdata','updataPageName','sendmsg'
		]),
		touchstart:function(e){
			var ev = e || event;
			ev.preventDefault();
			this.istouchmove = false;
			if(ev.touches.length == 1){//手指数1
				//记录起始X坐标
				this.startX = ev.touches[0].clientX;
			}
		},
		touchmove:function(e){		
			var ev = e || event;			
			ev.preventDefault();
			this.istouchmove = true;				
			if (ev.touches.length == 1) {
			// 	//记录当前移动的X坐标,并计算与起始X坐标的距离
				this.endX = e.touches[0].clientX;
				this.disX = this.endX-this.startX;
				this.tf = 'transform:translate3d('+this.disX+'px,0px,0px)';
			}					
		},
		touchend:function(e){		
			var ev = e || event,
				tfa = document.body.clientWidth,
				arr = document.querySelectorAll('.botbox'),
				botwidth=0;
			ev.preventDefault();
			//屏幕上为单手指
			if(ev.changedTouches.length == 1){
				// 点击事件			
				if(!this.istouchmove){
					if(e.target.id){
						//console.log(this.nowpages,e.target.id);
						//当前点击页面存在于二级页面数组中
						for(var i=0,j=this.nowpages.length;i<j;i++){
							if(this.nowpages[i] == e.target.id){
								this.$router.push({path:'/index/'+e.target.id});
								this.getterdata(e.target.id);
								this.istouchmove = false;
								return
							}
						}
						//不存在于数组中
						var remdmsg = ['敬请期待'];
						this.sendmsg(remdmsg)	
					}					
					return
				}
				//右滑时左边界			
				if(this.disX>0){
					this.disX = 0;
					this.tf = 'transform:translate3d('+this.disX+'px,0px,0px);transition: transform 0.3s';
					this.istouchmove = false;
					return
				}
				// 左滑时右边界
				for(var i=0,j=arr.length;i<j;i++){
					botwidth += arr[i].offsetWidth;
				}
				if(botwidth-tfa<-this.disX){
					this.disX = tfa-botwidth;
					this.tf = 'transform:translate3d('+this.disX+'px,0px,0px);transition: transform 0.3s';
					this.istouchmove = false;
				}
			}							
		},
		// 有问题,没找到答案,先放着->console里面获取到的数据不准确->应该可以延时获取
		getbotwidth:function(){
			// var arr = document.querySelectorAll('.botbox'),
			// 	botwidth=0;
			// for(var i=0,j=arr.length;i<j;i++){
			// 	botwidth += arr[i].offsetWidth;
			// }
			//console.log(document.querySelectorAll('.botbox')[1].offsetWidth);
		},
		gotosearch:function(){
			this.updataPageName('pagesearch')
			this.$router.push({path:'/search'});
		},
		gotomyhome:function(){
			this.updataPageName('pagemyhome')
			this.$router.push({path:'/myhome'});
		}			
	},
	computed:{
		...mapGetters(['rtName','nowpages'])
	},
	mounted:function(){
		//this.getbotwidth()
	}	
}
</script>
<style scoped>
.mihead{	
	width: 100%;
	max-width: 720px;
	height: 84px;
	position: fixed;
	top: 0px;
	box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2);
	background: #f2f2f2;
	z-index: 99;
}
.top{
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
}
.botbox{
	display: inline-block;
	pointer-events: auto;
}
.logo{
	width: 15%;
}
.mymsg{
	width: 13%;
}
.logo,.mymsg{
	display: flex;
	align-items: center;
	justify-content: center;
}
.mid{
	width: 72%;
	min-height: 62%;
	background: #fff;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.midico{
	width: 18%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.logo img,.mid img{
	width: 50%;
}
.mymsg img{
	width: 45%;
}
.mhbot{
	width: 100%;
	max-width: 720px;
	overflow: hidden;
	height: 34px
}
.bot{
	height: 32px;
	line-height: 32px;
	white-space: nowrap;
	font-size: 0.3em;
	pointer-events: auto;
}
.botli0{
	display: block;
	color: rgb(116,116,116);
}
.botli1{
	display: block;
	border-bottom: 2px solid rgb(237,91,0);
	color: rgb(237,91,0);
	height: 31px
}

.botli{
	margin: 0 7px;
	font-size: 0.9em;
}
</style>