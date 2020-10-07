<template lang="pug">
    SidebarMenu(:menu="menu" :relative="true")
</template>
 
<script>
import { SidebarMenu } from 'vue-sidebar-menu'
export default {  
    name: 'Sidebar',

    components: {
        SidebarMenu
    },
    data: () => ({
        menu: [
            {
                header: true,
                title: 'Main Navigation',
                hiddenOnCollapse: true
            },
            {
                href: {path:'/home/dashboard'},
                title: 'Dashboard',
                icon: 'fa fa-user'
            },
            {
                href: {path: '/home/accounts'},
                title: 'My Accounts',
                icon: 'fas fa-wallet', 
                child: [
                    {
                        href: {path:'/home/accounts'},
                        title: 'Accounts',
                        icon: 'fas fa-donate'                        
                    },
                    {
                        href: {path:'/home/join'},
                        title: 'Open Account',
                        icon: 'fas fa-plus-circle' 
                    },
                ]
            },
            {
                href: {path: '/home/deposit'},
                title: 'Deposit',
                icon: 'fas fa-piggy-bank', 
                child: [
                    {
                        href: {path:'/home/deposit'},
                        title: 'Deposit',
                        icon: 'fas fa-coins' 
                    }, 

                ]
            },
            {
                href: {path: '/home/withdraw'},
                title: 'Withdraw',
                icon: 'fas fa-money-check-alt',
                child: [
                    {
                        href: {path:'/home/withdraw'},
                        title: 'Withdraw',
                        icon: 'fas fa-money-bill-wave-alt'
                    }, 
                ]
            },
            {
                href: {path: '/home/update'},
                title: 'Manage Account',
                icon: 'fas fa-user-cog', 
                child: [
                    {
                        href: {path:'/home/update'},
                        title: 'Update Personal Details',
                        icon: 'fas fa-user-edit' 
                    }, 
                    {
                        href: {path:'/home/nextofkin'},
                        title: 'Edit Next of Kin',
                        icon: 'fas fa-edit' 
                    }, 
                    {
                        href: {path:'/home/fundtransfer'},
                        title: 'Fund Transfer',
                        icon: 'fas fa-file-alt'
                    },
                ]
            },
            {
                href: {path: '/home/calculator'},
                title: 'Personal Finance Manager',
                icon: 'fas fa-balance-scale-left', 
                child: [
                    {
                        href: {path:'/home/calculator'},
                        title: 'Savings Calculator',
                        icon: 'fas fa-calculator' 
                    }, 

                ]
            },

        ]
    }),

    }
</script> 
<style >


</style>