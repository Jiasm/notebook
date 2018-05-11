(() => {
  let arr = [{'ClassName': '1班', 'Week': 1, 'OpenCount': 300}, {'ClassName': '1班', 'Week': 2, 'OpenCount': 400}, {'ClassName': '1班', 'Week': 3, 'OpenCount': 300}, {'ClassName': '1班', 'Week': 4, 'OpenCount': 200}, {'ClassName': '1班', 'Week': 5, 'OpenCount': 600}, {'ClassName': '1班', 'Week': 6, 'OpenCount': 450}, {'ClassName': '1班', 'Week': 7, 'OpenCount': 450}, {'ClassName': '2班', 'Week': 1, 'OpenCount': 300}, {'ClassName': '2班', 'Week': 2, 'OpenCount': 400}, {'ClassName': '2班', 'Week': 3, 'OpenCount': 300}, {'ClassName': '2班', 'Week': 4, 'OpenCount': 200}, {'ClassName': '2班', 'Week': 5, 'OpenCount': 600}, {'ClassName': '2班', 'Week': 6, 'OpenCount': 450}, {'ClassName': '2班', 'Week': 7, 'OpenCount': 450}]

  function group (data, key) {
	  let result = arr.reduce((obj, cursor) => {
	    let identity = cursor[key]
	    let list = (obj[identity] || (obj[identity] = {
	      name: identity,
	      data: []
	    })).data

	    list.push(cursor)

	    return obj
	  }, {})

	  return Object.values(result)
  }

  let data = group(arr, 'ClassName')

  console.log(data)
})()
