<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <div class="block-id">{{blockId}}</div>
              <table class="table blocksfont">
                <thead>
                  <tr>
                    <th class="modal-th" scope="col">ID</th>
                    <th class="modal-th" scope="col">Destination</th>
                    <th class="modal-th" scope="col">Amount</th>
                    <th class="modal-th" scope="col">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="tx.id" v-for="tx in transactions">
                    <th class="modal-th">{{tx.id}}</th>
                    <th class="modal-th">{{tx.address}}</th>
                    <th class="modal-th">{{tx.amount}}</th>
                    <th class="modal-th">{{tx.timestamp}}</th>
                  </tr>
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
import { parse } from 'path';
  //  "timestamp":1553590789907, "id":"2C9br4qn55mGc4kYnoHuqicTA4oLrxCSqmrp6Gc5YkTR"
  export default {
    name: 'Modal',
    props: ['transactions', 'blockId'],
    data() {
      return {
        txs: this.transactions,
        bId: this.blockId,
      }
    },
    methods: {
      timeConverter (UNIX_timestamp) {
        const date = new Date(UNIX_timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        const _date = date.getDate()
        const hour = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()
        const time = _date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec
        return time;
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
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 55%;
  margin: 0px auto;
  padding: 0px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .5s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow: hidden;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-th {
  text-align: center;
  font-family: 'LatoWebBold';
}

.modal-default-button {
  float:initial;
}

.block-id {
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'LatoWebBold';
  font-size: 1.5rem;
}
</style>

