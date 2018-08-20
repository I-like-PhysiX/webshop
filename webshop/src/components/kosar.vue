<template>
  <div id ="kosar">
    <div style="text-align:center; margin: 15px auto;">Kosár</div>
      <div class="main">
        <div class="container">
          <b-alert show class="small" style="background-color: #F5F5F5;">
            <h3 style="color: red; text-align: center; margin: 45px 0px;" v-if="rendelescopy==0">A kosár üres!</h3>
            <table v-else>
              <thead>
                <tr>
                  <td><strong>Termék neve</strong></td>
                  <td><strong>Egységár</strong></td>
                  <td><strong>Mennyiség</strong></td>
                  <td><strong>Részösszeg</strong></td>
                </tr>
              </thead>
              <tbody>
               <tr v-for="(elem, index) in rendelescopy" :key="elem.id">
                  <td>{{ elem.termek }}</td>
                  <td>{{ elem.egysar }}/{{ elem.egys }}</td>
                  <td>
                   <div
                           v-if="elem.egys=='kg'"
                           v-model="elem.alap">
                           <b-button v-on:click="$emit('removefromcartEvent', elem, 0.1)">-</b-button>
                           <b-button :disabled="elem.alap == elem.ossz ? true : false" v-on:click="$emit('addtocartEvent', elem, 0.1)">+</b-button>
                           {{elem.alap}} {{elem.egys}}
                    </div>
                    <div
                           v-if="elem.egys!='kg'"
                           v-model="elem.alap">
                           <b-button v-on:click="$emit('removefromcartEvent', elem, 1)">-</b-button>
                           <b-button :disabled="elem.alap == elem.ossz ? true : false" v-on:click="$emit('addtocartEvent', elem, 1)">+</b-button>
                           {{elem.alap}} {{elem.egys}}
                    </div>
                  </td>
                  <td>
                    {{Math.round(elem.alap*elem.egysar)}} Ft
                    <b-button v-on:click="$emit('delEvent', elem)">X</b-button>
                  </td>
               </tr>
              </tbody>
            </table>
          </b-alert>
          <br>
          <br>
          <strong>Összesen fizetendő:</strong> <b>{{this.osszegcopy}} Ft</b>
          <br>
          <br>
          <b-button-group class="responsive">
           <b-btn v-on:click="$emit('onCloseEvent')" size="sm" variant="danger" :disabled="rendelescopy==0 ? true : false">Kosár kiürítése</b-btn>
           <b-btn v-on:click="$emit('datarouterEvent')" size="sm" variant="success" :disabled="rendelescopy==0 ? true : false">Adatok</b-btn>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rendelescopy", "osszegcopy"],
  name: 'kosar',
  data() {
    return {

    }
  },
  watch: {

   },
  methods: {

  },
  mounted() {
    console.log('kosar init');
  },
  computed: {

  }
}
</script>

<style scoped>
 #kosar{
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
