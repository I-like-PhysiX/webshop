<template>
 <div id="services">
  <h1>{{msg}}</h1>
  <p><router-link class="nav-link" to="/services/items">items</router-link></p>
  <br>
  <form @submit.prevent="add">
    <input type="text" v-model="newItem" required>
    <button type="submit">Add</button>
  </form>
  <router-view :items="filteredlists" v-on:delEvent="remove"></router-view>
 </div>
</template>
<script>
 export default{
  name:'services',
  data (){
   return{
    msg:'services',
    newItem: null,
    lists: [
      {name: 'Sarthak', info: "something"},
      {name: 'Bitfumes', info: "nothing"},
      {name: 'Vuejs', info:"nothing"},
      {name: 'Angular', info: "nothing"},
      {name: 'Cica',info: "something"}
    ],
    filteredlists: []
   }
 },
 mounted(){
   var filteredlists = this.lists.filter(v => v.info=="something");
   this.filteredlists=filteredlists;
 },
 methods:{
   remove(index){
     this.filteredlists.splice(index,1);
   },
   add(){
     this.filteredlists.unshift({name: this.newItem});
     this.newItem=null;
   }
 }
}
</script>
<style scoped>

</style>
