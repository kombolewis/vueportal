<template lang="pug">
  .container

    div(v-if="getAllAccounts.money_market.length > 0")
      .row.mb-2.mt-4
          .col-md-6
              div Money Market Accounts
      hr
      br 
      .row.mt-1
          .col-md-12
            data-tables(style='width:100%' :data='moneyMarket' :pagination-props='{ pageSizes: [3,1,] }')

              el-table-column(label='Account Number')
                template(slot-scope='scope')
                  i.el-icon-notebook-1
                  span(style='margin-left: 10px') {{ scope.row.accountNumber }}

              el-table-column(label='Name')
                template(slot-scope='scope')
                  | {{ scope.row.accountName }}        

              el-table-column(label='Account Type')
                template(slot-scope='scope')
                  | {{ scope.row.accountType }}
                
              el-table-column(label='Purpose')
                template(slot-scope='scope')
                  input(type='text' @change='changeMoneyMarket(scope.row.accountNumber,$event.target.value)' :value="scope.row.accountPurpose")

              el-table-column(label='Action')
                template(slot-scope='scope')
                  el-button(size='mini' type='primary' plain)
                    router-link(:to="{name: 'Statements', params:{data:{member_no:scope.row.accountNumber,fund:scope.row.accountType}}}")
                      | Statement

    div(v-if="getAllAccounts.pension.length > 0")
      .row.mb-2.mt-4
          .col-md-6
              div Pension Accounts
      hr
      br 
      .row.mt-1
          .col-md-12
            data-tables(style='width:100%' :data='pension' :pagination-props='{ pageSizes: [1,1,5] }')

              el-table-column(label='Account Number')
                template(slot-scope='scope')
                  i.el-icon-notebook-1
                  span(style='margin-left: 10px') {{ scope.row.accountNumber }}

              el-table-column(label='Name')
                template(slot-scope='scope')
                  | {{ scope.row.accountName }}        

              el-table-column(label='Account Type')
                template(slot-scope='scope')
                  | {{ scope.row.accountType }}
                
              el-table-column(label='Purpose')
                template(slot-scope='scope')
                  input(type='text' @change='changePension(scope.row.accountNumber,$event.target.value)' :value="scope.row.accountPurpose")

              el-table-column(label='Action')
                template(slot-scope='scope')
                  el-button(size='mini' type='primary' plain)
                    router-link(:to="{name: 'Statements', params:{data:{member_no:scope.row.accountNumber,fund:scope.row.accountType}}}")
                      | Statement
</template>


<script>
import {mapGetters} from 'vuex'
export default {
  name:'Accounts',

    data: () => ({


    }),
    methods:{
        cleanString(data){
            return data.replace(/[|&;$%@"<>()+,-]/g, "");
        },

        changeMoneyMarket(member_no, purpose){
          console.log(member_no,purpose)
        },
        changePension(member_no, purpose){
          console.log(member_no,purpose)
        }

    },

    computed:{
        ...mapGetters(['getAllAccounts']),

        moneyMarket(){
            const data = []
            this.getAllAccounts.money_market.forEach(row => {
                data.push({
                        accountType:row.PORTFOLIO,
                        accountNumber: row.MEMBER_NO,
                        accountName: this.cleanString(row.ALLNAMES),
                        // accountPurpose: row.accountPurpose,
                        accountPurpose: 'savings',
                        
                    })
            })
            return data
            
        },
        pension(){
            const data = []
            this.getAllAccounts.pension.forEach(row => {
                data.push({
                      accountType:row.PORTFOLIO,
                      accountNumber: row.MEMBER_NO,
                      accountName: this.cleanString(row.ALLNAMES),
                      // accountPurpose: row.accountPurpose,
                      accountPurpose: 'savings',

                        
                    })
            })
            
            return data
        },


    },
    beforeCreate(){
        this.$store.dispatch('retrieveAccounts')
    }

}
</script>
<style scoped>
input{
  border: none; 
  border-width: 0; 
  box-shadow: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
input:focus {outline:none!important;}
</style>