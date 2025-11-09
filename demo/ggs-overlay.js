// ggs-overlay.js
(() => {
  const columns = 16; // Anzahl der Spalten
  const guideColor = 'rgba(255, 195, 0, 0.25)';
  const lineColor = 'rgba(255, 195, 0, 0.6)';
  const baseline = 24; // px Abstand für Baseline-Grid

  let overlay;

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
    overlay.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    // Spalten zeichnen
    for (let i = 0; i < columns; i++) {
      const col = document.createElement('div');
      col.style.background = guideColor;
      overlay.appendChild(col);
    }

    // Baseline Grid
    const baselineCanvas = document.createElement('canvas');
    baselineCanvas.width = window.innerWidth;
    baselineCanvas.height = window.innerHeight;
    baselineCanvas.style.position = 'absolute';
    baselineCanvas.style.top = 0;
    baselineCanvas.style.left = 0;
    const ctx = baselineCanvas.getContext('2d');
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    for (let y = 0; y < window.innerHeight; y += baseline) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(window.innerWidth, y);
      ctx.stroke();
    }
    overlay.appendChild(baselineCanvas);

    document.body.appendChild(overlay);
  }

  function toggleOverlay() {
    if (!overlay) {
      createOverlay();
    }
    overlay.style.display = overlay.style.display === 'none' ? 'grid' : 'none';
  }

  // Taste „G“ toggelt Overlay
  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'g') toggleOverlay();
  });

  console.log('Golden Grid Overlay aktiviert (Taste "G" zum Ein-/Ausschalten)');
})();
