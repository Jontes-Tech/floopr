# Contribute to Floopr
To add a loop to the library, do the following 10 easy steps:
NOTE: Save your work by "commiting"

You need a GitHub Account

1. Make a Github fork
2. Navigate to github.com/yourusername/floopr (you may have to click "view code")
3. Open the `static` folder. Here you will see the existing categories. If the one you would like to post in doesn't exist, create a folder in `static` with a concise name with only lowercase characters and dashes.
4. Upload your audio here with a filename that only has a-z and dashes in a format compatible with web browsers.
5. Now navigate out of the `static` directory
6. Navigate into the `content` directory. If you on step 3 created a new directory, do the same here, but in your new directory create a `_index.md` file with the following content:

```markdown
---
title: "Rock"
---

Rock is a type of music
```

1. If you did not create a new folder, navigate into the same one you did with the audio file.
2. Create a new file with the filename of the audio-file with .md added at the end (example `rickastley.mp3.md`). Add this content to the file:

```markdown
---
title: "Never Gonna Give You Up"
authors: ["RickAstley"]
keys: "b-minor"
tempos: "113"
types: "audio"
timesigs: "4-4"
---
{{< md >}}

<!-- TODO: Add a description here -->
No Description Provided!

```

7. Go out of your category folder and the content folder to be at the root of the repo.
8. Look for a text saying `This branch is (some number) commits ahead of floopr:master.`
9. Press "contribute" and then "Open Pull Request".
10. Click "Create Pull Request"

Thanks for contributing.
