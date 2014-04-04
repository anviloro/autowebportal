var redis = require('redis'), 
	client = redis.createClient();
/*CONSTANTS*/
list_makes_by_year = "list_makes_by_year";
list_years_by_make = "list_years_by_make";
list_models_by_make = "list_models_by_make";

	client.zrangebyscore('sorted_list_vehicle_per_price', 0,230000,function(err,res){
		console.log(res);
	});
