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
                    label-for="fee">
                    <b-form-input class="ae-text ae-ash-border" id="fee"
                        type="text"
                        v-model="form.fee"
                        required
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
      console.log(this.form)
      this.$socket.sendObj({msg: {action: 'SendAsh',
        address: this.form.address,
        fee: this.form.fee * this.exp,
        amount: this.form.amount * this.exp,
        from: this.seed.address}})
      // this.$store.commit ("seed", this.seed)
    }
  },
  computed: {
    seed () { return this.$store.state.main.seed },
    logged () {
      return this.$store.state.main.logged
    },
    balance () { return this.$store.state.main.balance / exp },
    exp () { return this.$store.state.main.exp },
    unconfirmedBalance () { return this.$store.state.main.unconfirmedBalance / exp },
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
