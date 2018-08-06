<template>
 <div id="input">
   <input type="text" :value="msg" @input="changeMessage">
   <p>{{message}}</p>
 </div>
</template>
<script>
 export default{
   props: {
     msg: {
       type: String,
       required: true,
       default: ''
     }
   },
  name:'input',
  data (){
   return{
    message: ''
   }
 },
 methods: {
   changeMessage(event){
     this.message=event.target.value;
     this.$emit("messageChanged", this.message);
   }
 }
}
</script>

<style scoped>

</style>
