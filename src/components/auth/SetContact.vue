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
                h2 Choose Contacts
                p Hello, You have multiple Contacts. Please Choose one to receive your password.
                hr
                form(action="#" @submit.prevent="submitContact")
                    .d-flex.justify-content-between
                        div(style="margin-right:1%")
                            select(v-model="selectedContact")
                                option(v-for="obj in data" :key="obj.index" :value="{text: obj.E_MAIL}") {{obj.E_MAIL}}
                        div(style="margin-left:1%%")
                            button.btn.btn-outline-success.my-2.my-sm-0(type="submit") Submit 
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    name:'SetContact',
    data: () => ({
        message:'',
        selectedContact:''
    }),
    props:['data'],
    methods:{
        ... mapActions(['setContact']),
        submitContact(){
            console.log(this.selectedContact.text)
            this.setContact({
                contact:this.selectedContact.text,
                id_no: this.getId
            }).then(data => {
                if(data.status == '01') {
                    let id_no = this.getId
                    this.$router.push({name:'CustomerLogin',params:{id_no}})
                }
            })
            

        },
        

    },
    computed:{
        ...mapGetters(['getId'])
    },
 

}
</script>