<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="tx-modal-mask">
      <div class="tx-modal-wrapper">
        <div class="tx-modal-container">
          <div class="tx-modal-body">
            <slot name="body">
              <div class="block-id">{{blockId}}</div>
              <b-tabs style="margin-top:10px">
                <b-tab title="general">
                  <table class="table blocksfont">
                    <thead>
                      <tr>
                        <th class="modal-th modal-th-header" scope="col">ID</th>
                        <th class="modal-th modal-th-header" scope="col">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-bind:key="tx.id" v-for="tx in transactions">
                        <th class="modal-th">{{tx.id}}</th>
                        <th class="modal-th">{{tx.timestamp}}</th>
                      </tr>
                    </tbody>
                  </table>
                </b-tab>
                <b-tab title="transfer">
                  <table class="table blocksfont">
                    <thead>
                      <tr>
                        <th class="modal-th modal-th-header" scope="col">Sender</th>
                        <th class="modal-th modal-th-header" scope="col">Destination</th>
                        <th class="modal-th modal-th-header" scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-bind:key="tx.id" v-for="tx in transactions">
                        <th class="modal-th">{{tx.sender}}</th>
                        <th class="modal-th">{{tx.address}}</th>
                        <th class="modal-th">{{numberWithDots(tx.amount)}}</th>
                      </tr>
                    </tbody>
                  </table>
                </b-tab>
              </b-tabs>
            </slot>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { parse } from 'path';
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
      numberWithDots(grans) {
        let str = grans.toString().replace(/(?=([0-9+\ ]{8})(?=[.]|$))/g, ' . ');
        let dot = str.indexOf('.', 0);
        let str1 = str.substring(0, dot-1).replace(' ', '');
        let str2 = str.substring(dot-1, str.length).replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
        return str1 + str2;
      }
    }
  }
</script>

<style>
.tx-modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.tx-modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.tx-modal-container {
  width: 88%;
  height: 70%;
  margin: 0px auto;
  padding: 0px 2rem;
  background-color: #fff;
  border-radius: 4px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0); */
  transition: all .5s ease;
  font-family: 'LatoWebMedium';
  overflow: scroll;
}

.tx-modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.tx-modal-body {
  margin-top: 10px;
  padding-bottom: 1px;
}

.table {
  overflow-x: scroll;
  overflow-y: scroll;
}

.modal-th {
  text-align: center;
  font-size: 0.85rem;
  font-family: 'LatoWebBold';
  box-shadow: 0.5px 0.5px 2px 0.5px rgba(0,0,0,0.1);
}

.modal-th-header {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.modal-default-button {
  float: initial;
	border-radius: 1rem;
	border: 1px solid gray;
	cursor: pointer;
	padding: 0.5rem 1rem;
	text-decoration: none;
}

.modal-default-button:active {
	position: relative;
	top: 1px;
}

.tx-modal-footer {
  border-top: 0;
  justify-content: center;
}

.block-id {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: 'LatoWebBold';
  font-size: 1.5rem;
}
</style>

