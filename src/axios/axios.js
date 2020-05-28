import axios from 'axios';

// var BASE_URL = '/';
var BASE_URL = process.env.NODE_ENV === 'development' ? '/' : 'http://a.jiuyeb.net/mobile.php'
// 创建基请求
const $http = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// 请求拦截器
$http.interceptors.request.use(config => {
    config.headers.auth = 'Basic bmV3d2ViOm5ld3dlYg==';
    const userId = JSON.parse(localStorage.getItem("username")) == null ? 1 : JSON.parse(localStorage.getItem("username")).userinfo.id
    if(config.url!="/Systemresource/uploadfile"){
        config.data = {
            ...config.data,
            login_user_id: userId,
            login_admin_school_code: 10246,
            school_id: "5f431052-b4af-0969-a37a-955f7903c8d5",
            login_admin_school_id: "5f431052-b4af-0969-a37a-955f7903c8d5"
        }
    }
    return config
}, err => {
    console.log(err)
})

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function POST(url, params) {
    return $http.post(url, params, {
        headers: {
            'auth': 'application/x-www-form-urlencoded'
        }
    })
}
/**
 * get方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} responseType [responseType]
 */
export function GET(url, params, responseType) {
    return $http.get(url, {
        params: params,
        responseType: responseType
    })
}
/**
 * post方法，对应post请求  上传文件
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function FILE(url, params) {
    return $http.post(url, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 添加响应拦截器
$http.interceptors.response.use(function (res) {
    var code = res.data.state;
    if (code == 10004) {
        console.log("10004")
    }
    return res.data;
}, function (error) {
    var str = error.message;
    if (str.indexOf('Network Error') > -1) {
        // Toast('网络错误')
    } else if (str.indexOf('timeout') > -1) {
        // Toast('请求超时')
    } else {
        // Toast('服务器错误')
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});