<script>
    import {BigNumber} from 'bignumber.js'
    export default {
        name: "Validator",
        methods: {
            isAddressValid: function (address) {
                const startSymbol = 'Æ'
                return address.length === 52 && address.charAt(0) === startSymbol
            },
            isAmountValid: function (amount) {
                let number = BigNumber(amount)
                return number.isPositive() && !number.isZero()
            }
        }
    }
</script>

<style scoped>

</style>
