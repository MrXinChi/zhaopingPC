<template>
	<div class="detail_container">
		<v-content>
			<div slot="content" class="wrapper">
				<div class="header flex flex_x_bten">

					<div class="content-left">
						<v-notice :routerArray="routerArray" title="招聘信息" @backLink="backLink"></v-notice>
						<div @click="tycBtn" class="tuijian flex flex_center fs16 cu_p">精准推荐</div>
						<v-hot-header v-if="!unitShow" hotzhiShow :preach="preach" :employingArray="employingArray" :hotzhiArray="hotzhiArray" :hotNewsArray="hotNewsArray" title="热门职位" @detail="detail"></v-hot-header>
						<v-hot-header v-if="unitShow" hotzhiShow :preach="preach" :employingArray="employingArray" :hotzhiArray="hotzhiArray" :hotNewsArray="hotNewsArray" title="推荐用人单位" @detail="detail"></v-hot-header>
					</div>

					<div class="content-right">
						<router-view></router-view>
					</div>

				</div>
			</div>
		</v-content>
		<!-- <v-frame-company ref="frame"></v-frame-company> -->
		<v-frame-gzh ref="frame"></v-frame-gzh>
	</div>
</template>

<script>
const Foo = {
	template: `...`,
	beforeRouteUpdate (to, from, next) {
		// 在当前路由改变，但是该组件被复用时调用
		// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		// 可以访问组件实例 `this`
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
			vm.routerArray=[];
			// 通过 `vm` 访问组件实例
		})
	}
}
export default {
	data() {
		return {
			unitShow:false,
			routerArray: [{
					name: '招录公告',
					link: '/recruitmentInformation/notice'
				},
				{
					name: '招聘职位',
					link: '/recruitmentInformation/position'
				},
				{
					name: '用人单位',
					link: '/recruitmentInformation/unit/'
				},
			],
			hotNewsArray:[
				{title:'关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',time:'2019-09-25'},
				{title:'关于用人单位招聘我校毕业生、到我校举办宣讲会的流程公告',time:'2019-09-25'}
			],
			hotzhiArray:[
				{name:'初中数学老师',Price:'6k-10k'},
				{name:'初中数学老师',Price:'6k-10k'},
				{name:'初中数学老师',Price:'6k-10k'}
			],
			employingArray:[
				{name:1},
				{name:1},
				{name:1}
			],
			preach:[
				{title:'第一条測試數據'},
				{title:'第二條測試數據哈哈哈哈哈哈哈哈'},
				{title:'第三條条'}
			]
		}
	},
	methods:{
		backLink(){ 
			// this.unitShow=true;
			this.unitShow=false;
			if(this.routerArray.length==3){
				this.routerArray.pop();
			}
		},
		detail(id){
			this.$router.push(`/recruitmentInformation/detail/${id}`)
		},
		tycBtn(){
			this.$refs.frame.frameShow = true
			document.querySelector('html').style.overflow = "hidden"
		},
		async init(index){
			let deliverData=await this.service.recruitment.joblist({
				jobtype:1,
				page:index,
				size:5
			});
			this.hotzhiArray=deliverData.data.list;
		}
	},
	created(){
		if(this.$route.params.id!=undefined){
			this.unitShow=true;
		}else{
			this.backLink();
		}
		this.init(1);
	}
}
</script>

<style scoped="scoped" lang="scss">
.detail_container {
	.wrapper {
		.header {
			.content-left {
				width: 280px;
				height: 100%;
				margin-bottom: 20px;
			}
			.content-right {
				width: 880px;
				height: 100%;
				padding-bottom: 20px;
			}
		}
	}
	.tuijian{
		width: 100%;
		height: 56px;
		color: #262626;
		background: #fff;
		padding: 24px 0;
	}
}
</style>