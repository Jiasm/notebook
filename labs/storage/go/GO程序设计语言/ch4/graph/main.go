package main

var graph = make(map[string]map[string]bool)

func addEdge(from, to string) {
	edges := graph[from] // 其实后边还有一个可选的 OK 参数，但是本示例中不是一个基本类型的map，所以判断map就变得没有必要了

	if edges == nil {
		edges = make(map[string]bool)
		graph[from] = edges
	}

	edges[to] = true
}

func hasEdge(from, to string) bool {
	return graph[from][to]
}

func main() {
  addEdge("niko", "bellic")
	addEdge("niko", "roman")
	
	println(hasEdge("niko", "bellic"))
	println(hasEdge("niko", "unknown"))
	println(hasEdge("unknown", "unknown"))
}