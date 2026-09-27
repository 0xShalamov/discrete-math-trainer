# Block 1. Congruences, number theory and RSA

## Question 1. Congruences and their properties.

**In plain words**: Modular arithmetic is clock arithmetic: 15 o'clock and 3 o'clock are the same moment, because the difference 12 is divisible by 12. All discrete cryptosystems (RSA, Diffie-Hellman, signatures, hashes in $\mathbb{Z}_n$) live exactly on that clock face, and all their security grows out of the fact that one cannot divide freely on a clock face: elements that are not coprime to the modulus have nothing to invert them with.

**Definitions**:
- Fix a modulus $n \in \mathbb{N}$, $n > 1$. Congruence: $a \equiv b \pmod n \iff n \mid (a - b)$.
- This is an equivalence relation: reflexivity $a \equiv a$, symmetry, transitivity (from $n \mid a-b$ and $n \mid b-c$ it follows that $n \mid a-c$). Hence it partitions $\mathbb{Z}$ into classes.
- Residue class: $\bar a = \{x \in \mathbb{Z} : x \equiv a \pmod n\}$. There are exactly $n$ classes; the set $\{0, 1, \dots, n-1\}$ is called a complete residue system.
- $\mathbb{Z}_n$ is the set of classes with the operations $\bar a + \bar b = \overline{a+b}$, $\bar a \cdot \bar b = \overline{ab}$. The operations are well defined precisely because congruence is compatible with addition and multiplication. This is a commutative ring with unity.
- Invertible element (unit of the ring): $\bar a$ is invertible if there exists $\bar x$ with $\bar a \bar x = \bar 1$; one writes $x \equiv a^{-1} \pmod n$. The set of invertible classes is the group $\mathbb{Z}_n^*$ of order $\varphi(n)$.

**Theorems and formulas**:
1. Compatibility: if $a \equiv b$ and $c \equiv d \pmod n$, then $a + c \equiv b + d$, $a - c \equiv b - d$, $ac \equiv bd \pmod n$. Corollary: congruences can be added, multiplied and raised to a power term by term.
2. Cancellation: $ac \equiv bc \pmod n \iff a \equiv b \pmod{n / \gcd(c,n)}$. One may cancel $c$ outright only when $\gcd(c,n) = 1$.
3. Invertibility criterion: $\bar a \in \mathbb{Z}_n^* \iff \gcd(a,n) = 1$. Proof: if $\gcd(a,n)=1$, then by Bezout's identity $au + nv = 1$, hence $au \equiv 1 \pmod n$ and $u = a^{-1}$; conversely, from $au \equiv 1 \pmod n$ we have $au - 1 = kn$, and any common divisor of $a$ and $n$ divides 1. The inverse is unique. Hence: $\mathbb{Z}_n$ is a field $\iff$ $n$ is prime.
4. Linear congruence $ax \equiv b \pmod n$. Let $d = \gcd(a,n)$. The congruence is solvable $\iff d \mid b$, and then it has exactly $d$ solutions modulo $n$.
   - Proof skeleton: (1) if $ax \equiv b$, then $n \mid ax - b$, and $d$ divides $a$ and $n$, hence $d \mid b$; this is necessity. (2) Let $d \mid b$: divide $a$, $b$, $n$ by $d$ and obtain $a'x \equiv b' \pmod{n'}$, where $\gcd(a',n') = 1$. (3) Then $a'$ is invertible and $x \equiv (a')^{-1} b' \pmod{n'}$. (4) Returning to modulus $n$, all solutions have the form $x_0 + t\,n'$, $t = 0, \dots, d-1$, so exactly $d$ classes modulo $n$. (5) There are no other solutions, since every solution lies in one of these classes.

**Example**: $14x \equiv 21 \pmod{35}$. $d = \gcd(14,35) = 7$, and $7 \mid 21$, so there are 7 solutions. Divide by 7: $2x \equiv 3 \pmod 5$; since $2^{-1} \equiv 3 \pmod 5$ (check $2 \cdot 3 = 6 \equiv 1$), we get $x \equiv 3 \cdot 3 = 9 \equiv 4 \pmod 5$. All solutions: $x \equiv 4, 9, 14, 19, 24, 29, 34 \pmod{35}$.

**What the examiner may ask**:
- Why can one not cancel 2 in $6 \equiv 2 \pmod 4$? Because $\gcd(2,4) = 2 \neq 1$; formally $6 \equiv 2 \pmod 4$ is equivalent to $3 \equiv 1 \pmod 2$, which is true, but $3 \equiv 1 \pmod 4$ is already false. The modulus shrinks by a factor of $\gcd(c,n)$.
- How many solutions does $6x \equiv 4 \pmod 8$ have? $d = \gcd(6,8) = 2$ divides 4, the solutions are $x \equiv 2$ and $x \equiv 6 \pmod 8$.
- Why is $\mathbb{Z}_n$ not a field for composite $n$? There are zero divisors and non-invertible elements: in $\mathbb{Z}_6$ we have $2 \cdot 3 \equiv 0 \pmod 6$, although both classes are nonzero.
- What is the order of $\mathbb{Z}_n^*$? $\varphi(n)$, see question 3.

## Question 2. Chinese remainder theorem.

**In plain words**: A system of congruences with coprime moduli glues together into a single congruence modulo the product of the moduli. In CTF this is the working tool for assembling a secret from residues, and in RSA it is the standard decryption speedup: compute separately modulo $p$ and modulo $q$ (numbers half as long) and glue the results.

**Definitions**:
- System of congruences: $x \equiv a_i \pmod{m_i}$, $i = 1, \dots, k$, where the moduli are pairwise coprime: $\gcd(m_i, m_j) = 1$ for $i \neq j$. Denote $M = m_1 m_2 \cdots m_k$.
- A solution is an integer $x$ satisfying all the congruences; there are infinitely many solutions, they differ by multiples of $M$, so one speaks of a unique solution modulo $M$.

**Theorems and formulas**:
- Statement (CRT): with pairwise coprime moduli the system has a solution, and it is unique modulo $M = \prod_{i=1}^k m_i$.
- Constructive proof (skeleton):
  1. Set $M_i = M / m_i$. Then $m_j \mid M_i$ for $j \neq i$, hence $M_i \equiv 0 \pmod{m_j}$, while $\gcd(M_i, m_i) = 1$ by pairwise coprimality.
  2. Therefore $N_i = M_i^{-1} \pmod{m_i}$ exists (invertibility by the criterion from question 1).
  3. Take $x_0 = \sum_{i=1}^k a_i M_i N_i$. Modulo $m_i$ all terms with $j \neq i$ vanish, and $x_0 \equiv a_i M_i N_i \equiv a_i \pmod{m_i}$ remains: this is a solution.
  4. Uniqueness: if $x$ and $y$ are solutions, then $m_i \mid (x-y)$ for all $i$; the moduli are pairwise coprime, hence $M \mid (x - y)$.
- Equivalent statement: the map $\mathbb{Z}_M \to \mathbb{Z}_{m_1} \times \cdots \times \mathbb{Z}_{m_k}$, $x \mapsto (x \bmod m_1, \dots, x \bmod m_k)$, is a ring isomorphism (operations act componentwise).
- Generalization to non-coprime moduli: the system is solvable $\iff$ $a_i \equiv a_j \pmod{\gcd(m_i, m_j)}$ for all pairs; then the solution is unique modulo $\mathrm{lcm}(m_1, \dots, m_k)$.
- Computationally CRT gives an algorithm in $\tilde O(k \log^2 M)$; in practice one glues two congruences at a time (Gauss algorithm, Garner's formula).

**Example**: $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$, $x \equiv 2 \pmod 7$. Here $M = 105$, $M_1 = 35$, $M_2 = 21$, $M_3 = 15$. Inverses: $35 \equiv 2 \pmod 3$, so $N_1 = 2^{-1} \equiv 2 \pmod 3$ (since $2 \cdot 2 = 4 \equiv 1$); $21 \equiv 1 \pmod 5$, so $N_2 = 1$; $15 \equiv 1 \pmod 7$, so $N_3 = 1$. Then $x_0 = 2 \cdot 35 \cdot 2 + 3 \cdot 21 \cdot 1 + 2 \cdot 15 \cdot 1 = 140 + 63 + 30 = 233 \equiv 23 \pmod{105}$. Check: $23 = 7 \cdot 3 + 2$, $23 = 4 \cdot 5 + 3$, $23 = 3 \cdot 7 + 2$.

**What the examiner may ask**:
- What changes for non-coprime moduli? One needs the compatibility condition on residues modulo the $\gcd$ of the moduli: for example, $x \equiv 1 \pmod 4$ and $x \equiv 3 \pmod 6$ are inconsistent, since $1 \not\equiv 3 \pmod 2$; while $x \equiv 1 \pmod 4$, $x \equiv 5 \pmod 6$ are consistent and give $x \equiv 5 \pmod{12}$.
- Where is it used in RSA? Decrypting separately modulo $p$ and modulo $q$ and then gluing gives roughly a fourfold speedup (work with half-length numbers plus the use of precomputed constants).
- Where else does CRT occur? Residue number systems for parallelizing arithmetic, the Pohlig-Hellman algorithm for the discrete logarithm, secret sharing schemes.
- Is uniqueness mandatory? Yes, uniqueness holds modulo the product $M$, not as an integer.

## Question 3. Euler's totient function and its computation.

**In plain words**: $\varphi(n)$ answers the question "how many integers from 1 to $n$ are coprime to $n$", that is, it is the size of the group of invertible residues. In RSA the number $\varphi(n)$ is the size of the arena in which exponents live, and therefore the secrecy rests on the fact that $\varphi(n)$ is easy to compute only when the factorization of $n$ into primes is known.

**Definitions**:
- Euler's totient function: $\varphi(n) = |\{a \in \mathbb{N} : 1 \le a \le n,\ \gcd(a,n) = 1\}| = |\mathbb{Z}_n^*|$. By convention $\varphi(1) = 1$.
- A function is called multiplicative if $\varphi(mn) = \varphi(m)\varphi(n)$ whenever $\gcd(m,n) = 1$.
- Prime factorization: $n = p_1^{k_1} p_2^{k_2} \cdots p_s^{k_s}$, where the $p_i$ are distinct primes.

**Theorems and formulas**:
1. For a prime $p$: $\varphi(p) = p - 1$ (all numbers $1, \dots, p-1$ are coprime to $p$).
2. For a prime power: $\varphi(p^k) = p^k - p^{k-1} = p^{k-1}(p-1)$. Proof: among the $p^k$ numbers exactly $p^{k-1}$ are multiples of $p$ (namely $p, 2p, \dots, p^{k-1} \cdot p$), and those are the ones we discard.
3. Multiplicativity: for $\gcd(m,n) = 1$ we have $\varphi(mn) = \varphi(m)\varphi(n)$. Proof skeleton: (1) by CRT $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$; (2) moreover $x$ is coprime to $mn$ $\iff$ $\gcd(x, m) = 1$ and $\gcd(x, n) = 1$ (here the coprimality of $m$ and $n$ matters); (3) hence unit classes correspond bijectively to pairs of units, that is $|\mathbb{Z}_{mn}^*| = |\mathbb{Z}_m^*| \cdot |\mathbb{Z}_n^*|$; (4) this yields the formula. Without coprimality it is false: $\varphi(4) = 2$, while $\varphi(2)\varphi(2) = 1$.
4. Formula via the prime factorization: $\varphi(n) = \prod_{i=1}^s p_i^{k_i - 1}(p_i - 1) = n \prod_{p \mid n}\left(1 - \frac{1}{p}\right)$.
5. General case without coprimality: $\varphi(mn) = \varphi(m)\varphi(n) \dfrac{\gcd(m,n)}{\varphi(\gcd(m,n))}$. Check for $m = n = 2$: on the left $\varphi(4) = 2$, on the right $1 \cdot 1 \cdot \frac{2}{1} = 2$.
6. Sum over divisors: $\sum_{d \mid n} \varphi(d) = n$ (check for $n=6$: $1 + 1 + 2 + 2 = 6$).
7. $\varphi(n)$ is even for $n \ge 3$ (if $a$ is coprime to $n$, then so is $n - a$, and these are two distinct classes); the upper bound $\varphi(n) \le n - 1$ holds with equality for primes.
8. Where $\varphi$ occurs in the course: it is the order of the group $\mathbb{Z}_n^*$ and the modulus of the exponent in Euler's theorem; the number of primitive roots modulo a prime $p$ equals $\varphi(p-1)$; in RSA it is $\varphi(n) = (p-1)(q-1)$; in the Pohlig-Hellman algorithm the security of Diffie-Hellman depends on the smoothness of the prime divisors of $p-1$.

**Example**: $\varphi(360)$ for $360 = 2^3 \cdot 3^2 \cdot 5$. By multiplicativity: $\varphi(8) \cdot \varphi(9) \cdot \varphi(5) = 4 \cdot 6 \cdot 4 = 96$. Via the formula: $360 \cdot \left(1 - \frac12\right)\left(1 - \frac13\right)\left(1 - \frac15\right) = 360 \cdot \frac{4}{15} = 96$. Another example: $\varphi(100) = 100 \cdot \frac12 \cdot \frac45 = 40$.

**What the examiner may ask**:
- Why is $\varphi(p^k) = p^{k-1}(p-1)$ and not $p^k - 1$? Because among the $p^k$ numbers one must discard not the single number $p$, but all $p^{k-1}$ multiples of $p$.
- How does one compute $\varphi(n)$ quickly? Only by knowing the prime factorization; note also that $\varphi(n)$ is always even for $n \ge 3$, and knowing $\varphi(n)$ for $n = pq$ effectively yields $p + q$, that is, the factorization (see question 7).
- What is wrong with "$\varphi(4) = \varphi(2)\varphi(2)$"? Multiplicativity requires the factors to be coprime, while $\gcd(2,2) = 2$.
- What is the sum of $\varphi(d)$ over all divisors of $n$? Exactly $n$.
- How many primitive roots modulo a prime $p$ are there? Exactly $\varphi(p-1)$; for example, for $p = 19$ there are $\varphi(18) = 6$.

## Question 4. Euler's and Fermat's (little) theorems.

**In plain words**: In a finite group, if an element is multiplied by itself repeatedly, it must return to the identity after a number of steps dividing the order of the group. For $\mathbb{Z}_n^*$ the order equals $\varphi(n)$, hence Euler's theorem: powers are periodic with period $\varphi(n)$. This is the main computational trick of cryptography: a huge exponent can be reduced modulo $\varphi(n)$, and this is exactly how RSA works.

**Definitions**:
- Order of an element: $\operatorname{ord}_n a = \min\{t > 0 : a^t \equiv 1 \pmod n\}$ (exists if $\gcd(a,n) = 1$).
- The multiplicative group of invertible residues $\mathbb{Z}_n^*$, whose order equals $\varphi(n)$.

**Theorems and formulas**:
1. Euler's theorem: if $\gcd(a,n) = 1$, then $a^{\varphi(n)} \equiv 1 \pmod n$.
   - Proof skeleton: (1) consider $U = \mathbb{Z}_n^*$, a finite group of order $\varphi(n)$; (2) the map $x \mapsto ax$ is a bijection $U \to U$ with inverse $x \mapsto a^{-1}x$ (invertibility is needed precisely here); (3) therefore the product of all elements of the group equals the product of all elements multiplied by $a$: $\prod_{x \in U} x = \prod_{x \in U} ax = a^{\varphi(n)} \prod_{x \in U} x$; (4) the product $P = \prod_{x \in U} x$ is invertible as a product of invertible elements, so we cancel $P$; (5) we obtain $a^{\varphi(n)} \equiv 1 \pmod n$.
2. Corollaries: $\operatorname{ord}_n a \mid \varphi(n)$ (the order of an element divides the order of the group, Lagrange's theorem); if $\gcd(a,n)=1$ and $k \equiv l \pmod{\varphi(n)}$, then $a^k \equiv a^l \pmod n$; in practice the exponent is reduced modulo $\varphi(n)$ or modulo $\operatorname{ord}_n a$ when the latter is known.
3. Fermat's little theorem: $p$ prime, $p \nmid a$ $\Rightarrow$ $a^{p-1} \equiv 1 \pmod p$. In the form "for all $a$": $a^p \equiv a \pmod p$ (for $p \mid a$ both sides are zero). This is a special case of Euler's theorem, since $\varphi(p) = p - 1$ and all $a = 1, \dots, p-1$ are coprime to $p$. There is also an independent proof: $p \mid \binom{p}{k}$ for $0 < k < p$, hence $(x+1)^p \equiv x^p + 1 \pmod p$, then induction on $a$.
4. Fast exponentiation: $a^b \bmod n$ is computed in $O(\log b)$ modular multiplications (expanding $b$ in powers of two).
5. Modular inverse via Fermat: for a prime $p$ we have $a^{-1} \equiv a^{p-2} \pmod p$.
6. Fermat primality test: if for some $a$ with $\gcd(a,n) = 1$ we have $a^{n-1} \not\equiv 1 \pmod n$, then $n$ is composite. The converse is false: Carmichael numbers pass the test for all $a$ coprime to $n$; the classic example is $n = 561 = 3 \cdot 11 \cdot 17$, where $2^{560} \equiv 5^{560} \equiv 1 \pmod{561}$, although $n$ is composite.

**Example**: $3^{100} \bmod 7$. Since $\varphi(7) = 6$ and $100 = 16 \cdot 6 + 4$, we have $3^{100} \equiv 3^4 = 81 \equiv 4 \pmod 7$. For the non-coprime case: $2^{2} \equiv 0 \not\equiv 1 \pmod 4$, although $\varphi(4) = 2$, so the condition $\gcd(a,n)=1$ is essential.

**What the examiner may ask**:
- Why the condition $\gcd(a,n)=1$? Otherwise $a$ does not lie in the group and one cannot cancel the product of elements: $2^{\varphi(4)} = 2^2 = 4 \equiv 0 \pmod 4$.
- Does the converse of Fermat's theorem hold? No, Carmichael numbers ($561$) are counterexamples, so the Fermat test is only a necessary condition; in practice Miller-Rabin is used.
- How does one compute $a^b \bmod n$ for $b \approx 10^{18}$? By fast exponentiation, first reducing the exponent modulo $\varphi(n)$ or modulo $\operatorname{ord}_n a$.
- Does Fermat follow from Euler or the other way round? Fermat is a special case of Euler for a prime modulus; independently, Fermat is proved via the divisibility of binomial coefficients.

## Question 5. The integer factorization problem. Fermat's factorization method.

**In plain words**: Factorization is splitting a number into prime factors; this is the main computationally hard problem on which RSA rests. Fermat's method exploits the difference of squares: if the factors $p$ and $q$ are close, then $\sqrt{n}$ is almost equal to $(p+q)/2$, and the factorization is found by trying a few values of $a$ near $\sqrt n$. In CTF the "Fermat attack" is a standard recipe against generated close primes.

**Definitions**:
- Factorization problem: given $n > 1$, find its prime factorization (it suffices to find one nontrivial divisor $1 < d < n$, then recurse).
- No algorithm polynomial in $\log n$ is known. The problem lies in $\mathrm{NP} \cap \mathrm{coNP}$, but it is not known to be NP-complete, nor is it known to be solvable in polynomial time.

**Theorems and formulas**:
- Trial division: $O(\sqrt n)$ operations, useful as a quick first step (to filter out small divisors and even numbers).
- Pollard's rho method: $O(n^{1/4})$ operations on average, $O(1)$ memory.
- Subexponential methods: the quadratic sieve and the number field sieve (NFS) with complexity $L_n\left[\frac13, c\right] = \exp\left(c (\ln n)^{1/3}(\ln \ln n)^{2/3}\right)$. It is this estimate that sets modern RSA key lengths (2048 bits and above).
- Fermat's method. Idea: $n = a^2 - b^2 = (a - b)(a + b)$, where for $n = pq$ we have $a = \frac{p+q}{2}$, $b = \frac{q-p}{2}$. For odd $n$ both quantities are integers.
  Algorithm: set $a = \lceil \sqrt n \rceil$; while $a^2 - n$ is not a perfect square, increase $a$ by 1; when $a^2 - n = b^2$ we get $n = (a-b)(a+b)$.
  Correctness: the method is guaranteed to terminate, because for $a = \frac{p+q}{2}$ the difference $a^2 - n = \left(\frac{q-p}{2}\right)^2$ is a perfect square; that is, a factorization with the closest pair of factors will be found.
  Number of steps $\approx \frac{p+q}{2} - \sqrt n = \frac{(\sqrt q - \sqrt p)^2}{2}$, where $p \le q$ is the pair with the minimal difference.
  Efficiency condition: $|p - q| = O(n^{1/4})$ gives $O(1)$ steps; a growing difference kills the method: for $q \approx 2p$ one needs on the order of $0{,}06\sqrt n$ steps, and for $p = 3$, $q \approx 10^{12}$ on the order of $10^{17}$ steps.
- Generalization: instead of one square one looks for several congruences $a^2 \equiv b^2 \pmod n$; this is how Dixon's method and the quadratic sieve are built.

**Example**: $n = 8051$. We have $\sqrt{8051} \approx 89{,}73$, so $a = 90$; $90^2 - 8051 = 8100 - 8051 = 49 = 7^2$, hence $n = (90-7)(90+7) = 83 \cdot 97$. Second example with several steps: $n = 5959$, $a = 78$ gives $6084 - 5959 = 125$ (not a square), $a = 79$ gives $6241 - 5959 = 282$ (not a square), $a = 80$ gives $6400 - 5959 = 441 = 21^2$, that is $n = 59 \cdot 101$.

**What the examiner may ask**:
- Why is Fermat's method bad for distant factors? The number of steps is on the order of $(q-p)^2/(8\sqrt n)$; for a difference on the order of $\sqrt n$ this is already on the order of $\sqrt n$ steps, which is infeasible for large $n$.
- How does one defend against this when generating an RSA key? Take $p$ and $q$ of the same bit length, but not too close, and check that the difference $|p-q|$ is not small.
- How does it relate to other methods? The quadratic sieve and NFS develop the idea of searching for $a^2 \equiv b^2 \pmod n$ and then computing $\gcd(a-b, n)$.
- Can a 2048-bit modulus be factored? No, the best NFS implementations have not come close to that boundary; hence the security of RSA is backed not by a proof but by practice and complexity estimates.

## Question 6. The discrete logarithm problem, Shanks' and Pohlig-Hellman methods.

**In plain words**: Exponentiation in $\mathbb{Z}_p^*$ is a one-way street: $g^x \bmod p$ costs $O(\log x)$ multiplications, while the way back from $h$ to $x$ has no fast solution. Diffie-Hellman key exchange, the ElGamal scheme and DSA rest on this. In CTF the discrete logarithm is broken when the group is weak: small order or smooth $p - 1$.

**Definitions**:
- Let $G$ be a cyclic group of order $N$ with generator $g$. For $h \in G$ the discrete logarithm is the $x$ such that $g^x = h$; one writes $x = \log_g h$.
- In $\mathbb{Z}_p^*$ for a prime $p$: if $g$ is a primitive root, then $N = p - 1$ and the logarithm is defined for all $h \neq 0$; in the general case $N = \operatorname{ord}_p g$ and the logarithm exists only for $h$ from the subgroup $\langle g \rangle$.
- The logarithm is defined uniquely modulo $N$: if $g^{x_1} = g^{x_2}$, then $N \mid (x_1 - x_2)$.
- A primitive root modulo $p$ is an element of order $p - 1$; it exists, and the number of such elements equals $\varphi(p-1)$.

**Theorems and formulas**:
- Shanks' method (baby-step giant-step, BSGS). Idea: set $m = \lceil \sqrt N \rceil$ and look for $x$ in the form $x = im + j$, where $0 \le j < m$, $0 \le i \le m$. The equation $g^{im+j} = h$ is equivalent to $h \cdot (g^{-m})^i = g^j$: put all baby steps $g^j$ into a table, and no more than $m+1$ giant steps $h (g^{-m})^i$ are needed.
  Pseudocode:
  ```
  m = ceil(sqrt(N))              # N = ord(g)
  baby = { }                     # value g^j -> exponent j
  e = 1
  for j in 0 .. m-1:
      baby[e] = j;  e = e * g mod p
  step = (g^m)^(-1) mod p        # inverse via the extended Euclidean algorithm
  gamma = h
  for i in 0 .. m:
      if gamma in baby:
          return i*m + baby[gamma]
      gamma = gamma * step mod p
  ```
  Complexity: $O(\sqrt N)$ modular multiplications and $O(\sqrt N)$ memory. Memory is exactly the price paid for the speed; Pollard's rho method for the discrete logarithm gives the same $O(\sqrt N)$ time but $O(1)$ memory.
- Pohlig-Hellman method (PH). Idea: if the order of the group factors into small prime powers, the problem reduces to taking logarithms in small subgroups and gluing the answers by CRT.
  - Let $N = \prod_{i} q_i^{e_i}$. It suffices to find $x \bmod q^e$ for each $q^e \| N$.
  - Write $x \equiv x_0 + x_1 q + \dots + x_{e-1} q^{e-1} \pmod{q^e}$ and find the digits one by one. The element $\gamma = g^{N/q}$ has order $q$; for $x_0$ compare $h^{N/q}$ with $\gamma^{x_0}$ (brute force over $0 \le x_0 < q$, or a table/BSGS in $O(\sqrt q)$).
  - Then update $h \leftarrow h \cdot g^{-x_0}$ and repeat the procedure: at step number $t$ compare $h^{N/q^{t+1}}$ with $\gamma^{x_t}$.
  - Having collected all $x \bmod q_i^{e_i}$, glue them by CRT to obtain $x \bmod N$.
  - Complexity: $O\left(\sum_i e_i (\log N + \sqrt{q_i})\right)$. If $N$ is smooth (all $q_i$ small), the method solves the problem instantly.
- Consequences for cryptography: in Diffie-Hellman and ElGamal one must take $p$ such that $p - 1$ has a large prime divisor (safe primes of the form $p = 2q + 1$) and work in the subgroup of prime order $q$. For general groups the best known lower bound is $\Omega(\sqrt N)$; for $\mathbb{Z}_p^*$ subexponential methods exist (index calculus) of complexity $L_p[1/3, c]$, so the field length is chosen comparable to the RSA modulus length.

**Example**: BSGS. $p = 23$, $g = 5$ (a primitive root, $N = 22$), $h = 8$. Then $m = \lceil \sqrt{22} \rceil = 5$. Baby steps $5^j \bmod 23$ for $j = 0, \dots, 4$: $1, 5, 2, 10, 4$. Next $(5^5)^{-1} = 20^{-1} \equiv 15 \pmod{23}$ (since $20 \cdot 15 = 300 \equiv 1$). Giant steps: $8$ is not in the table; $8 \cdot 15 = 120 \equiv 5 \pmod{23}$ is in the table at $j = 1$, so $i = 1$ and $x = 1 \cdot 5 + 1 = 6$. Check: $5^6 = 15625$, $15625 \bmod 23 = 8$.
Example PH: $p = 19$, $g = 2$ (order $18 = 2 \cdot 3^2$), $h = 15$. We look for $x \bmod 18$. Part $q = 2$: $h^{9} = 18 \equiv -1$ and $g^{9} = 18$, so $x \equiv 1 \pmod 2$. Part $q^e = 9$: $\gamma = g^{18/3} = 2^6 \equiv 7$, $\gamma^0, \gamma^1, \gamma^2$ equal $1, 7, 11$; $h^6 = 11 = \gamma^2$, so $x_0 = 2$. Update $h_1 = h \cdot g^{-2} = 15 \cdot 5 \equiv 18 \pmod{19}$, and $h_1^{18/9} = 18^2 \equiv 1 = \gamma^0$, so $x_1 = 0$, that is $x \equiv 2 \pmod 9$. Gluing: $x \equiv 2 \pmod 9$, $x \equiv 1 \pmod 2$ gives $x \equiv 11 \pmod{18}$. Check: $2^{11} = 2048$, $2048 \bmod 19 = 15$.

**What the examiner may ask**:
- What is the fundamental difference between BSGS and PH? BSGS is universal, it works in any group in $O(\sqrt N)$ without factoring $N$; PH requires the factorization of the group order and is efficient only for smooth $N$. In practice they are combined: PH reduces to small subgroups, and BSGS runs inside each of them.
- What is $\sqrt N$ for $N \approx 2^{256}$? About $2^{128}$, which is what makes the group secure.
- Why must one not take $p$ with smooth $p-1$? PH and CRT solve the logarithm in polynomial time and the cryptosystem breaks.
- Is the logarithm defined if $g$ is not a generator? Only for $h$ from the subgroup $\langle g \rangle$ and only modulo $\operatorname{ord} g$.

## Question 7. The RSA asymmetric cryptosystem and the justification of its operation.

**In plain words**: RSA is a lock that clicks only with the owner's key: encrypt by raising to the power $e$ modulo $n$, decrypt by raising to the power $d$. Anyone who can factor $n$ into primes will compute $\varphi(n)$ and $d$, so all the secrecy rests on the difficulty of factorization.

**Definitions** (scheme):
- Key generation: choose primes $p \neq q$ (of equal bit length, with a large difference $|p - q|$); $n = pq$; $\varphi(n) = (p-1)(q-1)$; choose $e$ with $1 < e < \varphi(n)$, $\gcd(e, \varphi(n)) = 1$ (the standard is $e = 65537 = 2^{16}+1$); compute $d = e^{-1} \bmod \varphi(n)$.
- Public key $(n, e)$, private key $(n, d)$; in practice the private key stores $p$, $q$, $d$ to speed things up via CRT.
- Encryption: $c = m^e \bmod n$ for $0 \le m < n$ (randomizing padding is applied before encryption). Decryption: $m = c^d \bmod n$.
- Digital signature: $s = H(m)^d \bmod n$ for a hash function $H$; verification $s^e \equiv H(m) \pmod n$. It is the hash that must be signed: otherwise a multiplicative attack works, and from signatures on $m_1$ and $m_2$ a signature on $m_1 m_2$ is assembled.

**Theorems and formulas**:
- Correctness of decryption. Let $ed \equiv 1 \pmod{\varphi(n)}$, that is $ed = 1 + k(p-1)(q-1)$ for some $k \ge 1$. We need $m^{ed} \equiv m \pmod n$ for all $0 \le m < n$.
  - Proof skeleton: (1) by CRT it suffices to prove the congruence separately modulo $p$ and modulo $q$; (2) if $p \nmid m$, then by Fermat's theorem $m^{p-1} \equiv 1 \pmod p$, hence $m^{ed} = m \cdot \left(m^{p-1}\right)^{k(q-1)} \equiv m \pmod p$; (3) if $p \mid m$, then $m^{ed} \equiv 0 \equiv m \pmod p$, and the congruence holds too; (4) the same holds for modulus $q$; (5) hence $m^{ed} - m$ is divisible by the distinct primes $p$ and $q$, that is, divisible by $n = pq$.
  - Why one cannot simply invoke Euler: Euler's theorem requires $\gcd(m, n) = 1$, while exactly $p + q - 1$ of the $n$ messages are not coprime to $n$ (multiples of $p$ or $q$). Their probability is negligible, but handling the case $\gcd(m,n) > 1$ is mandatory, and it is done precisely via CRT.
- Why $ed \equiv 1 \pmod{\varphi(n)}$ and not $\pmod n$: exponents live modulo the order of the group of invertible residues, that is modulo $\varphi(n)$; the modulus $n$ itself only sets the length of the number representation.
- Knowing $\varphi(n)$ is equivalent to factorization: $p + q = n - \varphi(n) + 1$, and $p$ and $q$ are the roots of $X^2 - (n - \varphi(n) + 1)X + n = 0$ (check: in the example below $28^2 - 4 \cdot 187 = 36 = 6^2$, the roots are $17$ and $11$).
- Knowing $d$ is equivalent to factorization: $ed - 1 = 2^s t$ with odd $t$; take a random $a$, $\gcd(a,n) = 1$, and compute $a^t, a^{2t}, \dots$; as soon as some $y$ with $y^2 \equiv 1 \pmod n$ and $y \not\equiv \pm 1 \pmod n$ appears, the number $\gcd(y-1, n)$ gives a nontrivial divisor; the success probability is at least $1/2$ per attempt.
- Factorization breaks RSA: $n \to p, q \to \varphi(n) \to d = e^{-1} \bmod \varphi(n)$. The converse is not proved: extracting the $e$-th root (the RSA problem) has not been reduced to factorization, and the security of the scheme rests on the stronger RSA assumption. Attacks that bypass factorization are known: small $d$ (Wiener's theorem), a shared modulus for two users, small $e$ without padding, timing and power-consumption attacks.
- Where the discrete logarithm comes in: (1) the logarithm plays no part in the RSA scheme itself, because the exponent $e$ is public and decryption reduces to inverting $e$ modulo $\varphi(n)$; (2) factorization and the discrete logarithm in $\mathbb{Z}_p^*$ are related number-theoretic problems with the same subexponential estimates of the form $L[1/3, c]$, so RSA modulus lengths and DH field lengths are chosen alike; (3) if $p - 1$ is smooth for a DH modulus, the logarithm is computed in polynomial time by PH plus CRT, and factoring a composite modulus reduces the logarithm in $\mathbb{Z}_n^*$ to subgroups: weak parameters break both schemes, although no polynomial reduction between the problems is known.
- Final sizes: 1024 bits are no longer considered reliable, the standard is 2048 or 3072 bits; long messages are encrypted hybridly (RSA carries a symmetric key).

**Example**: $p = 17$, $q = 11$, $n = 187$, $\varphi(n) = 160$, $e = 7$, $d = 23$ (check $7 \cdot 23 = 161 = 160 + 1$). Message $m = 88$: $c = 88^7 \bmod 187 = 11$, and back $11^{23} \bmod 187 = 88$. Special case $\gcd(m,n) > 1$: $m = 11$ (a multiple of $p$) gives $c = 11^7 \bmod 187 = 88$ and $88^{23} \bmod 187 = 11$; here $11^{160} \bmod 187 = 154 \neq 1$, so Euler's theorem is not applicable, and the proof via CRT is what works. Signature: $s = 5^{23} \bmod 187 = 180$, verification $180^7 \bmod 187 = 5$.

**What the examiner may ask**:
- Why is $d$ recovered from $\varphi(n)$? By the extended Euclidean algorithm: $d$ is the inverse of $e$ modulo $\varphi(n)$.
- What to do if $\gcd(m,n) > 1$? Decryption is still correct (the proof modulo $p$ and $q$ plus CRT); there are exactly $p+q-1$ such $m$, the probability $1/p + 1/q$ is practically zero, but the case must be handled.
- Why padding? Deterministic RSA is vulnerable: identical messages give identical ciphertexts, and a small $e$ without randomization allows the root to be extracted; OAEP adds randomness.
- Why must $p$ and $q$ be of the same order but not too close? Factors that are too close are broken by Fermat's method in $(q-p)^2/(8\sqrt n)$ steps, while factors that are too far apart make trial division and Pollard's rho method easier; therefore one takes $p$ and $q$ of the same bit length with a large absolute difference.

## Cheat sheet

- $a \equiv b \pmod n \iff n \mid (a-b)$; an equivalence relation compatible with $+$, $-$, $\cdot$ and exponentiation.
- $\bar a$ is invertible in $\mathbb{Z}_n$ $\iff \gcd(a,n) = 1$ (Bezout's identity); $\mathbb{Z}_n$ is a field $\iff$ $n$ is prime.
- $ac \equiv bc \pmod n \iff a \equiv b \pmod{n/\gcd(c,n)}$.
- $ax \equiv b \pmod n$ is solvable $\iff$ $d = \gcd(a,n)$ divides $b$; then exactly $d$ solutions modulo $n$.
- $|\mathbb{Z}_n^*| = \varphi(n)$.
- CRT: the moduli are pairwise coprime $\Rightarrow$ the solution is unique modulo $M = \prod m_i$; construction $x = \sum a_i M_i N_i$, $M_i = M/m_i$, $N_i = M_i^{-1} \bmod m_i$.
- Generalized CRT: solvability $\iff$ $a_i \equiv a_j \pmod{\gcd(m_i, m_j)}$.
- $\varphi(p) = p-1$; $\varphi(p^k) = p^{k-1}(p-1)$; $\varphi$ is multiplicative for $\gcd(m,n)=1$; $\varphi(n) = n\prod_{p \mid n}(1 - 1/p)$.
- $\sum_{d \mid n} \varphi(d) = n$; $\varphi(n)$ is even for $n \ge 3$.
- Euler's theorem: $\gcd(a,n)=1 \Rightarrow a^{\varphi(n)} \equiv 1 \pmod n$ (multiplication by $a$ is a permutation of $\mathbb{Z}_n^*$).
- Fermat: $p \nmid a \Rightarrow a^{p-1} \equiv 1 \pmod p$; always $a^p \equiv a \pmod p$.
- $\operatorname{ord}_n a \mid \varphi(n)$; $a^{-1} \equiv a^{p-2} \pmod p$; Carmichael numbers ($561$) break the Fermat test.
- Fermat's method: $a = \lceil \sqrt n \rceil$, look for $a^2 - n = b^2$; $n = (a-b)(a+b)$, steps $\approx (\sqrt q - \sqrt p)^2/2$; efficient for $|p-q| = O(n^{1/4})$.
- Factorization complexity: trial division $O(\sqrt n)$, Pollard's rho method $O(n^{1/4})$, NFS $\exp(c(\ln n)^{1/3}(\ln\ln n)^{2/3})$.
- Discrete logarithm: $x = \log_g h$ in $\langle g \rangle$ of order $N$, defined modulo $N$.
- BSGS: $m = \lceil\sqrt N\rceil$, $x = im + j$, a table of $g^j$ and steps $h(g^{-m})^i$; $O(\sqrt N)$ time and memory.
- PH: $N = \prod q_i^{e_i}$, the digits $x_0 + x_1 q + \dots$ via $\gamma = g^{N/q}$, comparing $h^{N/q^{t+1}}$ with $\gamma^{x_t}$; then CRT; complexity $O(\sum e_i(\log N + \sqrt{q_i}))$.
- RSA: $n = pq$, $\varphi(n) = (p-1)(q-1)$, $\gcd(e,\varphi(n))=1$, $d = e^{-1} \bmod \varphi(n)$, $c = m^e$, $m = c^d$.
- Correctness: $m^{ed} = m^{1+k(p-1)(q-1)} \equiv m$ modulo $p$ and $q$ (Fermat for $\gcd(m,p)=1$ and trivially for $p \mid m$), then CRT.
- $n - \varphi(n) + 1 = p + q$; knowing this, $p$ and $q$ are found as the roots of a quadratic equation.
- Knowing $d$ is equivalent to factorization (a probabilistic reduction via $ed - 1 = 2^s t$ and $\gcd(y-1,n)$).
- Signature: $s = H(m)^d \bmod n$, verification $s^e \equiv H(m) \pmod n$; sign the hash because of multiplicativity.
- Factorization breaks RSA; DL and factorization are not reduced to each other, but have comparable subexponential complexity, hence the common key lengths of 2048+ bits.
