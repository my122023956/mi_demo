<!-- 双商品列表组件 -->
<!-- 接收来自typetem的绑定数据 -->
<template>
	<div class="listtwo" v-if='twodata'>
		<div v-for='gd0 in twodata' class="listtwobox">
			<div class="ltgoods" @click="gotodetail(gd0.idname)">
				<div class="ltimg">
					<img :src="gd0.img">
				</div>
				<div class="ltbq">
					<img src="static/listtwoimg/ltxs.jpg" v-if='gd0.type1'>
					<img src="static/listtwoimg/ltxp.jpg" v-if='gd0.type2'>
				</div>			
				<div class="ltmsg">
					<div class="ltname">
						{{gd0.name}}
					</div>
					<div class="ltad">
						{{gd0.ad}}
					</div>
					<div class="ltrmb">
						<span class="span1">￥{{gd0.newprice}}</span>
						<span class="span2" v-if="gd0.oldprice">￥{{gd0.oldprice}}</span>
					</div>
				</div>				
			</div>
		</div>	
	</div>
</template>
<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'
	export default{
		props:['twodata'],
		methods:{
			gotodetail:function(name){
				this.$router.push({path:'/detail/'+name});
				this.updataPageName('detail')
			},
			...mapActions([
				'getgoodsdetail','updataPageName'
			])
		}
	}
</script>
<style scoped>
.listtwo{
	font-size: 0.3em;
	width: 100%;
	max-width: 720px;
	position: relative;
	display: flex;
	justify-content: space-between;
}
.listtwo,.ltbq,.ltname{
	padding-top: 3px;
}
.ltgoods{
	width: 100%;
}	
.listtwobox{
	width: 49.5%;
}
.ltimg{
	width: 100%;
}
.ltimg img{
	width: 100%;
}
.ltbq{
	position: absolute;
	height: 6%;
	top: 0;
}
.ltbq img{
	height: 100%;
	float: left;
	margin-right: 5px;
}
.ltmsg{
	margin: 5%;
	width: 90%;
	flex-direction: row-reverse;
}
.ltname,.ltad,.ltrmb{
	text-align: left;
}
.ltname{
	font-size: 1.05em;
	color: rgba(0,0,0,.87);
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-align: left;
}
.ltrmb{
	margin-bottom: 10px;
}
.ltad{
	font-size: 0.8em;
	color: rgba(0,0,0,.54);
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    margin: 2px auto;
}
.span1{
	font-size: 1em;
	color: red;
}
.span2{
	font-size: 0.8em;
	text-decoration: line-through;
}
</style>