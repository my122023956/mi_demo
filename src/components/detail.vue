<!-- 商品详情组件 -->
<template>
<div>
	<div v-if='hasgoods && detaildata' class="dtbox">
		<!-- 顶部轮播组件 -->
		<div class="dtcrs">
			<Carousel v-bind:cardata='detaildata.carimgs'></Carousel>
			<div class="dtico1" @click='spage'>
				<img src="static/detail/dtico1.png" class="dticoimg">
			</div>
			<div class="dtico2">
				<img src="static/detail/dtico3.png" class="dticoimg">
			</div>
		</div>	
		<div class="dtcx">	
			<img :src='detaildata.titleimg' class="dtcximg">
		</div>
		<!-- 商品信息 -->
		<div class="dtmsg">
			<div class="dtname">{{detaildata.msg.titlename}}</div>
			<span class="dtmsg1">{{detaildata.msg.msg1}}</span>
			<span class="dtmsg2">{{detaildata.msg.msg2}}</span>
		</div>
		<div class="dtrmb">￥{{detaildata.sjtype[0].rmb}}</div>
		<div class="shopingmsg1" @click='ycshow'>
			<div class="dtspan">已选</div>
			<div class="dtspanm">
				<div>{{detaildata.sjtype[0].name}}{{detaildata.sjtype[0].sjv}} x
				<span>{{goodsnum}}</span>
				</div>
				<div>意外保障服务</div>
			</div>
			<div class="dtspan3">
				<i class="dti"></i>
			</div>
		</div>
		<div class="shopingmsg2">
			<div class="dtspan">送至</div>
			<div class="dtspanm">北京市 东城区</div>
			<div class="dtspan3">
				<i class="dti"></i>
			</div>
		</div>
		<!-- 商品评价 -->
		<div></div>
		<!-- 商品图片介绍 -->
		<div class="dtspjs">
			<div class="dtks" :class="{dtks1:detaildata.imgshow=='gaishu'}" @click='fimg'>概述</div>
			<div class="dtcs" :class="{dtks1:detaildata.imgshow=='chanshu'}" @click='fimg'>参数</div>
			<div class="dtjs">
				<div class="dtjsimg0" v-show="detaildata.imgshow=='gaishu'">
					<div v-for='v in imgarr1' class="dtjsimg">
						<img :src="v">
					</div>
				</div>
				<div class="dtjsimg0" v-show="detaildata.imgshow=='chanshu'">
					<div v-for='v in imgarr2' class="dtjsimg">
						<img :src="v">
					</div>
				</div>		
			</div>
		</div>
		<!-- 底部链接栏 -->
		<div class="dtbottom" :class="{dtbottom0:sdtbottom}">
			<div class="dtbottom1" @click='gotoindex'>
				<img src="static/img/ico0 (2).png">首页
			</div>
			<div class="dtbottom2" @click='gotocart'>
				<img src="static/img/ico0 (3).png">购物车
			</div>
			<div class="dtbottom3" @click='ycshow'>加入购物车</div>
		</div>
		<!-- 商品版本选择 -->
		<div class="dtycdiv1" :class='{detailzd0:!dtycshow,detailzd1:dtycshow}'>
			<div class="dtycdivbox">
				<div class="dtycclose" @click='ycclose'>+</div>
				<!-- 顶部图片及选择信息总览 -->
				<div class="dtyc1">
					<div v-for='v1 in detaildata.sjtypecolor' v-show="v1.name==goodscolort[goodscoloridf]" class="dtyc1img">
						<img :src="v1.img">
					</div>
					<div class="dtyc1con">
						<div class="dtyc1conrmb">￥{{goodsrmb}}</div>
						<div class="dtyc1con1">{{goodstype}}{{goodscolort[goodscoloridf]}}</div>
						<div class="dtyc1con1">{{goodsmmy}}</div>
					</div>
				</div>
				<div class="clear"></div>
				<div class="dtyctitle">版本</div>
				<div v-for='(v2,k) in detaildata.sjtype' class="dtycspan" v-bind:name='v2.name' @click='fsjtypecs' :class='{liischoose:k==goodsindexof}'>
					<span class="dtycspan0">{{v2.sjv}}</span>
					<span class="dtycspan1">{{v2.rmb}}元</span>
				</div>
				<div class="dtyctitle">颜色</div>
				<div class="dtycycbox">
					<div v-for='(v3,k) in goodscolort' class="dtycyc" :class='{colorchoose:k==goodscoloridf}' @click='fcolorchoose'>{{v3}}</div>
				</div>			
				<div class="dtycnum">
					<div class="dtyctitle">购买数量</div>
					<div class="dtycnumspan">
						<div class="dtycnumspan0 dtycnumspan00" :class='{clickunable:goodsnum==1}' @click='fgoodsdn'>-</div>
						<div class="dtycnumspan1">{{goodsnum}}</div>
						<div class="dtycnumspan2 dtycnumspan01" :class='{clickunable:goodsnum==maxnum}' @click='fgoodsup'>+</div>
					</div>
				</div>
				<div class="dtyccar"></div>		
			</div>
			<div class="dtshowcar" @click='fshopingcarin'>加入购物车</div>
		</div>
		<!-- 隐藏隔断层 -->
		<div class="detailzd" :class='{detailzd2:!dtycshow,detailzd3:dtycshow}' @click='ycclose'></div>
		<div class="msgbox" v-show='msgboxshow'>
			<img src="static/img/ok.png">
			<span>成功加入购物车</span>
		</div>
	</div>
	<!-- 无效商品显示 -->
	<div v-if='!hasgoods' class="dtbox errgoodsbox">
		<div class="errgoods">
			<div class="egicobox" @click='spage'>
				<img src="static/img/ico (2).png">				
			</div>
			<div>{{nowname}}</div>
			<div class="egicobox" @click='gotosearch'>
				<img src="static/img/ico (3).png">
			</div>
		</div>
		<div class="egicobox1">
			<img src="static/img/empty.png">
		</div>		
		<div>抱歉，暂时没有与"{{nowname}}"相关的商品</div>
		<div>换一个试试吧~</div>
	</div>
</div>
</template>

<script type="text/javascript">
import Carousel from '../components/carousel'
import axios from 'axios'
import {mapGetters,mapActions} from 'vuex'

	export default{
		data(){
			return{
				detaildata:'',
				dtycshow:false,
				imgarr1:[],
				imgarr2:[],
				sdtbottom:false,
				joincart:true,//是否可以加入购物车
				hasgoods:true,//是否存在商品
				nowname:'',//商品关键词
				goodsnum:1,//购买商品数量
				maxnum:5,//最多可购买商品数量
				goodscolort:'',//当前版本所有的颜色组
				goodsrmb:'',//选中的商品价格
				goodstype:'',//选中的商品版本，如‘黑鲨游戏手机 标准版’
				goodsmmy:'',//选中的商品RAM+ROM,如6GB+64GB
				goodsindexof:0,//选中商品版本的数组下标
				goodscoloridf:0,//选中商品颜色的数组下标
				msgboxshow:false,//消息框是否显示
				rleave:false//右隐藏开关
			}
		},
		computed:{
			...mapGetters(['pagedata','shopCar','pageTLD','lastTLD'])
		},
		watch:{
			detaildata(){
				if(this.detaildata){
					this.hasgoods = true;
				}else{
					this.hasgoods = false;
				}
			},
			pageTLD(){
				switch(this.pageTLD){
					case 'pageindex':
						this.rleave = true;
						this.$router.go(-1);
						break
				}
			}
		},
		components:{Carousel},
		methods:{
			...mapActions(['joinShopCar','clearRemdMsg','updataPageName']),
			//加入购物车
			fshopingcarin:function(){				
				if(this.joincart){
					var obj = {},
					colorarr = this.detaildata.sjtypecolor;
					obj.goodstype 	= this.goodstype;//商品类型
					obj.goodscolor 	= this.goodscolort[this.goodscoloridf];//商品颜色
					obj.goodsmmy	= this.goodsmmy;//手机容量
					obj.price		= this.goodsrmb;//商品价格
					obj.goodsnum	= this.goodsnum;//商品数量
					obj.ischoose	= false;//默认是否选中
					obj.maxnum		= this.maxnum;
					for(var i = 0,j=colorarr.length;i<j;i++){
						if(obj.goodscolor == colorarr[i].name){
							obj.img = colorarr[i].img;//商品图标
						}					
					}				
					this.joinShopCar(obj)
					this.joincart = false;
					setTimeout(function(){
						this.joincart = true;
					}.bind(this),1000)
				}								
			},
			// 上一页
			spage:function(){
				if(this.lastTLD == 'pageindex'){
					this.updataPageName(this.lastTLD)
				}
				console.log(this.lastTLD)
				this.updataPageName(this.lastTLD)
				this.$router.go(-1);
			},
			// 首页
			gotoindex:function(){
				this.$router.push({path:'/'});
			},
			gotosearch:function(){
				this.$router.push({path:'/search'});
			},
			// 购物车
			gotocart:function(){
				this.$router.push({path:'/cart'});
			},
			// 关闭商品选择隐藏层
			ycclose:function(){
				this.dtycshow = false;
				document.body.style.overflow = '';
			},
			// 显示商品选择隐藏层
			ycshow:function(){
				this.dtycshow = true;
				document.body.style.overflow = 'hidden';
			},
			// 概述及参数图组切换
			fimg:function(e){
				if(e.target.textContent=='概述'){
					this.detaildata.imgshow = 'gaishu';				
				}
				if(e.target.textContent=='参数'){
					this.detaildata.imgshow = 'chanshu';
				}
				this.flazylogin()
			},
			//商品版本选择
			fsjtypecs:function(e){
				var tgname = e.target.attributes[1].value;					 
				for(var i = 0,j =this.detaildata.sjtype.length;i<j;i++){
					if(tgname == this.detaildata.sjtype[i].name){
						this.goodscolort = this.detaildata.sjtype[i].color;
						this.goodsindexof = i;
						this.goodsrmb 	= this.detaildata.sjtype[i].rmb;
						this.goodstype 	= this.detaildata.sjtype[i].name;
						this.goodsmmy	= this.detaildata.sjtype[i].sjv;
						this.goodscoloridf = 0;
						return
					}
				}
			},
			//商品颜色选择
			fcolorchoose:function(e){
				var tgname = e.target.textContent;
				for(var i = 0,j =this.goodscolort.length;i<j;i++){
					if(tgname == this.goodscolort[i]){
						this.goodscoloridf = i;
						return
					}
				}
			},
			// 商品数量增加
			fgoodsup:function(){
				if(this.goodsnum<this.maxnum){
					this.goodsnum++
				}				
			},
			// 商品数量减少
			fgoodsdn:function(){
				if(this.goodsnum>1){
					this.goodsnum--
				}				
			},
			// 懒加载商品详细图片
			flazylogin:function(){
				//暂时不能懒加载->设置overflow-x隐藏滚动条后不能获取scrollTop的值
				//				不设置的话滚动条会影响页面动画效果

				// var scrollH = document.documentElement.scrollTop,//当前滚动高度
				// 	clientH = document.body.clientHeight,//页面总高度
				// 	screenH = window.screen.height,//当前设备高度
				// 	num		= 3;//每次加载的图片数量
				// console.log(scrollH);
				// if(clientH-scrollH-screenH<300 && this.detaildata){
				// 	for(var i = 0;i<num;i++){
				// 		if(this.detaildata.imgshow == 'gaishu' && this.detaildata.gaishu.length!=0){
				// 		this.imgarr1.push(this.detaildata.gaishu.shift());
				// 		}
				// 		if(this.detaildata.imgshow == 'chanshu' && this.detaildata.chanshu.length!=0){
				// 			this.imgarr2.push(this.detaildata.chanshu.shift());
				// 		}
				// 	}				
				// }
				//}			
				if(this.detaildata){
					for(var i=0,j=this.detaildata.gaishu.length;i<j;i++){
						this.imgarr1.push(this.detaildata.gaishu.shift());
					}
					for(var i=0,j=this.detaildata.chanshu.length;i<j;i++){
						this.imgarr2.push(this.detaildata.chanshu.shift());
					}	
				}							
			}
		},
		mounted:function(){
			//通过路径名获取数据
			var goodsdtmsg;
			setTimeout(function(){
				this.sdtbottom = true;
			}.bind(this),300)
			this.nowname = window.document.location.href.split('/detail/')[1];
			axios.get('static/detail.json').then((res)=>{			
				var resdata = JSON.parse(JSON.stringify(res.data));
				this.detaildata = resdata[this.nowname];
				if(this.detaildata){//存在查询结果
					for (var i=0;i<3;i++) {
						this.imgarr1.push(this.detaildata.gaishu.shift());
						this.imgarr2.push(this.detaildata.chanshu.shift());
					}
					goodsdtmsg = this.detaildata.sjtype;
					this.goodsrmb	= goodsdtmsg[0].rmb;
					this.goodstype	= goodsdtmsg[0].name;
					this.goodsmmy	= goodsdtmsg[0].sjv;
					this.goodscolort = goodsdtmsg[0].color;
				}
				this.flazylogin()				
			})		
			//window.addEventListener('scroll',this.flazylogin)
			
		}
	}
</script>
<style scoped>
	.clear{
		clear: both;
	}
	.errgoodsbox{
		width: 100%;
		max-width: 720px;
	}
	.errgoods{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f2f2f2;
	}
	.egicobox{
		width: 8%;
		margin: 10px 2% 10px 2%;
	}
	.egicobox1{
		width: 30%;
		margin:40% 35% 10% 35%;
	}
	.egicobox img,.egicobox1 img{
		width: 100%;
	}
	.dtbottom{
		width: 100%;
		max-width: 720px;
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: -52px;
		left: 0;
		z-index: 700;
		font-size: 0.5em;
		box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.4);
	}
	.dtbottom0{
		transform: translate3d(0,-52px,0);
  		transition: transform 0.3s ease 0.3s;
	}
	.dtbottom1,.dtbottom2,.dtbottom2{
		height: 52px;
	}
	.dtbottom1,.dtbottom2{
		width: 20%;
		background: #fff;
	}
	.dtbottom1{
		border-right: 1px solid #cccccc54;
	}
	.dtbottom1 img{
		margin: 7px auto 3px auto;
		height: 45%;
	}
	.dtbottom2 img{
		margin: 9px auto 2px auto;
		height: 45%;
	}
	.dtbottom3{
		width: 60%;
		line-height: 52px;
		font-size: 2em;
		color: #fff;
		background: #ff6700;
	}	
	.dtycdiv1{
		width: 100%;
		max-width: 720px;
		position: fixed;		
		bottom: 0;
		background: #fff;
		z-index: 900;
		
	}
	.detailzd{
		width: 100%;
		max-width: 720px;
		height: 100%;
		background: rgba(0,0,0,.8);
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 0;
		transition: all 0.3s;
		pointer-events: none;
	}
	.detailzd0{
		transform: translate3d(0,800px,0);
		transition: transform 0.3s;
	}
	.detailzd1{
		transform: translate3d(0,0,0);
		transition: transform 0.3s;
	}
	.detailzd2{
		opacity: 0;
	}
	.detailzd3{
		z-index: 800;
		opacity: 1;
	}
	.dtyccar,.dtshowcar{
		height: 3em;
		width: 100%;
		line-height: 3em;
	}
	.dtshowcar{
		font-size: 1em;
		color: #fff;
		background: #f56600;
	}
	.dtycnum{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.dtycnumspan{
		display: flex;
		justify-content: space-between;
		border: 1px solid #eee;
	}
	.dtycnumspan0,.dtycnumspan1,.dtycnumspan2{
		width: 2em;
		height: 2em;
		line-height: 2em;
		opacity: 1;
		transition: opacity 0.2s;
	}
	.dtycnumspan00{
		background: #fafafa;
	}
	.dtycnumspan01{
		background: #f4f4f4;
	}
	.dtycclose{
		font-size: 2em;
		font-weight: 100;
		color: #ccccccc4;
		position: absolute;
		right: 5%;
		top: 8px;
		transform: rotate(45deg);
	}
	
	.dtycyc{
		display: inline-block;
	    font-size: 0.8em;
	    height: 2.2em;
	    width: 4em;
	    line-height: 2.2em;
	    border: 1px solid rgba(0,0,0,0);
	    text-align: center;
	    color: #000;
	    margin-left: 3%;
	    transition: border 0.15s,color 0.15s;
	}
	.colorchoose{
		border: 1px solid #f56600;
		color: #f56600;
	}
	.dtycycbox{
		display: flex;
		justify-content: flex-start;
		margin: 20px 0;
	}
	.clickunable{
		pointer-events: none;
		cursor: default;
		opacity: 0.3;
	}
	.dtycspan{
		display: flex;
		justify-content: space-between;
		border-radius: 2px;
		align-items: center;
		border: 1px solid rgba(0,0,0,0);
		color: #000;
		transition: border 0.2s,color 0.2s;
	}
	.liischoose{
		border: 1px solid #f56600;
		color: #f56600;
	}
	.dtycspan0,.dtycspan1{
		display: inline-block;
		margin:5px 5%;
		font-size: 0.8em;
		pointer-events:none;
	}
	.dtycdivbox{
		width: 90%;
		margin:15px 5%;
	}
	.dtyc1{
		width: 100%;
		float: left;
	}
	.dtyc1img{
		width: 30%;
		float: left;
	}
	.dtyc1img img{
		width: 100%;
	}
	.dtyc1con{
		width: 70%;
		text-align: left;
		float: left;
	}
	.dtyc1conrmb{
		font-size: 1.5em;
		margin: 7px 10px;
		color: red;
	}
	.dtyc1con1{
		margin: 2px 10px;
	}
	.dtyctitle{
		text-align: left;
		margin: 5px 0;
		font-size: 0.8em;
	}
	.dtbox{
		font-size: 0.3em;
		height: 100%;
		overflow-y:auto;
	}
	.dtcrs{
		margin-top: -84px;
		position: relative;
		top: 0;
	}
	.dtico1,.dtico2{
		position: absolute;
		width: 8%;
		background: rgba(0,0,0,.6);
		top: 4%;
		border-radius: 50%;
	}
	.dtico1{
		left: 4%;
	}
	.dtico2{
		right: 4%;
	}
	.dticoimg{
		width: 80%;
		margin: 10% 10%;
	}
	.dtcx,.dtcximg{
		width: 100%;
		max-width: 720px;
	}
	.dtmsg{
		text-align: left;
		width: 94%;
    	margin-left: 6%;
    	margin: 12px 4%;
	}
	.dtrmb{
		text-align: left;
		width: 95%;
		margin: 10px 5%;
	    font-size: 1.5em;
	    font-weight: 700;
	    color: red;
	}
	.dtname{
		font-size: 1.2em;
	}
	.dtmsg1{
		color: red;
		font-size: 0.8em;
	}
	.dtmsg2{
		color: rgba(0,0,0,.54);
		font-size: 0.8em;
	}
	.shopingmsg1,.shopingmsg2{
		width: 100%;
		max-width: 720px;
		float: left;
		font-size: 0.8em;
	}
	.shopingmsg1{
		border-top: 5px solid #efefef;
	}
	.dtspan{
		color: rgba(0,0,0,.54);
		width: 20%;
		text-align: center;
		float: left;
	}
	.dtspanm{		
		width: 70%;
		text-align: left;
		float: left;
	}
	.dtspan3{
		float: left;
		width: 10%;
		text-align: center;
	}
	.dti{
		display: block;
		width: 8px;
		height: 8px;
		border-top: 1px solid #ccc;
		border-right: 1px solid #ccc;
		transform: translate3d(50%,50%,0) rotate(45deg);
	}
	.dtspan,.dtspanm,.dtspan3{
		margin: 10px auto;
	}
	.dtks,.dtcs{
		width: 50%;
		float: left;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-top: 10px solid #efefef;
		border-bottom: 1px solid #efefef;
	}
	.dtks1{
		color: red;
	}
	.dtjsimg{
		width: 100%;
		max-width: 720px;	
	}
	.dtjsimg img{
		width: 100%;
	}
	.dtjsimg1{
		opacity: 1;
		display: block;
	}
	.dtjsimg2{
		opacity: 1;
		display: block;
	}
	.msgbox{
		width: 11em;
		height: 8em;
		top: 40%;
		position: fixed;
		left: 50%;
		margin-left: -5.5em;
		z-index: 999;
		background: #31313194;
		border-radius: 12px;
		color: #fff;
	}
	.msgbox img{
		width: 30%;
		margin: 1em auto 1em auto;
	}
</style>