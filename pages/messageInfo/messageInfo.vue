<template>
  <scroll-view scroll-y="true" 
                :scroll-with-animation="scrollAnimation" 
				:scroll-into-view="scrollToView" class="message-contain">
    <view class="nav-bar-contain" v-if="isAddPage">
        <view :style="topBarStyle"></view>
        <view class="user-info">
            <image @click="goBack" class="go-back" src="../../static/arrow-left.png"></image>
            <view class="user">
                <image class="user-img" src="../../static/personal.png"></image>
                <view class="number">+86 {{user}}</view>
            </view>
        </view>
    </view>
    <view class="new-nav-contain" v-if="!isAddPage">
        <view :style="topBarStyle"></view>
        <view class="title-box">
            <view class="title">新信息</view>
            <view class="cancel" @click="goBack">取消</view>
        </view>
    </view>
    <view class="post-user" :style="!isAddPage? msgTop : ''">
        <view class="number-list">
            <view class="num-item" v-for="item in numberList">{{item}}</view>
        </view>
        <view class="opt-areas"><view class="title">收件人：</view>
            <view class="input-box">
                <input class="uni-input" v-model="numberItem"/><image class="add-btn" @click="addNumber" src="../../static/addbtn.png"></image>
            </view>
        </view>

    </view>
    <scroll-view   class="msg-box" :style="isAddPage? msgTop : ''" ref="chatBox">
        <view class="tips">
            <view>短信</view>
            <view>{{messageList[0] ? formatDate(messageList[0].createdAt) : ''}}</view>
        </view>
        <view class="msg-items">
            <view></view>
            <view :class="item.msgType === 'img' ? 'bubble-imgs' : 'bubble'" v-for="(item, index) in messageList" :id="`msg-${index}`">
                <image mode="widthFix" class="bubble-img" :src="item.msg" v-if="item.msgType === 'img'"></image>
                <view class="msg-text" v-if="item.msgType === 'msg'">{{item.msg}}</view>
                <!-- <view class="post-msg" v-if="index === messageList.length-1">已送达</view> -->
            </view>
        </view>
    </scroll-view>
    <view class="bottom-contain">
        <view class="option-area">
            <view class="opt">
                <image @click="chooseImage" class="opt-img" src="../../static/photo.png"></image>
                <image class="opt-img" src="../../static/appstore.png"></image>
            </view>
            <view class="input-box">
			    <input class="uni-input" confirm-type="send" v-model="inputText" @confirm="sendText" placeholder="短信"/><image class="audio-btn" src="../../static/audio.png"></image>
	        </view>
        </view>
        <view class="bg"></view>
    </view>
  </scroll-view>
</template>

<script>
import API from '../../api/index'
import moment from 'moment';
export default {
    data(){
        return{
            images: [],
            isAddPage: false,
            numberList: [],
            numberItem: "",
            inputText: "",
            messageList: [],
            user: "",
            scrollToView: "msg-0",
            scrollViewH: "",
            scrollAnimation: true
        }
    },
    computed: {
    // 计算顶部区域样式对象
			topBarStyle() {
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight // 获取状态栏高度
			// let topBarHeight = menuButton.top + menuButton.height + 8 - statusBarHeight // 计算顶部安全高度
				return {
					paddingTop: statusBarHeight + 8 + 'px', // 设置顶部区域高度为安全高度值
					backgroundColor: '#f5f5f5', // 设置背景色为白色
				}
			},
            msgTop(){
                let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
                let top = this.isAddPage ? 150 : 110
                return {
                    paddingTop: top + 'px'
                }
            },
		},
        onLoad(e){
            if(e.userId){
                this.isAddPage = true
                this.user = e.userId
            } else {
                this.isAddPage = false
            }
        },
        onShow(){
            this.getData()
        },
        methods: {
            goBack(){
                uni.navigateBack()
            },
            scrollToBottom() {
                 this.$nextTick(()=>{
                    this.scrollAnimation = false
                    this.scrollToView = `msg-${this.messageList.length-1}`
                    console.log('=scrollToView', this.scrollToView);
                 })
            
            },
            formatDate(dates) {
                const today = moment();
                const dateObj = moment(dates);
                if (dateObj.isSame(today, 'day')) {
                    return `今天 ${dateObj.format('hh:mm')}`;
                } else if (dateObj.isSame(today.clone().subtract(1, 'day'), 'day')) {
                    return `昨天 ${dateObj.format('hh:mm')}`;
                } else {
                    return dateObj.format('YYYY-MM-DD hh:mm');
                }
            },
            async getData(){
                let res = await API.createMsgDetail({
                    userId: uni.getStorageSync('user'),
                    userNumber: this.user || this.numberItem
                })
                console.log('00de', res);
                this.messageList = res.data.data || []
                this.scrollToBottom()
            },
            async chooseImage() {
                let _this = this
                uni.chooseImage({
                    count: 1, // 最多可以选择的图片数量
                    success: async (res) => {
                        _this.images = res.tempFilePaths[0]
                        let items = await API.createMsg({
                        userList: _this.numberList.length ? JSON.stringify(_this.numberList) : '',
                        userNumber: _this.user || _this.numberItem,
                        userId: uni.getStorageSync('user'),
                        msg: _this.images,
                        msgType: "img"
                    })
                    console.log('====tiems', items);
                    await this.getData()
                    this.scrollToBottom()
                }
            })
            },
            addNumber(){
                this.numberList.push(this.numberItem)
                this.numberItem = ''
            },
            async sendText(event) {
                // this.messageList.push({
                //     msgtype: "msg",
                //     msg: event.target.value
                // })
                console.log('===this', JSON.stringify(this.numberList));
                let res = await API.createMsg({
                    userList: this.numberList.length ? JSON.stringify(this.numberList) : '',
                    userNumber: this.user || this.numberItem,
                    userId: uni.getStorageSync('user'),
                    msg: this.inputText,
                    msgType: "msg"
                })
                await this.getData()
                this.inputText = ""
                this.scrollToBottom()
            },
        },
}
</script>

<style lang="less" scoped>
@import "./messageInfo.less";

</style>