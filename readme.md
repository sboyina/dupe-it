# dupe-it
Dupe-it is a proxy server to overcome cors issue duting web development.

# Install

Install the package globally from npm.

```
npm i -g dupe-it
```

# How to use it

Following command will launch a local proxy server to Google. Access it with http://localhost:4444. In this way, launch multiple dupe-it servers if multiple targets need to be proxied.

```
dupe-it start --t="https://www.google.com"

```
  
| Name | Alias | Value |
|--|--|--|
| target  | t | host to proxy. ex: https://www.google.com|
| port  | p | port to use. 4444 is default value.|
