alter table questrewards
    rename column picturename to filename;

alter table public.quests
    add questreward_id integer;

alter table public.quests
    add constraint quests_questrewards_reward_id_fk
        foreign key (questreward_id) references public.questrewards;

update quests
set questreward_id = 1
where quest_id = 1;

update quests
set questreward_id = 2
where quest_id = 2;