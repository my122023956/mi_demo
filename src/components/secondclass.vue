<!-- 二级分类图 -->
<template>
	<div class="scd">
		<div v-for='img in secdata.imgs' class="scdBox">
			<img :src="img" class="scdimg">
		</div>
		<div class="tpline"></div>
	</div>
</template>

<script type="text/javascript">
import {mapGetters,mapActions} from 'vuex'

export default{
	props:['secdata'],
	computed:{
		...mapGetters(['scdClassImg'])
	}
}
</script>

<style scoped="">
.scd{
	width: 100%;
	max-width: 720px;
	display: flex;
}
.scdBox{
	width: 20%;
}
.scdimg{
	width: 100%;
}
</style>