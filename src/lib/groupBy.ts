export function groupBy<T, K extends PropertyKey>(
	arr: T[],
	keySelector: (item: T) => K,
): Record<K, T[]> {
	return arr.reduce(
		(accumulator, item) => {
			const key: K = keySelector(item);

			if (!accumulator[key]) {
				accumulator[key] = [] as T[];
			}
			accumulator[key].push(item);

			return accumulator;
		},
		{} as Record<K, T[]>,
	);
}
