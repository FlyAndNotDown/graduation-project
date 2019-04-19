* 论文名：基于正交投影的离散分数阶傅里叶变换
* 作者：
    * `Soo-Chang Pei, Senior Member, IEEE`
    * `Min-Hung Yeh, Member, IEEE`
    * `Chien-Cheng Tseng, Member, IEEE`

---

# 概述
连续分数阶傅里叶变换( `FRFT`, `Fractional Fourier Transform` )使得数字信号能在时-频平面旋转，这使得它成为了信号时变分析的重要工具。最近 `Santhanam` 和 `McClellan` 提出了离散分数阶傅里叶变换，但是其结果并不完符合连续分数阶傅里叶变换的结果。在这篇论文中，我们提出了一种新的离散分数阶傅里叶变换( `DFRFT`, `Discrete Fractional Fourier Transform` )。这种新的 `DFRFT` 拥有 `DFT` 的厄米特特征向量，并且保持了连续 `FRFT` 的特征向量-特征值的对应关系。为了获取 `DFT` 的厄米特特征向量，我们提出了两种不同的正交投影方法。因此，我们提出的 `DFRFT` 将会具有与连续 `FRFT` 相似的的数学特性和旋转特性。此外，我们将会用类似传统 `DFT` 与连续傅里叶变换转换的方法建立起 `FRFT` 与 `DFRFT` 之间的联系。

关键字：**离散傅里叶变换**、**离散分数阶傅里叶变换**、**傅里叶变换**、**分数阶傅里叶变换**

# 第一章 介绍
傅里叶变换 ( `FT`, `Fourier Transform` ) 是信号分析领域使用最频繁的工具之一 `[1]`。而分数阶傅里叶变换( `FRFT`, `Fractional Fourier Transform` ) `[2,3]` 是傅里叶变换的一般化理论，在提出之际就成为了信号时变分析领域的重要工具。在信号时变分析中，人们习惯在时-频平面将时间、频率两根轴正交化 `[4]`。因为对原来信号连续做两次傅里叶变换能获得原来信号的相反信号，我们可以将其解释为傅里叶变换使得信号在时-频平面旋转了 `pi / 2` 度。而 `FRFT` 能让信号在连续的时-频平面旋转任意角度，这一特性用于获得线性调频信号的正交信号表示。在某些文档中，`FRFT` 也被称为旋转傅里叶变换 ( `Rotational Fourier Transform` ) 或角傅里叶变换 ( `Angular Fourier Transform` )。此外，作为 `FT` 的一般化理论，`FRFT` 也被证明与很多信号时变分析工具有关联，比如魏格纳分布 ( `Wigner Distribution` ) `[4]`，短时傅里叶变换 ( `Short-time Fourier Transform` ) `[4]`，小波变换 ( `Wavelet Transform` )等等。`FRFT` 的应用包括解决微分方程 `[2]` 、量子力学 `[3]`、光学信号处理 `[5]`、时变滤波和多路复用 `[5-8]`、摇频滤波 `[9]`、模式识别 `[10]` 和时-频信号分析 `[11-13]`。文献 `[9]` 总结了 `FRFT` 的一些性质。