<template lang="pug">
      .container

          .row.mb-2.mt-4
              .col-md-6
                  div Account Statement
          hr
          br 
          .row.mt-1
            .col-md-12
                div(v-for="record in records" :key="record.index") {{record}}
                
</template>

<script>

export default {
    name:'Statements',
    props: ['data'],

    data: () => ({
        records: [],
    }),

    mounted(){
        let data = {member_no:this.data.member_no, portfolio:this.data.fund}
        this.$store.dispatch('fetchTransactions', data)
        .then(data => {
            this.records = data
        }).catch(err => {
            console.log(err)
        })
    }

}
</script>