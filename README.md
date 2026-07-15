# 🔍 GitHub Profile Viewer — API Integration

A GitHub Profile Viewer built with **HTML, CSS & JavaScript** as part of the **Synent Internship — Task 6**.

Fetches live data from the **GitHub REST API** and displays it dynamically with a clean, developer-focused UI.

---

## ✨ Features

- 🔎 Search any GitHub username
- 👤 Display profile info — avatar, name, bio, location, company, website
- 📊 Show stats — Repos, Followers, Following, Gists
- 📁 List latest 6 repositories with language, stars & last updated
- ⏳ Loading spinner while fetching data
- ⚠️ Error handling — 404 (user not found), 403 (rate limit), network errors
- ⌨️ Press **Enter** to search
- 🔗 Click any repo card to open it on GitHub
- 📱 Fully responsive — mobile, tablet, desktop
- 🚀 Auto-fetches `DuDu21cs` profile on page load

---

## 🛠️ Built With

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript (Fetch API, Promise.all, async/await)
- GitHub REST API v3
- Google Fonts (IBM Plex Mono & IBM Plex Sans)

---

## 📁 Project Structure

```
Synent-task6-APIIntegration-DuresaChemeda/
│
├── index.html    # Structure & layout
├── index.css     # All styling
└── index.js      # Fetch logic & DOM manipulation
```

---

## 🚀 Getting Started

No installation or API key needed. Just open in your browser:

```bash
# Clone the repository
git clone https://github.com/DuDu21cs/Synent-task6-APIIntegration-DuresaChemeda.git

# Open in browser
cd Synent-task6-APIIntegration-DuresaChemeda
open index.html
```

---

## 🔌 API Used

| Endpoint | Purpose |
|---|---|
| `GET /users/{username}` | Fetch profile data |
| `GET /users/{username}/repos` | Fetch latest repositories |

> Base URL: `https://api.github.com`  
> No API key required for public data (60 requests/hour limit)

---

## 🧠 Key JavaScript Concepts Used

- `fetch()` — makes HTTP requests to the GitHub API
- `Promise.all()` — fetches profile and repos simultaneously
- `async/await` — handles asynchronous operations cleanly
- DOM manipulation — dynamically injects data into the page
- Error handling — `try/catch` with specific HTTP status checks

---

**Live Demo**

 [demo](https://dudu21cs.github.io/Synent-task6-APIIntegration-DuresaChemeda/)

## 👤 Author

**Duresa Chemeda**
- GitHub: [@DuDu21cs](https://github.com/DuDu21cs)
- LinkedIn: [linkedin.com/in/duresa-chemeda](https://linkedin.com/in/duresa-chemeda)

---## Internship Information

**Company:** Synent Technologies

**Role:** Web Development Intern

**Task:** API integration

---

## License

This project is created for educational and internship purposes.
