<template>
  <span class="tabs_table">
    <input type="radio" id="DrinkTab" :value="1" v-model="isActiveChild" />
    <label for="DrinkTab"><p>ドリンク</p></label>
    <input type="radio" id="DessertTab" :value="2" v-model="isActiveChild" />
    <label for="DessertTab"><p>デザート</p></label>
    <input type="radio" id="SetmealTab" :value="3" v-model="isActiveChild" />
    <label for="SetmealTab"><p>定食</p></label>
  </span>
</template>

<script>
export default {
  data() {
    return {
    isActiveChild: 1,
    tabsshow: this.Tabsnumchild,
    }
  },
  watch: {
    isActiveChild: function() {
      this.$emit("TabNum", this.isActiveChild)
    }
  },
  props:[
    "Tabsnumchild",
  ]
}
</script>

<style scoped>
/*-----------------------*/
/*          tab          */
/*-----------------------*/
.tabs_table {
  background-color: #666;
  color: #fff;
  position: absolute;
  top:64.5vh;
  left: 25vw;
}

.tabs_table label {
width: 80px;
height: 23px;

font-family: Roboto;
font-size: 20px;
color: #ffffff;
}

.tabs_table label:nth-of-type(1) {
  position: absolute;
  color: #fff;
  width: 80px;
  border-bottom: 30px solid #666;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  text-align: center;
  line-height: 30px;

  top: -25px;
  left: -70px;
}

.tabs_table label:nth-of-type(2) {
  position: absolute;
  color: #fff;
  width: 80px;
  border-bottom: 30px solid #666;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  text-align: center;
  line-height: 30px;

  top: -25px;;
  left: 130px;
}

.tabs_table label:nth-of-type(3) {
  position: absolute;
  color: #fff;
  width: 80px;
  border-bottom: 30px solid #666;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  text-align: center;
  line-height: 30px;

  top: -25px;;
  left: 30px;
}

.tabs_table :checked + label {
  border-bottom: 30px solid rgb(255, 255, 255);
  border-left: 10px solid  transparent;
  border-right: 10px solid  transparent;
  color: rgb(0, 0, 0);
}

/*-----------------------*/
/*       ~392px~          */
/*-----------------------*/
@media screen and (max-width: 395px) {
   .tabs_table {
    background-color: #666;
    color: #fff;
    position: absolute;
    top:64.5vh;
    left: 30vw;
  }

  .tabs_table label:nth-of-type(1) {
    position: absolute;
    color: #fff;
    width: 60px;
    border-bottom: 30px solid #666;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    text-align: center;
    line-height: 30px;

    top: -25px;
    left: -80px;
  }

  .tabs_table label:nth-of-type(2) {
    position: absolute;
    color: #fff;
    width: 60px;
    border-bottom: 30px solid #666;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    text-align: center;
    line-height: 30px;

    top: -25px;;
    left: 85px;
  }

  .tabs_table label:nth-of-type(3) {
    position: absolute;
    color: #fff;
    width: 60px;
    border-bottom: 30px solid #666;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    text-align: center;
    line-height: 30px;

    top: -25px;
    left: 5px;
  }

  .tabs_table :checked + label {
    border-bottom: 30px solid rgb(255, 255, 255);
    border-left: 10px solid  transparent;
    border-right: 10px solid  transparent;
    color: rgb(0, 0, 0);
  }

  .tabs_table p{
    font-size: 3.8vw
  }
}

/*-----------------------*/
/*       481px~          */
/*-----------------------*/
@media screen and (min-width: 481px) {
  .tabs_table {
    background-color: #666;
    color: #fff;
    position: absolute;
    top:64.5vh;
    left: 30vw;
  }

  .tabs_table label:nth-of-type(1) {
    position: absolute;
    color: #fff;
    width: 80px;
    border-bottom: 30px solid #666;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    text-align: center;
    line-height: 30px;

    top: -25px;
    left: -130px;
  }

  .tabs_table label:nth-of-type(2) {
    position: absolute;
    color: #fff;
    width: 80px;
    border-bottom: 30px solid #666;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    text-align: center;
    line-height: 30px;

    top: -25px;;
    left: 130px;
  }

  .tabs_table label:nth-of-type(3) {
    position: absolute;
    color: #fff;
    width: 80px;
    border-bottom: 30px solid #666;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    text-align: center;
    line-height: 30px;

    top: -25px;
    left: 5px;
  }

  .tabs_table :checked + label {
    border-bottom: 30px solid rgb(255, 255, 255);
    border-left: 10px solid  transparent;
    border-right: 10px solid  transparent;
    color: rgb(0, 0, 0);
  }
}
/*-----------------------*/
/*       769px~          */
/*-----------------------*/
@media screen and (min-width: 769px) {
  .tabs_table {
    top:63.5vh;
  }

  .tabs_table label:nth-of-type(1) {
    top: 10px;
    left: -130px;
  }

  .tabs_table label:nth-of-type(2) {
    top: 10px;
    left: 90px;
  }

  .tabs_table label:nth-of-type(3) {
    top: 10px;
    left: -20px;
  }

  .tabs_table :checked + label {
    border-bottom: 30px solid rgb(255, 255, 255);
    border-left: 10px solid  transparent;
    border-right: 10px solid  transparent;
    color: rgb(0, 0, 0);
  }
}
</style>