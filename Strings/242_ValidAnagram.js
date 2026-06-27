/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  LeetCode #242 — Valid Anagram                              ║
 * ║  Link       : https://leetcode.com/problems/valid-anagram/  ║
 * ║  Difficulty : Easy                                          ║
 * ║  Topic      : Strings, Hashing                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * PROBLEM STATEMENT:
 * ──────────────────
 * Given two strings `s` and `t`, return true if `t` is an anagram
 * of `s`, and false otherwise.
 *
 * An ANAGRAM is a word formed by rearranging all the letters of
 * another word, using each original letter exactly once.
 *
 * EXAMPLES:
 * ─────────
 * Input  : s = "anagram", t = "nagaram"  →  Output : true
 * Input  : s = "rat",     t = "car"      →  Output : false
 * Input  : s = "ab",      t = "a"        →  Output : false  (different lengths)
 *
 * Constraints:
 *   • 1 <= s.length, t.length <= 5 * 10^4
 *   • s and t consist of lowercase English letters only
 *
 * Follow-up: What if inputs can contain Unicode characters?
 *            → Use a Map instead of a fixed-size array. (Approach 2 handles this)
 */


// ══════════════════════════════════════════════════════════════
// APPROACH 1 — Sorting
// ══════════════════════════════════════════════════════════════
// Idea  : If both strings are anagrams, sorting them must produce
//         identical strings. "anagram".sort() === "nagaram".sort()
//         → both become "aaagmnr"
//
// Time  : O(n log n) — dominated by sort
// Space : O(n)       — sorted arrays / strings

function isAnagramSort(s, t) {
  // Quick exit: different lengths can never be anagrams
  if (s.length !== t.length) return false;

  // Split → Sort → Join, then compare the two sorted strings
  return s.split("").sort().join("") === t.split("").sort().join("");
}


// ══════════════════════════════════════════════════════════════
// APPROACH 2 — Hash Map  (Optimal ✅ — handles Unicode too)
// ══════════════════════════════════════════════════════════════
// Idea  : Count the frequency of each character in `s`.
//         Then walk through `t` and decrement those counts.
//         If any count goes negative → `t` has a char `s` doesn't.
//         At the end, every count must be exactly 0.
//
// Why Map?
//   Works for ANY character set (Unicode, not just a-z).
//   This is the answer to the Follow-up question.
//
// Time  : O(n)  — two linear passes
// Space : O(k)  — k = number of unique characters (at most 26 here)

function isAnagramMap(s, t) {
  if (s.length !== t.length) return false;

  const freq = new Map();

  // Step 1: Count every character in s  (+1 for each)
  for (const ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  // Step 2: Subtract every character in t  (-1 for each)
  for (const ch of t) {
    if (!freq.has(ch)) return false;          // char not in s at all

    freq.set(ch, freq.get(ch) - 1);

    if (freq.get(ch) < 0) return false;       // t has MORE of this char than s
  }

  // Step 3: All counts must be 0  (every char in s was matched by t)
  return true;
}


// ══════════════════════════════════════════════════════════════
// APPROACH 3 — Fixed Array of 26  (Fastest for a-z only)
// ══════════════════════════════════════════════════════════════
// Idea  : Use a 26-slot array (one slot per letter a-z).
//         'a' maps to index 0, 'b' → 1, ... 'z' → 25.
//         Increment for s, decrement for t.
//         If all values are 0 at the end → valid anagram.
//
// How to get the index:
//   ch.charCodeAt(0) - 'a'.charCodeAt(0)
//   e.g. 'c'.charCodeAt(0) - 'a'.charCodeAt(0) = 99 - 97 = 2
//
// Time  : O(n)  — two passes
// Space : O(1)  — fixed 26-element array (constant, not input-dependent)
//
// ✅ Most efficient when input is guaranteed lowercase a-z.

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {

  // ── Step 1: Early exit if lengths differ ───────────────────
  if (s.length !== t.length) return false;

  // ── Step 2: Build a 26-slot frequency counter ──────────────
  const count = new Array(26).fill(0);
  const a = "a".charCodeAt(0);              // base char code = 97

  // ── Step 3: Increment for each char in s ───────────────────
  for (const ch of s) {
    count[ch.charCodeAt(0) - a]++;
  }

  // ── Step 4: Decrement for each char in t ───────────────────
  for (const ch of t) {
    count[ch.charCodeAt(0) - a]--;

    // ── Step 5: If any slot goes negative, t has excess chars ─
    if (count[ch.charCodeAt(0) - a] < 0) return false;
  }

  // ── Step 6: All slots are 0 → perfect match ────────────────
  return true;
};


// ══════════════════════════════════════════════════════════════
// TESTS
// ══════════════════════════════════════════════════════════════
const assert = (condition, msg) => {
  if (!condition) throw new Error(`FAILED: ${msg}`);
};

// Optimal solution tests
assert(isAnagram("anagram", "nagaram") === true,  "Test 1: valid anagram");
assert(isAnagram("rat",     "car")     === false, "Test 2: not an anagram");
assert(isAnagram("ab",      "a")       === false, "Test 3: different lengths");
assert(isAnagram("a",       "a")       === true,  "Test 4: single same char");
assert(isAnagram("aacc",    "ccac")    === false, "Test 5: same chars diff count");
assert(isAnagram("",        "")        === true,  "Test 6: both empty");

console.log("All tests passed [OK]");


/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  COMPLEXITY SUMMARY                                         ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Approach          Time        Space   Notes                ║
 * ║  ─────────────── ──────────── ─────── ──────────────────── ║
 * ║  Sorting          O(n log n)   O(n)   Simple but slower    ║
 * ║  Hash Map (Map)   O(n)         O(k)   Handles Unicode too  ║
 * ║  Array[26] ✅     O(n)         O(1)   Fastest for a-z only ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * KEY TAKEAWAYS:
 * ──────────────
 * • The core idea: two anagrams have IDENTICAL character frequencies.
 *   Any method that verifies this in O(n) is optimal.
 *
 * • charCodeAt(0) - 'a'.charCodeAt(0) is the standard trick to map
 *   a lowercase letter to an index 0-25. Memorize this pattern.
 *
 * • For the Follow-up (Unicode): switch from Array[26] to a Map.
 *   The Map approach handles any character set with no changes needed.
 *
 * • This frequency-counting pattern repeats in:
 *     → Group Anagrams (#49)      — group words by sorted key
 *     → Ransom Note (#383)        — can we build s from t's chars?
 *     → Find All Anagrams (#438)  — sliding window + freq array
 *     → Minimum Window Substring (#76)
 *
 * • Early length check (s.length !== t.length → false) is a quick
 *   O(1) optimization — always do this first!
 */
