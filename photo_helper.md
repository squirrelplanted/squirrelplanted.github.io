---
title: Photo Helper
layout: page
permalink: /photos/
sitemap: false
---

<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>

<input type="text" id="myInput" onkeyup="visualSearch()" placeholder="Search for names..">

<ul id="albumList">
</ul>

<div id="relative-caption">
</div>