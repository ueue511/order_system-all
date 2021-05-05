<template>
  <span class="tablenameno" >
    <!-- <p>{{year}}/{{mouth}}/{{day}} {{hours}}:{{minutes}}:{{second}}</p> -->
    <p>{{date}} {{horu}}<span class="highlight">:</span>{{minit}}</p>
    <p v-show="show">{{tablemember}}名様{{tableno}}卓</p>
  </span>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      date: "",
      horu: "",
      minit: "",
      timer: "",
      week: ["（日）","（月）","（火）","（水）","（木）","（金）","（土）",],
      tableno: this.$store.state.tableno, //人数
      tablemember: this.$store.state.tablemember, //テーブル番号
    }
  },
  computed: {
    show: {
      get(){
        return this.$store.state.timemenber
      }
    }
  },
  mounted() {
    this.timer = setInterval(() =>{
      let weekone = dayjs().day();
      //現在時刻を取得 ss:秒 HH:mm
      this.date = dayjs().format(`YYYY/MM/DD${this.week[weekone]}`);
      this.horu = dayjs().format("HH");
      this.minit = dayjs().format("mm");
    }, 1000)
  },
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
    }
  },
};
</script>

<style scoped>
.tablenameno {
  display: flex;
  padding: 15px;
  justify-content: space-between;
  font-size:14px
}

/* 点滅処理 */
.highlight {
  animation: flashing 1.5s ease-out;
  animation-iteration-count: infinite;
}

@keyframes flashing {
    0%   { opacity: 0; }
    50%  { opacity: 1;}
    100% { opacity: 0; }
}
</style>