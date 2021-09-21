# url.napicu.eu

Vytvářej custom url jako subdomeny pro napicu.eu

### Co funguje:
- Funkční registrace url
- Funkční redirect url

### TODO:
- Nastavení rate limitu tak, aby to fungovalo 1 registrace na IP za den a né 1 req na api s registrací na IP za den
- Nastavení nginx (Navedení nepoužívaných subdomén na localhost:1090/api/url/SUBDOMENA) a DNS

### Jak spustit url.napicu.eu
- Stáhnout kód
- Zkontrolujeme zda máme Nodej.s po případě nainstalujeme
- Ve složce, kde máme kód dáme `npm i`, což nám nainstaluje všechny použité balíčky
- Vytvoříme `.env` soubor, který bude obsahovat následující hodnoty:
```
WEB_PORT=Váš libovoný port
MYSQL_USER=Uživatel MySQL
MYSQL_DATABASE=Databáze MySQL
MYSQL_PASSWORD=Heslo uživatele MySQL
MYSQL_HOST=IP serveru MySQL
```
- Vytvoříme v MySQL databází tabulku Levels pomocí následující SQL příkazu

```sql
CREATE TABLE `URLNapicu` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `redirect_url` TEXT NOT NULL,
    PRIMARY KEY (`ID`)
);
```

- V případě, že chceme upravíme config.json, kde lze nastavit subdomény, které nechceme aby mohl kdokoliv registrovat
- TODO: NASTAVENÍ NGINX
- Poté web můžeme spustit příkazem `npm start`