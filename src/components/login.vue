<!-- 登录组件
手机号码限定:11位,数字
短信验证码限定:6位,数字 -->
<template>
	<div class="loginbox">
		<div class="lgtop">
			<img src="static/img/loginico.png" class="lgtopimg">
			<div class="lgtoptxtbox">{{lgpagectt.lgtoptxt}}</div>
		</div>
		<!-- 手机号登录块 -->
		<div :class="{lgbk1:lgblock=='lgblock1',lgbk2:lgblock!='lgblock1'}">
			<div class="lginput1">
				<div class="lg86box" :class='{lg86box1:isplay}'>
					<div class="lg86">+86</div>
					<div class="lgico"></div>
				</div>
				<input type="text" class="lgipt" v-bind:placeholder="lgpagectt.lgipttxt" ref='lgipt1'  maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" @focus="errmsgshow">
			</div>
			<div class="lginput2">
				<input type="text" class="lgdx" v-bind:placeholder="lgpagectt.txtlgdx" ref='lgipt2' maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')">
				<!-- 验证码 -->
				<div class="lgyzm" @click='lggvcode' :class="{lgyzm1:lgcxfs,lgyzm2:!lgcxfs}">{{lgpagectt.lgyzmtxt}}</div>
			</div>
			<!-- 错误信息 -->
			<div class="lgerrbox" v-if='lgpnmiserr'>{{lgpagectt.lgerrmsg}}</div>
			<div class="lglgbtn" @click='yzmlogin'>{{lgpagectt.lglgbtntxt}}</div>
			<div class="lgupbtn" @click='flgblock' id='lgblock2'>{{lgpagectt.lgupbtntxt}}</div>
		</div>
		<!-- 用户名登录块 -->
		<div :class="{lgbk1:lgblock=='lgblock2',lgbk2:lgblock!='lgblock2'}">
			<div class="lginput1">
				<input type="text" class="lgipt" v-bind:placeholder="lgpagectt.lgipttxt1" ref='lgipt3'>
			</div>
			<div class="lginput2">
				<input type="password" class="lgdx" v-bind:placeholder="lgpagectt.txtlgdx1" ref='lgipt4'>
			</div>
			<div class="lgerrbox" v-if='lgpnmiserr'>{{lgpagectt.lgerrmsg}}</div>
			<div class="lglgbtn" @click='namelogin'>{{lgpagectt.lglgbtntxt1}}</div>
			<div class="lgupbtn" @click='flgblock' id='lgblock1'  @focus="errmsgshow">{{lgpagectt.lgupbtntxt1}}</div>
		</div>				
		<div class="lgyy" @click='lgyyxz'>
			<div class="lgyyjt" :class="{lgyy0:lgpageyy=='jt',lgyy1:lgpageyy!='jt'}">简体</div>
			<div class="lgyyft" :class="{lgyy0:lgpageyy=='ft',lgyy1:lgpageyy!='ft'}">繁体</div>
			<div class="lgyyew" :class="{lgyy0:lgpageyy=='ew',lgyy1:lgpageyy!='ew'}">English</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex'

export default{
	computed:{
		...mapGetters(['remdmsg','iseq','username','pageTLD'])
	},
	watch:{
		remdmsg(){
			console.log(this.remdmsg);		
		},
		username(){
			console.log(this.username);
		}
	},
	data(){
		return{
			retime:60,//重新发送
			lgpageyy:'jt',//字体选择
			lgpagectt:'',//绑定的字体
			lgblock:'lgblock1',//登录块显示lgblock1块
			lgname:'',//需要登录用户名或手机号
			isplay:true,//86动画是否可播放
			lgpnmiserr:false,//是否显示错误信息
			lgcxfs:false,//是否重新发送
			lgpagetxt:{	//字体内容			
				jt:{
					lgtoptxt:'小米账号登录',
					lgipttxt:'手机号码',
					lgipttxt1:'邮箱/手机号码/小米ID',
					txtlgdx :'短信验证码',
					txtlgdx1:'密码',
					lgyzmtxt:'获取验证码',
					lglgbtntxt:'立即登录/注册',
					lglgbtntxt1:'登录',
					lgupbtntxt:'用户名密码登录',
					lgupbtntxt1:'手机短信登录/注册',
					lgerrmsg:'!错误的手机号'
				},
				ft:{
					lgtoptxt:'小米帳號登入',
					lgipttxt:'手機號碼',
					lgipttxt1:'E-mail/手機號碼/小米ID',
					txtlgdx :'短信驗證碼',
					txtlgdx1:'密碼',
					lgyzmtxt:'獲取驗證碼',
					lglgbtntxt:'立即登錄/注冊',
					lglgbtntxt1:'登入',
					lgupbtntxt:'用戶名密碼登錄',
					lgupbtntxt1:'手機短信登錄/注冊',
					lgerrmsg:'!錯誤的手機号'
				},
				ew:{
					lgtoptxt:'Sign in to your Mi Account',
					lgipttxt:'Phone number',
					lgipttxt1:'Email/Phone/Mi Account',
					txtlgdx :'Verification code',
					txtlgdx1:'Password',
					lgyzmtxt:'Get verification code',
					lglgbtntxt:'Sign in/Sign up',
					lglgbtntxt1:'Sign in',
					lgupbtntxt:'Sign in with password',
					lgupbtntxt1:'Sign in with SMS',
					lgerrmsg:'!error phoneNumber'
				}
			}
		}
	},
	methods:{
		...mapActions(['getvCode','compCode','lglogin','updataPageName']),
		// 是否显示错误信息
		errmsgshow:function(e){
			if(this.lgpnmiserr){
				this.$refs.lgipt1.value = '';
				this.lgpnmiserr = false;
			}			
		},
		// 获取验证码
		lggvcode:function(){
			var pnum = this.$refs.lgipt1.value,
				cftime = this.retime;//					
			//手机号码正确				
			if(pnum.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)){
				this.lgcxfs = true;
				this.lgname = pnum;
				this.lgpagectt.lgyzmtxt = cftime+'s';
				var st = setInterval(function(){
					cftime--;
					this.lgpagectt.lgyzmtxt = cftime+'s';
					if(cftime<1){
						switch(this.lgpageyy){
							case 'jt':
								this.lgpagectt.lgyzmtxt = '重新发送';
								break
							case 'ft':
								this.lgpagectt.lgyzmtxt = '重新發送';
								break
							case 'ew':
								this.lgpagectt.lgyzmtxt = 'send agin';
						}
						this.lgcxfs = false;
						clearInterval(st)
					}
				}.bind(this),1000)
				this.lgpnmiserr = false;
					this.getvCode()
				return
			}
			this.lgpnmiserr = true;			
		},
		//字体改变方法并移除86动画属性
		lgyyxz:function(e){
			this.isplay = false;
			switch(e.target.innerText){
				case '简体':
					this.lgpageyy = 'jt';
					this.lgpagectt = this.lgpagetxt.jt;	
					break
				case '繁体':
					this.lgpageyy = 'ft';
					this.lgpagectt = this.lgpagetxt.ft;
					break
				case 'English':
					this.lgpageyy = 'ew';
					this.lgpagectt = this.lgpagetxt.ew;					
					break
			}
			this.sett()
		},
		//添加86动画属性,必须延时
		sett:function(){
			setTimeout(function(){
				this.isplay = true;
			}.bind(this),100)
		},
		// 登录方式选择
		flgblock:function(e){
			this.errmsgshow()
			this.lgblock = e.target.id;
		},
		// 验证码登录
		yzmlogin:function(){
			var v1 = this.$refs.lgipt1.value,
				v2 = this.$refs.lgipt2.value,
				case1 = v1.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/);
				this.compCode(v2);
			if(!case1){//手机号错误
			 	this.errmsgshow()
			 	return			
			}else if(!this.iseq){//验证码不匹配
				this.lgpnmiserr = true;
				this.lgpagetxt.jt.lgerrmsg = '!验证码错误';
				this.lgpagetxt.ft.lgerrmsg = '!驗證碼錯誤';
				this.lgpagetxt.ew.lgerrmsg = '!error Verification';
				this.lgpagectt = this.lgpagetxt.jt;
				return				
			}else{
				this.lgpnmiserr = false;
				sessionStorage.setItem("miUserName",this.lgname)
				this.lglogin(this.lgname)
				
				this.$router.push({path:'/index/tuijian'})
				// this.updataPageName('pageindex')				
			}
		},
		namelogin:function(){
			var v3 = this.$refs.lgipt3.value,
				v4 = this.$refs.lgipt4.value;
			if(v3 && v4){
				console.log(v3);
				console.log(v4);
			}
		}
	},
	mounted:function(){
		this.updataPageName('pagelogin')
		console.log(this.pageTLD);
		this.lgpagectt = this.lgpagetxt.jt;
	}
}
	
</script>
<style scoped>
@keyframes lg86{
  from{transform: translate3d(-20px,0,0);}
  to{transform: translate3d(0,0,0);}
}
	.loginbox{
		width: 100%;
		max-width: 720px;
		height: 100%;
		font-size: 0.3em;		
	}
	.lgtop,.lginput1,.lginput2{
		width: 100%;
	}
	.lgtop{
		margin: 1.5em auto 1.8em auto;
		font-size: 1.1em;
	}
	.lgtopimg{
		margin: 10px auto;
	}
	.lgtoptxtbox,.lginput1,.lginput2,.lglgbtn,.lgupbtn{
		height: 1.2em;
		line-height: 1.2em;
	}
	.lginput1,.lginput2{
		display: flex;
		width: 80%;
		margin: 0 auto;
		padding: 15px;
		font-size: 1.1em;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid #d3d3d3;
		color: #9b9b9b;
		overflow: hidden;
	}
	.lginput2{
		margin-bottom: 2em;
	}
	.lg86box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 1em;		
	}
	.lg86box1{
		animation: lg86 0.3s;
	}
	.lgico{
		width: 8px;
		height: 8px;
		border-top: 1px solid #888;
		border-right: 1px solid #888;
		transform: rotate(45deg);
	}
	.lgipt{
		font-size: 1em;
		border-width: 0;
	}
	.lgdx{
		font-size: 1em;
		border-width: 0;
		width: 50%;
	}
	.lgyzm{
		font-size: 0.8em;	
		margin-left: 1.7em;
		width: 50%;
	}
	.lgyzm2{
		color: #2ea5e5;
	}
	.lgyzm1{
		color: #ccc;
		pointer-events: none;
	}
	.lglgbtn,.lgupbtn{
		width: 80%;
		padding: 10px;
		margin: 1em auto;
		border: 1px solid #ff6700;
		border-radius: 8px;
	}
	.lglgbtn{
		background: #ff6700;
		color: #fff;
	}
	.lgyy{
		position: absolute;
		left: 30%;
		bottom: 10%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 0.8em;
		width: 40%;
	}
	.lgyy0{
		color: #000;
		transition: color 0.2s;
	}
	.lgyy1{
		color: #ccc;
		transition: color 0.2s;
	}
	.lgyyjt,.lgyyft{
		border-right: 1px solid #ccc;
		padding-right: 1em;
		height: 1em;
		line-height: 1em;
	}
	.lgbk1{
		display: block;
	}
	.lgbk2{
		display: none;
	}
	.lgerrbox{
		margin: -1em auto 0 auto;
		width: 80%;
		text-align: left;
		color: red;
	}
</style>