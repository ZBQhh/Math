/* ==
   FILE: chapters/chapter02.js
   描述: 第2章 随机变量及其分布
   == */
chapter('随机事件和概率')
  .text(`随机事件是样本空间的子集,这种表达方式对于全面描述和研究随机现象的统计规律性具有很大的局限性,并且不利于其他数学工具的运用,本章引人随机变量和分布函数的概念,随机变量提供了用数值描述随机事件的方法,分布函数给出了随机变量取值规律性的一种表示,这些概念在概率论和数理统计中起着基本的作用,本章先学习离散型随机变量．`)
  .section('随机变量')
  .text(`概率论的基本任务就是研究随机变量取值的统计规律性.`)
    .definition('随机变量', `
      设$\\Omega$为某一随机试验的样本空间,如果对于每一个样本点$\\omega\\in\\Omega$,有一个实数$X(\\omega)$与之对应,这样就定义了一个定义域为$\\Omega$的实值函数$X=X(\\omega)$,称之为随机变量.
    `)
    .remark('', `
      <ol>
        <li>通常,用$X, Y, Z$等表示随机变量.</li>
        <li>事实上,$X$是一个随机函数,它的定义域为样本空间,自变量为样本点；$X$的取值有随机性,在未做试验之前,我们并不知道此次试验会出现哪个样本点,因此也不知道$X$的取值为哪个实数.</li>
      </ol>
      随机事件可用随机变量的某个取值或某些取值所满足的等式、不等式来描述,从而随机事件的概率就可以表示为随机变量取不同值的概率.
    `)
  .section('离散型随机变量及其分布律')
    .definition('离散型随机变量', `
      如果随机变量$X$的全部可能的取值是有限个或可列无穷多个,亦即它的值为$x_{1},x_{2},\\cdots,x_{n}$或$x_{1},x_{2},x_{3},\\cdots$,则称$X$为离散型随机变量.对于离散型随机变量,只要知道它的所有可能的取值,以及它取这些值的概率,便完全掌握了这个随机变量.
    `)
    .text( `
      设$X$为离散型随机变量,它的所有可能取值为$x_{k}$,令
      $$p_{k}=P\\{\\omega:X(\\omega)=x_{k}\\},\\quad(k=1,2,\\cdots)$$
      表示$X(\\omega)=x_{k}$的概率.简写为$(X=x_{k})$或$\\{X=x_{k}\\}$.由概率的性质易知：
      <ul>
        <li>（非负性）$p_{k}>0\\quad $</li>
        <li>（规范性）$\\sum_{k=1}^{\\infty} p_{k}=1 \\quad $    </li>
      </ul>
      称满足上式的$\\{p_{k}\\}$为随机变量$X$的分布律.它们也可以用下表来表示.
      
    `)
    .text(`
$$
\\begin{array}{c|cccc}
\\hline
X & x_1 & x_2 & \\cdots & x_n \\\\
\\hline
P & p_1 & p_2 & \\cdots & p_n \\\\
\\hline
\\end{array}

$$

`)
    .text(`下面介绍三种最重要的离散型随机变量及其分布.`)
  .subsection('两点分布')
  
    .definition('两点分布（$0-1$分布）', `
      若随机变量$X$只能取$0$和$1$这两个值,且它的分布律为
      $$P\\{X=1\\}=p,\\quad P\\{X=0\\}=1-p,\\quad 0 < p < 1$$
      则称$X$服从参数为$p$的两点分布或0-1分布,可将上面两个式子合并成一个表达式
      $$P\\{X=k\\}=p^{k}(1-p)^{1-k},\\quad k=0,1,0 < p < 1.$$
      其表格形式如表所示.
    `)
    .text(`$$
\\begin{array}{c|cc}
\\hline
X & 0 & 1 \\\\
\\hline
P & 1-p & p \\\\
\\hline
\\end{array}
$$`)
    .subsection('二项分布')
    .definition('二项分布', `
      若随机变量$X$的分布律为
      $$P\\{X=k\\}=C_{n}^{k}p^{k}(1-p)^{n-k},\\quad k=0,1,2,\\cdots, n;$$
      则称$X$服从参数为$n,p$的二项分布,记为$X\\sim B(n,p)$,$0 < p < 1$.
    `)
    .text(`
      <ol>
        <li>特别地,当$n=1$时,二项分布即为两点分布,可记为$B(1,p)$.</li>
        <li>通常记$q=1-p$,则有
        $$P\\{X=k\\}=C_{n}^{k}p^{k}q^{n-k},\\quad k=0,1,2,\\cdots, n.$$
        它恰好是二项式$(p+q)^{n}$的展开式中的第$k+1$项,这正是二项分布名称的由来.</li>
      </ol>
    `)
    .property('二项分布的性质', `
      <ol>
        <li>（非负性）$$P\\{X=k\\}=C_{n}^{k}p^{k}q^{n-k}>0,\\quad k=0,1,2,\\cdots,n$$</li>
        <li>（规范性）$$\\sum\\limits_{k=0}^{n}P\\{X=k\\}=\\sum\\limits_{k=0}^{n}C_{n}^{k}p^{k}q^{n-k}=(p+q)^{n}=1.$$</li>
      </ol>
      显然,二项分布中计算概率$P\\{X=k\\}$的公式与$n$次独立重复试验中事件$A$发生$k$次的概率$p_{n}(k)$是完全相同的.
    `)
    .subsection('泊松分布')
    .definition('泊松(Poisson)分布', `
      若随机变量$X$的分布律为
      $$P\\{X=k\\}=\\frac{\\lambda^{k}}{k!}e^{-\\lambda},\\quad k=0,1,2,\\cdots,\\lambda>0,$$
      则称$X$服从参数为$\\lambda$的泊松(Poisson)分布,记为$X\\sim P(\\lambda)$.
    `)
    .property('泊松分布的性质', `
      容易验证它满足分布律的两条性质：
      <ol>
        <li>（非负性）$$P\\{X=k\\}=\\frac{\\lambda^{k}}{k!}e^{-\\lambda}>0,\\quad k=0,1,2,\\cdots,\\lambda>0$$</li>
        <li>（规范性）$$\\sum\\limits_{k=0}^{\\infty}P\\{X=k\\}=\\sum\\limits_{k=0}^{\\infty}\\frac{\\lambda^{k}}{k!}e^{-\\lambda}=e^{\\lambda}e^{-\\lambda}=1.$$</li>
      </ol>
    `)
    .theorem('泊松定理', `
      在$n$次独立的重复试验中,事件$A$在一次试验中出现的频率为$p_n$(与试验总数$n$有关),如果当$n \\to \\infty$时,有$np_n \\to \\lambda(\\lambda>0$为常数),则
      $$\\lim_{n \\to \\infty} C_n^{k} p_n^{k}(1-p_n)^{n-k} = \\frac{\\lambda^{k}}{k!}e^{-\\lambda},\\quad k=0,1,2,\\cdots.$$
    `)
    .remark('', `
      <ol>
        <li>由定理知,当$n$充分大时,令$\\lambda=np$（为保证计算的精确度,还要求$\\lambda=np$不太大）,则有如下的泊松近似公式：
        $$C_n^{k} p^{k}(1-p)^{n-k} \\approx \\frac{\\lambda^{k}}{k!}e^{-\\lambda},\\quad k=0,1,2,\\cdots,\\lambda=np.$$</li>
        <li>在实际计算中,若$X \\sim B(n,p)$,当$n \\geqslant 10$,$p \\leqslant 0.1$时均可用泊松分布近似计算其概率,当$n \\geqslant 100$,$np \\leqslant 10$时,效果更佳.</li>
      </ol>
    `)
  .subsection('几何分布')
    .definition('几何分布 $G(p)$', `
      从一批次品率为$p(0 < p < 1)$的产品中逐个随机抽取产品进行检验,验后放回再抽取下一件,直到抽到次品为止.设检验的次数为$X$,则$X$可能取的值为$1,2,3,\\cdots$,其概率分布为
      $$P\\{X=k\\}=(1-p)^{k-1}p,\\quad k=1,2,\\cdots,$$
      称这种概率分布为几何分布,记为$X \\sim G(p)$.
      
    `)
    .text(`几何分布的意义是,在伯努利试验中,每次试验成功的概率为$p$,则获得首次成功所需试验次数$X$服从几何分布.`)
  .subsection('超几何分布')
    .definition('超几何分布 $H(n,M,N)$', `
      设一批产品共有$N$个,其中$M$个次品,现从中任取$n$个$(n \\le N-M)$,则这$n$个产品中所含的次品数$X$是一个离散型随机变量,$X$所有可能的取值为$0,1,2,\\cdots,j$,其中$j=\\min\\{M,n\\}$,其概率分布为
      $$P\\{X=k\\}=\\frac{C_{M}^{k}C_{N-M}^{n-k}}{C_{N}^{n}},\\quad k=0,1,2,\\cdots, j; j=\\min\\{M,n\\},$$
      称为超几何分布,记作$X \\sim H(n,M,N)$.
    `)
    .remark('', `
      超几何分布与二项分布很相似,这两个概率分布的主要区别在于：超几何分布中的各次试验不是独立的,而且各次试验中成功的概率不等.超几何分布可以简单地理解为不放回抽样的问题,二项分布可以理解为有放回抽样问题.当$n \\ll N$时,即抽取个数$n$远小于总数$N$时,每次抽取后,总体中不合格品率$p=M/N$改变甚微,所以不放回抽样可以近似地看成有放回抽样,这时超几何分布可用二项分布近似,即
      $$\\frac{C_{M}^{k}C_{N-M}^{n-k}}{C_{N}^{n}} \\approx C_{n}^{k}p^{k}(1-p)^{n-k},\\quad k=0,1,2,\\cdots, n,\\quad p=\\frac{M}{N}.$$
    `)
  .section('二维离散型随机变量及其分布')
  .subsection('联合分布律')
    .definition('二维随机变量（向量）', `
      给定一个随机试验,$\\Omega$是它的样本空间,如果对$\\Omega$中的每一个样本点$\\omega$,有一对有序实数$(X(\\omega),Y(\\omega))$与它对应,那么就把这样一个定义域为$\\Omega$,取值为$(X,Y)=(X(\\omega),Y(\\omega))$的变量称为二维随机变量(向量).
    `)
    .text(`
      如果二维随机变量$(X,Y)$所有可能取值是有限对或可数无限对,则称$(X,Y)$是二维离散型随机变量.
    `)
    .text( `
      设二维离散型随机变量$(X,Y)$所有可能取值为$(x_i, y_j), i,j=1,2,\\cdots$,记
      $$P\\{X=x_i, Y=y_j\\}=p_{ij},\\quad i,j=1,2,\\cdots,$$
      则由概率的定义有
      $$p_{ij} \\geqslant 0,\\quad \\sum_{i=1}^{+\\infty}\\sum_{j=1}^{+\\infty} p_{ij}=1.$$
      称$P\\{X=x_i, Y=y_j\\}=p_{ij}, i,j=1,2,\\cdots$为二维离散型随机变量$(X,Y)$的分布律,或称为随机变量$X$和$Y$的联合分布律.
    `)
    .text(`联合分布律可用下表表示.
      `)
      .text(`$$
\\begin{array}{c|ccccc}
\\hline
Y\\backslash X & x_1 & x_2 & \\cdots & x_i & \\cdots \\\\
\\hline
y_1 & p_{11} & p_{21} & \\cdots & p_{i1} & \\cdots \\\\
y_2 & p_{12} & p_{22} & \\cdots & p_{i2} & \\cdots \\\\
\\vdots & \\vdots & \\vdots &  & \\vdots &  \\\\
y_j & p_{1j} & p_{2j} & \\cdots & p_{ij} & \\cdots \\\\
\\vdots & \\vdots & \\vdots &  & \\vdots &  \\\\
\\hline
\\end{array}
$$`)

  .subsection('边缘分布律')
    .definition('边缘分布律', `
      如果$(X,Y)$是离散型的随机变量,$p_{ij}=P\\{X=x_i, Y=y_j\\}$,则称
      $$P\\{X=x_i\\}=\\sum_{j=1}^{\\infty} p_{ij}=p_{i \\cdot}$$
      为随机分量$X$的边缘分布律.同理,称
      $$P\\{Y=y_j\\}=\\sum_{i=1}^{\\infty} p_{ij}=p_{\\cdot j}$$
      为随机分量$Y$的边缘分布律.边缘分布律与联合分布律的关系可用表描述.
      
    `)
    .text(`$$
\\begin{array}{c|ccccc|c}
\\hline
Y\\backslash X & x_1 & x_2 & \\cdots & x_i & \\cdots & P\\{Y=y_j\\}=p_{\\cdot j} \\\\
\\hline
y_1 & p_{11} & p_{21} & \\cdots & p_{i1} & \\cdots & \\sum_{i=1}^{\\infty} p_{i1} \\\\
y_2 & p_{12} & p_{22} & \\cdots & p_{i2} & \\cdots & \\sum_{i=1}^{\\infty} p_{i2} \\\\
\\vdots & \\vdots & \\vdots &  & \\vdots &  &  \\\\
y_j & p_{1j} & p_{2j} & \\cdots & p_{ij} & \\cdots & \\sum_{i=1}^{\\infty} p_{ij} \\\\
\\vdots & \\vdots & \\vdots &  & \\vdots &  &  \\\\
\\hline
P\\{X=x_i\\}=p_{i\\cdot}
& \\sum_{j=1}^{\\infty} p_{1j}
& \\sum_{j=1}^{\\infty} p_{2j}
& \\cdots
& \\sum_{j=1}^{\\infty} p_{ij}
& \\cdots
& 1 \\\\
\\hline
\\end{array}
$$
`)
  .section('随机变量的独立性与条件分布')
  .text(`在多维随机变量中,各分量的取值有时会相互影响,有时也会毫无影响．譬如一个人的身高$X$和体重$Y$就会相互影响,但对考试成绩 $Z$一般无影响．当两个随机变量的取值互不影响时,就称它们是相互独立的．`)
    .definition('二维离散型随机变量相互独立', `
      设二维离散型随机变量$(X,Y)$的联合概率分布为
      $$P\\{X=x_{i}, Y=y_{j}\\}=p_{i j},\\quad i, j=1,2, \\cdots,$$
      如果联合概率函数恰为两个边缘概率函数的乘积,即
      $$p_{i j}=p_{i \\cdot} p_{\\cdot j},\\quad i, j=1,2, \\cdots,$$
      那么,称随机变量$X$与$Y$相互独立.
    `)
    .definition('$n$个随机变量相互独立', `
      如果$n$维随机变量$(X_{1},X_{2},\\cdots,X_{n})$的联合概率函数恰为$n$个边缘概率函数的乘积,即对$X_{i}$的值域中任意一个值$x_{i},i=1,\\cdots,n$,总有
      $$P\\{X_{1}=x_{1},\\cdots, X_{n}=x_{n}\\}=\\prod_{i=1}^{n} P\\{X_{i}=x_{i}\\}$$
      那么,称$n$个随机变量$(X_{1},X_{2},\\cdots,X_{n})$相互独立.
    `)
    .definition('二维离散随机变量的条件分布律', `
      设$(X,Y)$是二维离散随机变量,对于固定的$j$,若$P\\{Y=y_{j}\\}>0$,则称
      $$P\\{X=x_{i}\\mid Y=y_{j}\\}=\\frac{P\\{X=x_{i},Y=y_{j}\\}}{P\\{Y=y_{j}\\}}=\\frac{p_{ij}}{p_{\\cdot j}},\\quad i=1,2,\\cdots$$
      为在$Y=y_{j}$条件下随机变量$X$的条件分布律.同样,对于固定的$i$,若$P\\{X=x_{i}\\}>0$,则称
      $$P\\{Y=y_{j}\\mid X=x_{i}\\}=\\frac{P\\{X=x_{i},Y=y_{j}\\}}{P\\{X=x_{i}\\}}=\\frac{p_{ij}}{p_{i\\cdot}},\\quad j=1,2,\\cdots,\\qquad(2.4.2)$$
      为在$X=x_{i}$条件下随机变量$Y$的条件分布律.
    `)
  .section('随机变量函数的分布')
  .text(`在实际应用领域中，很多随机变量之间具有函数关系，如果随机变量$X$具有某种分布率，如何求出$x$的函数$Y=g(X)$的分布？本节的内容就是介绍根据随机变量$X$的概率分布，求其函数$Y=g(X)$的概率分布的方法．`)
