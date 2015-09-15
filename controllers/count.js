/*//count of all users - failed attempt

	User.count({}, setCount);

	var setCount = function(err, c) {
		if(err) {
			console.log("the error is: " + err);
			return;
		}
		console.log("the count is: " + c);
		count = c;
	};

	console.log("and the variable count has: " + count);
	//trying to get count without calling the getcount
	function getCount() {
		return count;
	}

	var counter = getCount();

	console.log("but the variable counter has: " + counter);*/