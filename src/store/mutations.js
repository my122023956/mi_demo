export const getterdata = (state,data) =>{
	state.nowpage = data;
}
export const getgoodsdetail = (state,name) =>{
	state.nowgoods = name;		
}
//加入购物车
export const joinShopCar = (state,data)	=>{
	// 检查购物车中是否存在此商品
	for(var i=0,j=state.shopCar.length;i<j;i++){
		// 存在此商品
		if(state.shopCar[i].goodstype == data.goodstype){
			//检查数量是否大于最大购买数量
			if(state.shopCar[i].goodsnum+data.goodsnum>5){
				state.remdmsg = '不能买多了哦';
				console.log('不能买多了哦');
				return
			}
			//检查商品颜色是否一样
			if(state.shopCar[i].goodscolor == data.goodscolor){
				state.shopCar[i].goodsnum = state.shopCar[i].goodsnum+data.goodsnum;
				console.log('已添加数量');
				state.remdmsg = '已添加数量';
				return				
			}			
			state.shopCar.push(data);
			state.remdmsg = '成功加入购物车';
			return
		}
	}
	// 不存在此商品
	state.shopCar.push(data);
	state.remdico = 'ok';
	state.remdmsg='成功加入购物车';
}

//清空提醒信息
export const clearRemdMsg = (state,name) =>{
	state.remdico = '';	
	state.remdmsg = '';		
}

//删除购物车内的一条商品
export const fdelgoods = (state,name) =>{
	for(var i=0,j=state.shopCar.length;i<j;i++){
		if(state.shopCar[i].goodstype == name){
			state.shopCar.splice(i,1);
			state.remdico='ok';
			state.remdmsg='删除成功';
			return
		}
	}
}
//更新页面一级分类名
export const updataPageName = (state,name) =>{
	state.lastTLD = state.pageTLD;
	state.pageTLD = name;
	// console.log(name);
}
//生成6位数验证码,60s有效时间
export const getvCode = (state,name) =>{
	var num =  parseInt(Math.random()*1000000),i=0;
	setTimeout(function(){
		state.vcode = false;
	},60000);
	while(num<100000){
		num =  parseInt(Math.random()*1000000);
	}
	state.vcode = num;
	console.log('您此次的验证码为:'+num);
}
//比较验证码是否相同
export const compCode = (state,name) =>{
	state.iseq = false;
	if(state.vcode == name){
		state.iseq = true;
	}else{
		state.iseq = false;
	}
}
// 登录
export const lglogin = (state,name) =>{
	state.username = name;
	state.remdico = 'ok';
	state.remdmsg = '登录成功';
}
//更新index2级页面名数组
export const uplvtwopage = (state,name) =>{
	state.nowpages = name;
}

//消息框
export const sendmsg = (state,name) =>{
	state.remdmsg = name[0];
	if(!name[1]){
		state.remdico = '';
	}else{
		state.remdico = name[1];
	}	
}
//城市选择
export const sjmsg = (state,name) =>{
	state.addmsg = name;	
}