# 开源版Bilibili弹幕姬

<div align="center">
  <br>
    <h3>一个开源的 bilibili 直播弹幕姬，支持 Win 和 Mac</h3>
    <h4><s>Electron不支持iOS和Android的App构建</s></h4>
  <br>
</div>

## 关于本项目
本项目Fork自: \
https://github.com/Beats0/bilive-danmaku/ 

#### 原作者：Beats0  ----- Github:  https://github.com/Beats0/ 

#### Fork作者：诡锋  ----- Github: https://github.com/Vincent-the-gamer/

2022.7.1: \
  其实一直以来我都觉得Mac端没有弹幕姬是一件很烦的事情，昨天出于
好奇上github上面翻了一下，还真的给我找到了，于是我就打算弄一个个人定制版

### 版本相关
注意: Fork版本和原项目版本无关

查看版本更新日志

##### [更新日志](https://github.com/Vincent-the-gamer/bilive-danmaku/blob/master/CHANGELOG.md)

### 使用

[下载 Release](https://github.com/Vincent-the-gamer/bilive-danmaku/releases)

输入房间号 RoomID 后，回车提交即可连接
#### 注意
有一个锁的图标，那个是窗口置顶，如果不直播的时候，建议不开启，不然 \
它会覆盖掉所有窗口，包括截图控件。

### 研究代码
如果你想和我一样研究代码，可以拉取下来。 \
原工程使用的yarn安装依赖，最后不要用npm了，混用npm和yarn个人感觉不太好。 

#### 关于npm和yarn的国内镜像问题

##### 原镜像下线并停止DNS解析
在2022.6.30以后，原来的淘宝镜像: \
https://npm.taobao.org 和 https://registry.npm.taobao.org

已失效, 记得把npm,yarn等工具配置上最新的registry。

域名切换规则：
~~~
https://npm.taobao.org => https://npmmirror.com
https://registry.npm.taobao.org => https://registry.npmmirror.com
~~~

##### 最新配置npm和yarn国内镜像的方法
~~~shell
# 现在请使用这个
npm config set registry https://registry.npmmirror.com
yarn config set registry https://registry.npmmirror.com
~~~

其他镜像（这个项目不一定都用，但是阿里云官网上有了，就姑且全写进来吧）:
~~~text
registry: https://registry.npmmirror.com

开源镜像: https://npmmirror.com/mirrors/
Node.js 镜像: https://npmmirror.com/mirrors/node/
alinode 镜像: https://npmmirror.com/mirrors/alinode/
ChromeDriver 镜像: https://npmmirror.com/mirrors/chromedriver/
OperaDriver 镜像: https://npmmirror.com/mirrors/operadriver/
Selenium 镜像: https://npmmirror.com/mirrors/selenium/
electron 镜像: https://npmmirror.com/mirrors/electron/
~~~

#### 安装依赖
如果安装依赖失败的话，不管您使用的是本代码还是原作者的代码\
请删除原来的yarn.lock文件，并在项目**根目录**下创建.yarnrc文件，填入
~~~
registry "http://registry.npmmirror.com"
sass_binary_site "http://npmmirror.com/mirrors/node-sass/"
phantomjs_cdnurl "http://cnpmjs.org/downloads"
electron_mirror "http://npmmirror.com/mirrors/electron/"
sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
profiler_binary_host_mirror "http://npmmirror.com/mirrors/node-inspector/"
chromedriver_cdnurl "https://npmmirror.com/mirrors/chromedriver/"
~~~
然后重新运行yarn install安装依赖

### 项目打包
electron-builder会依赖
~~~
https://github.com/electron/electron/releases/download/v19.0.6/electron-v19.0.6-xxx-x64.zip 
~~~
但是这个拉取可能失败, 所以将electron改为国内镜像
~~~
npm config set electron_mirror https://mirrors.huaweicloud.com/electron/
~~~
然后针对electron_binary依赖，可以手动下载，然后拷贝至：
~~~
# macOS 
# 这是一个隐藏文件夹，使用  shift + command + .  显示
/Users/你的用户名/资源库/Caches/electron/
~~~
这里面可以放入手动下载的依赖

至于Win的我没研究在哪，以后要是还需要用到Windows系统的话，再说吧

### 功能

面板和官方 web 端几乎一模一样，主要拓展了订阅列表，~~弹幕翻译~~，语音朗读，多语言配置等功能

支持的消息类型

```
LIVE                // 开播消息
POPULAR             // 人气
DANMU_MSG           // 弹幕消息
SEND_GIFT           // 礼物消息
SPECIAL_GIFT        // TODO
COMBO_SEND          // 礼物连击消息
COMBO_END           // TODO 礼物连击结束消息
NOTICE_MSG          // 广播消息
WELCOME             // 欢迎进入直播间
WELCOME_GUARD       // 欢迎舰长进入直播间
GUARD_BUY           // 上舰消息
SUPER_CHAT_MESSAGE  // SC消息
WARNING             // 直播警告消息
CUT_OFF             // 直播强制切断消息
```

### 注意!

1. 关于显示头像功能

已经做了限定访问用户 api，频率最大为 5 个/s，每次获取头像成功后自动保存用户数据，7 天后过期。

尽管已经做了限定，但还是有小几率会因大量访问 api 导致被 ban ip，大约 10 分钟后自动解封。换言之，只要用户数据保存得越多，被 ban 的几率就越小。

2. ~~翻译~~和朗读(翻译已失效)

~~大量使用 google translate api，超出官方调用频率会导致请求超时，翻译或朗读失败。~~

3. 鼠标穿透功能

点击顶部穿透按钮后可开启鼠标穿透功能，再次点击可取消解锁

4. 自定义样式(仅支持昵称样式和弹幕样式)

点击 Dev Tools，编写对应的编辑 CSS 样式，只复制 css 声明语句，例如上图的 css 为

~~~css
text-shadow: 1px 1px 2px #e91e63, 0 0 0.2em #e91e63;
~~~

填入到 `设置` > `自定义样式` 中，`Ctrl+R` 重载即可。\
**当然，您如果非常熟悉css，也可以做一些骚操作233**

### 开发

[README_DEV](https://github.com/Vincent-the-gamer/bilive-danmaku/blob/master/README_DEV.md)



### LICENSE

[MIT](https://github.com/Vincent-the-gamer/bilive-danmaku/blob/master/LICENSE)

[MIT © Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
