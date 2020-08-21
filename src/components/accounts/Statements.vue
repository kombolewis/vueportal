<template lang="pug">
      .container
        div
          .row.mb-2.mt-4
            .col-md-6
              b {{parseInt(data.member_no)}} Account Statement 
          hr
        div(v-if="records.length > 0")
          .row.mt-4
            .col-md-12
              .d-flex.justify-content-end
                el-button(type='primary' @click="downloadStatement")
                  | Download Statement
                  i.el-icon-download.el-icon-right
          div(v-if="data.fund == 'Money Market'")
            .row.mt-1
              .col-md-12
                data-tables(style='width:100%' :data='calculateMMFStatement' :pagination-props='{ pageSizes: [7,7,7] }')

                  el-table-column(label='Date')
                    template(slot-scope='scope')
                      | {{ scope.row.transDate }}        

                  el-table-column(label='Description')
                    template(slot-scope='scope')
                      | {{ scope.row.description }}        

                  el-table-column(label='Deposit')
                    template(slot-scope='scope')
                      | {{ scope.row.deposit }}         

                      
                  el-table-column(label='Withdrawal')
                    template(slot-scope='scope')
                      | {{ scope.row.withdrawal }}          
                    
                  el-table-column(label='Interest')
                    template(slot-scope='scope')
                      | {{ scope.row.interest }}

            .row.mt-4
              .offset-md-2.col-md-8
                el-table(:data='calculateMMFSummary' stripe='' style='width: 100%')
                  el-table-column(prop='deposits' label='Total Deposits')
                  el-table-column(prop='withdrawals' label='Total Withdrawals')
                  el-table-column(prop='interest' label='Total Interest')
                  el-table-column(prop='balance' label='Account Balance')

        
        
          div(v-if="data.fund == 'Balanced Fund'") 
            .row.mt-1
              .col-md-12
                data-tables(style='width:100%' :data='calculateBFStatement' :pagination-props='{ pageSizes: [6,6,6] }')

                  el-table-column(label='Date')
                    template(slot-scope='scope')
                      | {{ scope.row.transDate }}        

                  el-table-column(label='Description')
                    template(slot-scope='scope')
                      | {{ scope.row.description }}        

                  el-table-column(label='Deposit')
                    template(slot-scope='scope')
                      | {{ scope.row.amtDeposit }}      

                  el-table-column(label='Units Bought')
                    template(slot-scope='scope')
                      | {{ scope.row.unitsBought }}         

                  el-table-column(label='Buying Price')
                    template(slot-scope='scope')
                      | {{ scope.row.buyingPrice }}     
                                 
                  el-table-column(label='Withdrawal')
                    template(slot-scope='scope')
                      | {{ scope.row.withdrawAmt }}       
                  
                  el-table-column(label='Units Sold')
                    template(slot-scope='scope')
                      | {{ scope.row.unitSold }}    

                  el-table-column(label='Selling Price')
                    template(slot-scope='scope')
                      | {{ scope.row.sellingPrice }} 

                  el-table-column(label='Gain/(Loss)')
                    template(slot-scope='scope')
                      | {{ scope.row.gainLoss }}   
                  
                  el-table-column(label='%Gain/(Loss)')
                    template(slot-scope='scope')
                      | {{ scope.row.gainLossPercentage }}  

            .row.mt-4
              .col-md-12
                el-table(:data='calculateBFSummary' stripe='' style='width: 100%')
                  el-table-column(prop='deposits' label='Total Deposits')
                  el-table-column(prop='totalUnitsBought' label='Total Units Bought')
                  el-table-column(prop='withdrawals' label='Total Withdrawals')
                  el-table-column(prop='totalUnitSold' label='Total Units Sold')
                  el-table-column(prop='unitsBalance' label='Unit Balance')
                  el-table-column(prop='currentPrice' label='Current Price')
                  el-table-column(prop='balance' label='Market Value')

          div(v-if="data.fund == 'Zimele Personal Pension Plan'") 
            .row.mt-1
              .col-md-12
                data-tables(style='width:100%' :data='calculatePensionStatement' :pagination-props='{ pageSizes: [6,6,6] }')

                  el-table-column(label='Date')
                    template(slot-scope='scope')
                      | {{ scope.row.transDate }}        

                  el-table-column(label='Description')
                    template(slot-scope='scope')
                      | {{ scope.row.description }}        

                  el-table-column(label='Deposit')
                    template(slot-scope='scope')
                      | {{ scope.row.amtDeposit }}      

                  el-table-column(label='Units Bought')
                    template(slot-scope='scope')
                      | {{ scope.row.unitsBought }}         

                  el-table-column(label='Buying Price')
                    template(slot-scope='scope')
                      | {{ scope.row.buyingPrice }}     
                                 
                  el-table-column(label='Withdrawal')
                    template(slot-scope='scope')
                      | {{ scope.row.withdrawAmt }}       
                  
                  el-table-column(label='Units Sold')
                    template(slot-scope='scope')
                      | {{ scope.row.unitSold }}    

                  el-table-column(label='Selling Price')
                    template(slot-scope='scope')
                      | {{ scope.row.sellingPrice }} 

                  el-table-column(label='Gain/(Loss)')
                    template(slot-scope='scope')
                      | {{ scope.row.gainLoss }}   
                  
                  el-table-column(label='%Gain/(Loss)')
                    template(slot-scope='scope')
                      | {{ scope.row.gainLossPercentage }}  

            .row.mt-4
              .col-md-12
                el-table(:data='calculatePensionSummary' stripe='' style='width: 100%')
                  el-table-column(prop='deposits' label='Total Deposits')
                  el-table-column(prop='totalUnitsBought' label='Total Units Bought')
                  el-table-column(prop='withdrawals' label='Total Withdrawals')
                  el-table-column(prop='totalUnitSold' label='Total Units Sold')
                  el-table-column(prop='unitsBalance' label='Unit Balance')
                  el-table-column(prop='currentPrice' label='Current Price')
                  el-table-column(prop='balance' label='Market Value')

          div(v-if="data.fund == 'Zimele Guaranteed Pension Plan' || data.fund == 'Zimele Guaranteed Personal Pension Plan'" ) 
            .row.mt-1
              .col-md-12
                data-tables(style='width:100%' :data='calculateZGPPStatement' :pagination-props='{ pageSizes: [7,7,7] }')

                  el-table-column(label='Date')
                    template(slot-scope='scope')
                      | {{ scope.row.transDate }}        

                  el-table-column(label='Description')
                    template(slot-scope='scope')
                      | {{ scope.row.description }}        

                  el-table-column(label='Deposit')
                    template(slot-scope='scope')
                      | {{ scope.row.deposit }}         

                      
                  el-table-column(label='Withdrawal')
                    template(slot-scope='scope')
                      | {{ scope.row.withdrawal }}          
                    
                  el-table-column(label='Interest')
                    template(slot-scope='scope')
                      | {{ scope.row.interest }}

            .row.mt-4
              .offset-md-2.col-md-8
                el-table(:data='calculateZGPPSummary' stripe='' style='width: 100%')
                  el-table-column(prop='deposits' label='Total Deposits')
                  el-table-column(prop='withdrawals' label='Total Withdrawals')
                  el-table-column(prop='interest' label='Total Interest')
                  el-table-column(prop='balance' label='Account Balance')

                 

                
























































</template>

<script>

export default {
    name:'Statements',
    props: ['data'],

    data: () => ({
        records: [],
        nav:0,
    }),

    created(){
        let accData = {member_no:this.data.member_no, portfolio:this.data.fund}
        this.$store.dispatch('fetchTransactions', accData)
        .then(data => {
            this.records = data
            if(this.data.fund == 'Balanced Fund' || this.data.fund == 'Zimele Personal Pension Plan')
              return this.$store.dispatch('getNav', accData)
        }).then(nav => {
          this.nav = parseFloat(nav)
        })
        .catch(err => {
            console.log(err)
        })

        
    },
    methods:{
      downloadStatement(){
        let accData = {member_no:this.data.member_no, portfolio:this.data.fund}
        this.$store.dispatch('getPDFStatement', accData)
        .then(data => {
          let url = URL.createObjectURL(this.dataURItoBlob(data));
          let link = document.createElement('a');
          link.href = url;
          link.download = 'statement.pdf';
          link.click();
        })
        .catch(err => {
          console.log(err)
        })
      },

      dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'application/pdf'});
        return blob;
      }

    },
    computed:{
        calculateMMFStatement(){
            const data = []

            this.records.forEach(row => {
              let depositRaw = 0;
              // let reinvestementRaw = 0;
              let interestRaw = 0;
              let withdrawalRaw = 0;

              if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'DEPOSIT') || (row.TRANS_TYPE == 'Deposit')){
                depositRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }/*
              else if((row.TRANS_TYPE == 'Re investing') || (row.TRANS_TYPE == 'Re-Investing') || (row.TRANS_TYPE == 'Re-investment') || (row.TRANS_TYPE == 'RE-INVESTING')){
                reinvestementRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }*/
              else if((row.TRANS_TYPE == 'INTEREST') || (row.TRANS_TYPE == 'INTERST')){
                interestRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
                withdrawalRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }
                data.push({
                        transDate:row.TRANS_DATE.replace('00:00:00',''),
                        description: row.MOP,
                        deposit:depositRaw ? depositRaw: '-',
                        // reinvestement:reinvestementRaw ? reinvestementRaw: '-',
                        withdrawal:withdrawalRaw ? withdrawalRaw : '-',
                        interest:interestRaw ? interestRaw : '-',
                    })
            })
            return data
            
        },
        calculateMMFSummary(){
          const data = []
          let i = 0;
          let deposits = 0;
          let withdrawals = 0;
          let interest = 0;
          let reinvestement = 0;

          this.records.forEach(row =>{

            if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'DEPOSIT') || (row.TRANS_TYPE == 'Deposit')){
              deposits += parseFloat(row.AMOUNT)
            }else if((row.TRANS_TYPE == 'Re investing') || (row.TRANS_TYPE == 'Re-Investing') || (row.TRANS_TYPE == 'Re-investment') || (row.TRANS_TYPE == 'RE-INVESTING')){
              reinvestement += parseFloat(row.AMOUNT)
            }else if((row.TRANS_TYPE == 'INTEREST') || (row.TRANS_TYPE == 'INTERST')){
              interest += parseFloat(row.AMOUNT)
            }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
              withdrawals += parseFloat(row.AMOUNT)              
            }

            i++
            if(i == this.records.length){
              data.push({
                deposits: parseFloat(deposits.toFixed(2)).toLocaleString('en'),
                withdrawals: parseFloat(withdrawals.toFixed(2)).toLocaleString('en'),
                interest: parseFloat(interest.toFixed(2)).toLocaleString('en'),
                balance: parseFloat(((deposits+interest+reinvestement) - withdrawals).toFixed(2)).toLocaleString('en')
              })
            
            }

          })
         
          return data
        },
        calculateBFStatement(){
            const data = []

            this.records.forEach(row => {
              let depositAmt = 0;
              let withdrawAmt = 0;
              let boughtUnits = 0;
              let soldUnits = 0;
              let bp = 0;
              let sp = 0;
              let gl = 0;
              let glp = 0;

              if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'DEPOSIT') || (row.TRANS_TYPE == 'Deposit')){
                depositAmt = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
                boughtUnits = parseFloat(parseFloat(row.NOOFSHARES).toFixed(2)).toLocaleString('en')
                bp = parseFloat(parseFloat(row.PRICE).toFixed(4))
                sp = parseFloat(parseFloat(row.NAV).toFixed(4))
                gl = parseFloat((parseFloat(row.NOOFSHARES) * (row.NAV)) - (row.AMOUNT)).toFixed(2)
                glp = parseFloat((gl/row.AMOUNT) * 100).toFixed(2)
              }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
                withdrawAmt = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
                soldUnits = parseFloat(parseFloat(row.NOOFSHARES).toFixed(2)).toLocaleString('en')
                bp = parseFloat(parseFloat(row.PRICE).toFixed(4))
                sp = parseFloat(parseFloat(row.NAV).toFixed(4))
              }
                data.push({
                        transDate:row.TRANS_DATE.replace('00:00:00',''),
                        description: row.MOP,
                        amtDeposit:depositAmt ? depositAmt: '-',
                        unitsBought:boughtUnits ? boughtUnits: '-',
                        buyingPrice:bp ? bp: '-',
                        withdrawAmt:withdrawAmt ? withdrawAmt : '-',
                        unitSold: soldUnits ?soldUnits : '-',
                        sellingPrice: sp ? sp : '-',
                        gainLoss: gl ? gl : '',
                        gainLossPercentage: glp ? glp : ''
                        

                    })
            })
            return data
            
        },
        calculateBFSummary(){
          const data = []
          let i = 0;
          let deposits = 0;
          let depositShares = 0;
          let withdrawals = 0;
          let withdrawalShares = 0;


          this.records.forEach(row =>{
            i++

              if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'DEPOSIT') || (row.TRANS_TYPE == 'Deposit')){
                deposits += parseFloat(row.AMOUNT)
                depositShares += parseFloat(row.NOOFSHARES)
              }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
                withdrawals += parseFloat(row.AMOUNT)
                withdrawalShares += parseFloat(row.NOOFSHARES)

              }

            if(i == this.records.length){
              let unitsBalance = depositShares - withdrawalShares;
              let currentPrice = this.nav;
              let marketValue = unitsBalance * currentPrice;

              data.push({
                deposits: parseFloat(deposits.toFixed(2)).toLocaleString('en'),
                totalUnitsBought:parseFloat(depositShares.toFixed(2)).toLocaleString('en'),
                withdrawals: parseFloat(withdrawals.toFixed(2)).toLocaleString('en'),
                totalUnitSold:parseFloat(withdrawalShares.toFixed(2)).toLocaleString('en'),
                unitsBalance:parseFloat(unitsBalance.toFixed(2)).toLocaleString('en'),
                currentPrice:parseFloat(currentPrice.toFixed(2)).toLocaleString('en'),
                balance: parseFloat(marketValue.toFixed(2)).toLocaleString('en')
              })
            
            }

          })
         
          return data
        },
        calculatePensionStatement(){
            const data = []

            this.records.forEach(row => {
              let depositAmt = 0;
              let withdrawAmt = 0;
              let boughtUnits = 0;
              let soldUnits = 0;
              let bp = 0;
              let sp = 0;
              let gl = 0;
              let glp = 0;

              if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'Purchase')){
                depositAmt = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
                boughtUnits = parseFloat(parseFloat(row.NOOFSHARES).toFixed(2)).toLocaleString('en')
                bp = parseFloat(parseFloat(row.PRICE).toFixed(4))
                sp = parseFloat(parseFloat(row.NAV).toFixed(4))
                gl = parseFloat((parseFloat(row.NOOFSHARES) * (row.NAV)) - (row.AMOUNT)).toFixed(2)
                glp = parseFloat((gl/row.AMOUNT) * 100).toFixed(2)
              }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
                withdrawAmt = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
                soldUnits = parseFloat(parseFloat(row.NOOFSHARES).toFixed(2)).toLocaleString('en')
                bp = parseFloat(parseFloat(row.PRICE).toFixed(4))
                sp = parseFloat(parseFloat(row.NAV).toFixed(4))
              }
                data.push({
                        transDate:row.TRANS_DATE.replace('00:00:00',''),
                        description: row.MOP,
                        amtDeposit:depositAmt ? depositAmt: '-',
                        unitsBought:boughtUnits ? boughtUnits: '-',
                        buyingPrice:bp ? bp: '-',
                        withdrawAmt:withdrawAmt ? withdrawAmt : '-',
                        unitSold: soldUnits ?soldUnits : '-',
                        sellingPrice: sp ? sp : '-',
                        gainLoss: gl ? gl : '',
                        gainLossPercentage: glp ? glp : ''
                        

                    })
            })
            return data
            
        },
        calculatePensionSummary(){
          const data = []
          let i = 0;
          let deposits = 0;
          let depositShares = 0;
          let withdrawals = 0;
          let withdrawalShares = 0;


          this.records.forEach(row =>{
            i++

              if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'Purchase')){
                deposits += parseFloat(row.AMOUNT)
                depositShares += parseFloat(row.NOOFSHARES)
              }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
                withdrawals += parseFloat(row.AMOUNT)
                withdrawalShares += parseFloat(row.NOOFSHARES)

              }

            if(i == this.records.length){
              let unitsBalance = depositShares - withdrawalShares;
              let currentPrice = this.nav;
              let marketValue = unitsBalance * currentPrice;

              data.push({
                deposits: parseFloat(deposits.toFixed(2)).toLocaleString('en'),
                totalUnitsBought:parseFloat(depositShares.toFixed(2)).toLocaleString('en'),
                withdrawals: parseFloat(withdrawals.toFixed(2)).toLocaleString('en'),
                totalUnitSold:parseFloat(withdrawalShares.toFixed(2)).toLocaleString('en'),
                unitsBalance:parseFloat(unitsBalance.toFixed(2)).toLocaleString('en'),
                currentPrice:parseFloat(currentPrice.toFixed(2)).toLocaleString('en'),
                balance: parseFloat(marketValue.toFixed(2)).toLocaleString('en')
              })
            
            }

          })
         
          return data
        },
        calculateZGPPStatement(){
            const data = []

            this.records.forEach(row => {
              let depositRaw = 0;
              // let reinvestementRaw = 0;
              let interestRaw = 0;
              let withdrawalRaw = 0;

              if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'DEPOSIT') || (row.TRANS_TYPE == 'Deposit')){
                depositRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }/*
              else if((row.TRANS_TYPE == 'Re investing') || (row.TRANS_TYPE == 'Re-Investing') || (row.TRANS_TYPE == 'Re-investment') || (row.TRANS_TYPE == 'RE-INVESTING')){
                reinvestementRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }*/
              else if((row.TRANS_TYPE == 'INTEREST') || (row.TRANS_TYPE == 'INTERST')){
                interestRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
                withdrawalRaw = parseFloat(parseFloat(row.AMOUNT).toFixed(2)).toLocaleString('en')
              }
                data.push({
                        transDate:row.TRANS_DATE.replace('00:00:00',''),
                        description: row.MOP,
                        deposit:depositRaw ? depositRaw: '-',
                        // reinvestement:reinvestementRaw ? reinvestementRaw: '-',
                        withdrawal:withdrawalRaw ? withdrawalRaw : '-',
                        interest:interestRaw ? interestRaw : '-',
                    })
            })
            return data
            
        },
        calculateZGPPSummary(){
          const data = []
          let i = 0;
          let deposits = 0;
          let withdrawals = 0;
          let interest = 0;
          let reinvestement = 0;

          this.records.forEach(row =>{

            if((row.TRANS_TYPE == 'PURCHASE') || (row.TRANS_TYPE == 'DEPOSIT') || (row.TRANS_TYPE == 'Deposit')){
              deposits += parseFloat(row.AMOUNT)
            }else if((row.TRANS_TYPE == 'Re investing')  || (row.TRANS_TYPE == 'Re-investing') || (row.TRANS_TYPE == 'Re-Investing') || (row.TRANS_TYPE == 'RE_Investing') || (row.TRANS_TYPE == 'Re-investment') || (row.TRANS_TYPE == 'RE_INVESTMENT') || (row.TRANS_TYPE == 'RE-INVESTMENT') || (row.TRANS_TYPE == 'RE-INVESTING')){
              reinvestement += parseFloat(row.AMOUNT)
            }else if((row.TRANS_TYPE == 'INTEREST') || (row.TRANS_TYPE == 'INTERST')){
              interest += parseFloat(row.AMOUNT)
            }else if(row.TRANS_TYPE == 'WITHDRAWAL'){
              withdrawals += parseFloat(row.AMOUNT)              
            }

            i++
            if(i == this.records.length){
              data.push({
                deposits: parseFloat(deposits.toFixed(2)).toLocaleString('en'),
                withdrawals: parseFloat(withdrawals.toFixed(2)).toLocaleString('en'),
                interest: parseFloat(interest.toFixed(2)).toLocaleString('en'),
                balance: parseFloat(((deposits+interest+reinvestement) - withdrawals).toFixed(2)).toLocaleString('en')
              })
            
            }

          })
         
          return data
        },
    }

}
</script>