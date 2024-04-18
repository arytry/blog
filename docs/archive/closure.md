# 闭包

之前一直对闭包这个概念模模糊糊的，网上也是长篇大论，现在通过自己了解和学习，总结了一下一些闭包知识点，写得不对的地方可以指出，大家互相学习.

先了解一些变量的作用域：

变量的作用域包括两种：全局变量和局部变量。

全局变量：

```js
var n = 999;//全局变量
function f1(){
  console.log(n);
}
f1();//999
```

局部变量：

```js
function f1(){
  var n = 999;//局部变量
}
console.log(n);//n is not defined
```

## 简单理解闭包

先看一下MDN关于闭包的定义：

> 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

重点的一句：**闭包让你可以在一个内层函数中访问到其外层函数的作用域。**

现在不理解也没关系，继续往下看：

学习一个概念时，最好的方法就是找它的demo，从demo中理解和分析，下面先看一段代码，这是一个最简单的闭包：

```js
function f1(){
  var n = 999;
  
  function f2(){
    console.log(n);
  }
  
  return f2//返回内部函数f2，这样在f1中就能读取f2的数据和函数等价于window.f2 = f2;
  
}

var result = f1();
result();//999
```

* 首先定义个普通函数f1；
* 在f1中再定义一个普通函数f2、和在f1函数中的内部变量n;
* 在f1中返回函数f2(确切说，在f1中返回了f2的引用);
* 将f1的返回值赋值给变量result；
* 执行result

在上边的代码中，f1函数里面嵌套了一个函数f2，并且f2调用了f1的变量，那么变量n和函数f2组合就成了一个闭包。

那为什么是闭包呢？我们可以根据上边MDN对闭包的定义这句话（闭包让你可以在一个内层函数中访问到其外层函数的作用域。）进行分析，我们再看一张图：

![闭包]([/assets/img/algorithms/linked-node-reverse-1.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09e69a7ec327436d8aedf7b92828e961~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) "闭包")

f1是一个外部函数，变量n是外部函数的局部变量，f2是嵌套在f1中的一个内部函数，在**内部函数f2中调用了外部函数f1的变量n**,所以f2和变量n就组成了一个闭包。

那么，我们就可以得出产生闭包的条件：

* 一个外部函数里面嵌套着一个内部函数；比如外部函数f1里面嵌套了一个内部函数f2
* 一个嵌套的内部函数调用了外部函数的内部变量或函数；比如f2内部函数调用了外部函数f1的变量n 只要满足以上两个条件，就产生了闭包。

那你可能会问为什么要return f1呢？

因为在JS中，只要内部函数才能够读取外部函数的内部变量或数据，反之则不行，如果你不return f2，那你将无法使用f2这个闭包，return f2是为了在f1中能使用f2的变量和数据，与闭包没有关系的。
那到底什么是闭包呢？

可以通俗理解成：**闭包就是有权访问另一个函数作用域中内部变量或数据的函数**，因为在JS中，只要内部函数能能够读取外部函数的变量或数据，反之就不行，所有可以将**闭包简单理解成，定义在一个函数内部的函数。**

总结：

**闭包就是有权访问另一个函数内部变量的函数。**

**闭包产生的原因：内部函数存在对外部函数局部变量的引用就会导致闭包。**

到这里相信你也已经对闭包有了一个简单的了解了，但是单单是了解还是不够的，我们学学习一样技术，最重要的就是要学以致用，那我们继续往下了解吧。

## 闭包的经典使用场景

1. return一个内部函数，读取内部函数的变量

   最大的一个用途就是前面提到的可以：读取内部函数的变量；

   ```js
   function f1(){
    var n = 999;
    function f2(){
        console.log(n);
    }
    return f2；
    }

    var result = f1();
    result();//999
   ```

2. 函数作为参数

   ```js
   var n = 999;

    function f1(){
    var n = 1000;
    function f2(){
        console.log(n);
    }
    return f2
    }

    function f3(p){
    var n = 1001;
    p();
    }

    f3(f1());//1000
   ```

3. IIFE（自执行函数）

   ```js
   var n = 999;
    (function f1(){
    console.log(n);
    })()
    //999
   ```

   上边的代码中f1( )是一个闭包，调用了全局变量n（即调用了window下的变量n）;

4. 循环赋值

   ```js
   for(var i = 0; i<10; i++){
    (function(j){
        setTimeout(function(){
        console.log(j);
        },1000)
    })(i)
    }
    //0,1,2,3,4,5,6,7,8,9依次打印
   ```

5. 使用回调函数就是在使用闭包

   ```js
   window.n = 999;
    setTimeout(function f1(){
    console.log(window.n);
    },1000)
   ```

6. 将外部函数创建的变量值始终保持在内存中

   ```js
   function f1(){
    var n = 999;
    function f2(){
        console.log(n++);
    }
    return f2
    }
    var result = f1();
    result();//999
   ```

   上边代码中f1的内部变量n一直存在内存中，不会在f1调用结束后被自动清除。 再看另一段代码：

   ```js
   function f1(){
    var n = 999;
    nAdd = function(){
        n+=1;
    }
    function f2(){
        console.log(n);
    }
    return f2
    }

    var result = f1();
    result();//999
    nAdd();
    result();//1000
   ```

   上边代码中函数f1的返回值赋值给了全局变量result，函数f1的返回值实际上就是f2函数，可以理解为f2被赋值给了全局变量result，这就导致了f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束之后，被垃圾回收机制(GC机制)回收，所有很容易造成**内存泄漏**。

   内存泄漏，就是一些你访问不到或用不到的变量，还占据着内存空间，不能被再次利用起来。

7. 封装对象的私有对象和私有方法

   ```js
   var Counter = (function(){
    var privateCounter = 0;
    return function changeBy(val){
        privateCounter += val;
    }
    return {
        increment:function(){
        changeBy(1);
        },
        decrement:function(){
        changeBy(-1);
        },
        value:function(){
        return privateCounter;
        }
    }
    })();

    console.log(Counter.value());//0
    Counter.increment();
    Counter.increment();
    console.log(Counter.value());//2
    Counter.decrement();
    console.log(Counter.value());//1
   ```

## 使用闭包需要注意什么？

因为使用闭包会包含其他函数的作用域，会比其他函数占据更多的内存空间，不会在调用结束之后被垃圾回收机制（简称GC机制）回收，多度使用闭包会过度占用内存，造成内存泄漏。

## 闭包相关的面试题

详情参见[相关链接](#相关链接)

## 相关链接

* [如何简单理解闭包（Closure）](https://juejin.cn/post/6977648266695409672 '如何简单理解闭包（Closure）')
