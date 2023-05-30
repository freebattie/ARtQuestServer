# ARtQuestServer

- steg 1 skriv "npm i" inne i foldern
- seg 2 rename .env(template) til kun .env
- seg 3 fyll inn feltene i .env med dine passord, port osv, pass på at den er gitignora.
- steg 4 lag en database med pgadmin eller kommando linja, samme navn som du skriver i .env filen
- steg 5 kopier scriptet fra db/sql/create.sql inn i pgadmin slik tabellene blir laget eller gjør det fra commandolinje eller editoren din
- steg 6 kopier scriptet fra db/sql/dataset.sql å gjør det samme som over, den inneholder litt dummy data å en "User" tabel.
- steg 7 sjekk at tabellene ble laga og at dataen er komt med, bruk pgadmin eller kommandolinja etc
- steg 8 du går til terminalen og finner mappa igjen å skriver "npm run dev" nå skal serveren være i gang.
- steg 9 gå til localhost/api/test/1 og  localhost/api/test/2 osv for å sjekke at API fungere
- steg 10 (skip hvis du ikke kan med postman)hvis du kan med postman så kan du også teste login det er på localhost/api/login å send med i body {"userName": "test","password":"test"}
- steg 11 (skip hvis du ikke skjønte steg 10)gå til  localhost/api/test, hvis du er logga inn får du alle test dataen, hvis du ikke er logga inn så får du en 400 feilmelding, for å "loggeut" så må du slette cokien - med rolle og userName
- steg 12 hvis du fekk til steg 1 til 9(11) så e det berre å lage seg en eien branch å leike seg.


# Database migration tool
Tool to help everyone to have same setup for DB with easy terminal commando.
You need a copy of your .env file from root to this location = "db/migration"
If you dont add this file here it wont work!!!

First time setup run this command:
1. Run commando "npm run db-install"
2. Run commando "npm run db-migrate"

To update database with new SQL updates == "npm run db-migrate"

To reset database == "npm run db-reset"