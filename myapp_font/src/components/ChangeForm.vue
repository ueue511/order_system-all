<template>
<div class="table_admin">
  <form class="table_form_admin">
    <div>商品:</div>
    <input class="table_no_look_admin" type="text" placeholder="名前"  v-model="SelectFull_name" />
  </form>
  <br>
  <form class="table_form_admin">
    <div>値段:</div>
    <input class="table_no_look_admin" type="tel" maxlength="5" oninput="value = value.replace(/[^0-9]+/i,'');" placeholder="値段" v-model="SelectPrice" />
  </form>
  <br>
  <form class="table_form_admin">
    <div>略語:</div>
    <input class="table_no_look_admin" type="text" placeholder="オーダー名" v-model="SelectOrder_name" />
  </form>
  <br>
  <div :class="{table_form_admin:true,table_form_admin_select:true}">Hot or Ice:
    <select size="1" v-model="SelectTemperature" >
      <option value="" hidden></option>
      <option value="hot">Hot</option>
      <option value="ice">Ice</option>
    </select>
  </div>
  <br>
  <div :class="{table_form_admin:true,table_form_admin_select:true}">カテゴリー:
    <select size="1" v-model="SelectCategre" >
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
      <input type="file" @change="UpLoad" />
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

      changelist: {}, //各種変更のあった項目のlist
      picture: "", // adminsterchangeで画像を変更された場合表示するdate
    }
  },

  computed: {
    //各FORM値をstoreより受け取り
    SelectFull_name: {
      get() {
        return this.$store.state.listdeta.full_name;
      },
      set(value) {
        this.changefullname = value;
      }
    },

    SelectPrice: {
      get(){
        return this.$store.state.listdeta.price;
      },
      set(value) {
        this.changeprice = value;
      }
    },

    SelectOrder_name: {
      get() {
        return this.$store.state.listdeta.order_name;
      },
      set(value) {
        this.changename = value;
      }
    },

    SelectFilename: {
      get() {
        return this.$store.state.listdeta.filename;
      },
      set(value) {
        this.changefilename = value;
      }
    },

    SelectCategre:{
      get() {
        return this.$store.state.listdeta.categre;
      },
      set(value) {
        this.changecategre = value;
      }
    },

    SelectTemperature: {
      get() {
        return this.$store.state.listdeta.temperature;
      },
      set(value) {
        this.changetemperature = value;
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
    //受け取った画像ファイルをファイルとファイルネームに分ける
    async UpLoad(event) {
      const image = event.target.files || event.dataTransfer.files;
      this.changefile = image[0];
      if(this.CheckFile(this.changefile)){
        this.picture = await this.getBase64(this.changefile)
        this.changefilename = "./img/" + image[0].name;
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
    //受け取ったファイルのチェック関数
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
      return result;
    },

    //変更ボタンをクリックで発火
    async MenuChageChild(){
      //changelistのリセット
      this.changelist = {};

      this.list = {
        full_name: this.changefullname,
        price: this.changeprice,
        order_name: this.changename,
        temperature: this.changetemperature,
        categre: this.changecategre,
        filename: this.changefilename,
      }
      for(var k of Object.keys(this.list)){
        //変更があった値だけの連想配列 changelistを作成
        if (this.list[k] != null) {
          this.changelist[k] = this.list[k];
        }
      }
      //changelist及び画像ファイルの変更があった場合
      if (Object.keys(this.changelist).length > 0 && this.changefile != null){
        const id = this.SelectID;

        const listmodel =[this.changelist, this.changefile]
        this.$store.commit("ModalShow", listmodel) //モーダル表示判定をstoreに送信
        
        this.changelist["id"] = id;
        const json_list = JSON.stringify(this.changelist);
        await Methods.AdminsterAddMenuImg(json_list, this.changefile);

      //changelistのみ変更があった場合
      } else if(Object.keys(this.changelist).length > 0){
        const id = this.SelectID;

        const listmodel = this.changelist
        this.$store.commit("ModalShow", listmodel) //モーダル表示判定をstoreに送信
        
        this.changelist["id"] = id;
        const json_list = JSON.stringify(this.changelist);
        await Methods.AdminsterAddMenu(json_list);

      //画像のみの場合
      } else if(this.changefile != null){
        const id = this.SelectID;

        const listmodel = this.changefile
        this.$store.commit("ModalShow", listmodel) //モーダル表示判定をstoreに送信
        
        this.changelist["id"] = id;
        const img = this.changefile;
        await Methods.AdminsterAddMenu(img);
      }
    }
  },
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
</style>