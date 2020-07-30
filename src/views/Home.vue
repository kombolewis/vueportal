<template lang="pug">
        .d-flex
            SideBar 
            router-view

                               
                               
</template>
<script>
import {mapGetters} from 'vuex'
import SideBar from '../components/Sidebar'
export default {
    name:'Dashboard',
    data: () => ({

    }),
    components:{
        SideBar
    },
    computed:{
        ...mapGetters(['getAllAccounts'])
    },
    beforeCreate(){
        this.$store.dispatch('retrieveAccounts')
    },
    mounted(){
        this.$router.push({name:'Dashboard'})
        
    }

}
</script>
<style scoped>
/* .v-sidebar-menu {
    position: relative; 
    height: 100%;
} */

</style>