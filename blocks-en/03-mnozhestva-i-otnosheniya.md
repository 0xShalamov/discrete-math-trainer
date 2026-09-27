# Block 3. Sets and binary relations

## Question 13. Set algebra, properties of set operations.

**In plain words**: A set is an unordered collection of distinguishable objects, like `set` in Python: the order does not matter, repetitions are not counted, and for every object there is exactly one answer to the question of whether it belongs to the set or not. The power set (the set of all subsets) is conveniently encoded by bit masks of length $n$, hence its cardinality is $2^n$. Operations on sets are exactly `and`, `or`, `not` on masks, so the algebra of sets is isomorphic to the algebra of propositional logic: almost every law of sets is a familiar law of logic.

**Definitions**:
- A set is defined when for any object $x$ one can say: $x \in A$ or $x \notin A$. Ways to define it: enumeration $\{a, b, c\}$, characteristic predicate $\{x \in U \mid P(x)\}$, generation procedure.
- Equality: $A = B$ if and only if $\forall x\ (x \in A \leftrightarrow x \in B)$, that is $A \subseteq B$ and $B \subseteq A$ (double inclusion).
- Subset: $A \subseteq B \iff \forall x\ (x \in A \Rightarrow x \in B)$. Proper subset: $A \subset B$ when $A \ne B$.
- Universe $U$: the set of all objects under consideration. The empty set $\varnothing$ contains no elements.
- Power set: $\mathcal{P}(A) = 2^A = \{B \mid B \subseteq A\}$.
- Operations: $A \cup B = \{x \mid x \in A \vee x \in B\}$ (union); $A \cap B = \{x \mid x \in A \wedge x \in B\}$ (intersection); $A \setminus B = \{x \mid x \in A \wedge x \notin B\}$ (difference); $A \triangle B = (A \setminus B) \cup (B \setminus A) = (A \cup B) \setminus (A \cap B)$ (symmetric difference, elements of exactly one of the sets); $\overline{A} = U \setminus A$ (complement).
- $A$ and $B$ are disjoint if $A \cap B = \varnothing$.

**Theorems and formulas**: for any $A, B, C \subseteq U$:
- idempotence: $A \cup A = A$, $A \cap A = A$;
- commutativity: $A \cup B = B \cup A$, $A \cap B = B \cap A$;
- associativity: $(A \cup B) \cup C = A \cup (B \cup C)$ and likewise for $\cap$;
- distributivity: $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ and the dual $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$;
- De Morgan's laws: $\overline{A \cup B} = \overline{A} \cap \overline{B}$ and $\overline{A \cap B} = \overline{A} \cup \overline{B}$;
- absorption: $A \cup (A \cap B) = A$, $A \cap (A \cup B) = A$;
- laws with $U$ and $\varnothing$: $A \cup U = U$, $A \cap U = A$, $A \cup \varnothing = A$, $A \cap \varnothing = \varnothing$;
- complement: $A \cup \overline{A} = U$, $A \cap \overline{A} = \varnothing$, $\overline{\overline{A}} = A$, $\overline{U} = \varnothing$;
- corollaries: $A \setminus B = A \cap \overline{B}$, $A \triangle A = \varnothing$, $A \triangle \varnothing = A$.

Cardinality of the power set: if $|A| = n$, then $|\mathcal{P}(A)| = 2^n$. Skeleton of the proof: 1) to every $B \subseteq A$ we assign the characteristic vector (mask) $\chi_B$ of length $n$: $\chi_B(a_i) = 1$ if $a_i \in B$, otherwise $0$; 2) this correspondence is bijective, the subset is uniquely recovered from its mask; 3) there are exactly $2^n$ masks by the product rule (two options for each of the $n$ positions); 4) hence $|\mathcal{P}(A)| = 2^n$, which agrees with the sum of binomial coefficients $\sum_k \binom{n}{k} = 2^n$ and explains the notation $2^A$.

Duality principle: if in an identity of the algebra of sets we replace $\cup$ by $\cap$, $\cap$ by $\cup$, $\varnothing$ by $U$, $U$ by $\varnothing$ (leaving the other symbols untouched), the result is again a valid identity. The reason: complement turns union into intersection (De Morgan), swaps $\varnothing$ and $U$, and is a bijection of the power set onto itself, that is, an isomorphism of the algebra. Thus the dual distributivity and the absorption law for $\cap$ follow from their counterparts automatically.

Proof of the law $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ in two ways.
Method 1, via membership (double inclusion): 1) take $x \in A \cap (B \cup C)$, then $x \in A$ and ($x \in B$ or $x \in C$); 2) if $x \in B$, then $x \in A \cap B$; if $x \in C$, then $x \in A \cap C$; in both cases $x$ lands in the right side, the inclusion $\subseteq$ is proved; 3) conversely, if $x \in (A \cap B) \cup (A \cap C)$, then $x \in A \cap B$ or $x \in A \cap C$, and in either case $x \in A$ and $x \in B \cup C$; 4) the two inclusions together give equality.
Method 2, membership table: we enumerate all $2^3 = 8$ triples of values of $A, B, C$ and compute both expressions.

| $A$ | $B$ | $C$ | $B \cup C$ | $A \cap (B \cup C)$ | $A \cap B$ | $A \cap C$ | $(A \cap B) \cup (A \cap C)$ |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

The columns of the left and right sides coincide on all rows, the identity is true. Any law is checked in the same way: it holds when the corresponding columns are identical.

**Example**: $U = \{1, 2, 3, 4, 5, 6\}$, $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5\}$. Then $A \cup B = \{1, 2, 3, 4, 5\}$, $A \cap B = \{3, 4\}$, $A \setminus B = \{1, 2\}$, $B \setminus A = \{5\}$, $A \triangle B = \{1, 2, 5\}$, $\overline{A} = \{5, 6\}$, $\overline{B} = \{1, 2, 6\}$. De Morgan check: $\overline{A \cup B} = \{6\}$ and $\overline{A} \cap \overline{B} = \{5, 6\} \cap \{1, 2, 6\} = \{6\}$, they match. The power set of the four-element $A$ contains $2^4 = 16$ subsets: $\varnothing$, four singletons, six pairs, four triples, and $A$ itself.

**What the examiner may ask**:
- "What is the symmetric difference?" Elements that belong to exactly one of the two sets: $A \triangle B = (A \cup B) \setminus (A \cap B)$; the operation is commutative and associative, $A \triangle A = \varnothing$.
- "State the duality principle and explain why it works." We swap $\cup$ and $\cap$, $\varnothing$ and $U$; it works because complement is an isomorphism of the algebra of sets, it maps every identity to the dual one.
- "How is equality of sets proved?" Only by double inclusion or by a membership table; appealing to intuition is not allowed.
- "How many subsets does an $n$-element set have?" $2^n$; the proof is via characteristic vectors (bit masks).

## Question 14. Binary relations and their kinds.

**In plain words**: A binary relation is just a set of pairs, that is, a two-column table (like a many-to-many link in a relational database) or the edge list of a directed graph. A homogeneous relation is a graph on the vertices $A$ with loops, and its properties describe the structure of the graph: reflexivity is about loops, symmetry is about paired edges, transitivity is about replacing a path of length two by a single edge. Composition is a pipeline: $(a, c) \in S \circ R$ if there is an intermediate point $b$ reached by $R$ and from which $S$ leads. Transitive closure is reachability: if $R$ is a "direct flight", then $R^t$ is "get there with any number of flights".

**Definitions**:
- Cartesian product: $A \times B = \{(a, b) \mid a \in A,\ b \in B\}$, and $|A \times B| = |A| \cdot |B|$.
- A binary relation from $A$ to $B$: any subset $R \subseteq A \times B$; instead of $(a, b) \in R$ one writes $a\,R\,b$. For $A = B$ the relation is called homogeneous (on $A$).
- Domain $\mathrm{Dom}\,R = \{a \mid \exists b: a\,R\,b\}$; range $\mathrm{Ran}\,R = \{b \mid \exists a: a\,R\,b\}$.
- Inverse relation: $R^{-1} = \{(b, a) \mid (a, b) \in R\} \subseteq B \times A$; moreover $(R^{-1})^{-1} = R$.
- Composition: $S \circ R = \{(a, c) \in A \times C \mid \exists b \in B: (a, b) \in R,\ (b, c) \in S\}$, that is, $R$ is applied first, then $S$. Textbooks differ in the order of the factors in the notation; what matters is that in a composition the paths are traversed from $R$ to $S$. Powers: $R^1 = R$, $R^{k+1} = R^k \circ R$; the elements of $R^k$ are pairs joined by a path of length $k$.
- Sections: $R(a) = \{b \mid a\,R\,b\}$ (images of an element), $R^{-1}(b) = \{a \mid a\,R\,b\}$ (preimages).
- Ways to specify a relation: enumeration of pairs; a boolean matrix $M_R$ of size $|A| \times |B|$, where $M_{ij} = 1 \iff a_i\,R\,b_j$; a graph (directed when $A = B$, otherwise bipartite); a predicate $P(x, y)$; sections.
- Kinds of relations (for $f \subseteq A \times B$): functional (single-valued): $a\,f\,b$ and $a\,f\,b'$ imply $b = b'$; injective: distinct $a$ give distinct images ($a \ne a' \Rightarrow f(a) \ne f(a')$); surjective: $\mathrm{Ran}\,f = B$; bijection: injection and surjection at the same time; total: $\mathrm{Dom}\,f = A$. A function is a functional total relation.
- Properties of a homogeneous $R \subseteq A \times A$: reflexivity $\forall a: a\,R\,a$; irreflexivity $\forall a: \neg(a\,R\,a)$; symmetry $a\,R\,b \Rightarrow b\,R\,a$; antisymmetry $a\,R\,b \wedge b\,R\,a \Rightarrow a = b$; asymmetry $a\,R\,b \Rightarrow \neg(b\,R\,a)$; transitivity $a\,R\,b \wedge b\,R\,c \Rightarrow a\,R\,c$.
- Closure of a relation $R$ with respect to a property $P$: the inclusion-smallest relation with property $P$ that contains $R$ (unique, if it exists).

**Theorems and formulas**:
- Properties via the boolean matrix $M = M_R$ (boolean product $(M \odot M)_{ij} = \bigvee_k (M_{ik} \wedge M_{kj})$): reflexivity: the whole diagonal is ones; irreflexivity: the diagonal is zero; symmetry: $M = M^{\mathsf{T}}$; antisymmetry: there is no $i \ne j$ with $M_{ij} = M_{ji} = 1$; transitivity: $M^2 \le M$ componentwise, which is equivalent to $R^2 \subseteq R$.
- Asymmetry is equivalent to the pair "irreflexivity plus antisymmetry".
- Closures: reflexive $R^{r} = R \cup I_A$, where $I_A = \{(a, a) \mid a \in A\}$; symmetric $R^{s} = R \cup R^{-1}$; transitive $R^{t} = R \cup R^2 \cup R^3 \cup \dots$, and for $|A| = n$ it suffices to take $R^{t} = R \cup R^2 \cup \dots \cup R^n$; reflexive-transitive $R^{*} = R^{t} \cup I_A$.
- Link with reachability: $a\,R^t\,b$ if and only if the graph of the relation has a path from $a$ to $b$ of length at least 1; for $R^{*}$ a path of length 0 is allowed as well.
- Skeleton of the proof of the formula for $R^t$: 1) the union contains $R$; 2) the union is transitive, since $R^k \circ R^m = R^{k+m}$ (gluing paths); 3) any transitive $S \supseteq R$ contains all $R^k$ by induction, hence contains the union too (minimality); 4) a path longer than $n$ repeats a vertex, the extra cycle is discarded, so powers up to $n$ suffice.
- The number of binary relations on an $n$-element set: $2^{n^2}$ (every relation is a subset of the $n^2$ pairs). The transitive closure of a finite relation is computed by Warshall's algorithm in $O(n^3)$.

**Example**: $A = \{1, 2, 3\}$, $R = \{(1, 2), (2, 3)\}$. Matrix:

$$M_R = \begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}$$

Then $R^{-1} = \{(2, 1), (3, 2)\}$, $R^2 = \{(1, 3)\}$, $R^t = R \cup R^2 = \{(1, 2), (2, 3), (1, 3)\}$, that is, the strict inequality on $\{1, 2, 3\}$. The relation $R$ is irreflexive and asymmetric but not transitive: the pairs $(1, 2)$ and $(2, 3)$ are present, while $(1, 3)$ is not, hence $M^2 \not\le M$. After the closure transitivity appears.

**What the examiner may ask**:
- "How does antisymmetry differ from asymmetry?" Antisymmetry allows loops and forbids mutual pairs only for distinct elements; asymmetry forbids loops as well; asymmetry is equivalent to irreflexivity together with antisymmetry. Example: $\le$ is antisymmetric but not asymmetric, while $<$ is asymmetric.
- "How is transitivity checked by the matrix?" By the condition $M^2 \le M$ with boolean multiplication and componentwise comparison.
- "What is the transitive closure?" The smallest transitive relation containing $R$; it equals the union of all powers, and for $n$ elements $R \cup \dots \cup R^n$ suffices; it is computed by Warshall's algorithm.
- "How many binary relations are there on an $n$-element set?" $2^{n^2}$.

## Question 15. Properties of homogeneous binary relations. Ordering of sets.

**In plain words**: An order is a generalized "not greater than": divisibility, inclusion of sets, lexicographic comparison of strings. A partial order (like divisibility) allows incomparable elements: 2 and 3 do not divide each other. A linear order (like $\le$ on numbers) requires every pair to be comparable. A Hasse diagram is a minimized scheme of the order: we draw only the covers (pairs with nothing in between), and everything else is recovered by transitivity, like a compressed dependency graph.

**Definitions**:
- A relation $\preceq$ on $A$ is called a non-strict (partial) order relation if it is reflexive, antisymmetric and transitive; the pair $(A, \preceq)$ is called a partially ordered set (poset).
- A relation $\prec$ is called a strict order relation if it is irreflexive, asymmetric and transitive. Connection: $a \prec b \iff a \preceq b \wedge a \ne b$ and conversely $a \preceq b \iff a \prec b \vee a = b$; the passages are mutually inverse (to the strict order we add the diagonal, from the non-strict one we remove it).
- The order is linear (total) if it is partial and any two elements are comparable: $\forall a, b: a \preceq b \vee b \preceq a$. A linearly ordered set is called a chain; if there is an incomparable pair, the order is partial but not linear.
- Element $b$ covers element $a$ (notation $a \lessdot b$) if $a \prec b$ and there is no $c$ such that $a \prec c \prec b$.
- Hasse diagram: elements as points in the plane, $a$ is joined by a segment to $b$ (with $a$ below $b$) if $a \lessdot b$; loops and edges that follow from transitivity are not drawn.
- Minimal element: there is no $x$ with the property $x \prec m$. Maximal: there is no $x$ with the property $m \prec x$. Least: $m \preceq x$ for all $x$. Greatest: $x \preceq m$ for all $x$.

**Theorems and formulas**:
- Recovering the order from the Hasse diagram: $a \preceq b$ if and only if $a = b$ or the diagram has a path from $a$ upwards to $b$.
- Uniqueness of the least element: if $m_1$ and $m_2$ are least, then $m_1 \preceq m_2$ and $m_2 \preceq m_1$, and by antisymmetry $m_1 = m_2$. Likewise the greatest element is unique.
- A least element is minimal and is the only minimal one; the converse is false: there may be several minimal elements and no least one. In a linear order a minimal element is automatically least, since all elements are comparable and a minimal element has no strictly smaller one.
- In a finite non-empty poset minimal and maximal elements exist; otherwise one would get an infinite strict descent, impossible in a finite set.
- Criterion for a finite poset to be linear: the Hasse diagram is a vertical chain $a_1 \lessdot a_2 \lessdot \dots \lessdot a_n$, that is, the order is given by a permutation of all the elements. There are exactly $n!$ linear orders on $n$ elements.
- Examples of posets: divisibility $(\mathbb{N}, \mid)$, the power set $(\mathcal{P}(X), \subseteq)$, the real line $(\mathbb{R}, \le)$ (a chain), the lexicographic order of words. In the power set the infimum is $\cap$ and the supremum is $\cup$; in divisibility they are the GCD and the LCM.

**Example**: $D = \{1, 2, 3, 4, 6, 12\}$ with the order $a \preceq b \iff a \mid b$. Covers: $1 \lessdot 2$, $1 \lessdot 3$, $2 \lessdot 4$, $2 \lessdot 6$, $3 \lessdot 6$, $4 \lessdot 12$, $6 \lessdot 12$ (the pair 3 and 12 is not a cover, 6 lies between them). The diagram: 1 at the bottom, 2 and 3 above it, 4 and 6 higher up, 12 at the top. The least element (which is also the only minimal one) is 1, the greatest is 12. Incomparable pairs: 3 and 4, 4 and 6, so the order is not linear, although the greatest and the least elements exist. For comparison: for divisibility on $\{2, 3, 4, 6\}$ the minimal elements are 2 and 3, the maximal ones are 4 and 6, and there is no least and no greatest element.

**What the examiner may ask**:
- "How does a minimal element differ from a least one?" A minimal element has no strictly smaller elements, a least element is not greater than any of them; the least element is unique and minimal, while there may be many minimal ones (example: $\{2, 3, 4, 6\}$ with divisibility).
- "How is the relation recovered from the Hasse diagram?" Add reflexivity and take the transitive closure: $a \preceq b$ when there is a path upwards.
- "Give an example of a partial but not linear order." Divisibility on $\{2, 3, 4, 6\}$ (2 and 3 are incomparable) or inclusion on a power set ($\{1\}$ and $\{2\}$ are incomparable).
- "Prove the uniqueness of the least element." If $m_1$ and $m_2$ are least, then $m_1 \preceq m_2$ and $m_2 \preceq m_1$, whence $m_1 = m_2$ by antisymmetry.

## Question 16. Equivalence relation, quotient set.

**In plain words**: An equivalence is equality up to a chosen attribute: the same remainder modulo something, the same hash, the same string after lowercasing. The relation cuts the set into clusters inside which elements are interchangeable. For a programmer this is union-find or `groupby`: an equivalence and a partition are the same object from two sides, and the quotient set is the list of classes, one canonical representative per class.

**Definitions**:
- A relation $\sim$ on $A$ is called an equivalence relation if it is reflexive, symmetric and transitive.
- Equivalence class of an element $a$: $[a] = \{x \in A \mid x \sim a\}$.
- Quotient set: $A/{\sim} = \{[a] \mid a \in A\}$; its cardinality equals the number of blocks of the partition (the index).
- A partition of a set $A$: a family of non-empty pairwise disjoint subsets $B_1, \dots, B_k$ whose union is $A$.
- Equivalence generated by a partition: $x \sim y \iff x$ and $y$ lie in the same block.

**Theorems and formulas**:
- Lemma: $[a] = [b] \iff a \sim b$. Skeleton: if $[a] = [b]$, then $b \in [b] = [a]$, hence $b \sim a$, and by symmetry $a \sim b$; conversely, if $a \sim b$, then every $x \in [a]$ satisfies $x \sim a \sim b$, that is, $x \in [b]$, and symmetrically $[b] \subseteq [a]$.
- Theorem (the classes form a partition): for any equivalence the classes are non-empty, are pairwise disjoint or coincide, and their union is $A$. Skeleton: 1) $a \in [a]$ by reflexivity, hence non-emptiness and covering; 2) if $[a] \cap [b] \ne \varnothing$, take $c$ in the intersection: $c \sim a$ and $c \sim b$; 3) by symmetry $a \sim c$, by transitivity $a \sim b$; 4) by the lemma $[a] = [b]$, so distinct classes do not intersect.
- Theorem (converse): any partition of $A$ defines an equivalence by the rule "lie in the same block", and the two constructions are mutually inverse, that is, there is a bijection between partitions and equivalences. Skeleton: reflexivity and symmetry are obvious; transitivity: if $x, y$ lie in a block $B$ and $y, z$ lie in a block $B'$, then $y \in B \cap B'$, the blocks coincide, hence $x$ and $z$ lie in the same block.
- Corollary: the number of equivalences on an $n$-element set equals the number of partitions, that is, the Bell number $B_n = \sum_{k=1}^{n} S(n, k)$, where $S(n, k)$ are the Stirling numbers of the second kind (partitions into exactly $k$ blocks). For example, $B_3 = 5$.
- Useful criterion: if $a \not\sim b$, then $[a] \cap [b] = \varnothing$; distinct classes do not intersect, elements of distinct classes are not equivalent.

**Example**: on $\mathbb{Z}$ take $a \sim b \iff a \equiv b \pmod{3} \iff 3 \mid (a - b)$. Axioms: reflexivity $3 \mid 0$; symmetry: from $3 \mid (a - b)$ it follows that $3 \mid (b - a)$; transitivity: $a - c = (a - b) + (b - c)$ is a sum of multiples of three, hence a multiple of three. Classes: $[0] = \{\dots, -3, 0, 3, 6, \dots\}$, $[1] = \{\dots, -2, 1, 4, 7, \dots\}$, $[2] = \{\dots, -1, 2, 5, 8, \dots\}$. The quotient set $\mathbb{Z}/{\sim} = \{[0], [1], [2]\}$ consists of three classes, and the canonical representative of a class is the remainder `x % 3` in a program. Grouping strings by hash is arranged in the same way (a class is the set of strings with the same hash), as is the canonicalization of addresses and paths: all spellings of one resource (with `./`, with double slashes, in different case) form a single equivalence class, and in a CTF, instead of enumerating all variants, it suffices to compare normalized (canonical) forms.

**What the examiner may ask**:
- "Give the definition of an equivalence relation and examples." Reflexivity, symmetry, transitivity; examples: equality, congruence modulo $n$, equal hash on a set of strings, similarity of triangles.
- "What is an equivalence class and a quotient set?" $[a] = \{x \mid x \sim a\}$; $A/{\sim}$ is the set of all classes, its cardinality equals the number of classes.
- "Prove that the classes form a partition." Non-emptiness from reflexivity; if classes intersect, they coincide (via an element of the intersection, symmetry and transitivity); the union of all the classes is $A$.
- "Is the converse true, that any partition defines an equivalence?" Yes, the relation "lie in the same block" is an equivalence, and the correspondence between partitions and equivalences is bijective.

## Cheat sheet

- Operations: $A \cup B$, $A \cap B$, $A \setminus B$ (only from $A$), $A \triangle B$ (in exactly one), $\overline{A} = U \setminus A$.
- Laws: idempotence, commutativity, associativity, distributivity (two dual ones), De Morgan, absorption, $A \cup \varnothing = A$, $A \cap U = A$, $A \cap \overline{A} = \varnothing$.
- Duality: swap $\cup \leftrightarrow \cap$ and $\varnothing \leftrightarrow U$.
- Proving equalities of sets: double inclusion or a membership table over $2^n$ rows.
- Power set: $|\mathcal{P}(A)| = 2^{|A|}$ (characteristic vectors, bit masks).
- Relation: $R \subseteq A \times B$; inverse $R^{-1}$; composition $S \circ R$ ($R$ first), powers $R^k$ are paths of length $k$.
- Ways to specify: pairs, matrix, graph, predicate, sections.
- Properties: reflexivity (diagonal of ones), irreflexivity (zero diagonal), symmetry ($M = M^{\mathsf{T}}$), antisymmetry (no mirror ones off the diagonal), asymmetry (neither loops nor mirror pairs), transitivity ($M^2 \le M$).
- Asymmetry = irreflexivity plus antisymmetry.
- Closures: $R^r = R \cup I_A$; $R^s = R \cup R^{-1}$; $R^t = R \cup \dots \cup R^n$ for $|A| = n$; $R^t$ is reachability in the graph.
- Number of relations on $n$ elements: $2^{n^2}$.
- Order: reflexive, antisymmetric, transitive; strict order: irreflexive, asymmetric, transitive; a linear order adds comparability of all pairs; there are $n!$ linear orders.
- Hasse diagram: covers only, bottom to top; the order is recovered by paths upwards.
- Minimal (no strictly smaller) versus least (not greater than all): the least is unique, there may be many minimal ones.
- In a finite non-empty poset minimal and maximal elements exist.
- Equivalence: reflexive, symmetric, transitive.
- Classes: $[a] = \{x \mid x \sim a\}$; $[a] = [b] \iff a \sim b$; classes form a partition; conversely, any partition defines an equivalence (bijection).
- Quotient set $A/{\sim}$: cardinality equals the number of classes; example: $\mathbb{Z}$ modulo $n$ gives exactly $n$ classes.
- Memory hint: an equivalence is union-find, an order is a dependency tree, composition is a pipeline.
