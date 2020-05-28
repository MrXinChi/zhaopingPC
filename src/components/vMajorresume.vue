<template>
<!-- @mouseout="outsuspensionBtn()" -->
    <div class="container"  >
        <div class="intention">
           <div class="intention-title flex flex_y_center flex_x_bten">
                <div class="flex flex_y_center">
                    <v-icon icon-class="icon-intention" class-name="icons"></v-icon>
                    <h1>求职意向</h1>
                </div>
                <div v-if="num1Show" @click="edit">
                    <v-icon icon-class="icon-edit" class-name="edit"></v-icon>
                </div>
            </div>
            <div class="intention-centent">
                <ul>
                    <li class="flex">
                        <span>所属行业：</span>
                        <ol class="flex">
                            <li v-for="(i,index) in industryList" :key="index">{{i.text}}</li>
                        </ol>                       
                    </li>
                    <li class="flex">
                        <span>职位类别：</span>
                        <ol class="flex">
                            <li v-for="(i,index) in positionList" :key="index">{{i.text}}</li>
                        </ol>   
                    </li>
                    <li class="flex">
                        <span>工作地点：</span>
                        <ol class="flex">
                            <li v-for="(i,index) in workList" :key="index">{{i.text}}</li>
                        </ol>   
                    </li>
                </ul>
            </div>
        </div>
      <!-- <jobIntention></jobIntention> -->
     
        
        <educationExperience :educationExperienceShow="educationExperienceShow"></educationExperience>
        
        <!-- <experience :experienceShow="experienceShow"></experience> -->
        <experiences :experienceShow="experienceShow"></experiences>
        
        <skillSpecialty :skillSpecialtyShow="skillSpecialtyShow"></skillSpecialty>
        
        <prizeWinning :prizeWinningShow="prizeWinningShow"></prizeWinning>
        
        <selfDescription :selfDescriptionShow="selfDescriptionShow"></selfDescription>
        
        <lifePhotos :lifePhotosShow="lifePhotosShow"></lifePhotos>
        
        <attachmentResume v-if="enclosureShow"></attachmentResume> 
    </div>
</template>
<script>
import jobIntention from './vResumeContent/jobIntention.vue'
import capabilityTag from './vResumeContent/capabilityTag.vue'
import baseInformation from './vResumeContent/baseInformation.vue'
import educationExperience from './vResumeContent/educationExperience.vue'
import experience from './vResumeContent/experience.vue'
import skillSpecialty from './vResumeContent/skillSpecialty.vue'
import prizeWinning from './vResumeContent/prizeWinning.vue'
import selfDescription from './vResumeContent/selfDescription.vue'
import lifePhotos from './vResumeContent/lifePhotos.vue'
import attachmentResume from './vResumeContent/attachmentResume.vue'
export default {
    components:{
        jobIntention,
        capabilityTag,
        baseInformation,
        educationExperience,
        experience,
        skillSpecialty,
        prizeWinning,
        selfDescription,
        lifePhotos,
        attachmentResume
    },
    props:{

    },
    data(){
        return{
            educationExperienceShow:true,
            experienceShow:true,
            skillSpecialtyShow:true,
            prizeWinningShow:true,
            selfDescriptionShow:true,
            lifePhotosShow:true,
            industryList: [
                { text: "计算机软件",id:1 },
                { text: "/互联网",id:2 },
                { text: "商务",id:3 }
            ],
            positionList: [
                { text: "前端程序工程师",id:1 },
                { text: "/UI",id:2 },
                { text: "网页设计",id:3}
            ],
            workList: [{ text: "北京",id:1}, { text: "/上海",id:2 }, { text: "深圳",id:3 }],
        }
    },
    props:{
        enclosureShow:Boolean,
    },
    created(){
        
    },
    methods:{
       
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width:600px;
    }
    .edit{
        width: 14px;
        height: 14px;
        padding: 24px 20px 0 0;
    }
    .enclosure{
        margin-top: 20px;
        width:880px;
        height:98px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .enclosure-title{
            padding: 20px 0 0 20px;
            div:nth-of-type(1){
                h1{
                    height:20px;
                    font-size:16px;
                    font-weight:bold;
                    color:rgba(38,38,38,1);
                    line-height:20px;
                } 
            }
            div:nth-of-type(2){
                .edits{
                    width: 14px;
                    height: 14px;
                }
                h1{
                    height:20px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(58,113,251,1);
                    line-height:20px;
                }
            }
        }
        .enclosure-content{
            padding:22px 0 0 24px;
            ul{
                li{
                    width: 30%;
                    .icons{
                        width:13px;
                        height: 16px;
                    }
                    h1{
                        padding-left: 10px;
                    }
                }
            }
        }
    }
    .intention {
        width: 600px;
        // height: 145px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        .intention-title {
            .icons {
                width: 12px;
                height: 12px;
                padding: 23px 10px 0 20px;
            }
            h1 {
                height: 20px;
                font-size: 16px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                line-height: 20px;
                padding-top: 20px;
            }
        }
        .intention-centent{
            margin:20px;
            border-bottom:1px solid #DEDEDE;
            ul{
                margin-bottom:20px;
                li{
                    margin-top:15px;
                    ol{
                        li{margin:0}
                    }
                }
            }
        }
    }
    .educationExperience{
        width:600px;
        // height:217px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .education-title{
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
                .edits{
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
    }
    .experience{
        width:600px;
        background:rgba(255,255,255,1);
        border-radius:4px;
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
    }
</style>