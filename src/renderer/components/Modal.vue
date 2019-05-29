<template type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="tx-modal-mask">
      <div class="tx-modal-wrapper">
        <div class="tx-modal-container">
          <div class="tx-modal-body">
            <slot name="body">
              <div class="block-id">{{accId}}</div>
              <b-tabs style="margin-top:10px;max-height:80%">
                <b-tab title="general">
                  <div class="table-block">
                  <table class="table blocksfont">
                    <thead>
                      <tr>
                        <th class="modal-th modal-th-header" scope="col">block</th>
                        <th class="modal-th modal-th-header" scope="col">ID</th>
                        <th class="modal-th modal-th-header" scope="col">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-bind:key="tx.id" v-for="tx in sortedTxs">
                        <th class="modal-th" @click="sort('blockId')">{{tx.blockId}}</th>
                        <th class="modal-th" @click="sort('id')">{{tx.id}}</th>
                        <th class="modal-th">{{tt(tx.timestamp)}}</th>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </b-tab>
                <b-tab title="transfer">
                  <div class="table-block">
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
                  </div>
                </b-tab>
              </b-tabs>
            </slot>
          </div>
          <div class="tx-modal-footer">
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
import timeConverter from '@/components/timeFormat.js';

  export default {
    name: 'Modal',
    props: ['transactions', 'blockId'],
    data() {
      return {
        txs: this.transactions,
        accId: this.accId,
        currentSort:'block',
        currentSortDir:'asc',
      }
    },
    methods: {
      numberWithDots(grans) {
        let str = grans.toString().replace(/(?=([0-9+\ ]{8})(?=[.]|$))/g, ' . ');
        let dot = str.indexOf('.', 0);
        let str1 = str.substring(0, dot-1).replace(' ', '');
        let str2 = str.substring(dot-1, str.length).replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
        return str1 + str2;
      },
      sort : function(s) {
          //if s == current sort, reverse
          if(s === this.currentSort) {
              this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
          }
          this.currentSort = s;
      },
      tt : (time) => timeConverter (time)
    },
    computed:{
      sortedTxs () {
        return this.transactions.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
         }); 
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
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
}

.tx-modal-wrapper {
  display: block;
  width:80%;
  height: 90%;
  margin: auto;
}

.tx-modal-container {
  margin: 10px 10px;
  width: 100%;
  height: 100%;
  padding: 0px 2rem;
  background-color: #fff;
  border-radius: 4px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0); */
  transition: all .5s ease;
  font-family: 'LatoWebMedium';
  overflow: hidden;
}

.tx-modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.tx-modal-body {
  margin-top: 10px;
  padding-bottom: 1px;
  height: 85%;
  overflow: hidden;
}

@media screen and (max-height: 600px){
  .table-block {
    max-height: 300px;
  }
}

@media screen and (max-height: 400px){
  .table-block {
    max-height: 100px;
  }
}

@media screen and (max-height: 800px){
  .table-block {
    height: 400px;
  }
}

@media screen and (max-height: 1024px){
  .table-block {
    height: 500px;
  }
}

.table-block {
  overflow: scroll;
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
  float: right;
	border-radius: 1rem;
	border: 1px solid gray;
	cursor: pointer;
	padding: 0.5rem 1rem;
	text-decoration: none;
  margin-top: 5px;
}

.modal-default-button:active {
	position: relative;
	top: 1px;
}

.tx-modal-footer {
  border-top: 0;
  height: 15%;
  justify-content: center;
  background: #fff;
}

.block-id {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: 'LatoWebBold';
  font-size: 1.5rem;
}

</style>

