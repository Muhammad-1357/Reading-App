create table if not exists public.study_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  quiz_score integer,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id),
  constraint study_progress_score_nonnegative check (quiz_score is null or quiz_score >= 0)
);

alter table public.study_progress enable row level security;

grant select, insert, update on public.study_progress to authenticated;

drop policy if exists "Students can read their own progress" on public.study_progress;
create policy "Students can read their own progress"
  on public.study_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Students can add their own progress" on public.study_progress;
create policy "Students can add their own progress"
  on public.study_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Students can update their own progress" on public.study_progress;
create policy "Students can update their own progress"
  on public.study_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
