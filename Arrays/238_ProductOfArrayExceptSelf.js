/**
 * 238. Product of Array Except Self
 * https://leetcode.com/problems/product-of-array-except-self/
 * 
 * Time Complexity: O(N) where N is the length of nums
 * Space Complexity: O(1) auxiliary space (the output array does not count as extra space for complexity analysis)
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const res = new Array(n);
    
    // Calculate prefix products and store them directly in the result array.
    // res[i] will contain the product of all elements to the left of i.
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    
    // Calculate postfix products on the fly and multiply them with the existing prefix product.
    // postfix will contain the product of all elements to the right of i.
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= postfix;
        postfix *= nums[i];
    }
    
    return res;
};

/**
 * Alternative Approach: Using separate left and right arrays (Easier to conceptualize)
 * Time Complexity: O(N)
 * Space Complexity: O(N) auxiliary space for left and right arrays
 */
/*
var productExceptSelfSeparateArrays = function(nums) {
    const n = nums.length;
    const left = new Array(n);
    const right = new Array(n);
    const res = new Array(n);
    
    // Fill left array with prefix products
    left[0] = 1;
    for (let i = 1; i < n; i++) {
        left[i] = left[i - 1] * nums[i - 1];
    }
    
    // Fill right array with postfix products
    right[n - 1] = 1;
    for (let i = n - 2; i >= 0; i--) {
        right[i] = right[i + 1] * nums[i + 1];
    }
    
    // Multiply left and right to get the final result
    for (let i = 0; i < n; i++) {
        res[i] = left[i] * right[i];
    }
    
    return res;
};
*/

// Example Usage:
// console.log(productExceptSelf([1,2,3,4])); // Output: [24,12,8,6]
// console.log(productExceptSelf([-1,1,0,-3,3])); // Output: [0,0,9,0,0]
