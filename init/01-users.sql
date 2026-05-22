INSERT INTO "user" (email, password, "firstName", "lastName", role)
VALUES (
  '2383528@cegepmv.ca',
  '$2b$12$WRojZUSpiqnjRv3xoZjfwOod.Ix1cYK0CUe/LJKIwLxK2p1khFkEy',
  'Mr.',
  'A',
  'administrator'
)
ON CONFLICT (email) DO NOTHING;