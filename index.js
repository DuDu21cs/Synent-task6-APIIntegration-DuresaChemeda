const $ = id => document.getElementById(id);

function show(id)  { $(id).classList.add('visible'); }
function hide(id)  { $(id).classList.remove('visible'); }
function setHtml(id, html) { $(id).innerHTML = html; }
function setText(id, txt)  { $(id).textContent = txt; }

function showError(msg) {
  setText('error-msg', msg);
  $('error-box').classList.add('visible');
}

function hideError() {
  $('error-box').classList.remove('visible');
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  if (days < 30)  return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function langDot(lang) {
  if (!lang) return '';
  const cls = `lang-${lang.replace(/\s/g, '')}`;
  return `<span class="lang-dot ${cls}"></span>${lang}`;
}

            function buildMeta(user) {
            const items = [];
            if (user.location) items.push(`📍 ${user.location}`);
            if (user.company)  items.push(`🏢 ${user.company}`);
            if (user.blog)     items.push(`🔗 <a href="${user.blog}" target="_blank" style="color:var(--accent);text-decoration:none;">${user.blog.replace(/^https?:\/\//, '')}</a>`);
            if (user.twitter_username) items.push(`🐦 @${user.twitter_username}`);
            return items.map(i => `<span class="meta-item">${i}</span>`).join('');
            }







            
async function fetchProfile() {
  const username = $('username-input').value.trim();
  if (!username) { showError('Please enter a GitHub username.'); return; }

  // reset UI
  hideError();
  hide('empty-state');
  hide('result');
  show('loading-state');
  $('search-btn').disabled = true;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    ]);

    if (userRes.status === 404) throw new Error(`User "${username}" not found on GitHub.`);
    if (userRes.status === 403) throw new Error('GitHub API rate limit reached. Try again in a minute.');
    if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.status}`);

    const user  = await userRes.json();
    const repos = await reposRes.json();

    // populate profile
    $('avatar').src = user.avatar_url;
    $('avatar').alt = user.login;
    setText('name',  user.name || user.login);
    setText('login', `@${user.login}`);
    setText('bio',   user.bio || '');
    setHtml('meta',  buildMeta(user));
    setText('stat-repos',     user.public_repos);
    setText('stat-followers', user.followers);
    setText('stat-following', user.following);
    setText('stat-gists',     user.public_gists);

    // populate repos
    const repoCount = Array.isArray(repos) ? repos.length : 0;
    setText('repos-count', `${repoCount} shown`);

    if (repoCount === 0) {
      setHtml('repos-grid', `<p style="color:var(--ink-3);font-size:0.85rem;grid-column:1/-1;">No public repositories yet.</p>`);
    } else {
      setHtml('repos-grid', repos.map(r => `
        <a class="repo-card" href="${r.html_url}" target="_blank">
          <div class="repo-name">${r.name}</div>
          <div class="repo-desc">${r.description || '<span style="color:var(--ink-3);font-style:italic;">No description</span>'}</div>
          <div class="repo-footer">
            <span class="repo-lang">${langDot(r.language)}</span>
            <span class="repo-stars">⭐ ${r.stargazers_count}</span>
            <span class="repo-updated">${timeAgo(r.updated_at)}</span>
          </div>
        </a>
      `).join(''));
    }

    hide('loading-state');
    show('result');

  } catch (err) {
    hide('loading-state');
    show('empty-state');
    showError(err.message || 'Something went wrong. Please try again.');
  } finally {
    $('search-btn').disabled = false;
  }
}

// press Enter to search
$('username-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') fetchProfile();
});

// auto-fetch on page load
window.addEventListener('load', fetchProfile);