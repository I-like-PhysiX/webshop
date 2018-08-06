<template>
 <div id="services">
  <ul>
    <li v-for="(item, index) in items" :key="item.name">
      {{item.name}} <button v-on:click="$emit('delEvent', index)">x</button>
      <br>
      <br>
    </li>
  </ul>
 </div>
</template>
<script>
 export default{
   props:['items'],
  name:'items',
  data (){
   return {

   }
 },
 methods:{

 }
}
</script>
<style scoped>

</style>
