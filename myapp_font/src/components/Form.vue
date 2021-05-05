<template>
<div class="table_admin">
  <form class="table_form_admin">
    <input :class="{table_no_look_admin:true,error_box:box_list.full_name}" type="text" placeholder="商品名" v-model="addfullname" />
  </form>
  <br v-if="!error.full_name">
  <span class="error_text" v-if="error.full_name">商品を入力してください</span>

  <form class="table_form_admin">
    <input :class="{table_no_look_admin:true,error_box:box_list.price}" type="tel" placeholder="値段" maxlength="5" oninput="value = value.replace(/[^0-9]+/i,'');" v-model="addprice" />
  </form>
  <br v-if="!error.price">
  <div class="error_text" v-if="error.price">値段を設定してください</div>
  
  <form class="table_form_admin">
    <input :class="{table_no_look_admin:true,error_box:box_list.order_name}" type="text" placeholder="オーダー名" v-model="addname" />
  </form>
  <br v-if="!error.order_name">
  <div class="error_text" v-if="error.order_name">オーダー名を入力してください</div>
  
  <div :class="{table_form_admin:true,table_form_admin_select:true,error_box:box_list.temperature}">Hot or Ice:
    <select size="1" v-model="addtemperature" >
      <option value="" hidden>選択してください</option>
      <option value="hot">Hot</option>
      <option value="ice">Ice</option>
    </select>
  </div>
  <br v-if="!error.temperature">
  <div class="error_text" v-if="error.temperature">Hot or Iceを選択して下さい</div>


  <div :class="{table_form_admin:true,table_form_admin_select:true,error_box:box_list.categre}">カテゴリー:
    <select size="1" v-model="addcategre" >
      <option value="" hidden>選択してください</option>
      <option value="drink">ドリンク</option>
      <option value="setmeal">食事</option>
      <option value="dessert">デザート</option>
    </select>
  </div>
  <br v-if="!error.categre">
  <div class="error_text" v-if="error.categre">選択してください</div>

  <p class="admin_text">画像:</p>
  <div class="table_form_admin_input">
    <label>
      <input type="file" @change="UpLoad" />
      <img class="admin_img" :src="this.picture" alt="No img">
    </label>
    <div class="error_text" v-if="error.filename">画像をupしてください</div>
  </div>
</div>
</template>
<script>
import Methods from "@/api/methods";

export default {

  data() {
    return{
      addfullname: "", //商品名
      addprice: "", //値段
      addname: "", //オーダー名
      addtemperature: "", //hotice
      addcategre: "", //カテゴリ
      file: null, //画像ファイル
      picture: null,
      filename: "", //画像名前
      list: {}, //nodeに渡す際、連想配列に変換
      error_messge:"",
      error_list: {}, //エラー項目を入れる配列。エラーの数量判定の為

      //各種エラーの判定表示リスト
      error: {
        full_name: false,
        price: false, 
        order_name: false, 
        temperature: false, 
        categre: false,
        filename: false,
      },

      box_list: {
        full_name: false,
        price: false,
        order_name: false,
        temperature: false,
        categre: false,
        filename: false,
      }
    }
  },

  computed: {

  },
  watch: {
    addfullname: function() {
      this.error["full_name"] = false;
      this.box_list["full_name"] = false;
    },
    addprice: function() {
      this.error["price"] = false;
      this.box_list["price"] = false;
    },
    addname: function() {
      this.error["order_name"] = false;
      this.box_list["order_name"] = false;
    },
    addtemperature: function() {
      this.error["temperature"] = false;
      this.box_list["temperature"] = false;
    },
    addcategre: function() {
      this.error["categre"] = false;
      this.box_list["categre"] = false;
    },
    picture: function() {
      this.error["filename"] = false;
      this.error["filename"] = false;
    }
  },

  methods: {
    //受け取った画像ファイルをファイルとファイルネームに分ける
    async UpLoad(event) {
      const image = event.target.files || event.dataTransfer.files;
      this.file = image[0];
      if(this.CheckFile(this.file)){
      this.picture = await this.getBase64(this.file)
      this.filename = "./img/" + image[0].name;
      }
    },
    //base64に変換
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    //受け取ったファイルのチェック
    CheckFile(file) {
      let result = true;
      const SIZE_LIMIT = 5000000; //5MB 容量制限
      //ローカルマシンから読み込みをキャンセルしたら処理中断
      if(!file) {
        result = false;
      }
      // jpegかpng関連ファイル以外は受け付けない
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        result = false;
      }
      //上限サイズより大きければ受け付けない
      if (file.siza > SIZE_LIMIT) {
        result = false;
      }
      return result
    },

    //親AdminsterAddAdminsterAddの登録ボタンをクリックで発火
    async MenuAddChild(){
      //エラーだけを格納するリストをリセット
      this.error_list ={};
      this.erro_box = {};
      this.list = {
        full_name: this.addfullname,
        price: this.addprice,
        order_name: this.addname,
        temperature: this.addtemperature,
        categre: this.addcategre,
        filename: this.filename,
      }
        for(var k of Object.keys(this.list)){
          if (this.list[k]) {
            this.error[k] = false;
            this.box_list[k] = false;
          }
          if (!this.list[k]) {
            this.error[k] = true;
            this.box_list[k] = true;
            this.error_list[k] = this.error[k];
          }
        }
        //error_listのオブジェクト数の取り出し
        const listJudg =Object.keys(this.error_list).length
        if(listJudg === 0){
          this.$store.commit("ModalShow") //モーダル表示判定をstoreに送信
          this.error_messge = ""
           //jsonファイルに変換 fromDataで送る際、必要
          const json_list = JSON.stringify(this.list)
          await Methods.AdminsterNewMenu(json_list, this.file)
        }else{
          this.error_messge = "全ての項目を入力してください"
          return this.$emit("getChilderror", this.error_messge)
        }
      }
    },
  };
// };
</script>
<style scoped>
/*-----------------------*/
/*      登録項目         */
/*-----------------------*/
.table_admin{
  margin-left: 10vw;
}

.table_form_admin {
  font-size: 20px;
  margin-top: 25px;
}

.admin_text {
  font-size: 20px;
  margin-top: 25px;
}

.table_form_admin_input{
  margin-left: 30px;
}



.table_form_admin_select {
  margin-right:5vw;
}

.table_no_look_admin {
  display: inline-block;
  border: none;
  text-align: left;
  border-bottom: 1px #000 solid;
  width: 65vw;
  font-size: 20px;
}

select {
  padding: 4px 3px;
}
.admin_img {
  object-fit: cover;
  width: 75.11px;
  height: 72.64px;
  margin-left: 17vw;
  border: 1px #000 solid;
  padding: 0.2em;
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