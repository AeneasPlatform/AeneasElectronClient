<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="card" >
        <div class="card-header blocks-header">
          <!--<translate>Recent transactions</translate>-->
          <translate>Balances</translate>
        </div>
        <div class="card-block blocks">
          <b-button type="button" variant="default" @click="loadBalances" class="btn btn-outline-dark ae-border">
            <translate>LOAD BALANCES</translate>
          </b-button>
          <b-button type="button" variant="default" @click="save" class="btn btn-outline-dark ae-border">
            <translate>SAVE TO FILE</translate>
          </b-button>
        </div>
        <div class="card-block blocks">
          <b-form-input class="ae-text ae-ash-border" id="search"
                        type="text"
                        v-model="search"
                        placeholder="Search..">
          </b-form-input>
        </div>
        <div class="card-block blocks horscroll">
          <table class="table blocksfont">
            <thead>
              <tr>
                <th @click="sort('addr')" scope="col"><translate>Address</translate></th>
                <th scope="col"><translate>Balance</translate></th>
                <th @click="sort('blocksCount')" scope="col"><translate>Blocks count</translate></th>
                <th scope="col"><translate>In. Tx. count</translate></th>
                <th scope="col"><translate>Out. Tx. count</translate></th>
              </tr>
            </thead>
            <tbody v-bind:key="b.addr" v-for="b in filteredList">
              <RecentBalance v-bind:newBalance="b"></RecentBalance>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RecentBalance from '@/components/RecentBalance'

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','
      line += array[i][index];
    }
    str += line + '\r\n';
  }

  return str;
}

export default {
  name: 'RecentBalances',
  data: function (){ return {
        currentSort:'name',
        currentSortDir:'asc',
        search: '',
    }
  },  
  methods: {
    loadBalances () {
        this.$socket.sendObj({msg: {action: 'GetBalances'}})
    } ,
    sort : function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
    },
    save: function() {
        let filename = "balances.csv"
        let data = convertToCSV(JSON.stringify (this.balances.map ((obj) => {
            return {
                addr :obj.addr,
                balance :obj.balance.available,
                blocksCount: obj.blocksCount
            }
        })))
        var blob = new Blob([data], {type: 'text/csv'});
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
  },
  components: {
    'RecentBalance': RecentBalance
  },
  computed: {
    blocks () { return this.$store.state.main.blocks },
    balances () { 
        if (this.$store.state.main.balances != undefined){
         return this.$store.state.main.balances.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
         }); 
        }else return []
    },
    filteredList() {
      return this.balances.filter(b => {
        return b.addr.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  }
}
</script>
