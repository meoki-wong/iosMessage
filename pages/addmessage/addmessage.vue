<template>
  <view class="message-contain">
    <view class="nav-bar-contain">
        <view :style="topBarStyle"></view>
        <view class="user-info">
            <image @click="goBack" class="go-back" src="../../static/arrow-left.png"></image>
            <view class="user">
                <image class="user-img" src="../../static/personal.png"></image>
                <view class="number">+86 15626372637</view>
            </view>
        </view>
    </view>
    <view class="new-nav-contain">

    </view>
    <view class="msg-box" :style="msgTop">
        <view class="tips">
            <view>短信</view>
            <view>今天 11:22</view>
        </view>
        <view class="bubble" v-for="item in 10">
            <image class="bubble-img" src="../../static/personal.png"></image>
        </view>
    </view>
    <view class="bottom-contain">
        <view class="option-area">
            <view class="opt">
                <image @click="chooseImage" class="opt-img" src="../../static/photo.png"></image>
                <image class="opt-img" src="../../static/appstore.png"></image>
            </view>
            <view class="input-box">
			    <input class="uni-input" placeholder="短信"/><image class="audio-btn" src="../../static/audio.png"></image>
	        </view>
        </view>
        <view class="bg"></view>
    </view>
  </view>
</template>

<script>
export default {
    data(){
        return{
            images: []
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
                return {
                    paddingTop: 150 + 'px'
                }
            }
		},
        methods: {
            goBack(){
                uni.navigateBack()
            },
            chooseImage() {
                uni.chooseImage({
                    count: 1, // 最多可以选择的图片数量
                    success: (res) => {
                    console.log(res)
                    this.images = res.tempFiles[0]
                    console.log('---images', this.images);
                    },
                    fail: (err) => {
                    console.log(err)
                    }
                })
            }
        },
}
</script>

<style lang="less" scoped>
@import "./addmessage.less";

</style>