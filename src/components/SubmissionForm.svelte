<script>
  let captcha;
  import HCaptcha from "svelte-hcaptcha";
  async function submit() {
    let hash = await send(document.getElementById("audio").files[0], true);
    let midi =
      document.getElementById("type").value === "midi"
        ? await send(document.getElementById("audio").files[0], false)
        : "";
    fetch(
      localStorage.getItem("jontedebug")
        ? "http://localhost:3000/v1/contribute"
        : "https://api.floopr.org/v1/contribute",
      {
        method: "POST",
        body: JSON.stringify({
          title: document.getElementById("title").value,
          category: document.getElementById("category").value,
          email: document.getElementById("email").value,
          creator: document.getElementById("creator").value,
          key: document.getElementById("key").value,
          tempo: document.getElementById("tempo").value,
          timesig:
            document.getElementById("timesig1").value +
            "SLASH" +
            document.getElementById("timesig2").value,
          type: document.getElementById("type").value,
          filename: String(document.getElementById("title").value)
            .toLowerCase()
            .replace(/[ \-]+/g, "-")
            .replace(/[^a-z\d\-]/gi, ""),
          audio: hash,
          midi: document.getElementById("type").value === "midi" ? midi : "",
          token: hcaptcha.getResponse(),
          filetype: document
            .getElementById("audio")
            .files[0].name.split(".")
            .pop(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        alert("Thank you for submitting!");
        console.log(captcha.token);
        return response;
      })
      .then(function (response) {})
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }
  async function send(d, r) {
    if (document.getElementById("type").value === "audio") {
      console.log("It's audio");
      const res = await fetch("https://cdn.nodesite.eu/put", {
        method: "PUT",
        body: d,
      });

      const hash =
        res.headers.get("content-type")?.toLowerCase() == "application/json"
          ? (await res.json()).hash
          : await res.text();

      return hash;
    } else if (r) {
      console.log("It's raw midi");
      const res = await fetch("https://cdn.nodesite.eu/put", {
        method: "PUT",
        body: d,
      });

      const hash =
        res.headers.get("content-type")?.toLowerCase() == "application/json"
          ? (await res.json()).hash
          : await res.text();

      return hash;
    } else {
      console.log("It's MIDI");
      const res = await fetch("https://api.floopr.org/v1/synth", {
        method: "POST",
        body: d,
        headers: {
          "Content-Type": "audio/midi",
          "Content-Length": d.length,
        },
      });

      const hash = res.name;

      return hash;
    }
  }

  const handleError = () => {
    captcha.reset();
  };
</script>

<form id="form" class="p-4" on:submit|preventDefault={submit}>
  <button type="reset" class="text-red-500">Clear</button>
  <div class="mb-4">
    <label for="email" class="block text-sm font-medium text-white"
      >Your email</label
    >
    <input
      type="email"
      required
      id="email"
      name="email"
      class="w-64 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
      placeholder="anonymous@floopr.org"
    />
    <p id="helper-text-explanation" class="mt-2 text-sm text-neutral-400">
      We never share your email, but we do store it securely.
    </p>
  </div>
  <div class="mb-4">
    <label for="title" class="block text-sm font-medium text-white"
      >The Title of the loop</label
    >
    <input
      type="text"
      required
      id="title"
      name="title"
      class="w-64 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
      placeholder="Never Gonna Give You Up"
    />
  </div>
  <div class="mb-4">
    <label for="creator" class="block text-sm font-medium text-white"
      >Creator (Usually your name), in quotes.</label
    >
    <input
      type="text"
      required
      id="creator"
      name="creator"
      class="w-64 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
      placeholder='"Rick Astley", "John Doe"'
    />
  </div>
  <div class="mb-4">
    <label for="tempo" class="block text-sm font-medium text-white"
      >Tempo of the loop (in BPM, if unsure, select 0)</label
    >
    <input
      type="number"
      required
      id="tempo"
      name="tempo"
      class="w-64 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
      placeholder="113"
    />
  </div>
  <div class="mb-4">
    <label for="key" class="block mb-2 text-sm font-medium text-white"
      >Key of the loop</label
    >
    <select
      id="key"
      required
      name="key"
      class="w-64 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
    >
      <option>None</option>
      <option>A-Minor</option>
      <option>A-Major</option>
      <option>A#-Minor</option>
      <option>A#-Major</option>
      <option>B-Minor</option>
      <option>B-Major</option>
      <option>C-Minor</option>
      <option>C-Major</option>
      <option>C#-Minor</option>
      <option>C#-Major</option>
      <option>D-Minor</option>
      <option>D-Major</option>
      <option>D#-Minor</option>
      <option>D#-Major</option>
      <option>E-Minor</option>
      <option>E-Major</option>
      <option>F-Minor</option>
      <option>F-Major</option>
      <option>F#-Minor</option>
      <option>F#-Major</option>
      <option>G-Minor</option>
      <option>G-Major</option>
      <option>G#-Minor</option>
    </select>
  </div>
  <div class="mb-4">
    <label for="type" class="block mb-2 text-sm font-medium text-white"
      >Type of Loop</label
    >
    <select
      id="type"
      required
      name="type"
      class="w-64 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
    >
      <option value="audio">Audio</option>
      <option value="midi">Midi</option>
    </select>
  </div>

  <div class="mb-4">
    <label for="category" class="block mb-2 text-sm font-medium text-white"
      >Category</label
    >
    <select
      id="category"
      required
      name="category"
      class="w-64 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
    >
      <option value="other">Other or Don't Know</option>
      <option value="bass">Bass</option>
      <option value="drums">Drums</option>
      <option value="fx">Fx</option>
      <option value="guitar">Guitar</option>
      <option value="keys">Keys</option>
      <option value="orchestral">Orchestal</option>
      <option value="vocals">Vocal</option>
    </select>
  </div>
  <div class="mb-4">
    <label for="timesig" class="block text-sm font-medium text-white"
      >Time Signature</label
    >
    <div class="flex" id="timesig">
      <input
        type="number"
        required
        id="timesig1"
        class="mr-2 w-16 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
        placeholder="4"
      />
      <span
        class="border text-sm rounded-lg block p-2.5 bg-neutral-600 border-neutral-600"
        >/</span
      >
      <input
        type="number"
        required
        id="timesig2"
        class="ml-2 w-16 border text-sm rounded-lg block p-2.5 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-darkGreen focus:border-darkGreen"
        placeholder="4"
      />
    </div>
  </div>
  <div class="mb-4">
    <label class="block mb-2 text-sm font-medium text-white" for="audio"
      >Upload file (mp3, wav, ogg)</label
    >
    <input
      name="audio"
      required
      accept="audio/mpeg, audio/ogg, audio/wav, audio/midi, audio/x-midi"
      class="p-2 block w-full text-sm rounded-lg border cursor-pointer text-neutral-400 focus:outline-none bg-neutral-700 border-neutral-600"
      id="audio"
      type="file"
    />
  </div>
  <div class="mb-4">
    <HCaptcha
      bind:this={captcha}
      on:error={handleError}
      theme="dark"
      sitekey="4bec7ac0-beac-4fc3-b7c6-cf74e5b27601"
    />
    <div class="flex items-start mb-6">
      <div class="flex items-center h-5">
        <input
          id="terms"
          type="checkbox"
          value=""
          class="w-4 h-4 rounded border focus:ring-3 bg-gray-700 border-gray-600 focus:ring-darkGreen ring-offset-gray-800"
          required
        />
      </div>
      <label for="terms" class="ml-2 text-sm font-medium text-gray-300"
        >I agree with the
        <a href="/terms" class="text-lightGreen hover:underline">terms</a> and the
        fact that we store your entered details and Internet Protocol Adress (securely).</label
      >
    </div>
    <button
      type="submit"
      class="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-darkGreen focus:ring-lightGreen"
    >
      Upload to Floopr.org
    </button>
  </div>
</form>
