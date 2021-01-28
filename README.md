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
You can specify one (high-res) image in the post’s front matter that will be rendered on top of the post’s content (but it is not rendered in the post excerpts).

The post image can be used as a large preview image in tweets instead of the smaller Tropy icon. As Twitter crops preview images it is not recommended to use them for artwork, add artwork as image to your tweet instead of the preview.

Both a low-res (e.g. *image.png*) and a high-res (e.g. *image`@2x`.png*) version must exist.

```
---
image: /path/to/image@2x.png
twitter:
  card: summary_large_image
---
```

### Responsive images
Use a liquid tag to embed images with multiple resolutions (specify `@2x` version only):

```
{% include image.html src="/path/to/image@2x.png" alt="" %}
```

### Captions
Use a liquid tag for images with captions (specify `@2x` version for responsive images):

```
{% include figure.html src="/path/to/image@2x.png" alt="" caption="Example" %}
```

**Heads up**: use single quotes inside captions: `caption="<a href='…'>Source</a>"`

### Screenshots and borders
You can add a shadow and rounded corners to images and figures by adding the `screenshot` class:

```
{% include image.html src="…" alt="…" %}{: .screenshot}
```

If all you want is a border, you can add the `border` class instead:

```
{% include image.html src="…" alt="…" %}{: .border}
```

## Deployment
Push to GitHub and your changes are live.
