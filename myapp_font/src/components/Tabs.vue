<template>
    <div class="tabs" v-if="tabsshow === 'home'">
      <input type="radio" id="DrinkTab" :value="1"  v-model="isActiveChild" />
      <label for="DrinkTab">ドリンク</label>
      <input type="radio" id="DessertTab" :value="2" v-model="isActiveChild" />
      <label for="DessertTab">デザ｜ト</label>
      <input type="radio" id="SetmealTab" :value="3" v-model="isActiveChild" />
      <label for="SetmealTab">定食</label>
      <input type="radio" />
      <label><router-link :to="{name:'TebleGesto'}">ホ｜ム</router-link></label>
    </div>
    
    <div class="tabs" v-else-if="tabsshow === 'subtotal'">
      <input type="radio" v-model="isActiveChild" value="1" />
      <label >小計</label>
      <input type="radio" />
      <label><router-link :to="{name: 'Home'}">注文</router-link></label>
      <label @click="Delete">取り消し</label>
    </div>

    <div class="tabs"  v-else-if="tabsshow === 'tablegesto'">
        <label><router-link :to="{name: 'Subtotal'}">小計</router-link></label>
        <label><router-link :to="{name: 'Home'}">注文</router-link></label>
        <label id="adminster_button" @click="TimeMenber_show">
          <router-link :to="{name: 'Adminster'}">管理</router-link>
        </label>
    </div>

    <div class="tabs" v-else-if="tabsshow === 'adminster'">
      <input type="radio" v-model="isActiveChild" value="1" />
      <label >管理</label>
      <input type="radio" />
      <label id="adminster_button" @click="TimeMenber_show">
        <router-link :to="{name: 'TebleGesto'}">ホ｜ム</router-link>
        </label>
    </div>

    <div class="tabs" v-else-if="tabsshow === 'adminsteradd'">
      <input type="radio" v-model="isActiveChild" value="1" />
      <label >登録</label>
      <label id="adminster_button">
        <router-link :to="{name: 'Adminster'}">管理</router-link>
        </label>
    </div>

    <div class="tabs" v-else-if="tabsshow === 'adminsterchange'">
      <input type="radio" v-model="isActiveChild" value="1" />
      <label >変更</label>
      <label id="adminster_button">
        <router-link :to="{name: 'Adminster'}">管理</router-link>
      </label>
    </div>

    <div class="tabs" v-else-if="tabsshow === 'adminsterdelete'">
      <input type="radio" v-model="isActiveChild" value="1" />
      <label >削除</label>
      <label id="adminster_button">
        <router-link :to="{name: 'Adminster'}">管理</router-link>
      </label>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isActiveChild: 1,
      tabsshow: this.Tabsnumchild,
      deleteTruechild: this.$store.state.DeleteSub,
    }
  },
  watch: {
    isActiveChild: function() {
      this.$emit("TabNum", this.isActiveChild)
    }
  },
  methods: {
    Delete() {
      if(this.deleteTruechild === "hidden") {
        this.$emit("Deletechild", this.deleteTruechild = "visible")
      } else {
        this.$emit("Deletechild", this.deleteTruechild = "hidden")
      }
    },
    SubTotal_show(show) {
      this.$store.commit("Delete", show);
    },
    TimeMenber_show() {
      this.$store.commit("TimeMenber_show_store");
    }
  },
  props:["Tabsnumchild"]
}

</script>

<style scoped>
/*-----------------------*/
/*          tab          */
/*-----------------------*/
.tabs {
  background-color: #666;
  color: #fff;
  position: absolute;
  left: 88%;
}

.tabs label {
  padding: 5px 15px;
  cursor: pointer;
  display: block;
  width: 20px;
  height: 124px;
  font-family: Roboto;
  font-size: 20px;
  line-height: 1.5em;
}

.tabs label:nth-of-type(2) {
  position: absolute;
  top:133px;
  background-color: #666;
  color: #fff;
}

.tabs label:nth-of-type(3) {
  position: absolute;
  top:265px;
  background-color: #666;
  color: #fff;
}

.tabs label:nth-of-type(4) {
  position: absolute;
  top:397px;
  background-color: #666;
  color: #fff;
}

.tabs :checked + label {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

#adminster_button{
  top: 81vh;
}
</style>