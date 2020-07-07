# Sendover Lieferservice Seite  
# WebAnw2+SoftEng Projekt HS-Albsig 4.Sem

## Installation

### 1. Server starten

- 1stes terminal(zbs. Powershell)
- cd ./backend/
- npm install
> (alles bis auf chromium(~140mb) wird schnell runtergeladen)
- nodemon ./app.js

> Server sollte nun auf 127.0.0.1:3000 laufen.

falls Fehler : File C:\Users\NAME\AppData\Roaming\npm\nodemon.ps1 cannot be loaded. The file
								C:\Users\NAME\AppData\Roaming\npm\nodemon.ps1 is not digitally signed.
		einfach Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
		und dann y für yes
		um dies für diese Powershell temporär zu disablen
		
### 2. automatisch testen

- npm test

( falls sie die automatische UI interaction sehen wollen in frontend/js/suchseite/einstellungenAuswerten.test.js die headless:false zeilen auskommentieren.)

### 3. ...

### 4. Profit
