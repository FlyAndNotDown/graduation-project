# 一种离散分数阶随机变换
* 作者： `Zhengjun Liu`, `Haifa Zhao`, `Shutian Liu`
* 联系地址：`Harbin Institute of Technology, Department of Physics, Harbin 150001 P. R. CHINA`

---

# 综述
我们提出了一种基于离散分数阶傅里叶(`Discrete Fractional Fourier Transform`, `DFrFT`)变换演变而来的具有内在随机性的离散分数阶随机变换(`Discrete Fractional Random Transform`, `DFRNT`)。`DFRNT` 继承了 `DFrFT` 优秀的数学特性，当然，他自身也拥有一些其他的优秀特性。作为他的首要应用，`DFRNT` 已经被用于图像加密和解密。

* 关键词：分数阶傅里叶变换，离散随机变换，密码学，图像加密和解密
* PACS：`42.30.-d`, `42.40.-i`, `02.30.Uu`

# 第一章 介绍
总所周知，一些从时域(或空间域)到频域或时空-频率组合域的变换比如傅里叶变换(`Fourier Transform`, `FT`)、魏格纳分布函数(`Winger Distribution Function`)、小波变换(`Wavelet Transform`, `WT`)、最近提出的分数阶傅里叶变换(`Fractional Fourier Transform`, `FrFT`)等长久以来就是物理和信息处理领域的有力数学工具。举个例子，`FT` 已经成为了信号表示、信号分析、信号处理、图像处理、模式识别的基本工具。而在物理学中，`FT` 能够很好地描述光的夫琅和费(`Fraunhofer`，远场)衍射，因此，它已经成为了信息光学的基本原理。最近，在量子信息领域的研究中，`FT` 算法已经被采纳作为了量子计算机中的一种高效而基础的算法。`WT` 是一种加窗的傅里叶变换(加博尔变换，`Gabor Transform`)，但是其窗大小是可变的。因此，`WT` 已经在时-频混合域、多分辨率情况下的信号表示领域中成为了一种极其强力的工具，并且其被广泛用于图像压缩、分割、拼接和视觉模式识别中。

数学变换的意义远比它自身表现的要重大，
