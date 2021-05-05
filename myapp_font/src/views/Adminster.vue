<template>
  <div class="vue_radio">
    <Tabs 
      :Tabsnumchild = "tabs"
    />
    <ul class="contents">
      <TimeMenber/>
      <AdminsterMune
        ref = "adminchild"
      />
      <Modalwindow 
        :Modalwindowchild = "show_modal_admin"
        @admin_Model = "LoginChild"
      />      

    </ul>
  </div>
</template>

<script>
import AdminsterMune from "../components/AdminsterMune";
import Tabs from "../components/Tabs"
import TimeMenber from '../components/TimeMenber';
import Modalwindow from '../components/Modalwindow';
  export default {
    components: {
     AdminsterMune,
     Tabs,
     TimeMenber,
     Modalwindow 
    },
    data() {
      return {
        isActive: "",
        tabs: 'adminster',
        show_modal_admin: "admin_show"
      };     
    },
    methods: {
      LoginChild(){
        this.$refs.adminchild.LoginBaes()
      }
    },
  };
</script>