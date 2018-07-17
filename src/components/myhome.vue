<template>
<!-- 顶栏 -->
<div class="myhomebox">
	<div class="myhome" @click='gotologin'>
		<div class="myphoto">
			<img src="static/myhome/myico1.png">
		</div>
		<span class="dlzc" v-show='!username'>登录/注册</span>
		<span class="dlzc" v-show='username'>{{username}}</span>		
	</div>
	<div class="mydd">
		<div class="mydd1">我的订单</div>
		<div class="mydd2">
			<span>全部订单</span>
			<div class="myico"></div>
		</div>
	</div>
	<div class="mysh" >
		<div class="mysh1">
			<img src="static/myhome/myico2.png">
			<span>待付款</span>
		</div>
		<div class="mysh2">
			<img src="static/myhome/myico3.png">
			<span>待收货</span>
		</div>
		<div class="mysh3">
			<img src="static/myhome/myico4.png">
			<span>退换修</span>
		</div>
	</div>
	<div class="mylist mymgpx1">
		<img src="static/myhome/myico5.png">
		<div class="mylist0">
			<span>会员中心</span>
			<div class="myico"></div>
		</div>	
	</div>
	<div class="mylist mymg">
		<img src="static/myhome/myico6.png">
		<div class="mylist0">
			<span>我的优惠</span>
			<div class="myico"></div>
		</div>
	</div>
	<div class="mylist mymgpx1">
		<img src="static/myhome/myico7.png">
		<div class="mylist0">
			<span>服务中心</span>
			<div class="myico"></div>
		</div>
	</div>
	<div class="mylist mymg">
		<img src="static/myhome/myico8.png">
		<div class="mylist0">
			<span>小米之家</span>
			<div class="myico"></div>
		</div>
	</div>
	<div class="mylist mymg">
		<img src="static/myhome/myico9.png">
		<div class="mylist0">
			<span>位置设置可用</span>
			<div class="myico"></div>
		</div>
	</div>
	<div class="mylist mymg1">
		<img src="static/myhome/myico10.png">
		<div class="mylist0" @click='gotoadd'>
			<span>位置设置</span>
			<div class="myico"></div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'

export default{
	data(){
		return{
			cityshow:false
		}
	},
	methods:{
		...mapActions(['updataPageName']),
		gotologin:function(){
			if(this.username){
				return
			}
			this.$router.push({path:'/login'});
		},
		gotoadd:function(){
			if(this.username){
				this.$router.push({path:'/address'});
			}else{
				this.$router.push({path:'/login'});
			}			
		}		
	},
	watch:{
		username(){
			console.log(this.username);
		},
		city(){
			this.cityshow = false;
			console.log(this.city);
		}
	},
	computed:{
		...mapGetters(['username'])
	},
	mounted:function(){
		this.updataPageName('pagemyhome')
	}
}
</script>
<style scoped>
.myhomebox{
	font-size: 0.2em;
	width: 100%;
	max-width: 720px;
	background: #f5f5f5;
	overflow: hidden;
}
.myhome,.mydd,.mysh,.mylist{
	width: 100%;
	background: #fff;
}
.myhome img{
	width: 100%;
}
.myhome{
	overflow: auto;
	background: url('/static/myhome/mybg.png') center 0 #f37d0f;
	background-size: auto 100%;
	display: flex;
	align-items: center;
	font-size: 1.2em;
	color: #fff;
}
.myphoto{
	width: 13%;
	margin: 1.4em;
}
.dlzc{
	display: inline-block;
}
.mydd{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #ddd;
}
.mydd1,.mydd2{
	margin: 1.1em;
	font-size: 1.3em;
}
.mydd2{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-right: 7%;
}
.myico{
	width: 10px;
	height: 10px;
	border-top: 1px solid #aaa;
	border-right: 1px solid #aaa;
	float: right;
	transform: rotate(45deg);
}
.mymg{
	margin-bottom: 0.8em;
}
.mymg1{
	border-bottom: 10em solid #f5f5f5;
}
.mymgpx1{
	margin-bottom: 1px;
}
.mysh{
	display: flex;
	justify-content: space-around;
	padding-bottom: 1.1em;
	padding-top: 1em;	
	margin-bottom: 1em;
}
.mysh img{
	width: 45%;
	margin: 0 auto;
}
.mylist{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.3em;
}
.mylist img{
	width: 8%;
	margin: 1em;
}
.mylist0{
	display: flex;
	width: 78%;
	justify-content: space-between;
	align-items: center;
}
</style>