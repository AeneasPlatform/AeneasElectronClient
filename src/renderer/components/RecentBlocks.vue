<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="card" >
        <div class="card-header blocks-header">
          <translate>Recent blocks</translate>
        </div>
        <div class="card-block blocks horscroll">
          <table class="table blocksfont">
            <thead>
              <tr>
                  <th scope="col"><translate>Height</translate></th>
                  <th scope="col"><translate>ID</translate></th>
                  <th scope="col"><translate>Timestamp</translate></th>
                  <th scope="col"><translate>Generator</translate></th>
                  <th scope="col"><translate>Nonce</translate></th>
              </tr>
            </thead>
            <tbody v-bind:key="block.id" v-for="block in blocks">
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

export default {
  name: 'RecentBlocks',
  computed: {
    blocks () { return this.$store.state.main.blocks; } 
  },
  components: {
    'RecentBlock': RecentBlock
  },
}
</script>
