# Golden Grid System 2.0 (GGS-2.0)

Eine moderne Neuinterpretation des klassischen Golden Grid Systems von Joni Korpi, aktualisiert für die Ära von CSS Grid, Custom Properties und responsiven Komponenten.

## Ursprung und Danksagung

Dieses Projekt basiert auf dem **Golden Grid System** von **Joni Korpi**.
-   Original-Code: Copyright (c) 2011 Joni Korpi
-   GGS-2.0 Modifikationen: Copyright (c) 2025 Markus Ertel

Beide unterliegen der MIT-Lizenz. Der ursprüngliche Lizenztext ist in der Datei `LICENSE.md` enthalten.

## Philosophie

GGS-2.0 behält die harmonischen 16+2 Spaltenproportionen des Originals bei, ersetzt jedoch die `float`-basierte Implementierung durch eine leistungsstarke und flexible **CSS Grid**-Engine.

### Kern-Features

*   **CSS Grid First:** Robustes, zweidimensionales Layout, das für solche Systeme geschaffen wurde.
*   **Vollständig konfigurierbar:** Passen Sie Spaltenanzahl, Abstände und mehr direkt im CSS mit **Custom Properties** an.
*   **Vereinfachtes Markup:** Weniger Notwendigkeit für Wrapper-Elemente.
*   **Konsistente Abstände:** Die `gap`-Eigenschaft sorgt für perfekte, wartbare Spaltenabstände.
*   **Modern und leichtgewichtig:** Keine komplexen Hacks, nur moderner, sauberer CSS-Code.

## Wie man es benutzt

1.  Binden Sie `GGS-2.0.css` in Ihr HTML ein.
2.  Erstellen Sie einen Container mit der Klasse `.ggs-container`.
3.  Platzieren Sie Ihre Inhaltselemente darin und weisen Sie ihnen die entsprechenden `.ggs-col-span-*`-Klassen zu.

### Beispiel-Markup

```html
<div class="ggs-container">
  <!-- Ein Header, der sich über alle 16 Spalten erstreckt -->
  <header class="ggs-col ggs-col-span-16">
    <h1>Ein goldener Titel</h1>
  </header>
  
  <!-- Zwei Blöcke, die jeweils die Hälfte des Grids (8 Spalten) einnehmen -->
  <main class="ggs-col ggs-col-start-1 ggs-col-span-8">
    <p>Dieser Inhalt befindet sich in der linken Hälfte.</p>
  </main>
  <aside class="ggs-col ggs-col-start-9 ggs-col-span-8">
    <p>Dieser Inhalt befindet sich in der rechten Hälfte.</p>
  </aside>

  <!-- Ein Footer, wieder über die volle Breite -->
  <footer class="ggs-col ggs-col-span-16">
    <p>&copy; 2025</p>
  </footer>
</div>
