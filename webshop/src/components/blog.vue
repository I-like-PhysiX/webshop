<template>
 <div id="blog">
  <h1>{{message}}</h1>
  <p><router-link class="nav-link" to="/blog/input">input</router-link></p>
  <router-view :msg="message" @messageChanged="message=$event"></router-view>
 </div>
</template>

<script>
 export default{
   data(){
     return {
       message: "This is a great Message!"
     }
   }
 }
</script>

<style scoped>

</style>
