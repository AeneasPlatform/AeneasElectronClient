<template>
  <div class="row justify-content-center motto-title">
      <div class="col-md-6">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center" >
                <div class="ae-glyph"></div>
                <translate class="dashboard-c-light">SIGN IN</translate>
                <div class="ae-glyph"></div>
            </div>
        </div>
          <div class="row justify-content-center" style="margin-top:20px;">

              <div class="col-md-14 text-center">
                    <div class="seed" id="seed"><translate>ACCOUNT</translate>: {{seed.address}}</div>
              </div>
          </div>
          <div class="row justify-content-center"  style="margin-top:20px;">

              <div class="col-md-8 text-center">
                <b-form @submit="onSubmit" @reset="onReset" >
                  <b-form-group id="pwdgroup"
                    :label="pwdLabelDescr"
                    label-for="password">
                    <b-form-input class="ae-text" id="password"
                        type="password"
                        v-model="form.password"
                        required
                        :placeholder="pwdPlaceHolder">
                    </b-form-input>
                  </b-form-group>
                  <div class="col-md-12 text-center">
                    <b-button type="submit" variant="default" class="btn btn-outline-light ae-border"><translate>SIGN IN</translate></b-button>
                    <b-button type="reset" variant="default" class="btn btn-outline-light ae-border"><translate>CANCEL</translate></b-button>
                  </div>
                </b-form>
              </div>
          </div>
      </div>
</div>
</template>
<script>
import redirect_to from '../redirect_to'

export default {
  name: 'Login',
  data: function () {
    return {
      form: {
        password: '',
        confirm: ''
      }

    }
  },
  computed: {
    seed () { return this.$store.state.main.seed },
    pwdPlaceHolder () {
      return this.$gettext('Enter password')
    },
    pwdLabelDescr () {
      return this.$gettext('ENTER PASSWORD')
    },
    step () {
      return this.$store.state.signInStore.step
    }
  },
  watch: {
    step (newValue) {
      console.log('SUCH WOW' + newValue)
      redirect_to(this.$router, newValue)
    }
  },
  methods: {
    onSubmit: function () {
      this.$socket.sendObj({msg: {action: 'Login', pwd: this.form.password, seed: this.seed.seed}})
      this.$store.commit('seed', this.seed)
    },
    onReset: function () {
      this.$router.push('/account')
    }
  }
}
</script>
