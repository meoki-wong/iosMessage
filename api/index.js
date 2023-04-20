
const baseUrl = "https://supermeoki.xyz/data_admin"
// const baseUrl = "http://localhost:10020/data_admin"

const API = {
    createUser: (data) => uni.request({
        url: baseUrl + '/createUser',
        method: 'POST',
        data
    }),
    createMsg: (data) => uni.request({
        url: baseUrl + '/createMsg',
        method: 'POST',
        data
    }),
    findUserList: (data) => uni.request({
        url: baseUrl + '/findUserList',
        method: 'POST',
        data
    }),
    createMsgDetail: (data) => uni.request({
        url: baseUrl + '/createMsgDetail',
        method: 'POST',
        data
    }),
    delMsg: (data) => uni.request({
        url: baseUrl + '/delMsg',
        method: 'POST',
        data
    }),
    uploadFile: (formData) => uni.request({
        url: baseUrl + '/uploadFile',
        method: 'POST',
        formData,
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }),
}


export default API