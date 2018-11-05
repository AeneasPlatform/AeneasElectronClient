<template>
    <div class="row" style="margin-top:20px;">
        <div class="col-md-12 col-lg-9">
            <div class="card" >
                <div class="card-block blocks blocks-wallet">
                    <div>
                        <span class="card-subtitle mb-2 text-muted">
                            <translate>Your address: </translate>
                        </span>
                        <span>{{seed.address}}</span>
                        <div class="copy-btn-text">&nbsp;</div>    
                    </div>
                    <div>
                        <span class="card-subtitle mb-2 text-muted">
                            <translate>Encoded Seed: </translate>
                        </span>
                        <span>{{seed.seed}}</span>
                        <div class="copy-btn-text">&nbsp;</div>    
                    </div>
                    <div>
                        <span class="card-subtitle mb-2 text-muted">
                            <translate>Available balance: </translate>
                        </span>
                        <span>{{balance}}</span> ASH
                        <span class="card-subtitle mb-2 text-muted" style="margin-left : 20px">
                            <translate>Unconfirmed: </translate>
                        </span>
                        <span>{{unconfirmedBalance}}</span> ASH
                    </div>
                    <div>
                        <span class="card-subtitle mb-2 text-muted">
                            <translate>Total balance: </translate>
                        </span>
                        <span>{{balance+unconfirmedBalance}}</span> ASH
                    </div>
                    
                </div>
            </div>            
        </div>
        <div class="col-md-12 col-lg-3">
            <div class="card" >
                <div class="card-block blocks blocks-wallet">
                    <div>
                        <span class="card-subtitle mb-2" style="color:#2b612b">
                            <translate>Connected</translate>
                        </span>
                    </div>
                    <div>
                        <span class="card-subtitle mb-2 text-muted">
                            <translate>Height: </translate>
                        </span>
                        <span>{{height}}</span> 
                    </div>
                    <div>
                        <span class="card-subtitle mb-2 text-muted" @click="switchToMine">
                            <translate>Switch to mine</translate>
                        </span>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
export default {
  name: 'DashBoard',
  methods: {
    switchToMine: function () {
      this.$socket.sendObj({msg: {action: 'SwitchToMine'}})
    }
  },
  computed: {
    seed () { return this.$store.state.main.seed },
    height () { return this.$store.state.main.height },
    logged () {
      return this.$store.state.main.logged
    },
    exp () { return this.$store.state.main.exp },
    balance () { return this.$store.state.main.balance / this.exp },
    unconfirmedBalance () { return this.$store.state.main.unconfirmedBalance / this.exp }
  },
  created: function () {
    console.log('SEED')
    console.log(this.$store.state.main.seed)
  }
}
</script>
