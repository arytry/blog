# GRPC

gRPC 服务可以有不同类型的方法。 服务发送和接收消息的方式取决于所定义的方法的类型。 gRPC 方法类型如下：

* 一元
* 服务器流式处理
* 客户端流式处理
* 双向流式处理

流式处理调用是使用`stream`关键字在`.proto`文件中指定的。`stream`可以放置在调用的请求消息和/或响应消息中。

```protobuf
syntax = "proto3";

service ExampleService {
  // Unary
  rpc UnaryCall (ExampleRequest) returns (ExampleResponse);

  // Server streaming
  rpc StreamingFromServer (ExampleRequest) returns (stream ExampleResponse);

  // Client streaming
  rpc StreamingFromClient (stream ExampleRequest) returns (ExampleResponse);

  // Bi-directional streaming
  rpc StreamingBothWays (stream ExampleRequest) returns (stream ExampleResponse);
}
```

## Protobuf

### Protobuf消息

消息是 Protobuf 中的主要数据传输对象。 它们在概念上类似于 .NET 类。

```protobuf
syntax = "proto3";

option csharp_namespace = "Contoso.Messages";

message Person {
    int32 id = 1;
    string first_name = 2;
    string last_name = 3;
}  
```

前面的消息定义将三个字段指定为名称/值对。 与 .NET 类型上的属性类似，每个字段都有名称和类型。 字段类型可以是[Protobuf标量值类型](#标量值类型)（如 int32），也可以是其他消息。

[Protobuf 样式指南](https://developers.google.com/protocol-buffers/docs/style)建议使用`underscore_separated_names`作为字段名称。为.NET应用创建的新Protobuf消息应遵循Protobuf样式准则。.NET工具会自动生成使用.NET命名标准的.NET类型。例如，`first_name`Protobuf字段生成`FirstName`.NET属性。

包括名称，消息定义中的每个字段都有一个唯一的编号。 消息序列化为 Protobuf 时，字段编号用于标识字段。 序列化一个小编号比序列化整个字段名称要快。 因为字段编号标识字段，所以在更改编号时务必小心。

### 标量值类型

Protobuf 支持一系列本机标量值类型。 下表列出了全部本机标量值类型及其等效 C# 类型：

|Protobuf 类型|C# 类型|
|---|---|
|double|double|
|float|float|
|int32|int|
|int64|long|
|uint32|uint|
|uint64|ulong|
|sint32|int|
|sint64|long|
|fixed32|uint|
|fixed64|ulong|
|sfixed32|int|
|sfixed64|long|
|bool|bool|
|string|string|
|bytes|ByteString|

标量值始终具有默认值，并且该默认值不能设置为 `null`。 此约束包括 `string` 和 `ByteString`，它们都属于 C# 类。 `string` 默认为空字符串值，`ByteString` 默认为空字节值。 尝试将它们设置为 `null` 会引发错误。

[可为 null 的包装器类型](https://learn.microsoft.com/zh-cn/aspnet/core/grpc/protobuf?view=aspnetcore-7.0#nullable-types)可用于支持 null 值。

---

更多信息请参考[相关链接](#相关链接)

## 相关链接

* [为 .NET 应用创建 Protobuf 消息](https://learn.microsoft.com/zh-cn/aspnet/core/grpc/protobuf)
