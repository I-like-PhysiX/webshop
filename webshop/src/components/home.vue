<template>
  <div id="home">
    <h1>{{msg}}</h1>
    <div class="row">
      <div class="col-md-4 col-lg4" v-for="(product, index) in products" :key="index">
        <br>
        <br>
        <button @click="goTodetail(product)" >{{product.productTitle}}</button>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
  goTodetail(product) {
    this.$router.push({name:'details',params:product})
  }
  },
  name: 'home',
  data () {
    return {
      msg:'home',
      products:[
      {
        productTitle:"ABCN",
        productId:1
      },
      {
        productTitle:"KARMA",
        productId:2
      },
      {
        productTitle:"Tino",
        productId:3
      },
      {
        productTitle:"EFG",
        productId:4
      },
      {
        productTitle:"MLI",
        productId:5
      },
      {
        productTitle:"Banans",
        productId:6
      }
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
