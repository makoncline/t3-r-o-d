CREATE EXTENSION IF NOT EXISTS citext;
CREATE TABLE users(id INTEGER PRIMARY KEY, username CITEXT UNIQUE NOT NULL, name TEXT, avatar_url TEXT, img_urls TEXT[] NOT NULL DEFAULT '{}');
CREATE TABLE lists(id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, name TEXT NOT NULL, intro TEXT, updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE lilies(id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, name TEXT NOT NULL, img_url TEXT[] NOT NULL, price NUMERIC(12,2), public_note TEXT, ahs_id TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), list_id INTEGER, ahs_ref INTEGER);
INSERT INTO users(id, username, name) VALUES(3, 'security_test', 'Security test');
INSERT INTO lists(id, user_id, name, intro) VALUES(10, 3, 'Security test catalog', 'Disposable catalog fixture');
INSERT INTO lilies(id, user_id, name, img_url, price, list_id) VALUES(20, 3, 'Security test daylily', ARRAY['https://daylily-catalog-images.s3.amazonaws.com/security-control.png'], 12.50, 10);
