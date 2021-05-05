<template>
    <div class="vue_radio">
      <Tabs 
        :Tabsnumchild = "tabs"
      />
      <ul class="contents">
        <TimeMenber />
        <ChangeDeleteForm
          ref="delete_child"
        />
        <Modalwindow
          :Modalwindowchild ="show_modal_delete"
          @delete_Model = "MenuDelete"
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
import ChangeDeleteForm from "../components/ChangeDeleteForm";
import ChangeTabstable from "../components/ChangeTabstable";
import Modalwindow from "../components/Modalwindow";
  export default {
    data() {
      return {
        isActive: "", //ラジオボタンの判定
        tabs: "adminsterdelete",
        show_modal_delete: "delete_show"
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
      MenuDelete() {
        this.$refs.delete_child.MenuDeleteChild() //子メソッドの実行
      }
    },
    components: {
      PerfectScrollbar,
      ChangeMunebutton,
      Tabs,
      ChangeTabstable,
      TimeMenber,
      ChangeDeleteForm,
      Modalwindow,
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
