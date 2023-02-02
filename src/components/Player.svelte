<script defer lang="js">
  export let posts;

  function audio(rpl) {
    let jaudio = document.getElementById("audiop-" + rpl);
    document.getElementById("playbtn-" + rpl).innerHTML = jaudio.paused
      ? '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>'
      : '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>';
    if (!jaudio.paused) {
      jaudio.pause();
    } else {
      jaudio.play();
    }
  }
</script>

<table class="w-full text-sm text-left text-gray-400 bg-neutral-900">
  <thead class="text-xs bg-neutral-700 text-gray-400">
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
    {#each posts as post}
      <tr class="border-b border-neutral-700 bg-neutral-800">
        <th class="py-4 px-6 font-medium whitespace-nowrap text-white">
          {post.title}
        </th>
        <td class="py-4 px-6">
          {post.authors.join(", ")}
        </td>
        <td class="py-4 px-6">
          {post.timesig.replace("SLASH", "/")}
        </td>
        <td class="py-4 px-6">{post.tempo} BPM</td>
        <td class="py-4 px-6">{post.type}</td>
        <td class="py-4 px-6">{post.key}</td>
        <td class="py-4 px-6">
          <audio id={"audiop-" + post.url} loop>
            {#each post.files as ext}
              {#if ext === "mp3" || ext === "wav" || ext === "ogg"}
                <source
                  src={"/loops/" + post.instrument + "/" + post.name + "." + ext}
                />
              {/if}
            {/each}
          </audio>
          <button
            on:click={() => {
              audio(post.url);
            }}
            id={"playbtn-" + post.url}
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          </button>
        </td>
        <td class="py-4 px-6">
          {#each post.files as ext}
            <a
              class="hover:underline transition-all"
              download={"floopr-" + post.url?.split("/").pop() + "." + ext}
              href={"/loops/" + post.instrument + "/" + post.name + "." + ext}>{ext}</a
            ><span>, </span>
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
