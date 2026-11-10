// Utility to query real public developer APIs (Codeforces, GitHub)
// with clean fallbacks for LeetCode / GeeksforGeeks mock stats.

export async function fetchCodeforcesProfile(handle) {
  if (!handle || !handle.trim()) return null;
  try {
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle.trim())}`);
    const data = await res.json();
    if (data.status === 'OK' && data.result && data.result.length > 0) {
      const u = data.result[0];
      return {
        handle: u.handle,
        rating: u.rating || 0,
        maxRating: u.maxRating || 0,
        rank: u.rank || 'unrated',
        maxRank: u.maxRank || 'unrated',
        contribution: u.contribution || 0,
        avatar: u.titlePhoto,
        isLive: true
      };
    }
  } catch (err) {
    console.warn('Codeforces API fetch failed, falling back:', err);
  }
  return null;
}

export async function fetchCodeforcesRatingHistory(handle) {
  if (!handle || !handle.trim()) return [];
  try {
    const res = await fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle.trim())}`);
    const data = await res.json();
    if (data.status === 'OK' && Array.isArray(data.result)) {
      return data.result.slice(-5).map(r => ({
        contestId: r.contestId,
        contestName: r.contestName,
        rank: r.rank,
        oldRating: r.oldRating,
        newRating: r.newRating
      }));
    }
  } catch (err) {
    console.warn('Codeforces contest history fetch failed:', err);
  }
  return [];
}

export async function fetchGitHubProfile(username) {
  if (!username || !username.trim()) return null;
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}`);
    if (res.ok) {
      const u = await res.json();
      return {
        username: u.login,
        publicRepos: u.public_repos,
        followers: u.followers,
        following: u.following,
        bio: u.bio,
        avatarUrl: u.avatar_url,
        htmlUrl: u.html_url,
        createdAt: u.created_at,
        isLive: true
      };
    }
  } catch (err) {
    console.warn('GitHub API fetch failed, falling back:', err);
  }
  return null;
}

export async function fetchGitHubTopRepos(username) {
  if (!username || !username.trim()) return [];
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}/repos?sort=updated&per_page=6`);
    if (res.ok) {
      const repos = await res.json();
      return repos.map(r => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url
      }));
    }
  } catch (err) {
    console.warn('GitHub repos fetch failed:', err);
  }
  return [];
}

