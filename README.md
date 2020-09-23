# appleJuiceNET als Github Page

Ein einfacher `Mirror` für die [applejuicenet.de](https://applejuicenet.de) Downloads, automatisch gehostet durch die [Github Pages](https://pages.github.com/).

Zu finden hier: https://applejuicenet.github.io

## Details

Es handelt sich um eine einfache, statische Website, welche aus dynamischen Inhalt generiert wird.

Diese Funktionalität wird mittels [jekyll](https://jekyllrb.com) hergestellt.

Die eigentliche Website liegt im [/docs/](./docs/) Ordner.

Als `jekyll` Theme wurde [bulma-clean-theme](https://github.com/chrisrhymes/bulma-clean-theme) gewählt,
da es auf dem [Bulma](https://bulma.io) CSS Framework basiert, welcher schlanker, einfacher und verständlicher ist als bspw. [Bootstrap](https://getbootstrap.com).

## warum?

Nahezu alle Downloads zu `appleJuice` werden in den dazugehörigen Repositories hier auf github angeboten.
Die Download Links zeigen **immer** auf das letzte veröffentliche Release eines Repositories, 
somit muss der Download nicht immer manuell angepasst werden, wenn z.B. ein neues [JavaGUI](https://github.com/applejuicenet/gui-java/releases) oder [phpGUI](https://github.com/applejuicenet/phpgui/releases) Release veröffentlicht wird.

Durch die Badges von [shields.io](https://shields.io) ist es außerdem möglich, stets die aktuellen Informationen wie bspw. die letzte Version an einem Download **dynamisch** anzuzeigen!


## Änderungvorschlag?

Sobald eine Änderung an den Dateien im [/docs/](./docs/) Ordner durchgeführt wurden und diese in dieses Repository `gepushed` werden, sind diese wenige Minuten später `live`. 
