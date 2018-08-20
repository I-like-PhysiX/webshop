<template>
 <div id="termekek">
  <div style="text-align:center; margin: 15px auto;">Elérhető termékek</div>
   <div class="main" v-if="this.szurttombhosszcopy!=[]">
    <div class="container">
     <div class="row" v-for="i in Math.ceil(szurttombhosszcopy / itemsPerRowcopy)">
      <b-card
              bg-variant="light"
              id="card"
              footer-bg-variant="secondary"
              v-for="(elem, index) in paginatedDatacopy.slice((i - 1) * itemsPerRowcopy, i * itemsPerRowcopy)"
              :key="elem.id"
              :img-src="elem.url"
              v-bind:style= "[!elem.raktaron ? {opacity: 0.6} : {}]"
              style="max-width: 274px;"
              img-alt="A termék képe"
              img-top
              class="image">
       <div class="top-right"><h3 style="color: red; background-color: yellow;"><strong>{{elem.info}}</strong></h3></div>
       <p class="card-text"><p>{{elem.termek}}</p> <p>{{elem.egysar}} Ft/{{elem.egys}}</p></p>
       <p class="card-text" style="color: green;" v-if="elem.raktaron">Raktáron</p>
       <p class="card-text" style="color: red;" v-else>Elfogyott</p>
       <div
            v-if="elem.egys=='kg'"
            v-model="elem.alap">
            <b-button :disabled="!elem.raktaron" v-on:click="$emit('addtocartEvent', elem, 0.1)">Kosárba</b-button>
       </div>
       <div
            v-if="elem.egys!='kg'"
            v-model="elem.alap">
            <b-button :disabled="!elem.raktaron" v-on:click="$emit('addtocartEvent', elem, 1)">Kosárba</b-button>
       </div>
      </b-card>
     </div>
    </div>
   </div>
   <div class="text-mid">
     <div class="center" style="text-align: center;">
       <span v-if="this.pageNumbercopy!=0" class="pagination-btn" v-on:click="$emit('updatepageEvent', -1)" style="cursor: pointer;"> < </span>
       {{this.pageNumbercopy}}/{{this.pageCountcopy}}
       <span v-if="this.pageNumbercopy!=this.pageCountcopy" class="pagination-btn" v-on:click="$emit('updatepageEvent', 1)" style="cursor: pointer;"> > </span>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  props: ["szurttombhosszcopy", "itemsPerRowcopy", "paginatedDatacopy", "pageNumbercopy", "pageCountcopy"],
  name: 'termekek',
  data() {
    return {

    }
  },
  watch: {

   },
  methods: {

  },
  mounted() {
    console.log("termekek init");
  },
  computed: {

  }
}
</script>

<style scoped>
#termekek{
 font-family: courier;
 box-sizing: border-box;
   display: -webkit-box;
   display: -webkit-flex;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-orient: vertical;
   -webkit-box-direction: normal;
   -webkit-flex-direction: column;
   -ms-flex-direction: column;
   flex-direction: column;
   margin: 0 auto;
   min-height: 100vh;
}
.main{
 width:100%;
 overflow:hidden;
}
.bottom,.text-mid {
 padding:20px 10px;
 height:100%;
}
.text-mid {
 margin-top: auto;
 background:white;
}
.form-control {
   display: inline-block;
}
#card:hover{
 border-width:1px;
 border-style:ridge;
 border-color:#4285F4;
}
.exPopoverReactive1:hover{
 border-width:1px;
 border-style:ridge;
 border-color:#FFFFFF;
}
.image {
   position: relative;
}
.top-right {
   position: absolute;
   top: 8px;
   right: 16px;
}
</style>
