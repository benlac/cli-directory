# cli-directory

This project is a simple scraper that retrieves a json of shops based on the city passed into the args.

## Getting started

Install dependencies

```
$ yarn
```

Creating a symlink

```bash
$ npm link
```

Now you're able to run the following cli

```bash
$ cli-directory
```

## Usage example

When installed globally the `cli-directory` executable will be exposed in your terminal.

Begin scrapping from a specific page

```bash
$ cli-directory --help
$ $ cli-directory all <city>
$ cli-directory all <city> -p <page>

```

## Arguments

| argument     | shortcut | description                 |
| ------------ | -------- | --------------------------- |
| all < city > |          | scrap city                  |
| --help       | -h       | Show help                   |
| --page       | -p       | page to begin scraping from |
