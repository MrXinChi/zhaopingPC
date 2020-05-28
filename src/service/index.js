import Vue from "vue";

import user from "./services/user";
import doubleElection from "./services/doubleElection";
import home from "./services/home";
import activity from "./services/activity";
import makeAnAppointment from "./services/makeAnAppointment";
import preach from "./services/preach";
import recruitment from "./services/recruitmentInformation";
import article from "./services/article";
import common from "./services/common";
import netsign from "./services/netsign";
import liveBroadcast from "./services/liveBroadcast";

import personalCenter from './services/personalCenter'

Vue.prototype.service = {
    user,
    doubleElection,
    home,
    activity,
    makeAnAppointment,
    preach,
    recruitment,
    article,
    common,
    personalCenter,
    netsign,
    liveBroadcast
};