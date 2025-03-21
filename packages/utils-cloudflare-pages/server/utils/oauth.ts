async function d1Query(sql, params = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_AUTH_DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`
      },
      body: JSON.stringify({ sql, params })
    }
  );

  const data = await response.json();

  // Check if there are any errors returned by the API.
  if (data.errors && data.errors.length > 0) {
    console.error(`Error querying D1: ${JSON.stringify(data.errors)}`);
    throw new Error(`Error querying D1: ${JSON.stringify(data.errors)}`);
  }

  if (!data.success) {
    console.error(`Query unsuccessful: ${JSON.stringify(data)}`);
    throw new Error(`Query unsuccessful: ${JSON.stringify(data)}`);
  }

  // The API returns an array in "result". Unwrap the first element.
  const resultItem = data.result?.[0];
  if (!resultItem || !resultItem.success) {
    console.error(`Query unsuccessful: ${JSON.stringify(data)}`);
    throw new Error(`Query unsuccessful: ${JSON.stringify(data)}`);
  }

  // For SELECT queries, the rows are in resultItem.results.
  return resultItem.results;
}

export interface OAuthUserData {
  email: string;
  name: string;
  image: string;
  provider: 'google' | 'github';
  providerUserId: string;
}

export const handleOAuthSuccess = async (event, oauthUser: OAuthUserData) => {
  if (!oauthUser || !oauthUser.email) {
    console.error('No user data returned from OAuth provider');
    return sendRedirect(event, '/login?error=invalidUserData');
  }
  // Try selecting an existing user by email.
  const domain = process.env.NUXT_PUBLIC_DOMAIN;
  const selectSql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  const rows = await d1Query(selectSql, [oauthUser.email]);

  if (!rows || rows.length === 0) {
    // No user found, insert a new record.
    const insertSql =
      'INSERT INTO users (email, name, image, created_at, sites_registered) VALUES (?, ?, ?, ?, ?)';
    const createdAt = new Date().toISOString();
    const sitesRegistered = JSON.stringify([domain]);
    await d1Query(insertSql, [
      oauthUser.email,
      oauthUser.name,
      oauthUser.image,
      createdAt,
      sitesRegistered
    ]);
  } else {
    // User found, update their record.
    const updateSql = `
          UPDATE users SET
            name = ?,
            image = ?,
            sites_registered = CASE
              WHEN EXISTS (
                SELECT 1
                FROM json_each(
                  CASE WHEN sites_registered IS NULL OR sites_registered = '' THEN '[]' ELSE sites_registered END
                )
                WHERE json_each.value = ?
              )
              THEN sites_registered
              ELSE json_insert(
                CASE WHEN sites_registered IS NULL OR sites_registered = '' THEN '[]' ELSE sites_registered END,
                '$[#]',
                ?
              )
            END,
            updated_at = ?
          WHERE email = ?
        `;
    const updatedAt = new Date().toISOString();
    await d1Query(updateSql, [
      oauthUser.name,
      oauthUser.image,
      domain,
      domain,
      updatedAt,
      oauthUser.email
    ]);
  }

  // Set user session and redirect to homepage
  await setUserSession(event, { user: oauthUser });
  return sendRedirect(event, '/');
};
