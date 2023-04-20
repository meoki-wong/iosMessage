<template>
	<view class="content">
		<view class="options" :style="optionsTop">
			<view class="edit" @click="endMsg">{{isShowCheck? "完成" : "编辑"}}</view>
			<image class="add-msg" @click="addMsg" src="../../static/addmsg.png" alt=""></image>
		</view>
		<view class="title" :style="topBarStyle">信息</view>
		<view class="input-box">
			<icon type="search" size="14"/><input class="uni-input" placeholder="搜索"/>
		</view>
		<view class="message-list">
			<checkbox-group class="uni-list" @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in userMsgList" :key="index">
						<view v-if="isShowCheck">
							<checkbox :id="item.userNumber" :value="item.userNumber" :checked="item.checked"></checkbox>
						</view>
						
							<label class="label-2-text" :for="item.userNumber">
								<image class="imgs" src="../../static/personal.png"></image>
							</label>
						<view class="right-contain" @click="msgItem(item.userNumber)" @longpress="longpressEditMsg">
							<view class="right">
								<view class="top-number">
									<text class="number">{{item.userNumber}}</text>
									<view class="time-box">
										<text class="time">{{`${item.time.split(' ')[1].split(':')[0]}:${item.time.split(' ')[1].split(':')[1]}`}}</text>
										<image class="arrow" src="../../static/arrow.png"></image>
									</view>
								</view>
								<view class="desc">
									{{item.msgType == 'msg' ? item.msg : item.msgType == 'img' ? "附件：1个图象" : ''}}
								</view>
							</view>
						</view>
					</label>
				</checkbox-group>
		</view>
		<view class="del-options" v-show="isShowDelBtn">
			<view class="read">{{checkList.length? '未读信息' : '全部已读'}}</view>
			<view class="del" @click="showDelDialog" :style="checkList.length? 'color: #0a7be5' : 'color: #aaa'">删除</view>
		</view>

		<view>
		<u-action-sheet @select="selectItem" @close="show=false" :actions="list" :title="title" cancelText="取消" :show="show" :closeOnClickOverlay="true" :closeOnClickAction="false"></u-action-sheet>
	</view>
	</view>
</template>

<script>
import API from '../../api/index'
	export default {
		data() {
			return {
				title: 'Hello world',
				isShowCheck: false,
				radioItems: [{
					title: "12"
				}],
				userMsgList: [],
				checkList: [],
				isShowDelBtn: false,
				title:'这些对话将删除。',
				list: [
					{
						name:'删除',
					},
				],
				show: false
			}
		},
		computed: {
    // 计算顶部区域样式对象
			topBarStyle() {
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight // 获取状态栏高度
				return {
					marginTop: statusBarHeight + 28 + 'px', // 设置顶部区域高度为安全高度值
					backgroundColor: 'white', // 设置背景色为白色
				}
			},
			optionsTop(){
				let statusBarHeight = uni.getSystemInfoSync().statusBarHeight // 获取状态栏高度
				return {
					paddingTop: statusBarHeight + 8 + 'px', // 设置顶部区域高度为安全高度值
					paddingTop: statusBarHeight + 20 + 'px'
				}
			}
		},
		onLoad() {

		},
		onShow(){
			this.getData()
		},
		methods: {
			showDelDialog(){

				if(this.checkList.length){
					this.show = true
				}
			},
			radioChange(e){
				this.checkList = e.detail.value
			},
			endMsg(){
				this.isShowCheck = !this.isShowCheck
				if(this.isShowCheck){
					this.isShowDelBtn = true
				} else {
					this.isShowDelBtn = false
				}
			},
			async editMsg(){
				if(this.isShowCheck){
					let res = await API.delMsg({
						userId: uni.getStorageSync('user'),
						list: JSON.stringify(this.checkList)
					})
					if(res.data.success){
						this.getData()
					}
				}
				this.checkList = []
				if(!this.checkList.length){
					this.isShowDelBtn = false
					this.isShowCheck = false
					this.show = false
				}
				
			},
			selectItem(item){
				this.editMsg()
			},	
			longpressEditMsg(){
				this.isShowCheck = true
				this.isShowDelBtn = true
			},
			msgItem(item){
				uni.navigateTo({
					url: `/pages/messageInfo/messageInfo?userId=${item}`,
				});
			},
			addMsg(){
				uni.navigateTo({
					url: "/pages/messageInfo/messageInfo"
				})
			},
			async getData(){
				let res = await API.findUserList({
					userId: uni.getStorageSync('user')
				})
				this.userMsgList = res.data.data || []
			}
		}
	}
</script>

<style lang="scss">
*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
/deep/  .uni-actionsheet__title{
    font-size: 28rpx!important;
    font-weight: 400;
    color: #dbdbdb;
} 
	@import "./index.less";

/deep/.u-action-sheet__header__title {
	font-size: 28rpx;
	color: #aaa;
	font-weight: 400;
}
/deep/.u-action-sheet__item-wrap__item{
	border-top: 1px solid #dbdbdb;
	.u-action-sheet__item-wrap__item__name{
		color: #fc382b;
		font-size: 40rpx;
		font-weight: 400;

	}
}
/deep/.u-transition{
	// background: rgba(0,0,0,.2)!important;
}
/deep/.u-popup__content{
	background-color: rgba(0, 0, 0, 0);
	border-radius: 14px;
	overflow: hidden;
	margin: 0 10px 20px;
	.u-action-sheet{
		background-color: rgba(0, 0, 0, 0);
	}
	.u-action-sheet__header{
		background-color: #eff0f0!important;
		border-radius: 14px 14px 0 0;
	}
	.u-gap{
		// color: #cccccc;
		height: 10px!important;
		opacity: 0;
		// background: rgba(0, 0, 0, 0);
	}
	.u-action-sheet__item-wrap__item{
		border-radius: 14px;
		background-color: #eff0f0;
		border-radius: 0 0 14px 14px;
		
	
	}
	.u-action-sheet__cancel-text{
		background-color: #eff0f0;
		border-radius: 14px;
		color: #0476fe;
		font-size: 40rpx;
		font-weight: 400;
	}
	
}
/deep/.uni-checkbox-input-checked{
		color: #eff0f0!important;
		background-color: #007aff!important;
	}
</style>
