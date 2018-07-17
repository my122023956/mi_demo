<!-- 推荐页三图组件 -->
<template>
	<div class="listthree">
		<div class="lttleft">
			<img :src="threedata.left">
		</div>
		<div class="lttright">
			<div class="lttright1">
				<img :src="threedata.right1" >
			</div>
			<div class="lttright2">
				<img :src="threedata.right2">
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['threedata']
	}
</script>
<style scoped>
.listthree{
	width: 100%;
	max-width: 720px;
	display: flex;
	justify-content: space-between;
}
.lttleft,.lttright{
	width: 3.57em;
}
.lttleft img,.lttright img{
	width: 100%;
}
.lttright1{
	margin-bottom: 0.04em;
}
</style>