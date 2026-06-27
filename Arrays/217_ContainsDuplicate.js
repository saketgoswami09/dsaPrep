/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  LeetCode #217 — Contains Duplicate                         ║
 * ║  Link       : https://leetcode.com/problems/contains-duplicate/
 * ║  Difficulty : Easy                                          ║
 * ║  Topic      : Arrays, Hashing                               ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * PROBLEM STATEMENT:
 * ──────────────────
 * Given an integer array `nums`, return true if any value appears
 * at least twice in the array, and return false if every element
 * is distinct.
 *
 * EXAMPLES:
 * ─────────
 * Input  : nums = [1, 2, 3, 1]  →  Output : true   (1 appears twice)
 * Input  : nums = [1, 2, 3, 4]  →  Output : false  (all unique)
 * Input  : nums = [1,1,1,3,3,4,3,2,4,2]  →  Output : true
 *
 * Constraints:
 *   • 1 <= nums.length <= 10^5
 *   • -10^9 <= nums[i] <= 10^9
 */


// ══════════════════════════════════════════════════════════════
// APPROACH 1 — Brute Force (Nested Loops)
// ══════════════════════════════════════════════════════════════
// Idea  : Compare every pair (i, j) where i < j.
//         If nums[i] === nums[j], a duplicate exists.
//
// Time  : O(n²) — two nested loops
// Space : O(1)  — no extra memory
//
// ❌ Too slow for large inputs. TLE on LeetCode.

function bruteForce(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {   // only pairs ahead of i
      if (nums[i] === nums[j]) return true;         // duplicate found
    }
  }
  return false;
}


// ══════════════════════════════════════════════════════════════
// APPROACH 2 — Sorting
// ══════════════════════════════════════════════════════════════
// Idea  : Sort the array so duplicates become adjacent neighbors.
//         One pass is enough to spot nums[i] === nums[i+1].
//
// Time  : O(n log n) — dominated by sort
// Space : O(1)       — in-place sort (JS sort mutates the array)
//
// ⚠️  Mutates the original array.

function containsDuplicateSort(nums) {
  nums.sort((a, b) => a - b);                      // numeric sort (not lexicographic!)
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) return true;       // neighbors match → duplicate
  }
  return false;
}


// ══════════════════════════════════════════════════════════════
// APPROACH 3 — Hash Set  (Optimal ✅)
// ══════════════════════════════════════════════════════════════
// Idea  : Use a Set to remember numbers already seen.
//         - If current number IS in the set → duplicate found.
//         - If NOT → add it and keep going.
//
// Why a Set?
//   JavaScript's Set provides O(1) average time for .has() and
//   .add(), making the overall pass O(n).
//
// Time  : O(n)  — single pass
// Space : O(n)  — set holds at most n unique values

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {

  // Step 1: Create an empty Set to track seen numbers
  const seen = new Set();

  // Step 2: Iterate through every number in the array
  for (const num of nums) {

    // Step 3: Check if we've seen this number before
    if (seen.has(num)) {
      return true;          // duplicate found → exit early
    }

    // Step 4: Mark this number as seen
    seen.add(num);
  }

  // Step 5: Finished the loop with no duplicates found
  return false;
};


// ══════════════════════════════════════════════════════════════
// ONE-LINER (JavaScript Bonus)
// ══════════════════════════════════════════════════════════════
// A Set only stores unique values. If the Set's size is less
// than the array's length, there must be at least one duplicate.
//
// Time  : O(n)  |  Space : O(n)
// ⚠️  Always builds the full Set — no early exit.

const oneLiner = (nums) => new Set(nums).size < nums.length;


// ══════════════════════════════════════════════════════════════
// TESTS
// ══════════════════════════════════════════════════════════════
const assert = (condition, msg) => {
  if (!condition) throw new Error(`FAILED: ${msg}`);
};

assert(containsDuplicate([1, 2, 3, 1])              === true,  "Test 1");
assert(containsDuplicate([1, 2, 3, 4])              === false, "Test 2");
assert(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2]) === true,  "Test 3");
assert(containsDuplicate([1])                        === false, "Test 4");

console.log("All tests passed [OK]");


/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  COMPLEXITY SUMMARY                                         ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Approach          Time        Space   Notes                ║
 * ║  ─────────────── ──────────── ─────── ──────────────────── ║
 * ║  Brute Force      O(n²)        O(1)   TLE on large input   ║
 * ║  Sorting          O(n log n)   O(1)   Mutates array        ║
 * ║  Hash Set (Set)   O(n)         O(n)   Best general-purpose ║
 * ║  One-liner        O(n)         O(n)   No early exit        ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * KEY TAKEAWAYS:
 * ──────────────
 * • JS `Set` is the equivalent of Python's `set` — use it for
 *   "have I seen this before?" problems.
 *
 * • Always use `.sort((a, b) => a - b)` for number arrays.
 *   Default JS sort is LEXICOGRAPHIC — [10, 2, 1] would sort as
 *   [1, 10, 2] which gives WRONG results for this problem.
 *
 * • Early return (return true inside loop) is more efficient than
 *   the one-liner because it stops as soon as the first duplicate
 *   is found instead of scanning the whole array.
 *
 * • This Set pattern is the foundation for:
 *     → Two Sum (#1)
 *     → Longest Consecutive Sequence (#128)
 *     → Happy Number (#202)
 */
