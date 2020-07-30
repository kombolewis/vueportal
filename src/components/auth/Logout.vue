<template lang="pug">

</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'Logout',
    methods:{
        ...mapActions(['logoutUser'])
    },
    created(){
        this.logoutUser()
        .then(() => {
            this.$router.push({name:'Login'})
        })
    }
}
</script>