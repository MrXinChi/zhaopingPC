<template>
	<div class="container">
		<div class="header">
			<div class="header-top c_333 fw_b">信息核实</div>
			<div class="flex flex_x_center">
				<div class="header-title flex flex_y_center">
					<i class="el-icon-warning"></i>
					请认证核实个人信息，如有误请联系老师帮你修改。
				</div>
			</div>
		</div>
		<div class="content">
			<div class="content-title">基本信息</div>
			<div class="select flex flex_x_bten flex_warp">
				<div class="select-item">
					<div class="select-item-name">姓名</div>
					<div class="select-item-input"><el-input v-model="name" placeholder="请输入姓名"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">身份证号</div>
					<div class="select-item-input"><el-input v-model="IDnumber" placeholder="请输入身份证号"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						政治面貌
					</div>
					<el-select v-model="PoliticalValue" placeholder="请选择">
						<el-option v-for="item in Political" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						性别
					</div>
					<el-select v-model="genderOptionsValue" placeholder="请选择">
						<el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						民族
					</div>
					<el-select v-model="nationOptionsValue" placeholder="请选择">
						<el-option v-for="item in nationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						出生日期
					</div>
					<el-date-picker v-model="disabledDateValue" type="date" placeholder="选择日期"></el-date-picker>
				</div>
				<div class="select-item">
					<div class="select-item-name">院系</div>
					<div class="select-item-input"><el-input v-model="FacultyanddepartmentValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">专业</div>
					<div class="select-item-input"><el-input v-model="majorValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						专业方向
					</div>
					<div class="select-item-input"><el-input v-model="ProfessionaldirectionValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">学号</div>
					<div class="select-item-input"><el-input v-model="StudentIDValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">学历</div>
					<div class="select-item-input"><el-input v-model="EducationValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">班级</div>
					<div class="select-item-input"><el-input v-model="classValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						入学时间
					</div>
					 <div class="block">
					    <el-date-picker
					      v-model="AdmissiontimeValue"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
					  </div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						毕业时间
					</div>
					<div class="block">
					   <el-date-picker
					     v-model="GraduationtimeValue"
					     type="date"
					     placeholder="选择日期">
					   </el-date-picker>
					 </div>
				</div>
				<div class="select-item">
					<div class="select-item-name">学制</div>
					<el-select v-model="EducationalsystemValue" placeholder="请选择">
						<el-option v-for="item in Educationalsystem" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">考生号</div>
					<div class="select-item-input"><el-input v-model="ExamineenumberValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						生源地
					</div>
					<div class="select-item-input"><el-input v-model="BiogeniclandValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						城乡生源
					</div>
					<el-select v-model="UrbanandruralhomologyValue" placeholder="请选择">
						<el-option v-for="item in Urbanandruralhomology" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						定向或委培单位
					</div>
					<div class="select-item-input"><el-input v-model="CompanyValue" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						培养方式
					</div>
					<el-select v-model="TrainingmodeValue" placeholder="请选择">
						<el-option v-for="item in Trainingmode" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						师范生类别
					</div>
					<el-select v-model="categoryValue" placeholder="请选择">
						<el-option v-for="item in category" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="select-item">
					<div class="select-item-name">
						<span>*</span>
						困难生类别
					</div>
					<el-select v-model="kuncategoryValue" placeholder="请选择">
						<el-option v-for="item in kuncategory" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</div>
		</div>

		<div class="content">
			<div class="content-title">入学前档案信息</div>

			<div class="select flex flex_x_bten flex_warp">
				<div class="select-items">
					<div class="select-item-name">入学前档案所在单位</div>
					<div class="select-item-input"><el-input v-model="Unichoolfiles" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">档案是否转入学校</div>
					<div class="select-item-input"><el-input v-model="Filolornot" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-items">
					<div class="select-item-name">入学前户口所在地派出所</div>
					<div class="select-item-input"><el-input v-model="Polication" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-item">
					<div class="select-item-name">户口是否转入学校</div>
					<div class="select-item-input"><el-input v-model="Whethccount" placeholder="请输入内容"></el-input></div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="content-title">联系方式</div>
			<div class="select">
				<div class="select-itemss">
					<div class="select-item-name">手机</div>
					<div class="select-item-input"><el-input v-model="Mobilephone" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-itemss">
					<div class="select-item-name">邮箱</div>
					<div class="select-item-input"><el-input v-model="mailbox" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-itemss">
					<div class="select-item-name">QQ</div>
					<div class="select-item-input"><el-input v-model="qq" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-itemss">
					<div class="select-item-name">家庭电话</div>
					<div class="select-item-input"><el-input v-model="Homephone" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="select-itemss">
					<div class="select-item-name">家庭邮编</div>
					<div class="select-item-input"><el-input v-model="Familyzipcode" placeholder="请输入内容"></el-input></div>
				</div>
				<div class="jiating">
					<span>家庭住址</span>
					<i class="el-icon-warning"></i>
					<span>填写无效或不详细的地址将会导致审核不通过!</span>
				</div>
				<el-input v-model="Homeaddress" placeholder="请输入内容"></el-input>
			</div>
		</div>
		<div class="content"><el-button type="primary">提交</el-button></div>
	</div>
</template>

<script>
import options from "@/utils/options.js";
export default {
	data() {
		return {
			name: '',//姓名
			IDnumber: '',//身份证号
			Political:options.politicCountenance,
			PoliticalValue:'',//政治面貌
			genderOptions:options.genderOptions,
			genderOptionsValue:'',//性别
			nationOptions:options.nationOptions,
			nationOptionsValue:'',//名族
			disabledDate(time) {
			  return time.getTime() > Date.now();
			},
			disabledDateValue:'',//出生日期
			FacultyanddepartmentValue:'',//院系
			majorValue:'',//专业
			ProfessionaldirectionValue:'',//专业方向
			StudentIDValue:'',//学号
			EducationValue:'',//学历
			classValue:'',//班级
			AdmissiontimeValue:'',//入学时间
			GraduationtimeValue:'',//毕业时间
			Educationalsystem:options.EducationalsystemValue,
			EducationalsystemValue:'',//学制
			ExamineenumberValue:'',//考生号
			BiogeniclandValue:'',//生源地
			Urbanandruralhomology:options.urbanOrRural,//同乡
			UrbanandruralhomologyValue:'',//同乡
			CompanyValue:'',//定向或委培单位
			TrainingmodeValue:'',//培养方式
			Trainingmode:options.Trainingmode,
			categoryValue:'',//师范生类别
			category:options.teacherType,
			kuncategoryValue:'',//困难生类别
			kuncategory:options.difficultType,

			Unichoolfiles:'',
			Filolornot:'',
			Polication:'',
			Whethccount:'',

			Mobilephone:'',
			mailbox:'',
			qq:'',
			Homephone:'',
			Familyzipcode:'',
			Homeaddress:'',
		}	
	},
	created() {
		if(JSON.parse(localStorage.getItem("username"))!=null){
			this.resumeBtn()
		}
	},
	methods:{
		async resumeBtn(){
			if(JSON.parse(localStorage.getItem("username"))!=null){
				let params = {
						id:JSON.parse(localStorage.getItem("username")).userinfo.id,
				}
				let resume = await this.service.user.getAllInfo(params)
				console.log(resume)
				if(resume.code==0){
					this.name = resume.data.realname;
					this.IDnumber = resume.data.idnumber;
					this.PoliticalValue = resume.data.political_name;
					if(resume.data.sex==1){
						this.genderOptionsValue ="男"
					}else{
						this.genderOptionsValue ="女"
					}
					this.nationOptionsValue = resume.data.nation_name;
					this.disabledDateValue = resume.data.birthday;
					this.FacultyanddepartmentValue = resume.data.department_id_name;
					this.majorValue = resume.data.professional_id_name;
					this.ProfessionaldirectionValue = resume.data.gramode_name;//专业方向
					this.StudentIDValue = resume.data.studentid;
					this.EducationValue = resume.data.xueli_name;
					// this.classValue = resume.data;			//班级
					this.AdmissiontimeValue = resume.data.ruxue_name_m;
					this.GraduationtimeValue = resume.data.biye_name_m;
					this.EducationalsystemValue = resume.data.xuezhi_name;
					this.ExamineenumberValue = resume.data.studentid;  //考生号
					this.BiogeniclandValue = resume.data.shengyuandi_name;
					// this.UrbanandruralhomologyValue = resume.data;  //城乡生源
					this.CompanyValue = resume.data.gramode_name;

					this.kuncategoryValue = resume.data.kunnansheng_id_name;
					this.Mobilephone = resumne.data.linkphone;
					this.mailbox = resume.data.email;
					this.qq = resume.data.qq;
					this.Homephone = resume.data.linktel;
					this.Familyzipcode = resume.data.home_youbian; //家庭邮编
					this.Homeaddress = resume.data.home_address
				}
			}
		}, 
	}
}
</script>

<style scoped="scoped" lang="scss">
.select {
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
		.select-item-input {
		}
	}
	.select-itemss {
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
		.select-item-input {
		}
	}
	.select-itemss:nth-child(2),
	.select-itemss:nth-child(5) {
		margin: 0 40px;
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
		.select-item-input {
		}
	}
}
.jiating {
	margin: 15px 0;
	span:nth-child(1) {
		font-size: 14px;
		font-family: MicrosoftYaHeiUI;
		color: rgba(38, 38, 38, 1);
	}
	.el-icon-warning {
		color: #8c8c8c;
	}
	span:nth-child(3) {
		font-size: 14px;
		font-family: MicrosoftYaHeiUI;
		color: #8c8c8c;
	}
}
.el-date-editor.el-input,
.el-select {
	width: 100% !important;
}
.container {
	padding-bottom: 15px;
	.header {
		background: #fff;
		padding-top: 20px;
		padding-bottom: 20px;
		border-radius: 4px;
		.header-top {
			font-size: 22px;
			margin-left: 20px;
		}
		.header-title {
			width: 840px;
			height: 34px;
			background: rgba(238, 244, 255, 1);
			border-radius: 4px;
			border: 1px solid rgba(148, 183, 255, 1);
			margin-top: 20px;
			.el-icon-warning {
				color: #333;
				margin-left: 5px;
				margin-right: 5px;
			}
		}
	}
	.content {
		background: #fff;
		margin-top: 20px;
		border-radius: 4px;
		padding: 20px;
		.content-title {
			color: #262626;
			font-size: 16px;
			font-weight: bold;
		}
	}
}
</style>
