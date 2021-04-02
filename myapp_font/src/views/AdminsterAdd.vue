<template>
  <div class="vue_radio">
    <Tabs 
      :Tabsnumchild = "tabs"
    />
    <ul class="contents">
      <TimeMenber/>
      <Form ref="child" @getChilderror="Error"/>
      <div class="error">{{error}}</div>
      
      <button class="pay" @click="MenuAdd">
          登録
      </button>
    </ul>
  </div>
</template>

<script>
import Tabs from "../components/Tabs";
import TimeMenber from '../components/TimeMenber';
import Form from '../components/Form';
  export default {
    components: {
     Tabs,
     TimeMenber,
     Form,
    },
    data() {
      return {
        isActive: "",
        tabs: 'adminsteradd',
        error: "" //エラー文を放り込む
      };     
    },
    methods: {
      MenuAdd() {
        this.$refs.child.MenuAddChild() //子のメソッドの実行
      },
      Error(childerror){
        this.error = childerror
      }
    }
  };
</script>

<style scoped>
.error {
  margin:10vh 10vw;
  color:red;
  font-size: 18px;
}
</style>