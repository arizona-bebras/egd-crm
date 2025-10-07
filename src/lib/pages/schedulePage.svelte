<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';

	let currentDate = $state(today(getLocalTimeZone()));
</script>

<div class="container"></div>
