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
                      v-on:click="init()">
                      Webshop
              </b-btn>
            <b-btn
                   class="exPopoverReactive1"
                   v-on:click="basketrouter()"
                   v-if="csaktermekek"
                   size="md"
                   variant="dark"
                   style="text-align: center">
                   {{this.rendeles.length}} tétel
             </b-btn>
             <b-btn
                    class="exPopoverReactive1"
                    v-on:click="onCancel()"
                    v-if="!csaktermekek"
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
                         label-for="search">
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
                         v-on:click="szur2()"
                         size="md"
                         variant="dark"
                         style="text-align: center">
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
                v-on:updatepageEvent="updatePage"
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
      csaktermekek: true,
      search:'',
      url:``,
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

   },
  methods: {
    updatePage(diff){
      this.pageNumber+=diff;
    },
    addtocart(elem, step){
      elem.alap = Math.round((elem.alap + step) * 10) / 10;
      this.rendeles.push(elem);
      this.rendeles=Array.from(new Set(this.rendeles));
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
    },
    init(){
      this.szurttomb = this.tomb.filter(v => v.info=="Akció!");
      this.itemsPerRow=this.szurttomb.length;
      this.szurttombhossz=this.szurttomb.length;
      this.pageNumber=0;
      this.search='';
      this.sortType='';
      this.selected='';
      this.onCancel();

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
      console.log('Quit cart');
    },
    onClose () {
      this.rendeles=[];
      console.log('Reset cart');
    },
    initrouter(){
      this.url=`/`;
      this.$router.push(this.url);
      this.csaktermekek=true;
    },
    searchrouter(){
      this.url=`/kereses/${this.search}/`;
      this.$router.push(this.url);
      this.csaktermekek=true;
    },
    categoryrouter(){
      this.url=`/${this.selected}/${this.sortType+"_szerinti_rendezes"}/`;
      this.$router.push(this.url);
      this.csaktermekek=true;
    },
    basketrouter(){
      this.url=`/kosar`;
      this.$router.push(this.url);
      this.search='';
      this.csaktermekek=false;
    },
    datarouter(){
      this.url=`/adatok`;
      this.$router.push(this.url);
      this.csakkosar=false;
      this.csaktermekek=false;
    },
    szur () {
      this.pageNumber=0;
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
        if (this.search!="") {
          this.szurttomb =this.tomb.filter(v => RegExp(this.search,'i').test(v.termek)).slice(0,9);
          this.itemsPerRow=this.szurttomb.length;
          this.szurttombhossz=this.szurttomb.length;
          this.searchrouter();
          this.search="";
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
