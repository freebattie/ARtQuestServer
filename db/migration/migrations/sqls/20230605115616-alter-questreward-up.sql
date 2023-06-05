alter table questrewards
    add picturetitle varchar(1000);

update questrewards
set picturetitle = 'Scream'
where picturename = 'Scream';

update questrewards
set picturetitle = 'The Girls on the Bridge'
where picturename = 'The Girls on the Bridge';