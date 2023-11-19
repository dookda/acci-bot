create table news (
id serial primary key,
	title text,
	ndetail text,
	autor text,
	nimage text,
	nts timestamp
)

select * from news

select * from eac_register er 


CREATE TABLE organization_sub (
	gid serial4 NOT NULL,
	orgname_main text null,
	orgname text NULL,
	orgcontact text NULL,
	orgtel text NULL,
	orgemail text NULL,
	headname text NULL,
	headvno text NULL,
	headvmoo text NULL,
	headvname text NULL,
	headpro text NULL,
	headamp text NULL,
	headtam text NULL,
	orgvno text NULL,
	orgvmoo text NULL,
	orgvname text NULL,
	orgpro text NULL,
	orgamp text NULL,
	orgtam text NULL,
	lat numeric NULL,
	lon numeric NULL,
	orgtypeother text NULL,
	orgstatus text NULL,
	orgtarget text NULL,
	orgwork text NULL,
	orgoutput text NULL,
	img text NULL,
	orgreportor text NULL,
	geom public.geometry(point, 4326) NULL,
	orgid text NULL,
	orgline text NULL,
	orgfacebook text NULL,
	typ_organic text NULL,
	typ_commutrav text NULL,
	typ_commucomfort text NULL,
	typ_commulearn text NULL,
	typ_commuforest text NULL,
	typ_houseforest text NULL,
	typ_mangforest text NULL,
	typ_watmanage text NULL,
	typ_landmange text NULL,
	typ_fishing text NULL,
	typ_industwaste text NULL,
	typ_housewaste text NULL,
	typ_airpollution text NULL,
	typ_noisepollution text NULL,
	typ_other text NULL,
	website text NULL,
	pro_name text NULL,
	amp_name text NULL,
	tam_name text NULL,
	typ_commuecon text NULL,
	userid text null
);

drop view organization_list
create view organization_list as select 
	gid, orgname
from organization o 

select * from organization_list ol 
select * from organization o
--drop table organization_list;
--delete from organization where orgname is null 
select * from eac_register er 
select * from organization_sub


SELECT os.*, 
        ST_AsGeojson(os.geom) as geojson, 
        ST_Y(os.geom) as lat,
        ST_X(os.geom) as lng, 
        h.tam_name as headtam_name,
        h.amp_name as headamp_name,
        h.pro_name as headpro_name,
        o.tam_name as orgtam_name,
        o.amp_name as orgamp_name,
        o.pro_name as orgpro_name
    FROM organization_sub os
    left join tambon_4326 h
        on os.headtam = h.tb_idn::text 
    left join tambon_4326 o
        on os.orgtam  = o.tb_idn::text 
	
	
select * from tambon_4326 t 
select * from tameco_eac te 

select * from news n 

--delete from organization_sub where gid=1
WITH orgname_sub as(
        SELECT distinct orgname_main, count(orgname_main) as cnt 
        FROM organization_sub
        GROUP BY orgname_main
    )
    SELECT e.gid as user_gid,e.usrname as line_username,e.uname as fullname,os.*, 
            ST_AsGeojson(os.geom) as geojson, 
            ST_Y(os.geom) as lat,
            ST_X(os.geom) as lng, 
            h.tam_name as headtam_name,
            h.amp_name as headamp_name,
            h.pro_name as headpro_name,
            o.tam_name as orgtam_name,
            o.amp_name as orgamp_name,
            o.pro_name as orgpro_name,
            ob.cnt
        FROM organization os
            LEFT JOIN orgname_sub ob
                on os.orgname = ob.orgname_main
            LEFT JOIN tambon_4326 h
                on os.headtam = h.tb_idn::text 
            LEFT JOIN tambon_4326 o
                on os.orgtam  = o.tb_idn::text
            LEFT JOIN eac_register e ON os.userid=e.gid::text



SELECT os.*, 
        ST_AsGeojson(os.geom) as geojson, 
        ST_Y(os.geom) as lat,
        ST_X(os.geom) as lng, 
        h.tam_name as headtam_name,
        h.amp_name as headamp_name,
        h.pro_name as headpro_name,
        o.tam_name as orgtam_name,
        o.amp_name as orgamp_name,
        o.pro_name as orgpro_name
    FROM organization_sub os
    left join tambon_4326 h
        on os.headtam = h.tb_idn::text 
    left join tambon_4326 o
        on os.orgtam  = o.tb_idn::text
    WHERE orgname_main ='กลุ่มคัดค้านฟาร์มสุกรหมู่17บ้านยาง'
    
    
SELECT FROM 
