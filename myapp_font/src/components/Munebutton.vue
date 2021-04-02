<template>
<li>
  <button
  class="LiItem"
  v-for="(list, index) in this.lists.data"
  :key="index"
  :class="[list.temperature, {push: shownum === index}]"
  >
    <img
    :src= list.img
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
import Methods from '@/api/methods';
export default {
  data() {
    return {
      lists: "",
      show: false,
      shownum: "",
      itemnum: "",
    }
  },
  props: ["MuneListNum"],

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
  watch: {
    MuneListNum: async function() {
      //個数表示をリセット
      this.show = false;
      this.shownum = "";
      //node.js expressにメニューリストのリクエスト
      this.lists = await Methods.testPosting(this.MuneListNum);
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