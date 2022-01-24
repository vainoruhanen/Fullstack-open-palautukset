selain -> palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
selain -> palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
palvelin -> selain: HTML koodi
selain -> palvelin:  HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin -> selain: main.css
selain -> palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
palvelin -> selain: main.js

selain alkaa suorittaa javascript koodia, joka pyytää JSON-dataa palvelimelta:
HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
palvelin -> selain: [{"content":"3:","date":"2022-01-23T17:57:19.715Z"}, ...]

selain suorittaa tapahtumankäsittelijän joka renderöi uuden muistiinpanon näytölle.