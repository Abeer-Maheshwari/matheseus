-- Matheseus Supabase Schema (PostgreSQL + Row Level Security)
-- Run this script in Supabase Dashboard -> SQL Editor.

-- 1. User Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  qualification_focus text not null default 'both' check (qualification_focus in ('maths', 'further-maths', 'both')),
  target_grade_maths text not null default 'A*',
  target_grade_fm text not null default 'A*',
  weekly_goal_papers integer not null default 2,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatically create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Completed Exam Attempts
create table if not exists public.exam_attempts (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  paper_id text not null,
  paper_code text,
  paper_title text,
  achieved_score integer not null,
  max_score integer not null,
  percentage integer not null,
  predicted_grade text not null,
  timing_mode text check (timing_mode in ('timed', 'untimed')),
  time_spent_seconds integer,
  question_scores jsonb not null default '{}'::jsonb,
  subpart_scores jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);

create index if not exists idx_exam_attempts_user_completed
  on public.exam_attempts (user_id, completed_at desc);

alter table public.exam_attempts enable row level security;

create policy "Users can view own exam attempts"
  on public.exam_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own exam attempts"
  on public.exam_attempts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own exam attempts"
  on public.exam_attempts for update
  using (auth.uid() = user_id);

create policy "Users can delete own exam attempts"
  on public.exam_attempts for delete
  using (auth.uid() = user_id);

-- 3. Paper Completion Status (mirrors matheseus_done)
create table if not exists public.paper_status (
  user_id uuid not null references auth.users (id) on delete cascade,
  paper_id text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, paper_id)
);

alter table public.paper_status enable row level security;

create policy "Users can view own paper status"
  on public.paper_status for select
  using (auth.uid() = user_id);

create policy "Users can insert own paper status"
  on public.paper_status for insert
  with check (auth.uid() = user_id);

create policy "Users can update own paper status"
  on public.paper_status for update
  using (auth.uid() = user_id);

create policy "Users can delete own paper status"
  on public.paper_status for delete
  using (auth.uid() = user_id);

-- 4. In-Progress Exam Drafts
create table if not exists public.exam_drafts (
  user_id uuid not null references auth.users (id) on delete cascade,
  paper_id text not null,
  current_index integer not null default 0,
  scores jsonb not null default '{}'::jsonb,
  subpart_scores jsonb not null default '{}'::jsonb,
  flagged jsonb not null default '{}'::jsonb,
  seconds_remaining integer not null default 0,
  time_spent integer not null default 0,
  timing_mode text not null default 'timed' check (timing_mode in ('timed', 'untimed')),
  updated_at timestamptz not null default now(),
  primary key (user_id, paper_id)
);

alter table public.exam_drafts enable row level security;

create policy "Users can view own exam drafts"
  on public.exam_drafts for select
  using (auth.uid() = user_id);

create policy "Users can insert own exam drafts"
  on public.exam_drafts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own exam drafts"
  on public.exam_drafts for update
  using (auth.uid() = user_id);

create policy "Users can delete own exam drafts"
  on public.exam_drafts for delete
  using (auth.uid() = user_id);
