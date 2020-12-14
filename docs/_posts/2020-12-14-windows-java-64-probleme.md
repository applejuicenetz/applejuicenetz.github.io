---
layout: post 
title: generelles Windows Java 64bit Probleme
date: 2020-12-14 11:00:00
---

Seit der **Java Version 8 Update 251** oder höher startet der appleJuice Core nicht mehr.

### Ursache

Die Ursache ist leider noch nicht ganz klar, erste Analysen laufen.

Klar ist aktuell jedoch, dass es mit der **Java Version 8 Update 241** oder niedriger weiterhin funktioniert.

### Workaround

Es empfiehlt sich ein Downgrade auf die **Java Version 8 Update 241** oder aber den `nogui` Starter aus dem Startmenü verwenden

- Entweder das Setup `jre-8u241-windows-x64.exe` aus dem Oracle-Archive von [hier](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html) (login erforderlich)
- oder das alternative JRE von AdoptOpenJDK [hier](https://api.adoptopenjdk.net/v3/installer/version/jdk8u242-b08/windows/x64/jre/hotspot/normal/adoptopenjdk?project=jdk) (direkter Download link)
    - beim Setup unbedingt beim Installieren **alle** Optionen aktivieren :heavy_exclamation_mark:

### Sonstiges

Die [appleJuice Portable](/downloads/applejuice-portable/) Version wurde entsprechend angepasst, sodass bei der `x64` Portable die **Java Version 8 Update 241** verwendet wird.
