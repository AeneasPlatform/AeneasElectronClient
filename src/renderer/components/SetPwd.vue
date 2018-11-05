<template>
  <div class="row justify-content-center motto-title">
      <div class="col-sm-5">
          <div class="row justify-content-center">
              <div class="col-md-10 text-center">
                <b-form @submit="onSubmit" @reset="onReset" >
                  <!-- <div class="ae-glyph">&nbsp;</div> -->
                  <b-form-group id="seedLabel"
                    :label="seedLabelDescr"
                    label-for="seed">
                    <b-form-input id="seed"
                        type="text"
                        readonly
                        v-model="seed.seed">
                    </b-form-input>
                  </b-form-group>
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
                  <b-form-group id="confirmgroup"
                    :label="confirmLabelDescr"
                    label-for="confirm">
                    <b-form-input class="ae-text" id="confirm"
                        type="password"
                        v-model="form.confirm"
                        required
                        :placeholder="confirmPlaceHolder">
                    </b-form-input>
                  </b-form-group>
                  <div class="col-md-12 text-center">
                    <b-button type="submit" variant="default" class="btn btn-outline-light ae-border"><translate>SUBMIT</translate></b-button>
                    <b-button type="reset" variant="default" class="btn btn-outline-light ae-borde"><translate>RESET</translate></b-button>
                    <b-button type="button" variant="default" @click="cancel" class="btn btn-outline-light ae-border"><translate>CANCEL</translate></b-button>
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
  name: 'SetPwd',
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
    confirmPlaceHolder () {
      return this.$gettext('Enter confirmation')
    },
    pwdPlaceHolder () {
      return this.$gettext('Enter password')
    },
    seedLabelDescr () {
      return this.$gettext('Your Seed')
    },
    pwdLabelDescr () {
      return this.$gettext('Protect Your Account with a New Password')
    },
    confirmLabelDescr () {
      return this.$gettext('Confirm password')
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
      this.$socket.sendObj({msg: {action: 'SetLocalPass', password: this.form.password, confirmPassword: this.form.confirm}})
    },
    onReset: function () {

    },
    cancel: function () {
      this.$socket.sendObj({msg: {action: 'CancelSignUp'}})
      this.$router.push('/account')
      this.$store.commit('step', 0)
    }
  }
}
</script>
