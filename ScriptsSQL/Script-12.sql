						SELECT ts7, stat_code , mine_e ,mine_n ,ellip_h , status  
						FROM gnssdata g 
						limit 10

time,device_id,Type,mine_n,mine_e,altitude,Status

--time,device_id,Type,mine_n,mine_e,altitude,Status
select 
	ts7, 
	stat_code as device_id,
	'LANDMOS' as type, 
	mine_n, 
	mine_e, 
	ortho_h,
	status  
from dataset limit 10

select * from stations_fillter sf 