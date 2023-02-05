<script>
  import { onMount } from "svelte";
  let downloads = 0;

  async function fetchData() {
    const response = await fetch(
      "https://stats.jontes.page/api/stats/floopr.org/conversions?period=all&filters=%7B%7D&with_imported=true"
    );
    const json = await response.json();
    downloads = json[0].total_conversions;
  }

  onMount(fetchData);
</script>

{downloads}
