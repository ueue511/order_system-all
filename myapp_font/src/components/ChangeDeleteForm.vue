<template>
<div class="table_admin">
  <form class="table_form_admin">
    <div>商品:</div>
    <input 
      class="table_no_look_admin" 
      type="text" 
      placeholder="名前"  
      v-model="SelectFull_name" 
      readonly/>
  </form>
  <br>
  <form class="table_form_admin">
    <div>値段:</div>
    <input class="table_no_look_admin" type="tel" maxlength="5" oninput="value = value.replace(/[^0-9]+/i,'');" placeholder="値段" v-model="SelectPrice" readonly/>
  </form>
  <br>
  <form class="table_form_admin">
    <div>略語:</div>
    <input class="table_no_look_admin" type="text" placeholder="オーダー名" v-model="SelectOrder_name" readonly/>
  </form>
  <br>
  <div :class="{table_form_admin:true,table_form_admin_select:true}">Hot or Ice:
    <select size="1" v-model="SelectTemperature" disabled>
      <option value="" hidden></option>
      <option value="hot">Hot</option>
      <option value="ice">Ice</option>
    </select>
  </div>
  <br>
  <div :class="{table_form_admin:true,table_form_admin_select:true}">カテゴリー:
    <select size="1" v-model="SelectCategre" disabled>
      <option value="" hidden></option>
      <option value="drink">ドリンク</option>
      <option value="setmeal">食事</option>
      <option value="dessert">デザート</option>
    </select>
  </div>
  <br>
  <div class="table_form_admin_flex">
    <p class="admin_text">画像:</p>
    <label>
      <img class="admin_img" :src="SelectImg" alt="No img">
    </label>
  </div>
</div>
</template>
<script>
import Methods from "@/api/methods";
export default {

  data() {
    return{
      changefullname: null, //変更した商品名
      changeprice: null, //変更した値段
      changename: null, //変更したオーダー名
      changetemperature: null, //変更したhotice
      changecategre: null, //変更したカテゴリ
      changefilename: null, //変更したファイル名前
      changefile: null, //変更した画像ファイル
      filename: null, //画像名前
      list: {}, //nodeに渡す際、連想配列に変換
    }
  },

  computed: {
    //各FORM値をstoreより受け取り
    SelectFull_name: {
      get() {
        return this.$store.state.listdeta.full_name;
      }
    },

    SelectPrice: {
      get(){
        return this.$store.state.listdeta.price;
      }
    },

    SelectOrder_name: {
      get() {
        return this.$store.state.listdeta.order_name;
      }
    },

    SelectFilename: {
      get() {
        return this.$store.state.listdeta.filename;
      }
    },

    SelectCategre:{
      get() {
        return this.$store.state.listdeta.categre;
      }
    },

    SelectTemperature: {
      get() {
        return this.$store.state.listdeta.temperature;
      }
    },

    SelectImg :{
      get() {
        if(this.SelectID === undefined) return;
          else if(this.picture != "") return this.picture;
          else return "data:image/png;base64," + this.$store.state.menuimg_all[this.SelectID]
      }
    },

    SelectID: {
      get() {
        return this.$store.state.listdeta.id
      },
      set(value) {
        this.value = value;
      }
    },

    //追加の場合、判定に使うリストを貰う
    SelectList: {
      get(){
        return this.$store.state.listdeta
      },
      set(value) {
        this.value = value;
      }
    }
  },
  //各種変更ファイルのリセット ※idの変更に反応
  watch: {
    "SelectID": function() {
      this.changefullname = null 
      this.changeprice = null 
      this.changename = null 
      this.changetemperature = null
      this.changecategre = null
      this.changefilename =  null
      this.changefile = null
      this.filename = null
      this.picture = ""
    }
  },

  methods: {
    //削除ボタンをクリックで発火
    async MenuDeleteChild(){
      this.list = {}
      this.list = {
        id: this.SelectID
      }
      this.$store.commit("ModalShow") //モーダル表示判定をstoreに送信
      const json_list = JSON.stringify(this.list);
      await Methods.AdminsterDelete(json_list);
    }
  }
};
</script>
<style scoped>
/*-----------------------*/
/*      登録項目         */
/*-----------------------*/
.table_admin{
  margin-left: 10vw;
}

.table_form_admin{
  display: flex;
  font-size: 20px;
}

.table_form_admin input{
  margin-left: 10px;
}

.table_form_admin_flex {
  display: flex;
}

.admin_img {
  object-fit: cover;
  width: 75.11px;
  height: 72.64px;
  margin-left: 17vw;
  border: 1px #000 solid;
  padding: 0.2em;
}

.table_form_admin:nth-child(12){
  margin-top: 10px;
}

.table_form_admin_input {
  margin-top:50px;
  width: 75vw;
  font-size:14px;
}

.table_form_admin_select {
  margin-right:5vw;
}

.table_no_look_admin {
  display: inline-block;
  border: none;
  text-align: left;
  border-bottom: 1px #000 solid;
  width: 57vw;
  font-size: 20px;
}

select {
  padding: 4px 3px;
}

.pay {
  top: 55.5vh;
  height: 35px;
  font-size: 25px;
}

/*-----------------------*/
/*      エラー表示       */
/*-----------------------*/

.error_text {
  color: red;
  font-size: 13px;
  padding: 2px 0 0 5px;
}

.error_box {
  border: solid 1.5px red;
}
</style>