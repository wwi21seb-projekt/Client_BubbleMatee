## BubbleMatee - PR Checkliste

## Usability Checklist nach den UI-Prinzipien von Nielsen - PR Checkliste

- [ ] Der Nutzer wird über jede Zustandsänderung der Anwendung informiert (z. B. Beitrag wird gepostet, Post fehlgeschlagen).
- [ ] Die verwendete Sprache und Symbole sind einfach verständlich und entsprechen den Erwartungen der Benutzer.
- [ ] Das Design (Farben/Icons...) sind stimmen mit denen der restlichen Anwendung überein.
- [ ] Der Benutzer kann alle ausgeführten Aktionen jederzeit einfach beenden und ggf. rückgängig machen.
- [ ] Der Nutzer sieht jederzeit, in welchem Bereich der Anwendung er sich befindet und wie er auf die Hauptseiten zurückgelangt.
- [ ] Klare Anweisungen und Hinweise werden bereitgestellt, um Benutzerfehler zu minimieren.
- [ ] Validierung und Feedback sind vorhanden, um Benutzer vor Fehlern zu warnen (Überprüfung der Logik von Eingaben etc.).
- [ ] Das Design ist klar, minimalistisch und lenkt nicht von den Hauptaufgaben ab - Unwichtige Informationen werden vermieden.
- [ ] Informationen und Hilfestellungen finden sich an Stellen, an denen sie eventuell benötigt werden. (Besonders bei Benutzereingaben)

## Code Checkliste - Developer

### Überprüfe alle unten stehenden Punkte gewissenhaft

- [ ] Ich habe konsequent Variablen, Rückgabewerte von Funktionen, Arrays usw. typisiert.
- [ ] Wo notwendig, habe ich spezifische Interfaces genutzt, um eine klarere Typisierung zu ermöglichen.
- [ ] Ich habe "let" anstelle von "var" für die Deklaration von lokalen Variablen verwendet.
- [ ] Ich habe die Standard Naming Conventions eingehalten (camelCase für Variablen, Funktionen und Dateien - PascalCase für Interfaces, Typen, Enums und Klassen)
- [ ] Ich habe aussagekräftige Bezeichner für Funktionen und Variablen verwendet, um die Verständlichkeit des Codes zu verbessern (z. B. `let customerId` statt `let numA`).
- [ ] Ich habe Files, die mehr als 200 Code Zeilen haben in wiederverwendbare Komponenten aufgeteilt
- [ ] Ich habe unnötige Code-Duplikation vermieden und Code, der an verschiedenen Stellen benötigt wird, in Funktionen oder Komponenten ausgelagert.
- [ ] Ich habe meinen Code angemessen kommentiert, insbesondere bei komplexen Logiken oder unklaren Stellen.
- [ ] Wo immer möglich, habe ich Async/Await statt Promises mit .then() für asynchrone Operationen verwendet, um den Code lesbarer zu machen.

## Code Checkliste - Reviewer

### Überprüfe alle unten stehenden Punkte gewissenhaft

- [ ] Es wurden konsequent Variablen, Rückgabewerte von Funktionen, Arrays usw. typisiert.
- [ ] Es wurden Interfaces genutzt, um eine klarere Typisierung zu ermöglichen, wo dies notwendig war.
- [ ] Es wurde "let" anstelle von "var" für die Deklaration lokaler Variablen verwendet.
- [ ] Es wurden die Standard Naming Conventions eingehalten (camelCase für Variablen, Funktionen und Dateien; PascalCase für Interfaces, Typen, Enums und Klassen).
- [ ] Es wurden aussagekräftige Bezeichner für Funktionen, Variablen und Komponenten verwendet, um die Verständlichkeit des Codes zu verbessern (z. B. `let customerId` statt `let numA`).
- [ ] Es wurden Files, die mehr als 200 Codezeilen enthalten, in wiederverwendbare Komponenten aufgeteilt.
- [ ] Es wurde unnötige Code-Duplikation vermieden, indem Code, der an verschiedenen Stellen benötigt wird, in Funktionen oder Komponenten ausgelagert wurde.
- [ ] Der Code wurde angemessen kommentiert, insbesondere bei komplexen Logiken oder unklaren Stellen.
- [ ] Wo immer möglich, wurde Async/Await anstelle von Promises mit .then() für asynchrone Operationen verwendet, um den Code lesbarer zu gestalten.
