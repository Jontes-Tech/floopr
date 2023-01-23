<script defer lang="js">
  import Soundfont from "soundfont-player";
  export let passedpost;
  let posts = passedpost.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );

  function audio(rpl) {
    let a = document.getElementById("audiop-" + rpl);
    document.getElementById("playbtn-" + rpl).innerHTML = a.paused
      ? '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>'
      : '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>';
    if (!a.paused) {
      a.pause();
    } else {
      a.play();
    }
  }
  function midi(rpl) {
    Soundfont.instrument(new AudioContext(), "acoustic_grand_piano").then(
      function (piano) {
        piano.play("C4");
      }
    );
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
          {post.frontmatter.title}
        </th>
        <td class="py-4 px-6">
          {post.frontmatter.authors.join(", ")}
        </td>
        <td class="py-4 px-6">
          {post.frontmatter.timesig.replace("SLASH", "/")}
        </td>
        <td class="py-4 px-6">{post.frontmatter.tempo} BPM</td>
        <td class="py-4 px-6">{post.frontmatter.type}</td>
        <td class="py-4 px-6">{post.frontmatter.key}</td>
        <td class="py-4 px-6">
          <audio id={"audiop-" + post.url} loop>
            {#each post.frontmatter.files as ext}
            {#if ext === "mp3" || ext === "wav" || ext === "ogg"}
              <source
                src={"https://cdn.jsdelivr.net/gh/Jontes-Tech/floopr@master/public" +
                  post.url +
                  "." +
                  ext}
              />
              {/if}
            {/each}
          </audio>
          <button
            on:click={() => {
              if (post.frontmatter.type === "audio") {
                audio(post.url);
              } else {
                midi(post.url);
              }
            }}
            id={"playbtn-" + post.url}
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          </button>
        </td>
        <td class="py-4 px-6">
          {#each post.frontmatter.files as ext}
            <a
              class="hover:underline transition-all"
              download={"floopr-" + post.url?.split("/").pop() + "." + ext}
              href={"https://cdn.jsdelivr.net/gh/Jontes-Tech/floopr@master/public" +
                post.url?.toString() +
                "." +
                ext}>{ext}</a
            ><span>, </span>
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
