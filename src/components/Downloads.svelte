<script>
  import { onMount } from "svelte";
  let downloads = 0;

  async function fetchData() {
    const response = await fetch("https://api.floopr.org/v1/publicstats");
    const json = await response.json();
    downloads = json.downloads;
  }

  onMount(fetchData);
</script>
{downloads}
