<template>
    <div class="container" >
        
        <!-- <h1>在校任职 ~ 培训经历</h1> -->
         <div :class="this.experienceShow== true?'inschoolTrains':'inschoolTrain'" >
          <div class="container-content" v-for="(i,k) in inschoolTrainArray" :key="k"  @mouseleave="outsuspensionBtn" @mouseenter="suspensionBtn(k)">
               <div class="inschoolTrain-title flex flex_y_center flex_x_bten">
                    <div class="flex flex_y_center">
                        <v-icon :icon-class="'icon-' +i.icon" class-name="icons"></v-icon>
                        <h1>{{i.title}}</h1>
                    </div>
                    <div v-if="i.numShow" class="flex flex_y_center" @click="edit(k)"> 
                        <v-icon icon-class="icon-jia" class-name="edit"></v-icon>
                        <h1>添加</h1>
                    </div>
                </div>
                
                <div class="inschoolTrain-content">
                    <div v-if="i.numShop">


                        <div v-if="i.title=='在校任职'">
                            <div v-for="(item,index) in i.children" :key="index">
                                <div class="inschoolTrain-content-top flex flex_y_center flex_x_bten">
                                    <div class="flex flex flex_y_center">
                                        <h1>{{item.zx_name}}</h1>
                                        <h3>{{item.sx_appDate}} - {{item.sx_appDate1}}</h3>
                                    </div> 
                                    <div  v-if="i.numShow" class="editCss flex flex_y_center" @click="editData(k,index)">
                                        <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                                    </div>
                                </div>
                                <div class="inschoolTrain-content-bottom">
                                    <h1>{{item.zx_content}}</h1>
                                </div>
                            </div>
                        </div>
 
                       
                        <div v-if="i.title=='社团经历'">
                            <div v-for="(item,index) in i.children" :key="index">
                                <div class="inschoolTrain-content-top flex flex_y_center flex_x_bten">
                                    <div class="flex flex flex_y_center">
                                        <h1>{{item.st_name}}</h1>
                                        <h2 >{{item.st_zwname}}</h2>
                                        <h3>{{item.st_appDate}} - {{item.st_appDate1}}</h3>
                                    </div>
                                    <div  v-if="i.numShow" class="flex flex_y_center" @click="editData(k,index)">
                                        <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                                    </div>
                                </div>
                                <div class="inschoolTrain-content-bottom">
                                    <h1>{{item.st_content}}</h1>
                                </div>
                                <div v-if="item.zt==1" class="education-content-fenge"></div>
                            </div>
                            
                        </div>
                        <div v-if="i.title=='实践经历'">
                            <div v-for="(item,index) in i.children" :key="index">
                                <div class="inschoolTrain-content-top flex flex_y_center flex_x_bten">
                                    <div class="flex flex flex_y_center">
                                        <h1>{{item.sj_danwei}}</h1>
                                        <h3>{{item.sx_appDate}} - {{item.sx_appDate1}}</h3>
                                    </div>
                                    <div  v-if="i.numShow" class="flex flex_y_center" @click="editData(k,index)">
                                        <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                                    </div>
                                </div>
                                <div class="inschoolTrain-content-bottom">
                                    <h1>{{item.sj_content}}</h1>
                                </div>
                            </div>
                        </div>
                        <div v-if="i.title=='实习经历'">
                            <div v-for="(item,index) in i.children" :key="index">
                                <div class="inschoolTrain-content-top flex flex_y_center flex_x_bten">
                                    <div class="flex flex flex_y_center">
                                        <h1>{{item.sx_danwei}}</h1>
                                        <h2 >{{item.sx_gangwei}}</h2>
                                        <h3>{{item.sx_appDate}} - {{item.sx_appDate1}}</h3>
                                    </div>
                                    <div  v-if="i.numShow" class="flex flex_y_center"  @click="editData(k,index)">
                                        <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                                    </div>
                                </div>
                                <div class="inschoolTrain-content-bottom">
                                    <h1>{{item.sx_content}}</h1>
                                </div>
                            </div>
                        </div>
                        <div v-if="i.title=='项目经历'">
                            <div v-for="(item,index) in i.children" :key="index">
                                <div class="inschoolTrain-content-top flex flex_y_center flex_x_bten">
                                    <div class="flex flex flex_y_center">
                                        <h1>{{item.xm_name}}</h1>
                                        <h3>{{item.sx_appDate}} - {{item.sx_appDate1}}</h3>
                                    </div>
                                    <div  v-if="i.numShow" class="flex flex_y_center"  @click="editData(k,index)">
                                        <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                                    </div>
                                </div>
                                <div class="inschoolTrain-content-bottom">
                                    <h1>{{item.xm_content}}</h1>
                                </div>
                            </div>
                        </div>
                        <div v-if="i.title=='培训经历'">
                            <div v-for="(item,index) in i.children" :key="index">
                                <div class="inschoolTrain-content-top flex flex_y_center flex_x_bten">
                                    <div class="flex flex flex_y_center">
                                        <h1>{{item.px_danwei}}</h1>
                                        <h3>{{item.sx_appDate}} - {{item.sx_appDate1}}</h3>
                                    </div>
                                    <div  v-if="i.numShow" class="flex flex_y_center"  @click="editData(k,index)">
                                        <v-icon icon-class="icon-edit" class-name="edits"></v-icon>
                                    </div>
                                </div>
                                <div class="inschoolTrain-content-bottom">
                                    <h1>{{item.px_content}}</h1>
                                </div>
                            </div>
                        </div>



                    </div>

                    <!-- 添加 -->
                    <div class="tianjia flex flex-wrap" v-else-if="addShow" >
                        <div class="tianjiadiv " v-for="(n,k) in i.childrens" :key="k">
                            <v-input-box :title="n.text" v-model="n.content" v-if="n.zt==1 " ></v-input-box>
                            <v-date-picker :title="n.text" @input="input"  v-model="n.content" v-if="n.zt==3"></v-date-picker>
                            <v-input-box class="tianjiadiv2" :inputShop="inputShop" :title="n.text" v-model="n.content" v-if="n.zt==2"></v-input-box>
                        </div>
                    </div>

                    <!-- 在校修改 -->
                    <div class="tianjia flex flex-wrap" v-else-if="schEditShow" >
                        <div class="tianjiadiv " v-for="(n,k) in i.childrens" :key="k">
                            <v-input-box :title="n.text" v-model="i.children[0].zx_name" v-if="n.zt==1 " ></v-input-box>
                            <v-date-picker :title="n.text" @input="input"  v-model="i.children[0].sx_appDate" v-if="n.zt==3"></v-date-picker>

                            <v-input-box class="tianjiadiv2" :inputShop="inputShop" :title="n.text" v-model="i.children[0].zx_content" v-if="n.zt==2"></v-input-box>
                        </div>
                    </div>

                    <!-- 社团修改 -->
                    <div class="tianjia flex flex-wrap" v-else-if="communityEditShow" >
                        <div class="tianjiadiv " v-for="(n,k) in i.childrens" :key="k">
                            <v-input-box :title="n.text" v-model="i.children[0].st_name" v-if="n.text=='社团名称'" ></v-input-box>
                            <v-input-box :title="n.text" v-model="i.children[0].st_zwname" v-if="n.text=='职务'" ></v-input-box>
                            <v-date-picker :title="n.text" @input="input"  v-model="i.children[0].st_appDate" v-if="n.zt==3"></v-date-picker>
                            <v-input-box class="tianjiadiv2" :inputShop="inputShop" :title="n.text" v-model="i.children[0].st_content" v-if="n.zt==2"></v-input-box>
                        </div>
                    </div>

                    <!-- 实践修改 -->
                    <div class="tianjia flex flex-wrap" v-else-if="practiceEditShow" >
                        <div class="tianjiadiv " v-for="(n,k) in i.childrens" :key="k">
                            <v-input-box :title="n.text" v-model="i.children[0].sj_danwei" v-if="n.zt==1" ></v-input-box>
                            <v-date-picker :title="n.text" @input="input"  v-model="i.children[0].sx_appDate" v-if="n.zt==3"></v-date-picker>
                            <v-input-box class="tianjiadiv2" :inputShop="inputShop" :title="n.text" v-model="i.children[0].sj_content" v-if="n.zt==2"></v-input-box>
                        </div>
                    </div>

                    <!-- 实习修改 -->
                    <div class="tianjia flex flex-wrap" v-else-if="internshipEditShow" >
                        <div class="tianjiadiv " v-for="(n,k) in i.childrens" :key="k">
                            <v-input-box :title="n.text" v-model="i.children[0].sx_danwei" v-if="n.text=='社团名称'" ></v-input-box>
                            <v-input-box :title="n.text" v-model="i.children[0].sx_gangwei" v-if="n.text=='职务'" ></v-input-box>
                            <v-date-picker :title="n.text" @input="input"  v-model="i.children[0].sx_appDate" v-if="n.zt==3"></v-date-picker>
                            <v-input-box class="tianjiadiv2" :inputShop="inputShop" :title="n.text" v-model="i.children[0].sx_content" v-if="n.zt==2"></v-input-box>
                        </div>
                    </div>

                    <!-- 项目修改 -->
                    <div class="tianjia flex flex-wrap" v-else-if="projectEditShow" >
                        <div class="tianjiadiv " v-for="(n,k) in i.childrens" :key="k">
                            <v-input-box :title="n.text" v-model="i.children[0].xm_name" v-if="n.zt==1" ></v-input-box>
                            <v-date-picker :title="n.text" @input="input"  v-model="i.children[0].sx_appDate" v-if="n.zt==3"></v-date-picker>
                            <v-input-box class="tianjiadiv2" :inputShop="inputShop" :title="n.text" v-model="i.children[0].xm_content" v-if="n.zt==2"></v-input-box>
                        </div>
                    </div>

                    <!-- 培训修改 -->
                    <div class="tianjia flex flex-wrap" v-else-if="trainingEditShow" >
                        <div class="tianjiadiv " v-for="(n,k) in i.childrens" :key="k">
                            <v-input-box :title="n.text" v-model="i.children[0].px_danwei" v-if="n.zt==1" ></v-input-box>
                            <v-date-picker :title="n.text" @input="input"  v-model="i.children[0].sx_appDate" v-if="n.zt==3"></v-date-picker>
                            <v-input-box class="tianjiadiv2" :inputShop="inputShop" :title="n.text" v-model="i.children[0].px_content" v-if="n.zt==2"></v-input-box>
                        </div>
                    </div>


                    <div class="shijian" v-if="i.buttonshops">
                        <el-button size="mini" type="danger" @click="shanchuBtn(k)">删除</el-button>
                        <el-button size="mini" @click="fanhuiBtn(i.id)">返回</el-button>
                        <el-button size="mini" @click="baocunBtn(k)" type="primary">保存</el-button>
                    </div>



                    


                </div>
                 <div class="partition"></div>

          </div>
      </div>

    </div>
</template>
<script>
export default {
    inject: ["reload"], //注入App里的reload方法
     props: {
        experienceShow: { type: Boolean},
    },
    data(){
        return{
            inputShop:true,
            inschoolTrainList:[
                {id:0,numShop:true,numShow:false, buttonshops:false,status:1,title:"在校任职",icon:"inschool",text:"青年学生会会长",time:"2006.09 - 2012.07",children:[ {zt:1,text:"社团名称",content:""},{zt:3,text:"在职时间"}],content:"帮助辅导员日常辅助工作，热爱祖国热爱北京热爱艺术热爱学习积极救济救济土归土试试手气吧。我在外面等着看电影呢是不是很爱吃到的地方也没有滴泪都流不到了福利来的我也不会说出来吧"},
                {id:1,numShop:true,numShow:false, buttonshops:false,status:2,title:"社团经历",icon:"anassociation",text:"围棋学习交流社",h2:"社团社员",time:"2006.09 - 2012.07",children:[ {zt:1,text:"社团名称",content:""},{zt:3,text:"在职时间"},{zt:1,text:"职务",content:""}],content:"帮助辅导员日常辅助工作，热爱祖国热爱北京热爱艺术热爱学习积极救济救济土归土试试手气吧。我在外面等着看电影呢是不是很爱吃到的地方也没有滴泪都流不到了福利来的我也不会说出来吧"},
                {id:2,numShop:true,numShow:false, buttonshops:false,status:1,title:"实践经历",icon:"practice",text:"国立美术馆",time:"2006.09 - 2012.07",children:[ {zt:1,text:"社团名称",content:""},{zt:3,text:"在职时间"}],content:"学习如何制作报纸，热爱祖国热爱北京热爱艺术热爱学习积极救济救济土归土试试手气吧。我在外面等着看电影呢是不是很爱吃到的地方也没有滴泪都流不到了福利来的我也不会说出来吧"},
                {id:3,numShop:true,numShow:false, buttonshops:false,status:1,title:"实习经历",icon:"internship",text:"北京环球互娱传媒科技有限公司",h2:"GUI设计",time:"2006.09 - 2012.07",children:[ {zt:1,text:"社团名称",content:""},{zt:3,text:"在职时间"}],content:"帮助辅导员日常辅助工作，热爱祖国热爱北京热爱艺术热爱学习积极救济救济土归土试试手气吧。我在外面等着看电影呢是不是很爱吃到的地方也没有滴泪都流不到了福利来的我也不会说出来吧"},
                {id:4,numShop:true,numShow:false, buttonshops:false,status:1,title:"项目经历",icon:"project",text:"暴雪设计大赛官网",time:"2006.09 - 2012.07",children:[ {zt:1,text:"社团名称",content:""},{zt:3,text:"在职时间"}],content:"前期调研，UXUI设计，热爱祖国热爱北京热爱艺术热爱学习积极救济救济土归土试试手气吧。我在外面等着看电影呢是不是很爱吃到的地方也没有滴泪都流不到了福利来的我也不会说出来吧"},
                {id:5,numShop:true,numShow:false, buttonshops:false,status:1,title:"培训经历",icon:"train",text:"精耕教育",time:"2006.09 - 2012.07",children:[ {zt:1,text:"社团名称",content:""},{zt:3,text:"在职时间"}],content:"前期调研，UXUI设计，热爱祖国热爱北京热爱艺术热爱学习积极救济救济土归土试试手气吧。我在外面等着看电影呢是不是很爱吃到的地方也没有滴泪都流不到了福利来的我也不会说出来吧"},
            ],
            inschoolTrainArray:[],
            edu_appDate:0,
            edu_appDate1:0,
            addShow:false,
            schEditShow:false,
            communityEditShow:false,
            practiceEditShow:false,
            internshipEditShow:false,
            projectEditShow:false,
            trainingEditShow:false,
            newEditId:0
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem("username"))!=null){
            this.resumeBtn()
        }
        console.log(this.experienceShow)
    },
    methods:{
        async resumeBtn(){
            if(JSON.parse(localStorage.getItem("username"))!=null){
                let params = {
                    id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                    token:JSON.parse(localStorage.getItem("username")).infoToken
                }
                let resume = await this.service.user.info(params)
                if(resume.code==0){
                    this.inschoolTrainArray.push({title:"在校任职",children:resume.data.resumeinfo.atschool}) 
                    this.inschoolTrainArray.push({title:"社团经历",children:resume.data.resumeinfo.shetuan})
                    this.inschoolTrainArray.push({title:"实践经历",children:resume.data.resumeinfo.praexperience}) 
                    this.inschoolTrainArray.push({title:"实习经历",children:resume.data.resumeinfo.internship})
                    this.inschoolTrainArray.push({title:"项目经历",children:resume.data.resumeinfo.proexperience}) 
                    this.inschoolTrainArray.push({title:"培训经历",children:resume.data.resumeinfo.traine})
                    this.inschoolTrainArray.map(i=>{
                        this.$set(i,'numShop',true)
                        this.$set(i,'numShow',false)
                        this.$set(i,'buttonshops',false)
                        this.$set(i,'status',1)
                        this.$set(i,'icon',"")
                        this.$set(i,"childrens",[{zt:1,text:"社团名称",content:""},{zt:3,text:"在职时间"},{zt:2,text:"工作内容"}])
                    })
                    this.inschoolTrainArray[1].children.map(i=>{this.$set(i,"zt",1)})
                    this.inschoolTrainArray[1].children[this.inschoolTrainArray[1].children.length-1].zt = 2
                    this.inschoolTrainArray[1].childrens.push({zt:1,text:"职务",content:""})
                     this.inschoolTrainArray[3].childrens.push({zt:1,text:"职务",content:""})
                    this.inschoolTrainArray.map(i=>{i.childrens.push({zt:2,text:"工作内容",content:""})})
                    this.inschoolTrainArray[0].icon = 'inschool';this.inschoolTrainArray[1].icon = 'anassociation'
                    this.inschoolTrainArray[2].icon = 'practice';this.inschoolTrainArray[3].icon = 'internship'
                    this.inschoolTrainArray[4].icon = 'project';this.inschoolTrainArray[5].icon = 'train'
                    console.log(this.inschoolTrainArray)
                }
            }
        },
        suspensionBtn(id){     //滑入事件
            switch(id){
                case 0:
                    this.inschoolTrainArray.map(i=>{i.numShow = false})
                    this.inschoolTrainArray[id].numShow = true
                    break;
                case 1:
                    this.inschoolTrainArray.map(i=>{i.numShow = false})
                    this.inschoolTrainArray[id].numShow = true
                    break;
                case 2:
                    this.inschoolTrainArray.map(i=>{i.numShow = false})
                    this.inschoolTrainArray[id].numShow = true
                    break;
                case 3:
                    this.inschoolTrainArray.map(i=>{i.numShow = false})
                    this.inschoolTrainArray[id].numShow = true
                    break;
                case 4:
                    this.inschoolTrainArray.map(i=>{i.numShow = false})
                    this.inschoolTrainArray[id].numShow = true
                    break;
                case 5:
                    this.inschoolTrainArray.map(i=>{i.numShow = false})
                    this.inschoolTrainArray[id].numShow = true
                    break;
            }
        },
        outsuspensionBtn(){
            this.inschoolTrainArray.map((i)=>{i.numShow = false;})
        },
        p(s) {
            return s < 10 ? '0' + s : s
        },
        input(timer){
            var d = new Date(timer[0])
            const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
            var b = new Date(timer[1])
            const resData = b.getFullYear() + '-' + this.p((b.getMonth() + 1)) + '-' + this.p(b.getDate())
            this.edu_appDate = resDate
            this.edu_appDate1 = resData
        },
        editData(index,id){//当前展开的标签下标和修改中的id
            this.newEditId=id;
            this.inschoolTrainArray[index].numShop = false;
            this.inschoolTrainArray[index].buttonshops=true;
            switch(index){
                case 0:
                    this.schEditShow=true;
                    break;
                case 1:
                    this.communityEditShow=true;
                    break;
                case 2:
                    this.practiceEditShow=true;
                    break;
                case 3:
                    this.internshipEditShow=true;
                    break;
                case 4:
                    this.projectEditShow=true;
                    break;
                case 5:
                    this.trainingEditShow=true;
                    break;
            }
            // console.log("sssssssssssssss")
            // console.log(this.inschoolTrainArray[index])


        },
        edit(id){//添加
            switch(id){
                case 0:
                    this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false})
                    this.inschoolTrainArray[id].numShop = false
                    this.inschoolTrainArray[id].buttonshops=true
                    this.schEditShow=true;
                    break;
                case 1:
                    this.inschoolTrainArray.map(i=>{i.numShop = true;i.buttonshops=false})
                    this.inschoolTrainArray[id].numShop = false
                    this.inschoolTrainArray[id].buttonshops=true
                    this.communityEditShow=true;
                    break;
                case 2: 
                    this.inschoolTrainArray.map(i=>{i.numShop = true;i.buttonshops=false})
                    this.inschoolTrainArray[id].numShop = false
                    this.inschoolTrainArray[id].buttonshops=true
                    this.practiceEditShow=true;
                    break;
                case 3:
                    this.inschoolTrainArray.map(i=>{i.numShop = true;i.buttonshops=false})
                    this.inschoolTrainArray[id].numShop = false
                    this.inschoolTrainArray[id].buttonshops=true
                    this.internshipEditShow=true;
                    break;
                case 4:
                    this.inschoolTrainArray.map(i=>{i.numShop = true;i.buttonshops=false})
                    this.inschoolTrainArray[id].numShop = false
                    this.inschoolTrainArray[id].buttonshops=true
                    this.projectEditShow=true;
                    break;
                case 5:
                    this.inschoolTrainArray.map(i=>{i.numShop = true;i.buttonshops=false})
                    this.inschoolTrainArray[id].numShop = false
                    this.inschoolTrainArray[id].buttonshops=true
                    this.trainingEditShow=true;
                    break;
            }
        },
        shanchuBtn(index){   //删除
            this.addShow=false;
            this.inschoolTrainArray.map(i=>{i.numShop = true;i.buttonshops = false});

            switch(index){
                case 0:
                    this.inschoolTrainArray[0].children.splice(this.newEditId,1);
                    let newList=this.inschoolTrainArray[0].children;
                    let arr=[];
                    for(let i in newList){
                        arr.push({
                            'sx_appDate':newList.sx_appDate[0],
                            'sx_appDate1':newList.sx_appDate[1],
                            'zx_name':newList.zx_name,
                            'zx_content':newList.zx_content
                        });
                    }
                    this.editUserInfo(arr);
                    this.addShow=false;
                    this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false});
                break;
            }
        },
        async editUserInfo(arr){
            let params = {
                id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                atschool:JSON.stringify(arr)
            }
            let status = await this.service.user.modify(params)
            if(status.code == 0){
                this.resumeBtn();
            }
        },
        fanhuiBtn(id){    //返回
            this.addShow=false;
            this.inschoolTrainArray.map(i=>{i.numShop = true;i.buttonshops = false})
        },
        async baocunBtn(k){    //保存
            let arr = []
            switch(k){
                case 0:         //在校任职
                let newList=this.inschoolTrainArray[k].children;
                if(newList[0].sx_appDate[0]==''||newList[0].sx_appDate[0]==undefined){this.$message({message:"请选择时间",type:'error'})}
                if(newList[0].sx_appDate[1]==''||newList[0].sx_appDate[1]==undefined){}
                if(newList[0].zx_name==''||newList[0].zx_name==undefined){}
                if(newList[0].zx_content==''||newList[0].zx_content==undefined){}



                for(let i in this.inschoolTrainArray[k].children){
                    arr.push({
                        'sx_appDate':this.inschoolTrainArray[k].children[i].sx_appDate[0],
                        'sx_appDate1':this.inschoolTrainArray[k].children[i].sx_appDate[1],
                        'zx_name':this.inschoolTrainArray[k].children[i].zx_name,
                        'zx_content':this.inschoolTrainArray[k].children[i].zx_content
                    });
                }
                    arr.push({
                        'sx_appDate':this.edu_appDate,
                        'sx_appDate1':this.edu_appDate1,
                        'zx_name':this.inschoolTrainArray[k].childrens[0].content,
                        'zx_content':this.inschoolTrainArray[k].childrens[2].content
                    });
                    
                    let params = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        atschool:JSON.stringify(arr)
                    }
                    let status = await this.service.user.modify(params)
                    if(status.code == 0){
                        this.resumeBtn()
                        this.addShow=false;
                        this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false})
                    }
                   break;
                case 1:         //社团经历
                    arr.push({
                        'st_appDate':this.edu_appDate,
                        'st_appDate1':this.edu_appDate1,
                        'st_name':this.inschoolTrainArray[k].childrens[0].content,
                        'st_zwname':this.inschoolTrainArray[k].childrens[2].content,
                        'st_content':this.inschoolTrainArray[k].childrens[3].content
                    })
                    let params1 = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        shetuan:JSON.stringify(arr)
                    }
                    let status1 = await this.service.user.modify(params1)
                    if(status1.code == 0){
                        this.resumeBtn()
                        this.addShow=false;
                        this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false})
                    }
                    break;
                case 2:         //实践经历
                    arr.push({'sx_appDate':this.edu_appDate,'sx_appDate1':this.edu_appDate1,'sj_danwei':this.inschoolTrainArray[k].childrens[0].content,'sj_content':this.inschoolTrainArray[k].childrens[2].content})
                    let params2 = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        praexperience:JSON.stringify(arr)
                    }
                    let status2 = await this.service.user.modify(params2)
                    if(status2.code == 0){
                        this.resumeBtn()
                        this.addShow=false;
                        this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false})
                    }
                    break;
                case 3:         //实习经历
                    arr.push({'sx_appDate':this.edu_appDate,'sx_appDate1':this.edu_appDate1,'sx_danwei':this.inschoolTrainArray[k].childrens[0].content,'sx_gangwei':this.inschoolTrainArray[k].childrens[2].content,'sx_content':this.inschoolTrainArray[k].childrens[3].content})
                    let params3 = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        internship:JSON.stringify(arr)
                    }
                    let status3 = await this.service.user.modify(params3)
                    if(status3.code == 0){
                        this.resumeBtn()
                        this.addShow=false;
                        this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false})
                    }
                    break;
                case 4:         //项目经历
                    arr.push({'sx_appDate':this.edu_appDate,'sx_appDate1':this.edu_appDate1,'xm_name':this.inschoolTrainArray[k].childrens[0].content,'xm_content':this.inschoolTrainArray[k].childrens[2].content})
                    let params4 = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        proexperience:JSON.stringify(arr)
                    }
                    let status4 = await this.service.user.modify(params4)
                    if(status4.code == 0){
                        this.resumeBtn()
                        this.addShow=false;
                        this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false})
                    }
                    break;
                case 5:         //培训经历
                    arr.push({'sx_appDate':this.edu_appDate,'sx_appDate1':this.edu_appDate1,'px_danwei':this.inschoolTrainArray[k].childrens[0].content,'px_content':this.inschoolTrainArray[k].childrens[2].content})
                    let params5 = {
                        id:JSON.parse(localStorage.getItem("username")).userinfo.id,
                        traine:JSON.stringify(arr)
                    }
                    let status5 = await this.service.user.modify(params5)
                    if(status5.code == 0){
                        this.resumeBtn()
                        this.addShow=false;
                        this.inschoolTrainArray.map(i =>{i.numShop = true;i.buttonshops=false})
                    }
                    break;
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .education-content-fenge{
        margin:15px 0;
        border:1px dashed rgba(222,222,222,1);
    }
    .inschoolTrains{
        //   margin-top:20px;
        width:600px;
        // height:154px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .container-content{
            .inschoolTrain-title{
                div:nth-of-type(1){
                    .icons{
                        width: 12px;
                        height: 12px;
                        padding: 23px 10px 0 20px;
                    }
                    h1{
                        height:20px;
                        font-size:16px;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                        line-height:20px;
                        padding-top: 20px;
                    }
                }
                div:nth-of-type(2){
                    cursor:pointer;
                    .edit{
                        width: 14px;
                        height: 14px;
                        padding: 20px 0px 0 0;
                    }
                    h1{
                        padding:20px 20px 0 3px;
                        height:20px;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(58,113,251,1);
                        line-height:20px;
                    }
                }
            }
            .inschoolTrain-content{
                padding: 20px 0 20px 0px;
                margin:0 20px;
                border-bottom:1px solid #DEDEDE;
                .inschoolTrain-content-top{
                    div:nth-of-type(1){
                        h1{
                            height:18px;
                            font-size:14px;
                            color:rgba(38,38,38,1);
                            line-height:18px;
                        }
                        h2{
                            padding-left: 12px;
                            height:18px;
                            font-size:14px;
                            color:rgba(89,89,89,1);
                            line-height:18px;
                        }
                        h3{
                            padding-left: 16px;
                            height:15px;
                            font-size:12px;
                            color:rgba(140,140,140,1);
                            line-height:15px;
                        }
                    }
                    div:nth-of-type(2){
                        .edits{
                            width: 14px;
                            height: 14px;
                            padding-right: 20px;
                            cursor:pointer
                        }
                    }
                }
                .inschoolTrain-content-bottom{
                    padding: 12px 0 0 0;
                    font-size:14px;
                    font-family:MicrosoftYaHeiUI;
                    color:rgba(89,89,89,1);
                    line-height:22px;
                }
                .tianjia{
                    width:100%;
                    flex-wrap: wrap;
                    .tianjiadiv{
                        // width:45%;
                        margin: 0 10px ; 
                        .container_box{
                            width:240px;
                        }
                        .tianjiadiv2{
                            width:800px;
                            padding: 15px 0px;
                            .container_box{
                                /deep/.el-input {
                                    margin-top: 12px;
                                    height: 68px;
                                    width: 100%;
                                    .el-input__inner{
                                        height: 100%;
                                        padding-bottom: 33px;
                                    }
                                }
                            }
                        }
                    }
                   
                }
                .shijian{
                    padding:10px 0 20px 20px;
                }
            }
        }
    }
    .inschoolTrain{
        margin-top:20px;
        width:880px;
        // height:154px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .container-content{
             .partition{
                    height: 20px;;
                    background-color:#F9F9F9;
                }
            .inschoolTrain-title{
                div:nth-of-type(1){
                    .icons{
                        width: 12px;
                        height: 12px;
                        padding: 23px 10px 0 20px;
                    }
                    h1{
                        height:20px;
                        font-size:16px;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                        line-height:20px;
                        padding-top: 20px;
                    }
                }
                div:nth-of-type(2){
                    cursor:pointer;
                    .edit{
                        width: 14px;
                        height: 14px;
                        padding: 20px 0px 0 0;
                    }
                    h1{
                        padding:20px 20px 0 3px;
                        height:20px;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(58,113,251,1);
                        line-height:20px;
                    }
                }
            }
            .inschoolTrain-content{
                padding: 20px 0 10px 42px;
                .inschoolTrain-content-top{
                    div:nth-of-type(1){
                        h1{
                            height:18px;
                            font-size:14px;
                            color:rgba(38,38,38,1);
                            line-height:18px;
                        }
                        h2{
                            padding-left: 12px;
                            height:18px;
                            font-size:14px;
                            color:rgba(89,89,89,1);
                            line-height:18px;
                        }
                        h3{
                            padding-left: 16px;
                            height:15px;
                            font-size:12px;
                            color:rgba(140,140,140,1);
                            line-height:15px;
                        }
                    }
                    div:nth-of-type(2){
                        .edits{
                            width: 14px;
                            height: 14px;
                            padding-right: 20px;
                            cursor:pointer
                        }
                    }
                }
                .inschoolTrain-content-bottom{
                    padding: 12px 0 0 0;
                    font-size:14px;
                    font-family:MicrosoftYaHeiUI;
                    color:rgba(89,89,89,1);
                    line-height:22px;
                }
                .tianjia{
                    width:100%;
                    flex-wrap: wrap;
                    .tianjiadiv{
                        // width:45%;
                        margin: 0 10px ; 
                        .container_box{
                            width:240px;
                        }
                        .tianjiadiv2{
                            width:800px;
                            padding: 15px 0px;
                            .container_box{
                                /deep/.el-input {
                                    margin-top: 12px;
                                    height: 68px;
                                    width: 100%;
                                    .el-input__inner{
                                        height: 100%;
                                        padding-bottom: 33px;
                                    }
                                }
                            }
                        }
                    }
                   
                }
                .shijian{
                    padding:10px 0 20px 20px;
                }
            }
        }
    }
</style>