## BubbleMatee - PR Checkliste

### Usability Checklist

## UI-Prinzipien von Nielsen - PR Checkliste

- [ ] Der Nutzer wird über jede Zustandsänderung der Anwendung informiert (z. B. Beitrag wird gepostet, Post fehlgeschlagen).
- [ ] Die verwendete Sprache und Symbole sind einfach verständlich und entsprechen den Erwartungen der Benutzer.
- [ ] Der Benutzer kann alle ausgeführten Aktionen jederzeit einfach beenden und ggf. rückgängig machen.
- [ ] Der Nutzer sieht jederzeit, in welchem Bereich der Anwendung er sich befindet und wie er auf die Hauptseiten zurückgelangt.
- [ ] Das Design (Farben/Icons...) sind stimmen mit denen der restlichen Anwendung überein.
- [ ] Klare Anweisungen und Hinweise werden bereitgestellt, um Benutzerfehler zu minimieren.
- [ ] Validierung und Feedback sind vorhanden, um Benutzer vor Fehlern zu warnen (Üerprüfung der Logik von Eingaben etc.).
- [ ] Das Design ist klar, minimalistisch und lenkt nicht von den Hauptaufgaben ab - Unwichtige Informationen werden vermieden.
- [ ] Informationen und Hilfestellungen finden sich an Stellen, an denen sie eventuell benötigt werden. (Besonders bei Benutzereingaben)
- [ ] Klare Anleitungen zur Fehlerdiagnose und Wiederherstellung sind vorhanden.
- [ ] Der Nutzer sieht jederzeit, in welchem Bereich der Anwendung er sich befindet und wie er auf die Hauptseiten zurückgelangt.

## Code Checkliste - Developer
### Überprüfe alle unten stehenden Punkte gewissenhaft

- [ ] Ich habe konsequent durchtypisiert und es ist demnach kein "any" in meinem Code zu finden
- [ ] Ich verwende Interfaces, um konkretere Typisierung vorzunehmen
- [ ] Ich verwende "let" anstatt "var", um lokale Variablen zu deklarieren
- [ ] Ich habe die Standard Naming Conventions eingehalten (camelCase für Variablen, Funktionen und Dateien - PascalCase für Interfaces, Typen, Enums und Klassen)
- [ ] Ich nutze sprechende Bezeichner für Funktionen und Variablen (let customerId anstatt let numA)
- [ ] Ich habe pages die mehr als 200 Code Zeilen haben in wiederverwendbare Komponenten aufgeteilt
  
## Code Checkliste - Reviewer
### Überprüfe alle unten stehenden Punkte gewissenhaft

- [ ] Es wurde konsequent durchtypisiert und es ist demnach kein "any" in meinem Code zu finden
- [ ] Es wurden Interfaces verwendet, um konkretere Typisierung vorzunehmen
- [ ] Es wurde "let" anstatt "var" verwendet, um lokale Variablen zu deklarieren
- [ ] Es wurden die Standard Naming Conventions eingehalten (camelCase für Variablen, Funktionen und Dateien - PascalCase für Interfaces, Typen, Enums und Klassen)
- [ ] Es wurden sprechende Bezeichner für Funktionen und Variablen und Komponenten verwendet (let customerId anstatt let numA)
- [ ] Es existieren keine pages mit einer größeren Zeilenzahl als 200 Zeilen
- [ ] Die eingeführten Komponenten sind wiederverwendbar
