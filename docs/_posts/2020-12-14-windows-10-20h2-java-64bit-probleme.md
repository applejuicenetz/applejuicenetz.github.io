---
layout: post
title: Windows 10 20h2 Java 64bit Probleme
date: 2020-12-14 14:00:00
---

Seit dem Windows 10 Build **20h2** startet der Core mit dem **weißen Fenster** nicht mehr (korrekt).

### Darstellung

- das weiße Fenster zeigt in den ersten 5 Zeilen eine Fehlermeldung bevor die Zeile `Start appleJuice Client` erscheint
- der Core lässt sich nicht mehr in den Systemtray minimieren
- der Core verschwindet, wenn man das `X` drückt (ist aber über das GUI noch erreichbar)

### Ursache

Die Ursache ist leider noch nicht ganz klar, erste Analysen laufen.

### Workaround 

Als Workaround bitte den `x64 nogui` Starter aus dem Startmenü nehmen.

> Unter Windows 10 Build **20h2** hilft ein Downgrade der Java Version leider **nicht** :heavy_exclamation_mark:

### Sonstiges

Im [appleJuice Setup](/downloads/applejuice-windows/) ab Version `2.0.1` wurde die Startmenü Verknüpfung _temporär_ auf den `nogui` Starter umgestellt.   
