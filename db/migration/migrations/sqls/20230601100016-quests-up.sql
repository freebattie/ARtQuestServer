create table questrewards
(
    reward_id            serial        not null
        constraint "questRewards_pk"
            primary key,
    "picturename"        varchar(1000) not null,
    "picturedescription" varchar(1000) not null
);

create table public.usergallery
(
    user_email varchar(1000) not null
        constraint usergallery_users_email_fk
            references public.users,
    reward_id  integer       not null
        constraint usergallery_questrewards_reward_id_fk
            references public.questrewards,
    constraint usergallery_pk
        primary key (user_email, reward_id)
);

create table public.quests
(
    quest_id           serial        not null
        constraint quests_pk
            primary key,
    galleryname        varchar(1000) not null,
    gallerydescription varchar(1000) not null,
    itemcount          integer       not null
);

create table public.questitems
(
    item_id  serial
        constraint questitems_pk
            primary key,
    quest_id integer
        constraint questitems_quests_quest_id_fk
            references public.quests
);

create table public.questprogression
(
    user_email varchar(1000) not null
        constraint questprogression_users_email_fk
            references public.users,
    item_id integer     not null
        constraint questprogression_questitems_item_id_fk
            references public.questitems,
    constraint questprogression_pk
        primary key (user_email, item_id)
);