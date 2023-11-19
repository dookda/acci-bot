ๅๅตใถตใๅ/ุใๅ_ภSELECT * FROM reportacc.report_dead WHERE s_year = 2018

SELECT DISTINCT drowning_province,drowning_after_dead, count(drowning_after_dead) 
FROM reportacc.report_dead 
group by drowning_province, drowning_after_dead
order by drowning_province

select
    drowning_province,
    count(drowning_after_dead) as cnt,
--     sum(if(drowning_after_dead="เสียชีวิต ณ ที่" 
--     		or drowning_after_dead="เสียชีวิต ณ ที่เกิดเหต" 
--     		or drowning_after_dead="เสียชีวิต ณ โรงพยาบาล",1, 0 )) as  dead,
    count(drowning_after_dead) - sum(if(drowning_after_dead='ไม่เสียชีวิต',1, 0 )) as dead,
    sum(if(drowning_after_dead='ไม่เสียชีวิต',1, 0 )) as alive
  from report_dead
  where s_year = "2019" AND age <= 15
  group by drowning_province
  

 SELECT MONTH(drowning_date), COUNT(drowning_date) 
 FROM reportacc.report_dead
 GROUP BY MONTH(drowning_date)
 ORDER BY MONTH(drowning_date)
 
 
select a.* from (SELECT stname, deep as val, time(ts) as t 
FROM iotwtrl WHERE stname='station_01' ORDER BY ts asc limit 5) a
ORDER BY a.t ASC


SELECT * from public.watquality_af

insert into watquality_af(date)values('01/31/2021')

insert into watquality_af (wq_id,prov,syst,systype,capacity,date,insti) values( '829267.381811736','ระยอง','ทน.ระยอง','Fix Film Aeration',1000,'1/2/2020','');

-- delete from eeconepdb.iotwtrl where stname = 'station_o4'

DROP VIEW iotwtrl_day;
CREATE VIEW iotwtrl_by_hr_station_09 AS
SELECT DATE_FORMAT(ts, '%d-%m-%Y %H:00') as dt,   
	AVG(case when 550.5 - deep >= 0 then 550.5 - deep else 0 end) as dept, 
	AVG(humidity) as humi,
	AVG(temperature) as temp
FROM eeconepdb.iotwtrl
WHERE stname = 'station_09' and ts  >= '2022-07-01'
GROUP BY dt
ORDER BY ts ASC


SELECT * 
FROM eeconepdb.iotwtrq
WHERE stname = 'station_03'
ORDER BY ts desc
LIMIT 100


select * from eeconepdb.sum_by_day_station_09



select * from eeconepdb.iotwtrl
where stname = 'station_06'
order by ts desc 
limit 10

select a.* from (SELECT stname, deep, temperature, humidity, ts,
			time(ts) as t, DATE_FORMAT(ts, '%d-%m-%y') as d
		FROM eeconepdb.iotwtrl WHERE stname='station_01'
		ORDER BY ts DESC limit 20) a
	ORDER BY a.ts ASC
	

SELECT stname, deep, temperature, humidity,
			time(ts) as t, DATE_FORMAT(ts, '%d-%m-%y') as d, ts
		FROM iotwtrl 
		WHERE stname='station_01' 
		ORDER BY ts DESC limit 20




 