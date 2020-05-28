<template>
    <div class="container" >
        <!-- 在校栏目 -->
        <div class="content">
            <!-- 在校标题 -->
            <div class="header_title">
                <div class="header_title_left">
                    <v-icon icon-class="icon-inschool" class-name="icons"></v-icon>
                    求职意向
                </div>
                <div class="header_title_right" @click="addBtn(0)">
                    <v-icon icon-class="icon-jia" class-name="edit"></v-icon>
                    添加
                </div>
            </div>
            <!-- 数据显示 -->
            <div v-if="inSchoolShow" class="content_list">
                <div class="content_item" v-for="(item,index) in inSchoolData" :key="index">
                    <div v-if="index>0" class="separated"/>
                    <div class="content_body_header">
                        <div class="content_body_header_left">
                            <label>{{item.qwhangye_name}}</label>
                            <span>{{item.qwprovince_name}} - {{item.qwcity_name}}</span>
                        </div>
                        <div class="content_body_header_right" @click="editBtn(0,index)">
                            <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="content_body_text">
                        {{item.qwzhiwei1_name}}
                    </div>
                </div>
            </div>
            <!-- 在校操作 -->
            <div v-else class="content_list_operation">
                <div class="operation_list" v-for="(item,index) in inSchoolEdit" :key="index">
                    <div class="operation_item_top">
                        <label>职位类别</label>
                        <label>行业</label>
                       <span style="width:240px"></span>
                    </div>
                      <div class="operation_item_top">
                        <el-select v-model="item.qwzhiwei1_name" placeholder="请选择">
                          <el-option v-for="(item,index) in zhiWeiOptions" :key="index" :label="item.cate_name" :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="item.qwhangye_name" placeholder="请选择">
                          <el-option v-for="(item,index) in hangYeOptions" :key="index" :label="item.cate_name" :value="item.id"></el-option>
                        </el-select>
                       <span style="width:240px"></span>

                        <!-- <v-input-box title="职位类别" v-model="item.qwhangye_name" ></v-input-box>
                        <v-input-box title="所属行业" v-model="item.qwprovince_name" ></v-input-box>
                        <v-input-box title="工作地点" v-model="item.qwcity_name" ></v-input-box> -->

                    </div>
                    <div class="operation_item_bottom">
                      <label>省</label>
                      <label>市</label>
                      <span style="width:240px"></span>
                    </div>
                      <div class="operation_item_bottom">
                      <el-select v-model="item.qwprovince_name" placeholder="省" @change="setProvId(item.qwprovince_name)">
                        <el-option
                          v-for="item in provinceList"
                          :key="item.id"
                          :label="item.region_name"
                          :value="item.id" >
                        </el-option>
                      </el-select>
                      <el-select v-model="item.qwcity_name" placeholder="市" 	:disabled="province!=''?false:true" >
                        <el-option
                          v-for="item in cityList"
                          :key="item.id"
                          :label="item.region_name"
                          :value="item.id" 
                          >
                        </el-option>
                      </el-select>
                      <span style="width:240px"></span>
                    </div>
                    <div class="bottom_button">
                        <el-button size="mini" type="danger" @click="deleteBtn()">删除</el-button>
                        <el-button size="mini" @click="returnBtn()">返回</el-button>
                        <el-button size="mini" type="primary" @click="submitBtn()">保存</el-button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            inSchoolData:[],//在校任职
            inSchoolEdit:[{'sx_appDate':'','sx_appDate1':'','zx_name':'','zx_content':''}],//在校任职
            inSchoolShow:true,
            clickStatus:0,
            currentItemIndex:0,
            zhiWeiOptions:[],
            hangYeOptions:[],
            zhiWeiValue:'',
            hangYeValue:'',
            addressList:[],//全部省市列表
            provinceList:[],//省列表渲染
            cityList:[],//市列表渲染
            province:'',
            city:''

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
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.init();
        }
        this.zhiweiGetList();
        this.hangyeGetList();
        this.addressGetList();

    },
    methods:{
      setProvId(id){
        this.province=id;
      },
        addBtn(tabId){
          this.clickStatus=0;
            this.operationClose();//初始化面板
            this.operation(true);//打开操作面板
        },
        editBtn(tabId,index){
            this.clickStatus=1;
            this.currentItemIndex=index;
            this.operationClose();//初始化面板
            this.operation(true);//打开操作面板
        },
        deleteBtn(){
            let params= this.putArrayList();
            let isStatus=this.deletePutAxios(params);
        },
        returnBtn(){
            this.operation(false);//关闭操作面板
        },
        submitBtn(){//提交
            let params= this.putArrayList();
            let isStatus=this.putAxios(params);
        },
        putArrayList(){//封装数据
            let params={};
            let editList=this.inSchoolEdit[0];
            let arr=[];
            if(this.clickStatus==0){
              params={
                    qwhangye:editList.qwhangye_name,
                    qwprovince:editList.qwprovince_name,
                    qwcity:editList.qwcity_name,
                    qwzhiwei1:editList.qwzhiwei1_name
              }
            }else if(this.clickStatus==1){
                params={
                    id:editList.id,
                    qwhangye:editList.qwhangye_name,
                    qwprovince:editList.qwprovince_name,
                    qwcity:editList.qwcity_name,
                    qwzhiwei1:editList.qwzhiwei1_name
                }
            }else{
               params={
                    id:editList.id
                }
            }
            params.userid=JSON.parse(localStorage.getItem("username")).userinfo.id;
          return params;
        },
        async putAxios(params){//请求修改接口
            let status = await this.service.user.modifyWorkexpect(
              params
              );
            if(status.code == 0){
                this.init();
                this.operation(false);//关闭操作面板
            }
        },
        async deletePutAxios(params){//请求修改接口
            let status = await this.service.user.deleteModifyWorkexpect(params);
            if(status.code == 0){
                this.init();
                this.operation(false);//关闭操作面板
            }
        },
        operation(status){//控制操作面板
            if(status){
                if(this.clickStatus==1){
                    this.inSchoolEdit[0]=this.inSchoolData[this.currentItemIndex];
                }else{
                    this.inSchoolEdit=[{'qwhangye_name':'','qwprovince_name':'','qwcity_name':'','qwzhiwei1_name':''}];
                }
                this.inSchoolShow=false;
            }else{
                this.inSchoolShow=true;
            }
               
        },
        operationClose(){//初始化面板
            this.inSchoolShow=true;
        },
        input(timer){//选择的时间格式化
            var d = new Date(timer[0])
            const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
            var b = new Date(timer[1])
            const resData = b.getFullYear() + '-' + this.p((b.getMonth() + 1)) + '-' + this.p(b.getDate())
            this.edu_appDate = resDate
            this.edu_appDate1 = resData
        },
        async init(){
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken,
                    isExpect:1
                };
                let resume = await this.service.user.info(params);
                if(resume.code==0){
                    this.inSchoolData=resume.data.workExpect;//在校任职
                }
            }
        },
      async hangyeGetList(){
        let categoryData=await this.service.home.category({
        	type:'hangye'
        })
        if(categoryData.code==0){
          this.hangYeOptions=categoryData.data.hangye.list;
        }
      },
      async zhiweiGetList(){
        let categoryData=await this.service.home.category({
        	type:'zhiweilb'
        })
        if(categoryData.code==0){
          this.zhiWeiOptions=categoryData.data.zhiweilb.list;
        }
      },
      async addressGetList(){
			let addressData=await this.service.home.Systemregion();
			for(let i in addressData.data.list){
				if(addressData.data.list[i].parent_id==0){
					this.provinceList.push(addressData.data.list[i]);
				}
			}
			this.addressList=addressData.data.list; 
		}
        // async editUserInfo(arr){

        //     let params = {
        //         id:JSON.parse(localStorage.getItem("username")).userinfo.id,
        //         atschool:JSON.stringify(arr)
        //     }
        //     let status = await this.service.user.modify(params)
        //     if(status.code == 0){
        //         this.init();
        //     }
        // }
    }
}
</script>
<style lang="scss" scoped>
.container{
    
    .content{
        margin:20px 0;
        padding: 20px;
        width:840px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .header_title{
            @include flex(row,space-between);
            .header_title_left{
                .icons{
                    width: 12px;
                    height: 12px;
                    padding-right: 5px;
                }
                font-size:16px;
                font-weight:bold;
                line-height:20px;
                color:rgba(38,38,38,1);
                opacity:1;
            }
            .header_title_right{
                display:none;
                font-size:14px;
                line-height:20px;
                color:rgba(58,113,251,1);
                opacity:1;
                cursor: pointer;
                .edit{
                    width: 14px;
                    height: 14px;
                }
            }
        }
        .content_list{
            .content_item{
                padding:20px 0 0px 20px;
                .content_body_header{
                    @include flex(row,space-between);
                    .content_body_header_left{
                        label{
                            font-size:14px;
                            line-height:18px;
                            color:rgba(38,38,38,1);
                            opacity:1;
                        }
                        span{
                            margin-left: 16px;
                            font-size:12px;
                            line-height:15px;
                            color:rgba(140,140,140,1);
                            opacity:1;
                        }
                        p{
                            margin-top:14px;
                        }
                    }
                    .content_body_header_right{
                        display: none;
                        .edits{
                            width: 14px;
                            height: 14px;
                            cursor:pointer
                        }
                    }
                
                }
                .content_body_text{
                    margin-top:14px;
                    font-size:14px;
                    line-height:22px;
                    color:rgba(89,89,89,1);
                    opacity:1;
                }
                .separated{//分隔线虚线鸭式
                    margin-bottom:20px;
                    width: 100%;
                    height: 1px;
                    background-image: linear-gradient(to right, #DEDEDE 0%, #DEDEDE 70%, transparent 50%);
                    background-size: 12px 1px;
                    background-repeat: repeat-x;
                }
            }
        }
        .content_list_operation{
            .operation_list{
                .operation_item_top{
                  padding:20px 0 0 20px;
                    @include flex(row,space-between);
                    // width: 65%;
                    /deep/ .container_box{
                        margin-top:20px;
                        width: 240px;
                    }
                }
                .operation_item_bottom{
                padding:20px 0 0 20px;
                @include flex(row,space-between);
                    /deep/ .container_box{
                        margin-top:20px;
                        
                        .el-input {
                            height: 68px;
                        }
                    }
                }
                .bottom_button{
                    margin-top:24px 0 0 20px;
                    // /deep/ .el-button{
                    //     margin-right: 20px;
                    // }
                }
            }
        }
    }
    .content:hover{
        .header_title_right,
        .content_list .content_item .content_body_header_right{
            display: inline-block;
        }
    }
}
</style>