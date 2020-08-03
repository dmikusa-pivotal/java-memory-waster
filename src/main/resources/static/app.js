var alert = new Vue({
	el: '#alert',
	data: function() {
		return {
			message: "",
			type: "",
		};
	},
	computed: {
		show: function() {
			return this.message != "" && this.type != "";
		}
	},
	methods: {
		clear: function() {
			this.message = "";
			this.type = "";
		}
	}
});

function newButton(id, api) {
	return new Vue({
	  el: '#' + id,
	  data: function() {
	  	return {
		  result: "",
		  howMuch: 1000,
		  retain: false,
	  	};
	  },
	  methods: {
		  click: function(event) {
			  var params = {};
			  if (id != "gc") {
				  params["howMuch"] = this.howMuch;
				  params["retain"] = this.retain;
			  }
			  axios
	          	.post(api, null, {
	          		params: params,
	          	})
	          	.then(resp => {
	          		this.result = resp.data;
	          		alert.message = "Success";
	          		alert.type = "success";
	          	})
	          	.catch(err => {
	          		alert.message = err.response.data.error;
	          		alert.type = "danger"
	          	});
		  }
	  }
	});
}

var heapBtn = newButton("heap", "heap");
var metaBtn = newButton("metaspace", "metaspace");
var threadsBtn = newButton("threads", "threads");
var gcBtn = newButton("gc", "gc");
