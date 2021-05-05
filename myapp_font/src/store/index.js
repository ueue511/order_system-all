import Vue from 'vue';
import Vuex from 'vuex';
import Methods from '@/api/methods'
// import createPersistedState from "vuex-persistedstate";
// import auth from './modules/auth'
// import http from './modules/http'
//node.jsのlostアドレスを指定
//axiosもこちらで使用

Vue.use(Vuex)

export default new Vuex.Store({
  // modules: {
  //   auth,
  //   http,
  // },
    // データの永続化
  // strict: true,
  // plugins: [createPersistedState({
  //   key: "loglevel:webpack-dev-server",
  //   paths: ["token"],
  //   storage: window.sessionStorage
  // })],
  state: {
    subtotalList: [], //商品ボタンを押した際、追加
    DeleteSub: "hidden",
    tablemember: "", //人数
    tableno: "", //テーブル番号
    isAction: 1,
    showid: "", //商品ボタンの個数表示
    menulistDrink: "", //ジャンル別にlistを入れる変数
    menulistDessert: "",
    menulistSetmeal: "",
    menuimg_all: "", //メニューのimgを入れる変数
    adminsterlist: null, //adminsterのページメニュー
    listdeta: "",//adminstaerChageで受け取るそのメニューの詳細
    timemenber: true,//席番や客数の表示非表示

    menuImg: "", //menuに使われるpngファイル
    
    modalShow: false, //モーダルウィンドの判定
    modellist: "",

    userlist: "", //ログイン時に使用するリスト
    islogin: false,
    token: "",
    showStoreafter: false, //nodeでユーザー確認で拒否された場合true
  },
  mutations: {
    // 商品ボタンの商品を追加
    //subtotalListオブジェクトの中に追加されたメニューがあるか確認
    //mune_id...someでの繰り返し回数 ※のちにid指定で使用
    SubTotalVuex(state, { full_name, child_price }) {
      let mune_id = 0
      const result = state.subtotalList.some(function (item) {
        mune_id++
        if (item.name === full_name) {
          return mune_id
        }
      });
      //someでのtrun判定で数量を増加
      //false判定、新規作成
      if (result) {
        let index = mune_id - 1;
        state.subtotalList[index].quantity++;
        state.showid = state.subtotalList[index].quantity;
      } else {
        state.subtotalList.push({ name: full_name, price: child_price, quantity: 1 });
        state.showid = 1
      }
    },

    //adminsterChangeのlist受け取り
    SubListVues(state, list) {
      state.listdeta = list;
    },

    //TimeMenberの客数や卓番の表示非表示
    TimeMenber_show_store(state) {
      state.timemenber == true ? state.timemenber = false : state.timemenber = true
    },

    //メニューリストをnodeより受け取る
    async MenuList_node(state) {
      const list = await Methods.testPosting();

      state.menulistDrink = list[0].data[0];
      state.menulistDessert = list[0].data[1];
      state.menulistSetmeal = list[0].data[2];
      
      state.menuimg_all = list[1].data;

      return state.menulistDrink, state.menulistDessert, state.menulistSetmeal;
    },

    //adminのメニューリスト取得
    async AdminsterList_node(state) {
      const add_list = await Methods.AdminsterList();
      return state.adminsterlist = add_list.data;
    },

    //login実行
    Login_node(state, logintoken) {
      state.islogin = true;
      state.showStoreafter = false;
      state.modalShow = !state.modalShow
      state.token = logintoken.data.token
    },

    //login実行後、失敗したらバリデーション実行
    AfterShow_node(state) {
      state.showStoreafter = true
    },

    //全てリセット
    ResetList(state) {
      state.subtotalList = [];
      state.tablemember = "";
      state.tableno = "";
      state.listdeta = "";
      state.modellist = "";
    },

    //取り消しボタンを押し、削除ボタンの表示判定
    Delete(state, show) {
      if (show === "visible") {
        return state.DeleteSub = "visible";
      } else {
        return state.DeleteSub = "hidden";
      }
    },

    // 取り消しボタンのリセット
    ResetDelete(state) {
      return state.DeleteSub = "hidden"
    },

    //客数・卓番の追加
    GestoMenber(state, menber) {
      return state.tablemember = menber
    },
    Table(state, tablenum) {
      return state.tableno = tablenum
    },

    //モーダルウィンドの判定 watchで着火させる関数
    ModalShow(state, list) {
      state.modellist = list;
      if (state.modalShow === false) return state.modalShow = true;
      else return state.modalShow = false;
    }
  },

  //nodeAPI使用
  actions: {
    MenuList_nodeAction({ commit }) {
      commit("MenuList_node")
    },

    AdminsterList_nodeAction({ commit }) {
      commit("AdminsterList_node")
    },
    //loginでのAPI使用
    async Login_adminster({ commit }, userlist) {
      const json_list = JSON.stringify(userlist)
      const logintokin = await Methods.LoginAdminster(json_list);
      if (logintokin.data === false) {
        commit("AfterShow_node")
      } else {
        commit("Login_node", logintokin)
      }
    },
  },
});