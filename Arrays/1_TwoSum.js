/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  LeetCode #1 — Two Sum                                      ║
 * ║  Link       : https://leetcode.com/problems/two-sum/        ║
 * ║  Difficulty : Easy                                          ║
 * ║  Topic      : Arrays, Hashing                               ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * PROBLEM STATEMENT:
 * ──────────────────
 * Given an array of integers `nums` and an integer `target`,
 * return the INDICES of the two numbers that add up to target.
 *
 * You may assume exactly one solution exists, and you may NOT
 * use the same element twice.
 * Return the answer in any order.
 *
 * EXAMPLES:
 * ─────────
 * Input  : nums = [2, 7, 11, 15], target = 9   →  Output : [0, 1]  (2+7=9)
 * Input  : nums = [3, 2, 4],      target = 6   →  Output : [1, 2]  (2+4=6)
 * Input  : nums = [3, 3],         target = 6   →  Output : [0, 1]  (3+3=6)
 *
 * Constraints:
 *   • 2 <= nums.length <= 10^4
 *   • -10^9 <= nums[i] <= 10^9
 *   • -10^9 <= target  <= 10^9
 *   • Exactly one valid answer exists
 */


// ══════════════════════════════════════════════════════════════
// APPROACH 1 — Brute Force (Nested Loops)
// ══════════════════════════════════════════════════════════════
// Idea  : Try every pair (i, j) and check if nums[i] + nums[j] === target.
//
// Time  : O(n²) — for each element, scan the rest of the array
// Space : O(1)  — no extra memory
//
// ❌ Fails on large arrays (TLE). Fine for understanding the problem.

function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {    // j always starts after i
      if (nums[i] + nums[j] === target) {
        return [i, j];                              // found the pair
      }
    }
  }
  return [];  // guaranteed not reached (problem states one answer exists)
}


// ══════════════════════════════════════════════════════════════
// APPROACH 2 — Two-Pass Hash Map
// ══════════════════════════════════════════════════════════════
// Idea  : Pass 1 — store every number and its index in a Map.
//         Pass 2 — for each number, check if its complement
//                  (target - num) exists in the Map.
//
// complement = the number we NEED to pair with nums[i]
// e.g. target=9, nums[i]=2  →  complement = 9-2 = 7  (do we have a 7?)
//
// Time  : O(n)  — two separate passes
// Space : O(n)  — Map stores all n elements

function twoSumTwoPass(nums, target) {
  const map = new Map();                        // value → index

  // Pass 1: populate the map
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  // Pass 2: look for each number's complement
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // make sure complement exists AND is not the same element (i !== j)
    if (map.has(complement) && map.get(complement) !== i) {
      return [i, map.get(complement)];
    }
  }
  return [];
}


// ══════════════════════════════════════════════════════════════
// APPROACH 3 — One-Pass Hash Map  (Optimal ✅)
// ══════════════════════════════════════════════════════════════
// Idea  : Build the Map AND check for the complement in a SINGLE pass.
//
//   As we walk through nums, before storing nums[i], we ask:
//   "Has the complement (target - nums[i]) already been stored?"
//   If YES → we found our pair!
//   If NO  → store nums[i] in the Map and continue.
//
// Why does this work without a self-reference issue?
//   We check the Map BEFORE inserting nums[i], so the Map only
//   contains elements seen EARLIER. nums[i] cannot match itself.
//
// Time  : O(n)  — single pass, O(1) Map lookup each step
// Space : O(n)  — Map stores at most n elements

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {

  // ── Step 1: Create a Map to store  { value → index } ───────
  const seen = new Map();

  // ── Step 2: Walk through every element ─────────────────────
  for (let i = 0; i < nums.length; i++) {

    // ── Step 3: Calculate what number we need to complete the sum
    const complement = target - nums[i];
    //  e.g. nums[i]=2, target=9  →  complement=7

    // ── Step 4: Check if we've already seen that complement ───
    if (seen.has(complement)) {
      // Found it! Return [earlier index, current index]
      return [seen.get(complement), i];
    }

    // ── Step 5: Not found yet — record this number and its index
    seen.set(nums[i], i);
  }

  return [];  // never reached given problem constraints
};


// ══════════════════════════════════════════════════════════════
// DRY RUN — trace Approach 3 on [2, 7, 11, 15], target = 9
// ══════════════════════════════════════════════════════════════
//
//  i=0  nums[i]=2   complement=9-2=7    seen={}            → 7 not in map → store {2:0}
//  i=1  nums[i]=7   complement=9-7=2    seen={2:0}         → 2 IS in map! → return [0, 1] ✅
//
//  Never reaches i=2 or i=3 — early exit!


// ══════════════════════════════════════════════════════════════
// TESTS
// ══════════════════════════════════════════════════════════════
const assert = (got, expected, msg) => {
  const pass = JSON.stringify(got.sort()) === JSON.stringify(expected.sort());
  if (!pass) throw new Error(`FAILED ${msg}: got ${got}, expected ${expected}`);
};

assert(twoSum([2, 7, 11, 15], 9),  [0, 1], "Test 1");
assert(twoSum([3, 2, 4],      6),  [1, 2], "Test 2");
assert(twoSum([3, 3],         6),  [0, 1], "Test 3: same value, diff index");
assert(twoSum([-1, -2, -3, -4, -5], -8), [2, 4], "Test 4: negatives");

console.log("All tests passed [OK]");


/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  COMPLEXITY SUMMARY                                         ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Approach            Time    Space   Notes                  ║
 * ║  ──────────────────  ──────  ──────  ───────────────────── ║
 * ║  Brute Force         O(n²)   O(1)   TLE on large inputs    ║
 * ║  Two-Pass Map        O(n)    O(n)   Two loops              ║
 * ║  One-Pass Map ✅     O(n)    O(n)   One loop, early exit   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * KEY TAKEAWAYS:
 * ──────────────
 * • The CORE insight: instead of asking "do any two numbers sum to target?",
 *   flip it to "for THIS number, does its complement exist?"
 *   This transforms an O(n²) search into an O(1) Map lookup.
 *
 * • complement = target - nums[i]  ← tattoo this on your brain.
 *
 * • Check BEFORE inserting to avoid using the same index twice
 *   (e.g. nums=[3,3], target=6 works correctly because index 0 is
 *   stored first, then index 1 finds it).
 *
 * • This exact Map pattern extends to:
 *     → Two Sum II (#167)         — sorted array, use two pointers
 *     → Two Sum III (#170)        — design a data structure
 *     → 3Sum (#15)               — fix one, two-pointer for remaining two
 *     → 4Sum (#18)               — two nested loops + two-pointer
 *     → Subarray Sum Equals K (#560) — prefix sum + map
 */
