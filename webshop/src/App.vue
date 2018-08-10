<template>
  <div id ="app">
    <b-navbar toggleable="md" variant="dark" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <div id="myContainer">
           <div class="my-3">
             <b-button-group>
               <b-btn
                       class="exPopoverReactive1"
                       size="md"
                       variant="dark"
                       style="text-align: center"
                       v-on:click="init(), search='', sortType='', selected=''">
                       Webshop
               </b-btn>
             <b-btn
                    class="exPopoverReactive1"
                    v-on:click="search='', csaktermekek=false, csakkosar=true, basketrouter()"
                    v-if="csaktermekek"
                    size="md"
                    variant="dark"
                    style="text-align: center">
                    {{this.rendeleshossz}} tétel
              </b-btn>
              <b-btn
                     class="exPopoverReactive1"
                     v-on:click="onCancel"
                     v-if="csakkosar"
                     size="md"
                     variant="dark"
                     style="text-align: center">
                     Termékek
               </b-btn>
              </b-button-group>
           </div>
    </div>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <ul class="navbar-nav mr-auto" style="margin-top: 15px;">
          <li class="nav-item active">
            <select id="selecttype" v-model="selected" v-on:change="szur()" class="form-control input-sm">
              <option value="" disabled>Termékfajták</option>
              <option v-for="(item, index) in this.species" :key="item.text" :value="item.value" :disabled="item.isdisabled">{{item.text}}</option>
            </select>
          </li>
          <li class="nav-item active">
            <select name="sortBy" id="sortBy" v-on:change="szur()" v-model="sortType" class="form-control input-sm">
              <option v-for="(item, index) in sortOptions" :key="item.text" :value="item.value" :disabled="item.isdisabled">{{item.text}}</option>
            </select>
          </li>
          <li class="nav-item active">
            <b-form-group
                          label-for="search"
                          :state="searchstate">
              <b-form-input
                            class="form-control"
                            size="md"
                            placeholder="Keresés"
                            type="text"
                            id="search"
                            v-model="search"/>
            </b-form-group>
          </li>
          <li class="nav-item active">
            <b-btn
                          class="exPopoverReactive1"
                          v-on:click="szur2(), search=''"
                          size="md"
                          variant="dark"
                          style="text-align: center"
                          :disabled="this.search === '' ? true : false">
                          Keresés
            </b-btn>
          </li>
        </ul>
       </b-navbar-nav>
     </b-collapse>
   </b-navbar>

   <router-view
                :paginatedDatacopy="paginatedData"
                :itemsPerRowcopy="itemsPerRow"
                :szurttombhosszcopy="szurttombhossz"
                :pageNumbercopy="pageNumber"
                :pageCountcopy="pageCount"
                :rendelescopy="rendeles"
                :osszegcopy="osszeg"
                v-on:addtocartEvent="addtocart"
                v-on:removefromcartEvent="removefromcart"
                v-on:delEvent="del"
                v-on:nextPageEvent="nextPage"
                v-on:prevPageEvent="prevPage"
                v-on:onCloseEvent="onClose"
                v-on:datarouterEvent="datarouter"
                v-on:initEvent="init"
                v-on:basketrouterEvent="basketrouter">
   </router-view>

   <b-navbar toggleable="md" variant="dark" class="bottom">
    <div class="footer" style="color:white;  margin: 0px auto;">
      © 2018. Minden jog fenntartva
    </div>
   </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "app",
  data() {
    return {
      pageNumber: 0,
      size: 4,
      itemsPerRow: 1,
      szurttombhossz:0,
      rendeleshossz: 0,
      csakadatok: false,
      csakkosar: false,
      csakvasarlas: false,
      csaktermekek: true,
      search:'',
      searchstate: null,
      tomb: [],
      szurttomb: [],
      rendeles: [],
      species: [],
      selected: '',
      sortType: '',
      sortOptions: [
                    { text: 'Rendezés', value: '', isdisabled: true},
                    { text: 'abc szerint', value: 'termek', isdisabled: false},
                    { text: 'ár szerint', value: 'egysar', isdisabled: false}
                  ],
    }
  },
  watch: {
     tomb(val){
       if (val) {
         this.init();
         this.create_selection();
       }
     },
     search (val) {
       if (val) {
         this.searchstate = true;
       }
     }
   },
  methods: {
    nextPage(){
      this.pageNumber++;
      this.router();
    },
    prevPage(){
      this.pageNumber--;
      this.router();
    },
    addtocart(elem, step){
      elem.alap = Math.round((elem.alap + step) * 10) / 10;
      this.rendeles.push(elem);
      this.rendeles=Array.from(new Set(this.rendeles));
      var rendeleshossz=this.rendeles.length;
      this.rendeleshossz=rendeleshossz;
    },
    removefromcart(elem, step){
      elem.alap = Math.round((elem.alap - step) * 10) / 10;
      if (elem.alap==0){
        this.del(elem);
      }
    },
    del(elem){
      elem.alap=0;
      this.rendeles.splice(this.rendeles.indexOf(elem), 1);
      var rendeleshossz=this.rendeles.length;
      this.rendeleshossz=rendeleshossz;
    },
    init(){
      var szurttomb = this.tomb.filter(v => v.info=="Akció!");
      this.szurttomb=szurttomb;
      this.itemsPerRow=this.szurttomb.length;
      var szurttombhossz=this.szurttomb.length;
      this.szurttombhossz=szurttombhossz;
      this.onCancel();
      this.initrouter();
    },
    create_selection () {
      let mySet = new Set();
      this.tomb.forEach(v => mySet.add(v.type));
      let myArray = Array.from(mySet);
      var species=[];
      myArray.forEach(v => species.push({
                                          text: v,
                                          value: v,
                                          isdisabled: false
                                       })
      );
      this.species=species;
    },
    onCancel(){
      this.initrouter();
      this.search='';
      this.csakkosar=false;
      this.csaktermekek=true;
      console.log('Quit cart');
    },
    onClose () {
      this.rendeles.forEach(v => v.alap=0);
      this.rendeles=[];
      console.log('Reset cart');
    },
    initrouter(){
      this.$router.push(`/${this.pageNumber}`);
    },
    searchrouter(){
      this.$router.push(`/kereses/${this.search}/${this.pageNumber}`);
    },
    categoryrouter(){
      this.$router.push(`/${this.selected}/${this.sortType+"_szerinti_rendezes"}/${this.pageNumber}`);
    },
    basketrouter(){
      this.$router.push(`/kosar`);
    },
    datarouter(){
      this.$router.push(`/adatok`);
    },
    router(){
      if(this.selected!="" || this.sortOptions!=""){
        this.categoryrouter();
      } else {
        this.searchrouter();
      }
    },
    szur () {
      this.pageNumber=0;
      this.csakadatok=false
      this.csakkosar=false;
      this.csaktermekek=true;
      let szurttomb = this.tomb.filter(v => v.type==this.selected);
      switch (this.sortType) {
          case 'termek':
          szurttomb=szurttomb.sort((a,b) => a.termek > b.termek);
              break;
          case 'egysar':
          szurttomb=szurttomb.sort((a,b) => a.egysar > b.egysar);
              break;
            };
        this.szurttomb=szurttomb;
        this.itemsPerRow=this.szurttomb.length;
        var szurttombhossz=this.szurttomb.length;
        this.szurttombhossz=szurttombhossz;
        this.categoryrouter();
      },
      szur2(){
        this.pageNumber=0;
        this.csakadatok=false
        this.csakkosar=false;
        this.csaktermekek=true;
        if (this.search) {
          var szurttomb =this.tomb.filter(v => RegExp(this.search,'i').test(v.termek)).slice(0,9);
          this.szurttomb=szurttomb;
          this.itemsPerRow=this.szurttomb.length;
          var szurttombhossz=this.szurttomb.length;
          this.szurttombhossz=szurttombhossz;
          this.searchrouter();
        }
      }
  },

  mounted() {
    axios.get('http://localhost:3000')
      .then((res) =>{
        this.tomb = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
    console.log("App init");
  },

  computed: {
    pageCount(){
      var l = this.szurttomb.length;
      var s = this.size;
      if (l<=s){
        return 0;
      } else {
        return Math.floor(l/s);
      }
    },
    paginatedData(){
      var start = this.pageNumber * this.size;
      var end = start + this.size;
      return this.szurttomb.slice(start, end);
    },
    osszeg() {
      return Math.round(this.rendeles.reduce((o,v)=>o+v.egysar*v.alap,0)/5)*5;
    }
  }
}
</script>

<style scoped>
 #App{
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
table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
</style>
