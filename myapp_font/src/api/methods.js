//node.jsの関数はこちらでまとめる
import Api from './index';

export default {
    //メニューリストのresponse処理
    testPosting() {
        return Api().get('/menulist');
    },

    //管理画面adminsterのメニューlist
    AdminsterList() {
        return Api().get('/adminster');
    },

    //注文メニューの追加
    AdminsterAddMenu(menu) {
        const menuadd = menu
        return Api().post('adminsteradd', menuadd)
    }
};