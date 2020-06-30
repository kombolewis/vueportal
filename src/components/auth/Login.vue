<template lang="pug">
    .container
        .row-mt-4
            .offset-md-2.col-md-6(style="margin-top:3%")
                div(v-if="message")
                    div(role="alert").alert.alert-warning.alert-dismissable.fade.show {{message}}
                        button.close(type="button" data-dismiss="alert" aria-label="Close")
                            span(aria-hidden="true") &#215;
        .row.mt-4
            .offset-md-2.col-md-6(style="margin-top:3%")
                h2 Login
                hr
                form(action="#" @submit.prevent="login")
                    .form-group
                        label(for="id_no") ID Number
                        input.form-control(type="text" placeholder="Enter your ID Number" v-model="id_no")
                        button.btn.btn-primary.mt-3(type="submit") Submit
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name:'Login',

    data: () => ({
        id_no: '',
        message:''
    }),
    methods:{
        ... mapActions(['getUserState','setCustomerId']),
        login(){
            this.getUserState({
                id_no:this.id_no
            })
            .then(data => {
                if((data.status == '01') || (data.status == '11') ){
                    let id_no = this.id_no
                    this.$router.push({name:'CustomerLogin',params:{id_no}})
                }else if(data[0].E_MAIL){
                    this.setGlobalId()
                    this.$router.push({name:'SetContact',params:{data}})
                }
                else{
                    this.message = 'User not found'
                }
            })
            
        },
        setGlobalId(){
            this.setCustomerId(this.id_no)
        }

    }
}
</script>