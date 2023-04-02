# 深度算法

::: tip 说明
`深度`是从上往下数，也就是从根节点开始往下

`高度`是从下往上数，就是从某节点往下的最深叶子节点开始往上
:::

从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。例如下图中的二叉树的深度为4，因为它从根结点到叶结点最长的路径包含4个结点（从根结点1开始，经过结点2和结点5，最终到达叶结点7）。

![二叉树](/assets/img/binarytree.jpg "二叉树")

定义一个二叉树

```csharp
public class BinaryTreeNode
{
    public BinaryTreeNode Left { get; set; }

    public BinaryTreeNode Right { get; set; }
}
```

## 解题思路

1. 如果一棵树只有一个结点，它的深度为1。
2. 如果根结点只有左子树而没有右子树，那么树的深度应该是其左子树的深度加1；同样如果根结点只有右子树而没有左子树，那么树的深度应该是其右子树的深度加1。
3. 如果既有右子树又有左子树，那该树的深度就是其左、右子树深度的较大值再加1。

比如在上图的二叉树中，根结点为1的树有左右两个子树，其左右子树的根结点分别为结点2和3。根结点为2的左子树的深度为3，而根结点为3的右子树的深度为2，因此根结点为1的树的深度就是4。

## 代码实现

### 递归

使用递归，很容易写出该求解算法，思路也简单，就是左子树和右子树高度，取两者最大，然后在此基础上加1即可

```csharp
public int Depth(BinaryTreeNode root)
{
    return node == null ?
        0 :
        Math.Max(Depth(node.Left), Depth(node.Right)) + 1;
}
```

然而，递归使用不当，会有风险，毕竟递归栈的深度非常有限，假如一棵接近线性化的二叉树，也就是严重一侧倾斜，退化成接近一个单链表，当二叉树的深度高达数千甚至上万的时候，使用递归，那是一定会栈溢出的！因此，在栈深度较深乃至于不可控时，我们需要另想办法，取代递归。

### 非递归

要想实现非递归，那么就不应该考虑左右子树，而是子层级只要有树就加1，然后再循环往下一层级继续判断

```csharp
static int Depth(BinaryTreeNode node)
{
    if(node == null)
        return 0;

    // 初始化队列
    var queue = new Queue<BinaryTreeNode>();
    queue.Enqueue(node);

    var len = 0;
    while (queue.Any())
    {
        len++;

        // 降序解决循环内入队的冲突问题
        for (int i = queue.Count - 1; i >= 0; i--)
        {
            var child = queue.Dequeue();
            if (child.Left != null)
                queue.Enqueue(child.Left);
            if (child.Right != null)
                queue.Enqueue(child.Right);
        }
    }
    return len;
}
```

::: tip 总结
队列（Queue）代表了一个先进先出的对象集合。循环降序方式，解决了循环内入队冲突的问题
:::
