<template>
 <div id="contact">
  <h1>{{msg}}</h1>
  <h1>Ez a contact szülő komponens</h1>
    <b-button @click="goHome">Go Home</b-button>
    <br>
    <br>
    <input type="text" v-model="uzenet">
    <h2>A fenti input összeköttetést biztosít a contact és contactdetails komponensek között v-model segítségével</h2>
    <div class="row">
        <router-link class="nav-link" to="/contact/contactprofile">contactprofile</router-link>
        <router-link class="nav-link" to="/contact/contactdetails">contactdetails</router-link>
    </div>
    <router-view :uzenet="uzenet" @figyelmeztetes="figyelmeztetes($event)"></router-view>
 </div>
</template>
<script>
 export default{
   methods:{
     goHome(){
       this.$router.push('/');
     },
     figyelmeztetes(uzenet){
       alert(uzenet)
     }
   },
  name:'contact',
  data (){
   return{
    msg:'contact',
    uzenet: ''
   }
  }
 }
</script>

<style scoped>

</style>
