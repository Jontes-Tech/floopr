# Floopr - The Free And Opensource Loop Library!

![Floopr Logo](/static/img/floopr.svg)

Floopr (pronounced "Flooper") is a library of uncopyrighted loops to use in your music, both free as in cost and freedom!

## Help the project!

### By Contributing

To add a loop to the library, do the following 10 easy steps:
NOTE: Save your work by "commiting"

1. Make a Github fork
2. Navigate to github.com/yourusername/floopr (you may have to click "view code")
3. Open the `static` folder. Here you will see the existing categories. If the one you would like to post in doesn't exist, create a folder in `static` with a concise name with only lowercase characters.
4. Upload your audio here with a filename that only has a-z, A-Z and 0-9 in a format compatible with web browsers.
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
keys: "hminor"
tempos: "113"
types: "audio"
---

<!-- TODO: Add a description here -->
No Description Provided!

```

7. Go out of your category folder and the content folder to be at the root of the repo.
8. Look for a text saying `This branch is (some number) commits ahead of floopr:master.`
9. Press "contribute" and then "Open Pull Request".
10. Click "Create Pull Request"

Thanks for contributing.

### By Donating

Donations are currently not possible.

## Copyright

The main content (anything in /static/audio) is licenced under the [CC0 License](https://creativecommons.org/share-your-work/public-domain/cc0/), while the rest is licensed under the [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.txt) license.

Thanks for reading the documentation. Enjoy Floopr :)
