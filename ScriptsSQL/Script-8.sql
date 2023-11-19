SELECT * FROM jomnam2.`user`
select * from jomnam2.team

select drowning_province,
	sum(case when drowning_number_dead > 0 and age <= 15 then drowning_number_dead else 0 end) as dead_lt15,
	sum(case when drowning_number_dead > 0 and age > 15 then drowning_number_dead else 0 end) as dead_gt15,
	sum(case when drowning_number_dead > 0 then drowning_number_dead else 0 end) as dead_total,
	sum(case when drowning_number_alive > 0 and age <= 15 then drowning_number_dead else 0 end) as alive_lt15,
	sum(case when drowning_number_alive > 0 and age > 15 then drowning_number_dead else 0 end) as alive_gt15,
	sum(case when drowning_number_alive > 0 then drowning_number_dead else 0 end) as alive_total
from report_dead rd 
where drowning_province is not null and YEAR(drowning_date) = 2019
group by drowning_province 

select YEAR(drowning_date) from report_dead


SELECT x.*, a.ampurname, p.changwatname  FROM team x
                INNER JOIN campur2 a ON x.ampur=a.ampurcodefull
                INNER JOIN cchangwat2 p ON x.changwat=p.changwatcode ORDER BY x.id

            

drop table team_rating2
create table team_rating ( 
	gid serial not null,
	cid text,
	item111 numeric,
	item121 numeric,
	item122 numeric,
	item211 numeric,
	item212 numeric,
	item221 numeric,
	item231 numeric,
	item232 numeric,
	item311 numeric,
	item312 numeric,
	item3131 numeric,
	item3132 numeric,
	item321 numeric,
	item322 numeric,
	item331 numeric,
	item411 numeric,
	item412 numeric,
	item421 numeric,
	item511 numeric,
	item512 numeric,
	item513 numeric,
	item611 numeric,
	item612 numeric,
	item621 numeric,
	item622 numeric,
	item711 numeric,
	item712 numeric,
	item721 numeric,
	item722 numeric,
	item811 numeric,
	item812 numeric,
	item911 numeric,
	item921 numeric,
	item922 numeric,
	item1011 numeric,
	item1012 numeric
)

SELECT * FROM jomnam2.`user`
select * from jomnam2.team

select drowning_province,
	sum(case when drowning_number_dead > 0 and age <= 15 then drowning_number_dead else 0 end) as dead_lt15,
	sum(case when drowning_number_dead > 0 and age > 15 then drowning_number_dead else 0 end) as dead_gt15,
	sum(case when drowning_number_dead > 0 then drowning_number_dead else 0 end) as dead_total,
	sum(case when drowning_number_alive > 0 and age <= 15 then drowning_number_dead else 0 end) as alive_lt15,
	sum(case when drowning_number_alive > 0 and age > 15 then drowning_number_dead else 0 end) as alive_gt15,
	sum(case when drowning_number_alive > 0 then drowning_number_dead else 0 end) as alive_total
from report_dead rd 
where drowning_province is not null and YEAR(drowning_date) = 2019
group by drowning_province 

select YEAR(drowning_date) from report_dead


SELECT x.*, a.ampurname, p.changwatname  FROM team x
                INNER JOIN campur2 a ON x.ampur=a.ampurcodefull
                INNER JOIN cchangwat2 p ON x.changwat=p.changwatcode ORDER BY x.id
-- new year
SELECT approv_date, 
CASE 
	WHEN YEAR(approv_date) > 2022 THEN  DATE_SUB(approv_date, INTERVAL 543 YEAR) ELSE approv_date
END as a
FROM  team

UPDATE team set approv_date = DATE_SUB(approv_date, INTERVAL 543 YEAR) 
WHERE YEAR(approv_date) > 2022

                
select * from team_rating tr              

alter table team_rating add column sumrating numeric



CREATE TABLE line_noti(
	gid serial not null,
	usrid text,
	displayName text,
	ts timestamp
)

select * from 

SELECT drowning_province as pro,
                    sum(CASE WHEN age <= 15 THEN drowning_number_dead ELSE 0 END) as dead_lt15,
                    sum(CASE WHEN age > 15 THEN drowning_number_dead ELSE 0 END) as dead_gt15,
                    sum(CASE WHEN age >= 0 THEN drowning_number_dead ELSE 0 end) as dead_total,
                    sum(CASE WHEN age <= 15 THEN drowning_number_alive ELSE 0 END) as alive_lt15,
                    sum(CASE WHEN age > 15 THEN drowning_number_alive ELSE 0 END) as alive_gt15,
                    sum(CASE WHEN age >= 0 THEN drowning_number_alive ELSE 0 END) as alive_total
                FROM report_dead rd 
                WHERE (drowning_province=53 OR drowning_province=63 OR drowning_province=64 OR drowning_province=65 OR drowning_province=67) 
                	AND YEAR(drowning_date) =  '2019'  
                GROUP BY drowning_province

SELECT sex,
            sum(CASE WHEN age <= 15 THEN drowning_number_dead ELSE 0 END) as dead_lt15,
            sum(CASE WHEN age > 15 THEN drowning_number_dead ELSE 0 END) as dead_gt15,
            sum(CASE WHEN age >= 0 THEN drowning_number_dead ELSE 0 end) as dead_total,
            sum(CASE WHEN age <= 15 THEN drowning_number_alive ELSE 0 END) as alive_lt15,
            sum(CASE WHEN age > 15 THEN drowning_number_alive ELSE 0 END) as alive_gt15,
            sum(CASE WHEN age >= 0 THEN drowning_number_alive ELSE 0 END) as alive_total
        FROM report_dead rd 
        WHERE (drowning_province=53 OR drowning_province=63 OR drowning_province=64 OR drowning_province=65 OR drowning_province=67) 
        AND YEAR(drowning_date) =  '2019'
        GROUP BY sex 

        
SELECT MONTH(drowning_date) as dmonth, 
 		sum(CASE WHEN age <= 15 THEN drowning_number_dead ELSE 0 END) as dcase
       	FROM report_dead 
        WHERE (drowning_province=53 OR drowning_province=63 OR drowning_province=64 OR drowning_province=65 OR drowning_province=67) 
            AND YEAR(drowning_date) =  '2019'  
            AND age <= 15
        GROUP BY MONTH(drowning_date) 
        ORDER BY MONTH(drowning_date)

 SELECT drowning_type as dtype, 
 		sum(CASE WHEN age <= 15 THEN drowning_number_dead ELSE 0 END) as dcnt
        FROM report_dead 
        WHERE (drowning_province=53 OR drowning_province=63 OR drowning_province=64 OR drowning_province=65 OR drowning_province=67) 
            AND YEAR(drowning_date) =  '2019'  
            AND age <= 15
        GROUP BY drowning_type
        
SELECT distinct safty_manage FROM water_source_survey wss 

update report_dead set picture='uploads/cat.jpeg'


INSERT INTO water_source_survey(cid, province, amphur,tambon ) VALUES('1664113331', '0', '0', '0');
UPDATE water_source_survey SET province='63' WHERE cid='1664113331';
UPDATE water_source_survey SET survey_date='09/25/2022' WHERE cid='1664113331';

select * from team


SELECT approv_date, 
	DATE_ADD(approv_date , INTERVAL 730 DAY), 
	case when now() < DATE_ADD(approv_date , INTERVAL 730 DAY)  then 'ครบรอบต่ออายุการรับรอง' else '' end
from team


SELECT x.*, a.ampurname, p.changwatname  FROM population_base x
            INNER JOIN campur2 a ON x.ampurcode=a.ampurcodefull
            INNER JOIN cchangwat2 p ON x.changwatcode=p.changwatcode


select * from panel_survey wss 


-- jomnam2.water_source_survey definition
drop table panel_survey

CREATE TABLE `panel_survey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `province` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'จังหวัด',
  `amphur` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'อำเภอ',
  `tambon` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'ตำบล',
  `village_no` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT 'หมู่ที่',
  `village_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT 'หมู่บ้าน',
  `txt` text COMMENT 'รายละเอียด',
  `lat` DOUBLE(16,6) COMMENT 'ละติจูด',
  `lon` DOUBLE(16, 6) COMMENT 'ลองจิจูด',
  `survey_date` date DEFAULT NULL COMMENT 'วันที่รายงาน',
  `surveyer` text COMMENT 'ผู้รายงาน',
  `cid` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ;


SELECT x.*, t.tambonname, a.ampurname, p.changwatname  FROM panel_survey x
        INNER JOIN ctambon2 t ON x.tambon = t.tamboncodefull
        INNER JOIN campur2 a ON x.amphur=a.ampurcodefull
        INNER JOIN cchangwat2 p ON x.province=p.changwatcode 
        WHERE YEAR(x.survey_date) = '2022' ORDER BY x.id
        
select * from user

--alter table user add column pass_hash text
update  user SET pass_hash = MD5(password_hash)

SELECT * FROM report_dead
SELECT x.*, a.ampurname, p.changwatname  FROM report_dead x
            LEFT JOIN campur2 a ON x.drowning_amphur=a.ampurcodefull
            LEFT JOIN cchangwat2 p ON x.drowning_province=p.changwatcode ORDER BY id DESC

        
SELECT x.*, a.ampurname, p.changwatname  FROM report_dead x
            LEFT JOIN campur2 a ON x.drowning_amphur=a.ampurcodefull
            LEFT JOIN cchangwat2 p ON x.drowning_province=p.changwatcode
			WHERE x.amphur_addr = '6401'
