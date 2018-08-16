---
title: "WordPress: Footer Menü als String erstellen"
description: "Ob Impressum, Datenschutzerklärung oder Mediadaten — ein Footer-Menü ist auf vielen Webseiten obsolet."
author: "flabw"
date: 2014-04-29T17:26:06+01:00
publishdate: 2014-04-29T17:26:06+01:00
#lastmod: 
type: "article"
images:
  - "/images/articles/wordpress.jpg"
  - "/images/articles/wordpress@2x.jpg"
urls:
  back: "/artikel/"
draft: false
---

Ob Impressum, Datenschutzerklärung oder Mediadaten — ein Footer-Menü ist auf vielen Webseiten obsolet. Doch WordPress macht es uns leider nicht leicht, denn die übliche Funktion gibt das Menü statt als String mit Trennern als Liste aus. Eine kleine eigene Funktion schafft hier aber schnell Abhilfe.

![WordPress](/images/articles/wordpress.jpg 'WordPress')

Schnell ist ein geeignetes Theme für WordPress heruntergeladen oder gekauft, doch viele Entwickler denken nicht an ein einfaches Footer-Menü. Deshalb müssen selbst Nutzer ohne Programmierkenntnisse heran und verzweifeln selbst nach langem Recherchieren.

Üblicherweise werden Menüs zuerst in der **functions.php** des Themes registriert. In den meisten Fällen sollte bereits ein Menü vom Entwickler eingetragen worden sein. Um das zweite Menü für den Footer in WordPress zu registrieren, solltest Du also zuerst ihren Code (zumeist das »Primary Menu«) suchen und um einen zweiten Eintrag ergänzen.

```php
<?php
register_nav_menus(array(
  'primary' => __('Primary Menu', 'textdomain' ),
  'secondary' => __('Secondary Menu', 'textdomain' )
));
?>
```

[Gist](https://gist.github.com/mirkoschubert/334c7909e0692832ed30c20b54d1f80d)

Die Textdomain für die Übersetzung übernimmst Du dabei einfach nur aus dem ersten Eintrag. Vergiss auch nicht das Komma, um das Array fortzusetzen.

Im Theme werden die Menüs dann über die Funktion `wp_nav_menu()` aufgerufen. Das kannst Du in den meisten Fällen in der **header.php** einsehen:

```php
<?php wp_nav_menu(array('theme_location' => 'primary')); ?>
```

[Gist](https://gist.github.com/mirkoschubert/e6c4c81349f71e6da85e59ad99a19fe9)

Theoretisch könntest Du die Zeile also einfach nur kopieren, in der **footer.php** an geeigneter Stelle einfügen und das »primary« mit dem »secondary« austauschen. Das Problem dabei ist aber, dass die Funktion das Menü als Liste ausgibt und Du sie dann noch zusätzlich per CSS formatieren müsstest.

Außerdem ist dies in den meisten Fällen über das Ziel hinaus geschossen. Denn ein einfacher String mit einem Trenner zwischen den einzelnen Links würde vollkommen ausreichen. Also beginnen wir zuerst einmal stattdessen eine neue Funktion in den Footer zu schreiben:

```php
<?php theme_footer_menu(array('theme_location' => 'secondary')); ?>
```

[Gist](https://gist.github.com/mirkoschubert/30724a7c7860e2bb5ad04200509857e2)

Vergiss dabei auch nicht die PHP-Auszeichnung, sonst gibt es unnötige Fehler. Du kannst auch einfach das obere Menü kopieren und dann leicht verändern. Das Wort »theme« in `theme_footer_menu()` solltest Du mit dem Namen des Themes austauschen, damit es zu keinen Verwechslungen kommen kann.

Wenn Du diese neue Funktion aufrufst, solltest Du sie natürlich erst einmal deklarieren. Öffne also wieder die **functions.php** und ergänze sie um die folgende Funktion:

```php
<?php
if (!function_exists('theme_footer_menu')) :
function theme_footer_menu($args = array('theme_location' => 'secondary', 'seperator' => '•')) {

  $args['seperator'] = ($args['seperator'] != '') ? ' ' . $args['seperator'] . ' ' : ' ';
  if ($args['theme_location'] == '') {
    return false;
  } else {
    if (($locations = get_nav_menu_locations()) && isset($locations[$args['theme_location']])) {
      $menu = wp_get_nav_menu_object($locations[$args['theme_location']]);
      $menu_items = wp_get_nav_menu_items($menu->term_id);
      $menu_string = '';
      foreach ((array) $menu_items as $key => $menu_item ) {
        $menu_string .= $args['seperator'] . '<a href="' . $menu_item->url . '">' . $menu_item->title . '</a>';
      }
      echo $menu_string;
    }
  }
}
endif;
?>
```

[Gist](https://gist.github.com/mirkoschubert/ea70af215a18de691279)

Für alle, die ein bisschen mehr verstehen: Ich habe die Funktion mit ihren Argumenten so ähnlich angelegt, wie es die originale Funktion `wp_nav_menu()` tut. So haben Einsteiger den Vorteil, nichts bis auf den Namen der Funktion zu ändern, wenn sie sie aufrufen.

Innerhalb der Funktion werden zuerst die Argumente auf Fehler überprüft und das Menü-Objekt auf anderem Wege abgerufen. Die einzelnen Menü-Punkte werden dann in einer Schleife zu einem String zusammengesetzt und ausgegeben.

Wenn Du Dein zweites Menü tatsächlich als »secondary« bezeichnet hast und Du Punkte als Trenner einsetzen möchtest, reicht es vollkommen aus, im Footer die Funktion ohne Argumente aufzurufen.

Du kannst aber natürlich auch andere Werte einsetzen, um das Menü und den Trenner anzupassen. Bitte beachte, dass der Trenner auch schon vor dem Menü erscheint, damit auch Copyright-Angaben und ähnliches gut aussehen.

```php
&copy; 2014 by Max Mustermann
<?php theme_footer_menu(array(
  'theme_location' => 'secondary',
  'seperator' => '-'
));?>
```

[Gist](https://gist.github.com/mirkoschubert/cea7908bff120434bcf8fd1790984f1d)

Sollte dann noch kein Menü im Footer erscheinen, hast Du sicher im Backend von WordPress vergessen, den Footer einzurichten und zuzuweisen. Wenn Du das erledigt hast, steht nichts mehr einem sauberen Footer-Menü in Deinem WordPress-Theme im Wege.
