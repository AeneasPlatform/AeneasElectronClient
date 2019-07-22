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
                    label-for="address"
                    :state="addressState">
                    <b-form-input class="ae-text ae-ash-border" id="address"
                        type="text"
                        v-model="form.address"
                        :state="addressState"
                        required
                        :placeholder="toAddress">
                    </b-form-input>
                    <b-form-invalid-feedback :state="addressState">
                        Address should start with Æ and has 52 length.
                        Example: Æx4btjyE4gkxBv3fQXPVL52vWJqQW8tDxh3hBDkqHpucGDA4YK4C
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group id="amountgroup"
                    :label="amountToSend"
                    label-for="amount"
                    :state="amountState">
                    <b-form-input class="ae-text ae-ash-border" id="amount"
                        type="text"
                        v-model="form.amount"
                        :state="amountState"
                        required
                        :placeholder="amountToSend">
                    </b-form-input>
                     <b-form-invalid-feedback :state="amountState">
                          Amount should be more than zero.
                     </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group id="feegroup"
                    :label="fee"
                    label-for="fee"
                    v-show="true">
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
import Validator from './Validator.vue'

export default {
  name: 'SendAshForm',
  data: function () {
    return {
      form: {
        address: '',
        amount: '',
        fee: '0.001'
      }
    }
  },
  methods: {
    // returns boolean
    // formValidate: function(msg) {
    //   return !(!msg.address.includes("Æ") || parseFloat(msg.fee) < 0.001);
    // },
    onSubmit: function () {
      if (Validator.methods.isAddressValid(this.form.address) &&
      Validator.methods.isAmountValid(this.form.amount)) {

          let sendAsh = {msg: {action: 'SendAsh',
                  address: this.form.address,
                  fee: BigNumber(this.form.fee).multipliedBy(this.exp).toString(),
                  amount: BigNumber(this.form.amount).multipliedBy(this.exp).toString(),
                  from: this.seed.address}
          }

          console.log(sendAsh)
          // if (this.formValidate(sendAsh))
          this.$socket.sendObj(sendAsh)

          // this.$store.commit ("seed", this.seed)

          this.form.address = ''
          this.form.amount = ''
      } else {
          console.log('Fields is not valid')
      }
    }
  },
  computed: {
    addressState: function () {
        return Validator.methods.isAddressValid(this.form.address)
    },
    amountState: function () {
        return Validator.methods.isAmountValid(this.form.amount)
    },
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
  created: function () {
    console.log('SEED')
    console.log(this.$store.state.main.seed)
  }
}
</script>
