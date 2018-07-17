<!-- 分类页 -->
<template>
	<div class="category" v-show="pageTLD=='pagefenlei'">
	<!-- 顶栏 -->
		<div class="ctgtop">
			<div>
				<img src="" alt="">
			</div>
			<span>分类</span>
			<div>
				<img src="" alt="">
			</div>
		</div>
		<!-- 名称列表 -->
		<div class="namelist">
			<ul class="namelistul">
				<li v-for="v in nameList" :class="{active:v.name == csnameList}" @click='fcnameList' :id='v.listname'>{{v.name}}</li>
			</ul>
		</div>
		<!-- 内容列表 -->
		<div class="contlist">
			<ul class="contlistul" :ref='contlistul'>
				<li v-for="v1 in contList">
					<div class="contlistimg" :ref='v1.listname'>
						<img :src="v1.listtitpt">
					</div>
					<div v-for="v2 in v1.content">
						<div class="contlistspanbox">
							<span class="contlistspan">{{v2.title}}</span>
						</div>
						<div class="ctlgoodslistbox">
							<div v-for="v3 in v2.values" class="ctlgoodslist">
								<div class="ctlgoodslistimg">
									<img :src="v3.img">
								</div>
								<span>{{v3.txt}}</span>
							</div>
						</div>
					</div>									
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'
	export default{
		data(){
			return{
				// 当前选中的列表名
				csnameList:'新品',
				contlistul:'contlistul',
				// 内容区滚动Y坐标触发数组
				scrollArr:[],
				// 是否为点击状态
				isclick:false,
				// 左边分类名列表
				nameList:[{name:'新品',listname:'xinpin'},
						{name:'手机',listname:'shouji'},
						{name:'电视',listname:'dianshi'},
						{name:'电脑',listname:'diannao'},
						{name:'家电',listname:'jiadian'},
						{name:'家装',listname:'jiazhuang'},
						{name:'路由',listname:'luyou'},
						{name:'智能',listname:'zhineng'},
						{name:'儿童',listname:'ertong'},
						{name:'灯具',listname:'dengju'},
						{name:'电源',listname:'dianyuan'},
						{name:'耳机',listname:'erji'},
						{name:'音箱',listname:'yinxiang'},
						{name:'礼品',listname:'lipin'},
						{name:'生活',listname:'shenghuo'},
						{name:'服务',listname:'fuwu'},
						{name:'会员卡',listname:'huiyuanka'},
						{name:'米粉卡',listname:'mifenka'},
						{name:'零售店',listname:'linshoudian'}],
				//内容列表
				contList:[{ listname:'xinpin',
							listtitpt:'static/category/title.jpg',
							content:[{
								title:'手机',
								values:[{img:'static/category/listico.png',txt:'小米8'},
										{img:'static/category/listico.png',txt:'小米8 SE'},
										{img:'static/category/listico.png',txt:'小米MIX 2S'},
										{img:'static/category/listico.png',txt:'红米S2'},
										{img:'static/category/listico.png',txt:'红米6 Pro'},
										{img:'static/category/listico.png',txt:'红米6'},
										{img:'static/category/listico.png',txt:'红米6A'}]
							},{
								title:'电视',
								values:[{img:'static/category/listds.jpg',txt:'75英寸 电视4'},
										{img:'static/category/listds.jpg',txt:'55 4S画面'},
										{img:'static/category/listds.jpg',txt:'55英寸 4X'},
										{img:'static/category/listds.jpg',txt:'32英寸 4C'},
										{img:'static/category/listds.jpg',txt:'43英寸 4S'},
										{img:'static/category/listds.jpg',txt:'43英寸 青春版'}]
										
							},{
								title:'电脑',
								values:[{img:'static/category/listdn.jpg',txt:'15.6 游戏本'},
										{img:'static/category/listdn.jpg',txt:'13.3增强版'},
										{img:'static/category/listdn.jpg',txt:'12.5office版'}]							
							}]
						},{ listname:'shouji',
							listtitpt:'static/category/title1.jpg',
							content:[{
								title:'小米手机',
								values:[{img:'static/category/listico.png',txt:'小米8'},
										{img:'static/category/listico.png',txt:'小米8 SE'},
										{img:'static/category/listico.png',txt:'小米MIX 2S'},
										{img:'static/category/listico.png',txt:'小米6X'},
										{img:'static/category/listico.png',txt:'黑鲨游戏手机'},
										{img:'static/category/listico.png',txt:'小米MIX 2'},
										{img:'static/category/listico.png',txt:'小米MAX 2'}]
							}]
						},{ listname:'dianshi',
							listtitpt:'static/category/title2.jpg',
							content:[{
								title:'电视',
								values:[{img:'static/category/listds.jpg',txt:'32-40英寸'},
										{img:'static/category/listds.jpg',txt:'43英寸'},
										{img:'static/category/listds.jpg',txt:'49-50英寸'},
										{img:'static/category/listds.jpg',txt:'55英寸'},
										{img:'static/category/listds.jpg',txt:'65-75英寸'},
										{img:'static/category/listds.jpg',txt:'激光投影电视'}]
							},{
								title:'盒子',
								values:[{img:'static/category/listhz.jpg',txt:'盒子4'},
										{img:'static/category/listhz.jpg',txt:'盒子4C'},
										{img:'static/category/listhz.jpg',txt:'盒子3S'},
										{img:'static/category/listhz.jpg',txt:'盒子3C'},
										{img:'static/category/listhz.jpg',txt:'盒子3增强版'}]
							},{
								title:'电视配件与会员',
								values:[{img:'static/category/listdspj.jpg',txt:'会员卡'},
										{img:'static/category/listdspj.jpg',txt:'遥控器'},
										{img:'static/category/listdspj.jpg',txt:'线材转接器'},
										{img:'static/category/listdspj.jpg',txt:'安装服务'},
										{img:'static/category/listdspj.jpg',txt:'麦克风'}]
							}]
						},{ listname:'diannao',
							listtitpt:'static/category/title3.jpg',
							content:[{
								title:'电脑',
								values:[{img:'static/category/listdn.jpg',txt:'平板'},
										{img:'static/category/listdn.jpg',txt:'游戏本'},
										{img:'static/category/listdn.jpg',txt:'笔记本15.6'},
										{img:'static/category/listdn.jpg',txt:'笔记本13.3'},
										{img:'static/category/listdn.jpg',txt:'笔记本12.5'}]
							}]
						},{ listname:'jiadian',
							listtitpt:'static/category/title4.jpg',
							content:[{
								title:'家电',
								values:[{img:'static/category/listjd.png',txt:'电饭煲'},
										{img:'static/category/listjd.png',txt:'净水器'},
										{img:'static/category/listjd.png',txt:'净化器'},
										{img:'static/category/listjd.png',txt:'扫地机器人'},
										{img:'static/category/listjd.png',txt:'米家投影仪'},
										{img:'static/category/listjd.png',txt:'电水壶'},
										{img:'static/category/listjd.png',txt:'电风扇'},
										{img:'static/category/listjd.png',txt:'滤水壶'},
										{img:'static/category/listjd.png',txt:'电磁炉'}]
							}]
						}]
			}
		},
		methods:{
			...mapActions(['updataPageName']),
			// 点击列表名跳转到对应锚点
			fcnameList:function(e){
				//改变选中的列表名称
				this.csnameList = e.target.textContent;
				//跳转到对应的锚点
				if(this.$refs[e.target.id]){
					this.$refs[e.target.id][0].scrollIntoView(true);
					this.isclick = true;
				}
				setTimeout(function(){
					this.isclick = false;
				}.bind(this),0)			
			},
			// 内容区滚动时改变名称区的选中状态
			onScroll:function(e){
				//确定非点击时跳转触发
				if(!this.isclick && this.pageTLD == 'pagefenlei'){
					for(var i = this.nameList.length-1,j = -1;i>j;i--){
						if(this.scrollArr[i]){
							if(this.$refs.contlistul.scrollTop>this.scrollArr[i].scrollY-1){
								// console.log(this.scrollArr[i].name);
								this.csnameList = this.nameList[i].name;
								return	
							}
						}					
					}
				}
			}
		},
		computed:{
			...mapGetters(['pageTLD'])
		},
		watch:{
			pageTLD(){
				// console.log(this.pageTLD);
			}
		},
		mounted:function(){
			//更新当前一级分类名
			this.updataPageName('pagefenlei')
			//必须延迟获取offsetTop，否则获取到的数据不准确
			setTimeout(function(){
				for(var k in this.$refs){
					if(k != 'contlistui'){
						try{
							var obj = {};
							obj.name = k;
							obj.scrollY = this.$refs[k][0].offsetTop;
							this.scrollArr.push(obj);
						}catch(err){}	
					}								
				}
			}.bind(this),100)
			//对contlistul添加scroll监听
			this.$refs.contlistul.addEventListener('scroll',this.onScroll,true)			
		}
	}
</script>
<style scoped>
.category{
	width: 100%;
	max-width: 720px;
	font-size: 0.3em;
}
.ctgtop{
	width: 100%;
	height: 52px;
	line-height: 52px;
	background: #f2f2f2;
}
.namelist{
	position: fixed;
	top: 52px;
	bottom: 52px;
	overflow: hidden;
	width: 4.9em;
	border-right: 1px solid #efefef;
	background: #fefefe;
}
.namelistul{
	overflow-y: auto;
    position: absolute;
    width: 100%;
    height: 102%;
}
.namelist li{
	height: 1.5em;
	padding: 1em 0 1em 0;
	font-size: 0.8em;
	line-height: 1.5em;
	transform: scale(1);
	transition: transform 0.3s;
}
.active{
	color: #fb7d34;
	transform: scale(1.5) !important;
}
.contlist{
	width: 19em;
	position: fixed;
	top: 52px;
	left: 5em;
	bottom: 52px;
	overflow: hidden;
	border-right: 1px solid #efefef;
	background: #fefefe;
}
.contlistul{
	overflow-y: auto;
    position: absolute;
    width: 90%;
    margin: 0 5%;
    height: 102%;
}
.contlistimg{
	width: 100%;
}
.contlistimg img{
	width: 100%;
}
.contlistspanbox{
	height: 5em;
	line-height: 5em;
}
.contlistspan{
	position: relative;
}
.contlistspan::before{
	content: '';
	position: absolute;
	top: 50%;
	right: 0;
	width: 1.4em;
	border-top: 1px solid #e0e0e0;
	transform: translate3d(150%,-50%,0);
}
.contlistspan::after{
	content: '';
	position: absolute;
	top: 50%;
	left: 0;
	width: 1.4em;
	border-top: 1px solid #e0e0e0;
	transform: translate3d(-150%,-50%,0);
}
.ctlgoodslistbox{
	display: flex;
	flex-wrap: wrap;
}
.ctlgoodslist{
	width: 33.3%;
	margin: 0.5em 0 0.5em 0;
}
.ctlgoodslist span{
	font-size: 0.8em;
	color: rgba(0,0,0,.54);
	padding: 0.5em 0 0.5em 0;
	display: block;
}
.ctlgoodslistimg{
	width: 100%;
}
.ctlgoodslistimg img{
	width: 70%;
	margin: 0 15%;
}
</style>