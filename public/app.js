var app = angular.module('app', [
    'infinite-scroll',
    'ui.bootstrap'
]);

app.controller('HomeCtrl', ['$scope', 'Photos',
	function ($scope, Photos) {

		$scope.photos = new Photos();
		$scope.rate = 0;
  		$scope.max = 5;
  		$scope.isReadonly = false;

  		//Check if blurb property is over flow( More than 32 words). 
		$scope.overFlow = function(blurb) {
			return (blurb.split(/\s+/).length < 32)? false : true; 
		};
		
		$scope.truncateBlurb = function(blurb) {
			return blurb.split(/\s+/).slice(0, 32).join(" ") + "...";
		};

	}
]);

app.factory('Photos', function ($http) {

	//Create Photos class to get next page and store data
	var Photos = function() {
	    this.items = [];
	    this.busy = false;
	    this.page = 0;
	    this.noMore = false;
  	};
	Photos.prototype.nextPage = function () {

		if (this.busy) return;

	    //This if statement is only for this exercise specially. 
	    //If used mysql database, I might use "WHERE id < $last_id" and "LIMIT 20" at backend. 
	    if(this.page <= 3){
    		this.busy = true;
	    	this.page += 1;
		    $http.get('/api/photos/' + this.page).success(function(data) {

				//Used Lo-dash to randomize data 
				data = _.shuffle(data); 
				this.items = this.items.concat(data);
				this.busy = false;
		    }.bind(this));
	    }else{
	    	this.noMore = true;
	    }

	};

	return Photos;
});

