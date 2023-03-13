<script>
  const endings = {
    ves: "fe",
    ies: "y",
    i: "us",
    zes: "ze",
    ses: "s",
    es: "e",
    s: "",
  };
  let playingRPL = "";
  function dl(rpl, instrument) {
    // RPL stands for relative permalink
    fetch(
      `https://content.floopr.org/storage/v1/object/public/loops/` +
        instrument + "/" +
        rpl
    )
      .then((response) => response.blob())
      .then((blob) => {
        // Do something with the downloaded file blob
        console.log("File downloaded successfully", blob);
        // Create a link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "floopr.org-" + rpl;

        // Programmatically click the link to trigger the download
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file", error);
      });
  }
  function audio(rpl) {
    let jaudio = document.getElementById("audiop-" + rpl);
    document.getElementById("playbtn-" + rpl).innerHTML = jaudio.paused
      ? '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>'
      : '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>';
    if (!jaudio.paused) {
      playingRPL = "";
      jaudio.pause();
    } else {
      // get all audio elements on the page
      const audioElements = document.getElementsByTagName("audio");

      // iterate through each audio element and pause it
      for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
      }
      jaudio.play();
      playingRPL = rpl;
      console.log(playingRPL);
    }
  }

  import { createClient } from "@supabase/supabase-js";
  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    "https://content.floopr.org",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjc4MzE2NDAwLAogICAgImV4cCI6IDE4MzYxNjkyMDAKfQ.-dDwdGLBwjnLtBuxNoZnA6WrZW1pDAMrYVrtnPR7Qms"
  );
  let loops = [];
  let state = "default";
  async function fetchData() {
    state = "loading";
    const { data, error } = await supabase
      .from("loops")
      .select()
      .eq("instrument", "drums");

    if (error) {
      state = "error";
      console.log(error);
    } else {
      state = "loaded";
      loops = data;
    }
  }
  fetchData();
</script>

<table class="w-full text-sm text-left text-stone-400 bg-neutral-900">
  <thead class="text-xs bg-neutral-700 text-stone-400">
    <tr>
      <th id="title" scope="col" class="py-3 px-4">Title</th>
      <th id="contributors" scope="col" class="py-3 px-4">Contributor</th>
      <th id="timesignature" scope="col" class="py-3 px-4">Time Signature</th>
      <th id="tempo" scope="col" class="py-3 px-4">Tempo</th>
      <th id="type" scope="col" class="py-3 px-4">Type</th>
      <th id="key" scope="col" class="py-3 px-4">Key</th>
      <th scope="col" class="py-3 px-4">Play</th>
      <th scope="col" class="py-3 px-4">Download</th>
    </tr>
  </thead>
  <tbody>
    {#if state === "default"}
      <tr class="border-neutral-700 bg-neutral-800">
        <td class="py-4 px-6" colspan="8"
          >Loading (Did you enable JavaScript?)</td
        >
      </tr>
    {:else if state === "loading"}
      <tr class="border-b border-neutral-700 bg-neutral-800">
        <td class="py-4 px-6" colspan="8">Loading</td>
      </tr>
    {:else if loops.length === 0}
      <tr class="border-b border-neutral-700 bg-neutral-800">
        <td class="py-4 px-6" colspan="8"
          >No loops found with this instrument :/</td
        >
      </tr>
    {:else if state === "loaded"}
      {#each loops as post}
        <tr
          class={"border-neutral-700 " +
            (playingRPL == post.instrument + "/" + post.name
              ? "bg-[#23352a]"
              : "bg-neutral-800")}
        >
          <th class="py-4 px-6 font-medium whitespace-nowrap text-white">
            {post.title}
          </th>
          <td class="py-4 px-6">
            {post.authors.join(", ")}
          </td>
          <td class="py-4 px-6">
            {post.timesig}
          </td>
          <td class="py-4 px-6">{post.tempo.toString()} BPM</td>
          <td class="py-4 px-6">{post.filetype === "mid" ? "Midi" : "Audio"}</td
          >
          <td class="py-4 px-6">{post.key}</td>
          <td class="py-4 px-6">
            {#each post.files as ft}
              {#if ft === "mp3" || ft === "wav" || ft === "ogg"}
                <audio
                  id={"audiop-" +
                    post.instrument.toLowerCase() +
                    "/" +
                    post.name}
                  loop
                  src={"https://content.floopr.org/storage/v1/object/public/loops/" +
                    post.instrument +
                    "/" +
                    post.name +
                    "." +
                    ft}
                />
              {/if}
            {/each}
            <button
              id={"playbtn-" + post.instrument.toLowerCase() + "/" + post.name}
              on:click={() => {
                audio(post.instrument.toLowerCase() + "/" + post.name);
              }}
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            </button>
          </td>
          <td class="py-4 px-6">
            {#each post.files as ft}
              <a
                class="hover:underline transition-all"
                download
                href={"https://content.floopr.org/storage/v1/object/public/loops/" +
                  post.instrument +
                  "/" +
                  post.name +
                  "." +
                  ft}>{ft}</a
              >
            {/each}
          </td>
        </tr>
      {/each}
    {:else}
      <tr class="border-b border-neutral-700 bg-neutral-800">
        <td class="py-4 px-6" colspan="8">Error</td>
      </tr>
    {/if}
  </tbody>
</table>
