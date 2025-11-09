/*
 * Golden Grid System 2.0 - Overlay Script (ggs-overlay.js)
 *
 * Liest die Grid-Konfiguration dynamisch aus den CSS-Variablen.
 * - Zeigt auf Desktop/Tablet das CSS-Grid an (18 oder 10 Spalten).
 * - Zeigt auf Mobilgeräten (wenn das CSS-Grid deaktiviert ist) ein
 *   eigenes, sinnvolles 4-Spalten-Designraster an.
 */
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. CSS-Stile für Overlay, Schalter und die beiden Modi (Grid/Mobile) ---
  const styles = `
    .ggs-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100vh;
      box-sizing: border-box;
      opacity: 0; visibility: hidden;
      pointer-events: none;
      z-index: 9998;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }
    body.ggs-overlay-active .ggs-overlay {
      opacity: 1; visibility: visible;
    }

    /* Standard-Grid-Modus (Desktop/Tablet) */
    .ggs-overlay-grid-wrapper {
      display: grid;
      grid-template-columns: repeat(var(--ggs-total-columns, 18), 1fr);
      gap: var(--ggs-gutter-width, 1.5rem);
      padding: 0 var(--ggs-gutter-width, 1.5rem);
      height: 100%;
      box-sizing: border-box;
    }
    .ggs-overlay-col {
      background-color: var(--ggs-overlay-color, rgba(255, 195, 0, 0.5));
    }

    /* Mobil-Modus: Hier definieren wir ein eigenes 4-Spalten-Raster */
    .ggs-overlay-mobile-wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr); /* 4 Spalten für die mobile Ansicht */
      gap: 1rem; /* Angepasster Gutter für Mobilgeräte */
      padding: 0 1rem; /* Feste Ränder, passend zur Demo */
      height: 100%;
      box-sizing: border-box;
    }

    /* Standardmäßig sind beide Wrapper unsichtbar */
    .ggs-overlay-grid-wrapper, .ggs-overlay-mobile-wrapper {
      display: none;
    }
    
    /* Je nach Modus wird der passende Wrapper eingeblendet */
    .ggs-overlay.ggs-is-grid-mode .ggs-overlay-grid-wrapper {
      display: grid;
    }
    .ggs-overlay.ggs-is-mobile-mode .ggs-overlay-mobile-wrapper {
      display: grid;
    }

    /* --- Schalter-Styling --- */
    .ggs-switch {
      position: fixed; top: 1rem; right: 1rem;
      width: 40px; height: 30px; padding: 5px; box-sizing: border-box;
      background: rgba(255, 255, 255, 0.8); border-radius: 4px;
      cursor: pointer; z-index: 9999;
      display: flex; flex-direction: column; justify-content: space-around;
      box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    }
    .ggs-switchBar {
      height: 4px; background-color: #333; border-radius: 2px;
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  // --- 2. HTML-Struktur für das Overlay einmalig erstellen ---
  const overlay = document.createElement('div');
  overlay.className = 'ggs-overlay';
  // Erstelle beide Wrapper; das CSS steuert, welcher sichtbar ist.
  overlay.innerHTML = `
    <div class="ggs-overlay-grid-wrapper"></div>
    <div class="ggs-overlay-mobile-wrapper"></div>
  `;
  document.body.appendChild(overlay);

  const switchBtn = document.createElement('div');
  switchBtn.className = 'ggs-switch';
  switchBtn.innerHTML = `<div class="ggs-switchBar"></div><div class="ggs-switchBar"></div><div class="ggs-switchBar"></div>`;
  document.body.appendChild(switchBtn);

  // --- 3. Logik zur Aktualisierung des Overlays ---
  let currentMode = ''; // Speichert den aktuellen Modus ('grid' oder 'mobile')

  const updateOverlay = () => {
    const totalColsString = getComputedStyle(document.documentElement).getPropertyValue('--ggs-total-columns');
    const newMode = totalColsString.trim() ? 'grid' : 'mobile';

    if (newMode === currentMode) return; // Nichts tun, wenn sich der Modus nicht ändert
    currentMode = newMode;

    overlay.classList.remove('ggs-is-grid-mode', 'ggs-is-mobile-mode');

    if (currentMode === 'grid') {
      overlay.classList.add('ggs-is-grid-mode');
      const gridWrapper = overlay.querySelector('.ggs-overlay-grid-wrapper');
      const colCount = parseInt(totalColsString.trim());
      
      // Erstelle Spalten nur, wenn sie sich von der aktuellen Anzahl unterscheiden
      if (gridWrapper.childElementCount !== colCount) {
        gridWrapper.innerHTML = ''; // Leeren
        for (let i = 0; i < colCount; i++) {
          const col = document.createElement('div');
          col.className = 'ggs-overlay-col';
          gridWrapper.appendChild(col);
        }
      }
    } else { // mobile mode
      overlay.classList.add('ggs-is-mobile-mode');
      const mobileWrapper = overlay.querySelector('.ggs-overlay-mobile-wrapper');
      // Erstelle die 4 mobilen Spalten, falls sie noch nicht existieren
      if (mobileWrapper.childElementCount === 0) {
        for (let i = 0; i < 4; i++) {
          const col = document.createElement('div');
          col.className = 'ggs-overlay-col';
          mobileWrapper.appendChild(col);
        }
      }
    }
  };

  // --- 4. Event-Listener ---
  switchBtn.addEventListener('click', () => {
    document.body.classList.toggle('ggs-overlay-active');
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateOverlay, 100);
  });

  updateOverlay(); // Initial ausführen
});
