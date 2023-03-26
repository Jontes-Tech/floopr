<script>
  export let loops;
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

  // Hey look, I know the dl() blob "solution" is a horible one, but here's the thing: I don't care.
  function dl(rpl, instrument) {
    // RPL stands for relative permalink
    fetch(
      `https://cdn.jsdelivr.net/gh/Jontes-Tech/floopr@latest/loops/` +
        instrument +
        "/" +
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
    if (!jaudio.paused) {
      playingRPL = "";
      jaudio.pause();
    } else {
      // get all audio elements on the page
      const audioElements = document.getElementsByTagName("audio");

      // iterate through each audio element and pause it
      if (audioElements.length) {
        for (let i = 0; i < audioElements.length; i++) {
          audioElements[i].pause();
        }
      }
      jaudio.play();
      playingRPL = rpl;
    }
  }
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
      <th scope="col" class="py-3 px-4">Download</th>
    </tr>
  </thead>
  <tbody>
    {#each loops as loop}
      {#each loop.files as ft}
        {#if ft === "mp3" || ft === "wav" || ft === "ogg"}
          <audio
            id={"audiop-" + loop.instrument.toLowerCase() + "/" + loop._id}
            loop
            src={"https://cdn.jsdelivr.net/gh/Jontes-Tech/floopr@latest/loops/" +
              loop.instrument +
              "/" +
              loop._id +
              "." +
              ft}
          />
        {/if}
      {/each}
      <tr
        on:click|stopPropagation={() => {
          audio(loop.instrument.toLowerCase() + "/" + loop._id);
        }}
        class={"border-neutral-700 " +
          (playingRPL == loop.instrument + "/" + loop._id
            ? "bg-[#23352a]"
            : "bg-neutral-800")}
      >
        <th class="py-4 px-6 font-medium whitespace-nowrap text-white">
          {loop.title}
        </th>
        <td class="py-4 px-6">
          {loop.authors.join(", ")}
        </td>
        <td class="py-4 px-6">
          {loop.timesig}
        </td>
        <td class="py-4 px-6">{loop.tempo.toString()} BPM</td>
        <td class="py-4 px-6"
          >{loop.files.includes("mid") ? "Midi" : "Audio"}</td
        >
        <td class="py-4 px-6">{loop.key}</td>
        <td class="py-4 px-6">
          {#each loop.files as ft}
            <a
              class="transition-all mr-2 bg-stone-700 px-1 rounded hover:shadow hover:outline-green-600 hover:outline hover:outline-1"
              on:click|preventDefault|stopPropagation={() => {
                dl(loop._id + "." + ft, loop.instrument);
              }}
              href={"https://cdn.jsdelivr.net/gh/Jontes-Tech/floopr@latest/loops/" +
                loop.instrument +
                "/" +
                loop._id +
                "." +
                ft}>{ft}</a
            >
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
