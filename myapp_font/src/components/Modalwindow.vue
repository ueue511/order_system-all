<template>
<span>
  <button class='pay' :class="{pay_change: ChangeClass}" @click="OpenModal(); SendType()">{{ ModalText }}</button>
    <div id="overlay" v-if="show_modal">
      <div id="content_send">
        <div v-for="(date, index) in this.listsshow" :key="index">
        <p>・{{date[0]}}→</p>
             <p>{{date[1]}}に変更</p>
             <br>
        </div>
        <button @click="CloseModalAll" ><span>{{ send }}</span></button>
      </div>
    </div>
</span>
</template>

<script>

export default {
  data() {
    return {
      show_modal: false,
      listsshow: [],
      timeout: "" //強制的にsettimeを終わらせる為に使用する変数
    }
  },
  computed: {
    ModalText() {
      var text 
      if(this.Modalwindowchild === "add_show") text = "登録";
        else if(this.Modalwindowchild === "total_show") text = "送信";
        else if(this.Modalwindowchild ==="change_show") text = "変更";
        else if(this.Modalwindowchild ==="delete_show") text = "削除"
        else if(this.Modalwindowchild ==="admin_show") text = "login"
      return text
    },
    ChangeClass() {
      var show = ""
      if (this.Modalwindowchild === "change_show" || this.Modalwindowchild === "delete_show") show = true;
        else show = false;
      return show;
    },
  },
  methods: {
        //モーダルウィンド表示判定
    OpenModal() {
      switch(this.Modalwindowchild){
        case "total_show":
            setTimeout(this.closeModal, 5000);
            this.show_modal = true;
            break;

        case "add_show":
          this.$emit("add_Modal");
          break;

        case "change_show":
          this.$emit("change_Modal");
          break;

        case "delete_show":
          this.$emit("delete_Model");
          break;

        case "admin_show":
          this.$emit("admin_Model");
          break;
        }
      },

    //クリック時に強制終了
    CloseModalAll() {
      clearTimeout(this.timeout)
      this.show_modal = false;
      this.$store.commit("ResetList");
      this.$router.push({name: "Adminster"});
    },

    //モーダルウィンドの非表示判定
    closeModal() {
      this.$store.commit("ResetList");
      this.$router.push({name: "Adminster"});
      this.show_modal = false;
    },
    //モーダルウィンドの表示文章判定
    SendType() {
      switch (this.Modalwindowchild) {
        case "total_show":
          if(this.$store.state.subtotalList.length === 0) this.send = "未入力"
          else this.send = "送信完了"
          break;

        case "add_show":
          this.send = "新規登録完了"
          break;

        case "change_show":
          this.send = "登録変更完了"
          break;

        case "delete_show":
          this.send = "削除完了"
          break;

        case "admin_show":
          this.send = "ログイン"
          break;
      }
    },
    ChangLange(text) {
      switch(text){
        case "drink":
          return text.replace("drink", "ドリンク")

        case "setmeal":
          return text.replace("setmeal", "食事")

        case "dessert":
          return text.replace("dessert", "デザード")
      }
    }
  },

  //モーダルウィンド表示okを受け取り描写する関数
  watch: {
    "$store.state.modalShow": function() {
        if(this.show_modal === true) {
          this.show_modal = false;
        } else { 
          var lists = this.$store.state.modellist;
          var orginallist = this.$store.state.listdeta;
          for(var k of Object.keys(lists)){
            if (k === "id" || k === "categre"){
              if(k === "categre"){
                var orginalcategre = this.ChangLange(orginallist[k]);
                var changecategre = this.ChangLange(lists[k]);
                console.log(orginalcategre)
                this.listsshow.push([orginalcategre, changecategre])
              } else ;
            } else {
              this.listsshow.push([orginallist[k],lists[k]])
            }
          }
          console.log(this.listsshow)
          this.timeout = setTimeout(this.closeModal, 5000);
          this.show_modal = true;
      }
    }

  },
  props:["Modalwindowchild"]
}
</script>

<style scoped>
/*-----------------------*/
/*        モーダル        */
/*-----------------------*/
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
#content_send {
  text-align: center;
  z-index: 2;
  width: 40%;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
}

#content_send button {
  color: rgb(26, 26, 26);
  font-size: 20px;
  font-weight: bold;
}

.pay_change {
  top: 55.5vh;
  height: 35px;
  font-size: 25px;
}

/*-----------------------*/
/*       769px~          */
/*-----------------------*/
@media screen and (min-width: 769px) {
  .pay_change{
    top: 55vh;
  }
}

</style>