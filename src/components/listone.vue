<!-- 单商品列表组件 -->
<template>
	<div class="listone">	
		<div v-for='v in onedata' class="lobox">
				<!-- 分割线 -->
			<div class="tpline" v-if='!v.name'></div>
			<div class="loimgd">
			<!-- 图 -->
				<img :src="v.img" class="loimg">
			<!-- 限时特惠，新品标志 -->
				<div class="lobq">
					<img src="static/listtwoimg/ltxs.jpg" v-if='v.type1'>
					<img src="static/listtwoimg/ltxp.jpg" v-if='v.type2'>
				</div>
			</div>
			<!-- 名称，价格，简介			 -->
			<div class="lomsg" v-if='v.name'>
				<div class="loname">{{v.name}}</div>
				<div class="load">{{v.ad}}</div>
				<div class="lormb">￥{{v.newprice}}</div>
			</div>
		</div>		
	</div>	
</template>
<script type="text/javascript">
	export default{
		props:['onedata']
	}
</script>
<style scoped>
.listone,.ltbox,.loimg,.loimgd{
	width: 100%;
	max-width: 720px;
}
.tpline{
	height: 10px;
	background: rgb(245, 245, 245);
}
.listone{
	font-size: 0.3em;
}
.lobox{
	position: relative;
}
.lobq{
	position: absolute;
	height: 6%;
	top: 0;
}
.lobq img{
	height: 100%;
	float: left;
	margin-right: 5px;
}
.loname{
	font-size: 1.05em;
	color: rgba(0,0,0,.87);
}
.lormb{
	position: absolute;
	bottom: 4%;
	right: 5%;
	color: red;
	margin-bottom: 10px;
}
.lomsg{
	text-align: left;
	width: 92%;
	margin: 3% 4%;
}
.load{
	margin-top: 2px;
	font-size: 0.9em;
	color: rgba(0,0,0,.54)
}
.span1{
	font-size: 1.05em;
	color: red;
}
.span2{
	font-size: 0.9em;
	text-decoration: line-through;
}
</style>