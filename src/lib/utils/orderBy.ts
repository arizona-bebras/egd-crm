/**
 * Orders an array of objects by a specified key and direction.
 * This function returns a new sorted array, leaving the original array unchanged (immutable sort).
 *
 * @template T The type of elements in the array.
 * @param {T[]} array The array of objects to be sorted.
 * @param {keyof T} key The key (property name) to sort by.
 * @param {'asc' | 'desc'} [direction='asc'] The sort direction ('asc' for ascending, 'desc' for descending).
 * @returns {T[]} A new, sorted array.
 */
export function orderBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
	// Use a spread operator to create a shallow copy of the array for immutability
	return [...array].sort((a, b) => {
		const valA = a[key];
		const valB = b[key];

		let comparison = 0;

		// Standard comparison logic (handles numbers and strings)
		if (valA === valB) {
			comparison = 0;
		} else if (valA === undefined || valA === null) {
			// Treat null/undefined as greater than non-null values for default ascending order
			comparison = 1;
		} else if (valB === undefined || valB === null) {
			comparison = -1;
		} else if (valA > valB) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		// Apply the sorting direction
		return direction === 'desc' ? comparison * -1 : comparison;
	});
}
