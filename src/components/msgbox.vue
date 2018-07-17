<!-- 消息框 -->
<!-- 接收来自remdmsg的ico图标，msg文本两个值 -->
<template>
	<div class="msgbox" v-show='msg'>
		<img :src='ico' v-show='ico'>
		<span class="msgboxspan">{{remdmsg}}</span>
	</div>
</template>
<script type="text/javascript">
import {mapGetters,mapActions} from 'vuex'

export default{
	data(){
		return{
			okico:'static/img/ok.png',//成功图标
			errico:'static/img/empty.png',//警告图标
			ico:'',//消息框显示图标
			msg:'',//消息框内容
			boxshow:false,
			closetime:1000//消息框关闭时间
		}
	},
	props:['boxmsg'],
	computed:{
		...mapGetters(['remdmsg','remdico'])
	},
	watch:{
		remdico(){
			if(this.remdico){
				switch(this.remdico){
					case 'ok':
						this.ico = this.okico;
						break
					case 'err':
						this.ico = this.errico;
						break
				}
			}
		},
		remdmsg(){
			this.msg = this.remdmsg;
			var time1 = setTimeout(function(){
				this.msg = '';
				this.ico = '';				
				this.clearRemdMsg()
				clearTimeout(time1)
			}.bind(this),this.closetime)
		}
	},
	methods:{
		...mapActions(['clearRemdMsg'])
	}
}
	
</script>
<style scoped>
	.msgbox{
		width: 46%;
		min-height: 20%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-direction: column;
		top: 40%;
		position: fixed;
		left: 27%;
		z-index: 999;
		font-size: 0.3em;
		background: #31313194;
		border-radius: 12px;
		color: #fff;
	}
	.msgbox img{
		width: 40%;
		margin: 1em auto 1em auto;
	}
	.msgbox span{
		display: block;
		padding-bottom: 1em;
	}
</style>