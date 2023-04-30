console.clear();

// Fire gradient (black, red, orange, yellow, white)
const COLORS = [
  "#000000",
  "#070707",
  "#1F0707",
  "#2F0F07",
  "#470F07",
  "#571707",
  "#671F07",
  "#771F07",
  "#8F2707",
  "#9F2F07",
  "#AF3F0F",
  "#BF470F",
  "#C7470F",
  "#DF4F0F",
  "#DF5707",
  "#DF5707",
  "#D75F07",
  "#D75F07",
  "#D7670F",
  "#CF6F0F",
  "#CF770F",
  "#CF7F0F",
  "#CF8717",
  "#C78717",
  "#C78F17",
  "#C7971F",
  "#BF9F1F",
  "#BF9F1F",
  "#BFA727",
  "#BFA727",
  "#BFAF2F",
  "#B7AF2F",
  "#B7B72F",
  "#B7B737",
  "#CFCF6F",
  "#DFDF9F",
  "#EFEFC7",
  "#FFFFFF"
];

// Convert the hex pal to a 0xAABBGGRR format
const PAL = COLORS.map((hexColor) => {
  const red = parseInt(hexColor.substr(1, 2), 16);
  const green = parseInt(hexColor.substr(3, 2), 16);
  const blue = parseInt(hexColor.substr(5, 2), 16);
  const alpha = 0xff;
  return (alpha << 24) | (blue << 16) | (green << 8) | red;
});

// Set up screen canvas
const c = document.querySelector("canvas");
const CW = c.width;
const CH = c.height;
const ctx = c.getContext("2d");

// Config & toggle state
const HOT_AREA_BOT = CH - 1;
const HOT_AREA_TOP = CH - 8;
const MAX_HEAT = PAL.length - 1;
let isOn = true;

// Image data buffer for direct manipulation
// (much more performant than fillStyle/drawRect calls!)
const imageData = ctx.createImageData(CW, CH);
const uint32Data = new Uint32Array(imageData.data.buffer);

// Separate buffer to calculate propagated 'heat'
const data = new Uint8ClampedArray(CW * CH);

// Randomly increase the 'heat' of the last row of pixes.
const setFire = () => {
  const ly = HOT_AREA_BOT * CW;
  for (let x = 0; x < CW; x++) {
    const p = ly + x;
    if (data[p] < MAX_HEAT) {
      data[p] += Math.round(Math.random()) & 3;
    }
  }
};

// Randomly decrease the 'heat' of the last few rows.
const stopFire = () => {
  for (let y = HOT_AREA_TOP; y <= HOT_AREA_BOT; y++) {
    for (let x = 0; x < CW; x++) {
      const p = y * CW + x;
      if (data[p] > 0) {
        data[p] -= Math.round(Math.random()) & 3;
      }
    }
  }
};

// Calculate the 'heat' levels of each pixel.
// 'Heat' is a palette index.
const update = () => {
  if (isOn) {
    setFire();
  } else {
    stopFire();
  }
  for (let x = 0; x < CW; x++) {
    for (let y = 0; y < CH; y++) {
      // Copy the current pixel's 'heat' to the
      // pixel above it, reduced in heat slightly,
      // and with some horizontal drift
      const p = y * CW + x;
      const r = Math.round(Math.random() * 3) & 3;
      const t = p - CW - r + 1;
      data[t] = data[p] - (r & 1);
    }
  }
};

// Draw the display.
const render = () => {
  // Use the calculated pixel values to fill
  // the offscreen canvas with color data
  for (let i = 0; i < uint32Data.length; i++) {
    uint32Data[i] = PAL[data[i]];
  }
  ctx.putImageData(imageData, 0, 0);
};

// Vars for framerate
let _pf = Date.now(),
  _cf = 0;
const ft = 1000 / 35; // random PSX Doom-esque refresh rate *shrug*
let isRunning = true;

// Called every time the screen refreshes
// (determined by the browser).
const loop = () => {
  if (!isRunning) return;
  requestAnimationFrame(loop);
  _cf = Date.now();
  // Update and render at a consistent framerate
  if (_cf - _pf >= ft) {
    try {
      update();
      render();
      _pf = _cf;
    } catch (e) {
      isRunning = false;
    }
  }
};

// Toggle 'heat' at the bottom of the screen on click
c.addEventListener("click", () => {
  isOn = !isOn;
});

// Burn!
setFire();
loop();
