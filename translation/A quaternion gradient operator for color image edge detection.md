# 第二章 色彩梯度算法
本文提出的彩色图像梯度算法基于测量彩色图像方块内的局部对比度，这一设想与 `Di Zenzo` 的梯度算法思想类似。然而，本文提出的算法与 `Di Zenzo` 算法不同的地方在于我们并没有使用欧氏距离来衡量图像变换率，而是基于四元数旋转理论计算亮度变换和色度。

## 色彩距离的四元数表示
四元数理论在 `1843` 年被 `Hamilton` 提出，它是传统四元数的一般化形式。一个四元数由一个实部和三个虚部构成，它常常被表示成如下的代数形式：

![1](./img/1.png)

其中 `a`、`b`、`c`、`d` 都是实系数，而 `i`、`j`、`k` 是按照如下规则进行运算的虚数单位：

![2](./img/2.png)

四元数的模和共轭数的定义分别如下：

![3](./img/3.png)

![4](./img/4.png)

当四元数的实部为零，我们称之为纯四元数，当四元数的模为 `1`，我们称之为单位四元数。

一个彩色像素点可以使用一个纯四元数来表示，其三个虚部分别代表了彩色像素点的 `R`、`G`、`B` 三个通道。

![5](./img/5.png)

![6](./img/6.png)

假定一个单位纯四元数 `R` 和两个彩色像素点 `q1`、`q2`，他们的表示如下：

![7](./img/7.png)

![8](./img/8.png)

![9](./img/9.png)

同时，我们将表达式

![10](./img/10.png)

记录为 `q3`，即

![11](./img/11.png)

所以，如下的四元数能够表示两个像素点之间的色品差异：

![12](./img/12.png)

为了计算简单，上式也可以写成

![13](./img/13.png)

总所周知，色彩差异包括色品差异和亮度差异两部分，然而上式只考虑到了色品差异，因此，我们提出了两个像素点 `q1`、`q2` 的色彩距离：

![14](./img/14.png)

其中，`Q(q1, q2)` 和 `I(q1, q2)` 分别表示了 `q1` 和 `q2` 之间的色品和亮度差异，另外，我们使用 `t [0, 1]` 来为两个差异值加权，最终得到两个像素点之间的色彩距离。`I(q1, q2)` 可以被一般化表示成：

 ![15](./img/15.png)

 其中 `ki (i=1, 2, 3)` 代表了 `R`、`G`、`B` 三个通道分别对图像亮度的贡献强度，这里，我们设置它们为 `k1 = k2 = k3 = 1 / 3` 或者 `k1 = 0.299, k2 = 0.587, k3 = 0.114`

## 彩色图像梯度算法
一副彩色图像可以表示成如下四元数的形式：

![16](./img/16.png)

随意给定一个用于表示方向的角度 `Φ`，从这个方向上考虑，图像 `f(x,y)` 在点 `(x,y)` 上的块局部色彩变化可以表示成如下公式：

![17](./img/17.png)

使用第一种局部微分近似法可以得到：

![18](./img/18.png)

其中：

![19](./img/19.png)

![20](./img/20.png)

![21](./img/21.png)

**定理**：将一张图片 `f(x, y)` 表示成 `(R(x, y), G(x, y), B(x, y))`，从角度 `Φ` 上考虑，则同时考虑到色品和亮度，局部对比度可以写成：

![22](./img/22.png)

![23](./img/23.png)

求其最大值有：

![24](./img/24.png)

![25](./img/25.png)

![26](./img/26.png)

可以发现 `Φmax` 的区间有着如下规律：

![27](./img/27.png)