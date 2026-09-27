# Block 6. Combinatorics and enumeration

## Question 30. Selections and their types. Rules of combinatorics.

**In plain words**: Combinatorics answers the question "how many objects of this kind exist". Almost everything rests on two rules: if an object is assembled from independent parts, the numbers of options multiply; if the options split into disjoint classes, the numbers add. For CTF this is the language of estimating a search space: a password of length $k$ over an alphabet of size $n$ gives $n^k$ options, that is $k\log_2 n$ bits of entropy, and this is exactly how the cost of a full search is measured.

**Definitions**:
- Selection (choice scheme): from a fixed $n$-element set one chooses $k$ elements; four independent features are distinguished: whether order matters and whether repetitions are allowed.
- Sum rule: if $A\cap B=\emptyset$, then $|A\cup B|=|A|+|B|$; for overlapping sets the inclusion-exclusion formula is already needed.
- Product rule: $|A\times B|=|A|\cdot|B|$, generalized to $t$ independent steps: $|A_1|\cdots|A_t|$.

**Theorems and formulas**: table of the four kinds of selections of $n$ elements taken $k$ at a time:

| Order | Repetitions | Number of selections | What we count |
|---|---|---|---|
| matters | forbidden | $A_n^k=\dfrac{n!}{(n-k)!}=n(n-1)\cdots(n-k+1)$ | injections, arrangements |
| matters | allowed | $n^k$ | all functions $[k]\to[n]$ |
| does not matter | forbidden | $C_n^k=\dfrac{n!}{k!\,(n-k)!}$ | subsets |
| does not matter | allowed | $C_{n+k-1}^{k}$ | multisets, solutions of $x_1+\dots+x_n=k$ |

**Example**: alphabet of 62 symbols (lowercase, uppercase, digits), password of length 8: $62^8=218340105584896\approx 2{,}18\cdot10^{14}$ options, entropy $8\log_2 62\approx 47{,}6$ bits; at 1000 attempts per second a full search takes about 7000 years, so only a dictionary attack is a real threat.

**What the examiner may ask**:
- **State the product rule and the sum rule, where does the sum rule break?** The sum requires disjoint classes; otherwise inclusion-exclusion is needed.
- **How many subsets does an $n$-set have?** $2^n$; how many functions $[k]\to[n]$: $n^k$.

## Question 31. Arrangements, permutations, combinations, counting their number.

**In plain words**: The number of selections of each kind is obtained by its own trick. If order matters and repetitions are not allowed, the first element is chosen in $n$ ways, the second in $n-1$ and so on, and the product gives $A_n^k$; if all $n$ elements are ordered at once, we get $P_n=n!$. If order does not matter, the superfluous $k!$ orderings of one and the same subset are glued together, hence $C_n^k=A_n^k/k!$. When repetitions are allowed, one counts the codes of the distributions rather than the distributions themselves: a string of $k$ stars and $n-1$ bars gives $C_{n+k-1}^k$, and division by the factorials of the multiplicities removes identical orderings in $P(n_1,\dots,n_m)$.

**Definitions**:
- Arrangement without repetition $A_n^k$: an ordered selection of $k$ distinct elements out of $n$.
- Permutation $P_n$: an ordered selection of all $n$ elements, $P_n=A_n^n=n!$.
- Combination $C_n^k$: an unordered selection of $k$ distinct elements out of $n$.
- Combination with repetition: an unordered selection of $k$ elements, the elements may repeat (a multiset).
- Permutations with repetition: given $n$ items with multiplicities $n_1,\dots,n_m$ (that is, $n=\sum n_i$ items are split into $m$ sorts); the number of their distinct orderings is
$$P(n_1,\dots,n_m)=\frac{n!}{n_1!\,n_2!\cdots n_m!}.$$

**Theorems and formulas**:
- Number of arrangements: $A_n^k=\dfrac{n!}{(n-k)!}=n(n-1)\cdots(n-k+1)$: the first element is chosen in $n$ ways, the second in $n-1$ ways, ..., the $k$-th in $n-k+1$ ways, and the product gives $A_n^k$ (the product rule).
- Number of permutations: $P_n=A_n^n=n!$ (a permutation is an arrangement with $k=n$).
- Arrangements with repetition: $n^k$ (each of the $k$ elements is chosen from $n$ independently).
- Number of combinations: $C_n^k=\dfrac{n!}{k!\,(n-k)!}$: order is not taken into account, hence there are $k!$ times more ordered selections, $k!\,C_n^k=A_n^k$.
Basic identities: $C_n^k=C_n^{n-k}$; $C_n^k=\dfrac{n}{k}C_{n-1}^{k-1}$ (equivalently $kC_n^k=nC_{n-1}^{k-1}$, handy when computing); $C_n^k=C_{n-1}^{k-1}+C_{n-1}^{k}$ (Pascal's rule); $\sum_{k=0}^{n}C_n^k=2^n$. Relation between ordered and unordered: $A_n^k=k!\,C_n^k$, $A_n^k=0$ for $k>n$. The number of unordered selections with repetition is justified by the "stars and bars" method: a multiset is encoded by a string of $k$ stars and $n-1$ bars.

**Example**: choose 3 people out of 5 for a committee: $C_5^3=10$; seat 3 out of 5 in distinct chairs: $A_5^3=5\cdot4\cdot3=60$; hand out 3 identical postcards of 7 kinds: $C_{7+3-1}^{3}=C_9^3=84$; hand out 3 distinct postcards over 7 kinds with the recipient taken into account: $7^3=343$. Anagrams of a word of 13 letters where four letters repeat twice and the rest once: $13!/(2!)^4=389188800$.

**What the examiner may ask**:
- **How do arrangements differ from combinations?** By order; $A_n^k=k!\,C_n^k$, a subset of $k$ elements admits $k!$ orderings.
- **Why are there $C_{n+k-1}^k$ unordered selections with repetition?** A bijection with binary strings of $k$ stars and $n-1$ bars, $n+k-1$ positions in total, of which we choose the positions of the stars.

## Question 32. Pascal's triangle and its combinatorial meaning.

**In plain words**: Pascal's triangle is the table of binomial coefficients laid out so that every number equals the sum of the two numbers standing above it. This is not a mnemonic but a direct consequence of combinatorics: the $k$-subsets of an $n$-set split into those containing a distinguished element and those not containing it, whence Pascal's rule. The same picture yields the properties of a row (symmetry, unimodality, sum $2^n$) and the link with lattice paths: there are exactly $C_n^k$ paths from the apex of the triangle to the cell with the number $C_n^k$, and the shallow diagonals add up to Fibonacci numbers.

**Definitions**:
- Pascal's triangle: row number $n$ contains $C_n^0,C_n^1,\dots,C_n^n$; a row starts and ends with one, every inner number equals the sum of the two numbers standing above it.
- Lattice path: a path from $(0,0)$ to $(a,b)$ consisting of steps right and up.

**Theorems and formulas**:
- Pascal's rule $C_n^k=C_{n-1}^{k-1}+C_{n-1}^k$: the proof splits the $k$-subsets of an $n$-set into those containing a distinguished element ($C_{n-1}^{k-1}$) and those not containing it ($C_{n-1}^{k}$).
- Properties: symmetry $C_n^k=C_n^{n-k}$; unimodality, maximum at $k=\lfloor n/2\rfloor$; row sum $2^n$; diagonal sums $\sum_{k\ge0}C_{n-k}^{k}=F_{n+1}$ (Fibonacci numbers $1,1,2,3,5,8,\dots$); Vandermonde's identity $\sum_i C_a^iC_b^{k-i}=C_{a+b}^k$.
- Lattice interpretation: the number of paths in Pascal's triangle from the apex to $C_n^k$ equals $C_n^k$; the number of paths from $(0,0)$ to $(a,b)$ equals $C_{a+b}^{a}$.

**Example**: row $n=4$: $1,4,6,4,1$, sum $16=2^4$. Diagonal: $C_4^0+C_3^1+C_2^2=1+3+1=5=F_5$.

**What the examiner may ask**:
- **Why is $\sum_k C_n^k=2^n$?** Substitute $x=1$ into the binomial, or double count: every subset is picked out by its own set of zeros and ones.
- **How are Pascal's triangle and the Fibonacci numbers related?** Sums along shallow diagonals: $C_n^0+C_{n-1}^1+C_{n-2}^2+\dots=F_{n+1}$.
- **How are lattice paths related to binomial coefficients?** A path from $(0,0)$ to $(a,b)$ is a choice of $a$ places for the steps right among $a+b$ steps, so there are $C_{a+b}^{a}$ paths in total.

## Question 33. The binomial theorem and its generalization.

**In plain words**: Let us expand $(1+x)^n$ as a product of $n$ brackets of the form $(1+x)$. Every term is obtained by taking either $1$ or $x$ in each bracket; the coefficient of $x^k$ equals the number of ways to choose exactly $k$ brackets in which $x$ was taken, that is $C_n^k$. From this all the properties follow automatically: the sum of a row gives $2^n$, the alternating sum gives zero, Pascal's rule reflects the split of subsets into those containing and those not containing a fixed element.

**Definitions**:
- Binomial coefficient: $C_n^k=\dfrac{n!}{k!(n-k)!}$, $C_n^k=0$ for $k>n$ or $k<0$.
- Multinomial (polynomial) coefficient: $\dbinom{n}{k_1,\dots,k_m}=\dfrac{n!}{k_1!\cdots k_m!}$ for $k_1+\dots+k_m=n$.

**Theorems and formulas**:
- Binomial theorem: $(1+x)^n=\sum_{k=0}^{n}C_n^k x^k$, in general form $(a+b)^n=\sum_{k=0}^{n}C_n^k a^{n-k}b^k$.
- Skeleton of the combinatorial proof: (1) $(1+x)^n$ is a product of $n$ identical factors; (2) on expansion one of the two terms is chosen in each factor; (3) choosing $k$ factors in which $x$ was taken gives $x^k$; (4) the number of such choices is $C_n^k$; (5) hence the coefficient of $x^k$ equals $C_n^k$.
- Corollaries by substitution: for $x=1$ we have $\sum_k C_n^k=2^n$ (the number of all subsets); for $x=-1$ we have $\sum_k(-1)^kC_n^k=0$ for $n>0$ (there are equally many even and odd subsets); by differentiation $\sum_k kC_n^k=n2^{n-1}$.
- Multinomial theorem: $(x_1+\dots+x_m)^n=\sum\limits_{k_1+\dots+k_m=n}\dfrac{n!}{k_1!\cdots k_m!}x_1^{k_1}\cdots x_m^{k_m}$; the number of terms is $C_{n+m-1}^{m-1}$; the sum of all coefficients is $m^n$ (substitution $x_i=1$). For $m=2$ the binomial theorem is obtained.

**Example**: For $(x+y+z)^3$ the sum of the coefficients is $3^3=27$, the number of terms is $C_5^2=10$. A multinomial coefficient is exactly the number of anagrams: for a word of 13 letters with multiplicities $2,2,2,2,1,1,1,1,1$ we get $13!/(2!)^4=389188800$.

**What the examiner may ask**:
- **Prove the binomial theorem combinatorially.** Choosing $k$ brackets out of $n$ gives $C_n^k$ terms with $x^k$.
- **Write down the multinomial theorem and the number of terms.** See above: $m^n$ counts all words of length $n$ over an alphabet of $m$ letters, and every word falls into exactly one term according to the composition of its letters.

## Question 34. The inclusion-exclusion formula.

**In plain words**: The cardinality of a union cannot be obtained by adding cardinalities: elements of the common parts are counted several times. The formula alternately subtracts and adds the cardinalities of the intersections, and an element lying in exactly $t$ sets gives a total contribution $\sum_{j\ge0}(-1)^jC_t^j=(1-1)^t$, that is $0$ for $t>0$ and $1$ for $t=0$. It is most convenient to state it "the other way round": count at once the elements that fell into none of the sets.

The classical application of this formula is derangements. A derangement is a permutation in which no element stayed in its own place. In CTF terms: if the adversary knows that in the permutation key no symbol is kept at its former position, then the key space is not $n!$ but only $\approx n!/e$, that is about $36{,}8\%$ of the full one, and this is again inclusion-exclusion. Curiously, the fraction of derangements tends to $1/e$ and hardly depends on $n$.

**Definitions**:
- For $S\subseteq\{1,\dots,m\}$ we denote $A_S=\bigcap_{i\in S}A_i$, with $A_\emptyset=U$ (the whole universal set).
- Indicator of a set: $\mathbf 1_A(x)=1$ if $x\in A$, and $\mathbf 1_A(x)=0$ otherwise; $|A|=\sum_{x\in U}\mathbf 1_A(x)$.
- Number divisible by $d$: elements of the form $dq$; the number of such numbers from $1$ to $N$ equals $\lfloor N/d\rfloor$.
- Derangement: a permutation $\pi$ of the set $\{1,\dots,n\}$ such that $\pi(i)\ne i$ for all $i$ (no fixed points).
- $D_n$ (also denoted $!n$, the subfactorial): the number of derangements of $n$ elements; $D_0=1$ (the empty permutation), $D_1=0$.
- Equivalent problem: the number of permutations with no "guessed" position, the number of ways to hand out $n$ letters into $n$ envelopes so that nobody got their own letter.

**Theorems and formulas**:
$$|A_1\cup\dots\cup A_m|=\sum_{i}|A_i|-\sum_{i<j}|A_i\cap A_j|+\sum_{i<j<k}|A_i\cap A_j\cap A_k|-\dots+(-1)^{m-1}|A_1\cap\dots\cap A_m|.$$
Equivalent form (the sieve): the number of elements that fell into none of the sets,
$$\Bigl|U\setminus\bigcup_{i=1}^{m}A_i\Bigr|=\sum_{S\subseteq\{1,\dots,m\}}(-1)^{|S|}|A_S|.$$
Skeleton of the proof via indicators: (1) $\mathbf 1_{U\setminus\bigcup A_i}(x)=\prod_{i=1}^{m}\bigl(1-\mathbf 1_{A_i}(x)\bigr)$; (2) we expand the product, getting $\sum_{S}(-1)^{|S|}\mathbf 1_{A_S}(x)$; (3) we sum over $x\in U$ and change the order of summation; (4) we use the fact that $\sum_x\mathbf 1_{A_S}(x)=|A_S|$; (5) we obtain the formula. Equivalently: if $x$ lies in exactly $t$ sets, its contribution equals $\sum_{j=0}^{t}(-1)^jC_t^j=(1-1)^t=0$ for $t\ge1$ and equals 1 for $t=0$, hence exactly the elements that fell nowhere are summed.

Applications: the number of integers from $1$ to $N$ divisible by none of $d_1,\dots,d_r$ is computed by a sieve with $|A_{i_1}\cap\dots\cap A_{i_k}|=\lfloor N/\text{LCM}(d_{i_1},\dots,d_{i_k})\rfloor$. In the same way one derives Euler's formula $\varphi(n)=n\prod_{p\mid n}\bigl(1-\frac1p\bigr)$ (a sieve over the prime divisors), the number of derangements and the number of surjections.

The number of derangements (a classical application of inclusion-exclusion):
- Explicit formula: $D_n=n!\sum\limits_{k=0}^{n}\dfrac{(-1)^k}{k!}$.
- Derivation by inclusion-exclusion: let $A_i$ be the set of permutations with $\pi(i)=i$; then $|A_i|=(n-1)!$ (the other $n-1$ elements are permuted freely), and $|A_{i_1}\cap\dots\cap A_{i_k}|=(n-k)!$ ($k$ positions are pinned). There are $n!$ permutations in total, hence
$$D_n=\sum_{k=0}^{n}(-1)^kC_n^k(n-k)!=\sum_{k=0}^{n}(-1)^k\frac{n!}{k!}=n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}.$$
- Recurrence: $D_n=(n-1)\bigl(D_{n-1}+D_{n-2}\bigr)$. Derivation: let $\pi(1)=j$, $j\ne1$, so there are $n-1$ options for $j$. If $\pi(j)=1$, the pair $(1,j)$ is closed and on the remaining $n-2$ elements any derangement works, $D_{n-2}$ ways. If $\pi(j)\ne1$, we "glue" $1$ and $j$ into one element, obtaining a derangement of $n-1$ elements (in which $\pi(j)=1$ is forbidden), $D_{n-1}$ ways. In total $D_n=(n-1)(D_{n-2}+D_{n-1})$.
- Second recurrence: $D_n=nD_{n-1}+(-1)^n$.
- Asymptotics: $\dfrac{D_n}{n!}=\sum_{k=0}^{n}\frac{(-1)^k}{k!}\to e^{-1}\approx0{,}3679$, hence $D_n$ is the nearest integer to $n!/e$ for $n\ge1$.
- Table: $D_0=1$, $D_1=0$, $D_2=1$, $D_3=2$, $D_4=9$, $D_5=44$, $D_6=265$, $D_7=1854$, $D_8=14833$.

**Example**: how many numbers from 1 to 1000 are divisible by neither 2, nor 3, nor 5. The sets of multiples: $|A_2|=500$, $|A_3|=333$, $|A_5|=200$, sum 1033. Pairwise intersections (over LCM 6, 10, 15): $166+100+66=332$. Triple intersection (LCM 30): $\lfloor1000/30\rfloor=33$. Union: $1033-332+33=734$, hence the wanted number of integers is $1000-734=266$. Second example: out of 1000 numbers, $1000-500-333+166=333$ are divisible by neither 2 nor 3, which is visible as "a third of the numbers are odd and not multiples of three".

Derangements: $n=4$: $D_4=4!\bigl(1-1+\frac12-\frac16+\frac1{24}\bigr)=24\cdot\frac9{24}=9$; let us list them: $2143$, $2341$, $2413$, $3142$, $3412$, $3421$, $4123$, $4312$, $4321$ (verified by brute force). The fraction: $9/24=0{,}375$, close to $1/e$. Via the recurrence: $D_5=4(D_4+D_3)=4(9+2)=44$, $D_6=5(44+9)=265$.

**What the examiner may ask**:
- **State the formula and prove it via indicators.** See the skeleton above; alternatively via the contribution of a single element.
- **Why do the signs alternate?** Expansion of $\prod(1-\mathbf 1_{A_i})$: the sign equals $(-1)^{|S|}$ by the number of factors.
- **How to count the numbers coprime to $n$?** A sieve over the prime divisors of $n$, the result is $n\prod(1-1/p)$.
- **How to count the number of solutions with restrictions (for example, $x_i\le c_i$)?** Via a sieve over the events "$x_i\ge c_i+1$", substituting $y_i=x_i-c_i-1$.
- **Derive the formula for $D_n$ by inclusion-exclusion.** A sieve over the events "position $i$ is in place", the intersection of $k$ events gives $(n-k)!$.
- **Derive the recurrence $D_n=(n-1)(D_{n-1}+D_{n-2})$.** Via the position of the image of the first element, see above.
- **Why does the fraction of derangements tend to $1/e$?** The series for $e^{-1}$; for $n=4$ the fraction is $0{,}375$, for $n\ge6$ it agrees with $1/e$ in four digits.
- **How many derangements of 5 elements are there?** $44$.

## Question 35. Distributions of balls into boxes and their types.

**In plain words**: The phrase "distribute $n$ balls into $k$ boxes" describes twelve different problems. One must be able to answer three questions: are the balls distinguishable, are the boxes distinguishable, are empty boxes allowed. Every combination of answers gives its own formula, and in an exam it is most often exactly this table that is asked for. In CTF this is the estimate of the number of configurations when keys are split into buckets or when a set of participants is split into groups.

**Definitions**:
- Balls are distinguishable if they are numbered; then a distribution is a function from the set of balls to the set of boxes.
- Boxes are distinguishable if they have numbers or labels (people, addresses, buckets); indistinguishable if they are groups without names.
- Empty boxes are allowed or forbidden (all boxes are non-empty).
- $S(n,k)$ are the Stirling numbers of the second kind (see the next question), $p(n,k)$ is the number of partitions of the number $n$ into exactly $k$ positive summands, $p_{\le k}(n)=\sum_{j\le k}p(n,j)$.

**Theorems and formulas**: table of all cases (the first formula is the case "empty allowed", the second "empty forbidden", the third an additional condition "at most one ball per box"):

| Balls | Boxes | Empty allowed | Empty forbidden | At most 1 ball per box |
|---|---|---|---|---|
| distinguishable | distinguishable | $k^n$ | $k!\,S(n,k)$ | $A_k^n=\dfrac{k!}{(k-n)!}$ |
| indistinguishable | distinguishable | $C_{n+k-1}^{k-1}$ | $C_{n-1}^{k-1}$ | $C_k^n$ |
| distinguishable | indistinguishable | $\sum_{j=1}^{k}S(n,j)$ | $S(n,k)$ | $1$ for $n\le k$, otherwise $0$ |
| indistinguishable | indistinguishable | $p_{\le k}(n)$ | $p(n,k)$ | $1$ for $n\le k$, otherwise $0$ |

Reading the table: $k^n$ is all functions from an $n$-set into a $k$-set (every ball chooses a box independently); $k!\,S(n,k)$ is the surjections (the set was split into $k$ non-empty blocks, then the blocks were given the numbers of the boxes); $C_{n+k-1}^{k-1}$ is the number of solutions of $x_1+\dots+x_k=n$ in non-negative integers (multisets, "stars and bars"); $C_{n-1}^{k-1}$ is the same for positive $x_i$ (compositions of $n$ into $k$ parts); $\sum_{j\le k}S(n,j)$ is the partitions of a set into at most $k$ blocks; for $p(n,k)$ there is no closed formula, but there are a generating function $\sum_{n\ge0}p(n,k)x^n=\dfrac{x^k}{(1-x)(1-x^2)\cdots(1-x^k)}$ and Euler's recurrence. How to choose: if the items are individual (people, keys) we take distinguishable balls; if we count only quantities, indistinguishable ones; if the boxes are named recipients, distinguishable ones; if the boxes are nameless groups, indistinguishable ones.

**Example**: $n=5$ distinguishable balls, $k=3$ distinguishable boxes. Empty allowed: $3^5=243$. Empty forbidden: $3!\,S(5,3)=6\cdot25=150$. Indistinguishable balls, distinguishable boxes: $C_{5+3-1}^{2}=C_7^2=21$ and without empty boxes $C_4^2=6$. Indistinguishable balls and boxes: $p(5,3)=2$ (these are $3+1+1$ and $2+2+1$), while $p_{\le3}(5)=5$ ($5$; $4+1$; $3+2$; $3+1+1$; $2+2+1$).

**What the examiner may ask**:
- **How does $k^n$ differ from $C_{n+k-1}^{k-1}$?** In the first case the balls are distinguishable (every ball chooses a box independently), in the second only quantities matter, and a distribution is given by a vector $(x_1,\dots,x_k)$.
- **How is $C_{n-1}^{k-1}$ obtained?** First put one ball into each box, and the remainder $n-k$ is distributed freely by the bars method.
- **What is $p(n,k)$, is there a formula?** Partitions of a number; there is no closed formula, but there are a generating function and $p(n,k)=p(n-1,k-1)+p(n-k,k)$.
- **How many ways are there to put 5 distinguishable balls into 3 distinguishable boxes with no empty box?** $150$.

## Question 36. Stirling numbers. Bell numbers.

**In plain words**: The Stirling numbers of the second kind $S(n,k)$ count in how many ways $n$ distinct items can be split into $k$ non-empty nameless groups. This is exactly the case "distinguishable balls, indistinguishable boxes, empty forbidden" from the previous question. The key difference from combinations: the blocks are unordered and non-empty, therefore instead of a single formula with factorials one obtains a recurrence and a formula with alternating signs. The Bell numbers $B_n$ are the sum of the Stirling numbers over all $k$: how many partitions of an $n$-element set into non-empty blocks exist at all, without fixing their number. If a CTF scheme groups the participants arbitrarily, the size of the space of schemes is $B_n$; it grows faster than an exponential but slower than $n!$ (already $B_{20}\approx5{,}2\cdot10^{13}$).

**Definitions**:
- $S(n,k)$: the number of partitions of an $n$-element set into exactly $k$ non-empty blocks (pairwise disjoint subsets whose union is the whole set).
- Equivalently: the number of equivalence relations on an $n$-set having exactly $k$ classes.
- Boundary values: $S(0,0)=1$ (the empty partition), $S(n,0)=0$ for $n>0$, $S(n,k)=0$ for $k>n$, $S(n,1)=1$, $S(n,n)=1$.
- Related quantity (not to be confused): the Stirling numbers of the first kind $s(n,k)$ count permutations of $n$ elements with exactly $k$ cycles; the link goes through the identities $x^{\underline n}=\sum_k s(n,k)x^k$ and $x^n=\sum_k S(n,k)x^{\underline k}$ (here $x^{\underline n}=x(x-1)\cdots(x-n+1)$).
- Bell number $B_n=\sum\limits_{k=0}^{n}S(n,k)$: the number of partitions of an $n$-element set into non-empty blocks (any number of blocks from 1 to $n$).
- Equivalently: the number of equivalence relations on an $n$-set (all of them, with any number of classes).
- $B_0=1$ (the partition of the empty set), $B_1=1$.

**Theorems and formulas**:
- Recurrence: $S(n,k)=S(n-1,k-1)+k\,S(n-1,k)$.
- Skeleton of the proof: (1) in any partition of the set $\{1,\dots,n\}$ we single out the element $n$; (2) if it forms a separate one-element block, the rest is split into $k-1$ blocks, that is $S(n-1,k-1)$ ways; (3) if its block is not one-element, then, after removing $n$, we get a partition of $n-1$ elements into $k$ blocks, $S(n-1,k)$ ways, and $n$ can be returned into any of the $k$ blocks; (4) the cases do not overlap and exhaust everything, hence the sum is correct.
- Explicit formula (from inclusion-exclusion for surjections): $S(n,k)=\dfrac{1}{k!}\sum\limits_{i=0}^{k}(-1)^iC_k^i(k-i)^n$.
- Link with surjections (the main applied fact): the number of surjective maps of an $n$-set onto a $k$-set equals $k!\,S(n,k)=\sum\limits_{i=0}^{k}(-1)^iC_k^i(k-i)^n$. From this also the expansion by the size of the image: $k^n=\sum\limits_{j=0}^{k}C_k^j\,j!\,S(n,j)$.
- Special cases: $S(n,2)=2^{n-1}-1$, $S(n,n-1)=C_n^2$, $S(n,n)=1$, $S(n,1)=1$.
- Recurrence: $B_{n+1}=\sum\limits_{k=0}^{n}C_n^k B_k$.
- Skeleton of the proof: (1) consider a partition of a set of $n+1$ elements and the block containing the distinguished element $n+1$; (2) let this block contain $k$ more elements besides it, these $k$ elements are chosen out of the remaining $n$ in $C_n^k$ ways; (3) the other $n-k$ elements are partitioned arbitrarily, $B_{n-k}$ ways; (4) we sum over $k=0,\dots,n$ and replace $j=n-k$, getting $\sum_j C_n^jB_j$.
- Exponential generating function: $\sum\limits_{n\ge0}B_n\dfrac{x^n}{n!}=e^{e^x-1}$ (obtained by summing over partitions into blocks).
- Link: $B_n=\sum_k S(n,k)$; for every fixed number of blocks $k$ the corresponding contribution is $S(n,k)$.
- Addition: Dobinski's congruence holds, $B_{n+p}\equiv B_n+B_{n+1}\pmod p$ for a prime $p$; values are conveniently computed by the Bell triangle (every number equals the sum of the number to its left and the number above-left).

**Example**: table of small values of $S(n,k)$ (the rows are $n$, the columns are $k=1,2,\dots,n$):

| $n$ | values |
|---|---|
| 1 | 1 |
| 2 | 1, 1 |
| 3 | 1, 3, 1 |
| 4 | 1, 7, 6, 1 |
| 5 | 1, 15, 25, 10, 1 |
| 6 | 1, 31, 90, 65, 15, 1 |
| 7 | 1, 63, 301, 350, 140, 21, 1 |
| 8 | 1, 127, 966, 1701, 1050, 266, 28, 1 |

Analysis of $S(4,2)=7$: the blocks $1|234$, $2|134$, $3|124$, $4|123$, $12|34$, $13|24$, $14|23$; by the formula $\frac1{2}\sum_i(-1)^iC_2^i(2-i)^4=\frac{16-2}{2}=7$. Surjections: out of $3^5=243$ functions $[5]\to[3]$ there are $3!S(5,3)=6\cdot25=150$ surjections. Checking the formula via inclusion-exclusion: $\sum_i(-1)^iC_3^i(3-i)^5=243-96+3=150$.

Bell numbers: $B_3=5$, let us list all partitions of $\{1,2,3\}$: $123$, $1|23$, $2|13$, $3|12$, $1|2|3$. Checking the recurrence: $B_4=C_3^0B_0+C_3^1B_1+C_3^2B_2+C_3^3B_3=1+3+3\cdot2+5=15$. Table of values: $B_0=1$, $B_1=1$, $B_2=2$, $B_3=5$, $B_4=15$, $B_5=52$, $B_6=203$, $B_7=877$, $B_8=4140$, $B_9=21147$, $B_{10}=115975$, $B_{20}=51724158235372$ (verified by computation).

**What the examiner may ask**:
- **Give the definition and derive the recurrence.** See the skeleton: by the element $n$, a separate block or adding it to one of the $k$ blocks.
- **Why is $S(n,2)=2^{n-1}-1$?** The block containing the element $1$ determines the second block uniquely, there are $2^{n-1}$ subsets, and we exclude the empty remainder.
- **How are the Stirling numbers related to surjections?** $k!\,S(n,k)$; the factor $k!$ numbers the indistinguishable blocks.
- **How many surjections from 6 onto 3 are there?** $3!S(6,3)=6\cdot90=540$ (it is useful to remember both numbers).
- **What is the Bell number and how is it related to Stirling?** The sum $B_n=\sum_k S(n,k)$.
- **Derive the recurrence $B_{n+1}=\sum_k C_n^kB_k$.** By the block containing the distinguished element.
- **What is $B_4$ and how can it be checked?** $15$: $\sum_k S(4,k)=1+7+6+1=15$.
- **Can one write a formula via surjections?** No, but $B_n$ is the sum $k!S(n,k)/k!$; for the number of blocks equal to $k$ the answer is given by $S(n,k)$.

## Question 37. Elements of enumeration theory, Burnside's lemma, example.

**In plain words**: When objects are counted "up to symmetry" (necklaces, beads, colorings up to rotation), a direct count overestimates the result, because symmetric variants coincide. Burnside's lemma allows one not to sort out the orbits by hand: for every transformation of the group one has to count how many objects it leaves in place, add these up and divide by the size of the group. This averaging is what gives the number of classes.

**Definitions**:
- Action of a group $G$ on a set $X$: to every $g\in G$ a permutation of $X$ is assigned, with $(gh)x=g(hx)$ and $ex=x$; for example, the cyclic group $C_n$ of rotations of a regular $n$-gon acts on the bead numbers, and the group $D_n$ adds reflections.
- Orbit: $\mathrm{Orb}(x)=\{gx: g\in G\}$ (the equivalence class "$\exists g:\ y=gx$").
- Stabilizer: $G_x=\{g\in G: gx=x\}$, it is a subgroup of $G$.
- Set of fixed points: $\mathrm{Fix}(g)=\{x\in X: gx=x\}$.
- Action on colorings: positions (vertices, beads) are permuted by the group, a coloring is a function from positions to colors, and $(g\cdot f)(p)=f(g^{-1}p)$.

**Theorems and formulas**:
- Orbit-stabilizer theorem: $|\mathrm{Orb}(x)|\cdot|G_x|=|G|$, that is $|G_x|=|G|/|\mathrm{Orb}(x)|$.
- Burnside's lemma: the number of orbits of the action of a group $G$ on $X$ equals
$$\#\mathrm{Orb}=\frac{1}{|G|}\sum_{g\in G}|\mathrm{Fix}(g)|.$$
- Proof by double counting the pairs $(g,x)$ with the condition $gx=x$: (1) count the pairs first by $g$: there are $\sum_{g\in G}|\mathrm{Fix}(g)|$ of them; (2) then by $x$: for every $x$ there are $|G_x|$ suitable $g$, in total $\sum_{x\in X}|G_x|$; (3) by the orbit-stabilizer theorem $|G_x|=|G|/|\mathrm{Orb}(x)|$; (4) inside one orbit all stabilizers have the same size, so the contribution of an orbit equals $\sum_{x\in\mathrm{Orb}}|G|/|\mathrm{Orb}|=|G|$; (5) summing over the orbits, we get the equality of sums $\sum_g|\mathrm{Fix}(g)|=|G|\cdot\#\mathrm{Orb}$.
- Working formula for colorings: a coloring is fixed under a permutation of positions if and only if all positions of one cycle are colored identically, hence for $k$ colors $|\mathrm{Fix}(g)|=k^{c(g)}$, where $c(g)$ is the number of cycles of the permutation $g$.

**Example**: necklaces of 6 beads in 2 colors up to rotation (the group $C_6$, 6 elements). A rotation by $j$ positions gives $\gcd(6,j)$ cycles: the identity (6 cycles) gives $2^6=64$; rotations by 1 and 5 (1 cycle) give $2$ each; rotations by 2 and 4 (2 cycles) give $4$ each; rotation by 3 (3 cycles) gives $8$. The sum is $64+2+2+4+4+8=84$, divide by 6: $14$ necklaces (verified by brute force). If reflections are also allowed (the group $D_6$, 12 elements), 3 reflections through opposite beads are added ($2^4=16$ each) and 3 reflections through the midpoints of edges ($2^3=8$ each): the sum is $84+48+24=156$, the answer is $156/12=13$. Colorings of the vertices of a square in 2 colors up to the whole group $D_4$: $(16+2\cdot2+4+2\cdot8+2\cdot4)/8=48/8=6$. Colorings of the vertices of a triangle in 2 colors: $(8+2\cdot2+3\cdot4)/6=24/6=4$.

**What the examiner may ask**:
- **State the lemma and prove it.** Double counting of the pairs $(g,x)$ with $gx=x$ plus the orbit-stabilizer theorem.
- **What are an orbit and a stabilizer, how are their sizes related?** $|G|=|\mathrm{Orb}(x)|\cdot|G_x|$.
- **How many necklaces of 6 beads in two colors are there?** $14$ by rotations, $13$ by rotations and reflections.
- **How to count fixed colorings?** $k^{c(g)}$: the number of cycles of the permutation of positions.

## Question 38. Pólya's theorem, example.

**In plain words**: Burnside's lemma gives one number of orbits for a fixed set of colors. Pólya's theorem gives more: a generating function, that is it tells at once how many orbits of each type there are (for example, how many necklaces with exactly two black beads and four white ones). This is done by replacing the "number of colors" with weights of colors: fixed colorings are recounted with weights, and afterwards the weights of all colors can be set equal to one and one returns to Burnside.

**Definitions**:
- Cycle index of a group $G$ acting on $n$ positions: $Z_G(x_1,\dots,x_n)=\dfrac{1}{|G|}\sum\limits_{g\in G}x_1^{c_1(g)}x_2^{c_2(g)}\cdots x_n^{c_n(g)}$, where $c_i(g)$ is the number of cycles of length $i$ in the permutation of positions generated by $g$.
- Coloring: a function from the set of positions to the set of colors; two colorings are equivalent if one is taken to the other by an element of the group.
- Weights of colors: the colors are assigned variables $w_1,\dots,w_m$; the weight of a coloring is the product of the weights of its colors, hence the coefficient of $w_1^{a_1}\cdots w_m^{a_m}$ counts the orbits with a given number of positions of each color.

**Theorems and formulas**:
- Pólya's theorem: $\sum\limits_{\text{orbits}}w(\text{orbit})=Z_G(p_1,\dots,p_n)$, where $p_i=w_1^i+\dots+w_m^i$ (power sums of the weights). Derivation: the colorings fixed by a given permutation with $c_i$ cycles of length $i$ have the weighted generating function $\prod_i p_i^{c_i}$, and averaging over the group gives the formula.
- Corollary (the number of colorings in $m$ colors): for $w_j=1$ we have $p_i=m$, whence the number of orbits $=Z_G(m,m,\dots,m)=\dfrac{1}{|G|}\sum_g m^{c(g)}$, that is exactly Burnside's lemma.
- Cycle index of a cyclic rotation group: $Z_{C_n}=\dfrac1n\sum\limits_{d\mid n}\varphi(d)\,x_d^{\,n/d}$ (here $\varphi$ is Euler's function).
- Number of necklaces of $n$ beads in $m$ colors: $\dfrac1n\sum\limits_{d\mid n}\varphi(d)\,m^{\,n/d}$; for example, for $n=6$: $\frac16(\varphi(1)m^6+\varphi(2)m^3+\varphi(3)m^2+\varphi(6)m)=\frac16(m^6+m^3+2m^2+2m)$, for $m=2$ this is $14$, for $m=3$ it is $130$.
- Cycle index of the group $D_n$: for odd $n$ it is $\frac12Z_{C_n}+\frac12x_1x_2^{(n-1)/2}$, for even $n$ it is $\frac12Z_{C_n}+\frac14\bigl(x_2^{n/2}+x_1^2x_2^{(n-2)/2}\bigr)$.
- Difference from Burnside: Burnside is one number of orbits, Pólya is a generating function in the weights (the distribution of orbits by types), from which Burnside is obtained by substituting all weights equal to one.

**Example**: colorings of the faces of a cube up to rotations. The rotation group of the cube has 24 elements and acts on the 6 faces: the identity element gives $x_1^6$; 6 rotations by $90^\circ$ and $270^\circ$ about an axis through the centers of faces give $x_1^2x_4$; 3 rotations by $180^\circ$ about such an axis give $x_1^2x_2^2$; 8 rotations by $120^\circ$ about the diagonals give $x_3^2$; 6 rotations by $180^\circ$ about axes through the midpoints of edges give $x_2^3$. In total $Z=\frac1{24}\bigl(x_1^6+6x_1^2x_4+3x_1^2x_2^2+8x_3^2+6x_2^3\bigr)$. In 2 colors: $\frac{64+6\cdot8+3\cdot16+8\cdot4+6\cdot8}{24}=\frac{240}{24}=10$. In 3 colors: $\frac{729+6\cdot27+3\cdot81+8\cdot9+6\cdot27}{24}=\frac{1368}{24}=57$. A weighted example: necklaces of 6 beads, we substitute $x_i=1+t^i$ into $Z_{C_6}=\frac16(x_1^6+x_2^3+2x_3^2+2x_6)$, getting $\frac16\bigl((1+t)^6+(1+t^2)^3+2(1+t^3)^2+2(1+t^6)\bigr)=1+t+3t^2+4t^3+3t^4+t^5+t^6$, that is exactly $3$ necklaces with two black beads (verified by brute force), while the sum of the coefficients $14$ again gives Burnside.

**What the examiner may ask**:
- **What is the cycle index, write it down for $C_n$ and $D_n$?** See the formulas above; for $Z_{C_6}$ it is $\frac16(x_1^6+x_2^3+2x_3^2+2x_6)$.
- **How does Pólya generalize Burnside?** By weights of colors; for $w_j=1$ (or $x_i=m$) the formula turns into Burnside's lemma.
- **How many colorings of the faces of a cube in 2 and in 3 colors up to rotation are there?** $10$ and $57$.
- **How to count necklaces with a fixed number of beads of a given color?** Substitute $x_i=w_1^i+\dots+w_m^i$ and take the required coefficient.

## Cheat sheet

- Sum rule: disjoint classes add up, product rule: independent steps multiply.
- Four selections: $A_n^k=\frac{n!}{(n-k)!}$ (order, no repetitions), $n^k$ (order, repetitions), $C_n^k=\frac{n!}{k!(n-k)!}$ (no order and no repetitions), $C_{n+k-1}^k$ (no order, with repetitions).
- Permutations with repetition: $n!/(n_1!\cdots n_m!)$; anagrams are the same coefficient.
- Identities: $C_n^k=C_n^{n-k}$, $kC_n^k=nC_{n-1}^{k-1}$, $C_n^k=C_{n-1}^{k-1}+C_{n-1}^k$, $\sum_kC_n^k=2^n$, $\sum_k(-1)^kC_n^k=0$.
- Pascal's triangle: row $n$ consists of $C_n^k$, the row sum is $2^n$, shallow diagonals give Fibonacci, lattice paths are $C_{a+b}^a$.
- Binomial: $(a+b)^n=\sum C_n^ka^{n-k}b^k$; multinomial: $(x_1+\dots+x_m)^n=\sum\frac{n!}{k_1!\cdots k_m!}x_1^{k_1}\cdots$, the number of terms is $C_{n+m-1}^{m-1}$, the sum of the coefficients is $m^n$.
- Inclusion-exclusion: $|A_1\cup\dots\cup A_m|=\sum|A_i|-\sum|A_i\cap A_j|+\dots$; the sieve: fell into nothing $=\sum_S(-1)^{|S|}|A_S|$.
- Proof of inclusion-exclusion: indicators, $\prod(1-\mathbf 1_{A_i})$, or the contribution of an element lying in $t$ sets equals $(1-1)^t$.
- Numbers up to $N$ divisible by neither 2, 3, 5: $N-\sum\lfloor N/d\rfloor+\sum\lfloor N/\text{LCM}\rfloor-\lfloor N/30\rfloor$; for $N=1000$ the answer is $266$.
- Euler's function by a sieve: $\varphi(n)=n\prod_{p\mid n}(1-1/p)$.
- Derangements: $D_n=n!\sum_{k\le n}(-1)^k/k!$, $D_n=(n-1)(D_{n-1}+D_{n-2})$, $D_n\approx n!/e$; the values $1,0,1,2,9,44,265,1854,14833$.
- Balls and boxes: $k^n$; $k!S(n,k)$; $A_k^n$; $C_{n+k-1}^{k-1}$; $C_{n-1}^{k-1}$; $C_k^n$; $\sum_{j\le k}S(n,j)$; $S(n,k)$; $p_{\le k}(n)$; $p(n,k)$.
- Stirling numbers of the second kind: partitions into $k$ non-empty blocks, $S(n,k)=S(n-1,k-1)+kS(n-1,k)$, $S(n,k)=\frac1{k!}\sum_i(-1)^iC_k^i(k-i)^n$.
- Surjections: $k!S(n,k)=\sum_i(-1)^iC_k^i(k-i)^n$; $k^n=\sum_jC_k^jj!S(n,j)$.
- Small $S(n,k)$, rows $n=1..6$: $1$; $1,1$; $1,3,1$; $1,7,6,1$; $1,15,25,10,1$; $1,31,90,65,15,1$.
- Bell: $B_n=\sum_kS(n,k)$, $B_{n+1}=\sum_kC_n^kB_k$, $1,1,2,5,15,52,203,877,4140,21147,115975$.
- Orbit-stabilizer: $|\mathrm{Orb}(x)|\cdot|G_x|=|G|$.
- Burnside: the number of orbits $=\frac1{|G|}\sum_g|\mathrm{Fix}(g)|$; for colorings in $m$ colors $|\mathrm{Fix}(g)|=m^{c(g)}$.
- Burnside is proved by counting the pairs $(g,x)$ with $gx=x$ in two ways.
- Necklaces of 6 beads: $C_6$ gives 14, $D_6$ gives 13; the cube in 2 colors 10, in 3 colors 57; the square (vertices, $D_4$) 6; the triangle 4.
- Cycle index: $Z_G=\frac1{|G|}\sum_gx_1^{c_1}\cdots x_n^{c_n}$; $Z_{C_n}=\frac1n\sum_{d\mid n}\varphi(d)x_d^{n/d}$.
- Pólya: $\sum_{\text{orbits}}w=Z_G(p_1,\dots,p_n)$, $p_i=\sum_jw_j^i$; with all $w_j=1$ Burnside is obtained.
- Formula for the number of necklaces: $\frac1n\sum_{d\mid n}\varphi(d)m^{n/d}$.
- CTF: password entropy $k\log_2 n$ for an alphabet of $n$ and length $k$; full search $n^k$; birthday paradox: a hash collision in a space of $2^b$ is expected after $\approx1{,}18\cdot2^{b/2}$ attempts.
