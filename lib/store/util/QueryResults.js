define(["jquery"],function($){
	 
	var QueryResults=function(results){ 
		//summary:
		// 	将查询结果进行封装处理，依赖 jQuery.when 以及 jQuery.Deferred;
		//Description:
		//	将一个查询结果的数组集和进行简单的封装，
		if(!results) return results;
	 
	 
		function addIterativeMethod(method){
			if(!results[method]){
				results[method] = function(){
					var args = arguments;
					return $.when(results).then(function(results){
						//console.log(results)
						Array.prototype.unshift.call(args, results); 
						return QueryResults($[method].apply($, args));
					});
				} ;
			}
			
		}
		
		addIterativeMethod("grep");
		addIterativeMethod("each");
		addIterativeMethod("map");
		
		if(!results.total){
			results.total = $.when(results, function(results){
				return results.length;
			});
		}
		 
		return results;
	}
	return QueryResults
})	
