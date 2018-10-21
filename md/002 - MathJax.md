Markdown 上一些 MathJax
Mathematics
粗略地列了一些常用的 MathJax 公式 —— 未完成
2018-10-6

# Markdown 上一些 MathJax 语法

Tag: `数学`

[TOC]



[如果想知道一些符号的书写这里却没有，点这里！！！](http://detexify.kirelabs.org/classify.html)

使用 `\$ xxx \$` 来书写行间数学公式，左右各两个 `\$` 表示行间数学公式

## 简单的表达

- 上标 ： `e^{x}` $e^{x}$
- 下标： `a_{1}` $a_{1}$
- 分数： `\frac{1}{x}` $\frac{1}{x}$
- 换行： `\\`
- `\alpha, \beta, …, \omega`：$\alpha, \beta, …, \omega$，`\Gamma, \Delta, …, \Omega`：$\Gamma, \Delta, …, \Omega$
- 空格：`\, \; \quad \qquad`：$a \, b$，$a \; b$，$a \quad b$，$a \qquad b$

## 符号

### 括号

- 圆括号，绝对值，中括号键盘上
- 花括号：`\{` ：$\{$
- 双竖线：`\Vert` ：$\Vert$
- 不同于键盘上的尖括号：`\langle x \rangle` ：$\langle x \rangle$ 
- 向上取整：`\lceil x \rceil` ：$\lceil x \rceil$
- 向下取整：`\lfloor x \rfloor`： $\lfloor x \rfloor$
- 括号的自动调整：`\left(` ... \right)`
  - 例如，`\frac{\sqrt x}{y^3}` $(\frac{\sqrt x}{y^3})$ ，括号看起来很奇怪，`\left(\frac{\sqrt x}{y^3}\right)`： $\left(\frac{\sqrt x}{y^3}\right)$
  - 疯狂的括号套括号 `\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)`：$\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)$

### 运算符号

- 大小关系：`\lt \gt \le \ge \neq`： $\lt \; \gt \; \le \; \ge \; \neq$
  - 可以在前面添加 `\not`：`\not\lt` $\not\lt$，但并不优美
- 四则运算：`\times \div \pm \mp \cdot`： $\times \; \div \; \pm \; \mp \; \cdot$
- 集合：
  - `\setminus \subset \subseteq \subsetneq \supset \supseteq` ： $\setminus \subset \subseteq \subsetneq \supset \supseteq$
  - `\cup \cap` ： $\cup \cap $
  - `\in \notin \emptyset \varnothing`：$\in \notin \emptyset \varnothing$
- 组合数：\binom{n+1}{2k} ：$\binom{n+1}{2k}$
- 和与积分：`\sum` $\sum$，`\prod` $\prod$，`\int` $\int$ `\iint` $\iint$，`\bigcup` $\bigcup$ `\bigcap` $\bigcap$
- 根号：`\sqrt{x^3}`：$\sqrt{x^3}$
  - `\sqrt[3]{\frac xy}`：$\sqrt[3]{\frac xy}$
- 极限：`\lim_{x\to 0}`：$\lim_{x\to 0}$

### 表达式符号

- 箭头：`\to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto` ： $\to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto$
- `\land \lor \lnot \forall \exists \top \bot \vdash \vDash`：$\land \lor \lnot \forall \exists \top \bot \vdash \vDash$
- `\star \ast \oplus \circ \bullet`：$\star \ast \oplus \circ \bullet$
- 等号：`\approx \sim \simeq \cong \equiv \prec \lhd \therefore`：$\approx \sim \simeq \cong \equiv \prec \lhd \therefore$
  - 取模恒等：`a \equiv b\pmod n`：$a \equiv b\pmod n$

### 其他符号

- `\chi \infty \aleph_0`：$\chi \; \infty \; \aleph_0​$
- `\nabla \partial`：$\nabla \partial$
- `\Im \Re`：$\Im \Re$
- `\ldots`：$\ldots$
  - 比如：`a_{1} + a_{2} + \ldots + a_{n}`：$a_{1} + a_{2} + \ldots + a_{n}$
- Geek letters：`\epsilon \varepsilon`：$\epsilon \; \varepsilon$，`\phi \varphi`：$\phi \; \varphi$，`\ell` ：$\ell$
- `LaTeX`：$\LaTeX$
- `\hat{xx}`：$\hat{x}$，`\widehat{xy}`：$\widehat{xy}$，`\bar{}`，$\bar{x}$，，`\overline{xyz}`：$\overline{xyz}$，
- `\vec{x}`：$\vec{x}$，`\overrightarrow{xy}`：$\overrightarrow{xy}$，`\overleftrightarrow{xy}`：$\overleftrightarrow{xy}$，`\dot{x}`：$\dot{x}$，`\ddot{x}`：$\ddot{x}$
- `\flat \sharp`：$\flat \quad \sharp$

## 格式

### 常用表达格式

- `\text{…}` 文字说明：$\{x \in s | \text{x is extra large}\}$

### 矩阵

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









##字体

- 空心：`\mathbb` $\mathbb{ABCDEFGHIJKLMNOPQRSTUVWXYZas}$
- 特技加粗：`\mathbf` $\mathbf{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 老式打字机：`\mathtt` $\mathtt{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 罗马文字：`\mathrm` $\mathrm{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 无衬线：`\mathsf` $\mathsf{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 书法：`\mathcal` $\mathcal{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 花体：`\mathscr` $\mathscr{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
- 老式德国字体：`\mathfrak` $\mathfrak{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
