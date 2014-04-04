var redis = require('redis'), 
	client = redis.createClient();

/*CONSTANTS*/
list_makes = "list_makes"
list_makes_by_year = "list_makes_by_year";
list_years_by_make = "list_years_by_make";
list_models_by_make = "list_models_by_make";

sorted_list_vehicle_per_price = "sorted_list_vehicle_per_price"
sorted_list_vehicle_per_hp = "sorted_list_vehicle_per_hp"
sorted_list_vehicle_per_weight="sorted_list_vehicle_per_weight"
sorted_list_vehicle_per_mpg="sorted_list_vehicle_per_mpg"
unsorted_list_vehicles_per_make="unsorted_list_vehicles_per_make"

/*Private Methods*/
listMakes = function(req,res){
	client.lrange(list_makes, 0, -1, function(err,result){
		json_obj = [];
		result.forEach(function(itm){
				json_obj.push({make:itm});
		});
		res.send(json_obj);
	});
}
/*Private Methods*/
listModelsByMake = function(req,res){
	make = req.param("make")
	client.lrange(list_models_by_make + ":" + make, 0, -1, function(err,result){
		json_obj = [];
		result.forEach(function(itm){
				json_obj.push({model:itm});
		});
		res.send(json_obj);
	});
}

getVehiclesPerMakeModel = function(req,res){
	make = req.params.make;
	model = req.params.model;
	client.keys(make + ":" + model + ":*",function(err,result){
		json_obj = [];
		result.forEach(function(itm){
				json_obj.push({item:itm});
		});
		res.send(json_obj);
	});
}
sortedListVehiclePerPrice = function(req,res){
	price = req.param("p")
	client.zrangebyscore(sorted_list_vehicle_per_price, 0,price,function(err,result){
		json_obj = [];
		result.forEach(function(itm){
				json_obj.push({item:itm});
		});
		res.send(json_obj);
	});
}

exports.listMakes = listMakes;
exports.listModelsByMake = listModelsByMake;
exports.getVehiclesPerMakeModel = getVehiclesPerMakeModel;
exports.sortedListVehiclePerPrice = sortedListVehiclePerPrice;
