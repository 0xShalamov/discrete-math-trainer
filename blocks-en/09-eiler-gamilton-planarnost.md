# Block 9. Euler, Hamilton, colorings, planarity

Questions 55-60: Eulerian and Hamiltonian graphs, colorings, planar graphs, $K_5$ and $K_{3,3}$, the Pontryagin-Kuratowski theorem. Logic of the block: Euler's criterion (even degrees) → sufficient conditions for Hamiltonicity (Dirac, Ore) → colorings (the greedy bound $\Delta+1$, Brooks' theorem) → Euler's formula $v-e+f=2$ and density bounds for a planar graph → two forbidden graphs → the Pontryagin-Kuratowski criterion.

## Question 55. Eulerian graphs. Necessary and sufficient conditions.

**In plain words**: The Konigsberg bridge problem of 1736 asks whether all seven bridges can be crossed exactly once each. Euler noticed that the answer depends only on the parity of the vertex degrees: a tour that returns to the start exists if and only if all degrees are even. If the tour is allowed to end at another vertex, there must be exactly zero or two odd vertices. The shape of the graph, the lengths of the edges and the geometry of the picture do not matter.

**Definitions**:
- Walk: a sequence $v_0 e_1 v_1 e_2 \dots e_k v_k$, where the edge $e_i$ joins $v_{i-1}$ and $v_i$. Trail: a walk with no repeated edges. Closed walk: one with $v_k = v_0$.
- Terminological caution: different textbooks use the words "trail" and "path" in different ways, so in the exam we spell it out in words: the edges are not repeated.
- Eulerian trail (Eulerian walk): a trail that passes along every edge of the graph exactly once.
- Eulerian circuit: a closed Eulerian trail. A graph that has an Eulerian circuit is called Eulerian.
- The graph in the statements: connected after isolated vertices are dropped (isolated vertices do not affect a tour); multigraphs are allowed, otherwise the Konigsberg problem cannot be written down.

**Theorems and formulas**:
- Theorem 55.1 (circuit criterion). A connected graph (multigraph) has an Eulerian circuit if and only if every one of its vertices has even degree.
- Necessity. Let $C$ be an Eulerian circuit and let $v$ be a vertex. Every entry into $v$ along one edge is accompanied by an exit along another edge, and all edges of the circuit are distinct and cover all edges of the graph. Hence all edges incident to $v$ split into entry-exit pairs, that is every passage through the vertex contributes 2 to the degree, and $\deg v = 2m$ is even.
- Sufficiency (construction, the idea "while cycles exist, splice them"). Let all degrees be even. Take a trail $T$ of maximum length with no repeated edges. Inside the trail every vertex spends edges in pairs, so at the end $v_k$ an odd number of edge ends has been spent; if $v_k \ne v_0$, then with even degree $v_k$ still has an unused edge and the trail can be extended, which contradicts maximality. Hence $v_0 = v_k$ and $T$ is a cycle. If $T$ does not cover all edges, then by connectivity there is a vertex $u \in T$ with an edge outside $T$; we build a maximal trail from $u$ along unused edges, it also closes into a cycle $C'$, and the cycles $T$ and $C'$ splice into one cycle: walk along $T$ to $u$, go around $C'$, continue $T$. Each splicing decreases the number of unused edges, we repeat until full coverage: induction on the number of edges.
- Theorem 55.2 (trail criterion). A connected graph has an Eulerian (not necessarily closed) trail if and only if the number of odd-degree vertices is 0 or 2. If there are two odd vertices ($s$ and $t$), then every Eulerian trail starts at one of them and ends at the other; if there are none, the trail can be closed.
- Sufficiency with two odd vertices $s,t$: we add the edge $st$ (if it already exists we get a multigraph, which is allowed), all degrees become even, we apply Theorem 55.1 and get an Eulerian circuit; we delete the added edge from it and an Eulerian trail from $s$ to $t$ remains.
- If there are 4 or more odd vertices, or the graph is disconnected (there are edges in different components), then there is neither a circuit nor a trail.
- Algorithms: Hierholzer's algorithm (we build cycles and splice them) runs in $O(e)$; Fleury's algorithm (cross a bridge only when there is no other way out).

**Example**: Konigsberg. Vertices: $A$ (northern bank), $B$ (southern bank), $C$ (Kneiphof island), $D$ (Lomse island). Bridges: two between $A$ and $C$, two between $B$ and $C$, one $A$-$D$, one $B$-$D$, one $C$-$D$, 7 in total. Degrees: $\deg A = 3$, $\deg B = 3$, $\deg C = 5$, $\deg D = 3$, four odd vertices, so neither a circuit nor a trail. The envelope (house): 5 vertices, 6 edges (base, two walls, ceiling, two roof lines), degrees $2,2,3,3,2$, exactly two odd ones, the two upper corners, so a trail exists, it has to start at one upper corner and end at the other. $K_5$: all degrees 4, an Eulerian circuit exists. $K_{3,3}$: all degrees 3, six odd vertices, neither a circuit nor a trail.

**What the examiner may ask**:
1. "Why is there no tour of Konigsberg?" Four odd-degree vertices, while a trail requires 0 or 2 odd ones.
2. "Is even degree enough without connectivity?" No: two disjoint triangles give all degrees 2, but there is no single tour through all the edges.
3. "How do you build a circuit in practice?" Hierholzer's algorithm by splicing cycles, linear complexity in the number of edges.
4. "Why multigraphs?" Konigsberg is described by a multigraph, and the criterion is true for multigraphs.

## Question 56. Hamiltonian graphs. Sufficient conditions.

**In plain words**: A Hamiltonian cycle passes through every vertex exactly once and returns to the start. An Eulerian cycle passes through every edge exactly once. Eulerian graphs have a simple criterion in terms of parity, Hamiltonian graphs have no simple criterion: recognizing Hamiltonicity is an NP-complete problem. That is why the exam asks for sufficient conditions (Dirac and Ore) and counterexamples (the Petersen graph, complete bipartite graphs with unequal parts).

**Definitions**:
- Simple cycle: a cycle in which all vertices, except the coinciding ends, are distinct.
- Hamiltonian cycle: a simple cycle in a graph with $n \ge 3$ vertices that passes through every vertex exactly once. Hamiltonian graph: a graph with a Hamiltonian cycle. Hamiltonian path: a simple trail that passes through all vertices.
- $\delta(G) = \min_v \deg v$ (minimum degree), $\Delta(G) = \max_v \deg v$ (maximum degree).

**Theorems and formulas**:
- Difference from the Eulerian problem: there the edges are controlled, here the vertices, so the parity criterion does not work here, and the problem "is there a Hamiltonian cycle" is NP-complete.
- Simple necessary conditions: connectivity; 2-connectivity (no cut vertex, otherwise a vertex is repeated during the tour); no pendant vertices when $n \ge 3$; in a bipartite graph with a Hamiltonian cycle the parts are equal in size (the cycle is even and alternates the parts), hence $K_{m,m+1}$ is not Hamiltonian.
- Dirac's theorem (1952). If $n \ge 3$ and $\delta(G) \ge n/2$, then $G$ is Hamiltonian.
- Ore's theorem (1960). If $n \ge 3$ and for any two non-adjacent vertices $u, v$ we have $\deg u + \deg v \ge n$, then $G$ is Hamiltonian. Dirac follows from Ore: for $\delta \ge n/2$ the degree sum of any non-adjacent pair is at least $n$.
- Idea of Ore's proof (outline). (1) Ore's condition gives connectivity: if the graph is disconnected, take $u$ in the smaller component ($n_1$ vertices) and $v$ in another one ($n_2$ vertices), they are non-adjacent and $\deg u + \deg v \le (n_1 - 1) + (n_2 - 1) \le n - 2 < n$, a contradiction. (2) Closure lemma: let $P = v_1 \dots v_k$ be a simple path of maximum length and let $v_1 v_k$ not be an edge; consider the sets $A = \{i : v_1 v_{i+1} \in E\}$ and $B = \{i : v_k v_i \in E\}$, both inside the indices $1..k-1$; since $|A| + |B| = \deg v_1 + \deg v_k \ge n \ge k > k - 1 = |\{1,\dots,k-1\}|$, the sets intersect, so there is an index $i$ with $v_1 v_{i+1} \in E$ and $v_k v_i \in E$; then $v_1 v_2 \dots v_i v_k v_{k-1} \dots v_{i+1} v_1$ is a simple cycle of length $k$. Bottom line: a maximum path lies on a cycle of the same length. (3) If $k < n$, then by connectivity there is an edge of this cycle going outside, and the path can be lengthened: take a vertex $y$ outside the cycle, the shortest path from $y$ to the cycle leads to a vertex $w$ of the cycle, and one can traverse all $k$ vertices of the cycle, starting at $y$ and ending at $w$, that is obtain a path on $k+1$ vertices, which contradicts the maximality of $k$; hence $k = n$ and the cycle is Hamiltonian. The same scheme with "closure" (the Bondy-Chvatal theorem) gives a chain of generalizations.
- The conditions are sufficient but not necessary: the cycle $C_n$ for $n \ge 5$ is Hamiltonian, but $\delta = 2 < n/2$, and for non-adjacent pairs in $C_n$ the degree sum equals 4.
- Sharpness of Dirac: $K_{m,m+1}$ has $n = 2m+1$ vertices, $\delta = m < n/2$, and is not Hamiltonian, that is the threshold $n/2$ cannot be lowered.
- Travelling salesman problem: in a complete weighted graph find a Hamiltonian cycle of minimum weight. Exact methods: the Held-Karp dynamic programming $O(n^2 2^n)$, branch and bound; the metric case: the Christofides approximation with factor 1.5; in practice heuristics (nearest neighbour, 2-opt). The sufficient conditions of Dirac and Ore give a fast certificate that "a Hamiltonian cycle definitely exists".

**Example**: $K_{3,3}$: $n = 6$, the parts are equal, a Hamiltonian cycle exists ($a_1 b_1 a_2 b_2 a_3 b_3 a_1$), but there is no Eulerian cycle, since all degrees equal 3. Two triangles with a common vertex: degrees $2,2,2,2,4$, all even, so an Eulerian cycle exists, but there is no Hamiltonian cycle: the common vertex is a cut vertex, and it would have to be visited twice. This is a pair of examples showing the independence of the two properties. The Petersen graph: 10 vertices, all degrees 3, $\delta = 3 < 5$, no Hamiltonian cycle. $K_{3,4}$: $n = 7$, $\delta = 3 < 3.5$, the parts are unequal, no Hamiltonian cycle.

**What the examiner may ask**:
1. "What is the fundamental difference from Eulerian graphs?" Edges versus vertices; Eulerian graphs have a simple criterion, Hamiltonian graphs do not, since the problem is NP-complete.
2. "State Dirac and Ore, which one is stronger?" Ore is stronger, Dirac is a special case (from $\delta \ge n/2$ the sum $\ge n$ follows for any non-adjacent pair).
3. "Give a non-Hamiltonian graph." Petersen; $K_{m,m+1}$; a graph with a pendant vertex when $n \ge 3$; two triangles with a common vertex.
4. "How is the travelling salesman problem related?" We look for a Hamiltonian cycle of minimum weight, and recognizing Hamiltonicity is its special case, hence the NP-hardness.

## Question 57. Graph coloring, the chromatic number of a graph.

**In plain words**: A coloring is a partition of the vertices into independent sets, and the minimum number of colors is the chromatic number $\chi(G)$. $\Delta+1$ colors always suffice, which is what the greedy algorithm gives. Brooks' theorem says that almost always $\Delta$ colors suffice: the only exceptions are complete graphs and odd cycles. For planar graphs the four color theorem works, and five colors are derived from the existence of a vertex of degree at most 5.

**Definitions**:
- Proper coloring: a map $c: V \to \{1, \dots, k\}$ such that for every edge $uv$ we have $c(u) \ne c(v)$. A graph is $k$-colorable if such a coloring exists.
- Chromatic number $\chi(G)$: the minimum $k$ for which the graph is $k$-colorable.
- Independent set: a set of pairwise non-adjacent vertices; the independence number $\alpha(G)$ is the maximum of its size. Clique: a set of pairwise adjacent vertices; the clique number $\omega(G)$ is the maximum of its size.
- Color classes (monochromatic sets) are independent sets, hence $\chi(G)$ equals the minimum number of independent sets covering $V$.

**Theorems and formulas**:
- $\chi(G) = 1$ if and only if there are no edges. $\chi(G) \le 2$ if and only if the graph is bipartite, that is it contains no odd cycles (Konig's criterion).
- Values: $\chi(K_n) = n$; $\chi(C_{2k}) = 2$; $\chi(C_{2k+1}) = 3$; $\chi(T) = 2$ for a tree with $n \ge 2$; $\chi(K_{m,n}) = 2$ for $m, n \ge 1$; $\chi = 3$ for the Petersen graph (two colors are not enough because of the 5-cycle, and a 3-coloring exists).
- Lower bounds: $\chi \ge \omega$ (a clique requires all colors different) and $\chi \ge n/\alpha$ (each color class contains at most $\alpha$ vertices).
- Greedy algorithm and the bound $\chi \le \Delta + 1$: we order the vertices arbitrarily and color them one by one with the smallest free color. By the time the vertex $v$ is colored, at most $\Delta$ of its neighbours are colored, so at most $\Delta$ colors are forbidden, and among $\Delta+1$ colors one is always free. Hence the greedy algorithm never fails and $\chi \le \Delta+1$.
- Refinement via degeneracy: if every subgraph has a vertex of degree at most $d$, then $\chi \le d+1$ (we color in the reverse order of the deletion of such vertices). A planar graph has a vertex of degree at most 5 in every subgraph, so $\chi \le 6$ right away; a finer analysis of degree 5 (recoloring Kempe chains) gives the five-colorability of planar graphs.
- Brooks' theorem (1941): if $G$ is connected, is not a complete graph and is not an odd cycle, then $\chi(G) \le \Delta(G)$. The exceptions are essential: $\chi(K_n) = n = \Delta+1$ and $\chi(C_{2k+1}) = 3 = \Delta+1$. The cases of small $\Delta$ are handled directly: $\Delta = 0$ is $K_1$, $\Delta = 1$ is $K_2$, $\Delta = 2$ is paths and cycles.
- Idea of Brooks' proof (outline). For $\Delta \le 2$ everything is clear. Let $\Delta \ge 3$; first, induction on blocks reduces the matter to a 2-connected graph in which one can find a vertex $v$ with two non-adjacent neighbours $x, y$ such that the graph $G - \{x,y\}$ is connected. We color $x$ and $y$ first in one color, then the vertices in decreasing order of distance to $v$ in $G - \{x,y\}$, and $v$ last. Every vertex except $v$ has at most $\Delta-1$ already colored neighbours (one neighbour is closer to $v$, or it is $x$ or $y$), and $v$ has two neighbours of the same color, so the number of distinct colors among its neighbours is at most $\Delta-1$, and among $\Delta$ colors one is free.
- Four color theorem (a conjecture since 1852, proved by Appel and Haken in 1976 with a computer search): every planar graph is 4-colorable, that is $\chi \le 4$. Sharpness: $K_4$ is planar and $\chi(K_4) = 4$. A separate fact: triangle-free planar graphs are 3-colorable (Grotzsch's theorem). The dual statement is the coloring of a map in the plane.

**Example**: $K_n$: $\Delta = n-1$, $\chi = n = \Delta+1$, the bound is sharp. $C_5$: $\Delta = 2$, $\chi = 3 = \Delta+1$, but Brooks is not violated, since an odd cycle is excluded. Petersen: $\Delta = 3$, $\chi = 3 \le \Delta$, Brooks works. The wheel $W_5$ (a 5-cycle plus a center): the outer 5-cycle requires 3 colors, the center is adjacent to all vertices and requires a 4th, $\chi(W_5) = 4$, while $\Delta = 5$ (the degree of the center). A tree with $\Delta = 3$: $\chi = 2 < \Delta \le \Delta+1$.

**What the examiner may ask**:
1. "How do you obtain the bound $\Delta+1$?" Greedy algorithm: every vertex has at most $\Delta$ colored neighbours.
2. "When is the bound sharp?" $K_n$ and odd cycles; these are exactly Brooks' exceptions.
3. "What is the connection with planarity?" Four colors is a deep theorem; five colors are proved by the bound "there is a vertex of degree at most 5" and induction.
4. "Why $\chi \ge \omega$ and $\chi \ge n/\alpha$?" A clique requires all colors different; a color class has at most $\alpha$ vertices, so there are at least $n/\alpha$ colors.

## Question 58. Planar graphs. Euler's formula for planar graphs.

**In plain words**: A graph is planar if it can be drawn in the plane without edge crossings. For any such embedding Euler's formula $v - e + f = 2$ holds. From it density bounds are derived: $e \le 3v-6$, and if there are no triangles, then $e \le 2v-4$. The same formula yields the existence of a vertex of degree at most 5 (five-colorability) and the proofs of non-planarity of $K_5$ and $K_{3,3}$.

**Definitions**:
- Embedding of a graph (plane): the vertices are points, the edges are Jordan curves that intersect only at common endpoints. Planar graph: one that admits an embedding. Plane graph: one already embedded.
- Face of an embedding: a connected region of the plane after the points and lines of the graph are removed. Outer face: the unbounded one. Boundary of a face: a closed trail of edges, its length is the number of boundary edges.
- Subdivision of an edge $uv$: delete $uv$, add a new vertex $w$ of degree 2 and the edges $uw$, $wv$. Subdivision of a graph: the result of several such operations. Graphs are homeomorphic if some of their subdivisions are isomorphic.
- Maximal planar graph: a planar graph to which no edge can be added without losing planarity; equivalently, all faces are triangles (a triangulation).

**Theorems and formulas**:
- Euler's theorem: if a connected planar graph with $v \ge 1$ is embedded in the plane, then $v - e + f = 2$, where $f$ is the number of faces, including the outer one.
- Proof (via a spanning tree and adding edges by induction). Step 1: take a spanning tree $T$ (it exists, since the graph is connected). A tree has no cycles, so the whole plane is one face: $e_T = v-1$, $f_T = 1$, and $v - e_T + f_T = v - (v-1) + 1 = 2$. Step 2: we put back the edges that are not in the tree, one at a time. The current graph is connected all the time (it contains $T$), so the ends of the edge $xy$ being added are already joined by a path in the current graph, hence the edge lies inside one face and cuts it into two: $e$ increases by 1 and $f$ increases by 1, while the quantity $v - e + f$ does not change. After all edges are added we get the original graph, hence $v - e + f = 2$.
- For a disconnected graph with $k$ components: $v - e + f = 1 + k$ (each new component adds a face).
- Corollary 1 (density bound): for a simple connected planar graph with $v \ge 3$ we have $e \le 3v-6$. Derivation: a simple graph has no loops and no multiple edges, so the boundary of every face has length at least 3 (for a tree the single face is traversed along every edge in both directions, giving $2e = 2v-2 \ge 4$); double counting gives $\sum (\text{face lengths}) = 2e \ge 3f$, that is $f \le 2e/3$; we substitute into $v-e+f=2$: we get $2 = v-e+f \le v - e + 2e/3 = v - e/3$, whence $e \le 3v-6$.
- Corollary 2: if a planar graph with $v \ge 3$ contains no triangles (girth at least 4), then $e \le 2v-4$. Derivation: the boundary of every face has length at least 4, hence $2e \ge 4f$, that is $f \le e/2$, and $2 = v-e+f \le v - e/2$, whence $e \le 2v-4$.
- Corollary 3: every planar graph has a vertex of degree at most 5. Otherwise $2e = \sum_v \deg v \ge 6v$, that is $e \ge 3v$, which contradicts $e \le 3v-6$.
- Corollary 4 (structure of equality): for $e = 3v-6$ all faces are triangles and $f = 2v-4$; such graphs are maximal planar (examples: $K_4$, the octahedron).
- Uniqueness of the embedding (briefly): a 3-connected planar graph has a unique embedding up to the choice of the outer face (Whitney's theorem); in the general case there can be many embeddings, and any face can be made outer, that is "outerness" is not a property of the graph. Planarity is recognized in linear time (Hopcroft and Tarjan).
- The bounds are necessary but not sufficient: $K_{3,3}$ plus one edge inside a part has $v = 6$, $e = 10 \le 12 = 3v-6$, but is non-planar, since it contains $K_{3,3}$.

**Example**: The cube $Q_3$: $v = 8$, $e = 12$, hence $f = 2 - 8 + 12 = 6$, these are six quadrilateral faces. The tetrahedron $K_4$: $v = 4$, $e = 6 = 3v-6$, $f = 4$, all faces are triangles, maximal planar. The octahedron: $v = 6$, $e = 12 = 3v-6$, $f = 8$ triangles, also maximal planar. The wheel $W_5$ (a 5-cycle plus a center): $v = 6$, $e = 10$, $f = 6$ (five triangles and the outer 5-cycle), $6 - 10 + 6 = 2$. A tree with $v = 5$: $e = 4$, $f = 1$, $5 - 4 + 1 = 2$.

**What the examiner may ask**:
1. "Prove Euler's formula." Via a spanning tree and adding edges one at a time (each added edge increases $e$ and $f$ by 1).
2. "Why are simplicity and $v \ge 3$ needed?" For two vertices with $m$ parallel edges $e = m > 3 \cdot 2 - 6 = 0$, the bound is false; a loop gives a face of length 1, and the count $\ge 3$ breaks down.
3. "Why count the outer face?" Without it a tree would give $v - e + f = 1$, while the formula has to give 2.
4. "Does planarity follow from $e \le 3v-6$?" No, a counterexample: $K_{3,3}$ plus an edge.
5. "When is the embedding unique?" For 3-connected planar graphs, up to the choice of the outer face.

## Question 59. Proof of non-planarity of the graphs K5 and K3,3.

**In plain words**: $K_5$ and $K_{3,3}$ are the two minimal non-planar graphs. The proof is by contradiction and goes through Euler's formula. For $K_5$ everything is immediate: $e = 10 > 9 = 3v-6$. For $K_{3,3}$ the bound $3v-6$ is not violated ($9 \le 12$), so first we prove that there are no triangles and apply the stronger bound $e \le 2v-4$: we get $9 > 8$, a contradiction.

**Definitions**:
- $K_5$: the complete graph on 5 vertices, $v = 5$, $e = \binom{5}{2} = 10$, all degrees equal 4.
- $K_{3,3}$: the complete bipartite graph with parts of 3 vertices each, $v = 6$, $e = 3 \cdot 3 = 9$, all degrees equal 3, girth 4.
- Triangle: a cycle of length 3, that is a subgraph $K_3$. Girth: the length of the shortest cycle.
- Bipartite graph: the vertices are split into $X$ and $Y$, every edge joins $X$ with $Y$.
- Critically non-planar (minimal non-planar) graph: it is non-planar, but the deletion of any edge makes it planar.

**Theorems and formulas** (full proofs):
- Claim 1: $K_5$ is non-planar. Proof by contradiction: suppose an embedding exists. The graph is simple and $v = 5 \ge 3$, hence by Corollary 1 of Euler's formula $e \le 3v-6 = 3 \cdot 5 - 6 = 9$. But $e = 10 > 9$, a contradiction. Hence there is no embedding.
- Claim 2: $K_{3,3}$ contains no triangles. Proof: $K_{3,3}$ is bipartite with parts $X = \{a_1, a_2, a_3\}$ and $Y = \{b_1, b_2, b_3\}$. Every edge joins different parts, so when any cycle is traversed the vertices strictly alternate the parts: $X, Y, X, Y, \dots$; one can return to the initial part only after an even number of steps. Hence all cycles are even, in particular there is no cycle of length 3. Why this is needed: the bound $e \le 3v-6$ for $K_{3,3}$ gives only $9 \le 12$, there is no contradiction, so the strengthened bound $e \le 2v-4$ is needed, and it requires the absence of triangles.
- Claim 3: $K_{3,3}$ is non-planar. Proof by contradiction: suppose an embedding exists. The graph is simple, $v = 6 \ge 3$, and there are no triangles by Claim 2, hence by Corollary 2 $e \le 2v-4 = 2 \cdot 6 - 4 = 8$. But $e = 9 > 8$, a contradiction. Hence there is no embedding.
- Minimality of both: $K_5$ without any edge is planar ($v = 5$, $e = 9 \le 9 = 3v-6$, an embedding is constructed), and $K_{3,3}$ without any edge is planar ($v = 6$, $e = 8 \le 8 = 2v-4$). That is why exactly these two graphs (and their subdivisions) serve as the forbidden patterns in the Pontryagin-Kuratowski theorem.
- Why the proof is legitimate: the bounds $e \le 3v-6$ and $e \le 2v-4$ were derived for simple connected planar graphs with $v \ge 3$, and $K_5$ and $K_{3,3}$ are simple, connected and satisfy the condition on the number of vertices.

**Example**: Explicit numbers: $K_5$ has 10 edges against the limit 9, a margin of just one edge. $K_{3,3}$ has 9 edges against the limit 8. The girth of $K_{3,3}$ equals 4, an example of a cycle: $a_1 b_1 a_2 b_2 a_1$, which is exactly the absence of a triangle. The threshold on the number of vertices for complete graphs is essential: $K_4$ is planar ($e = 6 = 3\cdot 4 - 6$, the tetrahedron), while $K_5$ no longer is, hence complete graphs are planar exactly up to $n = 4$. The Petersen graph (numbering: outer 5-cycle 0-4, inner 5-cycle 5-9 with shift 2, spokes $i$-$i+5$) is non-planar and contains a subdivision of $K_{3,3}$: the branch vertices 1, 2, 3, 4, 7, 8 (in the subgraph they have degree 3), the subdividing vertices 0, 5, 6, 9 (degree 2), 13 edges in total, the parts of $K_{3,3}$ are $\{1,3,7\}$ and $\{2,4,8\}$. A subdivision of $K_5$ cannot exist in Petersen: Petersen is 3-regular, while the branch vertices of a subdivision of $K_5$ need degree 4.

**What the examiner may ask**:
1. "Prove the non-planarity of $K_{3,3}$." Necessarily via the absence of triangles and the bound $2v-4$: $9 > 8$.
2. "Why can't $e \le 3v-6$ be applied to $K_{3,3}$?" Because $9 \le 12$ and no contradiction arises.
3. "Is $K_{3,3}$ without an edge planar?" Yes: $v = 6$, $e = 8 \le 8$, an embedding exists.
4. "Why is $K_4$ planar and $K_5$ not?" $K_4$ has $e = 6 = 3v-6$ and embeds as a tetrahedron, while $K_5$ already has $10 > 9$.

## Question 60. The Pontryagin-Kuratowski theorem. Proof of necessity.

**In plain words**: The theorem reduces non-planarity to two forbidden patterns: a graph is planar if and only if there is no "stretched" $K_5$ or $K_{3,3}$ inside it. Necessity (a planar graph contains no forbidden subgraph) is proved briefly: a subgraph of a planar graph is planar, and any subdivision of $K_5$ or $K_{3,3}$ contracts into $K_5$ or $K_{3,3}$ itself, which is non-planar. Sufficiency is a deep theorem, it is stated without proof.

**Definitions**:
- Subdivision of an edge $uv$: delete the edge $uv$, add a vertex $w$ of degree 2 and the edges $uw$, $wv$. Subdivision of a graph: the result of several subdivisions of edges.
- Homeomorphism of graphs: $G_1$ and $G_2$ are homeomorphic if there exist their subdivisions $G_1'$, $G_2'$ that are isomorphic to each other.
- Equivalent phrasing: "$G$ has a subgraph homeomorphic to $H$" means "$G$ contains a subdivision of $H$".
- Minor of a graph: the result of deleting vertices, deleting edges and contracting edges.

**Theorems and formulas**:
- Theorem (Pontryagin, 1927; Kuratowski, 1930): a graph $G$ is planar if and only if $G$ contains no subgraph homeomorphic to $K_5$ or $K_{3,3}$.
- Equivalent statements: $G$ is non-planar if and only if $G$ contains a subdivision of $K_5$ or a subdivision of $K_{3,3}$; $K_5$ and $K_{3,3}$ are the only minimal forbidden graphs up to subdivision.
- Key lemma (contraction): if a subdivision of a graph $H$ is planar, then $H$ is planar too. Proof: the subdivision is obtained from $H$ by adding vertices of degree 2; the reverse operation consists in deleting a vertex $w$ of degree 2 with the edges $uw$ and $wv$ and replacing the two edges by a single edge $uv$; the new edge is drawn along the union of the old ones, so no crossings appear. We contract the vertices of degree 2 one by one.
- Proof of necessity (outline). Let $G$ be planar. (1) Any subgraph $H$ of the graph $G$ is planar: we restrict the embedding of $G$ to the vertices and edges of $H$, no new crossings appear. (2) Let $H$ be a subgraph of $G$ homeomorphic to $K_5$. Then $H$ is obtained from $K_5$ by subdivisions, that is every edge of $K_5$ is replaced by a chain, and the internal vertices of the chains have degree 2. By the lemma applied to each chain, the planarity of $H$ implies the planarity of $K_5$, but $K_5$ is non-planar (Question 59). A contradiction, hence no such subgraph exists in $G$. (3) The same words for $K_{3,3}$: contracting the subdividing edges preserves planarity and yields $K_{3,3}$, which is non-planar. Thus a planar graph contains no forbidden subgraph.
- Sufficiency: if $G$ has no subdivisions of $K_5$ and $K_{3,3}$, then $G$ is planar. The proof is complicated (a structural analysis of 3-connected components and bridges), and it is not part of a standard course: in the exam it is enough to say that sufficiency is a deep theorem and to refer to it.
- Equivalent minor form (Wagner's theorem): $G$ is planar if and only if $G$ contains neither $K_5$ nor $K_{3,3}$ as a minor. The minor form is more convenient in practice (contractions instead of subdivisions), but it is a separate theorem of the same depth.
- Consequences: non-planarity is inherited when edges are added and under subdivisions, that is any subdivision of $K_5$ and any subdivision of $K_{3,3}$ are non-planar; all minimal non-planar graphs are exactly the subdivisions of $K_5$ and $K_{3,3}$. Any graph containing $K_5$ or $K_{3,3}$ as a subgraph (for example, $K_6$ contains $K_5$) is non-planar.
- Practical conclusion: to prove non-planarity we exhibit a forbidden subdivision or minor; to prove planarity an algorithm is needed (Hopcroft and Tarjan, linear time).

**Example**: $K_5$ itself and $K_{3,3}$ itself are their own subdivisions (zero subdivisions), and they are the minimal forbidden graphs. The Petersen graph: non-planar, hence by the theorem it is obliged to contain a subdivision of one of the two graphs. In fact it contains a subdivision of $K_{3,3}$ (numbering: outer 5-cycle 0-4, inner 5-cycle 5-9 with shift 2, spokes $i$-$i+5$): six branch vertices 1, 2, 3, 4, 7, 8 and four subdividing vertices 0, 5, 6, 9, 13 edges in total, the parts $\{1,3,7\}$ and $\{2,4,8\}$. There is no subdivision of $K_5$ there and there cannot be one: Petersen is 3-regular, while the branch vertices of a subdivision of $K_5$ need degree 4. Thus the theorem predicts which forbidden pattern is realized.

**What the examiner may ask**:
1. "State the theorem and prove necessity." A subgraph of a planar graph is planar; a subdivision contracts into $K_5$ or $K_{3,3}$ with planarity preserved, and they are non-planar, a contradiction.
2. "Why don't you prove the converse (sufficiency)?" It is a deep theorem with a structural analysis, a standard course states it without proof.
3. "What does the minor formulation give?" Wagner's theorem: the forbidden patterns are in the sense of minors, any edges can be contracted, not only the subdividing ones.
4. "How do you prove the non-planarity of a concrete graph?" Find a subdivision of $K_5$ or $K_{3,3}$ (for example, in Petersen one finds $K_{3,3}$, since degree 4 is unattainable).

## Cheat sheet

- Eulerian circuit: all edges exactly once, closed. Exists ⟺ connectivity + all degrees even.
- Eulerian trail: 0 or 2 odd vertices; with two odd vertices the trail goes from one of them to the other.
- Proofs: necessity "entry-exit contributes 2"; sufficiency "a maximal trail closes, then we splice cycles"; for a trail we add an edge between the odd vertices.
- Konigsberg: degrees 3, 3, 5, 3, four odd, no tour. Envelope: two odd corners, a trail exists.
- Algorithms: Hierholzer $O(e)$, Fleury (over a bridge only as a last resort).
- Hamilton: every vertex exactly once. Difference: edges (Euler) versus vertices (Hamilton).
- Dirac: $n \ge 3$, $\delta \ge n/2$ ⟹ Hamiltonian. Ore: $n \ge 3$, $\deg u + \deg v \ge n$ for non-adjacent ⟹ Hamiltonian (Ore is stronger).
- Ore's idea: a maximum path lies on a cycle of the same length, otherwise the path is lengthened.
- Necessary for Hamilton: 2-connectivity, no pendant vertices, equal parts in a bipartite graph.
- Non-Hamiltonian examples: Petersen, $K_{m,m+1}$, two triangles with a common vertex (there an Eulerian circuit exists).
- Travelling salesman: a Hamiltonian cycle of minimum weight; NP-hard; Held-Karp $O(n^2 2^n)$, the metric case 1.5-approximation.
- Coloring: color classes are independent sets. $\chi \ge \omega$, $\chi \ge n/\alpha$.
- Values: $\chi(K_n) = n$, $\chi(C_{2k}) = 2$, $\chi(C_{2k+1}) = 3$, $\chi = 2$ for a tree, $\chi(K_{m,n}) = 2$, $\chi = 3$ for Petersen.
- Greedy: $\chi \le \Delta+1$ (a vertex has at most $\Delta$ colored neighbours).
- Brooks: $\chi \le \Delta$ except $K_n$ and odd cycles.
- Planarity: faces, including the outer one: $v - e + f = 2$ (connected), $1+k$ for $k$ components.
- Euler: spanning tree $v-(v-1)+1 = 2$, adding an edge gives $+1$ to $e$ and to $f$.
- Corollaries: simple and $v \ge 3$: $e \le 3v-6$; no triangles: $e \le 2v-4$; there is a vertex of degree $\le 5$.
- Equality $e = 3v-6$ ⟺ maximal planar (all faces triangles), $f = 2v-4$.
- The embedding is unique for 3-connected graphs (Whitney), up to the outer face.
- $K_5$: $10 > 9 = 3\cdot5-6$, non-planar. $K_{3,3}$: no triangles (bipartite), $9 > 8 = 2\cdot6-4$, non-planar.
- $K_4$ is planar ($6 = 3\cdot4-6$), the octahedron has $6$ vertices, $12$ edges, $8$ faces. The cube: $8, 12, 6$. $W_5$: $6, 10, 6$.
- $e \le 3v-6$ is not sufficient: $K_{3,3}$ plus an edge (10 edges) is non-planar.
- Pontryagin-Kuratowski: planar ⟺ no subgraph homeomorphic to $K_5$ or $K_{3,3}$ (no subdivision).
- Necessity: a subgraph of a planar graph is planar, a subdivision contracts, $K_5$ and $K_{3,3}$ are non-planar.
- Sufficiency: a deep theorem, accepted without proof; the minor version is Wagner's theorem.
- Petersen: 10 vertices, 15 edges, $3$-regular, girth 5, $\chi = 3$, not Hamiltonian, non-planar, contains a subdivision of $K_{3,3}$ (13 edges), but not $K_5$ (degree 4 is needed).
