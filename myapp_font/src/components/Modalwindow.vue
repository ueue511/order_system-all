<template>
<span>
  <button class="pay" @click="OpenModal(); SendType()">送信</button>
    <div id="overlay" v-if="show_modal">
      <div id="content_send">
        <button @click="OpenModal"><span>{{ send }}</span></button>
      </div>
    </div>
</span>
</template>

<script>
export default {
  data() {
    return {
      show_modal: false
    }
  },
  methods: {
        //モーダルウィンド表示判定
    OpenModal() {
      if(this.show_modal === true) {
        this.show_modal = false;
        this.$store.commit("ResetList");
      } else {
        setTimeout(this.closeModal, 5000);
        this.show_modal = true
      }
    },
    //モーダルウィンドの非表示判定
    closeModal() {
      this.show_modal = false;
      this.$store.commit("ResetList");
    },
    //モーダルウィンドの表示文章判定
    SendType() {
      if(this.$store.state.subtotalList.length === 0){
        this.send = "未入力"
      } else {
          this.send = "送信完了"
      }
    }
  },
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

</style>