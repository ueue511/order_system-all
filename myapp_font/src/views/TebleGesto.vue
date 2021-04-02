<template>
    <div class="vue_radio">
      <Tabs 
        :Tabsnumchild = "tabs"
      />
      <ul class="contents">
        <TimeMenber />
        <form class="table_form">
          人数:<input type="tel" class="table_no_look" v-model="tablemember" maxlength="2" oninput="value = value.replace(/[^0-9]+/i,'');" />
        </form>
        <form class="table_form">
          席番:<input type="tel" class="table_no_look" v-model="tableno"  maxlength="2" oninput="value = value.replace(/[^0-9]+/i,'');" />
        </form>

        <Tabstable
          @TabNum="ShowNum"
          :Tabsnumchild = "tabs"
        />
      <perfect-scrollbar class="psTabel">
        <li>
          <Munebutton
            :MuneListNum="isActive"
          />
        </li>
      </perfect-scrollbar>
      </ul>
    </div>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import Munebutton from "../components/Munebutton";
import Tabs from "../components/Tabs"
import TimeMenber from "../components/TimeMenber"
import Tabstable from "../components/Tabstable"
  export default {
    data() {
      return {
        isActive: "", //ラジオボタンの判定
        tabs: "tablegesto",
        subtotalList:[], //商品ボタンを押した際、追加
        tableno: this.$store.state.tableno, //人数
        tablemember: this.$store.state.tablemember, //テーブル番号
      };
    },
    mounted: function(){
      this.isActive = this.$store.state.isAction;
    },
    watch: {
      tableno: function(tableno){
        this.$store.commit("Table", tableno);
      },
      tablemember: function(tablemember){
        this.$store.commit("GestoMenber", tablemember);
      }
    },
    methods: {
      ShowNum(isActiveChild) {
        return this.isActive=isActiveChild
      }
    },
    components: {
      PerfectScrollbar,
      Munebutton,
      Tabs,
      TimeMenber,
      Tabstable
    }
  };
</script>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />

<style>

input {
  display: none;
}

.table_form {
  text-align: right;
  margin-top: 5vh;
  margin-right: 8vw;
  font-size: 20px;  
}

.table_no_look {
  display: inline-block;
  border: none;
  text-align: right;
  border-bottom: 1px #000 solid;
  width: 15vw;
  margin-left: 3vw;
  font-size: 20px;
}

/*-----------------------*/
/*      メニュー類        */
/*-----------------------*/
.psTabel {
  position: absolute;
  top: 45vh;
  height: 45vh;
  border-top: 2px solid #666;
}

/*-----------------------*/
/*       769px~          */
/*-----------------------*/
@media screen and (min-width: 769px) {
  .psTabel {
    position: absolute;
    top: 45vh;
    height: 45vh;
    width: 80vw;
    border-top: 2px solid #666;
  }
}
</style>
