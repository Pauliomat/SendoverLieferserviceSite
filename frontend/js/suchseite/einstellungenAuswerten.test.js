const einstellungenAuswerten=require('./einstellungenAuswerten'); 
const puppeteer = require("puppeteer"); //benutze puppeteer in verbindung mit jest um UI,DB Suchen/editen/sortien/... zu testen

test('add 2 + 2 equals 4', ()=>{
    expect(2+2).toBe(4);
}); //beispiel test

//server starten mit
// 1stes terminal
// cd ./backend
// nodemon .\app.js
/*
falls Fehler : File C:\Users\NAME\AppData\Roaming\npm\nodemon.ps1 cannot be loaded. The file
								C:\Users\NAME\AppData\Roaming\npm\nodemon.ps1 is not digitally signed.
		einfach Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
		und dann y für yes
		um dies für diese Powershell temporär zu disablen
*/
// ist erreichbar unter 127.0.0.1:3000


// falls sie auch alles nach testen wollen
//dann im 2ten terminal
//npm test
// um die tests automatisch durchlaufen zu lassen

//hier wird getested ob der server richtig gestarted ist und ob die seite die gerichte in der Ui richtig anzeigt,
// von der db zieht und richtig ausrechnet treffer anzahl sortiert und filtert
test("teste ob du auf die seite kommst", async() => {
    const browser = await puppeteer.launch({
        //headless:false, // um sehen zu können was puppeteer macht einfach headless auf false und slomo auf 80 oder so
        slowMo: 80,
        //args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage(); //erstelle einen neuen tab
    await page.setViewport({ width: 1920, height: 1080 }) //set viewport size zu fullhd
    await page.goto("http://127.0.0.1:3000/suchseite.html"); //verbinde dich mit dem server und gehe auf die suchseite
    const finalText = await page.$eval("#searchresult", el => el.textContent); //speicher Trefferanzahl in finaltext
    expect(finalText).toBe("16 Treffer gefunden"); // falls er der Text übereinstimmt weiß ich das die Verbindung funktioniert.
})

//hier wird getestet ob der user in verbinung mit dem Ui nach zbs. pizzas suchen kann mit dem suchfeld und ob die DB dies richtig zurück gibt
test("teste ob du suchen kannst", async() => {
    const browser = await puppeteer.launch({
        //headless:false, // um sehen zu können was puppeteer macht einfach headless auf false und slomo auf 80 oder so
        slowMo: 20, 
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage(); //erstelle einen neuen tab
    await page.setViewport({ width: 1920, height: 1080 }) //set viewport size zu fullhd
    await page.goto("http://127.0.0.1:3000/suchseite.html"); //verbinde dich mit dem server und gehe auf die suchseite
    await page.click("#searchbar"); //clicke auf die searchbar
    await page.type("input#searchbar","pizza"); //schreibe pizza um danach zu suchen
    const finalText = await page.$eval("#searchresult", el => el.textContent); //speicher Trefferanzahl in finaltext
    expect(finalText).toBe("6 Treffer gefunden");
    // hier wird getestet wieviele treffer gefunden werden wenn man nach pizza sucht,
    // da standartmässig mehr gerichte gezeigt werden muss die treffer anzahl von zbs. 16 -> 6 gehen wenn man nach pizza sucht

},10000);

// hier wird getestet ob der user in verbindung mit dem Ui richtig filtern kann um zbs. auch getreanke anzeigen zu lassen und ob die DB dies richtig zurück liefert
test("teste ob du filtern kannst", async() => {
    const browser = await puppeteer.launch({
        //headless:false, // um sehen zu können was puppeteer macht einfach headless auf false und slomo auf 80 oder so
        slowMo: 80, 
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage(); //erstelle einen neuen tab
    await page.setViewport({ width: 1920, height: 1080 }) //set viewport size zu fullhd
    await page.goto("http://127.0.0.1:3000/suchseite.html"); //verbinde dich mit dem server und gehe auf die suchseite
    await page.click("#b > div.navside > div:nth-child(2) > label"); //click auf selector fuer getranke filter checkbox
    const finalText = await page.$eval("#searchresult", el => el.textContent); //speicher Trefferanzahl in finaltext
    expect(finalText).toBe("19 Treffer gefunden");
    // hier wird getestet wieviele treffer gefunden werden wenn den filter mit getreanken erweitert
    // da mit getreanken mehr "gerichte" angezeigt werdebn werden muss die treffer anzahl von zbs. 16 ->19 wachsen

},10000);

// hier wird getestet ob der User mittels UI seinem Warenkorb einen Döner hinzufügen kann, und dies in die DB aufgenommen wird
test("teste ob du ein Gericht in den Warenkorb hinzufügen kannst", async() => {
    const browser = await puppeteer.launch({
        //headless:false, // um sehen zu können was puppeteer macht einfach headless auf false und slomo auf 80 oder so
        slowMo: 80, 
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage(); //erstelle einen neuen tab
    await page.setViewport({ width: 1920, height: 1080 }) //set viewport size zu fullhd
    await page.goto("http://127.0.0.1:3000/suchseite.html"); //verbinde dich mit dem server und gehe auf die suchseite
    var pretext = await page.$eval("#warenkorb_anzahl", el => el.textContent); //schreibe die anzahl der items im warenkorb in pretext
    await page.click("#ID-13-button"); //selector doener  // dies fuegt einmal doener dem warenkorb hinzu
    var posttext = await page.$eval("#warenkorb_anzahl", el => el.textContent); //schreibe die anzahl der items im warenkorb in posttext
    expect(pretext).not.toBe(posttext);
    //falls sich die warenkorb item anzahl verändert hat wissen wir das das hinzufügen des gerichtes funktioniert hat

},10000);

// setzt voraus das min. ein doener vegan im warenkorb ist.
// falls  No node found for selector: #ID-11-menge einfach doener vegan zum warenkorb hinzufuegen in der suchseite
// hier wird de menge von doenern im warenkorb von user mittels UI veraendert und geschaut ob die DB richtig die neunen gerichte neu berechnen lässt
test("teste ob beim warenkorb die menge richtig in die db aufgenommen wird und der preis neu brechnet wird", async() => {
    const browser = await puppeteer.launch({
        //headless:false, // um sehen zu können was puppeteer macht einfach headless auf false und slomo auf 80 oder so
        slowMo: 80, 
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage(); //erstelle einen neuen tab
    await page.setViewport({ width: 1920, height: 1080 }) //set viewport size zu fullhd
    await page.goto("http://127.0.0.1:3000/warenkorb.html"); //verbinde dich mit dem server und gehe auf die warenkorbseite
    await page.type("#ID-11-menge","1"); //verändere die menge an von pommes gerichten im warenkorb
    page.keyboard.press('Enter'); 
    const prepreistext = await page.$eval("#gesamtprice", el => el.textContent); //speicher was die db uns als gesamtpreis gibt.
    await page.type("#ID-11-menge","1"); //verändere die menge an von pommes gerichten im warenkorb 
    page.keyboard.press('Enter');
    const postpreistext = await page.$eval("#gesamtprice", el => el.textContent); //speicher was die db uns als gesamtpreis gibt.
    await page.evaluate( () => document.getElementById("ID-11-menge").value = "3") // reset die menge an pommes im warenkorb
    await page.type("#ID-11-menge","1");
    page.keyboard.press('Enter');
    expect(prepreistext).not.toBe(postpreistext);
    // falls der gesamtpreis sich ändert funktioniert der test

},10000);

// hier wird geschaut ob der User mittels UI ein Gericht aus dem Warenkorb loeschen kann und die DB das uebernimmt und den Gesamtpreis neu berechnet
test("teste ob der warenkorb den artikel aus der db loescht und der preis neu brechnet wird", async() => {
    const browser = await puppeteer.launch({
        //headless:false, // um sehen zu können was puppeteer macht einfach headless auf false und slomo auf 80 oder so
        slowMo: 80, 
        args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();//erstelle einen neuen tab
    await page.setViewport({ width: 1920, height: 1080 }) //set viewport size zu fullhd
    await page.goto("http://127.0.0.1:3000/warenkorb.html"); //verbinde dich mit dem server und gehe auf die warenkorbseite
    const prepreistext = await page.$eval("#gesamtprice", el => el.textContent); //speicher was die db uns als gesamtpreis gibt.
    await page.click("#ID-13-delete"); //löesche doener aus dem warenkorb raus
    const postpreistext = await page.$eval("#gesamtprice", el => el.textContent); //speicher was die db uns als gesamtpreis gibt.
    expect(prepreistext).not.toBe(postpreistext);
    //falls sich der gesamtpreis verändert hat wissen wir das doener aus der db geloescht wurden

},10000);

/* am ende sollte das alles dann so aussehen
PS C:\Users\Paul\Desktop\sendover-master\a> npm test

> jets_testing@1.0.0 test C:\Users\Paul\Desktop\sendover-master\a
> jest

 PASS  frontend/js/suchseite/einstellungenAuswerten.test.js (13.437 s)
  √ add 2 + 2 equals 4 (1 ms)
  √ teste ob du auf die seite kommst (1608 ms)
  √ teste ob du suchen kannst (1336 ms)
  √ teste ob du filtern kannst (2081 ms)
  √ teste ob du ein Gericht in den Warenkorb hinzufügen kannst (2302 ms)
  √ teste ob beim warenkorb die menge richtig in die db aufgenommen wird und der preis neu brechnet wird (3065 ms)
  √ teste ob der warenkorb den artikel aus der db loescht und der preis neu brechnet wird (2283 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        14.108 s
Ran all test suites.
*/
// Es wird Service,Availability, die DB, die UI, rechnerische Funktionen und die Interactionen von User <-> System getestet.