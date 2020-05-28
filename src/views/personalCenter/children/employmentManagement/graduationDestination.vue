<template>
	<div class="container">
		<div class="content">
			<div class="content-title">毕业去向</div>
			<div class="select">
				<el-radio v-model="radio" label="1">签就业协议形式就业</el-radio>
				<el-radio v-model="radio" label="2">签劳动合同形式就业</el-radio>
				<el-radio v-model="radio" label="3">其他录用形式就业</el-radio>
				<el-radio v-model="radio" label="4">科研助理</el-radio>
				<el-radio v-model="radio" label="5">应征义务兵</el-radio>
				<el-radio v-model="radio" label="6">国家基层项目</el-radio>
				<el-radio v-model="radio" label="7">地方基层项目</el-radio>
				<el-radio v-model="radio" label="8">待就业</el-radio>
				<el-radio v-model="radio" label="9">不就业拟升学</el-radio>
				<el-radio v-model="radio" label="10">其他暂不就业</el-radio>
				<el-radio v-model="radio" label="11">自主创业</el-radio>
				<el-radio v-model="radio" label="12">自由职业</el-radio>
				<el-radio v-model="radio" label="13">升学</el-radio>
				<el-radio v-model="radio" label="14">出国出境</el-radio>
			</div>
		</div>
		<div class="content">
			<div class="content-title">就业信息</div>
			<div class="select">
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						单位名称
					</div>
					<div class="select-item-input"><el-input v-model="UnitnamesValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						组织机构代码
					</div>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="OrganizationcodeValue"></el-input>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						单位性质
					</div>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="UnitpropertyValue"></el-input>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						单位行业
					</div>
					<el-select v-model="UnitindustryValue" placeholder="请选择">
						<el-option v-for="item in Unitindustry" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						工作职位类别
					</div>
					<el-select v-model="JobcategoryValue" placeholder="请选择">
						<el-option v-for="item in Jobcategory" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						单位联系人
					</div>
					<div class="select-item-input"><el-input v-model="Contactperson" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						单位所在地
					</div>
					<div class="option">
						<el-select v-model="provinceValue" placeholder="省">
							<el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-select v-model="cityValue" placeholder="市">
							<el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-select v-model="areaValue" placeholder="区">
							<el-option v-for="item in area" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</div>
				<div class="select-items">
					<div class="select-item-name">
						单位地址
					</div>
					<div class="select-item-input"><el-input v-model="Unitaddress" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						电子邮件
					</div>
					<div class="select-item-input"><el-input v-model="Email" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						传真
					</div>
					<div class="select-item-input"><el-input v-model="Fax" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						邮编
					</div>
					<div class="select-item-input"><el-input v-model="Zipcode" placeholder="请输入内容"></el-input></div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="content-title">报到证信息</div>
			<div class="select">
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						报到证签往单位
					</div>
					<div class="select-item-input"><el-input v-model="Regingunit" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-items">
					<div class="select-item-name">
						<span>*</span>
						签往单位所在地
					</div>
					<div class="select-item-input"><el-input v-model="Chection" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						报到证签发类别
					</div>
					<div class="select-item-input"><el-input v-model="Regisgtype" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						报到证编号
					</div>
					<div class="select-item-input"><el-input v-model="RegiserNo" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						报到起始时间
					</div>
					<div class="select-item-input"><el-input v-model="Checkiime" placeholder="请输入内容"></el-input></div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="content-title">档案信息</div>
			<div class="select">
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						档案转寄单位名称
					</div>
					<div class="select-item-input"><el-input v-model="Nameofngunit" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-items">
					<div class="select-item-name">
						<span>*</span>
						档案转寄单位地址
					</div>
					<div class="select-item-input"><el-input v-model="Addressngunit" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item siMargin">
					<div class="select-item-name">
						<span>*</span>
						档案转寄单位邮编
					</div>
					<div class="select-item-input"><el-input v-model="Postardingunit" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-items">
					<div class="select-item-name">
						户口迁转地址
					</div>
					<div class="select-item-input"><el-input v-model="Accouraddress" placeholder="请输入内容"></el-input></div>
				</div>
			</div>
		</div>
		<div class="content">
			<el-button type="primary">提交</el-button>
		</div>
	</div>
</template>
<script>
import options from "@/utils/options.js";
export default {
	data() {
		return {
			radio: '0',
			UnitnamesValue:'',//单位名称
			OrganizationcodeValue:'',//组织机构代码
			UnitpropertyValue:'',//单位性质
			Unitindustry:options.Unitindustry,
			UnitindustryValue:'',//单位行业
			Jobcategory:options.Jobcategory,
			JobcategoryValue:'',//工作职位类别
			Contactperson:'',//单位联系人
			province:options.province,//省
			provinceValue:'',
			city:options.city,//市
			cityValue:'',
			area:options.area,//区
			areaValue:'',
			Unitaddress:'',//单位地址
			Email:'',//电子邮箱
			Fax:'',//传真
			Zipcode:'',//邮编
			
			Regingunit:'',//报到证签往单位
			Chection:'',//签往单位所在地
			Regisgtype:'',//报到证签发类别
			RegiserNo:'',//报到证编号
			Checkiime:'',//报到起始时间
			
			Nameofngunit:'',//档案转寄单位名称
			Addressngunit:'',//档案转寄单位地址
			Postardingunit:'',//档案转寄单位邮编
			Accouraddress:'',//户口迁转地址
		};
	}
};
</script>
<style lang="scss" scoped>
.container {
	.content {
		background: #fff;
		padding: 20px 20px 10px 20px;
		margin-top: 20px;
		.content-title {
			color: #262626;
			font-size: 16px;
			font-weight: bold;
		}
		.select {
			width: 100%;
			margin-top: 10px;
			.select-item {
				width: 252px;
				display: inline-block;
				.select-item-name {
					color: #262626;
					font-size: 14px;
					margin: 12px 0;
					span {
						color: #f64343;
					}
				}
			}
			.siMargin{
				margin-right: 42px;
			}
			.select-items {
				width: 546px;
				display: inline-block;
				
				.select-item-name {
					color: #262626;
					font-size: 14px;
					margin: 12px 0;
					span {
						color: #f64343;
					}
				}
			}
			.el-radio {
				width: 33.33%;
				margin: 10px 0 10px 0;
			}
		}
	}
	.content:nth-child(1) {
		margin-top: 0;
	}
}
.el-date-editor.el-input,
.el-select {
	width: 100% !important;
}
.option{
	.el-date-editor.el-input,
	.el-select {
		width: 80px !important;
		margin-right: 3px;
	}
}
</style>
