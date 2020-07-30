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
                href: {path: '#'},
                title: 'My Accounts',
                icon: 'fas fa-wallet', 
                child: [
                    {
                        href: {path:'/home/accounts'},
                        title: 'Accounts',
                        icon: 'fas fa-donate'                        
                    },
                    {
                        href: {path:'#accounts/emergency-fund'},
                        title: 'Open Emergency Fund',
                        icon: 'fas fa-donate'
                    },
                    {
                        href: {path:'#accounts/pension-plan'},
                        title: 'Open Pension Plan',
                        icon: 'fas fa-donate'
                        
                    },
                    {
                        href: {path:'#accounts/fee-plan'},
                        title: 'Open School Fees Plan',
                        icon: 'fas fa-donate'
                        

                    },
                    {
                        href: {path:'#accounts/savings-plan'},
                        title: 'Open Savings Plan',
                        icon: 'fas fa-donate'
                        

                    }
                ]
            },
            {
                href: {path: '#deposit'},
                title: 'Deposit',
                icon: 'fas fa-piggy-bank', 
                child: [
                    {
                        href: {path:'#deposit/Mpesa'},
                        title: 'Mpesa Deposit',
                        icon: 'fas fa-coins' 
                    }, 
                    {
                        href: {path:'#deposit/bank'},
                        title: 'Bank Deposit',
                        icon: 'fas fa-landmark' 
                    }, 
                    {
                        href: {path:'#deposit/#standing-order'},
                        title: 'Standing order',
                        icon: 'fas fa-file-alt',
                        child: [
                            {
                                href: {path:'#deposit/#standing-order/order-form'},
                                title: 'Standing Order',
                                icon: 'fas fa-file-invoice-dollar'
                            },
                            {
                                href: {path:'#deposit/#standing-order/automated-payment'},
                                title: 'Scheduled Automated Payment',
                                icon: 'fas fa-file-invoice-dollar'
                            }
                        ]
                    }, 
                ]
            },
            {
                href: {path: '#withdraw'},
                title: 'Withdraw',
                icon: 'fas fa-money-check-alt',
                child: [
                    {
                        href: {path:'#withdraw/Mpesa'},
                        title: 'Mpesa Withdrawal',
                        icon: 'fas fa-coins' 
                    }, 
                    {
                        href: {path:'#withdraw/bank'},
                        title: 'Bank Withdrawal',
                        icon: 'fas fa-landmark' 
                    }, 
                    {
                        href: {path:'#deposit/#third-party'},
                        title: 'Third Party Withdrawal',
                        icon: 'fas fa-money-bill-wave-alt'
                    }, 
                ]
            },
            {
                href: {path: '#manage'},
                title: 'Manage Account',
                icon: 'fas fa-user-cog', 
                child: [
                    {
                        href: {path:'#manage/edit-personal-details'},
                        title: 'Edit Personal Details',
                        icon: 'fas fa-user-edit' 
                    }, 
                    {
                        href: {path:'#manage/edit-next-kin'},
                        title: 'Edit Next of Kin',
                        icon: 'fas fa-edit' 
                    }, 
                    {
                        href: {path:'#manage/fund-transfer'},
                        title: 'Third Party Withdrawal',
                        icon: 'fas fa-file-alt'
                    }, 
                   {
                        href: {path:'#manage/open-account'},
                        title: 'Open New Account',
                        icon: 'fas fa-folder-plus', 
                    }, 
                ]
            },
            {
                href: {path: '#finance-manager'},
                title: 'Personal Finance Manager',
                icon: 'fas fa-balance-scale-left', 
                child: [
                    {
                        href: {path:'#finance-manager/savings-calculator'},
                        title: 'Savings Calculator',
                        icon: 'fas fa-calculator' 
                    }, 
                    {
                        href: {path:'#finance-manager/target-calculator'},
                        title: 'Savings Target Calculator',
                        icon: 'fas fa-funnel-dollar' 
                    }, 
                    {
                        href: {path:'#finance-manager/savings-time-calcultor'},
                        title: 'Savings Time Calculator',
                        icon: 'far fa-calendar-alt', 
                    }
                ]
            },

        ]
    }),

    }
</script> 
<style >


</style>