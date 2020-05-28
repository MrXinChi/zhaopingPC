import Vue from 'vue'

// 格式化时间到秒
window.timestampToTime = Vue.prototype.timestampToTime = function (time, type) {
    var date = new Date(time);
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return type === 'date' ? Y + M + D : Y + M + D + h + m + s
}

// 格式化时间到秒分隔符为点
window.timestampToTimePoint = Vue.prototype.timestampToTimePoint = function (time, type) {
    var date = new Date(time);
    var Y = date.getFullYear() + ".";
    var M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + ".";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes();
    return type === 'date' ? Y + M + D : Y + M + D + h + m
}

// 格式化时间保留时分
window.timestampToHours = Vue.prototype.timestampToHours = function (time) {
    if(time=='0'||time==null){
        return '00:00'
    }
    var date = new Date(time);
    var h = date.getHours() + ":";
    var m = date.getMinutes();
    return h + m;
}

// 格式化时间到日
window.timestampToTimeDay = Vue.prototype.timestampToTimeDay = function (time, type) {
    var date = new Date(time);
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    return type === 'date' ? Y + M + D : Y + M + D
}

// 格式化富文本
window.formatContent = Vue.prototype.formatContent = function (content) {
    const regex = new RegExp('<img', 'gi')
    return content.replace(regex, `<img style="max-width: 100%; height: auto"`);
}

// 判断时间是否失效
window.timesStatus = Vue.prototype.timesStatus = function (time, type) {
    var date = new Date(time);
    var dateTime=date.getTime();
    var newDate=new Date();
    var newDateTime=newDate.getTime();
    if(dateTime-newDateTime>0){
        return true;
    }
    return false;
}
