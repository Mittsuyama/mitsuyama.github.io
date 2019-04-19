MathJax 写公式
Mathematic | Computer | Note
粗略地列了一些常用的 MathJax 常用表达，文章摘自 http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference。 未完成。
2018-10-6



## 快速入门

如何打出下面这个式子？
$$
\sum_{y = 0}^{\infty}\lim_{x \to 0}\left(\sqrt{\frac{\alpha x}{\beta y}} + 1\right)^{e + 2} \left(\overrightarrow{AB} \cdot \overrightarrow{CD}\right)
$$

### 开始

你需要有一个**支持 MathJax 的软件**，这里推荐几个 Markdown 软件，它们都内置 MathJax。

[Typora](https://typora.io/)：Typora，所见即所得，全平台支持，最出名的免费的 Markdown 工具，功能完备，界面好看。

[Cmd Markdown](https://zybuluo.com/)：Cmd Markdown 编辑阅读器，同样全平台支持支持实时同步预览，区分写作和阅读模式，支持在线存储，分享文稿网址。



首先你要**告诉编辑器**你打的是数学公式。

**行间公式**，用四个 Dollar 符 *\$* 框起来，像这样：

```mathematica
$$
\sqrt{x + y} + 1
$$
```

效果:
$$
\sqrt{x + y} + 1
$$

如果想在一行之间打公式，请用**行内公式**，两个 Dollar 符  *\$* 把内容框起来。

像这样：*\$\sqrt{x + y} + 1\$*，效果：$\sqrt{x + y} + 1$，（typora 可能需要在设置中打开行内公式）

### 求和

##### 符号

第一个是求和符号，MathJax 中各种符号都用**反斜杠**开头 *\*，求和则是 *\sum*：

*\sum*，*\prod*，*\int*，*\iint*，*\bigcup*，*\bigcap*

$\sum$，$\prod$，$\int$，$\iint$，$\bigcup$，$\bigcap$

##### 上下限

MathJax 中上下限和角标的表示方法相同：

*X_0^2*：$X_0^2$

*\sum_0^2*：$\sum_0^2​$

当输入的是行间公式时，求和等符号的角标就会挪到正上下方：
$$
\sum_0^2 \quad \prod_0^2 \quad \bigcup_0^2 \quad \int_0^2
$$

#### 请注意

1. 当角标的长度大于 $1$ 时，请用 *{…}* 来表示它们是一组公式。
   - 比如，*X_{i + j}^e*：$X_{i + j}^e$，否则，*X_i + j^e*：$X_i + j^e$
2. MathJax 会忽略你打的所有空格。
   - 想打空格怎么办，*a\,b*， *a\;b* ，*a\quad b*， *a\qquad b*：$a \, b$，$a \; b$，$a \quad b$，$a \qquad b$

### 极限

**极限符号**，*\lim*：$\lim$

$x$ **趋近于** $0$：*x \to 0*：$x \to 0$；用 *\to* 来表示趋向箭头。

所以组合：*\lim_{x \to 0}*：$\lim_{x \to 0}$，类似的，如果是行间公式，$x \to 0$ 会挪到正下方。

##### 箭头符号

介绍一些其他的常用箭头。

*\to*, *\rightarrow*, *\leftarrow*, *\Rightarrow*, *\Leftarrow*, *\mapsto*, *\iff*

$\to$, $\rightarrow$, $\leftarrow$, $\Rightarrow$, $\Leftarrow$, $\mapsto$, $\iff$

### 开根、分数、希腊字母、括号

接下来是中间的一部分：

$$
\left(\sqrt{\frac{\alpha x}{\beta y}} + 1\right)^{e + 2}
$$
代码:

```markdown
\left(\sqrt{\frac{\alpha x}{\beta y}} + 1\right)^{e + 2}
```

我们一个一个来看。

##### 算术平方根

*\sqrt{x^3}*：$\sqrt{x^3}$

当然也能开其他次根，用 *[…]* 表示：*\sqrt[n]{x^3}*：$\sqrt[n]{x^3}​$

##### 分数

分数也非常的简单，*\frac{a}{b}*：$\frac{a}{b}$

分数里面也能套分数，*\frac{\frac{a}{b}}{c}*：$\frac{\frac{a}{b}}{c}​$，但是这样太不美观，建议 *\frac{a / b}{c}*：$\frac{a / b}{c}​$

##### 希腊字母

希腊字母同样用反斜杠 *\* 开头表示，后接名称，比如，*\alpha*：$\alpha$，*\beta*，$\beta$，*\sigma*：$\sigma​$

首字母大写表示大写字母，比如，*\Gamma*：$\Gamma$，*\Delta*：$\Delta$

`请注意`：有些希腊字母就是**英文大写字母**，比如不存在 *\Alpha* 这样的语法，请用 *A*。

下面是希腊字母表：

![image-20190328115855058](../img/mathjax/image-20190328115855058.png)

#### 括号

普通的括号 *()[]{}<>* 都在键盘上，这里讲的是一些特殊括号。

##### 自适应括号

我们发现：*(\sqrt{\frac{a}{b}})*：$(\sqrt{\frac{a}{b}})$ 并不是很美观。

可以修改为自适应括号来优化，用 *\left( … \right)* 将内容括起来，*\left(\sqrt{\frac{a}{b}}\right)*：$\left( \sqrt{\frac{a}{b}} \right)$

当然你也可以自己选择**不同大小的括号**：

*\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)*：$\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)$

##### 其他特殊括号

更好看的尖括号，*\langle x \rangle*：$\langle x \rangle$

向上取整：*\lceil x \rceil* ：$\lceil x \rceil$

向下取整：*\lfloor x \rfloor*： $\lfloor x \rfloor$


## 最常用的那些表达

- **上标** ：*e^{x}*：$e^{x}$
- **下标**：*a{1}*：$a_{1}$
- **分数**：*\frac{1}{x}*：$\frac{1}{x}$
- **希腊字母**：首字母大小写即改变希腊字母大小写（注意一些希腊字母的大写就是英文字母）
  - *\alpha*：$A$，$\alpha$
  - *\beta*：$B​$，$\beta​$
  - *\gamma*：$\Gamma​$，$\gamma​$
- **不同长度的空格**（MathJax 会忽略掉空格）：*\, \; \quad \qquad*：$a \, b$，$a \; b$，$a \quad b$，$a \qquad b$



## 符号

### 括号

- **大括号**：*\{* ：$\{$
- **双竖线**：*\Vert* ：$\Vert$
- **更好看的尖括号**：*\langle x \rangle* ：$\langle x \rangle$ 
- **向上取整**：*\lceil x \rceil* ：$\lceil x \rceil$
- **向下取整**：*\lfloor x \rfloor*： $\lfloor x \rfloor$
- **括号的自动调整**：*\left(  ... \right)*
  - 例如，*\frac{\sqrt x}{y^3}* ：$(\frac{\sqrt x}{y^3})​$ ，括号看起来很奇怪，*\left(\frac{\sqrt x}{y^3}\right)*： $\left(\frac{\sqrt x}{y^3}\right)​$
  - 疯狂的括号套括号 *\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)*：$\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)$

### 常用运算运算符号

- **大小关系**：*\lt \gt \le \ge \neq*：$\lt \; \gt \; \le \; \ge \; \neq$
  - 可以在前面添加 *\not*：*\not\lt*：$\not\lt$，但并不优美
- **四则运算**：*\times \div \pm \mp \cdot*： $\times \; \div \; \pm \; \mp \; \cdot$
- **集合**：
  - *\setminus \subset \subseteq \subsetneq \supset \supseteq*： $\setminus  \; \subset \; \subseteq \; \subsetneq \; \supset \; \supseteq$
  - *\cup \cap* ： $\cup \; \cap $
  - *\in \notin \emptyset \varnothing*：$\in \; \notin \; \emptyset \; \varnothing$
- **组合数**：*\binom{n+1}{2k}* ：$\binom{n+1}{2k}​$
- **和与积分**：*\sum* $\sum$，*\prod* $\prod$，*\int* $\int$，*\iint* $\iint$，*\bigcup* $\bigcup$，*\bigcap* $\bigcap$
- **根号**：*\sqrt{x^3}*：$\sqrt{x^3}$
  - *\sqrt[3]{\frac xy}*：$\sqrt[3]{\frac xy}$
- **极限**：*\lim{x\to 0}*：$\lim_{x\to 0}​$

### 表达式符号

- **箭头**：*\to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto*： $\to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto$
- *\land \lor \lnot \forall \exists \top \bot \vdash \vDash*：$\land \lor \lnot \forall \exists \top \bot \vdash \vDash$
- *\star \ast \oplus \circ \bullet*：$\star \ast \oplus \circ \bullet$
- **等号**：*\approx \sim \simeq \cong \equiv \prec \lhd \therefore*：$\approx \sim \simeq \cong \equiv \prec \lhd \therefore$
  - 取模恒等：*a \equiv b\pmod n*：$a \equiv b\pmod n$

### 其他符号

- *\chi \infty \aleph_0*：$\chi \; \infty \; \aleph_0$
- *\nabla \partial*：$\nabla \partial$
- *\Im \Re*：$\Im \Re$
- *\ldots*：$\ldots$
  - 比如：*a{1} + a{2} + \ldots + a{n}*：$a_{1} + a_{2} + \ldots + a_{n}$
- Geek letters：*\epsilon \varepsilon*：$\epsilon \; \varepsilon$，*\phi \varphi*：$\phi \; \varphi$，*\ell* ：$\ell$
- *\LaTeX*：$\LaTeX$
- *\hat{xx}*：$\hat{x}$，*\widehat{xy}*：$\widehat{xy}$，*\bar{}*，$\bar{x}$，，*\overline{xyz}*：$\overline{xyz}$，
- *\vec{x}*：$\vec{x}$，*\overrightarrow{xy}*：$\overrightarrow{xy}$，*\overleftrightarrow{xy}*：$\overleftrightarrow{xy}$，*\dot{x}*：$\dot{x}$，*\ddot{x}*：$\ddot{x}$
- *\flat \sharp*：$\flat \quad \sharp$

## 格式

### 常用表达格式

- *\text{…}* 文字说明：$\{x \in s | \text{x is extra large}\}$

### 矩阵

**注意**：块级公式记得用 `\\` 表示换行

```
\begin{matrix}
1 & x & x^2 \\
1 & y & y^2 \\
1 & z & z^2 \\
\end{matrix}
```

- 效果：

$$
\begin{matrix}
    1 & x & x^2 \\
    1 & y & y^2 \\
    1 & z & z^2 \\
\end{matrix}
$$

- 还有跟多的括号形式：`pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix`
  - 效果：$\begin{pmatrix}1 & x & x^2 \\1 & y & y^2 \\1 & z & z^2 \\\end{pmatrix}$, $\begin{bmatrix}1 & x & x^2 \\1 & y & y^2 \\1 & z & z^2 \\\end{bmatrix}$, $\begin{Bmatrix}1 & x & x^2 \\1 & y & y^2 \\1 & z & z^2 \\\end{Bmatrix}$, $\begin{vmatrix}1 & x & x^2 \\1 & y & y^2 \\1 & z & z^2 \\\end{vmatrix}$, $\begin{Vmatrix}1 & x & x^2 \\1 & y & y^2 \\1 & z & z^2 \\\end{Vmatrix}$
- 使用 `cdots`, $\cdots$, `\ddots`, $\ddots$, `\vdots`, $\vdots$ 来表示省略内容：
  - 效果：

$$
\begin{pmatrix}
    1 & a_1 & a_{1}^{2} & \cdots & a_{1}^{n} \\
    1 & a_{2} & a_{2}^{3} & \cdots & a_{2}^{n} \\
    \vdots & \vdots & \vdots & \ddots & \vdots \\
    1 & a_{m} & a_{m}^{2} & \cdots & a_{m}^{n} \\
\end{pmatrix}
$$

- 代码分块（垂直）：`{cc | ccc}`

```
\left[
\begin{array}{cc|c}
  1&2&3\\
  4&5&6
\end{array}
\right]
```

- 效果：

$$
\left[
\begin{array}{cc|c}
  1&2&3\\
  4&5&6
\end{array}
\right]
$$



- 代码分块（水平）

```
\begin{pmatrix}
a & b\\
c & d\\
\hline
1 & 0\\
0 & 1
\end{pmatrix}
```

- 效果：

$$
\begin{pmatrix}
    a & b\\
    c & d\\
  \hline
    1 & 0\\
    0 & 1
  \end{pmatrix}
$$



- 小号矩阵：

```
$\bigl(\begin{smallmatrix} ... \end{smallmatrix}\bigr)$
```

- 效果： $\bigl( \begin{smallmatrix} a & b \\ c & d \end{smallmatrix} \bigr)$

### 对齐

```
\begin{align}
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\
 & = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}} \\ 
 & = \sqrt{\frac{73^2}{12^2}}\sqrt{\frac{73^2-1}{73^2}} \\
 & = \frac{73}{12}\sqrt{1 - \frac{1}{73^2}} \\ 
 & \approx \frac{73}{12}\left(1 - \frac{1}{2\cdot73^2}\right)
\end{align}
```



- 效果：

$$
\begin{align}
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\
 & = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}} \\ 
 & = \sqrt{\frac{73^2}{12^2}}\sqrt{\frac{73^2-1}{73^2}} \\
 & = \frac{73}{12}\sqrt{1 - \frac{1}{73^2}} \\ 
 & \approx \frac{73}{12}\left(1 - \frac{1}{2\cdot73^2}\right)
\end{align}
$$





```
f(n) =
\begin{cases}
n/2,  & \text{if $n$ is even} \\
3n+1, & \text{if $n$ is odd}
\end{cases}
```

 

- 效果：

$$
f(n) =
\begin{cases}
n/2,  & \text{if $n$ is even} \\
3n+1, & \text{if $n$ is odd}
\end{cases}
$$

```
\left.
\begin{array}{l}
\text{if $n$ is even:}&n/2\\
\text{if $n$ is odd:}&3n+1
\end{array}
\right\}
=f(n)
```



- 效果：

$$
\left.
\begin{array}{l}
\text{if $n$ is even:}&n/2\\
\text{if $n$ is odd:}&3n+1
\end{array}
\right\}
=f(n)
$$









## 字体

- 空心：`\mathbb` $\mathbb{ABCDEFGHIJKLMNOPQRSTUVWXYZas}$
- 特技加粗：`\mathbf` $\mathbf{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 老式打字机：`\mathtt` $\mathtt{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 罗马文字：`\mathrm` $\mathrm{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 无衬线：`\mathsf` $\mathsf{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 书法：`\mathcal` $\mathcal{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 花体：`\mathscr` $\mathscr{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 老式德国字体：`\mathfrak` $\mathfrak{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$

[手绘你想输入的符号](http://detexify.kirelabs.org/classify.html)