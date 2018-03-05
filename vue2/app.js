window.usersData = null;

Vue.component('reactive', {
	extends: VueChartJs.Bar,
	mixins: [VueChartJs.mixins.reactiveProp],
	data: function () {
		return {
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItems, data) {
							return '$' + tooltipItems.yLabel;
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
			}
		}
	},
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.chartData, this.options)
	}
})

new Vue({
	el: '#vue-app',
	data() {
		return {
			soldItems: null,
			usersPerformance: null,
			usersData: null,
	    	datacollection: null,
			info: "basic",
			text: "description",
			counter: 0,
			self: null,
			rightBaseNumber: 5,
			soldMax: 10,
			response: null,
    	}
	},
	created () {
		this.fillData()
	},
	methods: {
		fillData () {
	        this.datacollection = {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#a8cda7',
						data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
					}
	        	]
	    	}
		},
		getRandomInt () {
			return Math.floor(Math.random() * (35 - 5 + 1)) + 5
		},
		rightPartialList () {

		},
		rightFullList () {
			this.soldMax = this.soldItems.length;
		}
	},
	mounted () { // when the Vue app is booted up, this is run automatically.

		// SoldItems
		var self = this; // create a closure to access component in the callback below

		var dataURL = "https://jsonplaceholder.typicode.com/albums";
		$.getJSON(dataURL, function(data) {
			self.soldItems = data;
		});

		// User performance
		var dataURL = "https://jsonplaceholder.typicode.com/users";
		$.getJSON(dataURL, function(data) {
			self.usersPerformance = data;
		});

		// Users data
		var dataURL = "https://jsonplaceholder.typicode.com/photos";
		$.getJSON(dataURL, function(data) {
			self.usersData = data;
		});

	}
});


/*
var vm = new Vue({ 
	el: '.app',
	data () {
		return {
    	datacollection: null
    }
	},
	created () {
		this.fillData()
	},
	methods: {
		fillData () {
        this.datacollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#a8cda7',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
    getRandomInt () {
        return Math.floor(Math.random() * (35 - 5 + 1)) + 5
      }
	}
})
*/