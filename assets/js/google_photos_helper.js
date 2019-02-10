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
  loadPhotos(albums.find(album => album.id ==albumId), [], undefined, undefined);
}

function makeLightboxElement(item) {
  var caption = item.description ? item.description : '';
  // Recommended format from the lightgallery docs
  return '<a href="'+item.baseUrl+'=h600" data-sub-html=".caption">' +
           '<img id="'+item.id+'" src="'+item.baseUrl+'=h100-w100-c" />'+
           '<div class="caption">' +
             '<h4>'+caption+'</h4>' +
           '</div>' +
         '</a>    ';
}

function saveToFile(albumId, loadingTriggered) {
  var album = albums.find(album => album.id ==albumId);
  if (album.mediaItems == undefined) {
    loadPhotos(album, saveToFile);
  } else {
    var filename = titleToFilename(album.title);
    var albumSubset = _.merge({"name": filename}, _.pick(album, "title"));
    var itemSubset = album.mediaItems.map(function(item) {return _.pick(item, 'baseUrl', 'mimeType', 'description');});

    var str = JSON.stringify(_.merge(albumSubset, {"mediaItems": itemSubset}), null, 2); // spacing level = 2
    download(str, filename, 'json');
  }
}

// Will retrieve the mediaItems for the given album if we don't already have them
// and after we definitely have the media it will open the lightbox.
function viewPhotosById(albumId) {
  var album = albums.find(album => album.id ==albumId);
  if (album.mediaItems == undefined) {
    loadPhotos(album, viewPhotosById);
  } else {
    var dynamicItems = album.mediaItems.map(function(item) {return {"src": item.baseUrl+'=h600?.jpg', "thumb": item.baseUrl+'=h100-w100-c?.jpg'};})
    lightGallery(document.getElementById('view-photos-' + albumId), {
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

function loadPhotosRecurse(album, mediaItems, next, callback) {
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
              if(response.result.nextPageToken != undefined) {
                console.log("Please wait while we get more mediaItems", mediaItems);
                return loadPhotosRecurse(album, mediaItems, response.result.nextPageToken, callback);                
              } else {
                console.log("last mediaItems", mediaItems);
                album.mediaItems = mediaItems;

                insertPhotosIntoPage(mediaItems);
                clickPhotos(mediaItems);

                // Execute our callback after we've recursed all the way down, there must be a better
                // way to do this, but the async shit was hurting my brain
                callback(album.id);
              }
            },
            function(err) { console.error("Execute error", err); });
}

function insertPhotosIntoPage(mediaItems) {
  // After we load the photos we need to simulate a right click
  // I think this might trick google into not expiring the links
  var newHTML = "";
  mediaItems.forEach(function(item) {
    newHTML += makeLightboxElement(item);
  });
  document.getElementById('photo-list').innerHTML = newHTML;
}

function clickPhotos(mediaItems) {
  mediaItems.forEach(function(item) {
    console.log("will click", item.id)
    $('#'+item.id).trigger({
      type: 'mousedown',
      which: 3
    });
  });
}

function loadPhotos(album, callback) {
  return loadPhotosRecurse(album, [], undefined, callback);
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
              if(response.result.nextPageToken != undefined) {
                console.log("Please wait while we get more albums", albums);
                window.albums = albums;
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
         '<button onclick="saveToFile(\''+album.id+'\')">Save to file</button>'+
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

          // TODO if needed pass a callback function to 'execute' similar to loadPhotos, anything here would
          // execute after the first page finished, not after all of them were loaded.
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

function titleToFilename(title) {
  return _.trim(title.toLowerCase().replace("sp:", "").replace(/[^A-Z0-9]+/ig, "_").replace(/^_+|_+$/g,''))+'.json';
}

// Copy/pasta from https://stackoverflow.com/a/30832210
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}