# 🗂️ Set Data Structure — Complete Guide

> **One Rule of Set:** Every element is **unique**. Duplicates are automatically ignored.

---

## 📌 What is a Set?

A **Set** is a collection of **distinct values** with **O(1) average-time** for insert, delete, and lookup.

Under the hood, a Set is implemented using a **Hash Table** — each value is hashed to a bucket, which is why all operations are near-instant regardless of set size.

```
Array  →  [1, 2, 2, 3, 3, 3]   (allows duplicates, O(n) lookup)
Set    →  {1, 2, 3}             (no duplicates,     O(1) lookup)
```

---

## ⚙️ All Methods — JavaScript `Set`

### Creating a Set
```js
const s = new Set();              // empty set
const s = new Set([1, 2, 3, 2]); // from array → {1, 2, 3}  (2 is deduplicated)
```

### Core Methods

| Method | Description | Time Complexity |
|---|---|---|
| `s.add(val)` | Add a value. Ignored if already exists. | O(1) avg |
| `s.has(val)` | Returns `true` if value exists | O(1) avg |
| `s.delete(val)` | Remove a value. Returns `true` if found | O(1) avg |
| `s.clear()` | Remove ALL elements | O(n) |
| `s.size` | Number of elements (property, not method) | O(1) |

### Iteration Methods

| Method | Description |
|---|---|
| `s.forEach(fn)` | Loop over each value |
| `for (const v of s)` | ES6 for-of loop (recommended) |
| `[...s]` | Spread into an array |
| `Array.from(s)` | Convert Set → Array |
| `s.values()` | Iterator over values |
| `s.keys()` | Same as `.values()` (Sets don't have keys) |
| `s.entries()` | Iterator of `[value, value]` pairs |

### Code Examples
```js
const s = new Set();

s.add(10);        // {10}
s.add(20);        // {10, 20}
s.add(10);        // {10, 20}  ← duplicate ignored!

s.has(10);        // true
s.has(99);        // false

s.size;           // 2

s.delete(10);     // true  → {20}
s.delete(99);     // false (not found, nothing happens)

s.clear();        // {} (empty)

// Iteration
const fruits = new Set(["apple", "banana", "cherry"]);
for (const f of fruits) console.log(f);
// apple, banana, cherry

// Convert to Array
const arr = [...fruits];          // ["apple", "banana", "cherry"]
const arr2 = Array.from(fruits);  // same thing
```

---

## ⚙️ All Methods — Python `set`

### Creating a Set
```python
s = set()               # empty set  ← must use set(), NOT {} (that's a dict!)
s = {1, 2, 3}           # set literal
s = set([1, 2, 2, 3])   # from list → {1, 2, 3}
```

### Core Methods

| Method | Description | Time |
|---|---|---|
| `s.add(val)` | Add a value | O(1) avg |
| `val in s` | Membership check (not `.has()`) | O(1) avg |
| `s.remove(val)` | Remove; raises `KeyError` if missing | O(1) avg |
| `s.discard(val)` | Remove; does NOT raise error if missing | O(1) avg |
| `s.pop()` | Remove & return an arbitrary element | O(1) |
| `s.clear()` | Empty the set | O(n) |
| `len(s)` | Number of elements | O(1) |

### Set Math Operations (Python-exclusive bonus!)

| Operation | Symbol | Method | Description |
|---|---|---|---|
| Union | `s1 \| s2` | `s1.union(s2)` | All elements from both |
| Intersection | `s1 & s2` | `s1.intersection(s2)` | Only common elements |
| Difference | `s1 - s2` | `s1.difference(s2)` | In s1 but not in s2 |
| Symmetric Diff | `s1 ^ s2` | `s1.symmetric_difference(s2)` | In either but not both |
| Subset check | `s1 <= s2` | `s1.issubset(s2)` | True if s1 ⊆ s2 |
| Superset check | `s1 >= s2` | `s1.issuperset(s2)` | True if s1 ⊇ s2 |

```python
a = {1, 2, 3}
b = {3, 4, 5}

a | b   # {1, 2, 3, 4, 5}  — union
a & b   # {3}               — intersection
a - b   # {1, 2}            — difference
a ^ b   # {1, 2, 4, 5}      — symmetric difference
```

---

## 🧠 Core Patterns a Set Solves

### Pattern 1 — "Have I Seen This Before?" (Duplicate Detection)
```js
// Detect any repeated element in O(n)
const seen = new Set();
for (const x of nums) {
  if (seen.has(x)) return true;   // saw it before!
  seen.add(x);
}
return false;
```
**Problems:** Contains Duplicate, Happy Number, Find the Duplicate

---

### Pattern 2 — De-duplication
```js
// Remove all duplicates from an array
const unique = [...new Set(arr)];
```
**Problems:** Remove Duplicates from Sorted Array (follow-up), Unique Email Addresses

---

### Pattern 3 — Complement / Existence Check
```js
// Instead of searching the full array (O(n)), load into a Set, then check O(1)
const numSet = new Set(nums);
for (const n of nums) {
  if (numSet.has(target - n)) return true;  // complement exists!
}
```
**Problems:** Two Sum (variant), Intersection of Two Arrays

---

### Pattern 4 — Streak / Sequence Building
```js
// Only start a sequence from its leftmost number
const s = new Set(nums);
for (const n of s) {
  if (!s.has(n - 1)) {              // n is the start of a streak
    let len = 1;
    while (s.has(n + len)) len++;   // extend the streak
    // ...
  }
}
```
**Problems:** Longest Consecutive Sequence (#128)

---

### Pattern 5 — Visited Tracking (Graph / Cycle)
```js
const visited = new Set();
function dfs(node) {
  if (visited.has(node)) return;    // already explored
  visited.add(node);
  for (const neighbor of graph[node]) dfs(neighbor);
}
```
**Problems:** Number of Islands, Clone Graph, Course Schedule

---

### Pattern 6 — Set Intersection / Union
```python
a = set(nums1)
b = set(nums2)
return list(a & b)   # common elements
```
**Problems:** Intersection of Two Arrays, Common Characters

---

## 🎯 Interview Problems — Categorized by Pattern

### 🟢 Easy

| # | Problem | Pattern | Key Idea |
|---|---|---|---|
| 217 | Contains Duplicate | Seen-before | Add to set; return true if already there |
| 136 | Single Number | Math / XOR | (Bonus: XOR is even cleaner, but set works) |
| 202 | Happy Number | Cycle detection | Set tracks numbers in the sequence |
| 349 | Intersection of Two Arrays | Set intersection | `set(a) & set(b)` |
| 771 | Jewels and Stones | Lookup | Load jewels into set; count stones |
| 268 | Missing Number | Complement | Load nums into set; check 0..n |
| 1 | Two Sum | Complement lookup | `target - num` in set? |
| 242 | Valid Anagram | Frequency / Set | Same chars, same counts |
| 409 | Longest Palindrome | Frequency | Set tracks "unpaired" chars |

---

### 🟡 Medium

| # | Problem | Pattern | Key Idea |
|---|---|---|---|
| 128 | Longest Consecutive Sequence | Streak building | Only start from sequence beginnings |
| 3 | Longest Substring Without Repeating Chars | Sliding Window + Set | Set tracks chars in current window |
| 36 | Valid Sudoku | Seen-before (row/col/box) | 3 sets per row, col, 3×3 box |
| 187 | Repeated DNA Sequences | Seen-before | Add 10-char substrings; detect repeats |
| 560 | Subarray Sum Equals K | Prefix Sum + Set/Map | Set of prefix sums |
| 380 | Insert Delete GetRandom O(1) | Set + Array | Combine for O(1) random access |
| 442 | Find All Duplicates in Array | Seen-before | Index-marking trick OR set |
| 721 | Accounts Merge | Union-Find + Set | Group emails by owner |
| 1two | Group Anagrams | Hashing | Sorted word → group key |

---

### 🔴 Hard

| # | Problem | Pattern | Key Idea |
|---|---|---|---|
| 41 | First Missing Positive | Set lookup | Load array into set; check 1..n |
| 124 | Word Ladder | BFS + Visited Set | Set tracks visited words |
| 295 | (Sliding window max) | Deque / Set variant | — |
| 432 | All O(1) Data Structure | Set + DLL | Ordered set of frequencies |

---

## ⚡ Complexity Cheat Sheet

| Operation | Average Case | Worst Case |
|---|---|---|
| Insert `.add()` | **O(1)** | O(n) — hash collision |
| Lookup `.has()` | **O(1)** | O(n) — hash collision |
| Delete `.delete()` | **O(1)** | O(n) — hash collision |
| Iteration | **O(n)** | O(n) |
| Space | **O(n)** | O(n) |

> **Worst case O(n)** happens only with a pathological hash collision (extremely rare in practice). For all interview purposes, treat all Set ops as **O(1)**.

---

## ⚠️ Common Mistakes & Gotchas

### 1. Empty Set in Python
```python
s = {}    # ❌ This is a DICT, not a set!
s = set() # ✅ Correct empty set
```

### 2. Set is Unordered
```js
const s = new Set([3, 1, 2]);
[...s]  // [3, 1, 2]  ← insertion order is preserved in JS
        // but don't rely on sorted order!
```

### 3. Objects / Arrays are NOT deduplicated by value
```js
const s = new Set();
s.add([1, 2]);
s.add([1, 2]);
s.size;  // 2 ← two different object references!
// Use JSON.stringify(arr) as the key if you need value-based dedup
```

### 4. Set vs Map
| Need | Use |
|---|---|
| Track existence / uniqueness | **Set** |
| Track count / value mapping | **Map** |

```js
// Wrong: using Set to count
seen.add(num); seen.add(num); // still just 1 entry

// Right: use Map to count
const freq = new Map();
freq.set(num, (freq.get(num) || 0) + 1);
```

---

## 🔁 Quick Comparison: Set vs Array vs Object vs Map

| Feature | Array | Set | Object | Map |
|---|---|---|---|---|
| Duplicate values | ✅ Yes | ❌ No | ❌ No (keys) | ❌ No (keys) |
| Ordered | ✅ Index | ✅ Insertion | ❌ Not guaranteed | ✅ Insertion |
| Lookup time | O(n) | **O(1)** | O(1) | O(1) |
| Key types | Index only | Any | String/Symbol | **Any** |
| Best for | Ordered data | Unique membership | Key-value (string keys) | Key-value (any keys) |

---

## 💡 Interview Tips

1. **"Check if exists in O(1)"** → Immediately think **Set** (or Map).
2. **"Remove duplicates"** → `new Set(arr)` or `set(lst)`.
3. **"Find missing / extra element"** → Load known values into Set, scan for absence.
4. **"Cycle detection"** → Set of visited nodes/values.
5. **"Sliding window with unique constraint"** → Set tracks the current window's elements.
6. Always mention **O(1) average time** when justifying your Set choice to the interviewer.
7. For Python, remember **set math operators** (`&`, `|`, `-`, `^`) — they can replace loops entirely.

---

*Next up: Learn **Map / HashMap** — the natural extension of Set that stores key→value pairs.*
