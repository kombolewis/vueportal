<template lang="pug">
	.container
		.row.mb-2.mt-4
			.col-md-6
				| Financial Calculator
		hr
		br 
		.row.mt-1
			.offset-md-2.col-md-9
				form(action="#" @submit.prevent="registerAcc")
					div
						.form-group
							div.pr-2.mb-2 Select calculation method:
							.form-group.form-check.form-check-inline
								input.form-check-input(type='radio' name='calculators' value='tcs' v-model="calculatorTypes"  )
								label.form-check-label(for='tcs')
									| Target Savings Calculator
							.form-group.form-check.form-check-inline
								input.form-check-input(type='radio' name='calculators' value='fsc'  v-model="calculatorTypes"  )
								label.form-check-label(for='fcs')
									| Future Savings Calculator 
							.form-group.form-check.form-check-inline
								input.form-check-input(type='radio' name='calculators' value='stc'  v-model="calculatorTypes"  )
								label.form-check-label(for='stc')
									| Savings Time Calculator 
							.form-group.form-check.form-check-inline
								input.form-check-input(type='radio' name='calculators' value='sic'  v-model="calculatorTypes"  )
								label.form-check-label(for='sic')
									| Savings Income Calculator 					
					//- individual form
					div(v-if="calculatorTypes")
						div(v-if="calculatorTypes == 'tcs'")
							.form-group
								p Calculate how much you need to reach your target.
							.form-group
								label(for="name") What's your target savings?
								span.text-danger *
								input.form-control(type="number" min="0" v-model="amount" @input="calculateTS" required style="width:60%")
							.form-group
								label(for="name") How long do you want to save?
								span.text-danger *
								div
								input(type="range" min="0" max="50" step="1" v-model="time" @change="calculateTS") 
								span.pl-3(v-text="time")

							.form-group
								p Save this amount monthly to reach your target
								
								b(v-text="parseFloat(parseFloat(monthly).toFixed(2)).toLocaleString('en')" style="font-size:larger") 
							.form-group
								p Save this lump-sum amount today to reach your target
								b(v-text="parseFloat(parseFloat(lumpsum).toFixed(2)).toLocaleString('en')" style="font-size:larger") 
							.form-group
								b Note:
								div This estimate assumes the average interest rate of 9%.
						div(v-if="calculatorTypes == 'fsc'")
							.form-group
								p Calculate the future value of your savings.
							.form-group
								label(for="name") Initial Deposit
								span.text-danger *
								input.form-control(type="number" min="0" v-model="amount" @input="calculateFS" required style="width:60%")
							.form-group
								label(for="name") How much do you want to save monthly?
								span.text-danger *
								input.form-control(type="number" min="0" v-model="montlyAmountFS" @input="calculateFS" required style="width:60%")
							.form-group
								label(for="name") How long do you want to save?
								span.text-danger *
								div
								input(type="range" min="0" max="50" step="1" v-model="time" @change="calculateFS") 
								span.pl-3(v-text="time")

							.form-group
								p You will have saved
								
								b(v-text="parseFloat(parseFloat(fcsAmount).toFixed(2)).toLocaleString('en')" style="font-size:larger") 
							.form-group
								b Note:
								div This estimate assumes the average interest rate of 9%.
						div(v-if="calculatorTypes == 'stc'")
							.form-group
								p Calculate how long it will take to reach your target.
							.form-group
								label(for="name") What's your target amount?
								span.text-danger *
								input.form-control(type="number" min="0" v-model="amount" @input="calculateTT" required style="width:60%")
							.form-group
								label(for="name") Monthly Deposits
								input.form-control(type="number" min="0" v-model="montlyAmountTT" @input="calculateTT" required style="width:60%")
							
							.form-group
								label(for="name") Interest Rate
								input.form-control(type="number" min="0" v-model="interestRate" @input="calculateTT" required style="width:60%")

							.form-group
								p Months to reach your target
								
								b(v-text="TTMonths ? Math.round(TTMonths): ''" style="font-size:larger") 

							.form-group
								p Years to reach your target
								
								b(v-text="TTYears ? Math.round(TTYears): ''") style="font-size:larger") 
						div(v-if="calculatorTypes == 'sic'")
							.form-group
								p Calculate how much your savings can generate as monthly income.
							.form-group
								label(for="name") Savings?
								span.text-danger *
								input.form-control(type="number" min="0" v-model="amount" @input="calculateIS" required style="width:60%")

							.form-group
								b.pr-3 Total:
								
								b(v-text="parseFloat(parseFloat(monthlyReturn).toFixed(2)).toLocaleString('en')" style="font-size:larger") 

							.form-group
								b Note:
								div This estimate assumes the average interest rate of 9%.
				
				

				
</template>

<script>


export default {
	name:'Calculator',
	data : () => ({
		calculatorTypes:'',
		amount:0,
		time:5,
		monthly:0.00,
		lumpsum:0.00,
		rate:9,
		montlyAmountFS:0,
		fcsAmount:0,
		interestRate:0,
		TTMonths:0,
		TTYears :0,
		montlyAmountTT:0,
		monthlyReturn:0,
	}),
	methods:{
		calculateTS(){
			let T = this.amount
			this.monthly = T/((Math.pow((1+((this.rate/12)/100)), (this.time*12))-1)/ ((this.rate/12)/100))
			this.lumpsum = T/(Math.pow((1+(this.rate/100)),this.time))

		},
		calculateFS(){
			let D = this.amount
			let Y = this.time
			let R = this.rate
			let X = this.montlyAmountFS
			
			this.fcsAmount = (((Math.pow((1+((R/12)/100)), (Y*12))-1)/ ((R/12)/100))*X)+((Math.pow((1+(R/100)),Y))*D)

		},
		calculateTT(){
			let T =  this.amount
			let M = this.montlyAmountTT
			let R = this.interestRate
			
			this.TTMonths = (Math.log10((((R/12)/100)*(T/M)+1))/(Math.log10(1+((R/12)/100)))) 
			this.TTYears = this.TTMonths /12

		},
		calculateIS(){
			let S = this.amount
			let R = this.rate
			this.monthlyReturn = S*(R/100)*(30/364)
		}
	}
	

 }
</script>

<style scoped>

</style>