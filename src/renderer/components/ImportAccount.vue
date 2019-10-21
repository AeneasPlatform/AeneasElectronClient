<template>
	<div class="row justify-content-center motto-title">
		<div class="col-sm-5">
			<div class="row justify-content-center">
				<div class="col-md-12 text-center">
					<b-form @submit="onSubmit" @reset="onReset">
						<!-- <div class="ae-glyph">&nbsp;</div> -->
						<b-form-group id="pwdgroup"
									  :label="phraseLabelDescr"
									  label-for="passphrase">
							<b-form-textarea class="ae-text" id="passphrase"
											 v-model="form.passphrase"
											 required
											 :placeholder="phrasePlaceHolder">
							</b-form-textarea>
						</b-form-group>
						<div class="col-lg-12 col-md-12 text-center">
							<b-button type="submit" variant="default" class="btn btn-outline-light ae-border">
								<translate>SUBMIT</translate>
							</b-button>
							<b-button type="reset" variant="default" class="btn btn-outline-light ae-border">
								<translate>RESET</translate>
							</b-button>
							<b-button type="button" variant="default" @click="cancel"
									  class="btn btn-outline-light ae-border">
								<translate>CANCEL</translate>
							</b-button>
						</div>
					</b-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import redirect_to from '../redirect_to'

    import {BButton, BForm, BFormGroup, BFormTextarea} from 'bootstrap-vue'

    export default {
        name: 'ImportAccount',
        components: {
            'b-form-group': BFormGroup,
            'b-form': BForm,
            'b-form-textarea': BFormTextarea,
			'b-button': BButton
        },
        data: function () {
            return {
                form: {
                    passphrase: ''
                }

            }
        },
        computed: {
            phrasePlaceHolder() {
                return this.$gettext('Enter your saved passphrase')
            },
            phraseLabelDescr() {
                return this.$gettext('Your Seed')
            },
            step() {
                return this.$store.state.signInStore.step
            }
        },
        /*watch: {
            step(newValue) {
                console.log('SUCH WOW' + newValue)
                redirect_to(this.$router, newValue)
            }
        },*/
        methods: {
            onSubmit: function () {
                this.$socket.sendObj({msg: {action: 'ImportAccont', passPhrase: this.form.passphrase.split(' ')}})
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
