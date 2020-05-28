<template>
	<div class="containers_">
		<div class="search flex flex_y_center">
			<div class="didian">地点</div>
			<div class="select-item1">
				<el-select v-model="province" placeholder="省">
				    <el-option v-for="item in provinceList" :key="item.id" :label="item.region_name" :value="item.id"> </el-option>
				</el-select>
			</div>
			<div class="select-item2">
				<el-select v-model="city" placeholder="市" 	:disabled="province!=''?false:true" >
				    <el-option v-for="item in cityList"  :key="item.id" :label="item.region_name" :value="item.id" > </el-option>
				</el-select>
			</div>
			<div class="zhiwei">职位</div>
			<div class="select-item3">
				<el-select v-model="value" placeholder="请选择职位类别">
				    <el-option v-for="item in options" :key="item.id" :label="item.cate_name" :value="item.id"> </el-option>
				</el-select>
			</div>
			<el-button class="searchBtn flex_center" @click="searchBtn">搜索</el-button>
		</div>
		<div class="detail-list">
			<v-job-list @click="jobBtn" ref="vjoblist"></v-job-list>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			options: [],
			value: '',
			province:'',
			city:'',
			addressList:[],//全部省市列表
			provinceList:[],//省列表渲染
			cityList:[]//市列表渲染
		}
	},
	watch:{
		province(){
			this.city='';
			this.cityList=[];
			for(let i in this.addressList){
				if(this.addressList[i].parent_id==this.province){
					this.cityList.push(this.addressList[i]);
				}
			}
		}
	},
	methods:{
		searchBtn(){
			//  this.$refs.vjoblist.jobtype=1;//1全职，2实习，默认1
			this.$refs.vjoblist.init(1,this.province,this.city,this.value);
		},
		detailsBtn(){
			this.$router.push('/recruitmentInformation/position/positionDetail');
		},
		jobBtn(id){
			this.$router.push(`/recruitmentInformation/detail/${id}`);
		},
		async categoryGetList(){
			// let categoryData=await this.service.home.category({
			// 	type:'hangye'
			// })
			// this.options=categoryData.data.hangye.list;
		},
		async addressGetList(){
			let addressData=await this.service.home.Systemregion();
			if(addressData.code==0){
				for(let i in addressData.data.list){
				if(addressData.data.list[i].parent_id==0){
					this.provinceList.push(addressData.data.list[i]);
				}
			} 
			this.addressList=addressData.data.list; 
			}
			
		}
	},
	created(){
		this.categoryGetList();
		this.addressGetList();
	}
}
</script>

<style scoped="scoped" lang="scss">
.search {
	width: 880px;
	height: 74px;
	border-bottom: 20px solid #F9F9F9;
	background: #fff;
	.select-item1{
		width: 100px;
		margin-left: 10px;
	}
	.select-item2{
		width: 100px;
		margin-left: 20px;
	}
	.select-item3{
		width: 220px;
		margin-left: 10px;
	}
	.didian{
		color: #333333;
		font-size: 14px;
		margin-left: 20px;
	}
	.zhiwei{
		color: #333333;
		font-size: 14px;
		margin-left: 40px;
	}
	.el-button--primary{
		margin-left: 40px;
	}
}
.containers_ {
	min-height: 500px;
}

.detail-list{
	background: #F9F9F9;
}
.searchBtn{
	margin-left: 40px;
	width:68px;
	height:32px;
	background:rgba(82,134,255,1);
	opacity:1;
	border-radius:4px;

	font-size:14px;
	font-family:MicrosoftYaHeiUI; 
	color:rgba(255,255,255,1);
	opacity:1;
	line-height:0;
}
</style>