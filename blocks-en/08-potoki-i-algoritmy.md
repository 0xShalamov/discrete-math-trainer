# Block 8. Flows, matchings and graph algorithms

Conventions of the block: a network is a digraph $N=(V,E)$ with a source $s$, a sink $t$ and capacities $c(u,v) \ge 0$; edge weights in the spanning tree and shortest path problems are assumed nonnegative unless stated otherwise.

## Question 49. Definition of a network, of a flow in a network, of a cut and its capacity. The Ford-Fulkerson (max-flow min-cut) theorem.

**In plain words**: a network is a system of pipes with limited capacity, and we must push the maximum amount of "water" from the source $s$ to the sink $t$. Any cut separating $s$ from $t$ bounds the pumping from above, so the maximum flow equals the capacity of the narrowest cut. In IT this is the throughput of a route between a client and a server; in CTF, flows are used to solve assignment problems (which workers take which jobs), and the minimum cut answers the question of which channels must be blocked so that traffic from $s$ to $t$ stops.

**Definitions**:
- Network: a finite loopless digraph $N=(V,E)$ with a distinguished source $s$ and sink $t$ and a capacity function $c \colon E \to \mathbb{R}_{\ge 0}$. We assume there are no antiparallel arcs (otherwise we introduce a dummy vertex), and that $c(u,v)=0$ if the arc is absent.
- Flow: a function $f \colon V \times V \to \mathbb{R}$ with three properties: (1) antisymmetry $f(u,v) = -f(v,u)$; (2) capacity constraint: $0 \le f(u,v) \le c(u,v)$ for every arc; (3) flow conservation: $\sum_{v \in V} f(u,v) = 0$ for every vertex $u$ except $s$ and $t$ (as much flows in as flows out).
- Value of the flow: $\lvert f \rvert = \sum_{v \in V} f(s,v)$ (the flow leaving the source); conservation implies $\lvert f \rvert = \sum_{v \in V} f(v,t)$.
- Cut separating $s$ from $t$: a partition $V = S \sqcup T$ with $s \in S$, $t \in T$. Capacity of the cut: $c(S,T) = \sum_{u \in S}\sum_{v \in T} c(u,v)$ (only arcs from $S$ to $T$). Flow across the cut: $f(S,T) = \sum_{u \in S}\sum_{v \in T} f(u,v)$.
- Residual network $N_f$: an arc $(u,v)$ keeps a residual capacity $c_f(u,v) = c(u,v) - f(u,v)$, and in the opposite direction an arc arises with residual capacity $c_f(v,u) = f(u,v)$; it allows cancelling flow already sent.
- Augmenting path: a path from $s$ to $t$ in the residual network; $\delta$ equals the minimum of $c_f$ over the arcs of the path, and along the path the flow is increased by $\delta$.
- Maximum flow: a flow of the greatest value (all maximum flows have the same value, the flow itself may be not unique). Minimum cut: a cut of the least capacity.

**Theorems and formulas**:
- Lemma on the flow across a cut: $f(S,T) = \lvert f \rvert$ for any flow and any cut. Proof: sum flow conservation over all $u \in S$, obtaining $\sum_{u \in S}\sum_{v \in V} f(u,v) = \lvert f \rvert$ (the terms with $u \ne s$ are zero); the same sum splits into $\sum_{u,v \in S} f(u,v) + f(S,T)$, where the first term equals 0, because swapping $u$ and $v$ changes the sign of every term.
- Corollary (bound): $\lvert f \rvert = f(S,T) \le c(S,T)$, since every $f(u,v) \le c(u,v)$. Hence the value of any flow does not exceed the capacity of any cut, and the maximum flow is not greater than the minimum cut.
- Ford-Fulkerson (max-flow min-cut) theorem: $\max_f \lvert f \rvert = \min_{(S,T)} c(S,T)$.
- Proof plan via augmenting paths: if an augmenting path exists, the flow increases by $\delta > 0$ and is not maximum. Suppose there are no paths, and let $S$ be the set of vertices reachable from $s$ in the residual network, while $T = V \setminus S$. Then $t \in T$, that is, $(S,T)$ is a cut; all arcs from $S$ to $T$ are saturated ($f = c$) and all arcs from $T$ to $S$ are empty ($f = 0$), otherwise the adjacent vertex would be reachable. Hence $f(S,T) = c(S,T)$, by the lemma $\lvert f \rvert = c(S,T)$, and by the upper bound no flow can be larger and no cut smaller: both optima are attained.
- Integrality: for integer $c$ all $\delta$ are integers, so the algorithm stops after at most $\lvert f^* \rvert$ augmentations and finds an integer maximum flow.
- Ford-Fulkerson algorithm:
```text
while there is a path from s to t in the residual network N_f:
    find a path (by depth-first or breadth-first search)
    delta = minimum residual capacity along the path
    increase the flow along the path by delta
```
The version with breadth-first search is called the Edmonds-Karp algorithm, its complexity is $O(VE^2)$ and does not depend on the values of the capacities.

**Example**: a network with vertices $\{s,a,b,t\}$; arcs and capacities: $c(s,a)=4$, $c(s,b)=4$, $c(a,b)=3$, $c(a,t)=3$, $c(b,t)=4$. We look for the maximum flow, choosing paths by depth-first search (neighbour order: $a$ first, then $b$).

| Step | Path $s \to t$ | $\delta$ | What happened to the flow | $\lvert f \rvert$ |
|---|---|---|---|---|
| 1 | $s \to a \to b \to t$ | 3 | $f(s,a)=f(a,b)=f(b,t)=3$ | 3 |
| 2 | $s \to a \to t$ | 1 | $f(s,a)=4$, $f(a,t)=1$ | 4 |
| 3 | $s \to b \to t$ | 1 | $f(s,b)=1$, $f(b,t)=4$ | 5 |
| 4 | $s \to b \to a \to t$ | 2 | $f(s,b)=3$, $f(a,b)=1$, $f(a,t)=3$ | 7 |

Step 4 uses the backward arc $b \to a$ (its residual capacity equals the current $f(a,b)=3$), that is, it cancels 2 units of flow along $a \to b$: $\delta = \min(4-1,\, 3,\, 3-1) = 2$. There are no more paths: in the residual network only $s, b, a$ are reachable from $s$ ($s \to b$ has residual 1, $b \to a$ has residual 1, $a \to t$ has residual 0). Conservation check: $a$ has 4 flowing in and $1+3=4$ flowing out; $b$ has $3+1=4$ flowing in and 4 flowing out.

Resulting flow: $f(s,a)=4/4$, $f(s,b)=3/4$, $f(a,b)=1/3$, $f(a,t)=3/3$, $f(b,t)=4/4$, $\lvert f \rvert = 7$.

Enumeration of all cuts: $S=\{s\}$ gives 8, $S=\{s,a\}$ gives 10, $S=\{s,b\}$ gives 8, $S=\{s,a,b\}$ gives $c(a,t)+c(b,t)=7$. The minimum 7 matches the flow, as the theorem promises; the cut $S=\{s,a,b\} \mid T=\{t\}$ is minimum.

Illustration of the lemma on the cut $S=\{s,b\}$, $T=\{a,t\}$: $f(S,T) = f(s,a) + f(b,t) + f(b,a) = 4 + 4 + (-1) = 7 = \lvert f \rvert$ (the arc $a \to b$ runs against the cut, its contribution equals $f(b,a) = -f(a,b)$).

**What the examiner may ask**:
- **State the Ford-Fulkerson theorem.** The maximum value of a flow equals the minimum capacity of a cut separating $s$ from $t$.
- **Why does a flow not exceed any cut?** By the lemma $f(S,T) = \lvert f \rvert$, and $f(u,v) \le c(u,v)$, hence $\lvert f \rvert \le c(S,T)$.
- **Why does the absence of augmenting paths mean maximality?** The vertices reachable from $s$ in the residual network form a cut with $c(S,T) = \lvert f \rvert$; a larger flow would contradict the upper bound.
- **What are the backward arcs in the residual network for?** To cancel bad decisions: step 4 of the example went along the backward arc $b \to a$ and decreased the flow along $a \to b$.
- **Does the algorithm always terminate?** For integer capacities yes, in at most $\lvert f^* \rvert$ steps; the BFS version (Edmonds-Karp) has the bound $O(VE^2)$.

## Question 50. Finding a minimum spanning tree. Prim's and Kruskal's algorithms.

**In plain words**: we must connect all nodes of a network (cities by cable, hosts, points for clustering) so that the links form a tree and the total cost is minimal. Both strategies are greedy: Kruskal scans the edges from cheap to expensive and takes the next one if it does not close a cycle; Prim grows a single tree from the starting vertex, each time adding the cheapest edge going out. Greediness is safe because minimum spanning trees have the cut and cycle properties.

**Definitions**:
- Weighted graph: a connected undirected graph $G=(V,E)$ with a weight function $w \colon E \to \mathbb{R}$.
- Spanning tree: a subgraph containing all $n$ vertices $V$, connected and without cycles; a spanning tree has exactly $n-1$ edges.
- Weight of a spanning tree: the sum of the weights of its edges. Minimum spanning tree (MST): a spanning tree of minimum weight. For a disconnected graph one builds a minimum spanning forest over the connected components.
- Cut: a partition $V = S \sqcup (V \setminus S)$; an edge crosses the cut if its endpoints lie on different sides.
- Safe edge: an edge that can be added to the current forest so that it belongs to some minimum spanning tree.

**Theorems and formulas**:
- Cut property: the minimum-weight edge crossing any cut is safe. Proof sketch: let $e$ be the minimum edge across the cut, $T$ a minimum spanning tree without $e$; adding $e$ creates a cycle; the cycle contains an edge $e'$ crossing the same cut, with $w(e') \ge w(e)$; replacing $e'$ by $e$ does not increase the weight, so the new spanning tree is also minimum.
- Cycle property: the heaviest edge of any cycle (for distinct weights) belongs to no minimum spanning tree; hence Kruskal's rule of discarding an edge that closes a cycle with the edges already taken.
- Greediness is correct for both algorithms; for pairwise distinct weights the minimum spanning tree is unique. The common reason: acyclic edge sets form a graphic matroid, and the greedy algorithm on a matroid yields a basis of minimum weight.
- Prim's algorithm: we maintain a tree on a vertex set $S$ and a label $key[v]$ (the minimum weight of an edge from $S$ to $v$) for the outside vertices. At each step we add the vertex with the minimum $key$, then update the labels of its neighbours. The edges added form a minimum spanning tree.
- Kruskal's algorithm: sort the edges by weight and scan them in increasing order, adding an edge if its endpoints lie in different components (cycle check by a disjoint set union, DSU).
- Complexities: Prim $O(n^2)$ with an array of labels (convenient on an adjacency matrix) or $O(m \log n)$ with a binary heap; Kruskal $O(m \log m)$ for sorting plus $O(m\,\alpha(n))$ for the DSU. Prim is better on dense graphs, Kruskal on sparse ones.

**Example**: a graph on 7 vertices:

| Edge | 1-2 | 1-4 | 2-3 | 2-4 | 2-5 | 3-5 | 4-5 | 4-6 | 5-6 | 5-7 | 6-7 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Weight | 7 | 5 | 8 | 9 | 7 | 5 | 15 | 6 | 8 | 9 | 11 |

Kruskal: sort the edges by weight and scan them in increasing order.

| # | Edge | Weight | Decision | Components after the step |
|---|---|---|---|---|
| 1 | 1-4 | 5 | take | $\{1,4\}$ |
| 2 | 3-5 | 5 | take | $\{1,4\}$, $\{3,5\}$ |
| 3 | 4-6 | 6 | take | $\{1,4,6\}$, $\{3,5\}$ |
| 4 | 1-2 | 7 | take | $\{1,2,4,6\}$, $\{3,5\}$ |
| 5 | 2-5 | 7 | take | $\{1,2,3,4,5,6\}$ |
| 6 | 2-3 | 8 | skip: cycle $2 \to 5 \to 3 \to 2$ | unchanged |
| 7 | 5-6 | 8 | skip: cycle $5 \to 2 \to 1 \to 4 \to 6 \to 5$ | unchanged |
| 8 | 2-4 | 9 | skip: cycle $2 \to 1 \to 4 \to 2$ | unchanged |
| 9 | 5-7 | 9 | take (vertex 7 is new) | the whole tree, 6 edges |
| 10 | 6-7 | 11 | skip: cycle | the spanning tree is ready |
| 11 | 4-5 | 15 | skip: cycle | the spanning tree is ready |

Weight: $5+5+6+7+7+9 = 39$.

Prim from vertex 1: at each step we look at all edges going out of the built part.

| Step | Tree $S$ | Candidate edges (weight) | Chosen |
|---|---|---|---|
| 1 | $\{1\}$ | 1-2 (7), 1-4 (5) | 1-4, weight 5 |
| 2 | $\{1,4\}$ | 1-2 (7), 2-4 (9), 4-5 (15), 4-6 (6) | 4-6, weight 6 |
| 3 | $\{1,4,6\}$ | 1-2 (7), 2-4 (9), 4-5 (15), 5-6 (8), 6-7 (11) | 1-2, weight 7 |
| 4 | $\{1,2,4,6\}$ | 2-3 (8), 2-5 (7), 4-5 (15), 5-6 (8), 6-7 (11) | 2-5, weight 7 |
| 5 | $\{1,2,4,5,6\}$ | 2-3 (8), 3-5 (5), 5-7 (9), 6-7 (11) | 3-5, weight 5 |
| 6 | $\{1,2,3,4,5,6\}$ | 5-7 (9), 6-7 (11) | 5-7, weight 9 |

Weight: $5+6+7+7+5+9 = 39$. The set of edges is the same as with Kruskal: $14$, $46$, $12$, $25$, $35$, $57$ (here the minimum spanning tree is unique; exhaustive enumeration of all 462 sets of 6 edges confirms uniqueness and the weight 39). Check: 6 edges on 7 vertices, all vertices connected, no cycles.

**What the examiner may ask**:
- **Why is Kruskal's greediness correct?** The minimum-weight edge across the cut between a component and the rest of the graph is safe, it can be included in a minimum spanning tree (cut property).
- **How is the cycle checked?** DSU: if the endpoints of an edge are already in one component, the edge closes a cycle and is skipped.
- **Is the minimum spanning tree unique?** For distinct weights yes; for equal weights different spanning trees are possible, but the weight of the minimum one is the same for all.
- **Compare the algorithms.** Kruskal $O(m \log m)$ and convenient on sparse graphs; Prim $O(n^2)$ or $O(m \log n)$ and convenient on dense ones; both give a minimum spanning tree.

## Question 51. Dijkstra's algorithm for finding a shortest path in a graph.

**In plain words**: this is a router running the OSPF protocol: given a map of channels with delays, the algorithm one by one fixes the vertex closest to the source and never revisits it. Greediness works because the weights are nonnegative: a route "through a distant vertex" cannot turn out shorter than the path already found. The algorithm gives shortest paths from one vertex to all the others.

**Definitions**:
- Length of a path: the sum of the weights of its edges (arcs). Shortest path: a path of minimum length.
- Label $d[v]$: the current estimate of the distance from $s$ to $v$. The label is temporary while the vertex is unprocessed and permanent (final) after processing.
- Relaxation of an edge $(u,v)$: $d[v] = \min(d[v],\, d[u] + w(u,v))$ with the predecessor updated as $prev[v] = u$.
- Input requirement: all weights are nonnegative, $w \ge 0$ (otherwise the algorithm does not apply).

**Theorems and formulas**:
- Algorithm: $d[s]=0$, the other labels $\infty$, all vertices unprocessed. Repeat $n$ times: choose the unprocessed vertex $u$ with the minimum label, declare its label permanent, relax all edges out of $u$. The final labels equal the shortest distances.
- Correctness (idea of the exchange argument): let $u$ be chosen with the minimum label among unprocessed vertices, but suppose a shorter path to $u$ exists. Take the first unprocessed vertex $y$ on it: the prefix of the path passes only through processed vertices, and their edges have already been relaxed, so $d[y] \le$ the length of the prefix $< d[u]$, which contradicts the choice of $u$. Induction over the steps gives permanence of all labels.
- Complexity: $O(n^2)$ if the minimum is found by a linear scan, and $O(m \log n)$ with a binary heap.
- Negative weights are not allowed, counterexample: $s \to a$ (weight 2), $s \to b$ (weight 5), $b \to a$ (weight $-10$). The algorithm will fix $d[a]=2$ before it reaches $b$ and will not see the path $s \to b \to a$ of length $5-10=-5$; the correct answer is $-5$, the algorithm gives 2.
- Path reconstruction: after the run we walk back from the target vertex along the predecessor array $prev$ to $s$. It also works on directed graphs.

**Example**: vertices $\{1,2,3,4,5,6\}$, undirected edges: 1-2 (7), 1-3 (9), 1-6 (14), 2-3 (10), 2-4 (15), 3-4 (11), 3-6 (2), 4-5 (6), 5-6 (9). We start from vertex 1.

| Step | Marked (its label) | $d[2]$ | $d[3]$ | $d[4]$ | $d[5]$ | $d[6]$ | What was relaxed |
|---|---|---|---|---|---|---|---|
| 0 | start 1 (0) | 7 | 9 | $\infty$ | $\infty$ | 14 | edges from 1: obtained 7, 9, 14 |
| 1 | 2 (7) | 7 | 9 | 22 | $\infty$ | 14 | 2-4: $7+15=22$; 2-3: 17 is worse than 9 |
| 2 | 3 (9) | 7 | 9 | 20 | $\infty$ | 11 | 3-4: $9+11=20$ better than 22; 3-6: $9+2=11$ better than 14 |
| 3 | 6 (11) | 7 | 9 | 20 | 20 | 11 | 6-5: $11+9=20$ |
| 4 | 4 (20) | 7 | 9 | 20 | 20 | 11 | 4-5: $20+6=26$, not better |
| 5 | 5 (20) | 7 | 9 | 20 | 20 | 11 | the run is over |

Final distances: $d = (0, 7, 9, 20, 20, 11)$. Shortest paths: $1 \to 2$ is 1-2 (7); $1 \to 3$ is 1-3 (9); $1 \to 6$ is 1-3-6 (11, the direct arc 14 is worse); $1 \to 4$ is 1-3-4 (20); $1 \to 5$ is 1-3-6-5 (20). Vertices 4 and 5 received the same label 20, the order in which they are marked does not affect the answer.

**What the examiner may ask**:
- **Why is the algorithm correct?** The first unprocessed vertex on a hypothetically shorter path would have received a label smaller than the chosen one, contradicting the greedy choice of the minimum.
- **What do negative weights break?** A fixed label can later be improved through a negative edge, and the algorithm does not revise it; the counterexample with weight $-10$ gives 2 instead of $-5$.
- **How does it differ from BFS and Bellman-Ford?** BFS is the case of unit weights; Bellman-Ford allows negative weights in $O(nm)$.
- **Complexity and path reconstruction?** $O(n^2)$ or $O(m \log n)$; the path is built from the predecessor array $prev$.

## Question 52. Floyd-Warshall algorithm for finding the lengths of shortest paths in a graph.

**In plain words**: this is a table of the "distance between any two cities", where transit cities are gradually allowed: first we travel only through city 1, then through cities 1 and 2, and so on. After the $k$-th round the table gives shortest paths whose intermediate vertices are taken from the first $k$. The same scheme with Boolean values gives the transitive closure (the Boolean version, Warshall's algorithm). Unlike Dijkstra, the method works with negative edges (except negative cycles) and does so for all pairs at once.

**Definitions**:
- Weight matrix $W$: $w_{ij}$ is the weight of the arc from $i$ to $j$, $0$ on the diagonal and $+\infty$ if the arc is absent.
- $D^k[i][j]$: the length of the shortest path from $i$ to $j$ among paths whose intermediate vertices all belong to the set $\{1,\dots,k\}$; $i$ and $j$ themselves are not counted as intermediate.
- Negative cycle: a cycle of total weight less than zero; if one exists, shortest paths are undefined (one can decrease them indefinitely).

**Theorems and formulas**:
- Base: $D^0 = W$. Transition: $D^k[i][j] = \min\bigl(D^{k-1}[i][j],\ D^{k-1}[i][k] + D^{k-1}[k][j]\bigr)$: either the path does not enter $k$, or it splits into the parts $i \to k$ and $k \to j$, each with intermediate vertices from $\{1,\dots,k-1\}$.
- Pseudocode:
```text
for k from 1 to n:
    for i from 1 to n:
        for j from 1 to n:
            D[i][j] = min(D[i][j], D[i][k] + D[k][j])
```
The loop over $k$ must be the outer one. The matrix can be modified in place: the recurrence is not spoiled by this.
- Complexity: $O(n^3)$ time, $O(n^2)$ memory.
- A negative cycle is detected after the run by the condition $D[i][i] < 0$; in the positive case the diagonal is zero.
- Transitive closure: the same triple of loops, where instead of $\min$ there is disjunction, instead of $+$ conjunction, and instead of weights the values "path exists / does not exist".
- Path reconstruction: in parallel we store $nxt[i][j]$ (the next vertex after $i$ on the shortest path). On an improvement through $k$ we set $nxt[i][j] = nxt[i][k]$; the path is printed in steps $i \to nxt[i][j] \to \dots \to j$.

**Example**: a graph on 4 vertices, arcs: $1 \to 2$ (3), $1 \to 4$ (7), $2 \to 1$ (8), $2 \to 3$ (2), $3 \to 1$ (5), $3 \to 4$ (1), $4 \to 1$ (2).

$$D^0 = \begin{pmatrix} 0 & 3 & \infty & 7 \\ 8 & 0 & 2 & \infty \\ 5 & \infty & 0 & 1 \\ 2 & \infty & \infty & 0 \end{pmatrix}$$

Step $k=1$ (city 1 allowed): changes $D[2][4] = 8+7 = 15$, $D[3][2] = 5+3 = 8$, $D[4][2] = 2+3 = 5$.

$$D^1 = \begin{pmatrix} 0 & 3 & \infty & 7 \\ 8 & 0 & 2 & 15 \\ 5 & 8 & 0 & 1 \\ 2 & 5 & \infty & 0 \end{pmatrix}$$

Step $k=2$: changes $D[1][3] = 3+2 = 5$, $D[4][3] = 5+2 = 7$.

$$D^2 = \begin{pmatrix} 0 & 3 & 5 & 7 \\ 8 & 0 & 2 & 15 \\ 5 & 8 & 0 & 1 \\ 2 & 5 & 7 & 0 \end{pmatrix}$$

Step $k=3$: changes $D[1][4] = 5+1 = 6$, $D[2][4] = 2+1 = 3$, $D[2][1] = 2+5 = 7$.

$$D^3 = \begin{pmatrix} 0 & 3 & 5 & 6 \\ 7 & 0 & 2 & 3 \\ 5 & 8 & 0 & 1 \\ 2 & 5 & 7 & 0 \end{pmatrix}$$

Step $k=4$: changes $D[2][1] = 3+2 = 5$, $D[3][1] = 1+2 = 3$, $D[3][2] = 1+5 = 6$.

$$D^4 = \begin{pmatrix} 0 & 3 & 5 & 6 \\ 5 & 0 & 2 & 3 \\ 3 & 6 & 0 & 1 \\ 2 & 5 & 7 & 0 \end{pmatrix}$$

The result coincides with a direct Bellman-Ford recomputation from every vertex. Examples of reconstructed paths: $d(2,1)=5$ is the path $2 \to 3 \to 4 \to 1$; $d(3,1)=3$ is $3 \to 4 \to 1$; $d(1,4)=6$ is $1 \to 2 \to 3 \to 4$ (the direct arc 7 is worse). The cycle $1 \to 2 \to 3 \to 4 \to 1$ has weight 8, there are no negative cycles, the diagonal is zero.

**What the examiner may ask**:
- **What does $D^k$ mean?** Shortest paths with intermediate vertices only from the first $k$; $D^n$ is the matrix of all shortest distances.
- **Why is the triple loop correct?** Induction on $k$: a path with intermediate vertices from $\{1,\dots,k\}$ either does not enter $k$, or splits at $k$ into two paths with intermediate vertices from $\{1,\dots,k-1\}$.
- **How to detect a negative cycle?** After the run check the condition $D[i][i] < 0$.
- **Complexity and difference from Dijkstra?** $O(n^3)$ versus $O(m \log n)$ from one vertex; Floyd computes all pairs at once and allows negative edges.

## Question 53. Bipartite graphs. Matchings. Maximum matchings.

**In plain words**: a bipartite graph is a "jobs and workers" scheme: an edge says that a worker can do a job. A matching is a set of pairs where every vertex is used once, that is, an assignment of jobs. Kuhn's algorithm finds the maximum number of pairs like this: for every free vertex on the left it tries to find a chain of reassignments (an augmenting chain) that frees a partner for it. Berge's theorem explains why this is an honest criterion: no reassignments, so there is nothing to improve.

**Definitions**:
- Bipartite graph: a graph whose vertices are split into two parts $L$ and $R$ so that every edge joins a vertex from $L$ to a vertex from $R$. The complete bipartite graph $K_{m,n}$ contains all $mn$ edges between the parts.
- Bipartiteness criterion (Konig): a graph is bipartite if and only if it has no cycles of odd length, that is, when it admits a 2-colouring (the endpoints of every edge have different colours).
- Matching: a set of edges without common endpoints. A vertex is saturated if it is an endpoint of a matching edge. The size $\lvert M \rvert$ is the number of edges.
- Maximum matching: a matching of the greatest size (it cannot be increased). Perfect: it saturates all vertices; if $\lvert L \rvert = \lvert R \rvert$, it is enough to saturate one part.
- Alternating path with respect to $M$: a path whose edges alternate not from $M$, from $M$, not from $M$, and so on. Augmenting path: an alternating path with its start and end at unsaturated vertices (it has one more edge outside $M$).
- Symmetric difference $M \oplus M'$: the edges belonging to exactly one of the matchings.

**Theorems and formulas**:
- Bipartiteness criterion: $G$ is bipartite $\iff$ all cycles are even $\iff$ a 2-colouring exists. Check: breadth-first search, colouring the vertices by layers. Sketch: along an odd cycle the colours must alternate and conflict when the cycle closes, so an odd cycle is not 2-colourable; conversely, colouring by the parity of the distance in BFS is correct, because all edges join adjacent layers.
- Berge's theorem: a matching $M$ is maximum if and only if there is no augmenting path with respect to $M$. Sketch: if a path exists, replace the edges along it (symmetric difference), the size grows by 1; if a matching $M'$ of greater size exists, then in $M \oplus M'$ the components are alternating paths and cycles, the cycles are even, so some path contains more edges from $M'$ than from $M$, and it is augmenting for $M$.
- Kuhn's algorithm: we scan the left vertices one by one and look for an augmenting path for each of them by DFS over alternating paths.
```text
for each v from L:
    used = empty (right vertices visited in this search)
    try_kuhn(v)

try_kuhn(v):
    for each neighbour u of vertex v:
        if u is already in used: skip
        add u to used
        if u is free or try_kuhn(partner(u)):
            assign u as the partner of v
            return true
    return false
```
- Correctness (idea): induction on the number of processed left vertices; a failed search has examined all alternating paths and shown the absence of an augmenting path, and new edges do not create one; in the end, by Berge, the matching is maximum.
- Complexity: $O(\lvert L \rvert \cdot \lvert E \rvert)$. With a greedy initialisation and the Hopcroft-Karp algorithm it is faster: $O\bigl(\lvert E \rvert \sqrt{\lvert V \rvert}\bigr)$.
- Relation to flows: we build a network $s \to$ every left vertex (capacity 1), every edge from $L$ to $R$ (1), every right vertex $\to t$ (1). The integer maximum flow equals the largest matching (Ford-Fulkerson theorem and integrality).
- Konig's theorem for bipartite graphs: the size of the largest matching equals the size of the smallest vertex cover.

**Example**: parts $L = \{1,2,3,4\}$, $R = \{a,b,c,d\}$; edges: $1a$, $1b$, $2a$, $3b$, $3c$, $4c$, $4d$.
A naive greedy pass without reassignments gives only 3 edges: $1a$, $3b$, $4c$ (vertex 2 is left without a pair), so augmenting chains are unavoidable.
Run of Kuhn's algorithm:

| Left vertex | What happens during the search | Matching after |
|---|---|---|
| 1 | $a$ is free | $1a$ |
| 2 | $a$ is taken: 1 moves to $b$ | $1b$, $2a$ |
| 3 | $b$ is taken: 1 goes to $a$, but $a$ is taken by 2, and 2 has no other edges (dead end); take $c$ | $1b$, $2a$, $3c$ |
| 4 | $c$ is taken: 3 goes to $b$, 1 goes to $a$, 2 is a dead end; the whole chain $4 \to c \to 3 \to b \to 1 \to a \to 2$ fails; take $d$ | $1b$, $2a$, $3c$, $4d$ |

Result: a perfect matching of size 4; exhaustive search confirms that the maximum equals 4. A mini example without a perfect matching: $L=\{1,2\}$, $R=\{a\}$, edges $1a$, $2a$; the search from vertex 2 fails, the largest matching has size 1, it is maximum but not perfect.

**What the examiner may ask**:
- **How to check bipartiteness?** BFS with 2-colouring; a colour conflict means a cycle of odd length.
- **State Berge's theorem.** A matching is maximum if and only if there is no augmenting chain.
- **Why does Kuhn's algorithm give the largest matching?** After all left vertices are processed there are no augmenting chains, and by Berge the matching is maximum.
- **What is the used array for and what is the complexity?** To prevent the DFS from looping on a repeated visit to a right vertex; the complexity is $O(\lvert L \rvert \cdot \lvert E \rvert)$.

## Question 54. Systems of distinct representatives and how to find them.

**In plain words**: there are $n$ groups, and from each we must choose one element so that the chosen elements are distinct; this is schedule design, when every group declares acceptable options and all must be spread over different ones. Hall's criterion says that only tightness gets in the way: if some $k$ groups together have fewer than $k$ candidates, the choice is impossible, and there are no other obstacles. Finding a system of distinct representatives is exactly the matching problem, and Kuhn's algorithm solves it.

**Definitions**:
- Family of subsets: $\mathcal{A} = (A_1, A_2, \dots, A_n)$, where $A_i$ is the set of acceptable options for the $i$-th object.
- System of distinct representatives (SDR, transversal): a set of elements $a_1, \dots, a_n$ such that $a_i \in A_i$ and all $a_i$ are pairwise distinct.
- Neighbourhood: $N(S) = \bigcup_{i \in S} A_i$ for $S \subseteq \{1, \dots, n\}$ (all elements that can represent the groups from $S$).
- Hall's condition: $\lvert N(S) \rvert \ge \lvert S \rvert$ for every subset of indices $S$.

**Theorems and formulas**:
- Hall's theorem (marriage theorem): an SDR exists if and only if for every $S$ the condition $\lvert N(S) \rvert \ge \lvert S \rvert$ holds.
- Necessity: the representatives of the groups from $S$ lie in $N(S)$ and are pairwise distinct, so the number of distinct elements in $N(S)$ is at least the number of groups in $S$.
- Sufficiency (sketch via matching): suppose that in the bipartite graph "groups versus elements" $M$ is a largest matching and the group $x$ is left unsaturated. Let $Z$ be the set of left vertices reachable from $x$ by alternating paths, and $W$ the set of right vertices on these paths. Every vertex of $W$ is saturated (otherwise an augmenting path would have been found), its partner lies in $Z$, and $x$ has no pair, hence $\lvert W \rvert \le \lvert Z \rvert - 1$. All neighbours of the vertices of $Z$ lie in $W$, that is, $N(Z) = W$, so $\lvert N(Z) \rvert \le \lvert Z \rvert - 1 < \lvert Z \rvert$: Hall's condition is violated. Consequently, when the condition holds there are no unsaturated groups and an SDR exists.
- Alternative sufficiency sketch (induction on $n$): if for some proper part $S$ the equality $\lvert N(S) \rvert = \lvert S \rvert$ holds, we choose an SDR inside $S$, delete $S$ and $N(S)$ and use the fact that Hall's condition is preserved for the remaining groups; if for all proper parts the inequality is strict, we take any element of $A_1$ as its representative and apply induction to the rest.
- Reduction to matching: the left vertices are the groups $A_i$, the right ones are the elements, an edge from $A_i$ to $u$ when $u \in A_i$. An SDR is a matching saturating all left vertices; we search for it with Kuhn's algorithm, and Hall's condition guarantees success.
- Corollary (k-regular case): if all $A_i$ have size $k$ and every element belongs to at most $k$ sets, then an SDR exists. Applications: schedules, allocation of requests, handing in assignments, construction of Latin squares.

**Example**: $A_1=\{1,2\}$, $A_2=\{1\}$, $A_3=\{2,3\}$, $A_4=\{3,4\}$. We check Hall's condition by the sizes of the subsets:

| $\lvert S \rvert$ | Minimum $\lvert N(S) \rvert$ | Conclusion |
|---|---|---|
| 1 | 1 (every $A_i$ is nonempty) | holds |
| 2 | 2 (for example, $A_1 \cup A_2 = \{1,2\}$) | holds |
| 3 | 3 (for example, $A_1 \cup A_2 \cup A_3 = \{1,2,3\}$) | holds |
| 4 | 4 (the whole union gives $\{1,2,3,4\}$) | holds |

Hall's condition holds, an SDR exists. Kuhn's algorithm finds it: $A_1$ takes 1; for $A_2$ the element 1 is taken, and $A_1$ moves to 2 (we get $A_1 \to 2$, $A_2 \to 1$); for $A_3$ the element 2 is taken, the chain does not go through, we take 3; for $A_4$ the element 3 is taken, the chain does not go through, we take 4. Result: $A_1 \to 2$, $A_2 \to 1$, $A_3 \to 3$, $A_4 \to 4$.

Counterexample: replace $A_4$ by $\{3\}$. Now the condition is violated only by the full set: the union of all four sets equals $\{1,2,3\}$, that is, $\lvert N(S) \rvert = 3 < 4 = \lvert S \rvert$ (all proper subsets satisfy the condition, so the full set must be checked as well). Kuhn's algorithm also fails to find an SDR: while processing $A_4$ the chain $A_4 \to 3 \to A_3 \to 2 \to A_1 \to 1 \to A_2$ hits a dead end, $A_4$ is left without a representative, the size of the matching is 3. Exhaustive search confirms: there is no SDR.

**What the examiner may ask**:
- **State Hall's theorem.** An SDR exists if and only if $\lvert N(S) \rvert \ge \lvert S \rvert$ for all $S$.
- **Prove necessity.** The representatives of the groups from $S$ are distinct and lie in $N(S)$, so $N(S)$ contains at least as many elements as there are groups.
- **How is sufficiency proved?** By contradiction via the largest matching: an unsaturated group generates a set of reachable vertices $Z$ with $\lvert N(Z) \rvert \le \lvert Z \rvert - 1$, that is, a violation of Hall's condition.
- **How to find an SDR in practice?** Reduce to a bipartite graph and apply Kuhn's algorithm (or a flow with unit capacities).
- **Is it enough to check the sizes of the sets and the pairs?** No, the counterexample above violates the condition only for the full set.

## Cheat sheet

- Network: a digraph with a source $s$, a sink $t$, capacities $c(u,v) \ge 0$.
- Flow: $f(u,v) = -f(v,u)$, $0 \le f(u,v) \le c(u,v)$, conservation at intermediate vertices; value $\lvert f \rvert = \sum_v f(s,v)$.
- Cut: $V = S \sqcup T$, $s \in S$, $t \in T$; $c(S,T) = \sum_{S \to T} c$; lemma $f(S,T) = \lvert f \rvert$; corollary $\lvert f \rvert \le c(S,T)$.
- Ford-Fulkerson theorem: $\max \lvert f \rvert = \min c(S,T)$. Key: $S$ is the set reachable from $s$ in the residual network, then $c(S,T) = \lvert f \rvert$.
- Residual network: $c_f(u,v) = c(u,v) - f(u,v)$ plus the backward arc $c_f(v,u) = f(u,v)$; an augmenting path increases the flow by $\delta$.
- Ford-Fulkerson: while there is a path from $s$ to $t$ in the residual network, increase the flow by $\delta$; for integer $c$ the maximum is integer; the BFS variant (Edmonds-Karp) is $O(VE^2)$.
- Block example: a network of 4 vertices, maximum flow 7, minimum cut $\{s,a,b\} \mid \{t\}$ of capacity $3+4=7$.
- Minimum spanning tree: a tree on all $n$ vertices made of $n-1$ edges of minimum total weight.
- Cut property: the minimum edge across a cut is safe; cycle property: the heaviest edge of a cycle belongs to no minimum spanning tree.
- Prim: grow a tree from a vertex, each time the minimum edge going out; $O(n^2)$ or $O(m \log n)$.
- Kruskal: sort the edges by weight, take an edge if it does not close a cycle (DSU); $O(m \log m)$.
- Block example: both algorithms gave weight 39 (edges 14, 35, 46, 12, 25, 57).
- Dijkstra: shortest paths from one vertex with weights $w \ge 0$; step: fix the unprocessed vertex with the minimum label, relax $d[v] = \min(d[v], d[u] + w)$.
- Dijkstra's complexity: $O(n^2)$ with an array of labels or $O(m \log n)$ with a heap; the path is reconstructed from the predecessors $prev$.
- Negative weights break Dijkstra: $s \to a$ (2), $s \to b$ (5), $b \to a$ ($-10$): the algorithm gives 2 instead of $-5$.
- Floyd-Warshall: $D^k[i][j]$ with intermediate vertices from $\{1,\dots,k\}$; $D^k[i][j] = \min(D^{k-1}[i][j],\ D^{k-1}[i][k] + D^{k-1}[k][j])$; $O(n^3)$, memory $O(n^2)$.
- Negative cycle in Floyd: after the run $D[i][i] < 0$; the transitive closure is the Boolean version (Warshall).
- Path reconstruction in Floyd: the array $nxt$; on an improvement through $k$ set $nxt[i][j] = nxt[i][k]$.
- Bipartite graph: vertices split into parts, edges only between the parts; equivalent to the absence of odd cycles and to a 2-colouring (BFS).
- Matching: edges without common endpoints; maximum (largest) and perfect.
- Berge's theorem: $M$ is maximum $\iff$ there is no augmenting alternating chain.
- Kuhn: for every left vertex a DFS over alternating paths with a $used$ array; complexity $O(\lvert L \rvert \cdot \lvert E \rvert)$.
- SDR: $a_i \in A_i$, all $a_i$ distinct; Hall's theorem: $\lvert N(S) \rvert \ge \lvert S \rvert$ for all $S$; reduction to matching, search by Kuhn's algorithm.
- A violation of Hall's condition is equivalent to an unsaturated group: for the set $Z$ of left vertices reachable by alternating paths, $\lvert N(Z) \rvert < \lvert Z \rvert$.
