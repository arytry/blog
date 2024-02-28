# 策略模式

> 个人理解，策略模式并不能解决if-else问题，而只是为了遵循设计原则做出的一种设计，不要被网上很多讲解的教程给误导了

## 策略接口

```csharp
/// <summary>
/// 优惠券
/// </summary>
public abstract class Coupon
{
    public abstract decimal SettleAccount(decimal amount);
}
```

## 策略实现

### 折扣策略

```csharp
/// <summary>
/// 折扣券
/// </summary>
public class DiscountCoupon : Coupon
{
    public override decimal SettleAccount(decimal amount)
    {
        return amount * 0.8m;
    }
}
```

### 满减策略

```csharp
/// <summary>
/// 满减券
/// </summary>
public class FullReductionCoupon : Coupon
{
    public override decimal SettleAccount(decimal amount)
    {
        if (amount >= 300)
            amount -= 100;

        return amount;
    }
}
```

## 策略上下文

```csharp
/// <summary>
/// 优惠券策略上下文
/// </summary>
public class CouponContext
{
    private readonly Coupon _coupon;

    public CouponContext(Coupon coupon)
    {
        this._coupon = coupon;
    }

    public decimal GetAmount(decimal amount)
    {
        return this._coupon.SettleAccount(amount);
    }
}
```

## 策略调用

```csharp
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine($"策略模式优惠券计算方式");
        var context = new CouponContext(new FullReductionCoupon());
        var payableAmount = 300;
        var actuallyPayAmount = context.GetAmount(payableAmount);
        Console.WriteLine($"应付金额为：{payableAmount}，使用满减券实际支付金额为：{actuallyPayAmount}");

        context = new CouponContext(new DiscountCoupon());
        actuallyPayAmount = context.GetAmount(payableAmount);
        Console.WriteLine($"应付金额为：{payableAmount}，使用折扣券实际支付金额为：{actuallyPayAmount}");
    }
}
```
