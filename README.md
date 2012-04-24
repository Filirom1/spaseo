# SPA-SEO

Make your pushStae Web application readable by Search-Engine, or browser
that do not supprt javascript.

Only works with pushState web applications.

## Install

    $ npm install -g spaseo

## spaseo cli

Scrapp your Single Page Web Application (SPA) for Search Engine (SEO).

Like jekyll, it will generate a static version of your website for
people (or search engine) that do not interpret javascript.

### Usage

    Usage: spaseo [INPUT_DIR] [OUTPUT_DIR]

        --inputdir, -i     directory containings the pushState web-application               $CWD
        --outputdir, -o    directory where the cached pushState webapp will be written to    $CWD/build
        --verbose, -v      print log                                                         true


### Exemple

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


## spaseo-proxy

Add a reverse proxy in front of your HTTP Server, each url matching the
glob pattern `include` with be computed by a headless browser.

When search engines will analyse your pushState web-application via
spaseo-proxy, they will be able to read the content.

### Usage

Usage: spaseo-proxy [target]

    --host           The hostname to listen on                       0.0.0.0
    --port, -p       The port to listen on                           8000
    --target, -t     The target to proxify
    --include, -i    A glob pattern that match targets to process    {**/index.html,**/,**/?}
    --help, -h       show usage                                      false
    --verbose, -v    print log                                       true


### Exemple

    $ serve --pushState --port 3000 example/in &
    $ spaseo-proxy http://127.0.0.1:3000 -i "{/,/toto,**/search/**}" &
    proxify http://127.0.0.1:3000/ on port 8000

    $ chromium http://127.0.0.1:8000/search/fries &
    analyse: http://127.0.0.1:3000/search/fries
    proxify http://127.0.0.1:3000/css/style.css
    proxify http://127.0.0.1:3000/css/normalize.css
    proxify http://127.0.0.1:3000/css/todo.css
    proxify http://127.0.0.1:3000/css/utils.css



## Are you looking for a pushState server ?

Use <https://github.com/Backbonist/serveAndWatch> with the `--pushState`, `-P` option.

### LICENSE MIT


### Special thanks to

[ZombieJs](https://github.com/assaf/zombie)
[http-proxy](https://github.com/nodejitsu/node-http-proxy)
... (see package.json)
