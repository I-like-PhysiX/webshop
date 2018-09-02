<template>
  <div id ="adatok">
    <div style="text-align:center; margin: 15px auto;">Adatok megadása és vásárlás</div>
      <div class="main">
        <b-modal ref="myModalRef" hide-footer title="Bevásárló alkalmazás">
          <div class="d-block text-center">
            <h3>Köszönjük a vásárlást!</h3>
          </div>
          <b-btn
                 class="mt-3"
                 variant="outline-danger"
                 block
                 v-on:click="hideModal">Bezárás</b-btn>
        </b-modal>
    <div class="container">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="exampleInputGroup1"
                      label="Név: *"
                      label-for="exampleInput1">
          <b-form-input id="exampleInput1"
                        type="text"
                        v-model="input1"
                        required
                        placeholder="Név">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Cím: *"
                      label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="text"
                        v-model="input2"
                        required
                        placeholder="Cím">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup3"
                      label="Telefonszám: *"
                      label-for="exampleInput3">
          <b-form-input id="exampleInput3"
                        type="tel"
                        v-model="input3"
                        required
                        placeholder="0630123456">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup4"
                      label="Email cím: *"
                      label-for="exampleInput4">
          <b-form-input id="exampleInput4"
                        type="email"
                        v-model="input4"
                        required
                        placeholder="példa@email.com">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleGroup5">
          <b-form-checkbox-group v-model="checked" id="exampleChecks" required>
            <p><b-form-checkbox value="GDPR">Egyetértek a <a href="https://www.eugdpr.org/" target="_blank">GDPR</a> feltételeivel. *</b-form-checkbox></p>
            <p><b-form-checkbox value="ÁSZF">Egyetértek az <a href="http://www.kormany.hu/download/b/db/21000/20170911%20IM%20%C3%81SZF%20felhaszn%C3%A1l%C3%A1si%20felt%C3%A9telek_felhaszn%C3%A1l%C3%A1si%20szerz%C5%91d%C3%A9sek.pdf" target="_blank">ÁSZF</a> feltételeivel. *</b-form-checkbox></p>
          </b-form-checkbox-group>
        </b-form-group>
        <br>
        <br>
        <b-button-group class="responsive">
          <b-btn v-on:click="$emit('basketrouterEvent')" size="sm" variant="primary">Kosár</b-btn>
          <b-button type="reset" size="sm" variant="danger">Tötlés</b-button>
          <b-button type="submit" size="sm" variant="success">Vásárlás</b-button>
        </b-button-group>
      </b-form>
      <br>
      <br>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'adatok',
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      checked: []
    }
  },
  watch: {

   },
  methods: {
    onReset (event) {
      event.preventDefault();
      this.input1 = '';
      this.input2 = '';
      this.input3 = '';
      this.input4 = '';
      this.checked = [];
    },
    onSubmit (event) {
      event.preventDefault();
      console.log('Make API request');
      this.showModal();
    },
    showModal () {
      this.$refs.myModalRef.show();
    },
    hideModal () {
      this.$refs.myModalRef.hide();
      this.$emit('onCloseEvent');
      this.$emit('initEvent');
    }
  },
  mounted() {

  },
  computed: {

  }
}
</script>

<style scoped>
 #adatok{
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
