//node.jsのlostアドレスを指定
//axiosもこちらで使用

import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3010/'
    });
};