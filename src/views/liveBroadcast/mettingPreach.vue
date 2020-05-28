<template>
	<div class="notice_detail">
		<div class="enclosure-content" >
			<ul class="flex " >
				<li class="flex flex_y_center" v-for="(i,k) in enclosureList" :key="k">
					<v-icon :icon-class="'icon-'+i.icon" class-name="icons"></v-icon>
					<h1>{{i.text}}</h1>
					<div v-if="i.shop" @click="removeBtn(i.id)">
						<v-icon icon-class="icon-shanchu" class-name="edit"></v-icon>
					</div>
					<a :href="fileAddress">点击下载</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataInfo: "", 
			enclosureList:[
				{id:0,text:"简历/林子墨/美术老师.PDF",icon:"hongPdf",shop:false},
				// {id:1,text:"简历/林子墨/美术老师.PDF",icon:"lanPdf",shop:false},
				// {id:2,text:"简历/林子墨/美术老师.PDF",icon:"lvPdf",shop:false},
			],
			fileAddress:"#"
		};
	},
	methods: {
		async init(id) {
			// let Culum = await this.service.doubleElection.jobfairDetail({
			//   id: id
			// });
			// this.dataInfo = formatContent(Culum.data.remarks);
		}
	},
	created() {
		this.init(this.$route.params.id);
	}
};
</script>

<style lang="scss" scoped>
.notice_detail {
	padding: 20px;
	background-color: #ffffff;
	.enclosure-content{
		padding:15px 0 22px 24px;
		ul{
			height: 20px;
			li{
				height: 20px;  
				width: 30%;
				.icons{
					width:13px;
					height: 16px;
				}
				h1{
					padding-left: 10px;
				}
				a{
					margin-left: 8px;
					font-size:14px;
					font-family:MicrosoftYaHeiUI;
					line-height:18px;
					color:rgba(82,134,255,1);
					opacity:1;
					cursor: pointer;
				}
			}
		}
	}
}
</style>