<script>
  import { createClient } from "@supabase/supabase-js";
  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    "https://content.floopr.org",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjc4MzE2NDAwLAogICAgImV4cCI6IDE4MzYxNjkyMDAKfQ.-dDwdGLBwjnLtBuxNoZnA6WrZW1pDAMrYVrtnPR7Qms"
  );
  let state = "loading";
  let kinds = [];
  async function fetchData() {
    const { data, error } = await supabase.from("loops").select("instrument");

    if (error) {
      state = "error";
      console.log(error);
    } else {
      state = "loaded";
      kinds = data;
    }
  }
  fetchData();
</script>

{#if (state = "loaded")}
  {#each kinds as kind}
    <a href={"/loops/" + kind.instrument} class="rounded-lg">
      <img
        class="card"
        src={"/img/instrument/" + kind.instrument + ".webp"}
        alt={kind.instrument.toUpperCase()}
      />
    </a>
  {/each}
{:else if (state = "loading")}
  Loading
{:else}
  Error, Please contact support!
{/if}

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    color: #fff;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
      rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    overflow: hidden;
    margin: 4px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .card:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
      rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.04);
  }
</style>
