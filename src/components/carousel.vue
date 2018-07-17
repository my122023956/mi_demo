<!-- 轮播图组件
index.vue绑定图片组cardata -->

<template>
	<div class="cas">
		<div class="casBox" @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' ref='cas' :style='tf'>
			<div class="casli" v-for='img in cardata'>
				<img :src='img' class="casliImg">
			</div>
		</div>
		<div class="casctr">
			<div v-for='(v,k) in cardata' class="casctrli" :class='{choose0:k != nowImg,choose1:k == nowImg}'></div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'

export default{
	props:['cardata'],
	computed:{
		//获取当前页关键词nowpage,也可以通过index.vue绑定
		...mapGetters(['nowpage'])
	},
	watch:{
		//监听关键词nowpage的改变以初始化轮播图的第一张图
		nowpage(){
			if(this.nowpage != this.nowpage0){
				this.tf = 'transform:translate3d(0px,0px,0px)';
				this.nowImg = 0;
			}
		}
	},
	methods:{
		//轮播图滑动事件
		touchstart:function(e){
			var ev = e || event;
			ev.preventDefault();
			if(ev.touches.length == 1){//手指数1
				//记录起始X坐标
				this.startX = ev.touches[0].clientX;
			}
		},
		touchmove:function(e){		
			var ev = e || event,
				tfa = -this.screenWidth,			
				tfx,
				tfb = this.nowImg;			
			ev.preventDefault();				
			if (ev.touches.length == 1) {
				//记录当前移动的X坐标,并计算与起始X坐标的距离
				this.moveX = ev.touches[0].clientX;
				this.disX = this.moveX - this.startX;
			}
			//多张图片补正
			tfx = tfa * tfb + this.disX;
			this.tf = 'transform:translate3d('+tfx+'px,0px,0px)';	
		},
		touchend:function(e){
			var ev = e || event,
				tfa = -this.screenWidth;			
			//屏幕过大的时候
			if(tfa<-720){
				tfa = -720;
			}
			ev.preventDefault();
			if(ev.changedTouches.length == 1){
				//移动距离小于this.tfn，显示右一张图
				if(this.disX<-this.tfn){
					//不是最后一张图片
					if(this.nowImg<this.cardata.length-1){
						this.nowImg++;
					}					
				}
				//移动距离大于this.tfn,显示左一张图
				if(this.disX>this.tfn){
					//不是第一张图
					if(this.nowImg>0){
						this.nowImg--;
					}
				}
				this.tf = 'transform:translate3d('+tfa*this.nowImg+'px,0px,0px)';
			}
		}
	},
	data(){
		return{			
			startX:0,//滑动开始坐标
			moveX:0,//滑动坐标
			disX:0,//滑动距离
			screenWidth:document.body.clientWidth,//当前屏幕宽度
			tfn:50,//改变图片最小值,
			tf:'',//轮播图动画css属性
			nowpage0:'tuijian',//当前页关键词
			nowImg:0//当前轮播图的序号
		}
	}
}
</script>
<style scoped>
	.cas{
		position: relative;
		left: 0;
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 84px;
		white-space: nowrap;
		background: #ccc;
	}
	.casBox{
		transform: translate3d(0px,0px,0px);
		transition: transform 0.5s;
		line-height: 5px;
	}
	.casli{
		display: inline-block;
	}
	.casliImg{
		width: 100%;
	}
	.casctr{
		position: absolute;
		width: 100px;
		height: 10px;
		bottom: 15px;
		left: 50%;
		margin-left: -50px;
		display: flex;
    	justify-content: center;
	}
	.casctrli{
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: #fff;
		margin: 0 5px;
	}
	.choose0{
		opacity: 0.2;
	}
	.choose1{
		opacity: 1;
	}
</style>