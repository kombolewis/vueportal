<template lang="pug">
        .d-flex
            .container
                .row.mt-4
                    .col-md-12
                        .d-flex
                            div(v-if="loggedinUserInfo")
                                
                                p(style="text-transform:capitalize") 
                                    | Welcome, {{cleanString(loggedinUserInfo.name)}} to your Dashboard
                       
                               
                               
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'Dashboard',
    data: () => ({

    }),
    methods:{
        cleanString(data){
            return data.replace(/[|&;$%@"<>()+,-]/g, "").toLowerCase();
        }
    },
    computed:{
        ...mapGetters(['loggedinUserInfo'])
    },
    beforeCreate(){
        this.$store.dispatch('requestUserInfo')
    }

}
</script>
<style >

</style>