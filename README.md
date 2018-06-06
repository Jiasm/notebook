# :notebook: notebook

> 前端、Node相关笔记，部分奇葩面试题

## JavaScript

id|title|description
:-:|:-|:-
1|[css-validator](./javascript/css-validator.js)|检查传入函数的CSS key 或者 value是否有效
2|[currying](./javascript/currying.js)|一个较为通用的柯里化函数的实现
3|[deep-copy](./javascript/deep-copy.js)|简易的深度拷贝实现
4|[color-changer](./javascript/color-changer.js)|hex与rgb的互转
3|[base64-to-blob](./javascript/base64-2-blob.js)|将base64串转换为blob传入到formdata中
6|[buddha-like-sort](./javascript/buddha-like-sort.js)|佛系排序
5|[callback-promise](./javascript/callback-promise.js)|一个同时支持promise和callback的函数生成器
8|[callback-promise-2](./javascript/callback-promise-2.js)|同上
9|[compose-promise-with-next](./javascript/compose-promise-with-next.js)|将左侧函数返回值传入右侧函数，并支持`next`提前调用(简易版koa中间件实现)
10|[dataset](./javascript/dataset.js)|dataset的polyfill版本，使用正则实现
11|[sort](./javascript/sort.js)|将一个Object数组按照某些可配置的规则进行排序
12|[group-by-some-key](./javascript/translate-tree-data.js)|将一个一维的数组按照某些分组key转换为树形结构
13|[data-cache](./javascript/data-cache.js)|一个简单的实现数据缓存的函数，可设定缓存时间，数据来源
14|[char-code-list](./javascript/char-code-list.js)|将字符串全部转换为char-code，无须指定下标。
15|[array-sync](./array-sync)|部分`array`方法的`async`版本实现：[every](./array-sync/every.js)、[some](./array-sync/some.js)、[forEach](./array-sync/for-each.js)、[filter](./array-sync/filter.js)

## CSS

id|title|description
:-:|:-|:-
1|[一个简单的多段式动画](./html/animation.html)|[Live Demo ](https://blog.jiasm.org/notebook/html/animation.html)
2|[纯CSS实现的多层级菜单栏](./html/deep-child-menu.html)|[Live Demo ](https://blog.jiasm.org/notebook/html/deep-child-menu.html)
3|[纯CSS实现文本颜色与背景为反色](./html/invert-background-color-2-text-color.html)|[Live Demo ](https://blog.jiasm.org/notebook/html/invert-background-color-2-text-color.html)
4|[纯CSS实现的tabbar切换（`:target`与`label + input`两种实现方式）](./html/pure-css-tab-bar.html)|[Live Demo ](https://blog.jiasm.org/notebook/html/pure-css-tab-bar.html)
5|[Flex入坑指南](./html/flex)|[Blog](https://blog.jiasm.org/2018/06/03/Flex入坑指南/)

## HTML

id|title|description
:-:|:-|:-
1|[简易的橡皮擦实现](./html/eraser.html)|[Live Demo:](https://blog.jiasm.org/notebook/html/eraser.html) *(也可以认为是刮刮乐)* 一个简单的橡皮擦实现效果，使用`canvas`

## 冷知识

id|title|description
:-:|:-|:-
1|[ES6默认参数与ES5版的polyfill默认参数在处理时的区别](./docs/default-arguments.md)|ES6默认参数只会命中`undefined`，而之前的ES5版本会命中所有可以转换为`false`的参数

## 一些有趣的题目

id|title|description
:-:|:-|:-
1|[树形结构获取某个节点所有父节点元素](./javascript/find-parents.js)|
2|[获取距离当前数字最近的某个频率值](./javascript/get-range.js)|
3|[根据某几个数字生成某个长度的所有不重复数字组合(格雷码)](./javascript/gray-code.js)
4|[获取某种规律的数字](./javascript/get-num-by-somerule1.js)|实现一个函数`getNum`，按如下规则输出第`count`个数结果，输入： `3` 输出： `13`<br/>备注： 已知数列规则为`[1, 3, 7, 13, 21, 31, 43 ...]`<br/> 计数从0开始
5|[根据传入数字重排后组成一个最大数字](./javascript/max-five-digits.js)
6|[获取固定数量数字相加的值](./javascript/min-max-sum.js)|获取几个数字相加所得的最小/最大结果
7|[重组数字后获取一个更大的数字](./javascript/nextbigger.js)|获取由传入参数重组后的一个更大的数字，要保证重组后的数字仅大于原数字,如`123`会生成`132`，而不会生成`321`，如果没有可重组的更大的数字，则返回`-1`
8|[乘法口诀](./javascript/cfkj.js)|打印输出99乘法口诀表
9|[移动0元素](./javascript/move-zero.js)|将一个数组内所有 0 元素移动到数组的末尾，并保证其他元素的相对次序保持不变，且 0 元素的排列顺序也与出现顺序一致。<br/>例如有如下数组<br/>[3, 0, 4, 6, "0", 0, 13, "0", 78, 0, 14]<br/>应输出<br/>[3, 4, 6, 13, 78, 14, 0, "0", 0, "0", 0]<br/>限制：<br/>不能使用任何数组或对象作为临时变量<br/>不能使用任何 Array.prototype 和 Object.prototype 上的方法<br/>[题目来源&小伙伴们的实现](https://github.com/renrenche-fe/everything-about-front-end/issues/17)
