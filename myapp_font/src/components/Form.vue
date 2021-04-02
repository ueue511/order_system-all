<template>
<div class="table_admin">
  <form class="table_form_admin">
    <input class="table_no_look_admin" type="text" placeholder="商品名" required="required" v-model="addname" />
  </form>
  
  <form class="table_form_admin">
    <input class="table_no_look_admin" type="tel" placeholder="値段" maxlength="5" oninput="value = value.replace(/[^0-9]+/i,'');" required v-model="addprice" />
  </form>
  
  <form class="table_form_admin">
    <input class="table_no_look_admin" type="text" placeholder="オーダー名" required v-model="addfullname" />
  </form>
  
  <div class="table_form_admin">Hot or Ice:
    <select size="1" required v-model="addtemperature" >
      <option value="" hidden>選択してください</option>
      <option value="hot">Hot</option>
      <option value="ice">Ice</option>
    </select>
  </div>

  <div class="table_form_admin">カテゴリー:
    <select size="1" required v-model="addcategre">
      <option value="" hidden>選択してください</option>
      <option value="orderdrink">ドリンク</option>
      <option value="ordersetmeal">食事</option>
      <option value="orderdessert">デザート</option>
    </select>
  </div>
  
  <div class="table_form_admin_input">
    <label>
      表示する画像を選択してください
      <input type="file" required @change="UpLoad" />
    </label>
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
          filename: "", //画像名前
          list: {}, //nodeに渡す際、連想配列に変換
          error: "" //エラー文を放り込む

        }
    },
    methods: {
      //受け取った画像ファイルをファイルとファイルネームに分ける
      async UpLoad(event) {
        const image = event.target.files || event.dataTransfer.files;
        this.file = image[0];
        if(this.CheckFile(this.file)){
        this.filename = "./img/" + image[0].name;
        }
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
      async MenuAddChild(){
        this.list = {
          order_name: this.addname,
          price: this.addprice,
          full_name: this.addfullname,
          temperature: this.addcategre,
          filename: this.filename,
          categre: this.addcategre
        }

        for(var k of Object.keys(this.list)){
          console.log(this.list[k])
          if (this.list[k] === ""){
            this.error = "全ての項目に入力してください"
            return this.$emit("getChilderror", this.error)
          }else
            ;
          }
        this.error = ""
        this.$emit("getChilderror", this.error)
        await Methods.AdminsterAddMenu(this.list)
      }
    }
}
</script>
<style scoped>
/*-----------------------*/
/*      登録項目         */
/*-----------------------*/
.table_admin{
  margin-left: 10vw;
}

.table_form_admin input{
  font-size: 20px;
  margin-top: 20px;
}
.table_form_admin{
  font-size: 20px;
  margin-top: 20px;
}

.table_form_admin_input {
  margin-top:50px;
  width: 75vw;
  font-size:14px;
}

.table_no_look_admin {
  display: inline-block;
  border: none;
  text-align: left;
  border-bottom: 1px #000 solid;
  width: 65vw;
  font-size: 20px;
}

label {
  padding: 1rem 1rem;
  border: solid 1px #888;
} 
select {
  padding: 4px 0;
}

</style>