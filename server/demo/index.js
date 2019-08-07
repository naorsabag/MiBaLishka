var host = location.host;
var host_url = 'http://'+host;
var PING_URL = '/hello/';
var UPDATE_OCCUPY_URL = '/update-occupy-state/';

var tid = setInterval( async () => {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );       
  await main();
}, 100 );

async function main() {
  ping_backend();
  document.getElementById('occupationForm').addEventListener('submit', occupyFormListener);
}

async function occupyFormListener(e) {
    e.preventDefault(); //to prevent form submission
    
    var floorSelectElm = document.getElementById("floor");
    var cellSelectElm = document.getElementById("cell");
    var stateSelectElm = document.getElementById("state");

    var payload = {
        floor: floorSelectElm.value,
        cell: cellSelectElm.value,
        state: stateSelectElm.value
    }

    var res = await fetch_backend(UPDATE_OCCUPY_URL, payload);
    console.log(res);
}

function ping_backend() {
  return fetch_backend(PING_URL).then((data) => {
    console.log(data);
  });
}

async function fetch_backend(routing, payload) {
  var options = null;

  if(payload) {
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ));
    options = {
      method: "POST",
      body: data
    }
  }

  try {
    var response = await fetch(host_url+routing, options);
  
    if (response.status !== 200) {
      throw('Looks like there was a problem. Status Code: ' +
      response.status);
    }

    return resData = await response.json();

  } catch (error) {
    throw('Fetch Error :-S', error);
  }
}