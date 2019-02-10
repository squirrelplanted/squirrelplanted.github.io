---
---

/**
 * Sample JavaScript code for photoslibrary.albums.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */
function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

function loadPhotosById(albumId) {
  // TODO check for no album by that ID
  loadPhotos(albums.find(album => album.id ==albumId), []);
}

function makeLightboxElement(item) {
  var caption = item.description ? item.description : '';
  // Recommended format from the lightgallery docs
  return '<a href="'+item.baseUrl+'=h600" data-sub-html=".caption">' +
           '<img src="'+item.baseUrl+'=h100-w100-c" />'+
           '<div class="caption">' +
             '<h4>'+caption+'</h4>' +
           '</div>' +
         '</a>    ';
}

function viewPhotosByIdOLD(albumId) {
  var mediaItems = albums.find(album => album.id ==albumId).mediaItems;
  var innerHTML = "";
  mediaItems.forEach(function(item) {
    innerHTML = innerHTML + makeLightboxElement(item);
  });

  document.getElementById("relative-caption").innerHTML = innerHTML;

  // Call the lightgallery create
  lightGallery(document.getElementById('relative-caption'), {
    subHtmlSelectorRelative: true,
    thumbnail:true,
    animateThumb: false,
    showThumbByDefault: true,
    download: false,
    "data-download-url": false
  }); 
}

// Will retrieve the mediaItems for the given album if we don't already have them
// and after we definitely have the media it will open the lightbox.
function viewPhotosById(albumId) {
  var album = albums.find(album => album.id ==albumId);
  if (album.mediaItems == undefined) {
    loadPhotos(album).then(function(response) {
       viewPhotosById(albumId);
    });
  } else {
    var dynamicItems = album.mediaItems.map(function(item) {return {"src": item.baseUrl+'=h600?.jpg', "thumb": item.baseUrl+'=h100-w100-c?.jpg'};})
    lightGallery(document.getElementById('view-photos-'+albumId), {
        dynamic: true,
        dynamicEl: dynamicItems,
        thumbnail:true,
        animateThumb: false,
        showThumbByDefault: true,
        download: false,
        "data-download-url": false
    })
  }
}

function loadPhotos(album, mediaItems, next) {
  arguments = {"pageSize": 100, "albumId": album.id};
  if (mediaItems == undefined) {
    mediaItems = [];
  }
  if (next != undefined) {
    arguments['pageToken'] = next;
  }
  return gapi.client.photoslibrary.mediaItems.search(arguments)
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              mediaItems = mediaItems.concat(response.result.mediaItems);
              if(false && response.result.nextPageToken != undefined) {
                console.log("Please wait while we get more mediaItems", mediaItems);
                loadPhotos(album, mediaItems, response.result.nextPageToken);                
              } else {
                console.log("last mediaItems", mediaItems);
                album.mediaItems = mediaItems;
                document.getElementById(album.id).innerHTML = makeListElementInnerHTML(album);
              }
            },
            function(err) { console.error("Execute error", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(albums, next) {
  arguments = {"pageSize": 50};
  if (next != undefined) {
    arguments['pageToken'] = next;
  }
  return gapi.client.photoslibrary.albums.list(arguments)
      .then(function(response) {
              appendAlbumsToList(response.result.albums);

              // Handle the results here (response.result has the parsed body).
              albums = albums.concat(response.result.albums);
              if(false && response.result.nextPageToken != undefined) {
                console.log("Please wait while we get more albums", albums);
                execute(albums, response.result.nextPageToken);                
              } else {
                console.log("last albums", albums);
                window.albums = albums;
              }
            },
            function(err) { console.error("Execute error", err); });
}

function appendAlbumsToList(albums) {
  albums.forEach(album => {
    var node = document.createElement("LI");
    node.setAttribute("id", album.id);
    node.innerHTML = makeListElementInnerHTML(album);
    document.getElementById("albumList").appendChild(node);      
  })
}

function makeListElementInnerHTML(album) {
  return '<button onclick="copyTextToClipboard(\''+album.id+'\')">Copy ID</button>'+
         '<button id="view-photos-'+album.id+'" onclick="viewPhotosById(\''+album.id+'\')">View Photos</button>' +
         '<a href="#">'+album.title+'</a>';
}

function find(title_search) {
  var result =  window.albums.filter(album => album.title ? album.title.toLowerCase().includes(title_search.toLowerCase()) : false);
  result.forEach(album => console.log(album.id, ":", album.title));
  return result;
}

window.onload = function() {
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: window.GOOGLE_PHOTOS_CLIENT_ID });

    authenticate().then(function(response) {
      loadClient().then(function(response) {
        execute([]).then(function(response) {
          // Phew, promises get nesty really fast. In a perfect world, this means we have all albums in scope
          // and we can now search them and do export-y things.
        });
      });
    });
  });
};

function visualSearch() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("albumList");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
