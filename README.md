# tropy.github.io

## Prerequisites

- Ruby 2.5.0 (`ruby -v`)
- Bundler (`gem install bundler`)

## Install dependencies

```
$ bundle install
```

## Serve the site

```
$ bundle exec jekyll serve
```

… and visit at `http://127.0.0.1:4000`.

## Switch for previewing drafts of blog posts

```
$ bundle exec jekyll serve --drafts
```

## Getting rid of gem deprecation warnings

```
$ gem pristine --all --no-extensions
```

## Updating
To stay in sync with GitHub Pages run `bundle update github-pages`.

## Writing blog posts

### Headline hierarchy
In order to keep the outline of a post semantic in terms of accessibility, no heading level should be omitted. In case a visually smaller heading is wanted you can use heading classes:

```
## Looks like heading 3
{: .h3}
```

### Images
Unless you link to an external image add your photos to this location (create subfolders for year and month):

```
/assets/images/blog/
```

### Post image
You can specify one image in the post’s front matter to be used as preview image in tweets:

```
---
image: /path/to/image.png
---
```

### Responsive images
There is a way to embed images with multiple resolutions using Jekyll’s kramdown syntax:

```
![Alt text](/path/to/image.png){: srcset="/path/to/image.png 1x, /path/to/image@2x.png 2x"}
```

### Captions
For captions we have to resort to vanilla HTML:

```
<figure>
  <img srcset="…" src="…">
  <figcaption>The caption</figcaption>
</figure>
```

### Screenshots and borders
You can add a shadow and rounded corners images by adding the `screenshot` class:

```
![Alt text](/path/to/image.png){: .screenshot srcset="…"}
```

If all you want is a border, you can add the `border` class instead:

```
![Alt text](/path/to/image.png){: .border srcset="…"}
```

## Deployment
Push to GitHub and your changes are live.
