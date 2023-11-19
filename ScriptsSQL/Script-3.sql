SELECT *, ts, DATE_FORMAT(ts, '%Y-%m-%dT%H:%i:%s.%fZ') as ts2
FROM eeconepdb.iotwtrl 
ORDER BY ts DESC 
LIMIT 100



SELECT temperature, ts, DATE_FORMAT(ts, '%Y-%m-%d') as ts2 
FROM eeconepdb.iotwtrl
WHERE stname='station_09' 
ORDER BY ts DESC
LIMIT 50

SELECT * FROM eeconepdb.iotwtrq i 
ORDER BY gid DESC  limit 1

SELECT i.stname, i.mm, avg(i.do) as do,  avg(i.ec) as ec, avg(i.ph) as ph, avg(i.tmp) as tmp
FROM (SELECT *,DATE_FORMAT(ts, '%Y-%m') as mm FROM eeconepdb.iotwtrq) i
GROUP BY i.mm,i.stname
ORDER BY i.stname, i.mm
WHERE stname = 'station_03'



SELECT * 
FROM eeconepdb.iotwtrq i 
GROUP 