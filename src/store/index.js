import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
	remdico:'',//消息框图标
	remdmsg:'',//消息框内容
	pageTLD:'pageindex',//页面一级分类名
	lastTLD:'',//上一次点击的页面一级分类名->底部动画时使用
	nowpage:'tuijian',//页面二级分类名
	nowpages:[],//index二级页面名数组
	nowgoods:"",//
	goodsdetail:"",//商品详情
	shopCar:[],//购物车
	username:sessionStorage.getItem('miUserName')?sessionStorage.getItem('miUserName'):'',//用户名或手机号
	vcode:'',//验证码
	iseq:'',//验证码是否相同
	uid:'xiaomi',//用户名
	upsw:'xiaomi666',//密码
	addmsg:{}//收件信息，名字，电话，地址
}
//模块注册
const store = new Vuex.Store({
	state,//共享的数据或状态
	getters,//获取数据并渲染
	actions,//数据的异步操作
	mutations//处理数据的唯一途径
})

export default store