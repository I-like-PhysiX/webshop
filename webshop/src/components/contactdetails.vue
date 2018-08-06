<template>
 <div id="contactdetails">
  <h1>Ez a contact szülő komponens contactdetails gyereke</h1>
  <br>
  <br>
  <h2>A lenti szöveg a contact komponens inputjából érkezik a contactdetails komponens felé</h2>
  <br>
  <br>
  <h2>{{uzenet}}</h2>
  <br>
  <br>
  <h2>A lenti gomb lenyomásával bekövetkezik egy esemény, amit elküldünk a contactdetails komponensből a contact komponens felé. Ott triggelerünk egy metódust, ami elénk hoz egy popup ablakot a beolvasott a szövegmezőbe beírt szöveggel.</h2>
  <br>
  <br>
  <b-button @click="figyelmeztetes">Üzen</b-button>
  <br>
  <br>
  <div>{{msg}}</div>
  <b-button @click="goContact">Go contact</b-button>
 </div>
</template>
<script>
 export default{
   props: {
     uzenet: {
       type: String,
       required: true,
       default: ''
     }
   },
   methods:{
     goContact () {
       this.$router.push('/contact')
    },
    figyelmeztetes(){
      this.$emit('figyelmeztetes',this.uzenet)
    }
   },
  name:'contactdetails',
  data (){
   return{
    msg:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   }
  }
 }
</script>
<style scoped>

</style>
