<template lang="pug">
        .d-flex
            .container-fluid
                .row
                    .col-md-12
                        .d-flex.flex-column
                            div(v-if="getAllAccounts.money_market.length > 0")
                                div(v-for="accounts in getAllAccounts.money_market" :key="accounts.index") {{accounts.MEMBER_NO}}
                            hr 
                            div(v-if)
                            div(v-if="getAllAccounts.pension")

                               
                               
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'Dashboard',
    data: () => ({

    }),

    computed:{
        ...mapGetters(['getAllAccounts'])
    },
    beforeCreate(){
        this.$store.dispatch('retrieveAccounts')
    }

}
</script>
<style >

</style>