## CSS

### Navigator

1. [Flex入坑指南](#flex入坑指南)
2. [纯CSS实现的tabbar切换](#纯css实现的tabbar切换)
3. [纯CSS实现文本颜色与背景为反色](#纯css实现文本颜色与背景为反色)
4. [纯CSS实现的多层级菜单栏](#纯css实现的多层级菜单栏)

### Notes

#### Flex入坑指南

> [源码](./html/flex)  
> [Blog](https://blog.jiasm.org/2018/06/03/Flex入坑指南/)

`Flex`相关属性的基本用法，以及一些需要注意的小细节（`grow`的取值、`align-items`与`align-content`的区别）  

#### 纯CSS实现的tabbar切换

> （`:target`与`label + input`两种实现方式）  
> [源码](./dist/css/navigator-bar.scss)  
> [Live Demo](https://blog.jiasm.org/notebook/html/pure-css-tab-bar.html)

我们要实现一个纯CSS打造的tab切换，首先我们需要有这样一个结构的元素：
```html
<div class="nav-wrap">
  <div class="nav">
    Nav 1
  </div>
  <div class="nav">
    Nav 2
  </div>
</div>
<div class="container">
  <div class="content" data-index="1">
    Content 1
  </div>
  <div class="content" data-index="2">
    Content 2
  </div>
</div>
```
上边的元素是`tab`选项卡的按钮，下边的为选项卡对应的内容。  
以及对应的CSS样式大致如下：
```css
.nav-wrap {
  display: flex;
}

.nav {
  flex: 1 1 auto;
}

/* 默认隐藏所有的内容 */
.content {
  display: none;
}
```

##### label+input的实现方式

这里说的`input`是指`<input type="radio" />`，`radio`是单选框，所以比较符合我们的需求。  
所以我们要对上边的结构进行如下修改；
首先，是在`tab`选项卡按钮上添加`label`元素，以便可以在点击的时候选中对应的`input`。  
*P.S. 不直接在nav里边写input的原因是，nav通过CSS选择器的方式无法与下边的content产生联系*  

所以修改后的结构如下：  
```html
<input id="tab-1" type="radio" />
<input id="tab-2" type="radio" />
<div class="nav-wrap">
  <div class="nav" data-index="1">
    <label for="tab-1">Nav 1</label>
  </div>
  <div class="nav" data-index="2">
    <label for="tab-2">Nav 2</label>
  </div>
</div>
<div class="container">
  <div class="content" data-index="1">
    Content 1
  </div>
  <div class="content" data-index="2">
    Content 2
  </div>
</div>
```

然后我们就可以在CSS中这样写选择器了：
```css
#tab-1:checked ~ .nav-wrap .nav[data-index="1"] {
  background-color: gray;
  color: #fff;
}

#tab-1:checked ~ .container .content[data-index="1"] {
  display: block;
}
```

如果我们要实现第一个`tab`默认选中，仅需要将第一个`tab`对应的`input`设为`checked`即可`<input type="radio" checked />`  

##### :target的实现方式

`:target`是一个新的伪选择器，这个值代表了当前URL中的`hash`，也就是说，如果URL为`baidu.com/#name`  
则当前`:target`表示为`#name`，也就是我们熟悉的ID选择器了。  

所以，与上边的`label+input`版本的区别就在于，我们将`input`替换为一个空的携带ID的元素，或者直在对应的`content`元素上设置ID。  
*我们这里采用的是直接使用content元素+ID的方式，所以对结构进行如下修改*  

```html
<div class="container">
  <div class="content" id="tab-1">
    Content 1
  </div>
  <div class="content" id="tab-2">
    Content 2
  </div>
  <div class="nav-wrap">
    <div class="nav" data-index="1">
      <a href="#tab-1">Nav 1</a>
    </div>
    <div class="nav" data-index="2">
      <a href="#tab-2">Nav 2</a>
    </div>
  </div>
</div>
```

当我们点击


#### 纯CSS实现文本颜色与背景为反色

> [源码](./html/invert-background-color-2-text-color.html)  
> [Live Demo](https://blog.jiasm.org/notebook/html/invert-background-color-2-text-color.html)

#### 纯CSS实现的多层级菜单栏

> [源码](./html/deep-child-menu.html)  
> [Live Demo](https://blog.jiasm.org/notebook/html/deep-child-menu.html)

### Just Demos
