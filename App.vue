<script>
	export default {
		onLaunch: function() {
    		// 全局路由转场动画设置
			uni.onPageNotFound(function(res) {
			if (res.path) {
				// 使用 uni.redirectTo 跳转页面时，使用右侧滑入，左侧滑出的转场动画
				if (res.delta === 1) {
				Vue.prototype.$transition = 'slide-right'
				uni.redirectTo({url: res.path})
				} else {
				// 使用 uni.navigateTo 跳转页面时，使用左侧滑入，右侧滑出的转场动画
				Vue.prototype.$transition = 'slide-left'
				uni.navigateTo({url: res.path})
				}
			}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>

@import "uview-ui/index.scss";
@font-face {
    font-family: "iosFont";
    src: url('/static/css/font.ttf');
  }
// @import "./static/css/font.less";
	/*每个页面公共css */
	body{
		font-family: iosFont;
	}
</style>
