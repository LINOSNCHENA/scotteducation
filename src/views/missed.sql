insert into public.users (id, email)
select id, email
from auth.users
where id not in (select id from public.users);
