<template>
  <div id="app">
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
      this.rendeleshossz=this.rendeles.length;
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
      this.rendeleshossz=this.rendeles.length;
    },
    init(){
      this.szurttomb = this.tomb.filter(v => v.info=="Akció!");
      this.itemsPerRow=this.szurttomb.length;
      this.szurttombhossz=this.szurttomb.length;
      this.onCancel();
      this.initrouter();
    },
    create_selection () {
      let mySet = new Set();
      this.tomb.forEach(v => mySet.add(v.type));
      let myArray = Array.from(mySet);
      myArray.forEach(v => this.species.push({
                                          text: v,
                                          value: v,
                                          isdisabled: false
                                       })
      );
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
        this.szurttombhossz=this.szurttomb.length;
        this.categoryrouter();
      },
      szur2(){
        this.pageNumber=0;
        this.csakadatok=false
        this.csakkosar=false;
        this.csaktermekek=true;
        if (this.search) {
          this.szurttomb =this.tomb.filter(v => RegExp(this.search,'i').test(v.termek)).slice(0,9);
          this.itemsPerRow=this.szurttomb.length;
          this.szurttombhossz=this.szurttomb.length;
          this.searchrouter();
        }
      }
  },
  mounted() {
    axios.get('http://localhost:3000')
      .then((res) =>{
        this.tomb = res.data;
    }).then(() =>{
        this.create_selection();
    }).then(() =>{
        this.init();
    })
      .catch((error) => {
        console.log(error);
    });
    console.log("App init");
  },

  computed: {
    pageCount(){
      if (this.szurttomb.length<=this.size){
        return 0;
      } else {
        return Math.floor(this.szurttomb.length/this.size);
      }
    },
    paginatedData(){
      return this.szurttomb.slice(this.pageNumber * this.size, this.pageNumber * this.size + this.size);
    },
    osszeg() {
      return Math.round(this.rendeles.reduce((o,v)=>o+v.egysar*v.alap,0)/5)*5;
    }
  }
}
</script>

<style scoped>
#app{
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
</style>
