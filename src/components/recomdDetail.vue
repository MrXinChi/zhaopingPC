<template>
<!-- @mouseout="outsuspensionBtn()" -->
    <div class="container"  >
        <!-- <jobIntention></jobIntention>
        <capabilityTag ></capabilityTag>
        <educationExperience></educationExperience>
        <skillSpecialty></skillSpecialty>
        <selfDescription></selfDescription>
        <lifePhotos></lifePhotos>
        <attachmentResume v-if="enclosureShow"></attachmentResume> -->

        <!-- 基本信息 -->
        <baseInformation ></baseInformation>
        <!-- 在校任职 -->
        <!-- <experience></experience> -->
        <experiences></experiences>
        <!-- 获奖情况-->
        <prizeWinning></prizeWinning>
    </div>
</template>
<script>
import jobIntention from './vResumeContent/jobIntention.vue'
import capabilityTag from './vResumeContent/capabilityTag.vue'
import baseInformation from './vResumeContent/baseInformation.vue'
import educationExperience from './vResumeContent/educationExperience.vue'
// import experience from './vResumeContent/experience.vue'
import experiences from './vResumeContent/experiences.vue'
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
        // experience,
        experiences,
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
</style>