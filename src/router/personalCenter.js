import Resume from '@/views/personalCenter/children/myResume/resume.vue'
import Appointment from '@/views/personalCenter/children/myAppointment/appointment.vue'
import Delivery from '@/views/personalCenter/children/myDelivery/delivery.vue'
import Collection from '@/views/personalCenter/children/myCollection/collection.vue' // 我的收藏
import CollectionNotice from '@/views/personalCenter/children/myCollection/notice.vue' // 我的收藏/招录公告
import CollectionNoticeDetail from '@/views/personalCenter/children/myCollection/noticeDetail.vue' // 我的收藏/招录公告详情
import CollectionJob from '@/views/personalCenter/children/myCollection/job.vue' // 我的收藏/职位
import CollectionCompany from '@/views/personalCenter/children/myCollection/company.vue' // 我的收藏/用人单位
import CollectionaAtivity from '@/views/personalCenter/children/myCollection/activity.vue' // 我的收藏/活动
import CollectionaPreachMeeting from '@/views/personalCenter/children/myCollection/preachMeeting.vue' // 我的收藏/宣讲会

import Registration from '@/views/personalCenter/children/myRegistration/registration.vue' //  我的报名
import RegistrationDoubleElection from '@/views/personalCenter/children/myRegistration/doubleElection.vue' //  我的报名/双选会
import RegistrationPreachMeeting from '@/views/personalCenter/children/myRegistration/preachMeeting.vue' //  我的报名/宣讲会
import RegistrationAtivity from '@/views/personalCenter/children/myRegistration/activity.vue' //  我的报名/活动报名
import ObtainEmployment from '@/views/personalCenter/children/employmentManagement/obtainEmployment.vue' //  就业管理
import InfoVerify from '@/views/personalCenter/children/employmentManagement/infoVerify.vue' //  就业管理/信息核实
import GraduationDestination from '@/views/personalCenter/children/employmentManagement/graduationDestination.vue' //  就业管理/毕业去向
import RecommendedDetail from '@/views/personalCenter/children/employmentManagement/recommendedDetail.vue' //  就业管理/就业推荐表
import myNews from '@/views/personalCenter/children/myNews/myNews.vue' //  我的信息
import Invitation from '@/views/personalCenter/children/myInvitation/Invitation.vue' //  面试邀约
import InvitationDetail from '@/views/personalCenter/children/myInvitation/invitationDetail.vue' //  面试邀约详情
import Netsign from '@/views/personalCenter/children/myNetsign/Netsign.vue' //  我的网签
import NetsignDetail from '@/views/personalCenter/children/myNetsign/netsignDetail.vue' //  受邀网签
import AgreementDetail from '@/views/personalCenter/children/myNetsign/agreementDetail.vue' //  协议书管理
import TerminationDetail from '@/views/personalCenter/children/myNetsign/terminationDetail.vue' //  解约管理

export const routes = [{
        path: "/user",
        redirect: "/user/resume"
    },
    {
        path: '/user/resume',
        name: "user/resume",
        component: Resume
    },
    {
        path: '/user/appointment',
        name: "user/appointment",
        component: Appointment
    },
    {
        path: '/user/appointment_detail',
        name: "user/appointment_detail",
        component: ()=>import('../views/personalCenter/children/myAppointment/details.vue')
    },
    {
        path: '/user/delivery',
        name: "user/delivery",
        component: Delivery
    },
    {
        path: '/user/collection',
        name: "user/collection",
        component: Collection,
        children: [{
                path: '/user/collection',
                redirect: "/user/collection/job"
            },
            {
                path: 'notice',
                name: "notice",
                component: CollectionNotice
            },
            {
                path: 'noticeDetail',
                name: "noticeDetail",
                component: CollectionNoticeDetail
            },
            {
                path: 'job',
                name: "job",
                component: CollectionJob
            },
            {
                path: 'company',
                name: "company",
                component: CollectionCompany
            },
            {
                path: 'preachMeeting',
                name: "preachMeeting",
                component: CollectionaPreachMeeting
            },
            {
                path: 'activity',
                name: "activity",
                component: CollectionaAtivity
            }

        ]
    },
    {
        path: '/user/registration',
        name: "user/registration",
        component: Registration,
        children: [
            {
                path: '/user/registration',
                redirect: "/user/registration/activity"
            },
            {
                path: 'doubleElection',
                name: "doubleElection",
                component: RegistrationDoubleElection
            },
            {
                path: 'preachMeeting',
                name: "preachMeeting",
                component: RegistrationPreachMeeting
            },
            {
                path: 'activity',
                name: "activity",
                component: RegistrationAtivity
            },
        ]
    },
    {
        path: '/user/obtainEmployment',
        name: "user/obtainEmployment",
        component: ObtainEmployment 
    },
    {
        path: '/user/infoVerify',
        name: "user/infoVerify",
        component: InfoVerify 
    },
    {
        path: '/user/graduationDestination',
        name: "user/graduationDestination",
        component: GraduationDestination 
    },
    {
        path: '/user/recommendedDetail',
        name: "user/recommendedDetail",
        component: RecommendedDetail 
    },
    {
        path: '/user/myNews',
        name: "user/myNews",
        component: myNews 
    },
    {
        path: '/user/Invitation',
        name: "user/Invitation",
        component: Invitation 
    },
    {
        path: '/user/invitationDetail',
        name: "invitationDetail",
        component: InvitationDetail 
    },
    {
        path: '/user/Netsign',
        name: "user/Netsign",
        component: Netsign,
        children: [{
                path: "/user/Netsign",
                redirect: "/user/Netsign/netsignDetail",
            },
            {
                path: 'netsignDetail',
                name: "netsignDetail",
                component: NetsignDetail,
            },
            {
                path: 'agreementDetail',
                name: "agreementDetail",
                component: AgreementDetail,
            },
            {
                path: 'terminationDetail',
                name: "terminationDetail",
                component: TerminationDetail,
            }
        ]
    },
];

export default routes;