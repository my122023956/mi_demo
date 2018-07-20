<!-- 购物车 -->
<template>
<div class="cart">
	<div class="cartbox">
	<!-- 顶栏 -->
		<div class="top">
			<div @click='spage'>
				<img src="static/cart/ico0.png" class="topimg1">
			</div>
			<span>购物车</span>
			<div>
				<img src="static/cart/ico3.png" class="topimg2">
			</div>		
		</div>
		<div class="carttopbz"></div>
		<div class="cartempty" v-show="shopCar.length == 0">
			<div class="eptico"><img src="static/cart/cartempty.png"></div>
			<div>购物车还是空的</div>
			<div class="eptgg" @click='gotoindex'>去逛逛</div>
		</div>
		<!-- 商品列表 -->
		<div class="goodslist">
			<div v-for='(v,k) in shopCar' class="goodsbox">
				<div class="cartchoose" :id='k' :ref='k' @click='csgoods'>
					<img src="static/cart/check_press.png" v-show="chooseArr[k]">
				</div>			
				<div class="goodsimg">
					<img :src="v.img">
				</div>
				<div class="goodsmsg">
					<div class="goodsmsg1"><span>{{v.goodstype}}</span>{{v.goodscolor}} {{v.goodsmmy}}</div>
					<div class="goodsmsg2">售价：{{v.price}}</div>
					<div class="goodsnum" @click='goodsnumcg'>
						<div class="goodsnumico" :class="{goodsnumico0:v.goodsnum==1}" id='contdown' :name='k'>
							<img src="static/cart/ico2.png">
						</div>
						<div class="goodsnum0">{{v.goodsnum}}</div>
						<div class="goodsnumico" :class="{goodsnumico0:v.goodsnum==v.maxnum}" id='contup' :name='k'>
							<img src="static/cart/ico1.png">
						</div>
					</div>
				</div>
				<div class="goodsdel" @click='fdel'>
					<img src="static/cart/ico4.png" v-bind:name='v.goodstype'>
				</div>
			</div>
		</div>
		<div class="cnlike">
			<img src="static/cart/cnlike.jpg">
		</div>
		<div>
			<div v-for='v in listtwodata'>
				<listtwo v-bind:twodata='v'></listtwo>
			</div>
		</div>
		<div class="cartft">
			<div class="cartft1">
				<div>
					共<span class="cartft1sp1">{{goodssl}}</span>件 金额：
				</div>
				<div>
					<span class="cartft1sp2">{{goodsrmb}}</span>元
				</div> 
			</div>
			<div class="cartft2" @click='goshoping'>继续购物</div>
			<div class="cartft3" @click='shopingend'>去结算</div>				
		</div>
	</div>
</div>
</template>
<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'
import listtwo from '../components/listtwo'
import axios from 'axios'

	export default{
		data(){
			return{
				chooseArr:[],//商品是否选择数组
				goodssl:0,//商品数量合计
				goodsrmb:0,//商品价格合计
				listtwodata:[]
			}
		},
		components:{listtwo},
		computed:{
			...mapGetters(['shopCar','lastTLD','username','pageTLD','addmsg']),
		},
		watch:{
			chooseArr(){
				this.getsljg()
				sessionStorage.setItem('chooseArr',JSON.stringify(this.chooseArr))
			}
		},
		methods:{
			...mapActions(['fdelgoods','updataPageName','updatacart','sendmsg']),
			//获取总数量及总价格
			getsljg:function(){
				this.goodssl = 0;
				this.goodsrmb= 0;
				for(var i=0,j=this.chooseArr.length;i<j;i++){
					if(this.chooseArr[i]){
						this.goodssl += this.shopCar[i].goodsnum;
						this.goodsrmb += this.shopCar[i].goodsnum * this.shopCar[i].price;
					}				 
				}
			},
			spage:function(){
				this.$router.go(-1);
				this.updataPageName(this.lastTLD)
			},
			// 删除商品
			fdel:function(e){
				this.fdelgoods(e.target.name);
				this.chooseArr = [];
				for(var i=0,j=this.shopCar.length;i<j;i++){
					this.chooseArr.push(this.shopCar[i].ischoose);
				}
				this.getsljg()
			},
			// 改变商品选中状态
			csgoods:function(e){
				console.log(this.chooseArr,e.target,this.chooseArr[e.target.id]);
				this.$set(this.chooseArr,e.target.id,!this.chooseArr[e.target.id]);
			},
			// 商品数量改变
			goodsnumcg:function(e){
				var xb =e.target.attributes[2].value,//获取当前商品在shopCar数组中的下标
					num=e.path[1].children[1].innerText;
				switch(e.target.id){
					// 数量加
					case 'contup':
						if(num<this.shopCar[xb].maxnum){
							num++;
						}else{
							return
						}							
						break
					// 数量减
					case 'contdown':
						if(num>1){
							num--;
						}else{
							return
						}						
						break
				}
				this.$set(this.shopCar[xb],'goodsnum',num);
				this.getsljg()	
			},
			//继续购物
			goshoping:function(){
				this.$router.push({path:'/category'});
			},
			gotoindex:function(){
				this.$router.push({path:'/category'});
			},
			shopingend:function(){				
				var user = this.username,
					hasgoods = false;
				//未登录
				if(!user){
					this.$router.push({path:'/login'});
					return
				}
				// console.log(this.addmsg.name);
				//无合法收件地址
				if(!this.addmsg.name){
					this.$router.push({path:'/address'});
					return
				}
				//是否选择了商品
				for(var i=0,j=this.chooseArr.length;i<j;i++){
					if(this.chooseArr[i]){
						hasgoods = true;
					}
				}
				if(hasgoods){
					var goodsArr = []
					for(var i=0,j=this.shopCar.length;i<j;i++){
						if(this.chooseArr[i]){
							goodsArr.push(this.shopCar[i])
						}
					}
					this.$router.push({path:'/order',query:{addmsg:this.addmsg,goodsmsg:goodsArr}});
					// console.log(this.addmsg);
					// console.log(this.chooseArr);
					// console.log(this.shopCar);
				}else{
					this.sendmsg(['请选择商品','err'])
				}			
			}
		},
		mounted:function(){
			this.updataPageName('pagecart')
			// console.log(this.shopCar);
			// 获取商品选择状态
			if(sessionStorage.getItem('chooseArr')){
				this.chooseArr = JSON.parse(sessionStorage.getItem('chooseArr'))
			}else{
				for(var i=0,j=this.shopCar.length;i<j;i++){
					this.chooseArr.push(false);
				}
			}			
			//获取‘猜你喜欢’双图组件数据
			axios.get('static/cart.json').then((res)=>{			
				var resdata = JSON.parse(JSON.stringify(res.data));
				this.listtwodata = resdata.cartdata;	
			})
		}
	}
</script>
<style scoped>
	.cart{
		width: 100%;
		max-width: 720px;
		height: 100%;
		overflow: hidden;
	}
	.cartbox{
		width: 100%;
		height: 100%;
		overflow-y:auto;
	}
	.top,.cartlogin,.goodslist,.goodsbox,.cnlike{
		width: 100%;
		max-width: 720px;
	}
	.top{
		display: flex;
		justify-content: space-between;
		font-size: 0.3em;
		position: fixed;
		background: #f2f2f2;
		height: 50px;
		line-height: 50px;
		top: 0;
		left: 0;
	}
	.topimg1{
		height: 30px;
		margin: 10px 10px;
	}
	.topimg2{
		height: 36px;
		margin: 7px 10px;
	}
	.carttopbz{
		height: 50px;
		width: 100%;
	}
	.cartempty{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.25em;
		height: 4em;
		background: #ebebeb;
	}
	.eptgg{
		width: 14%;
		border: 1px solid #bbb;
		margin: 0 2%;
		padding: 3px 2%;
	}
	.eptico{
		width: 11%;
		margin: 0 5%;
	}
	.eptico img{
		width: 100%;
	}
	.cartchoose{
		width: 1.5em;
		height: 1.5em;
		border: 1px solid #ccc;
		border-radius: 50%;
		margin: auto 1%;
	}
	.cartchoose img{
		width: 100%;
		pointer-events: none;
	}
	.cartchoose1{
		background: url('/static/cart/check_press.png');
		background-size: 1.5em 1.5em;
	}
	.cartchoose2{
		background: #fff;
	}
	.goodsimg img,.cnlike img,.goodsdel img{
		width: 100%;
	}
	.goodsbox{
		display: flex;
		justify-content: space-between;
		font-size: 0.3em;
		position: relative;
		margin: 10px auto;
	}
	.goodsimg{
		width: 25%;
		border: 1px solid #f2f2f2;
		margin-right: 3%;
	}
	.goodsdel{
		position: absolute;
		right: 15px;
		bottom: 15px;
		width: 8%;
	}
	.goodsmsg{
		width: 64%;
		text-align: left;
		font-size: 0.85em;
	}
	.goodsmsg1{
		font-size: 1.1em;
		margin-top: 5px;
	}
	.goodsmsg2{
		font-size: 0.9em;
		margin: 0px auto 5px 0px;
		color: #ccc;
	}
	.goodsnum{
		width: 40%;
		display: flex;
		justify-content: center;
		border: 1px solid #f2f2f2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.goodsnumico{
		background: #f4f4f4;
	}
	.goodsnumico0{
		opacity: 0.2;
	}
	.goodsnumico,.goodsnum0{
		width: 33.3%;
		line-height: 100%;
		text-align: center;
	}
	.goodsnum0{
		font-size: 1.3em;
	}
	.goodsnumico img{
		width: 56%;
		margin: 22%;
		pointer-events: none;
	}
	.cartft{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 52px;
		font-size: 0.3em;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.4);
	}
	.cartft1,.cartft2,.cartft3{
		width: 33.3%;
		height: 100%;
	}
	.cartft1{
		background: #fff;
		font-size: 0.8em;
		color: #999;
	}
	.cartft1 .cartft1sp2{
		color: #ff6700;
		font-size: 1.8em;
		font-weight: 600;
	}
	.cartft2{
		background: #f4f4f4;
		line-height: 52px;
	}
	.cartft3{
		background: #ff6700;
		line-height: 52px;
		color: #fff;
	}
</style>