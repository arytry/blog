# 激活Windows 11

Windows 系统版本之间是可以互相切换的

比如当前安装的 Windows 系统是专业版，但是支持企业版或其它版本，那么输入企业版的密钥系统是可以升级为企业版的

## 版本升级检查

现在我们要检查你的版本是否支持升级到对应版本，运行以下命令来检查

```sh
DISM /online /Get-TargetEdition
```

在列表中显示的版本，代表你的 Windows 版本都可以免费升级

## 使用免费的 KMS 客户端密钥激活 Windows11

::: tip 以管理员身份运行命令提示应用程序
点击开始按钮，搜索`cmd`，然后以管理员权限运行它

或者按下`win key + R`，输入`cmd`命令，然后按`ctrl + shift + enter`，你会得到一个消息，只需点击是

现在您将得到一个命令提示符。
:::

如果是初次激活请直接往下查看激活方式，如果已经激活过系统可以先来看几条命令

首先以管理员身份打开命令提示符

输入以下命令：`slmgr.vbs /upk`，它将给出一条消息，单击 OK

现在输入这个命令：`slmgr.vbs /cpky`，它将再次给出一条消息，然后再次单击 OK

现在输入以下命令：`slmgr.vbs/ckms`，当您收到消息时，再次单击 OK

### 手动激活

1. 以管理员身份运行命令提示应用程序

2. 安装 KMS 客户端密钥

使用命令`slmgr /ipk kmsclientkey`安装许可证密钥(kmsclientkey 是与 Windows 版本对应的激活密钥)。

```sh
slmgr /ipk NW6C2-QMPVW-D7KKK-3GKT6-VCFB2
```

下面是 Windows11 许可证密钥的列表：

* **Home**: TX9XD-98N7V-6WMQ6-BX7FG-H8Q99
* **Home N**: 3KHY7-WNT83-DGQKR-F7HPR-844BM
* **Home Single Language**: 7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH
* **Home Country Specific**: PVMJN-6DFY6-9CCP6-7BKTT-D3WVR
* **Pro**: W269N-WFGWX-YVC9B-4J6C9-T83GX
* **Pro N**: MH37W-N47XK-V7XM9-C7227-GCQG9
* **Education**: NW6C2-QMPVW-D7KKK-3GKT6-VCFB2
* **Education N**: 2WH4N-8QGBV-H22JP-CT43Q-MDWWJ
* **Enterprise**: NPPR9-FWDCX-D2C8J-H872K-2YT43
* **Enterprise N**: DPH2V-TTNVB-4X9Q3-TJR4H-KHJW4

请根据自己系统升级版本选择对应许可证密钥

3. 设置 KMS 服务器

使用命令`slmgr /skms kms8.msguides.com`连接到我的 KMS 服务器。

```sh
slmgr /skms kms8.msguides.com
```

4. 激活你的 Windows

最后一步是使用命令`slmgr /ato`激活 Windows。

```sh
slmgr /ato
```

如果您看到错误`0x80070005`，这意味着服务器正忙。请再次尝试`ato`命令，直到成功为止。

### 使用批处理文件

::: warning 注意
由于[微软的最新更新](https://msguides.com/detected-hacktool)，我们不再推荐这个方式。
:::

将下面的代码复制到一个新的文本文档中

```sh
@echo off
title Activate Windows 11 (ALL versions) for FREE - MSGuides.com&cls&echo =====================================================================================&echo #Project: Activating Microsoft software products for FREE without additional software&echo =====================================================================================&echo.&echo #Supported products:&echo - Windows 11 Home&echo - Windows 11 Professional&echo - Windows 11 Education&echo - Windows 11 Enterprise&echo.&echo.&echo ============================================================================&echo Activating your Windows...&cscript //nologo slmgr.vbs /ckms >nul&cscript //nologo slmgr.vbs /upk >nul&cscript //nologo slmgr.vbs /cpky >nul&set i=1&wmic os | findstr /I "enterprise" >nul
if %errorlevel% EQU 0 (cscript //nologo slmgr.vbs /ipk NPPR9-FWDCX-D2C8J-H872K-2YT43 >nul||cscript //nologo slmgr.vbs /ipk DPH2V-TTNVB-4X9Q3-TJR4H-KHJW4 >nul||cscript //nologo slmgr.vbs /ipk YYVX9-NTFWV-6MDM3-9PT4T-4M68B >nul||cscript //nologo slmgr.vbs /ipk 44RPN-FTY23-9VTTB-MP9BX-T84FV >nul||cscript //nologo slmgr.vbs /ipk WNMTR-4C88C-JK8YV-HQ7T2-76DF9 >nul||cscript //nologo slmgr.vbs /ipk 2F77B-TNFGY-69QQF-B8YKP-D69TJ >nul||cscript //nologo slmgr.vbs /ipk DCPHK-NFMTC-H88MJ-PFHPY-QJ4BJ >nul||cscript //nologo slmgr.vbs /ipk QFFDN-GRT3P-VKWWX-X7T3R-8B639 >nul||cscript //nologo slmgr.vbs /ipk M7XTQ-FN8P6-TTKYV-9D4CC-J462D >nul||cscript //nologo slmgr.vbs /ipk 92NFX-8DJQP-P6BBQ-THF9C-7CG2H >nul&goto skms) else wmic os | findstr /I "home" >nul
if %errorlevel% EQU 0 (cscript //nologo slmgr.vbs /ipk TX9XD-98N7V-6WMQ6-BX7FG-H8Q99 >nul||cscript //nologo slmgr.vbs /ipk 3KHY7-WNT83-DGQKR-F7HPR-844BM >nul||cscript //nologo slmgr.vbs /ipk 7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH >nul||cscript //nologo slmgr.vbs /ipk PVMJN-6DFY6-9CCP6-7BKTT-D3WVR >nul&goto skms) else wmic os | findstr /I "education" >nul
if %errorlevel% EQU 0 (cscript //nologo slmgr.vbs /ipk NW6C2-QMPVW-D7KKK-3GKT6-VCFB2 >nul||cscript //nologo slmgr.vbs /ipk 2WH4N-8QGBV-H22JP-CT43Q-MDWWJ >nul&goto skms) else wmic os | findstr /I "11 pro" >nul
if %errorlevel% EQU 0 (cscript //nologo slmgr.vbs /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX >nul||cscript //nologo slmgr.vbs /ipk MH37W-N47XK-V7XM9-C7227-GCQG9 >nul||cscript //nologo slmgr.vbs /ipk NRG8B-VKK3Q-CXVCJ-9G2XF-6Q84J >nul||cscript //nologo slmgr.vbs /ipk 9FNHH-K3HBT-3W4TD-6383H-6XYWF >nul||cscript //nologo slmgr.vbs /ipk 6TP4R-GNPTD-KYYHQ-7B7DP-J447Y >nul||cscript //nologo slmgr.vbs /ipk YVWGF-BXNMC-HTQYQ-CPQ99-66QFC >nul&goto skms) else (goto notsupported)
:skms
if %i% GTR 10 goto busy
if %i% EQU 1 set KMS=kms7.MSGuides.com
if %i% EQU 2 set KMS=kms8.MSGuides.com
if %i% EQU 3 set KMS=kms9.MSGuides.com
if %i% GTR 3 goto ato
cscript //nologo slmgr.vbs /skms %KMS%:1688 >nul
:ato
echo ============================================================================&echo.&echo.&cscript //nologo slmgr.vbs /ato | find /i "successfully" && (echo.&echo ============================================================================&echo.&echo #My official blog: MSGuides.com&echo.&echo #How it works: bit.ly/kms-server&echo.&echo #Please feel free to contact me at msguides.com@gmail.com if you have any questions or concerns.&echo.&echo #Please consider supporting this project: donate.msguides.com&echo #Your support is helping me keep my servers running 24/7!&echo.&echo ============================================================================&choice /n /c YN /m "Would you like to visit my blog [Y,N]?" & if errorlevel 2 exit) || (echo The connection to my KMS server failed! Trying to connect to another one... & echo Please wait... & echo. & echo. & set /a i+=1 & goto skms)
explorer "http://MSGuides.com"&goto halt
:notsupported
echo ============================================================================&echo.&echo Sorry, your version is not supported.&echo.&goto halt
:busy
echo ============================================================================&echo.&echo Sorry, the server is busy and can't respond to your request. Please try again.&echo.
:halt
pause >nul
```

将其保存为带有`.cmd`的扩展名的批处理文件中

右键单击该批处理文件，然后以管理员身份运行它

请稍等。您将看到“产品激活成功”一行。这意味着激活过程已经完成。

## 参考文档
[Easy ways to activate Windows 11 for FREE without a product key](https://msguides.com/windows-11)