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
                        <span>{{numberWithDots(balance)}}</span> ASH
                        <span class="card-subtitle mb-2 text-muted" style="margin-left : 20px">
                            <translate>Unconfirmed: </translate>
                        </span>
                        <span>{{unconfirmedBalance.toLocaleString()}}</span> ASH
                    </div>
                    <div>
                        <span class="card-subtitle mb-2 text-muted">
                            <translate>Total balance: </translate>
                        </span>
                        <span>{{numberWithDots(fullBalance)}}</span> ASH
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
                    <div>
                        <span class="card-subtitle mb-2 text-muted">
                            <translate>Active peers count: </translate>
                        </span>
                        <span>{{peersCount}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {BigNumber} from 'bignumber.js'


export default {
  name: 'DashBoard',
  methods: {
    switchToMine: function () { this.$socket.sendObj({ msg: { action: 'SwitchToMine'}}) },
    numberWithDots(grans) {
      let str = grans.toString().replace(/(?=([0-9+\ ]{8})(?=[.]|$))/g, ' . ');
      let dot = str.indexOf('.', 0);
      let str1 = str.substring(0, dot-1).replace(' ', '');
      let str2 = str.substring(dot-1, str.length).replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
      return str1 + str2;
    }
  },
  computed: {
    seed () { return this.$store.state.main.seed },
    height () { return this.$store.state.main.height },
    peersCount  () { return this.$store.state.main.peers?this.$store.state.main.peers.length:0 },
    logged () { return this.$store.state.main.logged },
    balance () { return this.$store.state.main.balance },
    unconfirmedBalance () { return this.$store.state.main.unconfirmedBalance },
    fullBalance () { return this.$store.state.main.fullBalance }
  },
  created: function () {
    console.log(this.$store.state.main.seed)
  }
}
</script>
