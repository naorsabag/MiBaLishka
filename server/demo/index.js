var host = location.host;
var host_url = 'http://'+host;
var PING_URL = '/hello/';
var UPDATE_OCCUPY_URL = '/update-occupy-state/';
var GET_ALL_URL = '/get-current-state/';

var tid = setInterval( async () => {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );       
  await main();
}, 100 );

async function main() {
  ping_backend();
  document.getElementById('occupationForm').addEventListener('submit', occupyFormListener);
  document.getElementById('getFloorStateFormListener').addEventListener('submit', getFloorStateFormListener);
  document.getElementById('getCellStateFormListener').addEventListener('submit', getCellStateFormListener);
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

async function getFloorStateFormListener(e) {
    e.preventDefault(); //to prevent form submission
    var floorSelectElm = document.getElementById("getFloorState");

    var res = await get_floor_state(floorSelectElm.value);
}

async function getCellStateFormListener(e) {
    e.preventDefault(); //to prevent form submission
    var floorSelectElm = document.getElementById("getCellStateFloor");
    var cellSelectElm = document.getElementById("getCellStateCell");

    var res = await get_cell_state(floorSelectElm.value, cellSelectElm.value);
}

function ping_backend() {
  return fetch_backend(PING_URL).then((data) => {
    console.log(data);
  });
}

function get_all() {
    return fetch_backend(GET_ALL_URL).then((data) => {
        console.log(data);
      });
}

function get_floor_state(floor) {
    return fetch_backend(GET_ALL_URL+floor+"/").then((data) => {
        console.log(data);
      });
}

function get_cell_state(floor,cell) {
    return fetch_backend(GET_ALL_URL+floor+"/"+cell+"/").then((data) => {
        console.log(data);
      });
}

async function fetch_backend(routing, payload) {
  var options = null;

  if(payload) {
    var data = new FormData();
    data.append( "data", JSON.stringify( payload ));
    options = {
        method: "POST",
        body: JSON.stringify( payload )
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