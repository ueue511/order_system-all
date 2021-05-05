<template>
    <div class="vue_radio">
      <Tabs 
        :Tabsnumchild = "tabs"
      />
      <ul class="contents">
        <TimeMenber />
        <ChangeForm
          ref="change_child"
        />
        <Modalwindow
          :Modalwindowchild="modal_show_change"
          @change_Modal = "MenuChange"
        />
        <ChangeTabstable
          @TabNum="ShowNum"
          :Tabsnumchild = "tabs"
        />
      <perfect-scrollbar class="psTabel">
        <li>
          <ChangeMunebutton
            :MuneListNum="isActive"
          />
        </li>
      </perfect-scrollbar>
      </ul>
    </div>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import ChangeMunebutton from "../components/ChangeMunebutton";
import Tabs from "../components/Tabs";
import TimeMenber from "../components/TimeMenber";
import ChangeForm from "../components/ChangeForm";
import ChangeTabstable from "../components/ChangeTabstable";
import Modalwindow from "../components/Modalwindow";
  export default {
    data() {
      return {
        isActive: "", //ラジオボタンの判定
        tabs: 'adminsterchange',
        modal_show_change: "change_show"
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
      },

      MenuChange(){
        this.$refs.change_child.MenuChageChild()
      }
    },
    components: {
      PerfectScrollbar,
      ChangeMunebutton,
      Tabs,
      ChangeTabstable,
      TimeMenber,
      ChangeForm,
      Modalwindow
    }
  };
</script>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />

<style scoped>
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

data-v-78d3e85d .pay {
  top: 55.5vh;
  height: 35px;
  font-size: 25px;
}

/*-----------------------*/
/*      メニュー類        */
/*-----------------------*/
.psTabel {
  position: absolute;
  top: 65vh;
  height: 35vh;
  border-top: 2px solid #666;
}

/*-----------------------*/
/*       769px~          */
/*-----------------------*/
@media screen and (min-width: 769px) {
  .psTabel {
    top: 69.7vh;
  }
}

/*-----------------------*/
/*      登録項目         */
/*-----------------------*/
.table_form_admin{
  margin-top: 0;
}
</style>
