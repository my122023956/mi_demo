<!-- 分类内容组件
例如热卖爆品组件,新品推荐组件等 -->
<template>
	<div v-if='ttvalue.isshow'>
		<!-- 三图组件 -->
		<div v-if='ttvalue.threelistdata'>
			<listthree v-bind:threedata='ttvalue.threelistdata'></listthree>
		</div>
		<!-- 分类标题图 -->
		<div class="tpimg">
			<img :src='ttvalue.titleimg'>
		</div>
		<!-- 单图组件 -->
		<div>
			<listone v-bind:onedata='ttvalue.onelistdata'></listone>
		</div>		
		<!-- 双图组件 -->
		<div v-for='v in ttvalue.twolistdata'>
			<listtwo v-bind:twodata='v'></listtwo>
		</div>

		<!-- 广告组件 -->
		<listad></listad>
	</div>
</template>

<script type="text/javascript">
import {mapGetters} from 'vuex'
import Listtwo from '../components/listtwo'
import Listone from '../components/listone'
import Listad from '../components/listad'
import listthree from '../components/listthree'

export default{
	props:['ttvalue'],
	computed:{
		//先将就用到双图组件数据,后面加全
		...mapGetters(['nowpage'])
	},
	components:{Listtwo,Listone,Listad,listthree},
	beforeRouteEnter(to,from,next){
		console.log(this.$router.params);
		console.log(to);
		console.log(from);
		console.log(next);
		next()
	}
}
</script>

<style scoped>
.tpimg,.tpline{
	width: 100%;
	max-width: 720px;
}
.tpimg img{
	width: 100%;
}
</style>