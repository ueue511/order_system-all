<template>
  <div class="vue_radio">
    <Tabs 
      :Tabsnumchild = "tabs"
    />
    <ul class="contents">
      <TimeMenber/>
      <AdminsterMune/>
      <button class="pay">
        <router-link :to="{name: 'Subtotal'}">
          login
        </router-link>
      </button>

    </ul>
  </div>
</template>

<script>
import AdminsterMune from "../components/AdminsterMune";
import Tabs from "../components/Tabs"
import TimeMenber from '../components/TimeMenber';
  export default {
    components: {
     AdminsterMune,
     Tabs,
     TimeMenber
    },
    data() {
      return {
        isActive: "",
        tabs: 'adminster',
      };     
    },
  };
</script>