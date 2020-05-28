<template>
    <div class="container" >
        <!-- 在校栏目 -->
        <div class="content">
            <!-- 在校标题 -->
            <div class="header_title">
                <div class="header_title_left">
                    <v-icon icon-class="icon-inschool" class-name="icons"></v-icon>
                    在校任职
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
                            <label>{{item.zx_name}}</label>
                            <span>{{timestampToTimeDay(item.sx_appDate)}} - {{timestampToTimeDay(item.sx_appDate1)}}</span>
                        </div>
                        <div class="content_body_header_right" @click="editBtn(0,index)">
                            <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="content_body_text">
                        {{item.zx_content}}
                    </div>
                </div>
            </div>
            <!-- 在校操作 -->
            <div v-else class="content_list_operation">
                <div class="operation_list" v-for="(item,index) in inSchoolEdit" :key="index">
                    <div class="operation_item_top">
                        <v-input-box title="职位名称" v-model="item.zx_name" ></v-input-box>
                        <v-date-picker title="在职时间" v-model="item.sx_appDate"></v-date-picker>
                        <span style="width:240px"></span>
                    </div>
                    <div class="operation_item_bottom">
                        <v-input-box :inputShop="true" title="工作内容" v-model="item.zx_content"></v-input-box>
                    </div>
                    <div class="bottom_button">
                        <el-button size="mini" type="danger" @click="deleteBtn()">删除</el-button>
                        <el-button size="mini" @click="returnBtn()">返回</el-button>
                        <el-button size="mini" type="primary" @click="submitBtn()">保存</el-button>
                    </div>
                </div>
            </div>

        </div>
        <!-- 社团栏目 -->
        <div class="content">
            <!-- 社团标题 -->
            <div class="header_title">
                <div class="header_title_left">
                    <v-icon icon-class="icon-anassociation" class-name="icons"></v-icon>
                    社团经历
                </div>
                <div class="header_title_right" @click="addBtn(1)">
                    <v-icon icon-class="icon-jia" class-name="edit"></v-icon>
                    添加
                </div>
            </div>
            <!-- 数据显示 -->
            <div v-if="communtiyShow" class="content_list">
                <div class="content_item" v-for="(item,index) in communtiyData" :key="index">
                    <div v-if="index>0" class="separated"/>
                    <div class="content_body_header">
                        <div class="content_body_header_left">
                            <label>{{item.st_name}}</label>
                            <label>{{item.st_zwname}}</label>
                            <span>{{timestampToTimeDay(item.st_appDate)}} - {{timestampToTimeDay(item.st_appDate1)}}</span>
                            <p>{{item.st_content}}</p>
                        </div>
                        <div class="content_body_header_right" @click="editBtn(1,index)">
                            <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="content_body_text">
                        {{item.zx_content}}
                    </div>
                </div>
            </div>
            <!-- 社团操作 -->
            <div v-else class="content_list_operation">
                <div class="operation_list" v-for="(item,index) in communtiyEdit" :key="index">
                    <div class="operation_item_top">
                        <v-input-box title="社团名称" v-model="item.st_name" ></v-input-box>
                        <v-date-picker title="在职时间" v-model="item.st_appDate"></v-date-picker>
                        <v-input-box title="职务" v-model="item.st_zwname" ></v-input-box>
                    </div>
                    <div class="operation_item_bottom">
                        <v-input-box :inputShop="true" title="工作内容" v-model="item.st_content"></v-input-box>
                    </div>
                    <div class="bottom_button">
                        <el-button size="mini" type="danger" @click="deleteBtn()">删除</el-button>
                        <el-button size="mini" @click="returnBtn()">返回</el-button>
                        <el-button size="mini" type="primary" @click="submitBtn()">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 实践栏目 -->
        <div class="content">
            <!-- 实践标题 -->
            <div class="header_title">
                <div class="header_title_left">
                    <v-icon icon-class="icon-anassociation" class-name="icons"></v-icon>
                    实践经历
                </div>
                <div class="header_title_right" @click="addBtn(2)">
                    <v-icon icon-class="icon-jia" class-name="edit"></v-icon>
                    添加
                </div>
            </div>
            <!-- 数据显示 -->
            <div v-if="practiceShow" class="content_list">
                <div class="content_item" v-for="(item,index) in practiceData" :key="index">
                    <div v-if="index>0" class="separated"/>
                    <div class="content_body_header">
                        <div class="content_body_header_left">
                            <label>{{item.sj_danwei}}</label>
                            <span>{{timestampToTimeDay(item.sx_appDate)}} - {{timestampToTimeDay(item.sx_appDate1)}}</span>
                        </div>
                        <div class="content_body_header_right" @click="editBtn(2,index)">
                            <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="content_body_text">
                        {{item.sj_content}}
                    </div>
                </div>
            </div>
            <!-- 实践操作 -->
            <div v-else class="content_list_operation">
                <div class="operation_list" v-for="(item,index) in practiceEdit" :key="index">
                    <div class="operation_item_top">
                        <v-input-box title="实践名称" v-model="item.sj_danwei" ></v-input-box>
                        <v-date-picker title="实践时间" v-model="item.sx_appDate"></v-date-picker>
                        <span style="width:240px"></span>
                    </div>
                    <div class="operation_item_bottom">
                        <v-input-box :inputShop="true" title="实践内容" v-model="item.sj_content"></v-input-box>
                    </div>
                    <div class="bottom_button">
                        <el-button size="mini" type="danger" @click="deleteBtn()">删除</el-button>
                        <el-button size="mini" @click="returnBtn()">返回</el-button>
                        <el-button size="mini" type="primary" @click="submitBtn()">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 实习栏目 -->
        <div class="content">
            <!-- 实习标题 -->
            <div class="header_title">
                <div class="header_title_left">
                    <v-icon icon-class="icon-anassociation" class-name="icons"></v-icon>
                    实习经历
                </div>
                <div class="header_title_right" @click="addBtn(3)">
                    <v-icon icon-class="icon-jia" class-name="edit"></v-icon>
                    添加
                </div>
            </div>
            <!-- 数据显示 -->
            <div v-if="internshipShow" class="content_list">
                <div class="content_item" v-for="(item,index) in internshipData" :key="index">
                    <div v-if="index>0" class="separated"/>
                    <div class="content_body_header">
                        <div class="content_body_header_left">
                            <label>{{item.sx_danwei}}</label>
                            <label>{{item.sx_gangwei}}</label>
                            <span>{{timestampToTimeDay(item.sx_appDate)}} - {{timestampToTimeDay(item.sx_appDate1)}}</span>
                        </div>
                        <div class="content_body_header_right" @click="editBtn(3,index)">
                            <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="content_body_text">
                        {{item.sx_content}}
                    </div>
                </div>
            </div>
            <!-- 实习操作 -->
            <div v-else class="content_list_operation">
                <div class="operation_list" v-for="(item,index) in internshipEdit" :key="index">
                    <div class="operation_item_top">
                        <v-input-box title="实习名称" v-model="item.sx_danwei" ></v-input-box>
                        <v-date-picker title="实习时间" v-model="item.sx_appDate"></v-date-picker>
                        <v-input-box title="实习职位" v-model="item.sx_gangwei" ></v-input-box>
                    </div>
                    <div class="operation_item_bottom">
                        <v-input-box :inputShop="true" title="实习内容" v-model="item.sx_content"></v-input-box>
                    </div>
                    <div class="bottom_button">
                        <el-button size="mini" type="danger" @click="deleteBtn()">删除</el-button>
                        <el-button size="mini" @click="returnBtn()">返回</el-button>
                        <el-button size="mini" type="primary" @click="submitBtn()">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 项目栏目 -->
        <div class="content">
            <!-- 项目标题 -->
            <div class="header_title">
                <div class="header_title_left">
                    <v-icon icon-class="icon-anassociation" class-name="icons"></v-icon>
                    项目经历
                </div>
                <div class="header_title_right" @click="addBtn(4)">
                    <v-icon icon-class="icon-jia" class-name="edit"></v-icon>
                    添加
                </div>
            </div>
            <!-- 数据显示 -->
            <div v-if="projectShow" class="content_list">
                <div class="content_item" v-for="(item,index) in projectData" :key="index">
                    <div v-if="index>0" class="separated"/>
                    <div class="content_body_header">
                        <div class="content_body_header_left">
                            <label>{{item.xm_name}}</label>
                            <span>{{timestampToTimeDay(item.sx_appDate)}} - {{timestampToTimeDay(item.sx_appDate1)}}</span>
                        </div>
                        <div class="content_body_header_right" @click="editBtn(4,index)">
                            <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="content_body_text">
                        {{item.xm_content}}
                    </div>
                </div>
            </div>
            <!-- 项目操作 -->
            <div v-else class="content_list_operation">
                <div class="operation_list" v-for="(item,index) in projectEdit" :key="index">
                    <div class="operation_item_top">
                        <v-input-box title="项目名称" v-model="item.xm_name" ></v-input-box>
                        <v-date-picker title="项目时间" v-model="item.sx_appDate"></v-date-picker>
                        <span style="width:240px"></span>
                    </div>
                    <div class="operation_item_bottom">
                        <v-input-box :inputShop="true" title="项目内容" v-model="item.xm_content"></v-input-box>
                    </div>
                    <div class="bottom_button">
                        <el-button size="mini" type="danger" @click="deleteBtn()">删除</el-button>
                        <el-button size="mini" @click="returnBtn()">返回</el-button>
                        <el-button size="mini" type="primary" @click="submitBtn()">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 培训栏目 -->
        <div class="content">
            <!-- 培训标题 -->
            <div class="header_title">
                <div class="header_title_left">
                    <v-icon icon-class="icon-anassociation" class-name="icons"></v-icon>
                    培训经历
                </div>
                <div class="header_title_right" @click="addBtn(5)">
                    <v-icon icon-class="icon-jia" class-name="edit"></v-icon>
                    添加
                </div>
            </div>
            <!-- 数据显示 -->
            <div v-if="trainingShow" class="content_list">
                <div class="content_item" v-for="(item,index) in trainingData" :key="index">
                    <div v-if="index>0" class="separated"/>
                    <div class="content_body_header">
                        <div class="content_body_header_left">
                            <label>{{item.px_danwei}}</label>
                            <span>{{timestampToTimeDay(item.sx_appDate)}} - {{timestampToTimeDay(item.sx_appDate1)}}</span>
                        </div>
                        <div class="content_body_header_right" @click="editBtn(5,index)">
                            <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                        </div>
                    </div>
                    <div class="content_body_text">
                        {{item.px_content}}
                    </div>
                </div>
            </div>
            <!-- 培训操作 -->
            <div v-else class="content_list_operation">
                <div class="operation_list" v-for="(item,index) in trainingEdit" :key="index">
                    <div class="operation_item_top">
                        <v-input-box title="培训名称" v-model="item.px_danwei" ></v-input-box>
                        <v-date-picker title="培训时间" v-model="item.sx_appDate"></v-date-picker>
                        <span style="width:240px"></span>
                    </div>
                    <div class="operation_item_bottom">
                        <v-input-box :inputShop="true" title="培训内容" v-model="item.px_content"></v-input-box>
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
            communtiyData:[],//社团经历
            practiceData:[],//实践经历
            internshipData:[],//实习经历
            projectData:[],//项目经历
            trainingData:[],//培训经历


            inSchoolEdit:[{'sx_appDate':'','sx_appDate1':'','zx_name':'','zx_content':''}],//在校任职
            communtiyEdit:[{'st_appDate':'','st_appDate1':'','st_name':'','st_zwname':'','st_content':''}],//社团经历
            practiceEdit:[{'sx_appDate':'','sx_appDate1':'','sj_danwei':'','sj_content':''}],//实践经历
            internshipEdit:[{'sx_appDate':'','sx_appDate1':'','sx_danwei':'','sx_gangwei':'','sx_content':''}],//实习经历
            projectEdit:[{'sx_appDate':'','sx_appDate1':'','xm_name':'','xm_content':''}],//项目经历
            trainingEdit:[{'sx_appDate':'','sx_appDate1':'','px_danwei':'','px_content':''}],//培训经历

            inSchoolShow:true,
            communtiyShow:true,
            practiceShow:true,
            internshipShow:true,
            projectShow:true,
            trainingShow:true,

            currentIndex:0,//当前正在操作的栏目
            currentItemIndex:0,//当前正在操作栏目的子项
            clickStatus:0//0添加,1修改,2删除
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.init();
        }
    },
    methods:{
        addBtn(tabId){
            this.operationClose();//初始化面板
            this.currentIndex=tabId;
            this.clickStatus=0;
            this.operation(true);//打开操作面板
        },
        editBtn(tabId,index){
            this.operationClose();//初始化面板
            this.currentIndex=tabId;
            this.currentItemIndex=index;
            this.clickStatus=1;
            this.operation(true);//打开操作面板
        },
        deleteBtn(){
            this.clickStatus=2;
            let params= this.putArrayList();
            let isStatus=this.putAxios(params);
        },
        returnBtn(){
            this.clickStatus=0;
            this.operation(false);//关闭操作面板
        },
        submitBtn(){//提交
            let params= this.putArrayList();
            let isStatus=this.putAxios(params);
        },
        putArrayList(){//封装数据
            let params={id:JSON.parse(localStorage.getItem("username")).userinfo.id};
            switch(this.currentIndex){
                case 0:
                    let editList=this.inSchoolEdit[0];
                    let arr=this.inSchoolData;
                     if(arr==null){
                        arr=[];
                    }
                    if(this.clickStatus==0){
                        arr.push({
                            'sx_appDate':editList.sx_appDate[0],
                            'sx_appDate1':editList.sx_appDate[1],
                            'zx_name':editList.zx_name,
                            'zx_content':editList.zx_content
                        });
                    }else if(this.clickStatus==1){
                        arr[this.currentItemIndex]={
                            'sx_appDate':editList.sx_appDate[0],
                            'sx_appDate1':editList.sx_appDate[1],
                            'zx_name':editList.zx_name,
                            'zx_content':editList.zx_content
                        }
                    }else{
                        arr.splice(this.currentItemIndex,1);
                    }
                    params.atschool=JSON.stringify(arr);
                break;
                case 1:
                    let editList1=this.communtiyEdit[0];
                    let arr1=this.communtiyData;
                    if(arr1==null){
                        arr1=[];
                    }
                    if(this.clickStatus==0){
                        arr1.push({
                            'st_appDate':editList1.st_appDate[0],
                            'st_appDate1':editList1.st_appDate[1],
                            'st_name':editList1.st_name,
                            'st_zwname':editList1.st_zwname,
                            'st_content':editList1.st_content
                        });
                    }else if(this.clickStatus==1){
                        arr1[this.currentItemIndex]={
                            'st_appDate':editList1.st_appDate[0],
                            'st_appDate1':editList1.st_appDate[1],
                            'st_name':editList1.st_name,
                            'st_zwname':editList1.st_zwname,
                            'st_content':editList1.st_content
                        }
                    }else{
                        arr1.splice(this.currentItemIndex,1);
                    }
                    params.shetuan=JSON.stringify(arr1);
                break;
                case 2:
                    let editList2=this.practiceEdit[0];
                    let arr2=this.practiceData;
                     if(arr2==null){
                        arr2=[];
                    }
                    if(this.clickStatus==0){
                        arr2.push({
                            'sx_appDate':editList2.sx_appDate[0],
                            'sx_appDate1':editList2.sx_appDate[1],
                            'sj_danwei':editList2.sj_danwei,
                            'sj_content':editList2.sj_content
                        });
                    }else if(this.clickStatus==1){
                        arr2[this.currentItemIndex]={
                            'sx_appDate':editList2.sx_appDate[0],
                            'sx_appDate1':editList2.sx_appDate[1],
                            'sj_danwei':editList2.sj_danwei,
                            'sj_content':editList2.sj_content
                        }
                    }else{
                        arr2.splice(this.currentItemIndex,1);
                    }
                    params.praexperience=JSON.stringify(arr2);
                break;
                case 3:
                    let editList3=this.internshipEdit[0];
                    let arr3=this.internshipData;
                     if(arr3==null){
                        arr3=[];
                    }
                    if(this.clickStatus==0){
                        arr3.push({
                            'sx_appDate':editList3.sx_appDate[0],
                            'sx_appDate1':editList3.sx_appDate[1],
                            'sx_danwei':editList3.sx_danwei,
                            'sx_gangwei':editList3.sx_gangwei,
                            'sx_content':editList3.sx_content
                        });
                    }else if(this.clickStatus==1){
                        arr3[this.currentItemIndex]={
                            'sx_appDate':editList3.sx_appDate[0],
                            'sx_appDate1':editList3.sx_appDate[1],
                            'sx_danwei':editList3.sx_danwei,
                            'sx_gangwei':editList3.sx_gangwei,
                            'sx_content':editList3.sx_content
                        }
                    }else{
                        arr3.splice(this.currentItemIndex,1);
                    }
                    params.internship=JSON.stringify(arr3);
                break;
                case 4:
                    let editList4=this.projectEdit[0];
                    let arr4=this.projectData;
                     if(arr4==null){
                        arr4=[];
                    }
                    if(this.clickStatus==0){
                        arr4.push({
                            'sx_appDate':editList4.sx_appDate[0],
                            'sx_appDate1':editList4.sx_appDate[1],
                            'xm_name':editList4.xm_name,
                            'xm_content':editList4.xm_content
                        });
                    }else if(this.clickStatus==1){
                        arr4[this.currentItemIndex]={
                            'sx_appDate':editList4.sx_appDate[0],
                            'sx_appDate1':editList4.sx_appDate[1],
                            'xm_name':editList4.xm_name,
                            'xm_content':editList4.xm_content
                        }
                    }else{
                        arr4.splice(this.currentItemIndex,1);
                    }
                    params.proexperience=JSON.stringify(arr4);
                break;
                case 5:
                    let editList5=this.trainingEdit[0];
                    let arr5=this.trainingData;
                     if(arr5==null){
                        arr5=[];
                    }
                    if(this.clickStatus==0){
                        arr5.push({
                            'sx_appDate':editList5.sx_appDate[0],
                            'sx_appDate1':editList5.sx_appDate[1],
                            'px_danwei':editList5.px_danwei,
                            'px_content':editList5.px_content
                        });
                    }else if(this.clickStatus==1){
                        arr5[this.currentItemIndex]={
                            'sx_appDate':editList5.sx_appDate[0],
                            'sx_appDate1':editList5.sx_appDate[1],
                            'px_danwei':editList5.px_danwei,
                            'px_content':editList5.px_content
                        }
                    }else{
                        arr5.splice(this.currentItemIndex,1);
                    }
                    params.traine=JSON.stringify(arr5);
                break;
            }
            return params;
        },
        async putAxios(params){//请求修改接口
            let status = await this.service.user.modify(params);
            if(status.code == 0){
                this.init();
                this.operation(false);//关闭操作面板
            }
        },
        operation(status){//控制操作面板
            switch(this.currentIndex){
                case 0:
                    if(status){
                        if(this.clickStatus==1){
                            this.inSchoolEdit[0]=this.inSchoolData[this.currentItemIndex];
                        }else{
                            this.inSchoolEdit=[{'sx_appDate':'','sx_appDate1':'','zx_name':'','zx_content':''}];
                        }
                        this.inSchoolShow=false;
                    }else{
                        this.inSchoolShow=true;
                    }
                break;
                case 1:
                    if(status){
                        if(this.clickStatus==1){
                            this.communtiyEdit[0]=this.communtiyData[this.currentItemIndex];
                        }else{
                            this.communtiyEdit=[{'st_appDate':'','st_appDate1':'','st_name':'','st_zwname':'','st_content':''}];
                        }
                        this.communtiyShow=false;
                    }else{
                        this.communtiyShow=true;
                    }
                break;
                case 2:
                    if(status){
                        if(this.clickStatus==1){
                            this.practiceEdit[0]=this.practiceData[this.currentItemIndex];
                        }else{
                            this.practiceEdit=[{'sx_appDate':'','sx_appDate1':'','sj_danwei':'','sj_content':''}];
                        }
                        this.practiceShow=false;
                    }else{
                        this.practiceShow=true;
                    }
                break;
                case 3:
                    if(status){
                        if(this.clickStatus==1){
                            this.internshipEdit[0]=this.internshipData[this.currentItemIndex];
                        }else{
                            this.internshipEdit=[{'sx_appDate':'','sx_appDate1':'','sx_danwei':'','sx_gangwei':'','sx_content':''}];
                        }
                        this.internshipShow=false;
                    }else{
                        this.internshipShow=true;
                    }
                break;
                case 4:
                    if(status){
                        if(this.clickStatus==1){
                            this.projectEdit[0]=this.projectData[this.currentItemIndex];
                        }else{
                            this.projectEdit=[{'sx_appDate':'','sx_appDate1':'','xm_name':'','xm_content':''}];
                        }
                        this.projectShow=false;
                    }else{
                        this.projectShow=true;
                    }
                break;
                case 5:
                    if(status){
                        if(this.clickStatus==1){
                            this.trainingEdit[0]=this.trainingData[this.currentItemIndex];
                        }else{
                            this.trainingEdit=[{'sx_appDate':'','sx_appDate1':'','px_danwei':'','px_content':''}];
                        }
                        this.trainingShow=false;
                    }else{
                        this.trainingShow=true;
                    }
                break;
            }
        },
        operationClose(){//初始化面板
            this.inSchoolShow=true;
            this.communtiyShow=true;
            this.practiceShow=true;
            this.internshipShow=true;
            this.projectShow=true;
            this.trainingShow=true;
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
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                };
                let resume = await this.service.user.info(params);
                if(resume.code==0){
                    this.inSchoolData=resume.data.resumeinfo.atschool;//在校任职
                    this.communtiyData=resume.data.resumeinfo.shetuan;//社团经历
                    this.practiceData=resume.data.resumeinfo.praexperience;//实践经历
                    this.internshipData=resume.data.resumeinfo.internship;//实习经历
                    this.projectData=resume.data.resumeinfo.proexperience;//项目经历
                    this.trainingData=resume.data.resumeinfo.traine;//培训经历
                }
            }
        },
       
        async editUserInfo(arr){
            let params = {
                id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                atschool:JSON.stringify(arr)
            }
            let status = await this.service.user.modify(params)
            if(status.code == 0){
                this.init();
            }
        }
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
                    @include flex(row,space-between);
                    // width: 65%;
                    /deep/ .container_box{
                        margin-top:20px;
                        width: 240px;
                    }
                }
                .operation_item_bottom{
                    /deep/ .container_box{
                        margin-top:20px;
                        .el-input {
                            height: 68px;
                        }
                    }
                }
                .bottom_button{
                    margin-top:24px;
                    /deep/ .el-button{
                        margin-right: 20px;
                    }
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