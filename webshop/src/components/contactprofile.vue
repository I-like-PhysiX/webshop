<template>
 <div id="contactprofile">
  <h1>Ez a contact szülő komponens contactprofile gyereke</h1>
  <div>{{msg}}</div>
  <b-button @click="goContact">Go contact</b-button>
 </div>
</template>
<script>
 export default{
   methods:{
     goContact () {
       this.$router.push('/contact')
    }
   },
  name:'contactprofile',
  data (){
   return{
    msg:'contactprofile\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   }
  }
 }
</script>
<style scoped>

</style>
