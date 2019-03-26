package main

import "fmt"

type Goods struct {
	name 	string
	price int
	size	int
}

const maxSize = 4

func main () {
	goods1 := []Goods{
		{
			name: "吉他",
			price: 1500,
			size: 1,
		},
		{
			name: "音响",
			price: 3000,
			size: 4,
		},
		{
			name: "笔记本电脑",
			price: 2000,
			size: 3,
		},
		{
			name: "苹果手机",
			price: 2000,
			size: 1,
		},
	}

	goods2 := []Goods{
		{
			name: "吉他",
			price: 1500,
			size: 1,
		},
		{
			name: "音响",
			price: 3000,
			size: 4,
		},
		{
			name: "笔记本电脑",
			price: 2000,
			size: 3,
		},
		{
			name: "苹果手机",
			price: 2000,
			size: 1,
		},
	}

	goods3 := []Goods{
		{
			name: "吉他",
			price: 1500,
			size: 1,
		},
		{
			name: "音响",
			price: 3000,
			size: 4,
		},
		{
			name: "笔记本电脑",
			price: 2000,
			size: 3,
		},
	}

	goods4 := []Goods{
		{
			name: "音响",
			price: 3000,
			size: 4,
		},
		{
			name: "吉他",
			price: 1500,
			size: 1,
		},
		{
			name: "笔记本电脑",
			price: 2000,
			size: 3,
		},
		{
			name: "苹果手机",
			price: 2000,
			size: 1,
		},
	}

	calc(goods1)
	calc(goods2)
	calc(goods3)
	calc(goods4)
}

func calc (goods []Goods) {
	packageStorage := make([][maxSize]int, len(goods))

	for rowIndex, good := range goods {
		currentSize := good.size - 1
		currentPrice := good.price
		for maxPackageSize := 0; maxPackageSize < maxSize; maxPackageSize++ {

			// 如果当前背包空间与物品需要的空间一致
			if maxPackageSize == currentSize {

				// 如果当前是第一行
				// 或者
				// 当前的价格比上一次计算的结果更有价值
				if rowIndex == 0 || packageStorage[rowIndex - 1][maxPackageSize] < currentPrice {
					packageStorage[rowIndex][maxPackageSize] = currentPrice
				} else {
					// 否则则说明上次计算价值更高，那么用上次的结果替换

					packageStorage[rowIndex][maxPackageSize] = packageStorage[rowIndex - 1][maxPackageSize]
				}
			} else if maxPackageSize > currentSize {
				// 如果当前背包空间大于物品实际空间
				
				// 如果当前是第一行，那么没有对比性 直接赋值
				if rowIndex == 0 {
					packageStorage[rowIndex][maxPackageSize] = currentPrice
				} else {
					previousPackageInfo := packageStorage[rowIndex - 1]

					// 当前背包最大容量 减去 当前已占用容量 - 1， 获取到上次剩余容量的最高价值
					previousMaxPrice := previousPackageInfo[maxPackageSize - currentSize - 1]

					// 如果当前背包空间物品价格 + 上次剩余容量的最高价值 加在一起
					// 高于
					// 上次计算出的 当前最大空间 所承受物品的 价格，将其替换为两者的和
					if previousMaxPrice + currentPrice > previousPackageInfo[maxPackageSize] {
						packageStorage[rowIndex][maxPackageSize] = previousMaxPrice + currentPrice
					} else if currentPrice < previousPackageInfo[maxPackageSize] {
						// 如果当前价格
						// 小于
						// 上次计算出的 当前最大空间所承受物品的价格，用上次的结果替换本次结果
						packageStorage[rowIndex][maxPackageSize] = previousPackageInfo[maxPackageSize]
					}
				}
			} else {
				// 如果当前背包空间不能够存放目标物品，使用上次的最高价值填充
				if rowIndex != 0 {
					packageStorage[rowIndex][maxPackageSize] = packageStorage[rowIndex - 1][maxPackageSize]
				}
			}
		}
	}

	lastRow := packageStorage[len(packageStorage) - 1]
	result := lastRow[len(lastRow) - 1]

	fmt.Println(result, packageStorage)
}