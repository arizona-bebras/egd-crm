/**
 * Groups an array of objects by a key returned by a selector function.
 *
 * @template T The type of the elements in the input array.
 * @template K The type of the grouping key (must be a valid object key: string, number, or symbol).
 * @param {T[]} arr The array to group.
 * @param {(item: T) => K} keySelector A function that returns the key for each element.
 * @returns {Record<K, T[]>} An object where keys are the grouped values and values are arrays of elements belonging to that group.
 */
export function groupBy<T, K extends PropertyKey>(
    arr: T[],
    keySelector: (item: T) => K
): Record<K, T[]> {
    // Use the Array.prototype.reduce method to iterate over the array and build the accumulator object.
    return arr.reduce((accumulator, item) => {
        // 1. Get the grouping key for the current item.
        const key: K = keySelector(item);

        // 2. Check if the key already exists in the accumulator.
        // If it doesn't, initialize it with an empty array.
        // The type assertion 'as T[]' is necessary here because the initial accumulator is empty,
        // but TypeScript knows the final structure must conform to Record<K, T[]>.
        if (!accumulator[key]) {
            accumulator[key] = [] as T[];
        }

        // 3. Add the current item to the array associated with the generated key.
        accumulator[key].push(item);

        // 4. Return the modified accumulator for the next iteration.
        return accumulator;
    }, {} as Record<K, T[]>); // Initialize the accumulator as an empty Record<K, T[]>
}