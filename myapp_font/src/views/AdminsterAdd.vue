<template>
  <div class="vue_radio">
    <Tabs 
      :Tabsnumchild = "tabs"
    />
    <ul class="contents">
      <TimeMenber/>
      <Form 
        ref="child" 
        @getChilderror="Error"
      />
    <!-- エラーメッセージ<div class="error">{{error}}</div> -->

      <!-- <button class="pay" @click="MenuAdd">
          登録
      </button> -->
      <Modalwindow 
        :Modalwindowchild = "show_modal_add"
        :Modalwindowerror = "error"
        @add_Modal = "MenuAdd"
      />
    </ul>
  </div>
</template>

<script>
import Tabs from "../components/Tabs";
import TimeMenber from '../components/TimeMenber';
import Form from '../components/Form';
import Modalwindow from '../components/Modalwindow';

  export default {
    components: {
     Tabs,
     TimeMenber,
     Form,
     Modalwindow,
    },
    data() {
      return {
        isActive: "",
        tabs: "adminsteradd",
        error: "", //エラー文を放り込む
        show_modal_add: "add_show", //モーダル表示
      };     
    },
    methods: {
      MenuAdd() {
        this.$refs.child.MenuAddChild() //子のメソッドの実行
      },
      Error(childerror){
        this.error = childerror;
      }
    }
  };
</script>

<style scoped>
.error {
  margin:5vh 10vw;
  color:red;
  font-size: 18px;
}
</style>