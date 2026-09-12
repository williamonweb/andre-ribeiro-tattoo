CREATE TABLE IF NOT EXISTS artist_profile (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  city TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  instagram TEXT NOT NULL,
  years_experience TEXT NOT NULL,
  profile_image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_content (
  content_key TEXT PRIMARY KEY,
  content_json TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_request (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  body_area TEXT NOT NULL,
  approximate_size TEXT,
  style TEXT,
  idea TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'novo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_settings (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  session_version INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
