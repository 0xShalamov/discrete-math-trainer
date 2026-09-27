# Block 7. Graphs: the basics

Block conventions: $G=(V,E)$, $n=|V|$, $m=|E|$; unless stated otherwise the graph is simple (no multiple edges and no loops).

## Question 39. Graphs, multigraphs, pseudographs, directed graphs. Adjacency and incidence matrices. Examples.

**In plain words**: a graph is a table of links between objects. In CTF this is how a network is described: vertices are hosts, edges are the channels that carry traffic. The adjacency matrix is the bit map of who is directly connected to whom, the incidence matrix is the list of edges with their endpoints.

**Definitions**:
- Graph $G=(V,E)$: $V$ is a finite non-empty set of vertices, $E$ is a set of unordered pairs of distinct vertices (edges). No multiple edges and no loops.
- Multigraph: multiple edges are allowed (several edges between one and the same pair of vertices).
- Pseudograph: multiple edges and loops are allowed (a loop is an edge whose two ends coincide).
- Directed graph (digraph) $D=(V,A)$: $A$ is a set of ordered pairs (arcs), every arc has a start and an end.
- Vertices $u$ and $v$ are adjacent if $uv \in E$. An edge and a vertex are incident if the vertex is an end of that edge. The degree $\deg v$ is the number of edges incident to $v$ (a loop adds 2).
- A vertex of degree 0 is called isolated, a vertex of degree 1 is called a leaf.
- In a digraph one counts separately the out-degree $\deg^+ v$ (the number of arcs leaving $v$) and the in-degree $\deg^- v$ (the number of arcs entering $v$).
- Special cases: empty graph ($E=\varnothing$), complete graph $K_n$ (all $\binom{n}{2}$ edges), bipartite graph (the vertices are split into two parts, edges go only between the parts), complete bipartite graph $K_{m,n}$.

**Theorems and formulas**:
- Adjacency matrix $A$ of size $n \times n$: $a_{ij}=1$ if $ij \in E$, otherwise $0$ (in a multigraph $a_{ij}$ is the number of edges between $i$ and $j$). Properties: $A$ is symmetric for an undirected graph, the diagonal is zero (a loop would put a 1 on the diagonal); the sum of row $i$ equals $\deg v_i$; the sum of all entries equals $2m$.
- Key fact: $(A^k)_{ij}$ equals the number of walks of length $k$ from $i$ to $j$. Proof by induction on $k$ (matrix multiplication is a scan over all intermediate vertices).
- Incidence matrix $B$ of size $m \times n$: rows are edges, columns are vertices, $b_{ij}=1$ if edge $i$ is incident to vertex $j$. Properties: the sum of a row equals 2 (an edge has exactly two ends), the sum of column $j$ equals $\deg v_j$, the total number of ones equals $2m$.
- Orientation: for a digraph the incidence matrix carries $-1$ at the start of an arc and $+1$ at its end (the convention has to be stated out loud). Then the sum of column $j$ equals $\deg^- v_j - \deg^+ v_j$, and every row sums to 0. If one takes the oriented matrix of size $n \times m$, then $B B^{\mathsf T} = L$, where $L$ is the Kirchhoff matrix from question 46; for a connected graph $\operatorname{rank} B = n-1$.

**Example**: $V=\{1,2,3,4,5\}$, $E=\{12,13,14,25,35\}$, so $n=5$, $m=5$, degrees $(3,2,2,1,2)$.

$$A=\begin{pmatrix}0&1&1&1&0\\1&0&0&0&1\\1&0&0&0&1\\1&0&0&0&0\\0&1&1&0&0\end{pmatrix}\qquad
B=\begin{pmatrix}1&1&0&0&0\\1&0&1&0&0\\1&0&0&1&0\\0&1&0&0&1\\0&0&1&0&1\end{pmatrix}$$

The rows of $B$ correspond to the edges $e_1=12$, $e_2=13$, $e_3=14$, $e_4=25$, $e_5=35$. The columns of $B$ give the same degrees $(3,2,2,1,2)$, 10 ones in total $=2m$; one can see that $m=5=\frac{1}{2}\sum \deg v$.

**What the examiner may ask**:
- **How does a pseudograph differ from a multigraph?** A pseudograph additionally allows loops.
- **Why is the adjacency matrix symmetric while the incidence matrix is not?** Adjacency is mutual ($uv \in E \iff vu \in E$), while incidence links objects of different types (an edge and a vertex).
- **What is the sum of all entries of the adjacency matrix?** $2m$; and $A^k$ gives the number of walks of length $k$.
- **How does one read the degrees off the matrices?** From the row sums of the adjacency matrix and the column sums of the incidence matrix.

## Question 40. Degrees of vertices and the number of vertices of odd degree in a graph.

**In plain words**: every edge is a handshake of two vertices, so in the sum of degrees it is counted exactly twice. If 8 hosts have 3 channels each, there are $8 \cdot 3/2 = 12$ channels. The lemma gives a quick parity test: the sum of degrees is always even.

**Definitions**:
- Degree $\deg v$: the number of incident edges, a loop counts twice.
- A graph is called $k$-regular if all vertices have degree $k$; $\delta$ is the minimum degree, $\Delta$ the maximum degree.
- Average degree $\bar d = 2m/n$.

**Theorems and formulas**:
- Handshaking lemma: $\sum_{v \in V} \deg v = 2m$. Proof: every edge $uv$ contributes 1 to $\deg u$ and 1 to $\deg v$, that is exactly 2 to the sum; a loop contributes 2 to the degree of its vertex. Summing over all edges gives $2m$.
- Corollary 1: the number of vertices of odd degree is even. Proof: $\sum_v \deg v = \sum_{\text{even}} \deg v + \sum_{\text{odd}} \deg v$; the left-hand side and the first sum are even, hence the second one is even too, while a sum of an odd number of odd terms is odd.
- Corollary 2: $m = \frac{1}{2}\sum_v \deg v$, so if all degrees are $\ge \delta$ we get $m \ge \frac{\delta n}{2}$; in particular, summing up, $\bar d = 2m/n$.
- Corollary 3 (pigeonhole principle): in a simple graph on $n \ge 2$ vertices there are two vertices of the same degree. Degrees lie in the set $\{0,1,\dots,n-1\}$ of $n$ values, but the values $0$ and $n-1$ cannot occur simultaneously (one vertex would be isolated, the other adjacent to all), so at most $n-1$ values are really available for $n$ vertices.
- Bound: $m \le \binom{n}{2}$ in a simple graph, with equality only for $K_n$.
- The converse of Corollary 1 is false: the parity of the sum alone is not enough for a graph to exist.

**Example**: the same graph as in question 39: degrees $(3,2,2,1,2)$, sum $3+2+2+1+2=10=2m$ with $m=5$. Vertices of odd degree: vertex 1 (degree 3) and vertex 4 (degree 1), there are two of them, that is an even number, exactly as the corollary promises. Counterexample to the converse: the degree sequence $(3,3,1,1)$ on 4 vertices has even sum 8 but is not realizable: the two vertices of degree 3 must be adjacent to all the others, so the remaining vertices have degree at least 2, not 1 (an exhaustive search and the Havel-Hakimi algorithm confirm this).

**What the examiner may ask**:
- **State and prove the lemma.** Every edge contributes exactly 2 to the sum of degrees, hence the sum equals $2m$.
- **Why is the number of vertices of odd degree even?** Otherwise the sum of degrees would be odd, while it equals $2m$.
- **How many edges are there in a 3-regular graph on 8 vertices?** $m = 3 \cdot 8/2 = 12$.
- **Is the converse true: does an even sum of degrees guarantee a graph?** No, the example is $(3,3,1,1)$.

## Question 41. Operations on graphs.

**In plain words**: operations on graphs are operations on the sets of links: glue two networks into one (union), find the shared channels (intersection), add all missing links (complement), build a grid out of two networks (product), merge two nodes into one (contraction), switch off a node or a channel (deletion).

**Definitions** (for binary operations we assume $V_1=V_2=V$, otherwise the vertex sets are united):
- Union $G_1 \cup G_2$: the graph on $V_1 \cup V_2$ with edges $E_1 \cup E_2$.
- Intersection $G_1 \cap G_2$: the graph on $V_1 \cap V_2$ with edges $E_1 \cap E_2$ (for $V_1=V_2=V$ this is the graph on $V$ with the common edges).
- Ring sum $G_1 \oplus G_2$: the edges belonging to exactly one of the sets $E_1$, $E_2$ (symmetric difference).
- Complement $\bar G$: the graph on the same $V$ whose edges are all the pairs not in $E$. Then $G \cup \bar G = K_n$, $G \cap \bar G$ is the empty graph, $m + \bar m = \binom{n}{2}$, $\deg_{\bar G} v = n-1-\deg_G v$.
- Cartesian product $G_1 \square G_2$: the vertices are the pairs $(u,v) \in V_1 \times V_2$, and the pair $(u,v)$ is adjacent to $(u',v')$ exactly when ($u=u'$ and $vv' \in E_2$) or ($v=v'$ and $uu' \in E_1$). There are $n_1 n_2$ vertices.
- Contraction of an edge $G/e$: the ends of the edge $e=uv$ are identified into a single vertex, multiple edges and loops merge. Contracting a subgraph is the same as identifying all of its vertices.
- Deletion of a vertex $G-v$: we remove $v$ together with all incident edges. Deletion of an edge $G-e$: we remove only the edge, the vertices remain.
- Bonus: the join $G_1+G_2$ is $G_1 \cup G_2$ plus all edges between $V_1$ and $V_2$.

**Theorems and formulas**:
- The double complement returns the original graph: $\overline{\bar G}=G$.
- Counting the changes: contracting an edge of a simple graph decreases $n$ and $m$ by 1 each; deleting a vertex of degree $d$ decreases $n$ by 1 and $m$ by $d$; deleting an edge decreases only $m$ by 1.
- The product of connected graphs is connected; $\deg_{(u,v)} = \deg u + \deg v$; for example $K_2 \square K_2 = C_4$, while $C_4 \square K_2 = Q_3$ (the cube on 8 vertices).
- Matrices: $A(G_1 \cup G_2) = A(G_1) \lor A(G_2)$ elementwise, $A(G_1 \oplus G_2) = A(G_1)+A(G_2) \pmod 2$.

**Example**: $G_1$ on the vertices $\{1,2,3,4\}$ with edges $\{12,23,34\}$, $G_2$ with edges $\{23,34,41\}$.
- Union: $\{12,23,34,41\}$, this is the cycle $C_4$.
- Intersection: $\{23,34\}$, this is the trail $P_3$.
- Complement of $G_1$ in $K_4$: the pairs of $K_4$ are $12,13,14,23,24,34$, subtract the edges of $G_1$ and we get $\{13,14,24\}$. The degrees of $G_1$ are $(1,2,2,1)$, those of the complement are $(2,1,1,2)=3-\deg$.
- Product: $K_2 \square K_2$ has the vertices $(1,1),(1,2),(2,1),(2,2)$ and the edges (1,1)-(1,2), (1,1)-(2,1), (1,2)-(2,2), (2,1)-(2,2), which is again $C_4$.
- Contraction: in the cycle $1-2-3-4-1$ we contract the edge $12$ into a vertex $x$, the edges become $x3$, $34$, $4x$, and the result is the triangle $K_3$.
- Deletions: $G_1-4=\{12,23\}$ (the trail $P_3$); $G_1-23=\{12,34\}$ (two separate edges).

**What the examiner may ask**:
- **How does the number of edges change when an edge is contracted?** It decreases by 1 in a simple graph ($n$ also decreases by 1).
- **What is $G \cup \bar G$?** $K_n$; hence $m+\bar m = \binom{n}{2}$.
- **How many vertices does the Cartesian product have?** $n_1 n_2$, for $K_3 \square K_3$ it is nine.
- **What does the double complement give?** The original graph.

## Question 42. Isomorphisms and homeomorphisms of graphs. Examples.

**In plain words**: an isomorphism is a renaming of vertices. Two graphs are built the same way if the vertices can be matched so that the links agree exactly. Like two dumps of one network before and after an address change: if the link tables translate into each other, the topology is the same.

**Definitions**:
- Isomorphism $G_1 \to G_2$: a bijection $\varphi: V_1 \to V_2$ such that $uv \in E_1 \iff \varphi(u)\varphi(v) \in E_2$. The graphs are isomorphic if such a bijection exists.
- Invariant: a characteristic that is the same for all isomorphic graphs. The main invariants: $n$, $m$, the degree sequence, the number of connected components, the number of cycles of each length, the presence of triangles, the diameter and the radius, bipartiteness, planarity, the chromatic number, the number of spanning trees, the spectrum of the adjacency matrix.
- Subdivision of an edge $uv$: the edge is replaced by two edges $uw$, $wv$ with a new vertex $w$ of degree 2.
- Homeomorphism: two graphs are homeomorphic if they have isomorphic subdivisions (equivalently: one can be obtained from the other by subdividing edges and by deleting vertices of degree 2 while merging the two edges).

**Theorems and formulas**:
- Isomorphism is an equivalence relation on graphs: reflexivity (the identity bijection), symmetry ($\varphi^{-1}$), transitivity (composition of bijections).
- An isomorphism preserves degrees: $\deg \varphi(v) = \deg v$, and in general any property expressed via adjacency. The matrices are related by $A_2 = P A_1 P^{\mathsf T}$, where $P$ is a permutation matrix.
- Hence the working technique: a distinguishing invariant proves non-isomorphism. Agreement of invariants does not prove isomorphism, one needs either an explicit isomorphism or a full search with a canonical form (a full search over bijections is $n!$, so one first prunes with invariants).
- A homeomorphism does not preserve degrees or the number of vertices, but it preserves the cycle structure: subdividing an edge does not change the cyclomatic number $m-n+r$ and does not change planarity.
- Kuratowski's planarity criterion (bonus): a graph is planar if and only if it contains no subgraph homeomorphic to $K_5$ or $K_{3,3}$.

**Example**:
- Isomorphic: the complete bipartite $K_{2,2}$ and the cycle $C_4$ on $V=\{1,2,3,4\}$ with the parts $\{1,3\}$ and $\{2,4\}$: the edges of $K_{2,2}$ are $12,14,32,34$, while the edges of $C_4$ are $12,23,34,41$, this is one and the same set, so the identity bijection works.
- Non-isomorphic with equal degrees: $C_6$ (a cycle on 6 vertices) and $2C_3$ (two triangles). Both have $n=6$, $m=6$ and the degree sequence $(2,2,2,2,2,2)$, but $C_6$ is connected and contains one cycle of length 6, while $2C_3$ splits into 2 components and contains 2 cycles of length 3.
- A second example of the same kind: the triangular prism (two triangles plus three rungs) and $K_{3,3}$: both have $n=6$, $m=9$, all degrees equal 3, but the prism has 2 triangles, while $K_{3,3}$ is bipartite and has no triangles.
- Homeomorphism: all cycles are homeomorphic to each other, $C_5$ is obtained from $C_3$ by subdividing two edges. The graphs $K_4$ and $K_4$ with one subdivided edge are homeomorphic but not isomorphic (the second one has 5 vertices instead of 4).

**What the examiner may ask**:
- **Give the definition of an isomorphism.** A bijection of the vertices preserving adjacency in both directions.
- **How does one prove that two graphs are not isomorphic?** Find a distinguishing invariant (the number of components, of cycles, the degrees, the diameter).
- **How does a homeomorphism differ from an isomorphism?** It allows adding and removing vertices of degree 2 on edges, so the vertex degrees are not preserved.
- **Can a graph be isomorphic to its complement?** Yes: for $C_5$ the complement is $C_5$ again (the edges $13,35,52,24,41$ form a pentagon).

## Question 43. Walks, trails, cycles, diameters of graphs. Examples.

**In plain words**: a walk is a stroll over the network, a trail and a path are a stroll without repetitions. The diameter is the worst-case delay between two nodes, the radius is the best possible choice of a server location (the minimum of the maximum delay), the center is the set of vertices where a server is optimal.

**Definitions**:
- Walk: an alternating sequence $v_0,e_1,v_1,\dots,e_k,v_k$, where $e_i = v_{i-1}v_i \in E$. The length of a walk is the number of edges $k$. A walk is closed if $v_0=v_k$.
- Trail: a walk without repeated edges. Path: a walk without repeated vertices.
- Cycle: a closed trail. Simple cycle: all vertices distinct except $v_0=v_k$, its length is at least 3 in a simple graph.
- Distance $d(u,v)$: the length of the shortest path from $u$ to $v$; $d(u,u)=0$, in a disconnected graph $d(u,v)=\infty$.
- Eccentricity $e(v)=\max_u d(v,u)$ (the delay to the farthest node).
- Diameter $D=\max_v e(v)$, radius $R=\min_v e(v)$, the center is the set of vertices with $e(v)=R$, the periphery is the set of vertices with $e(v)=D$.

**Theorems and formulas**:
- If there is a walk between $u$ and $v$, then there is also a path: closed pieces of the walk are thrown out (if $v_i=v_j$, $i<j$, the piece between them is deleted).
- $d$ is a metric: $d(u,u)=0$, $d(u,v)=d(v,u)$, $d(u,w) \le d(u,v)+d(v,w)$ (a route through $v$ gives an upper bound).
- Relation between the radius and the diameter: $R \le D \le 2R$. Proof of the upper bound: let $c$ be a vertex of the center, then for any $u,w$ we have $d(u,w) \le d(u,c)+d(c,w) \le R+R = 2R$.
- For a tree $R=\lceil D/2 \rceil$: the diameter equals $2R$ or $2R-1$; the center of a tree is one vertex (when $D=2R$) or two adjacent vertices (when $D=2R-1$).
- How to compute: the distance matrix is obtained by a BFS from every vertex in $O(n(n+m))$ or by the Floyd-Warshall algorithm in $O(n^3)$. In a tree the diameter is found by a double BFS: from any vertex to the farthest one, and from there again to the farthest one.

**Example**: the graph $H$ on the vertices $\{1,2,3,4,5\}$ with edges $\{12,23,13,34,45\}$ (the triangle $123$ with the tail $3-4-5$). The distance matrix:

$$D_H=\begin{pmatrix}0&1&1&2&3\\1&0&1&2&3\\1&1&0&1&2\\2&2&1&0&1\\3&3&2&1&0\end{pmatrix},\qquad e=(3,3,2,2,3).$$

Hence $D=3$ (vertices 1 and 5), $R=2$ (vertices 3 and 4), the center is $\{3,4\}$, the periphery is $\{1,2,5\}$. For comparison: the trail $P_5$ has radius 2, diameter 4, and its center is the single vertex 3; the cycle $C_5$ has all distances to the farthest node equal to 2, that is $D=R=2$ and the whole graph is its own center.

**What the examiner may ask**:
- **How does a trail differ from a path?** In a trail repeated edges are forbidden, in a path repeated vertices are forbidden as well.
- **Prove $D \le 2R$.** Through a vertex of the center: $d(u,w) \le d(u,c)+d(c,w) \le 2R$.
- **What is the center of a tree?** One vertex or two adjacent ones, depending on the parity of the diameter.
- **How is the diameter found in practice?** By a BFS from every vertex; in a tree a double BFS is enough.

## Question 44. Connected components of graphs and their quantitative estimate.

**In plain words**: a graph is connected if any node can be reached from any other. A connected component is a maximal connected group of nodes, that is a separate piece of the network with no channel between the pieces. For a digraph one distinguishes weak connectivity (connectivity after dropping the orientation of the arcs) from strong connectivity (mutual reachability).

**Definitions**:
- A graph is connected if any two vertices are joined by a walk. The relation "$u$ is reachable from $v$" is an equivalence relation, its classes are the connected components.
- The number of connected components is denoted by $r$ (an isolated vertex forms one component).
- Cut vertex: a vertex whose deletion increases $r$. Bridge: an edge whose deletion increases $r$.
- A digraph is strongly connected if any two vertices are mutually reachable; it is weakly connected if it is connected after replacing the arcs by edges. The classes of mutual reachability are the strongly connected components (SCC), and contracting them yields the condensation, which is always acyclic.

**Theorems and formulas**:
- Estimate of the number of components: $r \ge n-m$, equivalently $m \ge n-r$. Proof via a spanning forest: every component contains a spanning tree, for the $k$-th component it has $n_k-1$ edges, therefore $m \ge \sum_k (n_k-1) = n-r$, whence $r \ge n-m$.
- Alternative proof by induction on $m$: base $m=0$, then $r=n \ge n$. Step: delete an edge $e$, by induction for $G-e$ we have $r' \ge n-(m-1)$, and either $e$ is a bridge and $r=r'-1 \ge n-m$, or $e$ is not a bridge and $r=r' \ge n-m+1 > n-m$.
- Corollaries: a connected graph has $m \ge n-1$; if $m < n-1$ the graph is disconnected; the equality $r = n-m$ is equivalent to every component being a tree, that is the graph being a forest.
- The cyclomatic number $\mu = m-n+r \ge 0$ is the dimension of the cycle space, that is the number of edges that must be deleted to obtain a spanning forest.
- Theorem: a graph is connected if and only if it has a spanning tree (see questions 45 and 46). Sufficiency is obvious, necessity: from a connected graph we delete edges of cycles until a tree remains, and exactly $m-(n-1)$ edges are deleted.

**Example**: $V=\{1,2,3,4,5\}$, $E=\{12,23,13,45\}$. The components are $\{1,2,3\}$ and $\{4,5\}$, hence $r=2$; here $n-m = 5-4 = 1$, and the inequality $2 \ge 1$ is strict because the component contains a cycle: $\mu = m-n+r = 4-5+2 = 1$. A second example with equality: $E=\{12,34\}$, then the components are $\{1,2\}$, $\{3,4\}$, $\{5\}$, that is $r=3 = n-m = 5-2$, the graph is a forest and its spanning forest coincides with itself.

**What the examiner may ask**:
- **Prove the estimate $r \ge n-m$.** Spanning trees of the components give $m \ge n-r$.
- **Why does a connected graph have at least $n-1$ edges?** This is $r \ge n-m$ rewritten for $r=1$.
- **What is the cyclomatic number?** $m-n+r$, the number of edges one has to delete to obtain a spanning forest.
- **How are components counted in practice?** By a depth-first or breadth-first traversal, by a disjoint-set structure, or via the reachability matrix computed by Warshall's algorithm (question 48).

## Question 45. Trees and their necessary and sufficient conditions.

**In plain words**: a tree is a network without a single ring: between any two nodes there is exactly one route and no backup paths. That is why a tree is the minimal network that is still connected and the maximal one that is still acyclic. All the conditions listed below describe one and the same property from different sides.

**Definitions**:
- Tree: a connected graph without cycles. Forest: a graph without cycles (every component is a tree).
- Leaf (pendant vertex): a vertex of degree 1.
- Subgraph $H \subseteq G$: $V_H \subseteq V_G$ and $E_H \subseteq E_G$ (the ends of the edges from $E_H$ lie in $V_H$). Spanning subgraph: a subgraph with all the vertices, $V_H=V_G$.
- Induced subgraph $G[W]$: all the vertices from $W$ and all edges of $G$ with both ends in $W$.
- Spanning tree: a spanning subgraph that is a tree. Spanning forest: a spanning subgraph that is a forest with the same number of components as the graph itself.

**Theorems and formulas** (equivalent conditions, for a graph $T$ on $n$ vertices with $m$ edges):
1. $T$ is connected and contains no cycles (the definition of a tree).
2. $T$ is connected and $m=n-1$.
3. $T$ contains no cycles and $m=n-1$.
4. Any two vertices are joined by exactly one path.
5. $T$ is connected, and deleting any edge destroys connectivity (every edge is a bridge).
6. $T$ contains no cycles, and adding any new edge between non-adjacent vertices creates exactly one cycle.
7. $T$ is at the same time minimally connected (deleting any edge breaks connectivity) and maximally acyclic (any added edge creates a cycle).

Proof skeleton (we close the chain 1-2-3-4-1 and separately 1-5-1, 1-6-1):
- $1 \Rightarrow 2$: induction on $n$. A tree has a leaf $v$ (lemma below). The graph $T-v$ is a tree as well, with $n-1$ vertices and $m-1$ edges, by induction $m-1=(n-1)-1$, hence $m=n-1$. Base: $n=1$, $m=0$.
- $2 \Rightarrow 3$: if there were a cycle, delete an edge of the cycle, connectivity is preserved, and we get a connected graph with $n-2$ edges, but a connected graph has $m \ge n-1$ (question 44), a contradiction.
- $3 \Rightarrow 4$: connectivity. Every component is acyclic and connected, that is a tree, and it has $n_i-1$ edges (already proved in $1 \Rightarrow 2$), then $m=\sum_i (n_i-1)=n-k$, where $k$ is the number of components, and since $m=n-1$ we get $k=1$. Uniqueness of the path: two different paths between $u$ and $v$ give a cycle (symmetric difference).
- $4 \Rightarrow 1$: a cycle would give two different routes between its vertices, so there are no cycles; the paths exist, so the graph is connected. Altogether a tree.
- $1 \Rightarrow 5$: if an edge lies on a cycle, after deleting it a route between its ends survives along the rest of the cycle, connectivity is preserved; a tree has no cycles, so every edge is a bridge.
- $5 \Rightarrow 1$: the presence of a cycle would mean that deleting one of its edges does not break connectivity, a contradiction.
- $1 \Rightarrow 6$: between the ends of the new edge there is a route in the tree, which closes into a cycle; two different cycles are impossible, otherwise their symmetric difference would give a cycle inside the tree itself.
- $6 \Rightarrow 1$: acyclicity is part of the condition; if $T$ were disconnected, an edge between two components would not create a cycle.
- Lemma on leaves: a tree with $n \ge 2$ has at least two leaves. Proof: take the longest path $v_0 \dots v_k$; its ends have no neighbours outside the path (otherwise the path would be longer) and no neighbours inside the path (otherwise a cycle would appear), so the degree of both ends equals 1.

**Example**: the star $K_{1,4}$ on the vertices $\{1,2,3,4,5\}$ with edges $\{12,13,14,15\}$: $m=4=n-1$, connected, no cycles, the leaves are 2,3,4,5, the center is vertex 1. The spanning subgraphs of this star with 4 edges coincide with the star itself, while any spanning subgraph with 3 edges is a trail, hence also a tree. Counterexamples: the cycle $C_4$ ($n=4$, $m=4$, it has a cycle, deleting an edge does not break connectivity); a triangle plus an isolated vertex ($n=4$, $m=3=n-1$, but there is a cycle and there is an isolated vertex, so neither condition 2 nor condition 4 holds).

**What the examiner may ask**:
- **Give the definition of a tree and name the equivalent conditions.** A connected graph without cycles; the other conditions are equivalent, the proof goes by a chain of implications.
- **Prove that a tree has a leaf.** Take the longest trail, its ends have degree 1.
- **Why is a graph connected when $m=n-1$ and there are no cycles?** Otherwise there would be more than one component and there would be $\le n-2$ edges.
- **What is a spanning subgraph?** A subgraph with all the vertices of the original graph.

## Question 46. Subgraphs, spanning subgraphs and spanning trees.

**In plain words**: a spanning tree is the skeleton of a connected network: a minimal set of channels keeping all nodes reachable. The number of spanning trees shows how many independent variants of a minimal working configuration there are. Kirchhoff's matrix-tree theorem lets one compute this number with a single determinant, without any search.

**Definitions**:
- Spanning tree of a graph $G$: a spanning subgraph that is a tree. It exists if and only if $G$ is connected.
- $\tau(G)$: the number of distinct spanning trees of the graph $G$ (spanning trees as subsets of edges; in a multigraph multiple edges count as different).
- Kirchhoff matrix (Laplacian) $L=D-A$: the degrees of the vertices on the diagonal, $-1$ off the diagonal for adjacent vertices and 0 for non-adjacent ones.

**Theorems and formulas**:
- Kirchhoff's matrix-tree theorem: the number of spanning trees $\tau(G)$ equals any cofactor of the matrix $L$: cross out any row $i$ and the column with the same number $j$ (that is, a principal minor of order $n-1$) and take the determinant. For a disconnected graph all such cofactors are zero.
- Properties of $L$: symmetric; the sums of all rows and columns are 0, hence $L \mathbf 1 = 0$ and $\det L = 0$; all principal minors of order $n-1$ are equal to each other; for a connected graph $\operatorname{rank} L = n-1$, and the second smallest eigenvalue (the Fiedler value) is positive; adding edges makes $L$ grow elementwise.
- Representation $L = B B^{\mathsf T}$, where $B$ is the oriented incidence matrix of size $n \times m$ (in the column of an arc there is $-1$ at the start and $+1$ at the end).
- Idea of the proof: by the Cauchy-Binet formula the determinant of the cofactor equals the sum of squares of the determinants of the maximal minors of $B$; the non-zero terms correspond to sets of edges forming a spanning tree, and the determinant of each such minor equals $\pm 1$, so the sum counts spanning trees exactly once each.
- Relation to question 44: a spanning tree exists $\iff$ the graph is connected $\iff$ all cofactors are non-zero.

**Example**: $G$ on the vertices $\{1,2,3,4\}$ with edges $\{12,13,14,23,34\}$ (this is $K_4$ without the edge $24$). The degrees are $(3,2,3,2)$, hence

$$L=\begin{pmatrix}3&-1&-1&-1\\-1&2&-1&0\\-1&-1&3&-1\\-1&0&-1&2\end{pmatrix}.$$

We cross out the 4th row and the 4th column and compute the determinant:

$$\det\begin{pmatrix}3&-1&-1\\-1&2&-1\\-1&-1&3\end{pmatrix}=3(6-1)-(-1)(-3-1)+(-1)(1+2)=15-4-3=8.$$

So $\tau(G)=8$. Control manual count: $G$ has five edges, a spanning tree is three edges, in total there are $\binom{5}{3}=10$ triples; only two triples are cyclic, $\{12,13,23\}$ and $\{13,14,34\}$ (two triangles), so there are $10-2=8$ spanning trees. The remaining cofactors give the same number 8 (checked by a direct computation of all four cofactors). Comparison: for $K_4$ the same method gives $\tau(K_4)=16$, which agrees with Cayley's formula from question 47.

**What the examiner may ask**:
- **State Kirchhoff's theorem.** The number of spanning trees equals any cofactor of the matrix $D-A$.
- **Why is $\det L = 0$?** The row sums are zero, the rows are linearly dependent.
- **What does the theorem give for a disconnected graph?** All cofactors are zero, $\tau=0$.
- **May one take different rows and columns?** Yes, but necessarily with the same numbers, and all such principal minors are equal to each other.

## Question 47. Counting the number of spanning trees in a connected graph. Example.

**In plain words**: how many different trees can be hung on $n$ fixed (labelled) vertices? The answer is unexpectedly simple: $n^{n-2}$. In the network analogy: there are $n$ nodes and all possible channels between them, and we ask how many different minimal connected schemes exist.

**Definitions**:
- Labelled graph: the vertices are distinguishable (numbered), so trees on one and the same vertex set with different edge sets count as different.
- The spanning trees of the complete graph $K_n$ are exactly the labelled trees on $n$ vertices, so Cayley's formula is a special case of the spanning tree counting problem.

**Theorems and formulas**:
- Cayley's formula: the number of labelled trees on $n$ vertices equals $n^{n-2}$, that is $\tau(K_n)=n^{n-2}$.
- Idea of the proof (Prüfer code): a tree is mapped to a sequence of length $n-2$ of vertex numbers by the rule "take the smallest leaf, write down its neighbour, delete the leaf"; the process runs until one edge is left. This mapping is a bijection: from any sequence of length $n-2$ the tree is restored uniquely. There are exactly $n^{n-2}$ sequences, hence exactly as many trees.
- Small values: $n=2$ gives 1, $n=3$ gives 3, $n=4$ gives 16, $n=5$ gives 125.
- Complete bipartite graph: $\tau(K_{m,n}) = m^{n-1} n^{m-1}$ (the parts have $m$ and $n$ vertices). It is stated without derivation and proved by the same matrix method.
- An important clarification: this is about labelled trees; the number of non-isomorphic trees on $n$ vertices is quite different (for $n=4$ there are only 2: the trail $P_4$ and the star $K_{1,3}$).

**Example**:
- $K_3$: $3^{3-2}=3$ spanning trees; each of the three spanning trees is $K_3$ without one edge.
- $K_4$: $4^{2}=16$ spanning trees, which agrees with the determinant from question 46.
- $K_{2,2}=C_4$: $\tau = 2^{2-1} \cdot 2^{2-1} = 2 \cdot 2 = 4$ (in a cycle of four edges any triple of edges is a spanning tree).
- $K_{2,3}$: $\tau = 2^{3-1} \cdot 3^{2-1} = 4 \cdot 3 = 12$; $K_{3,3}$: $\tau = 3^2 \cdot 3^2 = 81$; $K_5$: $\tau = 5^3 = 125$. The values 4, 12, 81 and 125 were checked by a direct enumeration of subsets of edges.

**What the examiner may ask**:
- **State Cayley's formula.** The number of labelled trees on $n$ vertices equals $n^{n-2}$.
- **What is the idea of the proof?** A bijection with the Prüfer code, there are exactly $n^{n-2}$ sequences of length $n-2$.
- **How many spanning trees do $K_{3,3}$ and $K_5$ have?** 81 and 125.
- **How many non-isomorphic trees on 4 vertices are there?** Two (a trail and a star); this does not contradict Cayley's formula, which counts labelled trees.

## Question 48. Transitive closure of a graph and its use for finding the number of connected components. Warshall's algorithm for finding the transitive closure. Example.

**In plain words**: the transitive closure answers the question "where can one get to along a chain of links, rather than along a single edge". In CTF this is a standard question: from a compromised node 1 you can see 3, from 3 you can see 4, so everything reachable along chains is really reachable. The reachability matrix is the table of who reaches whom, and Warshall's algorithm builds it in $O(n^3)$.

**Definitions**:
- Let a binary relation $R$ be given on a set $V$ (in terms of a digraph this is the set of arcs). The transitive closure $R^+$ is the minimal transitive relation containing $R$; equivalently $R^+ = R \cup R^2 \cup R^3 \cup \dots$ (the pairs joined by a chain of non-zero length).
- The reflexive-transitive closure $R^* = R^+ \cup I$, where $I$ is the diagonal; this is the convention "a vertex is reachable from itself in 0 steps".
- Reachability matrix: $R_{ij}=1 \iff$ vertex $j$ is reachable from $i$ (a path of positive length; under the convention of a path of length 0 the diagonal carries ones).
- Boolean relation to the adjacency matrix: $R = A \lor A^2 \lor \dots \lor A^{n-1}$; powers above $n-1$ are not needed, since a simple path has no repeated vertices.

**Theorems and formulas** (Warshall's algorithm):

```
Input: boolean adjacency matrix A of size n x n
W := A
for k from 1 to n:
    for i from 1 to n:
        if W[i][k] == 1:
            for j from 1 to n:
                W[i][j] := W[i][j] or W[k][j]
Output: W (after all k)
```

- Invariant: after processing $k$ we have $W_{ij}=1$ if and only if there exists a path from $i$ to $j$ all of whose intermediate vertices lie in $\{1,\dots,k\}$. Base $k=0$: $W=A$, there are no intermediate vertices. Step: a path with intermediate vertices from $\{1,\dots,k\}$ either does not enter $k$ (the value is already there) or passes through $k$ and splits into two paths with intermediate vertices from $\{1,\dots,k-1\}$; then $W_{ik}=1$ and $W_{kj}=1$ before the update, and the "or" rule sets a one.
- Complexity $O(n^3)$ time and $O(n^2)$ memory; a naive boolean matrix powering gives $O(n^4)$.

**Example** (complete, 4 vertices): the digraph $D$ with the arcs $1 \to 2$, $2 \to 3$, $3 \to 1$, $3 \to 4$.

$$W_0=A=\begin{pmatrix}0&1&0&0\\0&0&1&0\\1&0&0&1\\0&0&0&0\end{pmatrix}.$$

- $k=1$: the only one in column 1 is in row 3 ($W_{31}=1$), row 3 is updated through row 1: $(1,0,0,1) \to (1,1,0,1)$, the path $3 \to 1 \to 2$ has appeared.

$$W_1=\begin{pmatrix}0&1&0&0\\0&0&1&0\\1&1&0&1\\0&0&0&0\end{pmatrix}.$$

- $k=2$: $W_{i2}=1$ for $i=1,3$; row 2 equals $(0,0,1,0)$, so $W_{13}=1$ appears (the path $1 \to 2 \to 3$) as well as $W_{33}=1$ (the path $3 \to 1 \to 2 \to 3$).

$$W_2=\begin{pmatrix}0&1&1&0\\0&0&1&0\\1&1&1&1\\0&0&0&0\end{pmatrix}.$$

- $k=3$: $W_{i3}=1$ for $i=1,2,3$; row 3 equals $(1,1,1,1)$, so rows 1, 2, 3 become all ones: from 1 and 2 one reaches 1 and 4 (the paths $1 \to 2 \to 3 \to 1$ and $1 \to 2 \to 3 \to 4$).

$$W_3=\begin{pmatrix}1&1&1&1\\1&1&1&1\\1&1&1&1\\0&0&0&0\end{pmatrix}.$$

- $k=4$: $W_{i4}=1$ for $i=1,2,3$, but row 4 is zero, so nothing changes, $W_4=W_3$.

Check: the boolean sum $A \lor A^2 \lor A^3$ gives the same matrix. The reachability matrix under the convention of a path of length 0: $R = W_4 \lor I$,

$$R=\begin{pmatrix}1&1&1&1\\1&1&1&1\\1&1&1&1\\0&0&0&1\end{pmatrix}.$$

**Application to connected components**:
- Undirected graph (symmetric matrix): vertices are mutually reachable if and only if they lie in one component. The row of $R$ for a vertex is the characteristic vector of its component, so the number of components equals the number of distinct rows (equivalence classes of rows).
- Mini example: $V=\{1,2,3,4\}$ and the edges $\{12,34\}$, then

$$R=\begin{pmatrix}1&1&0&0\\1&1&0&0\\0&0&1&1\\0&0&1&1\end{pmatrix},$$

there are two distinct rows, hence two components: $\{1,2\}$ and $\{3,4\}$.
- Digraph: the same procedure with mutual reachability gives the strongly connected classes. In the example above there are two distinct rows: $(1,1,1,1)$ for the vertices 1, 2, 3 and $(0,0,0,1)$ for vertex 4, that is two SCCs: $\{1,2,3\}$ and $\{4\}$, while the whole graph is weakly connected (the chain $1-2-3-4$). The SCCs are used to build the condensation, which is acyclic.
- Other applications: the transitive closure of a relation (the relation "reachable"), testing connectivity and strong connectivity, dependency analysis, finding all nodes reachable from an entry point.

**What the examiner may ask**:
- **What is the transitive closure?** The minimal transitive relation containing the given one, that is all the pairs linked by a chain.
- **What is the variable $k$ in the outer loop for?** It defines the admissible set of intermediate vertices: the invariant guarantees that all paths are accounted for.
- **How does one find the components from the reachability matrix?** The number of distinct rows equals the number of components; in a digraph this is how SCCs are identified.
- **What is the complexity and why?** $O(n^3)$: three nested loops, the body of the inner one is constant time.

## Cheat sheet

1. Graph $G=(V,E)$; a multigraph allows multiple edges, a pseudograph also allows loops; a digraph has arcs with a start and an end.
2. Adjacency matrix: symmetric, $a_{ij}$ = the number of edges, the degree = the row sum, $\sum_{i,j} a_{ij} = 2m$, $(A^k)_{ij}$ = the number of walks of length $k$.
3. Incidence matrix: rows are edges, the row sum is 2, the column sum = the degree, $2m$ ones in total; orientation: $-1$ at the start, $+1$ at the end.
4. Handshaking lemma: $\sum_v \deg v = 2m$; the number of vertices of odd degree is even; there are two vertices of equal degree; $m \le \binom{n}{2}$.
5. Operations: $\cup$, $\cap$, $\oplus$, $\bar G$ ($m + \bar m = \binom{n}{2}$, $\deg_{\bar G} v = n-1-\deg_G v$), $G_1 \square G_2$ ($n_1 n_2$ vertices, $K_2 \square K_2 = C_4$, $C_4 \square K_2 = Q_3$), contraction ($C_4/e = K_3$), deletion $G-v$ and $G-e$.
6. Isomorphism: a bijection preserving adjacency, $A_2 = P A_1 P^{\mathsf T}$; invariants: $n$, $m$, the degrees, $r$, cycles by length, $D$, $R$, the spectrum; $C_6$ and $2C_3$ are non-isomorphic with equal degrees.
7. Homeomorphism: subdivision of edges (vertices of degree 2); all cycles $C_n$ are homeomorphic; Kuratowski's criterion: planar $\iff$ no $K_5$ and no $K_{3,3}$ up to subdivision.
8. Walk, trail (no repeated edges), path (no repeated vertices), cycle = a closed trail; a walk exists $\Rightarrow$ a path exists.
9. $d(u,v)$ = the shortest path (a metric); $e(v) = \max_u d(v,u)$; $D=\max_v e(v)$, $R=\min_v e(v)$, the center is $\{v: e(v)=R\}$; always $R \le D \le 2R$.
10. For a tree $R = \lceil D/2 \rceil$, the center is one vertex or two adjacent ones; for $C_5$: $D=R=2$; for $P_5$: $D=4$, $R=2$, the center is vertex 3.
11. Connectivity: components = reachability classes; bridge and cut vertex; digraph: strong and weak connectivity, SCC, the condensation is acyclic.
12. Estimate of the number of components: $r \ge n-m$; the cycle rank (cyclomatic number) $\mu = m-n+r$; a connected graph has $m \ge n-1$.
13. Tree (equivalently): connected and acyclic; connected and $m=n-1$; acyclic and $m=n-1$; a unique path between any two vertices; every edge is a bridge; adding an edge gives exactly one cycle; minimally connected and maximally acyclic.
14. A tree with $n \ge 2$ has at least two leaves; a spanning tree exists $\iff$ the graph is connected; a spanning forest has $n-r$ edges.
15. Kirchhoff: $\tau(G)$ = any principal cofactor of $L = D-A$; $\det L = 0$; for a connected graph $\operatorname{rank} L = n-1$; $L = BB^{\mathsf T}$; for $K_4$ without one edge $\tau = 8$.
16. Cayley: $\tau(K_n) = n^{n-2}$ (a Prüfer code of length $n-2$): $K_3$ gives 3, $K_4$ gives 16, $K_5$ gives 125.
17. Complete bipartite: $\tau(K_{m,n}) = m^{n-1} n^{m-1}$: $C_4$ gives 4, $K_{2,3}$ gives 12, $K_{3,3}$ gives 81.
18. Transitive closure $R^+ = R \cup R^2 \cup \dots$, the reflexive one $R^* = R^+ \cup I$; $R = A \lor A^2 \lor \dots \lor A^{n-1}$.
19. Warshall: $W := A$; for every $k$: if $W_{ik}=1$, then $W_{i\cdot} := W_{i\cdot} \lor W_{k\cdot}$; invariant: intermediate vertices only from $\{1,\dots,k\}$; complexity $O(n^3)$.
20. Warshall example: the arcs $1\to2$, $2\to3$, $3\to1$, $3\to4$ give the rows $1111$, $1111$, $1111$, $0000$; the reachability matrix $R = W \lor I$ (unit diagonal).
21. Components via $R$: the number of distinct rows = the number of components; in the undirected case a row is the characteristic vector of a component; in a digraph this is how SCCs are counted (in the example: $\{1,2,3\}$ and $\{4\}$).
22. Quick test: $m < n-1$ means disconnectedness; the equality $r = n-m$ means the graph is a forest.
23. Ready-made examples: the star $K_{1,4}$ is a tree, $C_4$ is not a tree, a triangle plus an isolated vertex breaks the equivalences, $K_4$ without one edge has 8 spanning trees.
