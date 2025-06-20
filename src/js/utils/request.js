const request = axios.create({
    baseUrl: "/api", // 这里是全局统一加上了 /api 前缀
    timeout: 5000
});

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
    config => {
        config.headers["Content-type"] = "application/json;charset=utf-8";
        let token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null;
        if(token) {
            config.headers["token"] = token; // 设置请求头token
        }
        return config;
    }, error => {
        return Promise.reject(error);
    }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if(response.config.responseType === "blob") {
            return res;
        }
        // 兼容服务端返回的字符串数据
        if(typeof res === "string") {
            res = res ? JSON.parse(res) : res;
        }
        if(res.code !== "200") {
            if(res.code === "401") {
                if($(".el-message-box__wrapper").length === 0) {
                    /*ELEMENT.MessageBox.alert("本次登录已失效，请重新登录。", "警告", {
                        type: "error",
                        showClose: false,
                        callback: action => {
                            vm.$store.commit("logout");
                        }
                    });*/
                }
            } else {
                ElementPlus.ElMessage.error(res.msg);
            }
        }
        return res;
    }, error => {
        console.log(`err: ${error}`);
        ElementPlus.ElMessage.error(error);
        return Promise.reject(error);
    }
);


const downloadFile = (content, fileName) => {
    const blob = new Blob([content]);
    const url = window.URL.createObjectURL(blob);
    let _a = document.createElement("a");
    _a.style.display = "none";
    _a.href = url;
    _a.setAttribute("download", fileName);
    document.body.appendChild(_a);
    _a.click();
    setTimeout(() => {
        _a.remove();
    }, 100);
};