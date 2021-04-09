<template>
<div id="adminster_button">
<li>
  <button
  class="LiItem"
  v-for="(list, index) in this.lists.data"
  :key="index">
    <router-link :to="{name: list.path}">
      <img
      :src= list.img
      :alt= list.adminster_menu
      />
    </router-link>
    <p>{{list.adminster_menu}}</p>
  </button>
</li>
<form class="table_form_admin">
  <input class="table_no_look" type="text" placeholder="name:"/>
</form>
<form class="table_form_admin">
  <input class="table_no_look" type="text" placeholder="password:"/>
</form>
</div>
</template>

<script>
// node.jsとの連携でapp/methodesのメソッド読み込み
export default {
  data() {
    return {
      lists: "",
    }
  },
  created: async function() {
      //node.js expressにメニューリストのリクエスト
      await this.$store.dispatch("AdminsterList_nodeAction");
    },
  watch: {
    "$store.state.adminsterlist": function() {
      this.lists = this.$store.state.adminsterlist;
      console.log(this.lists)
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
  padding: 10px 30px 30px 5px;
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
/*      ログイン         */
/*-----------------------*/
.table_form_admin {
  margin-top: 30vh;
  font-size: 20px;
  text-align:center
}

.table_no_look {
  display: inline-block;
  border: none;
  text-align: left;
  border-bottom: 1px #000 solid;
  width: 65vw;
  margin-left: 3vw;
  font-size: 20px;
}

.table_no_look::placeholder {
  text-align: left;
}

.table_form_admin:nth-of-type(2){
  margin-top: 8vh;
}

</style>