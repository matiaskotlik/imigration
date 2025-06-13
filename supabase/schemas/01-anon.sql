-- secure supabase!
-- adapted from https://github.com/orgs/supabase/discussions/4547#discussioncomment-9064981
-- we want to allow anonymous access to the database
/*
revoke usage on schema public, storage from anon;

alter default privileges revoke all on routines from "public", anon;

alter default privileges grant execute on routines to authenticated;

alter default privileges in schema public, storage revoke all on routines from "public", anon;

alter default privileges in schema public, storage revoke all on sequences from "public", anon;

alter default privileges in schema public, storage revoke all on tables from "public", anon;

revoke all privileges on database postgres from anon, authenticated;

revoke all on all routines in schema public, storage from "public", anon, authenticated;

revoke all on all sequences in schema public, storage from anon, authenticated;

revoke all on all tables in schema public, storage from anon, authenticated;

revoke all on schema public, storage from anon, authenticated;

alter role anon set pgrst.openapi_mode to 'disabled';

alter role authenticated set pgrst.openapi_mode to 'disabled';

notify pgrst, 'reload config';
*/
