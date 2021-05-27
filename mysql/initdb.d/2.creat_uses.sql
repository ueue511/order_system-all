CREATE DATABASE IF NOT EXISTS order_system;
CREATE USER 'systemuser'@'%' IDENTIFIED BY 'j&D7CWvp';

GRANT ALL ON order_system.* TO 'systemuser'@'%';