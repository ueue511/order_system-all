<template>
    <div class="vue_radio">
      <Tabs
        @Deletechild="DeleteTrue"
        :Tabsnumchild="tabs"
      />
      <div class="contents">
        <TimeMenber />
        <div class="subtotal" v-if="isActive === '1'">
          <perfect-scrollbar>
            <button class="lain_click" 
              v-for="(list,index) in $store.state.subtotalList" :key="index">
              <div>{{list.name}} × {{list.quantity}}</div>
              <button class="deletebutton" @click.stop="DeleteMenu(index)" :style="{visibility: deleteTrue}">削除</button>
              <div>￥{{list.price * list.quantity}}</div>
            </button>
            <p class="lineBottom"></p>
            <ul id="product">
              <li>小計</li>
              <li>￥{{ total_all }}</li>
            </ul>
          </perfect-scrollbar>
        </div>
        <Modalwindow 
          :Modalwindowchild = "show_modal_total"
        />
      </div>
    </div>
</template>
<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import Modalwindow from "../components/Modalwindow";
import Tabs from "../components/Tabs";
import TimeMenber from "../components/TimeMenber";
export default {
  data() {
    return {
      isActive: "1", //ラジオボタンの判定
      tabs: "subtotal",
      deleteTrue: this.$store.state.DeleteSub, //取り消しボタンの表示 非表示
      show_modal: false, //送信ボタンを押した際、モーダルウィンドの表示判定
      delete_contents: [], //削除商品を格納するlist
      show_modal_total: "total_show", //モーダル表示
    };
  },
 
  //注文リストの合計金額を計算する関数
  computed: {
    total_all() {
      let list = this.$store.state.subtotalList;
      let price_total = list.reduce(function(sum, element) {
        return sum + element.price*element.quantity;
        }, 0);
      return price_total;
    }
  },

  methods: {
    //子から受け取った削除ボタンの表示判定
    DeleteTrue(deleteTruechild) {
      this.deleteTrue = deleteTruechild
    },
    //削除ボタンを押した際、削除する関数
    DeleteMenu(index) {
      if(this.$store.state.subtotalList[index].quantity > 1){
        return this.$store.state.subtotalList[index].quantity--
      } else {
        return this.$store.state.subtotalList.splice(index, 1)}
    },
  },
  components: {
    PerfectScrollbar,
    Modalwindow,
    Tabs,
    TimeMenber
  }
};
</script>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style scoped>
.tablenameno {
  display: flex;
  padding-left: 5px;
  justify-content: space-between;
}

/*-----------------------*/
/*          小計         */
/*-----------------------*/
.subtotal {
  width: 93%;
  height: 78vh;
  position: absolute;
  left: 16.5px;
  top: 35px;
}

.subtotal p {
  font-size: 14px;
  padding: 5px;
}

#product {
  display: flex;
  justify-content: space-between;
  padding: 30px 20px 10px 30px;
  list-style: none;
  font-size: 16px;
}

.lain_click  {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 10px 30px;
  width: 100%;
  font-size: 16px;
}

.lain_click >:first-child {
  margin-right: auto;
}

.lineThrough {
  text-decoration-line: line-through;
}

.lineBottom {
  margin: 80px 20px 0 20px;
  width: 85%;
  border-bottom: 1px #000 solid;
}

.deletebutton {
  background-color: #7DCBD0;
  border-radius: 74px;
  border: 1.5px solid #388388;
  width: 60px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 0;
  appearance: none;
}

.ps {
  height: 70vh;
  border: 2px solid #666;
}

/* リセット */
.contents li::before {
  content: none
}

.contents li::after {
  content: none
}


/*-----------------------*/
/*       769px~          */
/*-----------------------*/
@media screen and (min-width: 769px) {
  .lineBottom {
    margin: 80px 20px 0 20px;
    width: 93%;
    border-bottom: 1px #000 solid;
  }
}
</style>