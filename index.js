let map;
let drawnCircles = [];
const $draw = document.querySelector("#draw");
const $add = document.querySelector("#add");
const $clear = document.querySelector("#clear");
const $cords = document.querySelector("#cords");

$draw.addEventListener("click", drawCircle);
$add.addEventListener("click", addInputs);
$clear.addEventListener("click", () => {
  drawnCircles.map(circle => circle.setMap(null));
});

function initMap() {
  addInputs();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 20.676667, lng: -103.3475 },
    mapTypeId: "terrain"
  });
}

function addInputs() {
  const newGroup = document.createElement("div");
  newGroup.classList.add("group");
  newGroup.innerHTML = `
    <div>
      <label for="lat">Latitud - Punto A</label>
      <input type="number" name="lat" class="latA" />
    </div>
    <div>
      <label for="long">Longitud - Punto A</label>
      <input type="number" name="long" class="longA" />
    </div>
    <div>
      <label for="lat">Latitud - Punto B</label>
      <input type="number" name="lat" class="latB" />
    </div>
    <div>
      <label for="long">Longitud - Punto B</label>
      <input type="number" name="long" class="longB" />
    </div>
    <div>
      <label for="radius">Radio (metros)</label>
      <input type="number" name="radius" class="radius" />
    </div>
  `;

  $cords.append(newGroup);
}

function drawCircle() {
  const $latGroupA = document.querySelectorAll(".latA");
  const $longGroupA = document.querySelectorAll(".longA");
  const $latGroupB = document.querySelectorAll(".latB");
  const $longGroupB = document.querySelectorAll(".longB");
  const $radiusGroup = document.querySelectorAll(".radius");
  const circles = createCityMap(
    $latGroupA,
    $longGroupA,
    $latGroupB,
    $longGroupB,
    $radiusGroup
  );

  circles.forEach(circle => {
    drawnCircles.push(
      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: circle.center,
        radius: circle.radius
      })
    );
  });
}

function createCityMap(
  latGroupA,
  longGroupA,
  latGroupB,
  longGroupB,
  radiusGroup
) {
  const circles = [];
  for (let i = 0; i < latGroupA.length; i++) {
    let newLat =
      (parseFloat(latGroupA[i].value) + parseFloat(latGroupB[i].value)) /
      2;
    let newLong =
      (parseFloat(longGroupA[i].value) +
        parseFloat(longGroupB[i].value)) /
      2;
    let newRadius = parseFloat(radiusGroup[i].value);

    circles.push({
      center: {
        lat: newLat,
        lng: newLong
      },
      radius: newRadius
    });
  }
  return circles;
}

google.maps.event.addDomListener(window, "load", initMap);