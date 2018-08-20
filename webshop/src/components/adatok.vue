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
    <div>
      <b-form-group
                    label="Név*"
                    label-for="pop1"
                    horizontal class="mb-1"
                    :state="input1state"
                    invalid-feedback="Kötelező kitölteni!">
        <b-form-input
                      type="text"
                      id="pop1"
                      size="sm"
                      v-model="input1"/>
      </b-form-group>
      <b-form-group
                    label="Cím*"
                    label-for="pop3"
                    horizontal class="mb-1"
                    :state="input3state"
                    invalid-feedback="Kötelező kitölteni!">
        <b-form-input
                      type="text"
                      id="pop3"
                      size="sm"
                      v-model="input3"/>
      </b-form-group>
      <b-form-group
                    label="Telefonszám*"
                    label-for="pop4"
                    horizontal class="mb-1"
                    :state="input4state"
                    invalid-feedback="Kötelező kitölteni!">
        <b-form-input
                      type="tel"
                      id="pop4"
                      size="sm"
                      v-model="input4"/>
      </b-form-group>
      <b-form-group
                    label="E-mail cím*"
                    label-for="pop5"
                    horizontal class="mb-1"
                    :state="input5state"
                    invalid-feedback="Kötelező kitölteni!">
        <b-form-input
                      placeholder="példa@email.com"
                      type="email"
                      id="pop5"
                      size="sm"
                      v-model="input5"/>
      </b-form-group>
      <br>
      <br>
      <b-button-group class="responsive">
        <b-btn v-on:click="$emit('basketrouterEvent')" size="sm" variant="danger">Kosár</b-btn>
        <b-btn v-on:click="onOk()" size="sm" variant="success">Vásárlás</b-btn>
      </b-button-group>
    </div>
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
      input1state: null,
      input3: '',
      input3state: null,
      input4: '',
      input4state: null,
      input5: '',
      input5state: null,
    }
  },
  watch: {
     input1 (val) {
       if (val) {
         this.input1state = true;
       }
     },
     input3 (val) {
       if (val) {
         this.input3state = true;
       }
     },
     input4 (val) {
       if (val) {
         this.input4state = true;
       }
     },
     input5 (val) {
       if (val) {
         this.input5state = true;
       }
     },
   },
  methods: {
    showModal () {
      this.$refs.myModalRef.show();
    },
    hideModal () {
      this.$refs.myModalRef.hide();
      this.$emit('onCloseEvent');
      this.$emit('initEvent');
    },
    onOk () {
      if (!this.input1) { this.input1state = false; }
      if (!this.input3) { this.input3state = false; }
      if (!this.input4) { this.input4state = false; }
      if (!this.input5) { this.input5state = false; }
      if (this.input1 && this.input3 && this.input4 && this.input5) {
        console.log('Make API request');
        this.showModal();
      }
    },
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
