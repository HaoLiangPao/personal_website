---
title: "RIME + 雾凇拼音，打造绝佳的开源文字输入体验 - 少数派"
source: "https://sspai.com/post/89281"
author:
  - "[[爱拼安小匠]]"
published: 2024-07-01
created: 2025-06-25
description: "为 RIME 量身打造的雾凇拼音，是目前维护最积极、功能最强大的 RIME 输入方案，拥有精心打磨的大容量词库、开箱即用的中文输入体验。"
tags:
  - "clippings"
---
作为与文字相伴的工作者，一款称手的输入法是刚需。

长期以来，在我安装了 Arch Linux 的 ThinkPad R400 和 X200 上，我都使用开源输入法引擎 [RIME](https://sspai.com/link?target=https%3A%2F%2Frime.im%2F) ，配合 [雾凇拼音输入方案](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FiDvel%2Frime-ice) ，享受畅快的文字输入体验。在 Windows 上，受不了微软拼音输入法落后的词库（缺少很多技术、游戏相关的词语），因此我也配置了 RIME。

RIME 本身简洁、流畅，性能优异，注重隐私，可定制性强，对于追求极致输入体验的用户，可谓不二之选。而为 RIME 量身打造的雾凇拼音，是目前维护最积极、功能最强大的 RIME 输入方案，拥有精心打磨的大容量词库、开箱即用的中文输入体验。

相信我，安装 RIME，再加载雾凇拼音输入方案，你将获得绝佳称手的文字输入体验。

## 我是怎么发现雾凇拼音的？

刚开始使用 RIME 的时候，我选用的是著名的 [四叶草拼音输入方案（Rime-CloverPinyin）](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Ffkxxyz%2Frime-cloverpinyin) 。它开箱即用、简单易用，拥有丰富的词库，还支持输入 Emoji，可谓新手入门 RIME 必备。然而，它已经有许久没有更新，未免跟不上瞬息万变、与时俱进的互联网环境。

后来， [在探索 AUR 软件仓库时](https://sspai.com/link?target=https%3A%2F%2Faur.archlinux.org%2Fpackages%3FO%3D0%26K%3Drime) ，我发现了由 [Dvel](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FiDvel) 开发的雾凇拼音输入方案。仅仅是看到官方网站介绍的以下亮点，就足以感受到它的强大（括号内为笔者的注释）：

> - [melt\_eng](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Ftumuyan%2Frime-melt) 英文输入（可以像主流输入法那样进行英文输入，自动联想英文单词，提升你的输入体验。）
> - [部件拆字方案](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fmirtlecn%2Frime-radical-pinyin) 反查、辅码
> - 自整理的 Emoji
> - [以词定字](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FBlindingDark%2Frime-lua-select-character) （让你在输入一个词组后，选取这个词组的开头或结尾的一个字直接上屏，利于输入生僻字）
> - [长词优先](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Ftumuyan%2Frime-melt%2Fblob%2Fmaster%2Flua%2Fmelt.lua)
> - [Unicode](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fshewer%2Flibrime-lua-script%2Fblob%2Fmain%2Flua%2Fcomponent%2Funicode.lua)
> - [数字、人民币大写](https://sspai.com/link?target=https%3A%2F%2Fwb98.gitee.io%2F)
> - 日期、时间、星期、 [农历](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fboomker%2Frime-fast-xhup)
> - 常见错音错字提示
> - 置顶候选项
> - 所有标点符号直接上屏，/ 模式改为 v 模式，/ 直接上屏
> - 增加了许多拼音纠错
> - 简体字表、词库……
> - 校对大量异形词、错别字、错误注音
> - 全词库完成注音
> - 同义多音字注音

（上述内容摘自 [官方介绍页](https://sspai.com/link?target=https%3A%2F%2Fdvel.me%2Fposts%2Frime-ice%2F) ）

看了介绍后，果断安装并配置。从那时候开始，雾凇拼音就成为了我使用 RIME 输入的首选方案，更是目前的唯一方案。

值得高兴的是，雾凇拼音是长期维护的。作者 Dvel 以月更至周更的频率维护，确保雾凇拼音能够跟上互联网的步伐，永葆生命力。无论你什么时候开始使用雾凇拼音，都有新鲜的体验。

## RIME 的安装

RIME 本身是一个输入法引擎，它在不同平台有不同的适配，分别是：

| 平台 | 对应的适配 |
| --- | --- |
| Linux | 中州韵（通过 IBus 或 Fcitx 输入法框架运行） |
| Windows | 小狼毫 |
| macOS | 鼠须管、 [小企鹅输入法](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Ffcitx-contrib%2Ffcitx5-macos-installer%2Fblob%2Fmaster%2FREADME.zh-CN.md) （Fcitx） |
| Android | [同文输入法](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fosfans%2Ftrime) （TRIME） |
| iOS | [仓输入法](https://apps.apple.com/cn/app/%E4%BB%93%E8%BE%93%E5%85%A5%E6%B3%95/id6446617683?l=en-GB) （开源免费）、 [iRime](https://apps.apple.com/cn/app/irime%E8%BE%93%E5%85%A5%E6%B3%95-%E5%B0%8F%E9%B9%A4%E5%8F%8C%E6%8B%BC%E4%BA%94%E7%AC%94%E9%83%91%E7%A0%81%E8%BE%93%E5%85%A5%E6%B3%95/id1142623977) （付费） |

下面分别展示在不同平台的安装方法。

### 1）Windows：小狼毫

首先，前往 [RIME 官方网站](https://sspai.com/link?target=https%3A%2F%2Frime.im%2Fdownload%2F) ，下载小狼毫的安装包。注意不同系统版本适用不同的小狼毫，如果是 Windows 8.1 及更高版本，则选择最新的 0.16.1 <sup href="">1</sup> ；如果是老版本的 Windows（如Windows 7），则选择旧版本，但是已经不再更新。

![](https://cdnfile.sspai.com/2024/06/28/a6819e8b50efeefa39956dfe6e9d1d01.png?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1)

下载小狼毫的安装包。注意区分系统版本。

下载后，运行安装程序，按提示安装即可。期间，安装程序会要求你指定用户文件夹，该文件夹用于放置 RIME 的用户配置文件，通常使用默认设置即可，当然你也可以指定其他的位置。

![](https://cdnfile.sspai.com/2024/06/28/22b0888986b4768bee9d182454a66348.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

小狼毫的安装选项，通常保持默认即可。

安装完成后，小狼毫默认启用。在 Windows 10/11，你可以按「Windows+空格」快捷键切换输入法。

### 2）Linux

各个主流发行版都在官方源收录了 RIME，以及 RIME 运行所需的输入法框架 IBus 或 Fcitx5。考虑到 Fcitx5 更为常用，这里仅介绍 RIME+Fcitx5 的安装。

首先，在你的发行版中安装 Fcitx5，可以参考 [官方教程](https://sspai.com/link?target=https%3A%2F%2Ffcitx-im.org%2Fwiki%2FInstall_Fcitx_5%2Fzh-cn) 。安装完成之后，用下面的命令安装 RIME：

```shell
sudo pacman -Sy fcitx5-rime                      # Arch Linux
sudo apt update && sudo apt install fcitx5-rime  # Ubuntu / Debian / Deepin
sudo zypper install fcitx5-rime                  # OpenSUSE
sudo dnf install fcitx5-rime                     # Fedora
```

安装完成后，在终端里运行 `fcitx5-configtool` （或在应用程序启动器中检索「Fcitx」关键字），打开 Fcitx 设置工具。然后，在右侧的「可用输入法」中找到 RIME，双击它，以将其添加到「当前输入法」列表。

最后，在系统托盘右击 Fcitx 图标（通常显示为键盘图案，或者是一只小企鹅），选择「RIME」，这样就成功激活了。

### 3）macOS

macOS 用户可以选择 3 种适配版本：鼠须管（官方开发）、小企鹅、XIME <sup href="">2</sup> （后两者为第三方开发）。下载后按提示安装即可，由于笔者没有 macOS 的电脑，故无法演示。

![](https://cdnfile.sspai.com/2024/06/28/51a8439328096ff427a3c0ecc46317e8.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

### 4）Android

同文输入法（TRIME）是 RIME 在 Android 上的适配。

Android 用户可以参考本站作者 [张奕源Nick](https://sspai.com/u/nicholaszhang/updates) 的文章 [《同文输入法：把 RIME 装进 Android 手机》](https://sspai.com/post/77499) ，来进行安装、配置。

### 5）iOS

iOS 用户可以在 App Store 中下载以下两款输入法（任选其一），它们是 RIME 在 iOS 上的第三方适配：

- [仓输入法](https://sspai.com/link?target=https%3A%2F%2Fihsiao.com%2Fapps%2Fhamster%2Fdocs%2F) （开源免费， [App Store 链接](https://apps.apple.com/cn/app/%E4%BB%93%E8%BE%93%E5%85%A5%E6%B3%95/id6446617683?l=en-GB) ）
- [iRIME 输入法](https://apps.apple.com/cn/app/irime%E8%BE%93%E5%85%A5%E6%B3%95-%E5%B0%8F%E9%B9%A4%E5%8F%8C%E6%8B%BC%E4%BA%94%E7%AC%94%E9%83%91%E7%A0%81%E8%BE%93%E5%85%A5%E6%B3%95/id1142623977) （付费，定价 8 元人民币）

选择仓输入法的用户可以参考本站的这两篇文章：

- [谷丰](https://sspai.com/u/un88wd1r/updates) ： [《小鹤音形在 iPhone 上的完美归宿：仓输入法》](https://sspai.com/post/88595)
- [王百顺BS](https://sspai.com/u/baishun/updates) ： [《仓输入法：让 iOS 也能舒服的用上 Rime》](https://sspai.com/post/79469)

## 雾凇拼音输入方案的安装、更新

RIME 在轻便、高性能的同时，却是公认的高门槛：它不像搜狗等输入法那样提供设置工具，相反你需要编写配置文件才能将 RIME 调教得顺手。

幸运的是，雾凇拼音开箱即用。开发者已经为你编写了配置文件，你不需要再去折腾。只需按照要求将雾凇拼音的文件放置在 RIME 的指定目录，即可快速享受雾凇拼音带来的便捷输入体验。更多时候，你可以直接使用一键安装工具（如 RIME 官方的「 [东风破](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Frime%2Fplum) 」 [管理器](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Frime%2Fplum) ）来快速安装雾凇拼音。

### 1）Windows 平台下的安装、更新

Windows 平台安装雾凇拼音非常方便，可以直接使用小狼毫输入法自带的配置工具。 **更新步骤与安装步骤完全相同。**

- **第一步，** 右键点击任务栏上的 RIME 图标，选择「输入法设定」，打开配置工具。
![](https://cdnfile.sspai.com/2024/06/27/4507de486b6163267e6599c4140f5804.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

托盘上的「中」字图标即为 RIME 的图标。

- **第二步，** 在配置工具中，点击左下角的「 **获取更多输入方案** 」按钮。
![](https://cdnfile.sspai.com/2024/06/27/703a72cbfee3974238f1eff7b225a8c0.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

点击「获取更多输入方案」按钮。

- **第三步，** 随后会出现一个命令行窗口，这就是小狼毫自带的配置文件安装工具。在提示符「 `Enter package name...`」后，输入雾凇拼音的包名（其中， `full` 表示安装所有的组件）：
```shell
iDvel/rime-ice:others/recipes/full
```
![](https://cdnfile.sspai.com/2024/06/27/ce19357d807d4b95bd155d0256c7c136.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

在配置文件安装工具的提示符中，输入雾凇拼音的包名。

- **第四步，** 回车确认，随即 RIME 会自动下载、安装雾凇拼音输入方案，如下图所示。

> **注意：** 配置文件安装工具需要用到 [Git](https://sspai.com/link?target=https%3A%2F%2Fgit-scm.com%2Fdownload%2Fwin) 。如果你的系统没有安装 Git，或下载时发生错误， [请参照 RIME 官方的教程](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Frime%2Fplum%3Ftab%3Dreadme-ov-file%23windows) ，用教程中提供的 Bootstrap 工具包来初始化该工具。

![](https://cdnfile.sspai.com/2024/06/27/340b9412d0d6017544352ca834516fcb.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

RIME 正在安装雾凇拼音输入方案。

- **第五步，** 稍等片刻，命令提示符出现「 `Updated xxx files...`」的提示（黄色字样），表示安装完成。此时可以直接关掉该窗口。
![](https://cdnfile.sspai.com/2024/06/27/96de708e28f28fa913eaeb759c4f2b6d.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

雾凇拼音安装成功。

- **第六步，** 回到小狼毫配置工具，将列表往下拉，你就会看到雾凇拼音的选项。勾选它，然后单击「中」按钮 <sup href="">3</sup> ，确认。
- 接下来配置工具还会要求你选择一款皮肤。直接点击「中」按钮确认，即可完成全部设置。
![](https://cdnfile.sspai.com/2024/06/27/8916b38cbdd0c6e1ad1353dd4668fc27.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

注意看，雾凇拼音出现在了列表中。

### 2）Linux 平台下的安装、更新

Linux 发行版用户可以使用 RIME 官方的「东风破（Plum）」工具来安装雾凇拼音。

首先，使用 Git 来下载东风破工具，假设把工具下载到当前用户的主目录下：

```shell
git clone --depth 1 https://github.com/rime/plum ~/plum
```

然后，运行以下命令安装雾凇拼音：

```shell
# 切换到东风破的目录
cd ~/plum

# 如果你使用Fcitx5，你需要加入参数，让东风破把配置文件写到正确的位置
rime_frontend=fcitx5-rime bash rime-install iDvel/rime-ice:others/recipes/full

# 如果你是用IBus，则不需加参数，因为东风破默认是为IBus版的RIME打造。
bash rime-install iDvel/rime-ice:others/recipes/full
```

稍等片刻，雾凇拼音输入方案就安装成功了。

> **注意：**
> 
> - 如果你使用 Arch Linux，你还可以直接安装 AUR 软件包，一步到位。 [可以参考官方教程](https://sspai.com/post/bash%20rime-install%20iDvel/rime-ice:others/recipes/full) 。
> - macOS 也可以使用东风破，感兴趣的读者请自行尝试。

### 3）激活雾凇拼音输入方案（中州韵/小狼毫/鼠须管）

现在雾凇拼音输入方案已经准备就绪，但还没有激活。此时输入文字，仍然还在使用原有的拼音方案。

接下来，只需要按「Ctrl+~」快捷键（其中，「~」键位于 Tab 键的正上方），打开 RIME 的输入方案选择菜单：

![](https://cdnfile.sspai.com/2024/06/28/371395fe9b4cd6da1b3603815bd9bcd5.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

RIME 的方案选单，可以看到雾凇拼音已经出现在其中。

然后，按下相应的数字键（或直接点击），选择「雾凇拼音」，那么雾凇拼音将正式激活，你可以畅快地打字了！

> **注意：** 其他平台（如同文输入法、仓输入法）请参照相应软件的文档。

## 雾凇拼音的输入体验

雾凇拼音的输入体验非常顺畅，有各种可圈可点的特性。这些特性都会在你日常输入的过程中，润物细无声地改善你的输入体验。

接下来我会介绍雾凇拼音的部分功能亮点。

### 1）丰富的词库

雾凇拼音的词库由作者 Dvel 精心打磨，源于以下这些精品语料库，包罗万象，满足多领域的日常输入需求（列表来自官方网站的介绍）：

- [《通用规范汉字表》](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FiDvel%2FThe-Table-of-General-Standard-Chinese-Characters)
- [华宇野风系统词库](https://sspai.com/link?target=http%3A%2F%2Fbbs.pinyin.thunisoft.com%2Fforum.php%3Fmod%3Dviewthread%26tid%3D30049)
- [清华大学开源词库](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fthunlp%2FTHUOCL)
- [《现代汉语常用词表》](https://sspai.com/link?target=https%3A%2F%2Fgist.github.com%2Findiejoseph%2Feae09c673460aa0b56db)
- [《现代汉语词典》](https://sspai.com/link?target=https%3A%2F%2Fforum.freemdict.com%2Ft%2Ftopic%2F12102)
- [《同义词词林》](https://sspai.com/link?target=https%3A%2F%2Fforum.freemdict.com%2Ft%2Ftopic%2F1211)
- [《新华成语大词典》](https://sspai.com/link?target=https%3A%2F%2Fforum.freemdict.com%2Ft%2Ftopic%2F11407)

在词频的统计上，雾凇拼音采用 [腾讯词向量](https://sspai.com/link?target=https%3A%2F%2Fai.tencent.com%2Failab%2Fnlp%2Fen%2Fdownload.html) 的数据库，力求尽可能贴合中文用户的输入习惯。

下面，就撷取几个实际输入的例子：

![](https://cdnfile.sspai.com/2024/06/29/926462afb0ea4fec0403a39b3626616e.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

古文句的输入，例如刘禹锡《陋室铭》。

![](https://cdnfile.sspai.com/2024/06/29/5db7ffe4cf791424db05d59090e6ee39.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

成语的输入。

![](https://cdnfile.sspai.com/2024/06/29/2602c04f30b9d92d4d3f8079ed99383f.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

古文词汇、生僻词汇的输入。

海量且精心打磨的词库，加上 RIME 本身强大的造句能力，使得雾凇拼音完全可以不依赖云服务，在本地就能带给你舒服的输入体验。

### 2）Emoji 输入

输入拼音自动联想 Emoji，已经是搜狗、百度等主流输入法的基本素质。当然，雾凇拼音也不例外。雾凇拼音拥有丰富的 Emoji 数据库，将众多常用字词与 Emoji 关联。想找什么 Emoji，直接输入关键字的拼音即可。

下面就撷取几个例子：

![](https://cdnfile.sspai.com/2024/06/29/939c26aa2d9dbfc3d9938b4625948315.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

「上」，提供了 Emoji 与箭头字符

![](https://cdnfile.sspai.com/2024/06/29/57e461ad2cee08dbf933245e8b5d560d.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

「书」和「树」

![](https://cdnfile.sspai.com/2024/06/29/396c20d2e578e93b4e3f11105a4c8525.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

表情

![](https://cdnfile.sspai.com/2024/06/29/728bf98392d6680c7fd0a7a039caad43.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

Emoji 化的汉字

### 3）英文输入

你可以直接在中文模式下输入英文单词，雾凇拼音会自动为你联想单词，非常有利于英文写作，尤其是涉及到衍生词汇的场景。

![](https://cdnfile.sspai.com/2024/06/29/b30ed060fcc4e28fbab1de7a471a42c0.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

单词联想

![](https://cdnfile.sspai.com/2024/06/29/8f4bc9e421c48f84104594101c07780d.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

由一个单词衍生多个词汇（例如，custom→customize→customization）

带有英文字母的汉字词也不在话下：

![](https://cdnfile.sspai.com/2024/06/29/f92b520dfab835fe4c3ffc25b690bf95.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

![](https://cdnfile.sspai.com/2024/06/29/86b63a620bfb03f2fce24278e43ea15e.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

### 4）日期时间输入

输入「日期」的拼音缩写「rq」，即可得到多种格式的日期：

![](https://cdnfile.sspai.com/2024/06/29/1104d3c63a34f5cbfaa63744f2d293d2.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

同理，输入「时间」的拼音缩写「sj」，即可得到两种格式的时间（时分，或时分秒）：

![](https://cdnfile.sspai.com/2024/06/29/2122821e6269e1f1f61b53abcbe1dd8c.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

### 5）拼音音调、修饰符字母输入

小学语文老师在做教案时，常常需要输入带声调的汉语拼音；有的小语种学习者（如西班牙语、法语）也可能需要临时键入带有修饰符的字母（如「õ」）。有了雾凇拼音，你可以轻而易举地输入这些字母，无须借助第三方工具。

在中文输入模式下，你只需先键入「v」，然后键入单韵母（a、o、e、i、u），即可得到带音调的韵母，以及其他带修饰符的字母：

![](https://cdnfile.sspai.com/2024/06/29/e333530545c192b86832e08959738e8f.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

![](https://cdnfile.sspai.com/2024/06/29/969a49d4c025dfc9834b8b5378de7090.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

注意，韵母「ü」也在「vu」下。

![](https://cdnfile.sspai.com/2024/06/29/def12bb9ec890ded105441242485b0f6.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

![](https://cdnfile.sspai.com/2024/06/29/0d69a199abce41c352d36185f450ab1b.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1)

## 优化技巧：Shift 切换中英文的问题

主流的输入法，例如微软拼音、搜狗，可以敲 Shift 键来切换中英文输入；且如果此时正在输入拼音，则按一次 Shift 键会直接将拼音上屏。

然而小狼毫默认的设置让人迷惑：左 Shift 键只切换为英文，右 Shift 键直接上屏中文。如果你习惯了主流输入法的 Shift 键模式，那么这会非常影响输入效率，尤其是对于习惯使用右 Shift 键切换中英文的用户（比如我）来说，更是麻烦。

对此，可以参照 [博主 SIRLIS 提供的方法](https://sspai.com/post/%E5%8F%82%E8%80%83%EF%BC%9Ahttps://sirlis.cn/posts/rime-shift-switch-zh-en/#14-shift-%E7%9B%B4%E6%8E%A5%E4%B8%8A%E5%B1%8F%E4%B8%94%E5%88%87%E6%8D%A2%E4%B8%AD%E8%8B%B1%E6%96%87) ，修改 RIME 的配置文件，将我们熟悉的操作方式带回来。

> **注意：** 为防止编辑出错导致 RIME 无法读取配置文件，你需要先学习 [YAML 文件的基础知识](https://sspai.com/link?target=https%3A%2F%2Fwww.runoob.com%2Fw3cnote%2Fyaml-intro.html) 。

- **第一步，** 右击任务栏上的 RIME 图标，选择「用户文件夹」，打开配置文件目录。
- **第二步，** 打开 `default.custom.yaml` 文件，在 `patch` 字段添加以下配置代码（注意每一行之前的空格缩进）：
```shell
# 启用Shift上屏英文并进行中英文切换
  "ascii_composer/switch_key/Shift_L": commit_code
  "ascii_composer/switch_key/Shift_R": commit_code
```
- 添加完成后的样子类似于这样（以我自己的配置为例，仅供参考，请勿照搬所有内容）：
```shell
# ...前面的内容省略...
patch:
  schema_list:
    - {schema: luna_pinyin}
    - {schema: luna_pinyin_simp}
    - {schema: luna_pinyin_fluency}
    - {schema: rime_ice}
  "menu/page_size": 10
  # 启用Shift上屏英文并进行中英文切换
  "ascii_composer/switch_key/Shift_L": commit_code
  "ascii_composer/switch_key/Shift_R": commit_code
```
- **第三步，** 保存文件，然后右击任务栏 RIME 图标，选择「重新部署」，稍后即可生效。

这样，就可以游刃有余地在中、英模式之间切换了。

## 写在最后

作为开源输入法中的传奇，RIME 一直致力于改善中文用户的输入体验，开源、纯本地词库、注重隐私，让你打字行云流水。

而为广大 RIME 用户而生的雾凇拼音输入方案，凝结着作者与广大开源贡献者的智慧，开箱即用、词库广大、在细节上下功夫，更将 RIME 的中文输入体验发挥到极致。从此 RIME 更为称手，将成为中文输入法用户全新的首选。

我一直在 Linux 的电脑上使用 RIME + 雾凇拼音，现在更是在 Windows 台式机上配置 RIME 成为主力。接下来的写作生涯，相信我可以乘着 RIME 与雾凇拼音的风，享受更自在畅快的写作和工作体验，感觉写作效率都高了不少！

屏幕前的你，如果感兴趣，不妨试一试。
