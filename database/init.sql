IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'SistemasLanches')
BEGIN
    CREATE DATABASE SistemasLanches;
END

go

USE SistemasLanches;

