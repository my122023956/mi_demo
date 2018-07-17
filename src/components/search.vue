<template>
	<div class="search">
		<div class="sctitle">
			<div @click='gotospage' class="scico1">
				<img src="static/img/ico (2).png">
			</div>			
			<input type="text" class="scipt" placeholder="搜索商品名称" @input='getGoods' ref='scipt'>
			<div class="scico2" @click='schGoods1'>
				<img src="static/img/ico (3).png">
			</div>			
		</div>
		<div class="schot">热门搜索</div>
		<div class="scimg">
			<img src="static/img/search.jpg">
		</div>
		<div class="scgoodslist">
			<div v-for='v in scgoods' class="scgoods" v-if='isscgoods' v-bind:id='v.idname' @click='schGoods'>{{v.name}}</div>
			<div class="scdgoodslist">
				<div v-for='v1 in scdgoods' class="scdgoods" v-bind:id='v1.idname' @click='schGoods'>{{v1.name}}</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapActions} from 'vuex'
import axios from 'axios'

export default{
	data(){
		return{
			scgoods:[{
				name:'黑鲨游戏手机',
				idname:'heisha'
			},{
				name:'小米手环3',
				idname:'shouhuan3'
			},{
				name:'小米8',
				idname:'xiaomi8'
			},{
				name:'净水器厨下',
				idname:'chuxiajsq'
			},{
				name:'小米笔记本Pro i5',
				idname:'xmbjbproi5'
			}],
			isscgoods:true,
			scdgoods:[]//匹配的商品名称数组
		}		
	},
	methods:{
		...mapActions(['getgoodsdetail']),
		// 下面快捷查找商品事件
		schGoods:function(e){
			this.$router.push({path:'/detail/'+e.target.id});
			this.getgoodsdetail(e.target.id)
			// console.log(e.target.id);
		},
		//上面放大镜图标点击事件
		schGoods1:function(){
			if(this.$refs.scipt.value){
				this.$router.push({path:'/detail/'+this.$refs.scipt.value});
				this.getgoodsdetail(this.$refs.scipt.value)
			}
		},
		// 查询匹配的商品
		getGoods:function(e){
			this.scdgoods = [];
			var str = e.target.value;
			if(e.target.value){				
				axios.get('static/goodslist.json').then((res)=>{			
					var arr = res.data.goods;
					for(var i=0,j=arr.length;i<j;i++){
						if(arr[i].name.includes(e.target.value)){
							this.scdgoods.push(arr[i]);
							this.isscgoods = false;
							console.log(arr[i]);
						}
					}			
				})				
			}
			if(this.scdgoods.length==0){
				this.isscgoods = true;
			}						
			//console.log(this.isscgoods);
			//this.searchGoods(e.target.value);
		},
		gotospage:function(){
			this.$router.go(-1);
		}
	}
}	
</script>
<style scoped>
	.search{
		width: 100%;
		max-width: 720px;
		font-size: 0.3em;
	}
	.sctitle,.schot,.scimg,.scgoodslist,.scimg img{
		width: 100%;
	}
	.schot{
		width: 90%;
		margin: 0.5em auto;
		text-align: left;
		font-size: 0.9em;
	}
	.sctitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f2f2f2;
	}
	.scgoodslist{
		/*position: relative;*/
	}
	.scgoods{
		border: 1px solid #e4e4e4;
		display: inline-block;
		margin: 0.7em 0 0 0.7em;
		padding: 0.5em;
		float: left;
		font-size: 0.8em;
		background: hsla(12,99%,71%,.05);
		border-radius: 2px;
	}
	.scdgoodslist{
		width: 100%;
		background: #f5f5f5;
	}
	.scdgoods{
		width: 90%;
		margin: 0 auto;
		padding: 10px;
		text-align: left;
		border-bottom: 1px solid #cac0c047;
	}
	.scico1{
		width: 7%;
		margin:0.6em;
	}
	.scico2{
		width: 8%;
		margin:0.5em;
	}
	.sctitle img{
		width: 100%;
	}
	.scipt{
		width: 70%;
		height: 2em;
		border: 1px solid #e4e4e4;
		border-radius: 5px;
		text-indent:1em;
	}
</style>