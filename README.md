# SPA-SEO

Scrapp your Single Page Web Application (SPA) for Search Engine (SEO).

Like jekyll, it will generate a static version of your website for
people (or search engine) that do not interpret javascript.

Only works with pushState web applications.

## Install

    $ npm install -g spaseo

## Usage

    Usage: spaseo [INPUT_DIR] [OUTPUT_DIR]

        --inputdir, -i     directory containings the pushState web-application               $CWD
        --outputdir, -o    directory where the cached pushState webapp will be written to    $CWD/build
        --verbose, -v      print log                                                         true


## Exemple

    $ spaseo example/in example/out/

    analyse: http://localhost:3000/
    analyse: http://localhost:3000/toto
    analyse: http://localhost:3000/search/fries
    analyse: http://localhost:3000/search/potatoe
    analyse: http://localhost:3000/search/fries/p1
    analyse: http://localhost:3000/search/fries/p2
    analyse: http://localhost:3000/search/fries/p3
    analyse: http://localhost:3000/search/tomatoes
    analyse: http://localhost:3000/search/potatoe/p1
    analyse: http://localhost:3000/search/potatoe/p2
    analyse: http://localhost:3000/search/potatoe/p3
    analyse: http://localhost:3000/search/tomatoes/p1
    analyse: http://localhost:3000/search/tomatoes/p2
    analyse: http://localhost:3000/search/tomatoes/p3
    For SEO serve example/out

## Are you looking for a pushState server ?

Use <https://github.com/Filirom1/serveAndWatch> with the -P option.

### LICENSE MIT
