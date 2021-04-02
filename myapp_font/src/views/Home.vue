<template>
  <div class="vue_radio">
    <Tabs 
      @TabNum="ShowNum"
      :Tabsnumchild = "tabs"
    />
    <ul class="contents">
      <TimeMenber />
      <Munebutton 
        :MuneListNum = "isActive"
      />
      <button @click="ResetDelete" class="pay">
        <router-link :to="{name: 'Subtotal'}">
          小計
        </router-link>
      </button>

    </ul>
  </div>
</template>

<script>
import Munebutton from "../components/Munebutton";
import Tabs from "../components/Tabs"
import TimeMenber from '../components/TimeMenber.vue';
  export default {
    components: {
     Munebutton,
     Tabs,
     TimeMenber
    },
    data() {
      return {
        isActive: "",
        tabs: 'home',
        subtotalList:[], //商品ボタンを押した際、追加
        tablemember: "",
        tableno: ""
      };     
    },
    
    // 初期ロードの判定 isActiveの内容変化でメニューを表示させている
    mounted: function() {
      this.isActive = this.$store.state.isAction;
    },

    methods: {
      // 移動の際 消去ボタン非表示
      SubTotal_show(show) {
        this.$store.commit('Delete', show)
      },
      ShowNum(isActiveChild) {
        return this.isActive=isActiveChild
      },
      ResetDelete(){
        this.$store.commit('ResetDelete')
      }
    },
  };
</script>