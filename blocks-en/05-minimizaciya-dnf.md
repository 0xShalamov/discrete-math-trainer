# Block 5. Minimization of Boolean functions: DNF, Blake-Poretsky, Karnaugh

Running example of the block (referred to below as the function $F_1$):

$$f(x,y,z) = \Sigma(0,1,2,5,6,7)$$

| $x$ | $y$ | $z$ | $f$ |
|:--|:--|:--|:--|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

PDNF (perfect DNF): $\bar{x}\bar{y}\bar{z} \vee \bar{x}\bar{y}z \vee \bar{x}y\bar{z} \vee x\bar{y}z \vee xy\bar{z} \vee xyz$ (6 terms, 18 literals).

---

## Question 25. Minimization of Boolean functions. Reduced, dead-end and minimal DNF.

**In plain words**: a function is given by a table or by a PDNF, and what is wanted is the cheapest possible circuit of AND, OR and NOT gates. A DNF is a sum of products, and it corresponds to a depth-two circuit, where the number of literals is the number of circuit inputs and the number of terms is the number of AND gates. Minimization means throwing out everything superfluous from the formula. The central intermediate object is the reduced DNF, that is the disjunction of all prime implicants, from which all dead-end DNFs are then obtained by deleting terms, and the minimal one among them.

**Definitions**:

* **Literal**: a variable $x_i$ or its negation $\bar{x_i}$.
* **Conjunction (elementary)**: a product of literals of different variables, $K = l_1 l_2 \dots l_k$; if it contains $x_i$ and $\bar{x_i}$, it is identically 0 (degenerate).
* **DNF**: $D = K_1 \vee K_2 \vee \dots \vee K_m$, where all $K_j$ are nondegenerate conjunctions. **CNF** is dual: a conjunction of disjunctions of literals.
* **Length of a DNF**: $|D| = \sum_j |K_j|$, the number of literals counted with multiplicity; the **number of terms** is $m$.
* **PDNF**: the disjunction of all minterms (full conjunctions, one literal per variable) that correspond to unit sets.
* **Implicant** of a function $f$: a conjunction $K$ with the property $K \subseteq f$, that is $K(\alpha) = 1 \Rightarrow f(\alpha) = 1$ for every set $\alpha$ (equivalently $K \to f \equiv 1$; one says that $K$ is absorbed by $f$).
* **Prime implicant**: an implicant that ceases to be an implicant when any one of its literals is deleted, that is none of its proper parts is an implicant.
* **Reduced DNF**: the disjunction of all prime implicants of the function.
* **Dead-end DNF**: a DNF made of prime implicants from which no term can be deleted without changing the function.
* **Minimal DNF**: a dead-end DNF of the smallest length (number of literals); when the lengths are equal, the DNF with fewer terms is taken. **Shortest DNF**: the dead-end one with the fewest terms.
* **Minimization problem**: find (if possible) a minimal DNF, that is a DNF of the smallest length, and justify that nothing shorter is possible.

**Theorems and formulas**:

1. **On containment**: every implicant $K$ contains some prime implicant. Proof in outline: the set of implicants lying inside $K$ is finite and nonempty; take one maximal by inclusion, it is prime by definition (otherwise a literal could be deleted from it).
2. **Theorem on the reduced DNF**: the disjunction of all prime implicants is a DNF of the function $f$. Proof in outline: (a) every prime implicant lies inside $f$, so the disjunction does not give 1 where $f$ equals 0; (b) every unit set $\alpha$ is covered by its minterm from the PDNF, that minterm contains a prime implicant by item 1, and that one contains $\alpha$; so all ones are covered and the function coincides.
3. **Corollaries**: the reduced DNF is uniquely determined by the function; every conjunction of any DNF of the function $f$ is absorbed by some prime implicant of it; every dead-end DNF is obtained from the reduced one by deleting some of the terms; a minimal DNF is dead-end, so only dead-end DNFs have to be enumerated.
4. **Length estimate**: the PDNF has length $n \cdot |M_f|$, where $M_f$ is the set of unit sets. For $F_1$: $3 \cdot 6 = 18$ literals; the reduced DNF has 12 literals; the minimal one has 6 literals.
5. Ways to build the reduced DNF: merging and absorption (the Blake and Poretsky method, Question 26) and the Quine method with marks (its tabular form: the Quine-McCluskey method). Then the covering problem arises (Question 27).

**Example** (function $F_1$, minimization as a whole):

* PDNF, 18 literals: $\bar{x}\bar{y}\bar{z} \vee \bar{x}\bar{y}z \vee \bar{x}y\bar{z} \vee x\bar{y}z \vee xy\bar{z} \vee xyz$.
* Mergings of unit sets differing in one bit (there are exactly six of them):
$$\bar{x}\bar{y}\bar{z} \vee \bar{x}\bar{y}z = \bar{x}\bar{y},\quad \bar{x}\bar{y}\bar{z} \vee \bar{x}y\bar{z} = \bar{x}\bar{z},\quad \bar{x}\bar{y}z \vee x\bar{y}z = \bar{y}z,$$
$$xy\bar{z} \vee xyz = xy,\quad x\bar{y}z \vee xyz = xz,\quad \bar{x}y\bar{z} \vee xy\bar{z} = y\bar{z}.$$
* Reduced DNF (12 literals, 6 terms), all terms prime:
$$\bar{x}\bar{y} \vee \bar{x}\bar{z} \vee \bar{y}z \vee y\bar{z} \vee xz \vee xy.$$
* There are no essential prime implicants: every unit set (0, 1, 2, 5, 6, 7) is covered by exactly two prime implicants, so the reduced DNF can be shortened further.
* All six ones can be covered by three terms, for example
$$\bar{x}\bar{y} \vee xz \vee y\bar{z} \quad\text{or}\quad \bar{x}\bar{z} \vee \bar{y}z \vee xy$$
(check: $\bar{x}\bar{y}$ gives the sets 0 and 1, $y\bar{z}$ gives 2 and 6, $xz$ gives 5 and 7, together the whole set $M_f$).
* Result: the length dropped from 18 to 6 literals, the number of terms from 6 to 3; there are two minimal DNFs, both of length 6 (this is established by enumerating covers in Question 27).

**What the examiner may ask**:

* How does an implicant differ from a prime implicant? An implicant simply does not go outside the ones of the function; a prime one cannot be shortened by a single literal, it is maximal by inclusion.
* Why need the reduced DNF not be minimal? It collects all prime implicants, and covering the ones often takes only some of them: for $F_1$, 3 of the 6 prime implicants suffice.
* What is the length of a DNF and what is optimized? The number of literals (the inputs of the circuit); when the lengths are equal, fewer terms are preferred.
* Why minimize at all? The number of literals is the number of circuit inputs, the number of terms is the number of AND gates: a shorter DNF means a cheaper and faster circuit.

---

## Question 26. The Blake-Poretsky algorithm for finding the reduced DNF. Example.

**In plain words**: to get the reduced DNF there is nothing to invent: take the PDNF and apply two operations to the limit, merging (combine two conjunctions that differ in one literal and throw that literal away) and absorption (delete a conjunction that contains a shorter one). When both operations stop changing the formula, the reduced DNF has been obtained, that is all prime implicants at once, with no covering table.

**Definitions**:

* **Merging**: $Ax \vee A\bar{x} \to A$, where $A$ is a conjunction and $x$ a variable (the literals of $Ax$ and $A\bar{x}$ coincide everywhere except $x$). A special case: $x \vee \bar{x} = 1$.
* **Absorption**: $A \vee AB \to A$, where $A$ and $AB$ are conjunctions (that is $A$ is a part of $AB$).
* **Generalized merging** (resolvent, consensus): if there are $Ax$ and $B\bar{x}$, where $A$ and $B$ do not contain $x$, then $AB$ is added. For $A = B$ this is ordinary merging. To start from the PDNF, ordinary merging is enough, since all terms of a PDNF have the same set of literals.
* **Blake-Poretsky algorithm**: while at least one of the operations is applicable, apply it to the current DNF; stop when it has stabilized. The result is the reduced DNF.

**Theorems and formulas**:

1. **Correctness of merging**: if $Ax \subseteq f$ and $A\bar{x} \subseteq f$, then $A = Ax \vee A\bar{x} \subseteq f$, that is $A$ is an implicant too (merging does not leave the function).
2. **Correctness of absorption**: $A \vee AB = A$, this is an identity of Boolean algebra, the function does not change.
3. **Completeness**: every prime implicant is obtained from the PDNF by a series of mergings. Proof sketch: the ones of a prime implicant $A$ form a subcube; its unit sets are minterms of the PDNF differing only in the free variables; merging them pairwise, we get rid of these variables one after another and arrive at $A$.
4. **Finiteness**: every merging adds a conjunction of strictly smaller length, and the total number of conjunctions over $n$ variables is finite, exactly $3^n$ (a variable is either absent, or present negated, or present unnegated). So the process terminates, since the number of possible terms is bounded.
5. **Uniqueness of the result**: although the order in which the operations are applied is arbitrary, the outcome is always the same, the reduced DNF (by the theorem from Question 25 it is determined by the function).
6. Difference from the Quine-McCluskey method: there one builds a merging table and then a covering table; here the reduced DNF is obtained at once, but the minimal DNF is still searched by enumerating covers.

**Example** (a complete manual run for $F_1 = \Sigma(0,1,2,5,6,7)$):

Initial PDNF (6 terms, 18 literals):
$$\bar{x}\bar{y}\bar{z} \vee \bar{x}\bar{y}z \vee \bar{x}y\bar{z} \vee x\bar{y}z \vee xy\bar{z} \vee xyz.$$

Round 1, merging. Write out all pairs of conjunctions differing in exactly one literal (sets differing in exactly one bit):
$$\bar{x}\bar{y}\bar{z} \vee \bar{x}\bar{y}z = \bar{x}\bar{y} \;\;(000,001), \qquad \bar{x}\bar{y}\bar{z} \vee \bar{x}y\bar{z} = \bar{x}\bar{z} \;\;(000,010),$$
$$\bar{x}\bar{y}z \vee x\bar{y}z = \bar{y}z \;\;(001,101), \qquad \bar{x}y\bar{z} \vee xy\bar{z} = y\bar{z} \;\;(010,110),$$
$$x\bar{y}z \vee xyz = xz \;\;(101,111), \qquad xy\bar{z} \vee xyz = xy \;\;(110,111).$$
Add these six terms. The remaining pairs (for example 000 and 011, 001 and 111) differ in two or more literals and cannot be merged.

Round 1, absorption. Each of the six minterms of the PDNF contains one of the new conjunctions ($\bar{x}\bar{y}\bar{z}$ contains $\bar{x}\bar{y}$ and so on), so all six minterms are crossed out. Current DNF:
$$\bar{x}\bar{y} \vee \bar{x}\bar{z} \vee \bar{y}z \vee y\bar{z} \vee xz \vee xy \quad (6 \text{ terms}, 12 \text{ literals}).$$

Round 2. There is nothing left to merge: any two of these conjunctions have different sets of literals (for example $\bar{x}\bar{y}$ and $\bar{x}\bar{z}$ differ not in one literal but in the literal $y$ instead of $z$), and there is nothing to absorb: no conjunction is a part of another. The operations are inapplicable, so the reduced DNF has been obtained.

Check against the truth table. Each of the six conjunctions is an implicant: for example $\bar{x}\bar{z}$ equals 1 on the sets 000 and 010, and there $f$ equals 1; $xy$ equals 1 on 110 and 111, and there $f$ equals 1. Conversely, all unit sets are covered: 000 and 001 are given by $\bar{x}\bar{y}$, 010 and 110 by $y\bar{z}$, 101 and 111 by $xz$, 011 and 100 are zeros of the function and are covered by nothing ($\bar{x}\bar{y}$ does not contain them, nor do the rest). So the DNF constructed coincides with $f$ and all its terms are prime.

Second run (shows absorption working on the mergings already eaten). Take $f = \Sigma(0,1,2,3,4,5,6)$, that is $f = \bar{x} \vee \bar{y} \vee \bar{z}$. PDNF: 7 terms, 21 literals. Round 1 gives nine conjunctions: $\bar{x}\bar{y}, \bar{x}\bar{z}, \bar{x}y, \bar{x}z, \bar{y}\bar{z}, \bar{y}z, x\bar{y}, x\bar{z}, y\bar{z}$ (18 literals), all minterms of the PDNF are absorbed. Round 2 merges: $\bar{x}\bar{y} \vee \bar{x}y = \bar{x}$, $\bar{x}\bar{z} \vee \bar{x}z = \bar{x}$, $\bar{x}\bar{y} \vee x\bar{y} = \bar{y}$, $\bar{y}\bar{z} \vee \bar{y}z = \bar{y}$, $\bar{x}\bar{z} \vee x\bar{z} = \bar{z}$, $\bar{y}\bar{z} \vee y\bar{z} = \bar{z}$. This yields $\bar{x}, \bar{y}, \bar{z}$, and absorption crosses out all nine intermediate conjunctions (each contains one of the three literals). Round 3 changes nothing. Result: $\bar{x} \vee \bar{y} \vee \bar{z}$, three literals instead of twenty-one.

**What the examiner may ask**:

* Why is absorption needed, is merging not enough? Without absorption the DNF grows and does not converge to the reduced one: absorption is exactly what deletes all conjunctions that are not prime.
* Why does the method necessarily stop? Every merging yields a conjunction of strictly smaller length, and the number of distinct conjunctions is finite, $3^n$.
* What changes if the operations are applied in another order? Nothing: the reduced DNF is unique, the method yields it in any order.
* Can merging be applied to conjunctions with different literals? Ordinary merging requires the literals to coincide except one; in the general case (for an arbitrary DNF, not only a PDNF) one applies generalized merging $Ax \vee B\bar{x} \to AB$, for example $x \vee \bar{x}\bar{y} = x \vee \bar{y}$.

---

## Question 27. Finding dead-end and minimal DNFs.

**In plain words**: the reduced DNF is a warehouse of candidates, the prime implicants, and it almost always contains superfluous ones. A dead-end DNF is a selection of prime implicants from which not one can be thrown out any more, and a minimal one is the shortest among the dead-end ones. To find them one builds a covering table (rows are unit sets, columns are prime implicants), singles out the essential prime implicants, and sorts out the remainder by Petrick's method: multiply the disjunctions over the rows and expand the brackets with absorption.

**Definitions**:

* **Covering table** (Quine's table): rows are unit sets (minterms) from $M_f$, columns are prime implicants; a cell is marked if the implicant equals 1 on that set.
* **Essential prime implicant**: a prime implicant that stands alone in its row, that is the only one covering some unit set. Such an implicant belongs to every dead-end DNF.
* **Dead-end DNF**: a DNF of prime implicants no term of which can be deleted without changing the function; equivalently: a minimal by inclusion set of prime implicants covering all rows of the table.
* **Minimal DNF**: a dead-end DNF of the smallest length (number of literals); **shortest**: the one with the fewest terms.
* **Covering problem**: choose a minimum number of columns covering all rows. This is exactly it: minimizing a DNF reduces to the covering problem, which in the general case is a brute-force search.

**Theorems and formulas**:

1. **On essential prime implicants**: if a unit set is covered by a single prime implicant, then this implicant belongs to all dead-end DNFs. After it is included, the rows it covers are crossed out of the table and the problem shrinks.
2. **On dead-end DNFs**: every dead-end DNF is a subset of the reduced DNF (by the corollary from Question 25); conversely, a subset of prime implicants yields a dead-end DNF if and only if it is minimal by inclusion and covers all ones.
3. **Petrick's method**: for each row of the table write down the disjunction of the prime implicants of this row; multiply all these disjunctions and expand the brackets by the distributive laws, simplifying by the rules $X \vee XY = X$, $X \cdot X = X$, $X(X \vee Y) = X$. Every term of the resulting DNF yields a dead-end DNF: it is a set of implicants covering all rows from which nothing can be thrown out. The minimal DNF corresponds to the term with the fewest literals (in case of a tie, with the fewest factors).
4. **On non-uniqueness**: there may be several minimal DNFs; the number of dead-end DNFs grows very fast with the number of variables, so in practice one limits oneself to a reasonable enumeration.

**Example** ($F_1 = \Sigma(0,1,2,5,6,7)$). Prime implicants and their covers:

$$A = \bar{x}\bar{y}:\{0,1\}, \quad B = \bar{x}\bar{z}:\{0,2\}, \quad C = \bar{y}z:\{1,5\}, \quad D = xy:\{6,7\}, \quad E = xz:\{5,7\}, \quad F = y\bar{z}:\{2,6\}.$$

Covering table (rows are the sets 0, 1, 2, 5, 6, 7):

| set | $\bar{x}\bar{y}$ | $\bar{x}\bar{z}$ | $\bar{y}z$ | $xy$ | $xz$ | $y\bar{z}$ |
|:--|:--|:--|:--|:--|:--|:--|
| 000 | + | + |  |  |  |  |
| 001 | + |  | + |  |  |  |
| 010 |  | + |  |  |  | + |
| 101 |  |  | + |  | + |  |
| 110 |  |  |  | + |  | + |
| 111 |  |  |  | + | + |  |

There are no essential prime implicants: every row has exactly two marks, so no unit set is covered by a single implicant.

Petrick's method. Multiply the disjunctions over the rows:

$$K = (A \vee B)(A \vee C)(B \vee F)(C \vee E)(D \vee F)(D \vee E).$$

Expand step by step with absorption:
$$(A \vee B)(A \vee C) = A \vee BC, \qquad (D \vee F)(D \vee E) = D \vee FE, \qquad (B \vee F)(C \vee E) = BC \vee BE \vee FC \vee FE,$$
$$(A \vee BC)(BC \vee BE \vee FC \vee FE) = BC \vee ABE \vee ACF \vee AEF,$$
$$(BC \vee ABE \vee ACF \vee AEF)(D \vee FE) = BCD \vee BCFE \vee ABDE \vee ACDF \vee AEF$$
(the last absorption: $AEF$ eats $ABEF$, $ACEF$, $ADEF$).

Total five dead-end DNFs:

| dead-end DNF | terms | literals |
|:--|:--|:--|
| $AEF = \bar{x}\bar{y} \vee xz \vee y\bar{z}$ | 3 | 6 |
| $BCD = \bar{x}\bar{z} \vee \bar{y}z \vee xy$ | 3 | 6 |
| $ABDE = \bar{x}\bar{y} \vee \bar{x}\bar{z} \vee xy \vee xz$ | 4 | 8 |
| $ACDF = \bar{x}\bar{y} \vee \bar{y}z \vee xy \vee y\bar{z}$ | 4 | 8 |
| $BCEF = \bar{x}\bar{z} \vee \bar{y}z \vee xz \vee y\bar{z}$ | 4 | 8 |

The minimum by literals is 6, it is given by two dead-end DNFs, so there are two minimal DNFs:
$$f = \bar{x}\bar{y} \vee xz \vee y\bar{z} = \bar{x}\bar{z} \vee \bar{y}z \vee xy,$$
both of length 6 with 3 terms (against 12 literals for the reduced one and 18 for the PDNF). Check: the first covers the sets $\{0,1\} \cup \{5,7\} \cup \{2,6\} = M_f$; the second covers $\{0,2\} \cup \{1,5\} \cup \{6,7\} = M_f$; there are no superfluous sets, since every set is either a one of the function or not covered.

**What the examiner may ask**:

* Why can the "unnecessary" prime implicants not be crossed out one by one, greedily? Because after one implicant is removed another may become necessary; one must look for a minimal by inclusion cover as a whole, by enumeration or by Petrick's method.
* What does a term correspond to in Petrick's method? A ready dead-end DNF: a set of implicants covering all rows from which nothing can be thrown out.
* How is the minimal one chosen among the dead-end ones? Count the length (the number of literals), and in case of equal lengths the number of terms; in the example both minimal DNFs have 6 literals and 3 terms each.
* Must the minimal DNF be unique? No, in the example there are two of them.

---

## Question 28. Geometric interpretation of a DNF. Example.

**In plain words**: tuples of zeros and ones are the vertices of an $n$-dimensional cube, and a conjunction is a subcube (interval): it fixes some coordinates and leaves the rest free. Then a DNF is a cover of the set of unit vertices by such subcubes that do not touch zeros, a prime implicant is a maximal subcube lying entirely inside the ones, and minimization is the search for a cover with the smallest sum of missing dimensions (that is, with the fewest literals). The Gray code gives a traversal of the vertices in which neighbours differ in one bit, and the Karnaugh maps are built on this.

**Definitions**:

* **$n$-dimensional cube** $B_n = \{0,1\}^n$: vertices are sets of length $n$, edges join vertices differing in exactly one coordinate. $B_n$ has $2^n$ vertices and $n \cdot 2^{n-1}$ edges (for $B_3$: 8 vertices, 12 edges, 6 faces, 1 cube; for $B_4$: 16 vertices, 32 edges).
* **Hamming distance** $\rho(\alpha,\beta)$: the number of differing coordinates. Edges are pairs with $\rho = 1$.
* **Interval (subcube) of dimension $k$**: the set of all vertices in which $n-k$ coordinates are fixed and the remaining $k$ are free; it contains $2^k$ vertices. The number of intervals of dimension $k$ equals $C_n^k 2^{n-k}$ (for $n=3$, by dimensions 0, 1, 2, 3 we get 8, 12, 6, 1: vertices, edges, faces, the whole cube).
* **Set of ones** $M_f$: the vertices where $f = 1$.
* **DNF as a cover**: every conjunction of $r$ literals defines an interval of dimension $n-r$; a DNF realizes $f$ if all intervals of its terms lie inside $M_f$ and their union equals $M_f$.
* **Maximal interval**: an interval inside $M_f$ that cannot be extended without leaving $M_f$. Prime implicants correspond one-to-one to maximal intervals.
* **Gray code of order $n$**: a sequence of all $2^n$ sets of length $n$ in which every two neighbouring sets differ in exactly one position (and the last and the first as well, so the code is cyclic).

**Theorems and formulas**:

1. **Dictionary**: a conjunction of $r$ literals $\leftrightarrow$ an interval of dimension $n-r$ with $2^{n-r}$ vertices (a vertex: 3 literals for $n = 3$; an edge: 2 literals, 2 vertices; a face: 1 literal, 4 vertices; the whole cube: 0 literals, 8 vertices, that is the constant 1).
2. **Length of a DNF geometrically**: for a cover $M_f = I_1 \cup \dots \cup I_m$ the length equals $\sum_j (n-\dim I_j)$. Minimization means covering the unit vertices by subcubes of the greatest possible dimension, so in a cover only maximal intervals are worth taking.
3. **Connection with Question 25**: prime implicants are exactly the maximal intervals inside $M_f$; the reduced DNF is the disjunction of all maximal intervals; a dead-end DNF is a minimal by inclusion cover made of maximal intervals.
4. **Gray code, recursive construction**: $G_1 = (0, 1)$; $G_n = (0G_{n-1}, 1G^{R}_{n-1})$, that is to the previous code we prepend 0, then to the reversed code we prepend 1. Property sketch: inside the halves neighbours differ in one bit by induction, and at the junction the two last elements $0\alpha$ and $1\alpha$ with a common tail do the job, they differ only in the first bit.
5. **Gray code, explicit formula**: the set with number $i$ (numbering from zero) equals $g(i) = i \oplus (i \gg 1)$, where $\oplus$ is bitwise addition modulo 2 and $\gg$ a right shift.
6. For $n = 2$: $00, 01, 11, 10$; for $n = 3$: $000, 001, 011, 010, 110, 111, 101, 100$; for $n = 4$: $0000, 0001, 0011, 0010, 0110, 0111, 0101, 0100, 1100, 1101, 1111, 1110, 1010, 1011, 1001, 1000$ (sixteen sets, neighbours differ in one bit, the last and the first as well, verified). These sequences are the labelling of the rows and columns of the Karnaugh maps from Question 29.

**Example** ($F_1 = \Sigma(0,1,2,5,6,7)$ on the cube $B_3$). We draw the cube as two faces $x = 0$ and $x = 1$:

```
        x = 0                     x = 1
   000 ------- 001          100 ------- 101
    |           |            |           |
    |           |            |           |
   010 ------- 011          110 ------- 111
```

Edges between the faces: 000 and 100, 001 and 101, 010 and 110, 011 and 111.

* Unit vertices: 000, 001, 010, 101, 110, 111 (six). Zero vertices: 011 and 100.
* Edges (one-dimensional intervals) lying entirely inside the ones: there are exactly six of them, and they correspond to prime implicants:
000 and 001 (this is $\bar{x}\bar{y}$), 000 and 010 ($\bar{x}\bar{z}$), 001 and 101 ($\bar{y}z$), 010 and 110 ($y\bar{z}$), 101 and 111 ($xz$), 110 and 111 ($xy$).
* There are no two-dimensional intervals inside the ones: every face of the cube contains a zero vertex ($x = 0$ face contains 011, $x = 1$ face contains 100, $y = 0$ contains 100, $y = 1$ contains 011, $z = 0$ contains 100, $z = 1$ contains 011). So all maximal intervals are one-dimensional, that is all prime implicants have two literals each.
* Minimal cover: at least three intervals are needed, because every maximal interval here is an edge, that is only two vertices, and two edges cannot cover six vertices. And three edges give $3 \cdot 2 = 6$ literals, and this is achievable: the intervals $\{000, 010\}$, $\{001, 101\}$, $\{110, 111\}$ cover all ones and correspond to the DNF $\bar{x}\bar{z} \vee \bar{y}z \vee xy$ of length 6. It cannot be shorter, so this DNF is minimal, which agrees with the conclusion of Question 27.

**What the examiner may ask**:

* How many vertices and edges does $B_4$ have? 16 vertices and 32 edges ($n \cdot 2^{n-1}$).
* How does one see from the cube that an implicant is prime? Its interval is maximal: any extension step (dropping one more fixed coordinate) captures a zero vertex.
* Why cannot the ones be covered by an interval containing a zero vertex? Such a conjunction corresponds to an implicant equal to 1 where the function equals 0, that is the formula will stop realizing the function.
* What is the Gray code for? It is a traversal of the cube vertices where neighbours differ in one bit, so neighbouring cells of the table (the Karnaugh map) merge; with the ordinary binary order neighbouring sets in the table would differ in several positions and there would be no merging.

---

## Question 29. Gray code. Karnaugh maps and their use for constructing reduced DNFs.

**In plain words**: a Karnaugh map is a truth table folded into a square whose rows and columns are labelled with the Gray code. Then neighbouring cells correspond to sets differing in one bit and can be merged, that is prime implicants are seen at once as rectangles of ones. We merge ones into maximal rectangles, every rectangle gives one conjunction, and their disjunction is the reduced DNF.

**Definitions**:

* **Karnaugh map** for $n$ variables: a table of $2^n$ cells, each cell holding the value of the function on the corresponding set; the rows are labelled with $n_1$ variables, the columns with the remaining $n-n_1$, and the Gray code order is used in both directions.
* **Group (merging)**: a set of cells with ones forming a rectangle of admissible size; every group corresponds to a conjunction of the literals whose values are constant inside the group (the value 1 gives an unnegated literal, the value 0 a negated one).
* **Edge of the map**: the map is closed into a torus, the outermost columns are considered neighbouring, the outermost rows too, and the four corners form a separate group of four cells.
* **Merging rules**: a group must have size $2^k$ (1, 2, 4, 8, 16 cells), that is be a strip of width 1 along one axis and $2^j$ along the other; groups are allowed to overlap; every one must fall into at least one group; a group is taken as large as possible (it must not be extendable), otherwise the conjunction will be longer; diagonal and "cross-shaped" unions are forbidden.
* **Duality**: for a CNF one groups the zeros, and then a variable enters the disjunction negated if its value inside the group equals 1.
* **Incompletely specified function**: in cells with a dash (a don't-care value) one may by convention put 1 if this enlarges the groups.

**Theorems and formulas**:

1. **Number of literals in a term**: if a group contains $2^k$ cells, its conjunction contains $n-k$ literals. A group of all $2^n$ cells is the constant 1, a group of $2^{n-1}$ cells (half the map) is one literal.
2. **Correspondence**: maximal groups of the map are prime implicants, that is the reduced DNF is obtained at once from the map; choosing a dead-end and a minimal DNF still requires checking which groups must be taken (Question 27), but usually this is visible directly on the map.
3. **Check**: if every one is covered and no group contains zeros and cannot be extended, the DNF is correct; the equality of the obtained DNF to the original function is checked against the truth table.
4. **Limitation of the method**: convenient up to 5 or 6 variables (for 5 and 6 variables one takes two or four 4 by 4 maps and merges groups across the "mirror" cells of neighbouring maps); for a larger number of variables one applies the Quine-McCluskey method.

**Example** (four variables, $f(x_1,x_2,x_3,x_4) = \Sigma(0,1,2,3,4,5,6,7,8,10,12,13)$).

We number the rows by pairs $(x_1,x_2)$ in Gray order $00, 01, 11, 10$, the columns by pairs $(x_3,x_4)$ in the same order:

| $(x_1,x_2) \backslash (x_3,x_4)$ | 00 | 01 | 11 | 10 |
|:--|:--|:--|:--|:--|
| 00 | 1 | 1 | 1 | 1 |
| 01 | 1 | 1 | 1 | 1 |
| 11 | 1 | 1 | 0 | 0 |
| 10 | 1 | 0 | 0 | 1 |

We look for maximal groups of ones.

* **Group of 8 cells**: the two upper rows ($x_1 = 0$). Inside it $x_1$ is constant and equals 0, the other variables run through all values, so the conjunction is $\bar{x}_1$.
* **Group of 4 cells, the corners of the map**: cells 0, 2, 8, 10, that is the upper and the lower rows together with the left and the right columns (the edge of the map is closed). In the group $x_2 = 0$ and $x_4 = 0$, so the conjunction is $\bar{x}_2\bar{x}_4$ (check: 0000, 0010, 1000, 1010 give exactly these codes).
* **Group of 4 cells in the middle**: rows 01 and 11 (that is $x_2 = 1$) and columns 00 and 01 (that is $x_3 = 0$): cells 4, 5, 12, 13. Conjunction $x_2\bar{x}_3$.
* **Group of 4 cells, the left column**: cells 0, 4, 8, 12, that is $x_3 = x_4 = 0$, conjunction $\bar{x}_3\bar{x}_4$.

Reduced DNF (all four groups are maximal, none can be extended):
$$f = \bar{x}_1 \vee \bar{x}_2\bar{x}_4 \vee x_2\bar{x}_3 \vee \bar{x}_3\bar{x}_4 \quad (1 + 2 + 2 + 2 = 7 \text{ literals}).$$

Now we check whether all groups are needed (or look at the map). The ones 1, 3, 6, 7 are interior to the group $\bar{x}_1$, there is nothing else to cover them with: $\bar{x}_1$ is essential. Cell 10 is covered only by the group $\bar{x}_2\bar{x}_4$, cell 13 only by the group $x_2\bar{x}_3$: both are essential. But the group $\bar{x}_3\bar{x}_4$ is superfluous: its cells 0 and 4 are already inside $\bar{x}_1$, cell 8 inside $\bar{x}_2\bar{x}_4$, cell 12 inside $x_2\bar{x}_3$. We cross it out and get the minimal DNF
$$f = \bar{x}_1 \vee \bar{x}_2\bar{x}_4 \vee x_2\bar{x}_3 \quad (5 \text{ literals}, 3 \text{ terms});$$
it cannot be shorter, since the essential terms already give $1 + 2 + 2 = 5$ literals. Check against the table: $\bar{x}_1$ covers 0, 1, 2, 3, 4, 5, 6, 7; $\bar{x}_2\bar{x}_4$ covers 0, 2, 8, 10; $x_2\bar{x}_3$ covers 4, 5, 12, 13; the union equals the set of ones $\{0,1,2,3,4,5,6,7,8,10,12,13\}$, there are no superfluous sets, since the intervals do not touch zeros (9, 11, 14, 15 are not covered).

**What the examiner may ask**:

* Why is the labelling by the Gray code and not by ordinary counting? So that neighbouring cells differ in one bit and merging two cells gives a conjunction without one literal; with the ordinary order neighbouring cells would differ in several bits and there would be no merging.
* Can one take a group of three or six cells? No. A group must have size a power of two, otherwise it is not a subcube and does not reduce to a single conjunction.
* How does one obtain a CNF? Group the zeros; every group gives a disjunction in which a variable is taken negated if its value in the group equals 1, and the result is the conjunction of such disjunctions.
* Is the group from the left column necessary? No, in the example it is superfluous: all its ones are already covered by other groups, so the minimal DNF does without it.

---

## Cheat sheet

* A DNF is a $\bigvee$ of conjunctions of literals; the length of a DNF is the number of literals with multiplicities; the PDNF has length $n|M_f|$.
* Implicant: $K \subseteq f$; prime implicant: nothing can be deleted; the reduced DNF is the disjunction of all prime implicants, it is unique.
* Every implicant contains a prime one (take one maximal by inclusion); every DNF of the function $f$ consists of conjunctions absorbed by prime implicants.
* Dead-end DNF: made of prime implicants, no term can be thrown out; minimal DNF: dead-end with the fewest literals, and in case of equal lengths with the fewest terms; a minimal DNF is always dead-end.
* The running example $f = \Sigma(0,1,2,5,6,7)$: the PDNF has 18 literals, the reduced DNF 12 literals, the minimal one 6 literals and it is not unique: $\bar{x}\bar{y} \vee xz \vee y\bar{z} = \bar{x}\bar{z} \vee \bar{y}z \vee xy$.
* Blake and Poretsky: merging $Ax \vee A\bar{x} = A$ and absorption $A \vee AB = A$, apply until stabilization; the result is the reduced DNF; it terminates, since there are only $3^n$ conjunctions.
* Generalized merging (resolvent): $Ax \vee B\bar{x} \to AB$; for $A = B$ this is ordinary merging; from a PDNF the ordinary one suffices.
* Covering table: rows are unit sets, columns are prime implicants; an essential prime implicant stands alone in a row and belongs to all dead-end DNFs.
* Petrick's method: multiply the disjunctions over the rows, expand the brackets with absorption, every term is a dead-end DNF; choose the shortest (first by literals).
* Cubes: a conjunction of $r$ literals is an interval of dimension $n-r$ with $2^{n-r}$ vertices; prime implicants are the maximal intervals inside $M_f$.
* Geometry of the minimal DNF: cover all unit vertices by maximal intervals with the smallest sum $\sum(n-\dim I_j)$.
* Gray code: $G_n = (0G_{n-1}, 1G^{R}_{n-1})$; the set with number $i$ equals $i \oplus (i \gg 1)$; neighbours differ in one bit, the code is cyclic.
* $B_3$: 8 vertices, 12 edges, 6 faces; $B_4$: 16 vertices, 32 edges.
* Karnaugh map: rows and columns in Gray code order; groups only of 2, 4, 8, 16 cells, only rectangles, the edge of the map is closed, the corners are neighbours, groups overlap, every one is covered, groups are taken maximal.
* The number of literals in a term equals $n-\log_2(\text{number of cells in the group})$; half the map is one literal.
* Example with four variables: the reduced DNF $\bar{x}_1 \vee \bar{x}_2\bar{x}_4 \vee x_2\bar{x}_3 \vee \bar{x}_3\bar{x}_4$ (7 literals), the minimal one $\bar{x}_1 \vee \bar{x}_2\bar{x}_4 \vee x_2\bar{x}_3$ (5 literals).
* CNF from the map: group the zeros, disjunctions with negation when the value in the group is 1.
* Order of an answer to any question of the block: definitions, theorem, then a manual example with a check against the table.
