<template>
 <div id="details">
  <div class="container">
   <h1 class="text-primary text-center">{{msg}}</h1>
   <h2>Ezek az adatok a home komponensből jöttek a lapozással egyidőben vue route segítségével</h2>
   <h2>The product id is :{{productId}}</h2>
   <h2>The product title is :{{productTitle}}</h2>
   <b-button @click="goHome">Go Home</b-button>
  </div>
 </div>
</template>
<script>
 export default{
   methods:{
     goHome(){
       this.$router.push('/');
     }
   },
  name:'details',
  data(){
   return{
    productId:this.$route.params.productId,
    productTitle:this.$route.params.productTitle,
    msg:"details"
   }
  }
 }
</script>

<style scoped>

</style>
