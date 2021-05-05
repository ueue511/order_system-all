<template>
<li>
  <button
  class="LiItem"
  v-for="(list, index) in this.lists"
  :key="index"
  :class="[list.temperature, {push: shownum === index}]"
  >
    <img
    :src="MenuImg(list.id)"
    :alt= list.order_name
    @click="SubTotal(list.full_name, list.price); Push(index)"
    />
    <p>{{list.order_name}}{{list.price}}</p>
    <div v-if="shownum === index" class="counter">{{ itemnum }}</div>
  </button>
</li>
</template>

<script>
// node.jsとの連携でapp/methodesのメソッド読み込み

export default {
  data() {
    return {
      lists: "",
      listsImg: "",
      show: false,
      shownum: "",
      itemnum: "",
    }
  },
  props: ["MuneListNum"],

  created: async function() {
    await this.$store.dispatch("MenuList_nodeAction");
  },

  computed: {
    MenuImg: function(){
      return function(id){
        return "data:image/png;base64," + this.$store.state.menuimg_all[id];
      }
    }
  },

  methods: {
    SubTotal(full_name, child_price) {
      this.$store.commit('SubTotalVuex', {full_name, child_price});
    },
    Push(index) {
      this.show = true;
      this.shownum = index;
      this.itemnum = this.$store.state.showid;
    }
  },
  // 最初のみ実行 created→ watch(MuneListNum)→ store(MenuList_node)→ watch("$store.state.menulistDrink")の流れ
  watch: {
    "$store.state.menulistDrink": function() {
      this.lists = this.$store.state.menulistDrink
    },

    MuneListNum: function() {
      //個数表示をリセット
      this.show = false;
      this.shownum = "";

      switch (this.MuneListNum) {
        case 1:
          this.lists = this.$store.state.menulistDrink;
          this.listsImg = this.$store.state.menuImg;

          //貰ったbuffer
          // console.log(ArrayBuffer.isView(this.lists[6].filepic))
          
          // var blob = new Blob([this.lists[6].filepic], { type: "image/png"});

          // //確認
          // console.log(blob)

          // var reader = new FileReader();
          // reader.onload = function() {
          //   var b64 = reader.result;
          //   console.log(b64);
          // }
          // //B64で変換したurl
          // reader.readAsDataURL(blob);
          

          break;
          
        case 2:
          this.lists = this.$store.state.menulistDessert;
          break;

        case 3:
          this.lists = this.$store.state.menulistSetmeal;
          break;
      }
    }
  }
}
</script>

<style scoped>
/*-----------------------*/
/*      メニュー類        */
/*-----------------------*/

ul {
  margin: 0;
  padding: 0;
}

.contents li {
  list-style: none;
  width: auto;
  padding: 10px 10px 30px 5px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 10px;
}

/*最後の行が1個の場合、左詰めの見えないbox*/
.contents li::before {
  content:"";
  display: block;
  width:83.72px;
  order:1;
}

 /*最後の行が2個の場合、左詰めの見えないbox*/
.contents li::after {
  display: block;
  content:"";
  width: 83.72px;
}

.contents .LiItem {
  width: 83.72px;
  height: 98.5px;
  border: 1px #000 solid;
  text-align: center;
  margin-bottom: 20px;
}

.contents .hot {
  background-color: antiquewhite;
}

.contents .ice {
  background-color: aliceblue;
}

.contents img {
  object-fit: cover;
  width: 75.11px;
  height: 72.64px;
}

.LiItem p {
  white-space: nowrap;
  font-size: 100%;
}

/*-----------------------*/
/*      カウント設置      */
/*-----------------------*/
button {
  position: relative;
}

.counter {
  position: absolute;
  display: inline-block;
  border: #7DCBD0 solid 2px;
  border-radius: 50%;
  background: #fff;
  width: 30%;
  height: 25px;
  top:-12%;
  right: -10%;
  line-height: 25px;
}

.push {
  border: 3px #7DCBD0 solid !important;
}
</style>