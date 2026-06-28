/**
 * 49. Group Anagrams
 * https://leetcode.com/problems/group-anagrams/
 * 
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    
    for (const str of strs) {
        // Create an array of 26 zeros for character frequencies
        const count = new Array(26).fill(0);
        
        for (const char of str) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        
        // Convert the count array to a string to use as a key
        // Using '#' as a delimiter prevents edge case collisions
        const key = count.join('#');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
};

/**
 * Alternative Approach: Sorting (Simpler but slightly slower)
 * Time Complexity: O(N * K log K)
 * Space Complexity: O(N * K)
 */
/*
var groupAnagramsSorting = function(strs) {
    const map = new Map();
    
    for (const str of strs) {
        // Sort the string to use as a key
        const sortedStr = str.split('').sort().join('');
        
        if (!map.has(sortedStr)) {
            map.set(sortedStr, []);
        }
        map.get(sortedStr).push(str);
    }
    
    return Array.from(map.values());
};
*/

// Example Usage:
// console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
