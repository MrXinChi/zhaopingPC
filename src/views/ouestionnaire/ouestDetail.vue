<template>
  	<div class="container_">
    	<v-content>
      		<div slot="content" class="wrapper">
				<div class="wrapper_header">
					<div class="content">
						<div class="headerCss">
							<div class="title">云南师范大学创新创业学院2019年教学内容调查问卷</div>
							<p class="flex flex_x_center">问卷说明：具有服务基层项目工作经历的大学毕业生，符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市“三支一扶”大学生（以下简称“三支一扶”大学生）服</p>
						</div>
					<div v-for="(i,k) in 1" :key="k">
						<div class="content-title"><span>*</span>1.1.下列哪个是具有服务基层项目工作经历的大学毕业生？（单选题）</div>
						<div class="select">
							<div class="select-item siMargin"  >
								<div v-for="(i,k) in 4" :key="k" @click="serviceGrassrootsBtn(i.id)">
									<el-radio v-model="radio" :label="i.id">{{k}}</el-radio>
								</div>
							</div>
						</div>
					</div>
					<!-- </div>
					<div class="content"> -->
					<div class="headerCss">
						<div class="title">{{questionnaireArr.title}}</div>
						<p class="flex flex_x_center">{{questionnaireArr.remarks}}</p>
					</div>
					<div v-for="(i,k) in questionnaireArr.question" :key="k">
						<div class="content-title"><span>*</span>1.{{i.question}}（{{i.typeid}}）</div>
						<div class="select">
							<div class="select-item siMargin"  >
								<div v-for="(i,k) in i.options" :key="k" @click="serviceGrassrootsBtn(i.id)">
									<el-radio v-model="radio" :label="i.id">{{i.title}}</el-radio>
								</div>
							</div>
						</div>
					</div>
					<div class="content-title"><span>*</span>2.请选出符合选调条件且考核合格的天津市三支一扶？（多选题）</div>
					<div class="select">
						<div class="select-item siMargin">
							<el-checkbox-group v-model="checkList">
								<div class="select-item-name" v-for="(i,k) in supportList" :key="k">
									<el-checkbox :label="i.text"></el-checkbox>
								</div>
							</el-checkbox-group>
						</div>
					</div>


					<div class="content-title"><span>*</span>3.下列哪个是具有服务基层项目工作经历的大学毕业生？（单选题）</div>
						<div class="select"> 
							<div class="select-item-name flex flex_y_center">
								<h1>教学内容</h1>
								<div class="select-item-name-div" v-for="(i,k) in contentofcourses" :key="k"> 
									<el-radio v-model="i.radio" :label="i.id">{{i.text}}</el-radio>
								</div>
							</div> 
							<div class="select-item-name flex flex_y_center">
								<h1>教学质量</h1>
								<div class="select-item-name-div" v-for="(i,k) in Teachingquality" :key="k"> 
									<el-radio v-model="i.radio" :label="i.id">{{i.text}}</el-radio>
								</div>
							</div> 
						</div>
						
						<div class="content-title"><span>*</span>4.符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市三支一扶？（简答题）</div>
						<div class="select"> 
							<div class="select-item-name"> 
							<el-input type="textarea" :rows="4" v-model="textarea"></el-input>
							</div>  
						</div>

						<div class="content-title"><span>*</span>5.符合选调条件的可报考1次选调生主要包括2019年服务期满且考核合格的天津市三支一扶？（简答题）</div>
						<div class="select"> 
							<div class="select-item-name"> 
								<el-input v-model="input"></el-input>
							</div>  
						</div>
					</div>
				</div>
				<div class="tijiao">
					<span class="bgcolor tijiaos" @click="submitBtn">提交</span>
				</div>
			</div>
    	</v-content>
  	</div>
</template>

<script>
export default {
	data() {
		return { 
			questionnaireArr:{},
			input:'',
			radio:'',
			radios:'',
			radios1:'',
			checkList:['选中且禁用','复选框 A'],
			textarea:'',
			ServiceGrassrootsList:[
				{text:"标准选项一",id:1,radio:false},
				{text:"标准选项二",id:2,radio:false},
				{text:"标准选项三",id:3,radio:false},
				{text:"标准选项四",id:4,radio:false}
			],
			supportList:[
				{text:"标准选项一",id:1,radio:false},
				{text:"标准选项二",id:2,radio:false},
				{text:"标准选项三",id:3,radio:false},
				{text:"标准选项四",id:4,radio:false}
			],
			contentofcourses:[
				{text:"非常满意",id:1,radio:false},
				{text:"满意",id:2,radio:false},
				{text:"一般",id:3,radio:false},
				{text:"不满意",id:4,radio:false},
				{text:"非不满意",id:5,radio:false}
			],
			Teachingquality:[
				{text:"非常满意",id:1,radio:false},
				{text:"满意",id:2,radio:false},
				{text:"一般",id:3,radio:false},
				{text:"不满意",id:4,radio:false},
				{text:"非不满意",id:5,radio:false}
			]
		};
	},
	methods: {
		async init(id){
			let wenjuandetail = await this.service.article.wenjuanDetail({id:id})
			this.questionnaireArr = wenjuandetail.data
			console.log(wenjuandetail)
			if(this.questionnaireArr.question[0].typeid == 1){
				this.questionnaireArr.question[0].typeid = "单选题"
			}else if(this.questionnaireArr.question[0].typeid == 2){
				this.questionnaireArr.question[0].typeid = "多选题"
			}else if(this.questionnaireArr.question[0].typeid == 3){
				this.questionnaireArr.question[0].typeid = "简答题"
			}else if(this.questionnaireArr.question[0].typeid == 4){
				this.questionnaireArr.question[0].typeid = "填空题"
			}
		},
		serviceGrassrootsBtn(id){
			console.log(id)
		},
		async submitBtn(){
			if(JSON.parse(localStorage.getItem("username"))!=null){
				let params = {
					id:this.$route.params.id,
					userid:JSON.parse(localStorage.getItem("username")).userinfo.id,
					answerDetail:[
						{'question_id':'3','answer':this.textarea},
					]
				}
				let init = await this.service.article.wenjuanAnswer(params)
				console.log(init)
			}
		}
	},
	created() {
		this.init(this.$route.params.id)
	}
};
</script>

<style lang="scss" scoped>
.container_ {
  	.wrapper {
   	 	.wrapper_header {
			@include flex();
			padding: 20px;
			background-color: #ffffff;
			.content {
				width: 100%;
				background: #fff;
				padding: 20px 20px 10px 20px;
				margin-top: 20px;
				.content-title {
					margin-top: 20px;
					color: #262626;
					font-size: 16px;
					font-weight: bold;
					span {
						color: #f64343;
					}
				}
				.select {
					margin-left: 20px;
					width: 100%;
					margin-top: 10px;
					.select-item {
						display: inline-block; 
						.select-item-name {
							margin: 12px 0;
						} 
					}
					.siMargin{
						margin:0 42px 0 0px;
					}
					.el-radio {
						width: 10%;
						margin: 10px 0 10px 0;
					}
				}
			}
		}
		.tijiao{
			.tijiaos{
				width: 130px;
				height: 35px;
				line-height: 35px;
				color: #fff;
				cursor: pointer;
				border-radius: 3px;
				display: block;
				margin:20px auto;
				text-align: center;
			}
			.bgcolor{
				background: #178BD9;
			}
		}
	}
	.headerCss{
		.title {
			@include word(20, #262626, bold);
			position: relative;
			margin: 0 auto;
			margin-top: -40px;
			text-align: center;
		}
		p{
			margin: 12px 0 40px 0;
			font-size:14px;
			color:rgba(89,89,89,1);
			line-height: 18px;
		}
	}
}

.select-item-name-div{
	padding-left:54px; 
}
</style>