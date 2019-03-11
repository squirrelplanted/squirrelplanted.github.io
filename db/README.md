https://www.npmjs.com/package/http-server
npm install --save better-sqlite3

### Why is there a sqlite database in here?
Ok, so, as I started down the jekyll static site path I realized it wasn't always going to work great for me. I *really* like data, it's actually kind of a problem. Because even though I love plants and being outside, if I'm not
careful I'll lose entire days (even weeks) to just organizing, re-organizing, and imaging ways to make things
easier to find. Nevermind that I've spent more time making it easy than I could ever spend looking.

I try to curtail these over-planning tendencies, but in the case of organizing the information about the plants, it really does make more sense to put that information in a relational database. I'm not 100% ready to give up on jekyll though.

### curl notes
```
curl -X POST -d '{"name":"cabin"}' -H "Content-Type: application/json" "http://localhost:3000/places"; echo

curl -X GET "http://localhost:3000/statuses"; echo
[{"id":0,"name":"dreaming"},{"id":1,"name":"ordered"},{"id":2,"name":"growing"},{"id":3,"name":"struggling"},{"id":4,"name":"deceased"},{"id":5,"name":"removed"}]

```

### Things to check out later
* https://github.com/atlassian/react-beautiful-dnd