# Block 2. Groups and their structure

## Question 8. Algebraic operations, algebras. Groups, subgroups, Lagrange's theorem.

**In plain words**: A binary operation takes two elements of a set and returns a third one. If the operation is associative, there is a neutral element, and every element has an inverse, the result is a group. All public key cryptography lives in groups and rings: the Diffie and Hellman protocol runs in $\mathbb{Z}_p^*$, elliptic curves run in the group of points of a curve, RSA computes in the ring $\mathbb{Z}_n$, where addition, multiplication and invertibility modulo n are needed at once. The order of an element is the size of the subgroup it generates, and it is exactly the order that decides whether an element is good as a key generator.

**Definitions**:
- Binary (two-place) operation on a set $A$: a map $*:A\times A\to A$, that is, to every ordered pair $(a,b)$ an element $a*b\in A$ is assigned (closure is part of the definition of an operation).
- Properties of the operation $*$: associativity $a*(b*c)=(a*b)*c$; commutativity $a*b=b*a$; neutral element $e$: $a*e=e*a=a$; inverse element for $a$: an $a^{-1}$ with $a*a^{-1}=a^{-1}*a=e$; idempotence $a*a=a$; for two operations also distributivity: $a*(b+c)=a*b+a*c$ and $(b+c)*a=b*a+c*a$.
- Algebra: a set (the carrier) with a fixed set of operations and axioms. Types ordered by the strength of the axioms:
  - semigroup: a set with an associative binary operation;
  - monoid: a semigroup that has a neutral element;
  - group: a monoid in which every element has an inverse;
  - abelian group: a group with a commutative operation;
  - ring: $(R,+,\cdot)$, where $(R,+)$ is an abelian group, $(R,\cdot)$ is a semigroup and distributivity holds; ring with unity: there is a neutral element for multiplication; commutative ring: multiplication is commutative;
  - field: a commutative ring with unity in which every nonzero element is invertible (that is, $(K\setminus\{0\},\cdot)$ is an abelian group).
- Group $(G,*)$: (G1) associativity; (G2) there exists $e\in G$ with $e*a=a*e=a$; (G3) for every $a$ there exists $a^{-1}$ with $a*a^{-1}=a^{-1}*a=e$. The group is abelian (commutative) if in addition $a*b=b*a$.
- Order of a group $|G|$: the number of elements. Order of an element $\operatorname{ord}(a)$: the least $n>0$ with $a^n=e$ (if there is no such n, the order is infinite).
- Notation: additive notation ($+$, zero $0$, opposite $-a$) is usual for abelian groups, multiplicative ($\cdot$, $e$ or $1$, $a^{-1}$) for arbitrary ones.

**Theorems and formulas**:
- Consequences of the axioms: the neutral element is unique; the inverse is unique; cancellation law: $a*b=a*c\Rightarrow b=c$ (multiply on the left by $a^{-1}$); $(a^{-1})^{-1}=a$; $(a*b)^{-1}=b^{-1}*a^{-1}$; $a^n a^m=a^{n+m}$, $(a^n)^m=a^{nm}$; $\operatorname{ord}(a)=\operatorname{ord}(a^{-1})$.
- Trick: if $a*a=e$ for all $a\in G$, then G is abelian, since $ab=(ab)^{-1}=b^{-1}a^{-1}=ba$.
- Examples of groups: $(\mathbb{Z},+)$; $(\mathbb{Z}_n,+)$ (residues under addition, order $n$); $(\mathbb{Z}_p^*,\cdot)$ (nonzero residues modulo a prime, order $p-1$); $(\mathbb{Z}_n^*,\cdot)$ (invertible residues, order $\varphi(n)$); $(S_n,\circ)$ (all permutations, order $n!$); $(GL_n(\mathbb{R}),\cdot)$ (invertible matrices); $(SL_n(\mathbb{R}),\cdot)$ (matrices with determinant 1); $(\mathbb{R}^*,\cdot)$; the rotation group of a regular $n$-gon (cyclic of order $n$).
- Examples where the axioms are not enough: $(\mathbb{Z},\cdot)$ is only a monoid (only $\pm1$ are invertible); $(\mathbb{Z}_n,\cdot)$ is a monoid, not a group for $n>1$ (zero is not invertible); $(\Sigma^*,\cdot)$, words with concatenation and the empty word, is a monoid; $(2^M,\cup)$ is an idempotent monoid.
- Rings and fields: $\mathbb{Z}$, $\mathbb{Z}_n$, $\mathbb{Z}[x]$, $\mathbb{R}[x]$ are rings; $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$ are fields; $\mathbb{Z}_p$ is a field for prime p; $\mathbb{Z}_n$ for composite n has zero divisors and is not a field. A noncommutative ring in which all nonzero elements are invertible is called a division ring (example: the quaternions).

**Example**: $G=\mathbb{Z}_6=\{0,1,2,3,4,5\}$ under addition, $|G|=6$. Orders: $\operatorname{ord}(0)=1$, $\operatorname{ord}(1)=6$, $\operatorname{ord}(2)=3$ (since $2+2+2=0$), $\operatorname{ord}(3)=2$, $\operatorname{ord}(4)=3$, $\operatorname{ord}(5)=6$. All the orders divide $|G|=6$ (this is Lagrange's theorem from question 9). A multiplicative example: $\mathbb{Z}_9^*=\{1,2,4,5,7,8\}$, order $\varphi(9)=6$; the powers of two: $2,4,8,7,5,1$, hence $\operatorname{ord}(2)=6$, the element 2 generates the whole group. A non-group: $\mathbb{Z}_6$ under multiplication, the element 2 is not invertible, since $2x\equiv1\pmod6$ has no solutions (gcd(2,6)=2 does not divide 1).

**What the examiner may ask**:
- How does a monoid differ from a group? A monoid has a neutral element but does not require inverses; a group is a monoid with inverses.
- Are the neutral and the inverse elements unique? Yes: if $e_1,e_2$ are neutral, then $e_1=e_1e_2=e_2$; if $b,c$ are inverse to $a$, then $b=b(ac)=(ba)c=c$.
- Give a non-abelian group. $(S_3,\circ)$: $(12)(13)=(132)$, while $(13)(12)=(123)$, the results differ.
- Why is $\mathbb{Z}_n$ under multiplication not a group? Zero and the zero divisors are not invertible; exactly the residues with gcd(k,n)=1 are invertible, and they form the group $\mathbb{Z}_n^*$ of order $\varphi(n)$.

## Question 9. Permutation groups, Cayley's theorem. Stirling numbers of the first kind.

**In plain words**: A subgroup is a small group inside a bigger one with the same operation. Lagrange states that a subgroup fits into a group a whole number of times, because the shifts of the subgroup give pieces of equal size that do not intersect and together cover the whole group. Hence the key practical fact: the order of any element divides the order of the group, that is, $a^{|G|}=e$. This is the direct ancestor of Fermat's little theorem $a^{p-1}\equiv1\pmod p$ and Euler's theorem $a^{\varphi(n)}\equiv1$, on which RSA and probabilistic primality tests rest.

**Definitions**:
- Subgroup: a nonempty $H\subseteq G$ is called a subgroup ($H\le G$) if H is closed under the operation of G and itself forms a group with the same operation.
- Proper subgroup: $H\ne G$. Nontrivial: $H\ne\{e\}$. Trivial subgroups: $\{e\}$ and G itself.
- Left coset with respect to H: $aH=\{ah:h\in H\}$. Right coset: $Ha=\{ha:h\in H\}$. In an abelian group $aH=Ha$.
- Index of a subgroup $[G:H]$: the number of distinct left cosets.
- Subgroup generated by an element $a$: $\langle a\rangle=\{a^k:k\in\mathbb{Z}\}$; its order equals $\operatorname{ord}(a)$. In additive notation $\langle a\rangle=\{ka\}$.
- Subgroup generated by a subset: the smallest subgroup containing that subset.

**Theorems and formulas**:
- Subgroup criterion: a nonempty $H\subseteq G$ is a subgroup $\Leftrightarrow$ for all $a,b\in H$ we have $ab^{-1}\in H$. Justification that one condition is enough: for $b=a$ we get $e=aa^{-1}\in H$; for $a=e$ we get $b^{-1}\in H$; then $ab=a(b^{-1})^{-1}\in H$, that is, H is closed and contains inverses. For a finite H it is enough to check closure under the operation.
- Lagrange's theorem: if G is finite and $H\le G$, then
$$|G|=|H|\cdot[G:H],$$
in particular $|H|$ divides $|G|$.
- Skeleton of the proof:
  1. Define on G the relation $a\sim b\Leftrightarrow a^{-1}b\in H$ (equivalent to $b\in aH$, that is, $aH=bH$); this relation is an equivalence, so G is partitioned into disjoint classes $aH$.
  2. Two classes either coincide or are disjoint: if $ah_1=bh_2$, then $a=bh_2h_1^{-1}$ and for any $h$ we have $ah=b(h_2h_1^{-1}h)\in bH$, that is, $aH\subseteq bH$, and symmetrically $bH\subseteq aH$.
  3. The union of all the classes is G, since $a\in aH$ (because $e\in H$).
  4. All the classes have the same size: $h\mapsto ah$ is a bijection $H\to aH$ with inverse map $x\mapsto a^{-1}x$, hence $|aH|=|H|$.
  5. In total G consists of $[G:H]$ classes with $|H|$ elements each: $|G|=|H|\cdot[G:H]$.
- Corollaries:
  1. The order of an element divides the order of the group: $\operatorname{ord}(a)\mid|G|$ (Lagrange for $H=\langle a\rangle$).
  2. $a^{|G|}=e$ for any $a\in G$.
  3. Fermat's little theorem: for prime p and $p\nmid a$ we have $a^{p-1}\equiv1\pmod p$. Proof: $|\mathbb{Z}_p^*|=p-1$, the element a lies in this group, so its order divides $p-1$.
  4. Euler's theorem: if gcd$(a,n)=1$, then $a^{\varphi(n)}\equiv1\pmod n$ (Lagrange in the group $\mathbb{Z}_n^*$ of order $\varphi(n)$).
  5. A group of prime order is cyclic: if $|G|=p$ is prime and $a\ne e$, then $\operatorname{ord}(a)$ divides p and is greater than one, so it equals p, hence $G=\langle a\rangle$.
  6. The converse of Lagrange's theorem is false: divisibility $d\mid|G|$ does not guarantee a subgroup of order d. Counterexample: $A_4$ has order 12, but there is no subgroup of order 6 in it. For finite abelian groups the converse is true: a subgroup of any order d dividing $|G|$ exists.
  7. Product formula for subgroups: $|HK|=\dfrac{|H|\cdot|K|}{|H\cap K|}$.
  8. A subgroup of index 2 is normal.

**Example**: $G=\mathbb{Z}_{12}$ under addition, $|G|=12$. Take $H=\langle3\rangle=\{0,3,6,9\}$, then $|H|=4$ and the index is $[G:H]=3$, Lagrange checked: $4\cdot3=12$. The orders of the elements in the order $0,1,\dots,11$: $1,12,6,4,3,12,2,12,3,4,6,12$, that is, $\operatorname{ord}(1)=\operatorname{ord}(5)=\operatorname{ord}(7)=\operatorname{ord}(11)=12$, $\operatorname{ord}(2)=\operatorname{ord}(10)=6$, $\operatorname{ord}(3)=\operatorname{ord}(9)=4$, $\operatorname{ord}(4)=\operatorname{ord}(8)=3$, $\operatorname{ord}(6)=2$, $\operatorname{ord}(0)=1$; all these numbers divide 12. Check of $a^{12}=e$ in additive notation: $12a\equiv0\pmod{12}$ holds for every a. In addition, the elements of order 3 are 4 and 8, there are exactly $\varphi(3)=2$ of them (the general formula from question 11).

**What the examiner may ask**:
- Why are the cosets disjoint and of the same size? Disjoint by item 2 of the proof, of the same size by the bijection $h\mapsto ah$.
- How do you derive Fermat's little theorem from Lagrange? Apply Lagrange to the group $\mathbb{Z}_p^*$ of order $p-1$ and note that $\operatorname{ord}(a)$ divides $p-1$.
- Is the converse of Lagrange true? No, the counterexample is $A_4$ of order 12 with no subgroup of order 6.
- How many subgroups does a cyclic group of order n have? Exactly $\tau(n)$, the number of divisors of n, one subgroup of each order $d\mid n$.

## Question 10. Cyclic groups, counting the number of generators of these groups.

**In plain words**: A permutation of degree n is a rearrangement of the numbers $1,\dots,n$ written as a two-row table. Permutations form the group $S_n$ of order $n!$. Every permutation decomposes into independent cycles, and its order equals the LCM of the cycle lengths (the same LCM as in CRT arithmetic; in cryptography this is exactly the computation of the order of an element and of the order of a subgroup in a cyclic group). Cayley's theorem says that there are no finite groups other than subgroups of $S_n$: the abstract group axioms add nothing beyond permutations. In cryptography permutations are the S-boxes in block ciphers and the perm layers in networks.

**Definitions**:
- Permutation of degree n: a bijection $\sigma:\{1,2,\dots,n\}\to\{1,2,\dots,n\}$, written as
$$\sigma=\begin{pmatrix}1&2&\cdots&n\\ \sigma(1)&\sigma(2)&\cdots&\sigma(n)\end{pmatrix}.$$
- Multiplication of permutations: $(\sigma\tau)(i)=\sigma(\tau(i))$ (first $\tau$ acts, then $\sigma$). The set of all permutations of degree n with this multiplication is the group $S_n$, of order $n!$, its neutral element is the identity permutation $e$.
- Cycle $(i_1i_2\dots i_k)$: a permutation with $i_1\to i_2\to\dots\to i_k\to i_1$, the remaining elements stay fixed. The length of the cycle is k; a cycle of length 2 is called a transposition.
- Cycles are independent (disjoint) if the sets of their elements do not intersect.
- Fixed point of a permutation $\sigma$: an $i$ with $\sigma(i)=i$; such points are cycles of length 1, and they are usually omitted when a permutation is written in cycles.
- Permutation group: any subgroup of $S_n$. Alternating group $A_n$: the set of all even permutations.
- Sign of a permutation: $\operatorname{sgn}(\sigma)=(-1)^{N(\sigma)}$, where $N(\sigma)$ is the number of inversions, pairs $(i,j)$ with $i<j$ and $\sigma(i)>\sigma(j)$; the map $\operatorname{sgn}:S_n\to\{1,-1\}$ is a homomorphism and its kernel is $A_n$; permutations with sign $+1$ are even, with sign $-1$ odd.
- Cycle type (structure) of a permutation: the multiset of lengths of its independent cycles.

**Theorems and formulas**:
- Cycle decomposition: every permutation can be written uniquely (up to the order of the factors) as a product of independent cycles; the sum of the cycle lengths equals n if fixed points are counted too.
- Order of a permutation: $\operatorname{ord}(\sigma)=\text{LCM}(k_1,\dots,k_m)$, where $k_i$ are the lengths of the independent cycles. Reason: on a cycle of length $k$ we need $k$ applications for all the elements to return, and the cycles act independently on different elements.
- Sign: if the decomposition with fixed points counted has exactly m cycles, then $\operatorname{sgn}(\sigma)=(-1)^{n-m}$; a cycle of length k has sign $(-1)^{k-1}$; a transposition changes the sign.
- $|A_n|=n!/2$ for $n\ge2$, $[S_n:A_n]=2$, hence $A_n$ is normal in $S_n$.
- Transpositions generate $S_n$; the cycle $(12\dots n)$ together with the transposition $(12)$ also generate $S_n$.
- Cayley's theorem: every finite group G of order n is isomorphic to some subgroup of the group $S_n$.
  - Skeleton of the proof:
  1. For every $g\in G$ define the left shift $L_g:G\to G$, $L_g(x)=gx$.
  2. $L_g$ is a bijection (with inverse map $L_{g^{-1}}$), so $L_g$ is an element of the group $S(G)$ of all bijections of the set G onto itself, and $S(G)\cong S_n$.
  3. The map $\Phi:G\to S(G)$, $\Phi(g)=L_g$, is a homomorphism: $L_{gh}(x)=ghx=L_g(L_h(x))$, that is, $L_{gh}=L_g\circ L_h$.
  4. The kernel is trivial: if $L_g=\mathrm{id}$, then $gx=x$ for all $x\in G$, in particular for $x=e$ we get $g=e$.
  5. Hence $\Phi$ is injective and $G\cong\Phi(G)\le S(G)\cong S_n$, so G is isomorphic to a subgroup of $S_n$. The map $\Phi$ is called the left regular representation.
  6. Remark: the bound n is not always minimal, for example $C_6\cong\langle(123)(45)\rangle\le S_5$ (the permutation $(123)(45)$ has order $\text{LCM}(3,2)=6$).
- Stirling numbers of the first kind (unsigned) $\left[{n\atop k}\right]$: the number of permutations of degree n having exactly k cycles (fixed points count as cycles of length 1).
- Recurrence:
$$\left[{n\atop k}\right]=\left[{n-1\atop k-1}\right]+(n-1)\left[{n-1\atop k}\right].$$
  Justification: take a permutation on $n-1$ elements and add the element n. Either n forms a separate cycle $(n)$, then $k-1$ cycles become k (the first term), or n is inserted into an existing cycle right after any of the $n-1$ elements, and the number of cycles does not change (the second term).
- Boundary values and the sum: $\left[{n\atop1}\right]=(n-1)!$ (there is exactly one cycle, a cycle of length n, and there are $(n-1)!$ such permutations), $\left[{n\atop n}\right]=1$, $\left[{n\atop0}\right]=0$ for $n\ge1$ and
$$\sum_{k=1}^{n}\left[{n\atop k}\right]=n!.$$
- Small values (rows for $n=1,2,3,4,5$): $1$; $1,1$; $2,3,1$; $6,11,6,1$; $24,50,35,10,1$.
- Generating functions: $x(x+1)(x+2)\cdots(x+n-1)=\sum_k\left[{n\atop k}\right]x^k$; the signed version $s(n,k)=(-1)^{n-k}\left[{n\atop k}\right]$ gives $x(x-1)\cdots(x-n+1)=\sum_k s(n,k)x^k$.

**Example**: $\sigma=(1234)(56)\in S_6$. Its order is $\text{LCM}(4,2)=4$: check $\sigma^2=(13)(24)$, $\sigma^4=e$. There are no fixed points, the number of cycles is m=2, hence $\operatorname{sgn}=(-1)^{6-2}=+1$, the permutation is even; the decomposition into transpositions gives the same: $(1234)(56)$ is $3+1=4$ transpositions, and 4 is an even number. Stirling numbers: $\left[{4\atop2}\right]=11$, let us check by enumeration in $S_4$: there are 3 double transpositions ($(12)(34)$, $(13)(24)$, $(14)(23)$), 8 three-cycles (4 choices of 3 elements, 2 directions of traversal), in total $3+8=11$. Further $\left[{4\atop1}\right]=3!=6$ (four-cycles), $\left[{4\atop4}\right]=1$, the sum is $6+11+6+1=24=4!$.

**What the examiner may ask**:
- Why is the order of a permutation the LCM of the cycle lengths and not their product? The cycles act on disjoint sets simultaneously, so the time must be a multiple of every length, for example $(1234)(56)$ has order 4, not 8.
- How is the sign computed from the cycle decomposition? $\operatorname{sgn}=(-1)^{n-m}$, where m is the number of cycles with fixed points counted; a cycle of length k contributes $(-1)^{k-1}$.
- Idea of the proof of Cayley's theorem? Left shifts, they are bijections, the map into them is a homomorphism with trivial kernel, hence an embedding into $S_n$.
- What is the sum of the Stirling numbers of the first kind over k? $n!$, since it is the partition of all $n!$ permutations by the number of cycles; the recurrence follows from the same count.

## Question 11. Direct sum of groups (subgroups). Examples.

**In plain words**: A cyclic group is generated entirely by the powers of a single element: $G=\langle g\rangle=\{e,g,g^2,\dots\}$. Their structure is the simplest: everything is described by the order n, and it is exactly from them that the whole classification of finite abelian groups is assembled (question 12). In cryptography this is the main working tool: the Diffie and Hellman protocol takes a generator of the cyclic group $\mathbb{Z}_p^*$ or of a cyclic subgroup of curve points, and the security rests on the hardness of the discrete logarithm. Knowing the number of generators $\varphi(n)$ is needed to avoid choosing a generator of small order (that kills the scheme).

**Definitions**:
- A group G is called cyclic if there exists $g\in G$ with $G=\langle g\rangle=\{g^k:k\in\mathbb{Z}\}$; such an element g is called a generator.
- Order of an element: the least positive integer $m$ with $g^m=e$; if there is no such $m$, the order is infinite. In a finite group $\operatorname{ord}(g)=|\langle g\rangle|$.
- Exponent of a group: the least $N$ with $a^N=e$ for all $a\in G$.

**Theorems and formulas**:
- Every cyclic group is abelian: $g^k g^m=g^{k+m}=g^m g^k$.
- Every subgroup of a cyclic group is cyclic. Idea: if $H\le\langle g\rangle$ and $H\ne\{e\}$, take the least $k>0$ with $g^k\in H$, then $H=\langle g^k\rangle$ (division with remainder: $m=qk+r$, $g^r=g^m(g^k)^{-q}\in H$, and $0\le r<k$ forces $r=0$).
- A finite cyclic group of order n is isomorphic to $(\mathbb{Z}_n,+)$, the isomorphism is $g^k\mapsto k$; an infinite cyclic group is isomorphic to $(\mathbb{Z},+)$. Conversely, $\mathbb{Z}_n$ is cyclic with generator 1.
- The order of an element in a cyclic group of order n:
$$\operatorname{ord}(g^k)=\frac{n}{\gcd(n,k)}.$$
- Number of generators: a cyclic group of order n has exactly $\varphi(n)$ generators.
- Proof (number of generators):
  1. All the elements of $\langle g\rangle$ are $g^0,g^1,\dots,g^{n-1}$, and the order of the subgroup $\langle g^k\rangle$ equals $\operatorname{ord}(g^k)$;
  2. $\langle g^k\rangle=G$ $\Leftrightarrow$ $\operatorname{ord}(g^k)=n$;
  3. by the order formula $\operatorname{ord}(g^k)=n/\gcd(n,k)=n$ $\Leftrightarrow$ $\gcd(n,k)=1$;
  4. the number of such k among $1,\dots,n$ equals $\varphi(n)$ by the definition of Euler's function;
  5. hence exactly $\varphi(n)$ elements generate the whole group, the rest generate proper subgroups.
- Subgroups of $\mathbb{Z}_n$: for every divisor $d\mid n$ there exists exactly one subgroup of order d, namely $\langle n/d\rangle$; there are no other subgroups. So there are $\tau(n)$ subgroups in total (the number of divisors of n), and all of them are cyclic.
- An element of order d in $\mathbb{Z}_n$ exists $\Leftrightarrow$ $d\mid n$; the number of elements of order d equals $\varphi(d)$. Justification: there is exactly one subgroup of order d in $\mathbb{Z}_n$, it is cyclic, so it contains $\varphi(d)$ elements of order d; at the same time $\sum_{d\mid n}\varphi(d)=n$, so all the elements are distributed among the orders with no remainder.
- Criterion of cyclicity for a finite group G of order n: the following conditions are equivalent
  - G is cyclic, that is, there exists an element of order n;
  - for every $d\mid n$ there is at most one subgroup of order d in G;
  - for every $d\mid n$ the number of elements of order d does not exceed $\varphi(d)$ (then, in view of $\sum_{d\mid n}\varphi(d)=n$, it equals $\varphi(d)$ for every d).
- $\mathbb{Z}_p^*$ is cyclic for every prime p (the multiplicative group of a finite field is cyclic), of order $p-1$. The group $\mathbb{Z}_n^*$ is not always cyclic: the criterion is $n\in\{1,2,4,p^k,2p^k\}$ for an odd prime p and $k\ge1$. Counterexample: $\mathbb{Z}_8^*=\{1,3,5,7\}$, all the elements have order 1 or 2, it is $\mathbb{Z}_2\oplus\mathbb{Z}_2$, not cyclic.
- For cryptography: the set of quadratic residues is a subgroup of index 2 in $\mathbb{Z}_p^*$, hence it has order $(p-1)/2$ and is cyclic.

**Example**: $\mathbb{Z}_{20}$: the order of the element k equals $20/\gcd(20,k)$. The generators are the k with gcd$(k,20)=1$: $1,3,7,9,11,13,17,19$, there are 8 of them, and indeed $\varphi(20)=20\cdot\frac12\cdot\frac45=8$. Individual orders: $\operatorname{ord}(1)=20$, $\operatorname{ord}(2)=10$, $\operatorname{ord}(4)=5$, $\operatorname{ord}(5)=4$, $\operatorname{ord}(10)=2$, $\operatorname{ord}(0)=1$. Distribution by orders: $8=\varphi(20)$ of order 20, $4=\varphi(10)$ of order 10 (these are 2, 6, 14, 18), $4=\varphi(5)$ of order 5 (these are 4, 8, 12, 16), $2=\varphi(4)$ of order 4 (these are 5, 15), one element of order 2 (this is 10) and one of order 1 (zero), the sum is $8+4+4+2+1+1=20$. There is one subgroup per divisor: of orders 1, 2, 4, 5, 10, 20. Second example: $\mathbb{Z}_7^*$ of order 6, its generators are 3 and 5 (there are $\varphi(6)=2$ of them), and the element 2 has order 3, since $2^3=8\equiv1\pmod7$.

**What the examiner may ask**:
- Why are there exactly $\varphi(n)$ generators? Via the formula $\operatorname{ord}(g^k)=n/\gcd(n,k)$: an element is a generator exactly when gcd$(k,n)=1$, and there are exactly $\varphi(n)$ such k.
- How do you find the order of an element in $\mathbb{Z}_n$? As $n/\gcd(n,k)$; for example in $\mathbb{Z}_{20}$ the element 4 has order $20/4=5$.
- Is every subgroup of a cyclic group cyclic? Yes, take the least positive power that lands in the subgroup.
- Is $\mathbb{Z}_8^*$ cyclic? No, its order is 4, but all the elements have order at most 2, the group is isomorphic to $\mathbb{Z}_2\oplus\mathbb{Z}_2$. While $\mathbb{Z}_7^*$ is cyclic of order 6.

## Question 12. Primary cyclic groups and their properties. Structure theorem for finite abelian groups.

**In plain words**: A direct sum is a coordinate-wise combination of groups: an element is a tuple of coordinates, the operations are performed coordinate by coordinate. An abelian group can be taken apart into elementary pieces, primary cyclic groups, much like a number is factored into primes, and the multiset of pieces is unique. Therefore the order and the decomposition of a group reveal everything: whether it is cyclic, how many elements of each order it has. In cryptography this is exactly the Chinese remainder theorem: $\mathbb{Z}_n$ splits into the sum $\mathbb{Z}_{p_i^{k_i}}$, so RSA computes modulo the prime factors faster, and secret sharing schemes reconstruct the secret from its parts.

**Definitions**:
- External direct sum (direct product) of groups $G_1,\dots,G_k$: the set $G_1\times\cdots\times G_k$ with the coordinate-wise operation
$$(g_1,\dots,g_k)(h_1,\dots,h_k)=(g_1h_1,\dots,g_kh_k).$$
  Notation $G_1\oplus\cdots\oplus G_k$ (for abelian groups) or $G_1\times\cdots\times G_k$. The order equals $\prod_i|G_i|$, the sum is abelian if and only if all the summands are abelian, and the order of an element equals $\text{LCM}(\operatorname{ord}(g_1),\dots,\operatorname{ord}(g_k))$.
- Internal direct sum: a group G is decomposed into the direct sum of subgroups $H_1,\dots,H_k$ ($G=H_1\oplus\cdots\oplus H_k$) if (1) $G=H_1H_2\cdots H_k$, that is, every element is a product $h_1\cdots h_k$, (2) $H_i\cap(H_1\cdots H_{i-1}H_{i+1}\cdots H_k)=\{e\}$ for every i, (3) all the $H_i$ are normal in G. Equivalently: every element of G is written uniquely as $h_1h_2\cdots h_k$ with $h_i\in H_i$.
- In the abelian case the conditions are simpler: $G=H_1+\cdots+H_k$ and $H_i\cap\sum_{j\ne i}H_j=\{0\}$. For two subgroups: $G=H\oplus K$ $\Leftrightarrow$ $|H||K|=|G|$ and $H\cap K=\{0\}$ (then $H,K$ are automatically normal).
- Primary group (p-group): a finite group whose order is a power of a prime p (equivalently: the order of every element is a power of p). Primary cyclic group: $\mathbb{Z}_{p^k}$, its order is $p^k$.
- Invariant factors of a group A: the decomposition $A\cong\mathbb{Z}_{d_1}\oplus\cdots\oplus\mathbb{Z}_{d_r}$, where $d_i>1$ and $d_1\mid d_2\mid\cdots\mid d_r$. The multiset of the $d_i$ is uniquely determined, $|A|=d_1\cdots d_r$, and $d_r$ is the exponent of the group.
- Elementary divisors: the multiset of orders $p^{k}$ of the primary cyclic summands in the primary decomposition.

**Theorems and formulas**:
- Criterion: $\mathbb{Z}_m\oplus\mathbb{Z}_n\cong\mathbb{Z}_{mn}$ $\Leftrightarrow$ gcd$(m,n)=1$.
  - Skeleton of the proof:
  1. The order of the element $(a,b)$ in $\mathbb{Z}_m\oplus\mathbb{Z}_n$ equals $\text{LCM}(\operatorname{ord}a,\operatorname{ord}b)$, so the maximal order of an element equals $\text{LCM}(m,n)$.
  2. If gcd$(m,n)=1$, then $\text{LCM}(m,n)=mn$ and the element $(1,1)$ has order $mn=|G|$, so it is a generator, the group is cyclic of order mn, that is, $\cong\mathbb{Z}_{mn}$.
  3. If gcd$(m,n)=d>1$, then $\text{LCM}(m,n)=mn/d<mn$: in $\mathbb{Z}_m\oplus\mathbb{Z}_n$ there is no element of order mn, while in $\mathbb{Z}_{mn}$ such an element exists (for instance 1), so the groups are not isomorphic.
  - Generalization: if $n_1,\dots,n_k$ are pairwise coprime, then $\mathbb{Z}_{n_1}\oplus\cdots\oplus\mathbb{Z}_{n_k}\cong\mathbb{Z}_{n_1\cdots n_k}$.
- Chinese remainder theorem: if $n=p_1^{k_1}\cdots p_r^{k_r}$ (distinct primes), then $\mathbb{Z}_n\cong\mathbb{Z}_{p_1^{k_1}}\oplus\cdots\oplus\mathbb{Z}_{p_r^{k_r}}$.
- Properties of the primary cyclic group $\mathbb{Z}_{p^k}$:
  1. the order is $p^k$;
  2. for every $i=0,1,\dots,k$ there is exactly one subgroup of order $p^i$, namely $\langle p^{k-i}\rangle$; these are all the subgroups, and they form the chain $\{0\}\subset\langle p^{k-1}\rangle\subset\langle p^{k-2}\rangle\subset\cdots\subset\mathbb{Z}_{p^k}$;
  3. the number of elements of order $p^i$ equals $\varphi(p^i)=p^i-p^{i-1}$ for $i\ge1$;
  4. every subgroup and every quotient group of a cyclic group is cyclic.
- Structure theorem for finite abelian groups: every finite abelian group A decomposes into a direct sum of primary cyclic groups,
$$A\cong\mathbb{Z}_{p_1^{k_1}}\oplus\mathbb{Z}_{p_2^{k_2}}\oplus\cdots\oplus\mathbb{Z}_{p_s^{k_s}},$$
  and this decomposition is unique up to the order of the summands (the multiset of orders $p_i^{k_i}$ is uniquely determined). An equivalent form: $A\cong\mathbb{Z}_{d_1}\oplus\cdots\oplus\mathbb{Z}_{d_r}$ with $d_1\mid d_2\mid\cdots\mid d_r$, the invariant factors are uniquely determined.
- Corollaries: A is cyclic $\Leftrightarrow$ in the invariant form $r=1$ $\Leftrightarrow$ in the primary decomposition there is at most one summand for every prime p. A is the direct sum of its Sylow p-subgroups (the component for every prime p is unique).
- Passing from the primary decomposition to the invariant factors: for every prime p write out the orders of its summands in non-increasing order; align the lists by length, padding them with ones on the left; multiply the entries of each column; the resulting products, ordered increasingly, are exactly $d_1\mid d_2\mid\cdots\mid d_r$.
- The number of abelian groups of order $n=p_1^{k_1}\cdots p_r^{k_r}$ equals $P(k_1)\cdots P(k_r)$, where $P$ is the number of partitions of a positive integer into summands: $P(1)=1$, $P(2)=2$, $P(3)=3$, $P(4)=5$.

**Example**: take $G=\mathbb{Z}_4\oplus\mathbb{Z}_2\oplus\mathbb{Z}_3\oplus\mathbb{Z}_3$, its order is $72=2^3\cdot3^2$. Primary decomposition: for the prime 2 the summands of orders 4 and 2, for the prime 3 of orders 3 and 3. We collect the columns (the first column takes the largest summand of every prime): $(4,3)$ and $(2,3)$; we multiply inside the columns: $d_2=4\cdot3=12$, $d_1=2\cdot3=6$, hence $G\cong\mathbb{Z}_6\oplus\mathbb{Z}_{12}$ (check: $6\mid12$, the order is $6\cdot12=72$). It is not cyclic, since there are two summands.
All abelian groups of order 72, there are exactly 6 of them (three partitions of the number 3: $3$, $2+1$, $1+1+1$; two partitions of the number 2: $2$ and $1+1$; in total $3\cdot2=6$): $\mathbb{Z}_{72}$; $\mathbb{Z}_3\oplus\mathbb{Z}_{24}$; $\mathbb{Z}_2\oplus\mathbb{Z}_{36}$; $\mathbb{Z}_6\oplus\mathbb{Z}_{12}$; $\mathbb{Z}_2\oplus\mathbb{Z}_2\oplus\mathbb{Z}_{18}$; $\mathbb{Z}_2\oplus\mathbb{Z}_6\oplus\mathbb{Z}_6$. All six are pairwise non-isomorphic, their exponents are $72,24,36,12,18,6$ respectively.
Another example of order $360=2^3\cdot3^2\cdot5$ (also 6 groups, since $3\cdot2\cdot1=6$): $\mathbb{Z}_8\oplus\mathbb{Z}_9\oplus\mathbb{Z}_5\cong\mathbb{Z}_{360}$ (exponent 360, there is an element of order 360) and $\mathbb{Z}_2\oplus\mathbb{Z}_4\oplus\mathbb{Z}_9\oplus\mathbb{Z}_5\cong\mathbb{Z}_2\oplus\mathbb{Z}_{180}$ (exponent 180, there is no element of order 360); these groups are not isomorphic.
A small illustration of the criterion: $\mathbb{Z}_2\oplus\mathbb{Z}_3\cong\mathbb{Z}_6$, since gcd$(2,3)=1$; but $\mathbb{Z}_2\oplus\mathbb{Z}_2$ is not cyclic (all non-identity elements have order 2, there is no element of order 4), therefore $\mathbb{Z}_2\oplus\mathbb{Z}_2\not\cong\mathbb{Z}_4$, although the orders coincide.

**What the examiner may ask**:
- When is $\mathbb{Z}_m\oplus\mathbb{Z}_n$ cyclic? If and only if gcd$(m,n)=1$.
- Why is $\mathbb{Z}_2\oplus\mathbb{Z}_2$ not isomorphic to $\mathbb{Z}_4$? The first has no element of order 4, its exponent is 2, the second has an element of order 4.
- Why is the decomposition unique? The number of elements of order $p^i$ in a group is recovered from the group itself, which uniquely recovers how many cyclic summands of order $p^i$ it contains.
- How do you find the invariant factors? Decompose by primes, align the lists and multiply the columns; for example $\mathbb{Z}_4\oplus\mathbb{Z}_2\oplus\mathbb{Z}_9\cong\mathbb{Z}_2\oplus\mathbb{Z}_{36}$.
- How many abelian groups of order 8 are there? Three: $\mathbb{Z}_8$, $\mathbb{Z}_4\oplus\mathbb{Z}_2$, $\mathbb{Z}_2\oplus\mathbb{Z}_2\oplus\mathbb{Z}_2$.

## Cheat sheet

1. Group: associativity, neutral $e$, inverse $a^{-1}$. Abelian: plus $ab=ba$.
2. Hierarchy: semigroup, monoid, group, abelian group. Ring: an abelian group under $+$, a semigroup under $\cdot$, distributivity. Field: a commutative ring with unity, all nonzero elements invertible.
3. $\mathbb{Z}_n$ is a field $\Leftrightarrow$ n is prime. In $\mathbb{Z}_n$ exactly the residues with gcd$(k,n)=1$ are invertible, there are $\varphi(n)$ of them, and they form the group $\mathbb{Z}_n^*$.
4. Examples of groups: $(\mathbb{Z},+)$, $(\mathbb{Z}_n,+)$, $(\mathbb{Z}_p^*,\cdot)$ of order $p-1$, $S_n$ of order $n!$, $GL_n(\mathbb{R})$, $SL_n(\mathbb{R})$.
5. $(ab)^{-1}=b^{-1}a^{-1}$; $\operatorname{ord}(a)=\operatorname{ord}(a^{-1})$; the order of an element divides $|G|$.
6. Subgroup criterion: a nonempty H is a subgroup $\Leftrightarrow$ $ab^{-1}\in H$ for all $a,b\in H$.
7. Lagrange: $|G|=|H|\cdot[G:H]$. Proof: the cosets $aH$ are disjoint, of equal size, and cover G.
8. Corollaries: $a^{|G|}=e$; Fermat $a^{p-1}\equiv1\pmod p$; Euler $a^{\varphi(n)}\equiv1\pmod n$ for gcd$(a,n)=1$.
9. A group of prime order is cyclic. The converse of Lagrange is false: $A_4$ of order 12 with no subgroup of order 6.
10. Permutation: a two-row table, $(\sigma\tau)(i)=\sigma(\tau(i))$, $|S_n|=n!$.
11. Cycle $(i_1\dots i_k)$; a permutation is a product of independent cycles; a fixed point is a cycle of length 1.
12. The order of a permutation equals the LCM of the lengths of the independent cycles.
13. Sign: $\operatorname{sgn}=(-1)^{n-m}$ for m cycles (fixed points included), $|A_n|=n!/2$.
14. Cayley: a group G of order n embeds into $S_n$ via the left shifts $L_g(x)=gx$, the kernel is trivial.
15. Stirling numbers of the first kind $\left[{n\atop k}\right]$: permutations of degree n with exactly k cycles; $\left[{n\atop k}\right]=\left[{n-1\atop k-1}\right]+(n-1)\left[{n-1\atop k}\right]$; the sum equals $n!$; the row $n=5$: $24,50,35,10,1$.
16. Cyclic group $G=\langle g\rangle$; a finite one of order n is isomorphic to $\mathbb{Z}_n$; a subgroup of a cyclic group is cyclic.
17. $\operatorname{ord}(g^k)=n/\gcd(n,k)$; there are exactly $\varphi(n)$ generators, they are the $g^k$ with gcd$(k,n)=1$.
18. In $\mathbb{Z}_n$ there are exactly $\varphi(d)$ elements of order d for $d\mid n$; there are exactly $\tau(n)$ subgroups, one of each order.
19. $\mathbb{Z}_p^*$ is cyclic of order $p-1$; $\mathbb{Z}_n^*$ is cyclic $\Leftrightarrow$ $n\in\{1,2,4,p^k,2p^k\}$; $\mathbb{Z}_8^*$ is not cyclic.
20. Direct sum: coordinate-wise operations, $|G_1\oplus G_2|=|G_1||G_2|$, $\operatorname{ord}(g_1,g_2)=\text{LCM}(\operatorname{ord}g_1,\operatorname{ord}g_2)$.
21. $\mathbb{Z}_m\oplus\mathbb{Z}_n\cong\mathbb{Z}_{mn}$ $\Leftrightarrow$ gcd$(m,n)=1$; CRT: $\mathbb{Z}_n\cong\mathbb{Z}_{p_1^{k_1}}\oplus\cdots\oplus\mathbb{Z}_{p_r^{k_r}}$.
22. $\mathbb{Z}_2\oplus\mathbb{Z}_3\cong\mathbb{Z}_6$, but $\mathbb{Z}_2\oplus\mathbb{Z}_2\not\cong\mathbb{Z}_4$ (no element of order 4).
23. Primary cyclic $\mathbb{Z}_{p^k}$: exactly one subgroup of order $p^i$ for every $i\le k$; elements of order $p^i$: exactly $\varphi(p^i)$.
24. Structure: a finite abelian group is a direct sum of primary cyclic groups, the decomposition is unique up to the order of the summands; invariant form $d_1\mid d_2\mid\cdots\mid d_r$.
25. An abelian group is cyclic $\Leftrightarrow$ one invariant factor; the exponent equals the largest invariant factor $d_r$.
26. The number of abelian groups of order $p_1^{k_1}\cdots p_r^{k_r}$ equals the product of the partition numbers $P(k_i)$.
27. Order 72, six groups: $\mathbb{Z}_{72}$, $\mathbb{Z}_3\oplus\mathbb{Z}_{24}$, $\mathbb{Z}_2\oplus\mathbb{Z}_{36}$, $\mathbb{Z}_6\oplus\mathbb{Z}_{12}$, $\mathbb{Z}_2\oplus\mathbb{Z}_2\oplus\mathbb{Z}_{18}$, $\mathbb{Z}_2\oplus\mathbb{Z}_6\oplus\mathbb{Z}_6$.
