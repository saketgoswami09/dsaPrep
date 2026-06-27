"""
╔══════════════════════════════════════════════════════════════╗
║  LeetCode #217 — Contains Duplicate                         ║
║  Link       : https://leetcode.com/problems/contains-duplicate/
║  Difficulty : Easy                                          ║
║  Topic      : Arrays, Hashing                               ║
╚══════════════════════════════════════════════════════════════╝

PROBLEM STATEMENT:
──────────────────
Given an integer array `nums`, return True if any value appears
at least twice in the array, and return False if every element
is distinct.

EXAMPLES:
─────────
Example 1:
  Input  : nums = [1, 2, 3, 1]
  Output : True   ← 1 appears twice

Example 2:
  Input  : nums = [1, 2, 3, 4]
  Output : False  ← all elements are unique

Example 3:
  Input  : nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
  Output : True

Constraints:
  • 1 <= nums.length <= 10⁵
  • -10⁹ <= nums[i] <= 10⁹
"""

# ══════════════════════════════════════════════════════════════
# APPROACH 1 — Brute Force (Nested Loops)
# ══════════════════════════════════════════════════════════════
# Idea  : Compare every pair (i, j) where i < j.
#         If nums[i] == nums[j], a duplicate exists.
#
# Time  : O(n²) — two nested loops over the array
# Space : O(1)  — no extra memory used
#
# ❌ Too slow for large inputs. Only good to understand the problem.

def brute_force(nums: list[int]) -> bool:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):          # only check pairs ahead of i
            if nums[i] == nums[j]:
                return True                 # found a duplicate
    return False


# ══════════════════════════════════════════════════════════════
# APPROACH 2 — Sorting
# ══════════════════════════════════════════════════════════════
# Idea  : After sorting, duplicates will always be ADJACENT.
#         Walk through once and check if nums[i] == nums[i+1].
#
# Time  : O(n log n) — dominated by the sort step
# Space : O(1)       — sort is in-place (ignoring sort's call stack)
#
# ⚠️  This modifies the original array. Use a copy if that matters.

def contains_duplicate_sort(nums: list[int]) -> bool:
    nums.sort()                             # bring duplicates next to each other
    for i in range(len(nums) - 1):
        if nums[i] == nums[i + 1]:         # adjacent elements are equal → duplicate
            return True
    return False


# ══════════════════════════════════════════════════════════════
# APPROACH 3 — Hash Set (Optimal ✅)
# ══════════════════════════════════════════════════════════════
# Idea  : Use a set to remember numbers we've already seen.
#         - If current number IS already in the set → duplicate found.
#         - If NOT → add it to the set and continue.
#
# Why a set?
#   A Python set gives O(1) average-time for both lookup and insert,
#   making the full pass O(n) overall.
#
# Time  : O(n)  — single pass through the array
# Space : O(n)  — set stores at most n unique elements

class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:

        # ── Step 1: Create an empty set to track seen numbers ──
        seen = set()

        # ── Step 2: Iterate through every number in the array ──
        for num in nums:

            # ── Step 3: Check if we've seen this number before ──
            if num in seen:
                return True             # duplicate found → stop early

            # ── Step 4: Mark this number as seen ───────────────
            seen.add(num)

        # ── Step 5: Looped through everything with no duplicate ─
        return False


# ══════════════════════════════════════════════════════════════
# ONE-LINER (Pythonic Bonus 🐍)
# ══════════════════════════════════════════════════════════════
# A set only keeps unique values. If the set is smaller than
# the original list, there must be a duplicate.
#
# Time  : O(n)  |  Space : O(n)

def one_liner(nums: list[int]) -> bool:
    return len(set(nums)) < len(nums)


# ══════════════════════════════════════════════════════════════
# DRIVER / TESTS
# ══════════════════════════════════════════════════════════════
if __name__ == "__main__":
    sol = Solution()

    assert sol.containsDuplicate([1, 2, 3, 1])              == True,  "Test 1 failed"
    assert sol.containsDuplicate([1, 2, 3, 4])              == False, "Test 2 failed"
    assert sol.containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2]) == True,  "Test 3 failed"
    assert sol.containsDuplicate([1])                        == False, "Test 4 failed"

    print("All tests passed [OK]")


"""
╔══════════════════════════════════════════════════════════════╗
║  COMPLEXITY SUMMARY                                         ║
╠══════════════════════════════════════════════════════════════╣
║  Approach          Time        Space   Notes                ║
║  ─────────────── ──────────── ─────── ──────────────────── ║
║  Brute Force      O(n²)        O(1)   Fails large inputs   ║
║  Sorting          O(n log n)   O(1)   Mutates array        ║
║  Hash Set ✅      O(n)         O(n)   Best general-purpose ║
║  One-liner ✅     O(n)         O(n)   Pythonic shorthand   ║
╚══════════════════════════════════════════════════════════════╝

KEY TAKEAWAYS:
──────────────
• A set is your go-to for "have I seen this before?" problems.
• Early return (return True inside the loop) avoids scanning the
  entire array once a duplicate is found → faster in practice.
• The one-liner is clean but doesn't short-circuit early; it always
  builds the full set before comparing lengths.
• This exact pattern (seen = set()) is the foundation for problems
  like Two Sum, Longest Consecutive Sequence, and Group Anagrams.
"""
