# Blackbox Tests - Testberichte
ID: 1\
Kurzbeschreibung: /lernende Route\
Testdaten: Keine\
Erwartetes Ergebnis: Seite mit einer Tabelle mit allen Lernenden\
Tatsächliches Ergebnis: Seite mit einer Tabelle mit allen Lernenden\
Urteil: Bestanden

ID: 2\
Kurzbeschreibung: /lernende Route: Man kann Lernende in die Tabelle hinzufügen\
Testdaten: Vorname, Nachname, Strasse, PLZ, Ort, Land, Geschlecht, Telefon, Handy, Email, Private Email, Geburtsdatum\
Erwartetes Ergebnis: Lernende wird hinzugefügt und beinhaltet alle Testdaten\
Tatsächliches Ergebnis: Lernende wird hinzugefügt und beinhaltet alle Testdaten\
Urteil: Bestanden

ID: 3\
Kurzbeschreibung: /lernende Route: Man kann das Lernende Feld bearbeiten.\
Testdaten: Vorname, Nachname, Strasse, PLZ, Ort, Land, Geschlecht, Telefon, Handy, Email, Private Email, Geburtsdatum\
Erwartetes Ergebnis: Lernende wird bearbeitet und beinhaltet alle Testdaten\
Tatsächliches Ergebnis: Lernende wird bearbeitet und beinhaltet alle Testdaten\
Urteil: Bestanden

ID: 4\
Kurzbeschreibung: /lernende Route: Man kann das Lernende Feld löschen.\
Testdaten: Keine\
Erwartetes Ergebnis: Lernende wird gelöscht\
Tatsächliches Ergebnis: Lernende wird gelöscht\
Urteil: Bestanden

ID: 5\
Kurzbeschreibung: /lernende/:id Route\
Testdaten: id_lernende\
Erwartetes Ergebnis: Lernende Profil mit:
1. Name und Vorname des Lernendes
2. Kontakt
3. Tabelle mit Kurse und Noten, wo er teilgenommen hat.
4. Tabelle mit Lehrbetriebe, wo er die Lehre gemacht hat.

Tatsächliches Ergebnis: Lernende Profil mit:
1. Name und Vorname des Lernendes
2. Kontakt
3. Tabelle mit Kurse und Noten, wo er teilgenommen hat.
4. Tabelle mit Lehrbetriebe, wo er die Lehre gemacht hat.

Urteil: Bestanden

ID: 6\
Kurzbeschreibung: Man kann Kurs und Note in die Kurse und Noten Tabelle hinzufügen\
Testdaten: kursnummer, note\
Erwartetes Ergebnis: Kurs Note Row wird hinzugefügt
Tatsächliches Ergebnis: Kurs Note Row wird hinzugefügt

Urteil: Bestanden

ID: 7\
Kurzbeschreibung: Man kann die Note bei einem Kurs bearbeiten\
Testdaten: note\
Erwartetes Ergebnis: Note wird bearbeitet
Tatsächliches Ergebnis: Note wird bearbeitet

Urteil: Bestanden

ID: 8\
Kurzbeschreibung: Man kann den KursNoteRow löschen\
Testdaten: keine\
Erwartetes Ergebnis: Kursnote wird gelöscht
Tatsächliches Ergebnis: Kursnote wird gelöscht

Urteil: Bestanden

ID: 9\
Kurzbeschreibung: Man kann einen Lehrbetrieb und Beruf in die Lehrbetriebetabelle hinzufügen\
Testdaten: Firma, Beruf, Startdatum, Endedatum\
Erwartetes Ergebnis: Lehrbetrieb mit allen Testdaten wird hinzugefügt.
Tatsächliches Ergebnis: Lehrbetrieb mit allen Testdaten wird hinzugefügt.

Urteil: Bestanden

ID: 10\
Kurzbeschreibung: Man kann einen Lehrbetrieb und Beruf in der Lehrbetriebetabelle bearbeiten\
Testdaten: Firma, Beruf, Startdatum, Endedatum\
Erwartetes Ergebnis: Lehrbetrieb mit allen Testdaten wird bearbeitet.
Tatsächliches Ergebnis: Lehrbetrieb mit allen Testdaten wird bearbeitet.

Urteil: Bestanden

ID: 11\
Kurzbeschreibung: Man kann einen Lehrbetrieb und Beruf aus der Lehrbetriebetabelle löschen\
Testdaten: Keine\
Erwartetes Ergebnis: Lehrbetrieb wird gelöscht.
Tatsächliches Ergebnis: Lehrbetrieb wird gelöscht.

Urteil: Bestanden




