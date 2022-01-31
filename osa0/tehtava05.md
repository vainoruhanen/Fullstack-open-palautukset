Sivun avatessa

selain -> palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa

palvelin -> selain: html koodi

selain -> palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css

palvelin -> selain: sivun css (main.css)

selain -> palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js

palvelin -> selain: sivun js koodi (spa.js)

selain alkaa suorittaa js koodia ja pyytää palvelimelta data.json: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

selain -> palvelin: HTTP GET https://studies.cs.helsinki.fi/favicon.ico

palvelin -> selain: favicon.ico tiedosto





