-- documents table
drop table if exists documents cascade;

create table documents (
  id uuid not null primary key default gen_random_uuid (),
  name text not null default 'New Document' check (
    0 < length(name)
    and length(name) < 255
  ),
  description text not null default 'A new document' check (
    0 < length(description)
    and length(description) < 255
  ),
  updated_at timestamptz not null default now(),
  template jsonb not null default '{}'::jsonb
);

alter table documents enable row level security;

-- anyone can query documents
create policy anon_select on documents for
select
  to anon,
  authenticated using (true);

-- authenticated users can insert documents
revoke insert on documents
from
  authenticated;

grant insert (name, description, template) on documents to authenticated;

create policy authenticated_insert on documents for insert to authenticated
with
  check (true);

-- authenticated users can update documents
revoke
update on documents
from
  authenticated;

grant
update (name, description, template) on documents to authenticated;

create policy authenticated_update on documents
for update
  to authenticated using (true);

-- authenticated users can delete documents
grant delete on documents to authenticated;

create policy authenticated_delete on documents for delete to authenticated using (true);
