<!-- 结算组件 -->
<template>
	<div class="orderbox">
		<div class="order">
		<!-- 顶栏信息 -->
			<div class="ordertop">
				<div class="ordertopico" @click='spage'></div>
				用户结算
			</div>
		<!-- 配送信息 -->
			<div class="orderps">
				<div class="orderps1">{{name}} {{phone}}</div>
				<div class="orderps2">{{add1}} {{add2}}</div>
				<div class="orderpsico" @click='gotoadd'></div>
			</div>
			<!-- 分割线 -->
			<div class="orderfgx"></div>
		<!-- 支付方式 -->
			<div class="orderzf" :class="{orderzf1:zfshow==3,orderzf2:zfshow!=3}">
				<div v-for='(v,k) in zf' class="orderzfli" >
					<div class="orderzfico">
						<img :src="v.ico">
					</div>
					<label :for="v" class="orderzftxt">{{v.name}}</label>
					<input type="radio" :id="k" :value="v" :name="v" :ref='v' class="orderzfipt" :checked="k==zfxb" @click='fzfxb'>
				</div>				
			</div>
			<div class="orderqtzf" @click='fzfshow'>
					<span>使用其他支付方式</span>
					<div class="zfico" :class="{zfico1:zfshow==3,zfico2:zfshow!=3}"></div>
				</div>
			<div class="orderfgx"></div>
		<!-- 商品信息 -->
			<div class="ordergoods">
				<div v-for='v in goods' class="goodsli">
					<div class="goodsliimg">
						<img :src="v.img">
					</div>
					<div class="goodslims">
						<div>{{v.goodstype}}{{v.goodscolor}}</div>
						<div>{{v.goodsmmy}}</div>
					</div>
					<div class="goodslinum" v-show="v.goodsnum>1">x {{v.goodsnum}}</div>
					<div class="goodslirmb">{{v.price*v.goodsnum}}</div>
				</div>
			</div>
			<div class="orderfgx"></div>
		<!-- 费用信息 -->
			<div class="orderfy">
				<div><span class="orderfy1">商品价格：</span>{{rmb}}</div>
				<div><span class="orderfy1">已优惠：</span>0.00</div>
				<div><span class="orderfy1">配送费用：</span>0.00</div>
			</div>
			<div class="orderfgx"></div>
			<div class="orderbotbz"></div>		
		<!-- 底栏 -->
			<div class="orderbot">
			<!-- 浮动送货地址 -->
				<div class="orderadd">
					配送至：{{add1}}{{add2}}
				</div>
				<div class="orderrmb">
					<div class="orderrmb1">共{{num}}件 合计：<span class="orderrmb10">{{rmb}}</span></div>
					<div class="orderrmb2" @click='qfk'>去付款</div>
				</div>				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapActions} from 'vuex'
export default{
	data(){
		return{
			zf:[{name:'微信支付','ico':'static/order/wx.png'},
				{name:'支付宝','ico':'static/order/zfb.png'},
				{name:'小米钱包','ico':'static/order/miqb.png'},
				{name:'银联在线支付','ico':'static/order/yl.png'},
				{name:'翼支付','ico':'static/order/yzf.png'},
				{name:'小米分期','ico':'static/order/mifq.png'},
				{name:'花呗分期','ico':'static/order/hbfq.png'},],
			name:'',
			phone:'',
			add1:'',
			add2:'',
			num:0,
			rmb:0,
			goods:[],
			zfshow:3,
			zfxb:0//支付方式下标
		}
	},
	methods:{
		...mapActions(['updataPageName','sendmsg']),
		// 支付方式显示隐藏
		fzfshow:function(){
			if(this.zfshow == 3){
				this.zfshow = this.zf.length-1;
			}else{
				this.zfshow = 3;
			}
		},
		//上一页
		spage:function(){
			this.$router.go(-1);
		},
		gotoadd:function(){
			this.$router.push({path:'/address'});
		},
		//付款
		qfk:function(){
			var str = this.zf[this.zfxb].name+'付款'+this.rmb+'元';
			this.sendmsg([str,'ok'])
		},
		//支付方式下标
		fzfxb:function(e){
			this.zfxb = e.target.id;
		}
	},
	mounted:function(){
		this.updataPageName('pageorder')
		if(sessionStorage.getItem('miAdd')){
			var obj = {},mrdz;
			obj = JSON.parse(sessionStorage.getItem('miAdd'));
			if(sessionStorage.getItem('mrdz')){
				mrdz = sessionStorage.getItem('mrdz');
			}else{
				mrdz = 0;
			}			
			// console.log(obj,mrdz);
			this.name = obj[mrdz].name;//姓名
			this.phone = obj[mrdz].sj.slice(0,3)+' **** '+obj[mrdz].sj.slice(-4,-1);//手机
			this.add1 = obj[mrdz].dq;//地区
			this.add2 = obj[mrdz].xxdq;//详细地址			
		}
		//商品数组
		if(typeof(this.$route.query.goodsmsg[0]) == 'object'){//正常传值
			this.goods = this.$route.query.goodsmsg;
			sessionStorage.setItem('ordergoods',JSON.stringify(this.goods))
		}else{
			this.goods = JSON.parse(sessionStorage.getItem('ordergoods'));
		}			
		for(var i in this.goods){
			this.num += parseInt(this.goods[i].goodsnum);
			this.rmb += parseInt(this.goods[i].price*this.goods[i].goodsnum);		
		}
		// console.log(typeof(this.$route.query.goodsmsg[0]));
	}
}
</script>
<style scoped>
	.orderbox{
		/*height: 100%;*/
		overflow: hidden;
		font-size: 0.3em;
	}
	.order{
		height: 100%;
		overflow-y:auto;
	}
	.orderfgx{
		width: 100%;
		height: 0.5em;
		background: #f2f2f2;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}
	.ordertop{
		height: 52px;
		width: 100%;
		line-height: 52px;
		background: #f2f2f2;
		position: relative;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
	.ordertopico{
		width: 10px;
		height: 10px;
		border-right: 1px solid #666;
		border-top: 1px solid #666;
		position: absolute;
		left: 1.5em;
		transform: rotate(-135deg);
	}
	.orderpsico{
		width: 10px;
		height: 10px;
		border-right: 2px solid #666;
		border-top: 2px solid #666;
		position: absolute;
		top: 45%;
		right: 1.7em;
		transform: rotate(45deg);
	}
	.orderps{
		width: 90%;
		height: 3em;
		position: relative;
		line-height: 1.5em;
		text-align: left;
		padding: 1em 5%;
		background: url('/static/order/bd1.png') 0 0 repeat-x;
		background-size: 2em 3px;
	}
	.ordergoods{
		position: relative;
	}
	.orderps1{
		font-weight: 700;
	}
	.orderps2{
		font-size: 0.8em;
		color: #999;
	}
	.orderzf{
		width: 90%;
		margin: 0 5%;
		transition: height 0.3s;
		overflow: hidden;
	}
	.orderzf1{
		height: 8.4em;
	}
	.orderzf2{
		height: 19.6em;
	}
	.orderzfli{
		height: 1.8em;
		line-height: 1.8em;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0.5em 0;
		border-bottom: 1px solid #f2f2f2;
	}	
	.orderqtzf{
		border-top: 2px solid #f2f2f2;
		height: 2.2em;
		line-height: 2.2em;
		padding: 0.5em 0 0.5em 0;
		font-size: 0.8em;
		color: #bbb;
		margin-top: 0.62em;
		margin-left: -1em;
		position: relative;
	}
	.zfico{
		height: 8px;
		width: 8px;
		border-top:1px solid #bbb;
		border-right:1px solid #bbb;
		position: absolute;		
		left: 67%;
		transition: all 0.3s;		
	}
	.zfico1{
		bottom: 1.4em;
		transform: rotate(135deg);
	}
	.zfico2{
		bottom: 1.1em;
		transform: rotate(-45deg);
	}
	.orderzftxt{
		display: block;
		width: 77%;
		text-align: left;
	}
	.orderzfico{
		height: 100%;
		width: 15%;
	}
	.orderzfipt{
		width: 8%;
		height: 60%;
	}
	.orderzfico img{
		height: 100%;
	}
	.goodsli{
		width: 90%;
		margin: 0 5%;
		padding: 5px 0;
		display: flex;
		align-items: center;
		border-bottom:1px solid #f2f2f2;
	}
	.goodsliimg{
		width: 13%;
	}
	.goodsliimg img{
		width: 100%;
	}
	.goodslims{
		width: 70%;
		font-size: 0.8em;
		line-height: 1.1em;
		text-align: left;
		margin-left: 1em;
	}
	.goodslinum{
		width: 10%;
		position: absolute;
		right: 15%;
		font-size: 0.8em;
		text-align: left;
	}
	.goodslirmb{
		font-weight: 600;
	}
	.orderbot{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.orderadd{
		padding: 5px 20px;
		color: #b57842;
		font-size: 0.8em;
		background: #fbf3c4;
		width: 100%;
		text-align: left;
	}
	.orderfy{
		font-size: 0.8em;
		line-height: 1.2em;
		width: 90%;
		margin: 0 5%;
		text-align: left;
		padding: 1em 0 1em 0;

	}
	.orderfy1{
		font-weight: 600;
	}
	.orderrmb{
		display: flex;
		height: 52px;
		line-height: 52px;
		align-items: center;
	}
	.orderrmb1{
		width: 55%;
		color: #ff5722;
		background: #fff;		
	}
	.orderrmb10{
		font-weight: 800;
	}
	.orderrmb2{
		width: 45%;
		background: #ff5722;
		color: #fff;
	}
	.orderbotbz{
		height: 82px;
		width: 100%;
	}
</style>