# Vscode无法执行npm等脚本的问题

有的时候我们会发现通过vscode的命令行无法执行一些命令，比如`npm install`,`composer install`这些，这是因为powershell的问题。通过修改执行策略就可以使命令恢复正常。

这是因为在windows系统上面powershell的执行策略问题。

可以运行下面的命令查看当前执行策略

```powersheel
Get-ExecutionPolicy
```

使用下面的命令更改执行策略

```powersheel
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- `-scope`参数是 限制在当前用户下面更改 策略更改为`RemoteSigned`策略。

## 相关链接

* [Vscode无法执行npm等脚本的问题](https://juejin.cn/post/7146383505641963533)