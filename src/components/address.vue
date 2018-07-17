<template>
	<div class="addbox">
		<div class="add">
			<!-- 顶栏 -->
			<div class="addtit">
				<div class="addtitimg" @click='gotospage'></div>
				 {{addtittxt}}
			</div>
			 <!-- 地址列表栏 -->
			<div class="dzitem">
				<div v-for='(v,k) in addarr' v-show='addarr[k].name && !xzdz' class="dzli">
					<div class="dztop">
						<div class="dzname">{{v.name}}</div>
						<div class="dzsj">{{v.sj}}<span v-show='mrdz == k' class="ddmr">[默认]</span></div>
						<div class="dzdel" @click='deldz' :name='k'>删除</div>
					</div>
					<div class="dzbot" @click='dzeditor' :id='k'>
						<div class="dzadd">
							<div>{{v.dq}}</div>
							<div>{{v.xxdq}}</div>
						</div>
						<div class="dzimg"></div>
					</div>
				</div>
			</div>
			<!-- 添加地址 -->
			<div class="addadd" v-show='xzdz'>
				<div class="addadd1">
					<div class="addadd1txt">收货人：</div>
					<input type="text" class="addadd1ipt" placeholder="真实姓名" ref='addname'>
				</div>
				<div class="addadd1">
					<div class="addadd1txt">手机号码：</div>
					<input type="text" class="addadd1ipt" placeholder="手机号" ref='addphone'>
				</div>
				<div class="addadd1">
					<div class="addadd1txt">所在地区：</div>
					<input type="text" class="addadd1ipt" placeholder="省 市 区 街道信息"  @click='showcity'  ref='adddq' readonly="readonly">
				</div class="addadd1">
				<div class="addadd1">
					<div class="addadd1txt">详细地区：</div>
					<input type="text" class="addadd1ipt" placeholder="详细地址" ref='addxxdq'>
				</div>
				<div class="addadd1">
					<label for="check2">设置为默认地址</label>
					<input type="checkbox" id="check2" value="mradd" name="name" ref='addmr'>
				</div>
			</div>
			<div class="newadd" @click='fbottom'>{{addaddtxt}}</div>
		</div>
		<!-- 城市选择遮挡层 -->
		<div v-show='cityshow' class="citybg" @click='closecity'></div>
		<!-- 城市选择组件 -->
		<city v-show='cityshow' v-on:newAdd='newAdd'></city>
	</div>
</template>
<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'
import city from './city'

	export default{
		data(){
			return{
				cityshow:false,
				xzdz:false,//新建地址
				addtittxt:'收货地址',
				addaddtxt:'新建地址',
				addarr:sessionStorage.getItem('miAdd')?JSON.parse(sessionStorage.getItem('miAdd')):[],//收货地址数组
				mrdz:'',//默认地址的数组下标
				dzeditorxb:''//正在编辑的地址下标
			}
		},
		watch:{
			mrdz(){
				// console.log(this.mrdz);
				this.sjmsg(this.addarr[this.mrdz])
				sessionStorage.setItem('mrdz',this.mrdz);
			}
		},
		methods:{
			...mapActions(['updataPageName','sendmsg','sjmsg']),
			//显示城市选择组件
			showcity:function(){
				this.cityshow = true;
			},
			//关闭城市组件
			closecity:function(){
				console.log(this.cityshow);
				this.cityshow = false;
			},
			//上一页
			gotospage:function(){
				if(this.lastTLD == 'pageindex'){
					this.updataPageName(this.lastTLD)
				}
				this.updataPageName(this.lastTLD)
				this.$router.go(-1);
			},
			// 底栏事件
			fbottom:function(e){
				switch(e.target.textContent){
					case '新建地址':
						this.xzdz = true;
						this.addtittxt = '新增地址';
						this.addaddtxt = '保存地址';
						this.$refs.addname.value = '';
						this.$refs.addphone.value = '';
						this.$refs.adddq.value = '';
						this.$refs.addxxdq.value = '';
						this.$refs.addmr.checked = false;
						break
					case '保存地址':
						//判断手机号是否合法
						if(!this.$refs.addphone.value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
							this.$refs.addphone.value = '';
							this.sendmsg(['错误的手机号','err'])
							return
						}
						this.xzdz = false;
						this.addtittxt = '收货地址';
						this.addaddtxt = '新建地址';
						//判断是新增还是编辑地址
						if(this.dzeditorxb){//编辑
							this.addarr[this.dzeditorxb].name = this.$refs.addname.value;
							this.addarr[this.dzeditorxb].sj = this.$refs.addphone.value;
							this.addarr[this.dzeditorxb].dq = this.$refs.adddq.value;
							this.addarr[this.dzeditorxb].xxdq = this.$refs.addxxdq.value;
							this.mrdz = this.dzeditorxb;
							this.dzeditorxb = '';
							this.hccity()
							return
						}else{//新增
							let obj = {};
							obj.name = this.$refs.addname.value;//姓名
							obj.sj = this.$refs.addphone.value;//手机
							obj.dq = this.$refs.adddq.value;//地区
							obj.xxdq = this.$refs.addxxdq.value;//详细地址
							this.addarr.push(obj)
							this.hccity()							
						}
						//复选框选中状态												
						if(this.$refs.addmr.checked){
							this.mrdz = this.addarr.length-1;//默认地址在addarr内的数组下标
						}else{
							for(var i=0,j=this.addarr.length;i<j;i++){
								if(this.addarr[i].name){
									if(i == this.addarr.length-1){
										this.mrdz = i;
									}else{
										return
									}
								}
							}
						}
						console.log(this.addarr,this.$refs.addmr.checked);
						break
				}
				
			},
			//地址编辑
			dzeditor:function(e){
				this.dzeditorxb = e.target.id;
				this.$refs.addname.value = this.addarr[e.target.id].name;
				this.$refs.addphone.value = this.addarr[e.target.id].sj;
				this.$refs.adddq.value = this.addarr[e.target.id].dq;
				this.$refs.addxxdq.value = this.addarr[e.target.id].xxdq;
				if(this.mrdz == e.target.id){
					this.$refs.addmr.checked = true;
				}else{
					this.$refs.addmr.checked = false;
				}
				// console.log(this.$refs.addmr.checked,e.target.id);
				this.addtittxt = '编辑地址';
				this.addaddtxt = '保存地址';
				this.xzdz = true;
			},
			// 删除地址
			deldz:function(e){
				// 获取数组下标
				var xb = e.target.attributes[1].value;
				//$set更新数组可触发v-for重新渲染
				this.$set(this.addarr,xb,'')
				this.hccity()
				// 判断当前删除项是否为默认地址
				if(xb == this.mrdz){
					for(var i=0,j=this.addarr.length;i<j;i++){
						// 使addarr内第一条有效值为默认选中状态
						console.log(this.addarr[i].name);
						if(this.addarr[i].name){
							this.mrdz = i;
							console.log(i);
							return
						}
					}					
				}				
				console.log(this.addarr);
			},
			//获取子city组件传递的值
			newAdd:function(value){
				this.cityshow = false;
				this.$refs.adddq.value = value;
			},
			//缓存city
			hccity:function(){
				var addStr = JSON.stringify(this.addarr);			
				sessionStorage.setItem('miAdd',addStr)
			}
		},
		computed:{
			...mapGetters(['city','lastTLD'])
		},
		mounted:function(){
			this.updataPageName('pageaddress')
			if(sessionStorage.getItem('mrdz')){				
				this.mrdz = sessionStorage.getItem('mrdz');
			}else{
				this.mrdz = 0;
			}
			// console.log(this.mrdz,this.addarr);
		},
		components:{city}
	}	
</script>
<style scoped>
	.addbox{
		width: 100%;
		height: 100%;
		position: absolute;
		font-size: 0.3em;
		top: 0;
		left: 0;
	}
	.add{
		width: 100%;
		height: 100%;
	}
	.addtit,.newadd{
		height: 52px;
		width: 100%;
		line-height: 52px;
		text-align: center;
	}
	.addtit{
		position: absolute;
		top: 0;
		left: 0;
		background: #f2f2f2;
	}
	.addtitimg{
		position: absolute;
		left: 20px;
		top: 18px;
		height: 14px;
		width: 14px;
		transform: rotate(-45deg);
		border-left: 1px solid #999;
		border-top: 1px solid #999;
	}
	.newadd{
		position: absolute;
		bottom: 0;
		background: rgb(237,91,0);
		color: #fff;
	}
	.citybg{
		background: #cccccc82;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 998;
	}
	.addadd{
		position: absolute;
		top: 52px;
		width: 100%;	
	}
	.addadd1{
		width: 80%;
		height: 40px;
		padding: 10px 10% 10px 10%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f6f6f6;
	}
	.addadd1txt{
		width: 30%;
		text-align: left;
	}
	.addadd2txt{
		width: 50%;
	}
	.addadd1ipt{
		width: 70%;
		height: 2em;
		font-size: 0.9em;
		border: 0px solid #e4e4e4;
		text-indent:1em;
	}
	.dzitem{
		width: 90%;
		margin: 62px 5% 10px 5%;
		font-size: 0.9em;
		z-index: 600;
	}
	.dzli{
		width: 100%;
		border:1px solid #f2f2f2;
		margin-bottom: 1em;
	}
	.dztop,.dzbot{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		margin: 0 5%;
	}
	.dztop{
		height: 2em;
		padding: 0.2em 0.3em;
		line-height: 2em;
		border-bottom:1px solid #f2f2f2;
	}
	.dzbot{
		height: 4em;
		line-height: 2em;
		text-align: left;
		padding: 0.4em 0.3em;
		font-size: 0.9em;
	}
	.dzimg{
		height: 7px;
		width: 7px;
		transform: rotate(135deg);
		border-left: 1px solid #999;
		border-top: 1px solid #999;
		pointer-events: none;
	}
	.dzname{
		color: #ff6700;
		width: 23%;
		text-align: left;
		margin-left: 3%;
	}
	.dzsj{
		text-align: left;
		width: 60%;
	}
	.dzdel{
		width: 13%;
		text-align: left;
		color: #999;
	}
	.dzadd{
		width: 75%;
		margin-left: 2%;
		pointer-events: none;
	}
	.ddmr{
		color: #ff6700;
		font-size: 0.8em;
		margin-left: 0.8em;
	}
</style>