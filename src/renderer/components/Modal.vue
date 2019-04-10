<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <table class="table blocksfont">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="tx.id" v-for="tx in res">
                    <th>{{tx.id}}</th>
                    <th>{{tx.timestamp}}</th>
                  </tr>t
                </tbody>
              </table>
            </slot>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              Close it!
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  //  "timestamp":1553590789907, "id":"2C9br4qn55mGc4kYnoHuqicTA4oLrxCSqmrp6Gc5YkTR"
  export default {
    name: 'Modal',
    props: ['txs'],
    methods: {
      parseTransactions() {
        // int to string. TODO: parse it in deep.
        res = JSON.parse(this.txs);
        console.log(res);
        return res;
      }
    },
    computed: {
      res() { 
        console.log(JSON.parse(this.txs));
        return this.parseTransactions(); 
      }
    }
  }
</script>

<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  opacity: .7;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
</style>

