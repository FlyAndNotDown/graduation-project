# 🥤 毕业设计
* 题目：基于四元数变换的彩色图像水印算法设计与实现
* 变换算法：`QDFRNT, 四元数分数阶随机变换`、`QDFRFT, 四元数分数阶傅里叶变换`
* 水印算法：
    * 基于 `SVM` 的自适应彩色图像水印算法
    * 基于量化的自适应彩色图像水印算法 (`TODO`)

# ☕ Matlab 算法仿真
## 环境搭建
我采用的 `Matlab` 版本为 `R2018a`，其他版本的兼容性没有测试过，建议直接安装 `R2018a`，为了运行代码，你需要在 `Matlab` 中将项目中的 `/matlab` 目录及其子目录添加到 `Matlab` 的执行目录。

项目分为两大块：
* 函数
* 测试用例

你可以在 `/matlab/function` 中找到该水印算法群所需要的一切函数，具体目录的功能如下：
* `/matlab/function/deal`：一些处理函数
* `/matlab/function/mask`：自适应掩蔽因子相关函数
* `/matlab/function/tool`：一些工具函数
* `/matlab/function/transform`：变换函数，主要是 `DFRNT` 变换簇和 `DFRFT` 变换簇
* `/matlab/function/watermark`：水印相关函数，包括多种水印嵌入、`SVM` 训练、水印提取

另外，在 `/matlab/test` 目录下，你可以找到相关函数的使用实例，基本上每一个函数都有着自己的测试用例，你可以通过看这些测试用例了解各种函数的用法，另外，函数本身，每个文件中也有着详细的注释和参数说明。

## 例子
这里给出一组简单的测试效果图：

<div>
    <img src="./doc/example-source.bmp" width="30%" alt="source"/>
    <img src="./doc/example-marked.bmp" width="30%" alt="source"/>
<div/>
<div>
    <img src="./doc/example-secret.bmp" width="10%" alt="source"/>
    <img src="./doc/example-restored.bmp" width="10%" alt="source"/>
<div/>

按照顺序，给出的图分别为原图、嵌入水印的图、水印图像、还原得到的水印图像，使用的算法为 `QDFRNT-SVM`。

# 🍱 C/Cpp 实现
`C++` 版本采用了高性能的库和实现，算法速度能够达到 `Matlab` 版本的十倍以上，但是由于很多功能都需要自己造轮子，实现出来的结果可能与 `Matlab` 版本有着一定程度上的不同，稳定性也不如 `Matlab` 版本，可以说 `Matlab` 适合研究，但是 `C++` 版本可以用于工程化。

该实现是跨平台版本，使用 `cmake` 进行项目管理，你可以在 `MSVC` 或者 `GNU/GCC` 上部署该版本。

## 环境搭建
环境的搭建主要是安装和引入一些库，大多数库我都已经在 `cmake` 的配置文件中添加了，你要做的事情，就是在部署之前，把各种库按照正确的方法安装，并且添加合适的环境变量，使得我在 `cmake` 配置文件的使用的环境变量能够正常工作，只要能找到库，就能编译成功。

这里给出使用到的库的一个简要列表：
* 高性能矩阵库 `Armadillo`
* 图像处理库 `OpenCV 4`
* 命令行参数解析库 `Cmdline`
* `SVM` 库 `LibSVM`

其中 `Armadillo` 和 `LibSVM` 没什么好说的，使用最新版本即可，但是 `OpenCV` 的版本需要规定，一定要为 `4`，其他的版本不行，`Cmdline` 是 `github` 上的一个开源项目，地址在这里：[Cmdline - C++ Cmd Arguments Parser](https://github.com/tanakh/cmdline)，这个项目在 `Windows` 平台上运行需要做一些其他的工作，后面会提到。

### Windows
首先是 `Armadillo` 的安装，直接在官网下载 `Windows` 版本的二进制发行包即可，在下载完成后，你需要为其配置两个环境变量：

* `ARMADILLO_INCLUDE_DIR`
* `ARMADILLO_LIB_DIR`

第一个指向 `Armadillo` 发行包文件夹下的 `include` 文件夹，第二个指向发行包文件夹下的 `example/lib_win64`，另外，你还需要将 `example/lib_win64` 这个文件夹添加到 `path` 中，因为用到了其中的两个 `dll` 动态链接库

接下来是 `OpenCV 4` 的配置，依然是在官网下载最新的 `Windows` 二进制发行包，假设我的包名叫 `Opencv`，首先你需要将 `OpenCV/build/x64/vc15/bin` 添加到 `path` 中，这里存放了 `OpenCV` 的可执行程序，需要用到。接下来依然是添加两个环境变量：

* `OPENCV_INCLUDE_DIR`
* `OPENCV_LIB_DIR`

他们的值分别为 `OpenCV\build\include` 和 `OpenCV\build\x64\vc15\lib`

至于 `LibSVM`，依然是下载发行包，接下来将发行包根目录中的 `svm.h` 和 `svm.cpp` 两个文件分别复制到 `cpp` 项目中的 `lib/include` 和 `lib/src` 中，如果没有该目录，则需要你自己新建一个，因为这两个文件为库，我用 `git` 把它 `ignore` 掉了，所以没有的话你需要自己建立。`LibSVM` 不需要配置环境变量。

最后是 `Cmdline`，对于 `Windows` 来说，官方给出的版本并无法使用，因为他们是为 `GNU` 特制的，有位朋友进行了一些改写，我们可以使用改写后的版本，在这里：[Cmdline - VS Version](https://blog.csdn.net/10km/article/details/50982993)，将文件存为 `cmdline.h`，并且存放到一个特定目录，接下来配置环境变量：

* `CMDLINE_INCLUDE_DIR`

这个环境变量就设置到 `cmdline.h` 所在的目录即可

### Linux/Unix/MacOS
待补全

<!-- TODO -->

## Usage
使用方法如下：

```
usage: ./watermark --type=string --algorithm=string --action=string [options] ...
options:
  -t, --type         mark type, can be 'svm' or 'qc' (string)
  -a, --algorithm    algorithm type, can be 'qdfrnt' or 'qdfrft' (string)
  -c, --action       mark, restore or train (string)
  -s, --source       source file path (string [=source.jpg])
  -o, --output       output file path (string [=output.jpg])
  -e, --secret       secret file path (string [=secret.jpg])
  -r, --matrix       random matrix file path (string [=matrix.dat])
  -k, --keys         watermark keys file path (string [=keys.dat])
  -m, --model        model file path (string [=model.dat])
  -?, --help         print this message
```

你可以使用：

```
./watermark -?
```

或者：

```
./watermark --help
```

来获取帮助

下面给出几个使用示例：

```
# 训练基于 QDFRNT 的 SVM-Model
./watermark -t svm -a qdfrnt -c train -s lena.bmp

# 使用 SVM-QDFRNT 方法嵌入水印
./watermark -t svm -a qdfrnt -c mark -s lena.bmp -o marked.bmp -e secret.bmp

# 提取 SVM-QDFRNT 方法嵌入的水印, 需要 matrix.dat, keys.dat, model.dat
./watermark -t svm -a qdfrnt -c restore -s marked.bmp -o restored.bmp
```

# 😁 关于
* 作者：`John Kindem` ( `NUAA 161520311` )
* 项目：`NUAA 2019` 毕业设计

欢迎 `star`、`fork`
