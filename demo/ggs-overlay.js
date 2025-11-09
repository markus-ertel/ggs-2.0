// ggs-overlay.js
(() => {
  const breakpoints = [
    { width: 0, columns: 8 },     // Mobile
    { width: 720, columns: 16 },  // Tablet
    { width: 1280, columns: 24 }  // Desktop / Wide
  ];

  const guideColor = 'rgba(255, 195, 0, 0.25)';
  const lineColor = 'rgba(255, 195, 0, 0.6)';
  const baseline = 24; // px Abstand für Baseline-Grid

  let overlay;
  let baselineCanvas;
  let currentColumns = 0;

  function getColumnCount() {
    const w = window.innerWidth;
    let cols = breakpoints[0].columns;
    for (const bp of breakpoints) {
      if (w >= bp.width) cols = bp.columns;
    }
    return cols;
  }

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'ggs-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = 9999;
    overlay.style.display = 'grid';
    overlay.style.gridTemplateColumns = `repeat(${currentColumns}, 1fr)`;
    overlay.style.transition = 'all 0.3s ease-out';

    // Spalten zeichnen
    for (let i = 0; i < currentColumns; i++) {
      const col = document.createElement('div');
      col.style.background = guideColor;
      overlay.appendChild(col);
    }

    // Baseline Grid Canvas
    baselineCanvas = document.createElement('canvas');
    baselineCanvas.width = window.innerWidth;
    baselineCanvas.height = window.innerHeight;
    baselineCanvas.style.position = 'absolute';
    baselineCanvas.style.top = 0;
    baselineCanvas.style.left = 0;
    drawBaseline();
    overlay.appendChild(baselineCanvas);

    document.body.appendChild(overlay);
  }

  function drawBaseline() {
    const ctx = baselineCanvas.getContext('2d');
    ctx.clearRect(0, 0, baselineCanvas.width, baselineCanvas.height);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    for (let y = 0; y < window.innerHeight; y += baseline) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(window.innerWidth, y);
      ctx.stroke();
    }
  }

  function updateOverlay() {
    const newCols = getColumnCount();
    if (newCols !== currentColumns) {
      currentColumns = newCols;
      overlay.style.gridTemplateColumns = `repeat(${currentColumns}, 1fr)`;
      overlay.innerHTML = ''; // alte Spalten löschen
      for (let i = 0; i < currentColumns; i++) {
        const col = document.createElement('div');
        col.style.background = guideColor;
        overlay.appendChild(col);
      }
      overlay.appendChild(baselineCanvas);
    }
    // Canvas neu zeichnen
    baselineCanvas.width = window.innerWidth;
    baselineCanvas.height = window.innerHeight;
    drawBaseline();
  }

  function toggleOverlay() {
    if (!overlay) {
      currentColumns = getColumnCount();
      createOverlay();
      window.addEventListener('resize', updateOverlay);
    }
    overlay.style.display = overlay.style.display === 'none' ? 'grid' : 'none';
  }

  // Taste „G“ toggelt Overlay
  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'g') toggleOverlay();
  });

  console.log('Golden Grid Overlay aktiviert (Taste "G" zum Ein-/Ausschalten)');
})();
