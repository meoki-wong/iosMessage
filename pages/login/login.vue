<template>
    <view class="login-box">
        <view class="input-box">
                <input class="uni-input" v-model="loginVal"/>
                <button @click="login">登录</button>
            </view>
    </view>
</template>

<script>
import API from '../../api/index'
export default {
    data(){
        return {
            loginVal: ""
        }
    },
    onShow(){
        let user = uni.getStorageSync('user')
			if(user){
				uni.navigateTo({
						url: `/pages/index/index`,
					});
			} 
    },
    methods: {
        async login(){
            let res = await API.createUser({userId: this.loginVal})
            if(res.data.success){
                uni.setStorageSync('user', this.loginVal)
                this.loginVal = ''
                uni.navigateTo({
					url: `/pages/index/index`,
				});
                
            } else {
                uni.showToast({
                    type: 'error',
                    title: "错误",});
            }
            
        }
    }
}
</script>

<style>
.input-box{
    margin-top: 50px;
}
</style>