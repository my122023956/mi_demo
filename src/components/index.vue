<!-- 首页 -->
<template>	
	<div>
		<div class="index" :ref='index'>		
			<div v-for="v in contarr" class="indexli" :ref='v.nowpage' :class="{showpage:v.nowpage==nowpage1}">
			<!-- 轮播图 -->
				<Carousel v-bind:cardata='v.imgs'></Carousel>
			<!-- 二级分类图	 -->
				<Secondclass v-bind:secdata='v.scdClassImg'></Secondclass>
			<!-- 商品内容 -->
				<Typetem v-bind:ttvalue = 'v.typetemvalue'></Typetem>
			<!-- 底部补正 -->
				<div class="botd"></div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
import {mapGetters,mapActions} from 'vuex'
import Router from 'vue-router'
import Carousel from '../components/carousel'
import Secondclass from '../components/secondclass'
import Typetem from '../components/typetem'
import axios from 'axios'

export default{
	name:'index',
	data(){
		return{
			contarr:[],
			indexarr:{},
			nowpage1:'',
			lvtwoarr:[],//二级页面名数组
			index:'index'
		}
	},
	watch:{
		//index二级页面切换动画效果
		'$route'(to,from){
			var topath=to.path.split('/')[2],
      			frompath=from.path.split('/')[2]?from.path.split('/')[2]:'tuijian';
			if(this.indexarr[topath] && this.indexarr[frompath]){
				//每次切换回到页面顶部
				this.$refs.index.scrollTop = 0;
				// 根据切换的页面权重设置左右滑动
				if(this.indexarr[topath]>this.indexarr[frompath]){
					this.$refs[frompath][0].className ='indexli IndexliRightOut';
					this.$refs[topath][0].className ='indexli IndexliLeftIn';
				}else{				
					this.$refs[frompath][0].className ='indexli IndexliLeftOut';
					this.$refs[topath][0].className ='indexli IndexliRightIn';
				}
				// 清除添加的className，防止重复添加			
				setTimeout(function(){
					this.$refs[frompath][0].className = 'indexli';
				}.bind(this),500)
			}		
		},
		pageTLD:function(){
			console.log(this.pageTLD);
		}
	},
	computed:{
		...mapGetters(['pageTLD'])
	},
	methods:{
		...mapActions(['updataPageName','uplvtwopage']),
	},
	mounted:function(){
		this.updataPageName('pageindex')
		var pgname = this.nowpage,resdata;
			axios.get('static/data.json',{
				params:{
					// pagename:name
				}
			})
			//箭头函数可以访问父级作用域
			.then((res)=>{
			var j = 100;//二级页面左右动画权重			
				for(var k in res.data){
					this.contarr.push(res.data[k][0]);
					this.indexarr[res.data[k][0].nowpage] = j;
					this.lvtwoarr.push(res.data[k][0].nowpage);
					j--;
				}
				this.uplvtwopage(this.lvtwoarr)								
			})
		this.nowpage1 = this.nowpage;
	},
	computed:{
		...mapGetters(['nowpage']),
	},
	components:{Carousel,Secondclass,Typetem}
}
</script>

<style scoped>
.indexli{
	display: none;
	position: absolute;
}
.showpage{
	display: block;
}
@keyframes aIndexliLeftOut{
  0%{transform: translate3d(0, 0, 0);display: block;}
  99%{transform: translate3d(-100%, 0, 0);display: block;}
  100%{transform: translate3d(-100%, 0, 0);display: none;}
}
@keyframes aIndexliLeftIn{
  0%{transform: translate3d(-100%, 0, 0);}
  100%{transform: translate3d(0, 0, 0);}
}
@keyframes aIndexliRightOut{
  0%{transform: translate3d(0, 0, 0);display: block;}
  99%{transform: translate3d(100%, 0, 0);display: block;}
  100%{transform: translate3d(100%, 0, 0);display: none;}
}
@keyframes aIndexliRightIn{
  0%{transform: translate3d(100%, 0, 0);}
  100%{transform: translate3d(0, 0, 0);}
}
.IndexliLeftOut{
	display: block;
	animation: aIndexliLeftOut .5s;
	animation-fill-mode: forwards;
}
.IndexliRightOut{
	display: block;
	animation: aIndexliRightOut .5s;
	animation-fill-mode: forwards;
}
.IndexliLeftIn{
	display: block;
	animation: aIndexliLeftIn .5s;
	animation-fill-mode: forwards;
}
.IndexliRightIn{
	display: block;
	animation: aIndexliRightIn .5s;
	animation-fill-mode: forwards;
}
.slide2-left-enter,
.slide2-right-leave-active {
    transform: translate3d(-100%, 0, 0);
}
.slide2-left-leave-active,
.slide2-right-enter {
    transform: translate3d(100%, 0, 0);
}
.index{
	width: 100%;
	height: 100%;
	max-width: 720px;
	overflow-y:auto;
	position: absolute;
}		
.botd{
	width: 100%;
	max-width: 720px;
	height: 52px;
}
</style>