# Block 4. Boolean functions: basic notions, Zhegalkin, completeness, Post's theorem

## Question 17. Boolean functions, essential and dummy variables, the number of Boolean functions of n variables. Simplest (basic) identities.

**In plain words**: a Boolean function of $n$ variables is a rule that takes $n$ bits as input and outputs one bit. The rule is completely determined by a table of $2^n$ rows, that is, by a bit mask of length $2^n$. This is exactly what the script in a reverse task does: it pushes the input bytes through a "check" and records the outputs, that is, it recovers a Boolean function from its values.

**Definitions**:
- $B=\{0,1\}$; a Boolean function of $n$ variables is a map $f\colon B^n\to B$, where $B^n$ is the set of tuples (vectors) $\alpha=(\alpha_1,\dots,\alpha_n)$ of length $n$, $2^n$ tuples in total. All functions of $n$ variables form the set $P_2(n)$, and all Boolean functions together form $P_2$.
- Truth table: columns of variables and a column of values of $f$, one row per tuple. Tuples are conventionally written in lexicographic order ($x_1$ is the most significant bit). Then the table is equivalent to a vector (mask) of $2^n$ bits.
- A variable $x_i$ is called essential for $f$ if there are two tuples differing only in position $i$ on which the values differ: $f(\dots,0,\dots)\ne f(\dots,1,\dots)$. If there is no such pair, the variable is dummy (the function does not essentially depend on it).
- Elementary functions: the constants $0$ and $1$, the identity $x$, negation $\bar x$, conjunction $x\wedge y$, disjunction $x\vee y$, implication $x\to y$, addition modulo 2 $x\oplus y$, equivalence $x\sim y$, Sheffer stroke $x|y$, Peirce arrow $x\downarrow y$.
- A function can be defined by a table, a formula, a PDNF, a PCNF, a Zhegalkin polynomial or a circuit. The table definition is unique, while there are infinitely many analytic representations of a single function.

**Theorems and formulas**:
- The number of functions of $n$ variables: $$|P_2(n)|=2^{2^n}.$$ Proof: the table consists of $2^n$ independent values, each of them $0$ or $1$, hence there are exactly $2\cdot2\cdots2$ different tables ($2^n$ factors), that is $2^{2^n}$.
- Values: $2$ for $n=0$ (these are the constants $0$ and $1$), $4$ for $n=1$, $16$ for $n=2$, $256$ for $n=3$, $65536$ for $n=4$.
- All $16$ functions of two variables are exactly the $16$ vectors of length $4$, so it is convenient to list them as four-bit masks.
- A variable is dummy if and only if the value does not change inside each pair of rows differing only in that variable. A dummy variable can be dropped, and the result is a function of fewer variables with the same "essence".
- For reference: there are exactly $218$ functions of three variables in which all three variables are essential (a useful check of understanding of the definition).

**Example**: $f(x_1,x_2,x_3)=x_1\wedge(x_2\vee x_3)$. In lexicographic order the table is: $000\to0$, $001\to0$, $010\to0$, $011\to0$, $100\to0$, $101\to1$, $110\to1$, $111\to1$. All three variables are essential. In $x_2$ we take the rows $101$ and $111$: the values $1$ and $1$ coincide, but the rows $100$ and $110$ give $0$ and $1$, so there is a difference. For comparison, for $g(x_1,x_2,x_3)=x_1\oplus x_2$ the variable $x_3$ is dummy: the row pairs $000$ and $001$, $010$ and $011$, $100$ and $101$, $110$ and $111$ give equal values.

**What the examiner may ask**:
- How many functions of 3 variables, and of 4? $2^{2^3}=256$ and $2^{2^4}=65536$.
- How to find dummy variables from the table? Compare the values on pairs of tuples differing only in that variable; if they are equal in all pairs, the variable is dummy.
- Can a function be defined without a table? Yes, by a formula, a PDNF, a Zhegalkin polynomial; the table defines the function uniquely, while it has many formulas.

## Question 18. Representing a Boolean function by a Zhegalkin polynomial. Fast Möbius transform for constructing a Zhegalkin polynomial. Example.

**In plain words**: a formula is an expression built from variables and elementary functions, that is, a record of a superposition. Two formulas are equivalent if they have the same truth table, and identities are rewriting rules that preserve the table. In CTF this is the job of a decompiler and a symbolic simplifier: it rewrites the check condition until it exposes an XOR mask or a byte comparison, and SAT solvers and z3 first reduce a condition to CNF using exactly these laws.

**Definitions**:
- A formula over a set of functions $F$ is defined inductively: 1) every variable $x_i$ and every constant is a formula; 2) if $F_1,\dots,F_k$ are formulas and $f\in F$ is a function of $k$ variables, then $f(F_1,\dots,F_k)$ is also a formula.
- A formula realizes a function: we substitute all tuples of variable values and compute the value from the tables of the functions from $F$. Every formula realizes exactly one function (possibly with dummy variables).
- Formulas $F$ and $G$ are equivalent ($F\equiv G$) if they realize the same function.
- Substitution (superposition of formulas): a formula is substituted for a variable. Equivalence is preserved under substitution (this is exactly why it is correct).
- A function is realized by a formula over $F$ if and only if it lies in the closure $[F]$ (question 21).

**Theorems and formulas**: the complete list of the simplest identities.
- Idempotence: $x\vee x=x$, $x\wedge x=x$.
- Commutativity: $x\vee y=y\vee x$, $x\wedge y=y\wedge x$, $x\oplus y=y\oplus x$.
- Associativity: $(x\vee y)\vee z=x\vee(y\vee z)$, $(x\wedge y)\wedge z=x\wedge(y\wedge z)$, $(x\oplus y)\oplus z=x\oplus(y\oplus z)$.
- Distributivity: $x\wedge(y\vee z)=(x\wedge y)\vee(x\wedge z)$, $x\vee(y\wedge z)=(x\vee y)\wedge(x\vee z)$.
- De Morgan's laws: $\overline{x\vee y}=\bar x\wedge\bar y$, $\overline{x\wedge y}=\bar x\vee\bar y$.
- Absorption: $x\vee(x\wedge y)=x$, $x\wedge(x\vee y)=x$.
- Gluing: $(x\wedge y)\vee(x\wedge\bar y)=x$, $(x\vee y)\wedge(x\vee\bar y)=x$.
- Properties of $0$ and $1$: $x\vee0=x$, $x\vee1=1$, $x\wedge0=0$, $x\wedge1=x$, $x\oplus0=x$, $x\oplus1=\bar x$, $x\oplus x=0$.
- Complement: $x\vee\bar x=1$, $x\wedge\bar x=0$, $\overline{\bar x}=x$.
- Expressing some functions in terms of others: $x\to y=\bar x\vee y$, $x\sim y=\overline{x\oplus y}$, $x\oplus y=(x\wedge\bar y)\vee(\bar x\wedge y)=(x\vee y)\wedge(\bar x\vee\bar y)$, $x\vee y=x\oplus y\oplus(x\wedge y)$, $\bar x=x\oplus1$, $x\wedge y=\overline{\bar x\vee\bar y}$.
- The duality principle: if in an identity we swap $\vee\leftrightarrow\wedge$ and $0\leftrightarrow1$, we again get an identity. The dual function: $f^*(\alpha_1,\dots,\alpha_n)=\overline{f(\bar\alpha_1,\dots,\bar\alpha_n)}$.
- Ways to prove identities: truth tables (we compare the columns of both sides on all $2^n$ tuples) and equivalent transformations (reducing both sides to the same PDNF, which is unique).

**Example**: let us prove by a table that $x\vee y=x\oplus y\oplus(x\wedge y)$. On the tuples $(0,0),(0,1),(1,0),(1,1)$ the left side gives $0,1,1,1$; the right side gives $0\oplus0\oplus0=0$, $0\oplus1\oplus0=1$, $1\oplus0\oplus0=1$, $1\oplus1\oplus1=1$. The columns coincide. From this we immediately get the implication: $x\to y=\bar x\vee y=(1\oplus x)\oplus y\oplus(1\oplus x)y=1\oplus x\oplus(x\wedge y)$, because $(1\oplus x)y=y\oplus(x\wedge y)$ and the two terms $y$ cancel.

**What the examiner may ask**:
- Prove De Morgan's laws. On the tuples $(0,0),(0,1),(1,0),(1,1)$: $\overline{x\vee y}$ gives $1,0,0,0$ and $\bar x\wedge\bar y$ gives $1,0,0,0$, the columns coincide.
- How many functions of two variables are there and how is this related to the number of formulas? There are $16$ functions, there are infinitely many formulas, and equivalence partitions all formulas into $16$ classes.
- How to express implication and XOR via $\wedge,\vee,\neg$? $x\to y=\bar x\vee y$, $x\oplus y=(x\wedge\bar y)\vee(\bar x\wedge y)$.
- Why are identities needed? They are the rules of equivalent transformations: with them one simplifies formulas and proves equalities without a full enumeration of tables.

## Question 19. Disjunctive (conjunctive) expansion of Boolean functions in a set of variables. PDNF (PCNF).

**In plain words**: a Zhegalkin polynomial is a representation of a function as a modulo 2 sum of products (monomials) of variables without negations, that is, an algebraic normal form (ANF). For CTF it is a working tool: functions linear over Zhegalkin break instantly (cryptanalysis of LFSR and linear filters), and a monomial of high degree means genuine nonlinearity; besides, any XOR chains are naturally built in exactly this basis.

**Definitions**:
- Zhegalkin polynomial of a function $f$ of $n$ variables: $$f(x_1,\dots,x_n)=\bigoplus_{S\subseteq\{1,\dots,n\}} c_S\prod_{i\in S}x_i,\qquad c_S\in\{0,1\}.$$ Monomials are conjunctions of variables, $2^n$ coefficients in total, including the free term $c_\emptyset$.
- Degree of the polynomial: the greatest length of a monomial with a nonzero coefficient.
- Class of linear functions $L$: the polynomial has degree at most $1$, that is, $f=c_0\oplus c_1x_1\oplus\dots\oplus c_nx_n$.

**Theorems and formulas**:
- Theorem (existence and uniqueness): every Boolean function has exactly one Zhegalkin polynomial.
- Skeleton of the proof: 1) there are exactly $2^{2^n}$ different polynomials of $n$ variables, because the $2^n$ coefficients are chosen independently; 2) every function is representable: induction on $n$, expansion in the last variable gives $f=\bar x_n f_0\oplus x_n f_1$, where $f_0=f(x_1,\dots,x_{n-1},0)$ and $f_1=f(x_1,\dots,x_{n-1},1)$, and after the substitution $\bar x_n=1\oplus x_n$ we get $f=f_0\oplus x_n(f_0\oplus f_1)$, where $f_0$ and $f_1$ are polynomials by induction; 3) the map sending a function to its polynomial is surjective, and the cardinalities of both sets coincide and equal $2^{2^n}$, hence it is bijective and the polynomial is unique.
- Corollary: two polynomials define the same function if and only if all their coefficients coincide.
- Inversion formula (Möbius): the coefficient of the monomial consisting of the variables of a set $S$ equals $$c_S=\bigoplus_{T\subseteq S} f(T),$$ where $f(T)$ is the value of $f$ on the tuple in which the ones stand exactly in the positions from $T$.
- Method 1 (from the PDNF): replace $\bar x_i$ by $x_i\oplus1$, get rid of $\vee$ via $x\vee y=x\oplus y\oplus(x\wedge y)$, expand the brackets and collect like terms (identical monomials cancel in pairs).
- Method 2 (undetermined coefficients): substitute the tuples in order of increasing number of ones, starting from the zero tuple; at each step $c_S=f(S)\oplus\bigoplus_{T\subsetneq S} c_T$, where the coefficients on the right have already been found. The tabular form of this process is called the triangle (successive addition modulo 2 of neighbouring rows).
- Method 3 (fast Möbius transform, butterfly algorithm): for each variable in turn (in the lexicographic order of variables these are $x_n,x_{n-1},\dots,x_1$) we split the table into pairs of rows differing only in that variable and add modulo 2 the upper row of the pair (where the variable equals 0) to the lower one. Complexity $n2^n$ instead of enumerating subsets.
- Properties: $\deg f\le n$; the number of linear functions of $n$ variables equals $2^{n+1}$; monomials of length $1$ are variables, a monomial of length $0$ is the free term.

**Example**: $f=x_1\to x_2x_3$, the table in lexicographic order is $1111\,0001$ (that is, the rows $000,001,010,011,100,101,110,111$ give $1,1,1,1,0,0,0,1$). The step over $x_3$ gives $1010\,0001$, the step over $x_2$ gives $1000\,0001$, the step over $x_1$ gives $1000\,1001$. We read the coefficients: a one stands on the tuple $000$, this is the free term; on the tuple $100$ (that is, $x_1$); on the tuple $111$ (the monomial $x_1x_2x_3$). Hence $$f=1\oplus x_1\oplus x_1x_2x_3.$$ Check on the tuple $110$: the right side gives $1\oplus1\oplus0=0$, and $f(110)=1\to0=0$. Two more useful examples: $x_1\vee x_2=x_1\oplus x_2\oplus x_1x_2$ and the majority function $x_1x_2\vee x_1x_3\vee x_2x_3=x_1x_2\oplus x_1x_3\oplus x_2x_3$ (the cubic monomial cancelled).

**What the examiner may ask**:
- How many coefficients does a polynomial of $n$ variables have and why? $2^n$, one per subset of the set of variables.
- How to test linearity from the table? The polynomial must have degree at most $1$; equivalently $f(u\oplus v)=f(u)\oplus f(v)\oplus f(0)$ for all tuples $u,v$, equivalently there are no monomials of length at least $2$ in the ANF.
- Why is the polynomial unique? There are exactly as many polynomials as functions, and every function is representable.
- How to construct the polynomial? From the PDNF, by the method of undetermined coefficients (the triangle) or by the Möbius transform (butterfly).

## Question 20. Formulas. Realization of functions by formulas.

**In plain words**: expansion in a variable is case analysis: if $x=0$, one subfunction works, if $x=1$, the other one. If we expand in all variables, the truth table turns into a formula: the PDNF lists the rows with a one, the PCNF the rows with a zero. In CTF this is a direct link to SAT: the conjunctions of rows with a one are what is fed to a solver or z3, and CNF is its standard input format.

**Definitions**:
- Literal notation: $x^1=x$, $x^0=\bar x$.
- Expansion in a set of variables (Shannon expansion): $$f(x_1,\dots,x_n)=\bigvee_{(\sigma_1,\dots,\sigma_k)} x_1^{\sigma_1}\cdots x_k^{\sigma_k}\,f(\sigma_1,\dots,\sigma_k,x_{k+1},\dots,x_n),$$ the disjunction is taken over all $2^k$ tuples $(\sigma_1,\dots,\sigma_k)$.
- DNF: a disjunction of conjunctive terms (implicants). CNF: a conjunction of disjunctive terms.
- PDNF: a DNF in which every conjunct contains all $n$ variables (each exactly once, plain or negated) and corresponds to a row of the table with value $1$. The PCNF is defined dually, over the rows with value $0$.
- The number of terms of the PDNF equals the number of ones in the table; for $f\equiv0$ the PDNF is empty (there is not a single term).

**Theorems and formulas**:
- Expansion theorem. Proof: fix $x_1=\tau_1,\dots,x_k=\tau_k$. On the right side all terms except one (with $\sigma=\tau$) turn into $0$, because they contain the factor $\tau_i^{\sigma_i}=0$; the remaining term equals $f(\tau_1,\dots,\tau_k,x_{k+1},\dots,x_n)$. Hence the right side as a function coincides with the left side.
- For $k=1$: $f=\bar x_i\,f|_{x_i=0}\vee x_i\,f|_{x_i=1}$ (the Shannon expansion proper).
- For $k=n$ we get the PDNF: $$f=\bigvee_{\sigma:\,f(\sigma)=1}\ \bigwedge_{i=1}^{n} x_i^{\sigma_i}.$$
- The dual (conjunctive) form for $k=n$ gives the PCNF: $$f=\bigwedge_{\sigma:\,f(\sigma)=0}\ \bigvee_{i=1}^{n} x_i^{\bar\sigma_i}.$$
- Uniqueness: the PDNF is unique up to the order of terms and factors, because every conjunct of the PDNF equals $1$ on exactly one tuple (its own), so the set of conjuncts is exactly the set of rows with value $1$. Similarly, the PCNF is unique for functions not identically equal to one.
- Remark: the PDNF is not minimal in the number of terms; there exist the abbreviated DNF and minimal DNFs, and they, unlike the PDNF, are not unique.

**Example**: $f=x_1x_2\vee x_3$, the table in lexicographic order: $000\to0$, $001\to1$, $010\to0$, $011\to1$, $100\to0$, $101\to1$, $110\to1$, $111\to1$. The ones stand on the tuples $001,011,101,110,111$, so the PDNF is: $$\bar x_1\bar x_2x_3\vee\bar x_1x_2x_3\vee x_1\bar x_2x_3\vee x_1x_2\bar x_3\vee x_1x_2x_3.$$ The zeros stand on the tuples $000,010,100$, so the PCNF is: $$(x_1\vee x_2\vee x_3)\wedge(x_1\vee\bar x_2\vee x_3)\wedge(\bar x_1\vee x_2\vee x_3).$$ Both forms reproduce the table (verified by substituting all eight tuples).

**What the examiner may ask**:
- What is the maximum number of terms in a PDNF and when is the PDNF empty? At most $2^n$ terms; empty for $f\equiv0$.
- How to construct the PCNF from the table? Take the rows with value $0$; for a row with value $\sigma$ write a disjunction in which for $\sigma_i=0$ there stands $x_i$ and for $\sigma_i=1$ there stands $\bar x_i$; join the disjuncts with $\wedge$.
- Why is the PDNF unique? Every conjunct of it singles out exactly one tuple, so it encodes the table losslessly.
- Why is expansion in $k$ variables needed if the PDNF exists? It is a tool: expansion in one variable gives the induction in the proof of existence of the Zhegalkin polynomial and a multiplexer realization.

## Question 21. Superpositions of Boolean functions. Closed classes of Boolean functions.

**In plain words**: a superposition is the substitution of some functions into others, and the closure $[F]$ is everything that can be assembled from a set $F$ by formulas. A closed class is a "world" from which superpositions cannot lead out. In CTF logic this is the question of a set of primitives: if any function can be assembled from the instructions, the set is complete, and the closure is the set of all programs that can be written on this set at all.

**Definitions**:
- Superposition: the function $f(g_1(\dots),\dots,g_k(\dots))$, that is, the substitution of functions $g_i$ in place of the arguments of $f$ (identification of variables and addition of dummy variables are allowed).
- Closure $[F]$: the set of all functions realizable by formulas over $F$, that is, all superpositions of functions from $F$. An equivalent definition: $[F]$ is the inclusion-smallest closed class containing $F$.
- Closed class: a class $K$ with the condition $[K]=K$, that is, any superposition of functions from $K$ again lies in $K$.
- Properties of the closure (closure operator): $F\subseteq[F]$; $[[F]]=[F]$; if $F\subseteq G$, then $[F]\subseteq[G]$.
- A system $F$ is complete if $[F]=P_2$ (questions 22 and 23).

**Theorems and formulas**:
- The closure is always closed. Proof: a formula over formulas over $F$ is itself a formula over $F$, so repeated closure adds nothing.
- Examples of closures: $[\{\wedge,\vee,\neg\}]=P_2$; $[\{\wedge,\vee\}]=[\{0,1,\wedge,\vee\}]=M$ (monotone functions); $[\{\oplus,1\}]=L$ (linear); $[\{\wedge,\oplus,1\}]=P_2$; $[\{\neg\}]=\{x,\bar x\}$; $[\{\to\}]$ consists of the functions expressible through implication alone, and is not complete, because $\to$ preserves one; $[T_0]=T_0$, $[S]=S$, $[L]=L$ (the classes from question 22 are closed).
- Why $[\{\wedge,\vee\}]=M$: in one direction $\wedge$ and $\vee$ are monotone, and a superposition of monotone functions is monotone; in the other direction a monotone function has a PDNF without negations (if the PDNF of a monotone function contains the literal $\bar x_i$, then flipping $x_i$ from $0$ to $1$ makes the value drop), and such a PDNF is assembled only from conjunctions and disjunctions.
- Why $[\{\oplus,1\}]=L$: both functions are linear (the degree of the Zhegalkin polynomial is at most $1$), and a superposition of linear functions is linear; conversely, a linear function is written as $c_0\oplus c_{i_1}x_{i_1}\oplus\dots\oplus c_{i_k}x_{i_k}$, where negation is $x\oplus1$.
- There are infinitely many closed classes (they form the Post lattice), but there are exactly five precomplete (maximal) ones (question 22).

**Example**: let us find $[\{x\oplus y\}]$. Identifying variables, we get $x\oplus x=0$, that is, the constant $0$. Any formula over $\oplus$ is a modulo 2 sum of several occurrences of variables, and identical occurrences cancel in pairs. Hence $[\{x\oplus y\}]=\{\bigoplus_{i\in S}x_i\}$, that is, these are exactly the linear functions without a free term (the $0$ itself is obtained as the sum over the empty set).

**What the examiner may ask**:
- Give two definitions of the closure and explain why they are equivalent. The set of all superpositions is closed and is contained in every closed class containing $F$, hence it is the smallest one.
- Is the class of monotone functions closed? Yes: a superposition of monotone functions is monotone.
- Is the system $\{x\to y\}$ complete? No, all its superpositions lie in $T_1$, because $1\to1=1$.
- Give a closure that coincides neither with $P_2$ nor with the five precomplete classes. For example $[\{\neg\}]=\{x,\bar x\}$.

## Question 22. Complete and precomplete classes of Boolean functions.

**In plain words**: a complete system is a set of functions such that any Boolean function can be assembled by formulas over it. The five classes $T_0,T_1,S,M,L$ are five "almost complete" worlds: each is closed and not complete, but adding any outside function makes it complete. Therefore testing completeness reduces to checking that the set does not lie entirely in any of the five classes (this is Post's criterion from question 23). In CTF this is a check that the available set of operations (gates, gadgets) is enough to express an arbitrary bit function.

**Definitions**:
- A system (set) of functions $F$ is complete if $[F]=P_2$, that is, every Boolean function is realizable by a formula over $F$.
- $$T_0=\{f: f(0,\dots,0)=0\}$$ (functions preserving zero), $$T_1=\{f: f(1,\dots,1)=1\}$$ (preserving one).
- $$S=\{f: f(\bar x_1,\dots,\bar x_n)=\overline{f(x_1,\dots,x_n)}\ \text{for all tuples}\}$$ (self-dual: on opposite tuples the values are opposite).
- $$M=\{f: \alpha\le\beta\ \Rightarrow\ f(\alpha)\le f(\beta)\},$$ where $\le$ is the coordinatewise order on tuples, that is, $\alpha_i\le\beta_i$ for all $i$ (monotone functions).
- $$L=\{f: f=c_0\oplus c_1x_1\oplus\dots\oplus c_nx_n\}$$ (linear functions, the degree of the Zhegalkin polynomial is at most $1$).
- A class $K$ is called precomplete (maximal) if $K$ is closed, $K\ne P_2$ and $[K\cup\{f\}]=P_2$ for every function $f\notin K$.

**Theorems and formulas**:
- All five classes are closed (a superposition does not lead out of the class) and pairwise incomparable: for every pair of classes there is a function that lies in one and does not lie in the other.
- Cardinalities: $|T_0^{(n)}|=|T_1^{(n)}|=2^{2^n-1}$, $|S^{(n)}|=2^{2^{n-1}}$, $|L^{(n)}|=2^{n+1}$, while $|M^{(n)}|$ are the Dedekind numbers: $2,3,6,20,168$ for $n=0,1,2,3,4$.
- Precompleteness of $T_0$. Let $f\notin T_0$, that is, $f(0,\dots,0)=1$, and $\phi(x)=f(x,\dots,x)$, then $\phi(0)=1$. If $\phi(1)=0$, then $\phi=\bar x$, and together with $\wedge\in T_0$ we get a complete system, since $\{\bar x,\wedge\}$ is complete. If $\phi(1)=1$, then $\phi\equiv1$ and we have the constant $1$; but $0\in T_0$ and $x\oplus y\in T_0$, so $\bar x=1\oplus x$ is expressible, and again $\{\bar x,\wedge\}\subseteq[T_0\cup\{f\}]$.
- Precompleteness of $M$. Let $f\notin M$: there are $\alpha\le\beta$ with $f(\alpha)=1$ and $f(\beta)=0$. Substitute into $f$: where $\alpha_i=\beta_i=0$ we take the constant $0$, where $\alpha_i=\beta_i=1$ we take the constant $1$, and on the differing coordinates one variable $x$. We get $h(x)$ with $h(0)=f(\alpha)=1$ and $h(1)=f(\beta)=0$, that is, $h=\bar x$. Since $0,1,\wedge,\vee\in M$, we get $\{\bar x,\wedge\}$ and completeness.
- Precompleteness of $L$. Let $f\notin L$, then its Zhegalkin polynomial has a monomial of length $k\ge2$; choose a monomial of minimal length. Set the variables outside the monomial to $0$, and inside the monomial keep two variables $x_i,x_j$, setting the rest to $1$. All monomials that contained variables outside the chosen one vanish, and of the remaining ones only the chosen one survives: any other monomial of the same letters would have length less than $k$, and there are none by minimality. The result is a function $x_ix_j\oplus c_1x_i\oplus c_2x_j\oplus c_0$, and in all eight cases a conjunction is derived from $0,1,\bar x\in L$: $xy$ directly; $xy\oplus x=x\bar y$ after the substitution $y:=\bar y$; $xy\oplus y$ after $x:=\bar x$; $xy\oplus1$ after double negation; $xy\oplus x\oplus y=x\vee y$ after $\overline{\bar x\vee\bar y}$; $xy\oplus x\oplus1=\bar x\vee y$ after $y:=\bar y$ and negation; $xy\oplus y\oplus1=x\vee\bar y$ similarly; $xy\oplus x\oplus y\oplus1=\bar x\bar y$ after substituting negations for both variables. Hence $\wedge\in[L\cup\{f\}]$, and with $\bar x\in L$ we get completeness.
- Precompleteness of $T_1$ is obtained from the precompleteness of $T_0$ by the duality principle (replacing functions by their duals swaps the roles of $0$ and $1$, and of $\wedge$ and $\vee$).
- Precompleteness of $S$. Let $f\notin S$: there is a tuple $\alpha$ with $f(\alpha)=f(\bar\alpha)$. Substitute $\psi_i(x)=x$ for $\alpha_i=1$ and $\psi_i(x)=\bar x$ for $\alpha_i=0$ (the function $\bar x$ is self-dual and lies in $S$). Then the value at $x=0$ equals $f(\bar\alpha)=f(\alpha)$, the value at $x=1$ equals $f(\alpha)$, that is, a constant is obtained. Further, the majority function $x_1x_2\vee x_1x_3\vee x_2x_3$ is self-dual and lies in $S$, and $m(x,y,0)=x\wedge y$; together with $\bar x\in S$ this gives $\{\bar x,\wedge\}$ and completeness.
- Completeness of the list: if a closed class $K\ne P_2$ is maximal, then it is not complete, hence by Post's criterion it is contained in one of the five classes, and by maximality it coincides with it. Therefore there are exactly five precomplete classes.
- Table of membership of the basic functions:

| $f$ | $T_0$ | $T_1$ | $S$ | $M$ | $L$ |
|---|---|---|---|---|---|
| $0$ | + | | | + | + |
| $1$ | | + | | + | + |
| $x$ | + | + | + | + | + |
| $\bar x$ | | | + | | + |
| $x\wedge y$ | + | + | | + | |
| $x\vee y$ | + | + | | + | |
| $x\to y$ | | + | | | |
| $x\oplus y$ | + | | | | + |
| $x\sim y$ | | + | | | + |
| $x|y$ | | | | | |
| $x\downarrow y$ | | | | | |
| $x_1x_2\vee x_1x_3\vee x_2x_3$ | + | + | + | + | |
| $x_1\oplus x_2\oplus x_3$ | + | + | + | | + |

**Example**: let us test the completeness of $\{\wedge,\oplus,1\}$ against the table: $1$ does not preserve $0$; $\oplus$ does not preserve $1$ (since $1\oplus1=0$); $1$ is not self-dual (constants are not self-dual); $\oplus$ is non-monotone; $\wedge$ is nonlinear. Every column has a minus, the system is complete. And conversely, $\{\wedge,\vee\}$ is not complete: both functions lie in $T_0$, in $T_1$ and in $M$. A useful trap: the implication $x\to y$ is NOT monotone (it is antitone in the first argument: $f(0,0)=1$, while $f(1,0)=0$, although $(0,0)\le(1,0)$), so $\{x\to y\}$ lies only in $T_1$.

**What the examiner may ask**:
- Give the definitions of the five classes and explain why they are closed. Closure is checked directly: monotonicity, self-duality, linearity and preservation of a constant are inherited by superposition.
- Prove the precompleteness of $M$ (or $L$, or $T_0$). See the skeletons above: incompleteness yields a "bad" pair of tuples or a monomial, from which the substitution of constants produces $\bar x$ or $\wedge$.
- Why does implication not lie in $M$? Because $x\to y=\bar x\vee y$ decreases as $x$ grows.
- How many functions are there in each class of $n$ variables? $2^{2^n-1}$, $2^{2^n-1}$, $2^{2^{n-1}}$, the Dedekind number, $2^{n+1}$ respectively.

## Question 23. Post's theorem on functional completeness.

**In plain words**: this is the only practical completeness test: we draw a table of five columns ($T_0,T_1,S,M,L$), mark which functions fall where, and check whether every column has at least one minus. If so, the system is complete. In CTF thinking this is a way to find out whether a set of primitives is enough to express an arbitrary function without building it by hand.

**Definitions**: the five classes from question 22 (reminder); a system is complete if its closure equals $P_2$; a system is not complete if its closure does not contain some function, and then by Post's criterion it lies entirely in one of the five classes.

**Theorems and formulas**:
- Theorem (Post's criterion): a system of Boolean functions $F$ is complete if and only if $F$ is not contained entirely in any of the classes $T_0,T_1,S,M,L$, that is, when $F$ contains $f_0\notin T_0$, $f_1\notin T_1$, $f_S\notin S$, $f_M\notin M$, $f_L\notin L$.
- Necessity: if $F\subseteq K$, where $K$ is one of the five classes, then any superposition of functions from $F$ again lies in $K$ (the classes are closed), hence $[F]\subseteq K\ne P_2$, and the system is not complete.
- Sufficiency, skeleton. 1) $g(x)=f_0(x,\dots,x)$: $g(0)=f_0(0,\dots,0)=1$; if $g(1)=0$, then $g=\bar x$, otherwise $g\equiv1$. Similarly $h(x)=f_1(x,\dots,x)$: $h(1)=0$; if $h(0)=1$, then $h=\bar x$, otherwise $h\equiv0$. Result: we have either $\bar x$ or both constants.
- 2) If we obtained only $\bar x$, take a non-self-dual $f_S$ and a tuple $\alpha$ with $f_S(\alpha)=f_S(\bar\alpha)$. Substitute $x$ in the positions of ones of the tuple $\alpha$ and $\bar x$ in the positions of zeros: we get a function of $x$ taking the same value at $x=0$ and $x=1$, that is, a constant. Negation gives the second constant. So we have $0$ and $1$.
- 3) From a non-monotone $f_M$: there are $\alpha\le\beta$ with $f_M(\alpha)=1$ and $f_M(\beta)=0$. Substituting constants on the coinciding coordinates and the variable $x$ on the differing ones, we get $\bar x$.
- 4) From a nonlinear $f_L$, by the scheme from question 22 we get the conjunction $\wedge$.
- 5) The system $\{\bar x,\wedge\}$ is complete: disjunction is expressed by De Morgan, and any function by its PDNF. Hence $[F]=P_2$.
- Application examples: $\{\wedge,\vee\}$ is not complete (both functions lie in $M$, and also in $T_0$ and $T_1$); $\{x\to y\}$ is not complete (it lies in $T_1$); $\{0,x\to y\}$ is complete ($0\notin T_1,S,M,L$, while $x\to y\notin T_0$); $\{\wedge,\oplus,1\}$ is complete; $\{x|y\}$ and $\{x\downarrow y\}$ are complete, since the Sheffer stroke and the Peirce arrow lie in none of the five classes.
- A test algorithm for a finite system: build the table "function vs class" and for each of the five classes find a witness function outside the class.

**Example**: let us test the system $F=\{x\to y,\ x\oplus y\}$ by the criterion. The function $x\to y$ does not lie in $T_0$ (since $0\to0=1$), is not self-dual (on the opposite tuples $(0,0)$ and $(1,1)$ it equals $1$, that is, the values are not opposite), is non-monotone ($f(0,0)=1>f(1,0)=0$) and is nonlinear (its Zhegalkin polynomial $1\oplus x\oplus(x\wedge y)$ contains a monomial of length $2$). The function $x\oplus y$ does not preserve one (since $1\oplus1=0$). Each of the five columns has a minus, so the system is complete: for example, $x\to x=1$ and $1\oplus x=\bar x$.

**What the examiner may ask**:
- State the criterion and prove necessity. Necessity is immediate: the classes are closed and do not coincide with $P_2$.
- Is $\{\wedge,\vee\}$ complete? No, both functions are monotone (and preserve both constants).
- Is $\{\wedge,\vee,\neg\}$ complete? Yes, this is the classical complete set.
- Is $\{0,1,\wedge,\oplus\}$ complete? Yes, it is complete, but not a basis: the constant $0$ is redundant, since $x\oplus x=0$.

## Question 24. The notion of a basis and an upper bound on the number of elements in any basis.

**In plain words**: a basis is a complete system without anything superfluous: remove any function, and completeness is lost. It is the analogue of a minimal set of instructions or a minimal set of gadgets: the simpler the set, the cheaper the synthesis. In CTF logic these are ready-made "alphabets" of computation: knowing that $\{x\wedge y,\ x\oplus y,\ 1\}$ carries everything, one can write any bit computations, and knowing that four functions suffice, it is clear that there is no need to look for more.

**Definitions**:
- A system $B$ is called a basis if it is complete and irredundant: $[B]=P_2$, but $[B\setminus\{f\}]\ne P_2$ for every $f\in B$.
- A basis can be extracted from any finite complete system: we throw out functions one by one while completeness is preserved.
- The functions of a basis may be assumed to have no dummy variables: if a function has a dummy variable, it is replaced by a function of fewer variables, and the extra variables are simply not used in formulas.

**Theorems and formulas**:
- Examples of bases: $\{\wedge,\neg\}$ and $\{\vee,\neg\}$ (the standard two-function set), $\{0,x\to y\}$, $\{x|y\}$ (Sheffer stroke), $\{x\downarrow y\}$ (Peirce arrow), $\{x\wedge y,\ x\oplus y,\ 1\}$ (the Zhegalkin basis), $\{0,\ x\wedge y,\ x\sim y\}$ (all functions of at most two variables), $\{0,1,\ x_1\oplus x_2\oplus x_3,\ x_1x_2x_3\}$ (a basis of four functions).
- Not bases: $\{\wedge,\vee\}$ (not complete, both functions are monotone); $\{\wedge,\vee,\neg\}$ (complete, but reducible: $\vee$ is removed by De Morgan); $\{0,1,\wedge,\oplus\}$ (complete, but $0$ is redundant: $x\oplus x=0$); $\{1,\wedge,\vee\}$ (not complete, everything is monotone); $\{\oplus,\neg\}$ (not complete, everything is linear).
- Estimating the number of functions in a basis, step 1: every function of a basis is essential. If $f$ is thrown out, the system $B\setminus\{f\}$ is not complete, hence by Post's criterion it is contained in some precomplete class, denote it $c_f$. The classes $c_f$ are pairwise distinct: if $c_f=c_g$ for $f\ne g$, then $f\in B\setminus\{g\}\subseteq c_g=c_f$, but $f\notin c_f$ (otherwise $B\subseteq c_f$ and the basis is not complete), a contradiction. There are only five classes, hence $|B|\le5$.
- Step 2 (exact bound): a five-element basis does not exist, that is, $|B|\le4$. If $|B|=5$, then the classes $c_f$ run through all five classes. Take a function $f$ with $c_f=T_0$. For any other $g$ we have $f\in B\setminus\{g\}\subseteq c_g$, hence $f$ lies at once in $T_1,S,M,L$. But the intersection $T_1\cap S\cap M\cap L$ consists exactly of the variables $\{x_1,\dots,x_n\}$: from $M\cap L$ it follows that the Zhegalkin polynomial has the form $0$, $1$ or $x_i$ (for a linear function $c_0\oplus\bigoplus_{i\in I}x_i$ with $|I|\ge2$ there is a neighbouring pair of tuples where monotonicity is violated), and self-duality excludes the constants. Every variable $x_i$ preserves zero, that is, lies in $T_0$. Contradiction with $f\notin T_0$.
- A refinement for functions of two variables: if all functions of a basis essentially depend on at most two variables (constants also count as functions of zero variables), then $|B|\le3$, an example being $\{0,\ x\wedge y,\ x\sim y\}$; a four-element basis necessarily contains a function with at least three essential variables. This was verified by a complete enumeration of all $22$ functions of at most two variables: there are no bases of four functions there, but there are of three.
- What was found in the sources: the statement "the maximum possible number of Boolean functions in a basis equals four" occurs in educational wiki-notes (ITMO University). The exact statement of the basis size bound from Gavrilov and Sapozhenko or from Yablonsky could not be confirmed from open sources, so in an exam it is safer to rely on the proof given above: it is short and fully verifiable.

**Example**: let us check that $B=\{0,\ 1,\ x_1\oplus x_2\oplus x_3,\ x_1x_2x_3\}$ is a basis. Completeness by Post's criterion: $1\notin T_0$ (since $1(0)=1$), $0\notin T_1$, $0\notin S$ (constants are not self-dual), $x_1\oplus x_2\oplus x_3\notin M$ (check: $x_1\oplus x_2\oplus x_3$ on the tuple $100$ gives $1$, and on the larger tuple $110$ gives $0$), $x_1x_2x_3\notin L$. Irredundancy: without $1$ only functions from $T_0$ remain, without $0$ only functions from $T_1$, without $x_1\oplus x_2\oplus x_3$ only monotone functions remain (superpositions of monotone functions are monotone), without $x_1x_2x_3$ only linear functions remain (check the $L$ column). Hence all four functions are needed.

**What the examiner may ask**:
- What is a basis and how does it differ from a complete system? A complete system may be reducible, a basis is a complete irredundant system.
- Is $\{\wedge,\vee,\neg\}$ a basis? No, it is reducible: $\vee$ is expressed via $\wedge$ and $\neg$ by De Morgan.
- How many functions can a basis contain? At most four, and four is attainable.
- Why does it make no sense to keep a function with a dummy variable in a basis? It can be replaced by a function of fewer variables, the extra variable does not participate in formulas.
- How to check that a system is a basis? Check completeness by Post's criterion, then for every proper subsystem (it is enough for each single thrown-out function) check incompleteness, for example by showing that the subsystem lies entirely in one of the five classes.

## Cheat sheet

1. Boolean function: $f\colon\{0,1\}^n\to\{0,1\}$, $|P_2(n)|=2^{2^n}$ (these are $2,4,16,256,65536$ for $n=0,1,2,3,4$).
2. A variable is dummy if the values coincide on all pairs of tuples differing only in it.
3. Ways of defining: table (unique), formula, PDNF, PCNF, Zhegalkin polynomial, circuit (not unique).
4. Identities: idempotence, commutativity, associativity, the two distributivity laws, De Morgan, absorption $x\vee xy=x$, gluing $xy\vee x\bar y=x$.
5. Constants: $x\vee0=x$, $x\wedge0=0$, $x\oplus0=x$, $x\vee1=1$, $x\wedge1=x$, $x\oplus1=\bar x$, $x\oplus x=0$, $x\vee\bar x=1$, $x\wedge\bar x=0$.
6. Relations: $x\to y=\bar x\vee y=1\oplus x\oplus xy$, $x\oplus y=x\bar y\vee\bar x y$, $x\vee y=x\oplus y\oplus xy$, $x\sim y=\overline{x\oplus y}$.
7. Zhegalkin polynomial: $f=\bigoplus_{S}c_S\prod_{i\in S}x_i$, exists and is unique, $2^n$ coefficients.
8. Möbius inversion: $c_S=\bigoplus_{T\subseteq S}f(T)$; computed fast by the butterfly algorithm in $n2^n$ (for each variable add the row with a zero to the row with a one).
9. Linearity: the degree of the polynomial is at most $1$, or $f(u\oplus v)=f(u)\oplus f(v)\oplus f(0)$; there are $2^{n+1}$ linear functions of $n$ variables.
10. Expansion in $k$ variables: $f=\bigvee_{\sigma}x_1^{\sigma_1}\cdots x_k^{\sigma_k}f(\sigma,x_{k+1},\dots,x_n)$, for $k=1$ this is the Shannon expansion.
11. PDNF: over the rows with a one, a conjunct contains all variables; unique; empty for $f\equiv0$.
12. PCNF: over the rows with a zero, a disjunct contains all variables with reversed literals; unique for $f\not\equiv1$.
13. Closure $[F]$ is all superpositions of functions from $F$; $[[F]]=[F]$; closed class: $[K]=K$; complete system: $[F]=P_2$.
14. Classes: $T_0$ (preserve $0$), $T_1$ (preserve $1$), $S$ (self-dual), $M$ (monotone), $L$ (linear).
15. Cardinalities: $|T_0|=|T_1|=2^{2^n-1}$, $|S|=2^{2^{n-1}}$, $|L|=2^{n+1}$, $|M|$ is $2,3,6,20,168$.
16. All five classes are closed, pairwise incomparable and precomplete: adding any outside function makes the class complete.
17. Post's criterion: $F$ is complete if and only if $F$ contains functions outside each of $T_0,T_1,S,M,L$.
18. Table: $0\in T_0ML$; $1\in T_1ML$; $x$ in all five; $\bar x\in SL$; $\wedge,\vee\in T_0T_1M$; $\to\in T_1$ (not monotone); $\oplus\in T_0L$; $\sim\in T_1L$; $|,\downarrow$ in none; the majority function $\in T_0T_1SM$; $x_1\oplus x_2\oplus x_3\in T_0T_1SL$.
19. Completeness: $\{\wedge,\vee,\neg\}$ yes; $\{\wedge,\vee\}$ no (in $M$); $\{\to\}$ no (in $T_1$); $\{0,\to\}$ yes; $\{\wedge,\oplus,1\}$ yes; $\{\neg,\oplus\}$ no (in $L$); $\{|,\downarrow\}$ yes.
20. A basis is a complete irredundant system; examples: $\{\wedge,\neg\}$, $\{\vee,\neg\}$, $\{0,\to\}$, $\{x|y\}$, $\{x\downarrow y\}$, $\{\wedge,\oplus,1\}$, $\{0,\wedge,\sim\}$, $\{0,1,x_1\oplus x_2\oplus x_3,x_1x_2x_3\}$.
21. Not bases: $\{\wedge,\vee,\neg\}$ (reducible), $\{0,1,\wedge,\oplus\}$ ($0$ is redundant), $\{1,\wedge,\vee\}$ (not complete).
22. Size bound: any basis contains at most four functions, and four is attainable.
23. Idea of the proof: without each function the basis lies in its own precomplete class $c_f$, the classes $c_f$ are pairwise distinct (otherwise a contradiction with $f\notin c_f$), hence $|B|\le5$; with five functions one would have $c_f=T_0$, but then it lies in $T_1\cap S\cap M\cap L=\{x_1,\dots,x_n\}\subseteq T_0$, a contradiction.
24. The intersection $T_1\cap S\cap M\cap L$ is exactly the variables: $x_1\oplus x_2\oplus x_3$ is self-dual and linear, but not monotone, so it does not belong to the intersection.
25. For functions of at most two variables the maximum is three functions: $\{0,x\wedge y,x\sim y\}$; four functions require a function of three variables.
26. Among functions of at most two variables only the Sheffer stroke $x|y$ and the Peirce arrow $x\downarrow y$ are complete on their own.
