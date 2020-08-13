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

## Deployment
Push to GitHub and your changes are live.
