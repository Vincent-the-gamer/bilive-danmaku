# 开发文档

## 将项目拿到本地跑起来
克隆项目：
~~~shell
git clone https://github.com/Vincent-the-gamer/bilive-danmaku.git
~~~
安装依赖，然后跑起来
```sh
# i安装依赖
$ yarn install

# 开发者模式跑起来！！！
$ yarn start
$ npm start
```

打包 package

```sh
# 打包
$ yarn package
```

默认打包将输出到 release 文件夹中

## 快速生成icns图标

```
sips -z 16 16     pic.png --out icon/icon_16x16.png
sips -z 24 24     pic.png --out icon/icon_24x24.png
sips -z 32 32     pic.png --out icon/icon_32x32.png
sips -z 48 48     pic.png --out icon/icon_48x48.png
sips -z 64 64     pic.png --out icon/icon_64x64.png
sips -z 96 96     pic.png --out icon/icon_96x96.png
sips -z 128 128   pic.png --out icon/icon_128x128.png
sips -z 256 256   pic.png --out icon/icon_256x256.png
sips -z 512 512   pic.png --out icon/icon_512x512.png
sips -z 1024 1024   pic.png --out icon/icon_1024x1024.png
```

```sh
iconutil -c icns icon -o Icon.icns
```
