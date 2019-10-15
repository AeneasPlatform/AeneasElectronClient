<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="card" >
        <div class="card-header blocks-header">
          <translate>Search block</translate>
          <b-form-input class="ae-text ae-ash-border" id="blocksearch"
              type="text"
              @keyup.enter.native="checkEnter"
              v-model="blocksearch"
              placeholder="Search.."></b-form-input>

        </div>
        <div class="card-block blocks horscroll">
          <table class="table blocksfont">
            <thead>
              <tr>
                  <th scope="col"><translate>Height</translate></th>
                  <th scope="col"><translate>ID</translate></th>
                  <th scope="col"><translate>Timestamp</translate></th>
                  <th scope="col"><translate>Generator</translate></th>
                  <th scope="col"><translate>Txs count</translate></th>
                  <th scope="col"><translate>Nonce</translate></th>
              </tr>
            </thead>
            <tbody v-bind:key="block.id" v-for="block in searchblock">
                <RecentBlock v-bind:newBlock="block"></RecentBlock>
            </tbody>
        </table>
       </div>
      </div>
     </div>
  </div>
</template>
<script>
  import RecentBlock from '@/components/RecentBlock'
  import {BFormInput} from 'bootstrap-vue'


  function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

export default {
  name: 'SearchBlocks',
  data: function (){ return {
        blocksearch: '',
    }
  },  
  computed: {
    searchblock () { 
      if (this.$store.state.main.lastBlockSearch)
        return [this.$store.state.main.lastBlockSearch] 
      else []} 
  },
  methods: {
    checkEnter (object) {
      if (isInt(this.blocksearch)){
        this.$socket.sendObj({msg: {action: 'BlockSearchRequestNum', blockNum: this.blocksearch}})
      } else this.$socket.sendObj({msg: {action: 'BlockSearchRequestId', blockIdPart:this.blocksearch}})
      
      
    }
  },
  components: {
    'RecentBlock': RecentBlock,
    'b-form-input': BFormInput
  },
}
</script>
