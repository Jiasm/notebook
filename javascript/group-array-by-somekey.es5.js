var arr=[{"ClassName":"1班","Week":1,"OpenCount":300},{"ClassName":"1班","Week":2,"OpenCount":400},{"ClassName":"1班","Week":3,"OpenCount":300},{"ClassName":"1班","Week":4,"OpenCount":200},{"ClassName":"1班","Week":5,"OpenCount":600},{"ClassName":"1班","Week":6,"OpenCount":450},{"ClassName":"1班","Week":7,"OpenCount":450},{"ClassName":"2班","Week":1,"OpenCount":300},{"ClassName":"2班","Week":2,"OpenCount":400},{"ClassName":"2班","Week":3,"OpenCount":300},{"ClassName":"2班","Week":4,"OpenCount":200},{"ClassName":"2班","Week":5,"OpenCount":600},{"ClassName":"2班","Week":6,"OpenCount":450},{"ClassName":"2班","Week":7,"OpenCount":450}];


function group (data, key) {

	var temp = {};

	for (var len = data.length - 1; len >= 0; len--) {
	    var item = arr[len];

        var identity = item[key];

        if (!identity) continue;

        var itemInfo = temp[identity] = temp[identity] || {
        	name: identity,
        	data: []
        };

        itemList = itemInfo.data;

        itemList.push(item);
	}	

	var result = [];

    for (var k in temp) {
    	console.log(k);
    	result.push(temp[k]);
    }

    return result;
}

var data = group(arr, 'ClassName');

console.log(data);
