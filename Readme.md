# 📌 soundify

## 📝 Projektbeschreibung

Kurze Beschreibung des Projekts:

- Was soll das Projekt machen?

  - Songs über eine Suchfunktion abfragen (z.B. Deezer API)
  - Die abgefragten Songs werden in der eigenen Datenbank gespeichert
  - Nutzer können sich registrieren und einloggen
  - Nutzer können Songs aus der eigenen Datenbank als Favoriten markieren
  - Favoriten werden dem Nutzer zugeordnet und persistent gespeichert
  - Suchfunktion läuft auf der eigenen Datenbank (lokaler Cache der API-Daten)

- Welches Problem wird gelöst?

  - Vermeidung von CORS-Problemen durch Backend als Proxy
  - Persistente Speicherung der Lieblingssongs jedes Nutzers
  - Unabhängigkeit von der externen API nach erstmaligem Abruf
  - Einfache, zentrale Musikverwaltung für Nutzer

- Wer ist die Zielgruppe?
  - Musikinteressierte Nutzer, die Songs suchen und Favoriten verwalten wollen

---

## 🎯 Ziele

- Backend mit Spring Boot für CRUD-Operationen und API-Integration
- Datenbank (MariaDB) als persistenter Speicher für Songs und Favoriten
- Frontend mit React + Vite + MUI für User-Interaktion
- Docker Multi-Stage Builds für Frontend und Backend, sowie Docker-Compose Setup
- Nutzer-Authentifizierung (Register/Login)
- Suchfunktion, die zuerst die eigene DB abfragt und bei Bedarf externe API anfragt
- Favoritenverwaltung pro Nutzer
- CI/CD Pipeline mit Github Actions inklusive E2E-Tests

---

## 👥 Team

| Name              | Aufgabe / Rolle                   |
| ----------------- | --------------------------------- |
| Panat Ruangsri    | Frontend / Backend + Scrum Master |
| Timo Eichenberger | Frontend / Backend / Slave        |

---

## 🧱 Technischer Stack

- **Programmiersprache:** Java (Backend), TypeScript/JavaScript (Frontend)
- **Frameworks:** Spring Boot (Backend), React mit Vite und MUI (Frontend)
- **Datenbank:** MariaDB
- **Tools:** Docker, Docker Compose, GitHub Actions, VS Code

---

## 📂 Projektstruktur (Ordner & Dateien)

```bash
.github/
├─ workflows
   ├─ main.yaml
frontend/
├─ Dockerfile
├─ package.json
├─ src/...
backend/
├─ Dockerfile
├─ build.gradle
├─ src/...
database/
├─ Dockerfile
.gitignore
CODEOWNERS
README.md
docker-compose.yaml
```
