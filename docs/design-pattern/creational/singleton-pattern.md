# 单例模式

单例模式大概是所有设计模式中最简单的一种，如果在面试时被问及熟悉哪些设计模式，你可能第一个答的就是单例模式。

单例模式的实现分为两种：**饿汉式**和**懒汉式**。前者是在静态构造函数执行时就立即实例化，后者是在程序执行过程中第一次需要时再实例化。两者有各自适用的场景，实现方式也都很简单，唯一在设计时要考虑的一个问题就是：**实例化时需要保证线程安全**。

## 饿汉式

饿汉式实现很简单，在静态构造函数中立即进行实例化：

```csharp
public class Singleton
{
    private static readonly Singleton _instance;
    static Singleton()
    {
        _instance = new Singleton();
    }

    public static Singleton Instance
    {
        get
        {
            return _instance;
        }
    }
}
```

:::warning 注意
为了确保单例性，需要使用`readonly`关键字声明实例不能被修改。
:::

以上写法可简写为：

```csharp
public class Singleton
{
    private static readonly Singleton _instance = new Singleton();
    public static Singleton Instance
    {
        get
        {
            return _instance;
        }
    }
}
```

这里的 new Singleton() 等同于在静态构造函数中实例化。在 C# 7 中还可以进一步简写如下：

```csharp
public class Singleton
{
    public static Singleton Instance { get; } = new Singleton();
}
```

一句代码就搞定了，此写法，实例化也是在默认的静态构造函数中进行的。如果是饿汉式需求，这种实现是最简单的。有人会问这会不会有线程安全问题，如果多个线程同时调用 Singleton.Instance 会不会实例化了多个实例。不会，因为**CLR 确保了所有静态构造函数都是线程安全的**。

注意，不能这么写：

```csharp
public class Singleton
{
    public static Singleton Instance => new Singleton();
}

// 等同于：
public class Singleton
{
    public static Singleton Instance
    {
        get { return new Singleton(); }
    }
}
```

这样会导致每次调用都会创建一个新实例。

## 懒汉式

> 懒汉式单例实现需要考虑线程安全问题

先来看一段经典的线程安全的单列模式实现代码：

```csharp
public sealed class Singleton
{
    private static volatile Singleton _instance;
    private static readonly object _lockObject = new Object();

    public static Singleton Instance
    {
        get
        {
            if (_instance == null)
            {
                lock (_lockObject)
                {
                    if (_instance == null)
                    {
                        _instance = new Singleton();
                    }
                }
            }
            return _instance;
        }
    }
}
```

网上搜索 C# 单例模式，大部分都是这种使用 lock 来确保线程安全的写法，这是经典标准的单例模式的写法，没问题，很放心。在 lock 里外都做一次 instance 空判断，双保险，足以保证线程安全和单例性。但这种写法似乎太麻烦了，而且容易写错。早在 C# 3.5 的时候，就有了更好的写法，使用`Lazy<T>`。

```csharp
public class LazySingleton
{
    private static readonly Lazy<LazySingleton> _instance =
        new Lazy<LazySingleton>(() => new LazySingleton());

    public static LazySingleton Instance
    {
        get { return _instance.Value; }
    }
}
```

调用示例：

```csharp
public class Program
{
    public static void Main()
    {
        var instance = LazySingleton.Instance;
    }
}
```

使用`Lazy<T>`可以使对象的实例化延迟到第一次被调用的时候执行，通过访问它的 Value 属性来创建并获取实例，并且读取一个`Lazy<T>`实例的 Value 属性只会执行一次实例化代码，确保了线程安全。

## 相关链接

* [[C#.NET 拾遗补漏]06：单例模式最佳实践](https://zhuanlan.zhihu.com/p/261295170)
