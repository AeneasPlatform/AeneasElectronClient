<template>
     <div class="row" style="margin-top:20px">
        <div class="col-md-12 col-lg-12">
            <div class="card" >
                <div class="card-header blocks-header">
                    <translate>Send Ash</translate>
                </div>
                <div class="card-block blocks">
                <b-form @submit="onSubmit" >
                  <b-form-group id="toaddrgroup"
                    :label="toAddress"
                    label-for="address">
                    <b-form-input class="ae-text ae-ash-border" id="address"
                        type="text"
                        v-model="form.address"
                        required
                        :placeholder="toAddress">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group id="amountgroup"
                    :label="amountToSend"
                    label-for="amount">
                    <b-form-input class="ae-text ae-ash-border" id="amount"
                        type="text"
                        v-model="form.amount"
                        required
                        :placeholder="amountToSend">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group id="feegroup"
                    :label="fee"
                    label-for="fee"
                    v-show="false">
                    <b-form-input class="ae-text ae-ash-border" id="fee"
                        type="text"
                        :value="form.fee"
                        :placeholder="fee">
                    </b-form-input>
                  </b-form-group>
                  <div class="col-md-12 text-center">
                    <b-button type="submit" variant="default" class="btn btn-outline-dark ae-ash-border" style="width:100%"><translate>GENERATE TRANSACTION</translate></b-button>
                  </div>
                </b-form>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {BigNumber} from 'bignumber.js'

export default {
  name: 'SendAshForm',
  data: function () {
    return {
      form: {
        address: '',
        amount: '',
        fee: ''
      }

    }
  },
  methods: {
    onSubmit: function () {
      let sendAsh = {msg: {action: 'SendAsh',
        address: this.form.address,
        fee: 0,
        amount: BigNumber(this.form.amount).multipliedBy(this.exp).toString(),
        from: this.seed.address}
      }
      console.log(sendAsh)
      this.$socket.sendObj(sendAsh)
      // this.$store.commit ("seed", this.seed)
    }
  },
  computed: {
    balance () { return this.$store.state.main.balance },
    unconfirmedBalance () { return this.$store.state.main.unconfirmedBalance },
    seed () { return this.$store.state.main.seed },
    logged () { return this.$store.state.main.logged },
    exp () { return new BigNumber(10).pow(8) },

    methods: {
      onSubmit: function () {
        let sendAsh = {msg: {action: 'SendAsh',
          address: this.form.toAddress,
          fee: 0,
          amount: BigNumber(this.form.amountToSend).multipliedBy(this.exp).toString(),
          from: this.seed.address
        }}
      // this.$store.commit ("seed", this.seed)
      }
    },
    computed: {
      balance () { return this.$store.state.main.balance },
      unconfirmedBalance () { return this.$store.state.main.unconfirmedBalance },
      seed () { return this.$store.state.main.seed },
      logged () { return this.$store.state.main.logged },
      exp () { return new BigNumber(10).pow(8) },
      toAddress () {
        return this.$gettext('To address')
      },
      amountToSend () {
        return this.$gettext('Amount to Send')
      },
      fee () {
        return this.$gettext('Fee')
      }
    },
    toAddress () {
      return this.$gettext('To address')
    },
    amountToSend () {
      return this.$gettext('Amount to Send')
    },
    fee () {
      return this.$gettext('Fee')
    }

  },
  created: function () {
    console.log('SEED')
    console.log(this.$store.state.main.seed)
  }
}
</script>
