<!-- 底栏 -->
<template>
	<div class="mifooter" :style='msty1'>
		<ul class="mful">
			<li class="mfli" id='pageindex'>
				<router-link :to="{path:'/index/'+nowpage}" exact>
				<div class="mfliico">
					<img src="static/img/ico0 (2).png" v-show="pageTLD != 'pageindex'">
					<img src="static/img/ico1 (2).png" v-show="pageTLD == 'pageindex'">
				</div>
				<span>首页</span>
				</router-link>
			</li>
			<li class="mfli">  <!-- id='pagefenlei' -->
				<router-link to="/category">
				<div class="mfliico">
					<img src="static/img/ico0 (4).png" v-show="pageTLD != 'pagefenlei'">
					<img src="static/img/ico1 (4).png" v-show="pageTLD == 'pagefenlei'">
				</div>
				<span>分类</span>
				</router-link>
			</li>
			<li class="mfli" id='pagecart'>
				<router-link to="/cart">
				<div class="mfliico">
					<img src="static/img/ico0 (3).png" v-show="pageTLD != 'pagecart'">
					<img src="static/img/ico1 (3).png" v-show="pageTLD == 'pagecart'">
				</div>
				<span>购物车</span>
				</router-link>
			</li>
			<li class="mfli" id='pagemyhome'>
				<router-link to="/myhome">
				<div class="mfliico">
					<img src="static/img/ico0 (1).png" v-show="pageTLD != 'pagemyhome'">
					<img src="static/img/ico1 (1).png" v-show="pageTLD == 'pagemyhome'">
				</div>
				<span>我的</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
import {mapGetters,mapActions} from 'vuex'

	export default{
		data(){
			return{
				msty1:'width:100%'
			}
		},
		computed:{
			...mapGetters(['nowpage','pageTLD','lastTLD'])
		},
		props:['mftwidth'],
		watch:{
			mftwidth(){
				//this.msty1 = 'width:'+this.mftwidth+'px';
				// console.log(this.mftwidth);
			}
		},
		methods:{
			...mapActions(['updataPageName'])
		}
	}
</script>
<style scoped>
.mifooter{
	width: 100%;
	max-width: 720px;
	position: fixed;
	bottom: 0;
	height: 52px;
	color: #999;
	z-index: 99;
	background: #fff;
	box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.4);
}
.mifooter2{
	bottom: 0;
}
.mful{
	display: flex;
	justify-content: space-around;
	font-size: 14px;
	margin-top: 7px;
}
.mfliico{
	width: 25px;
	height: 25px;
	background-size: 25px;
	margin: 0 auto;
}
.mfliico img{
	width: 100%;
}
.mfli span,.mfliico{
	pointer-events: none;
}
.mfli span{
	font-style: normal;
}
</style>