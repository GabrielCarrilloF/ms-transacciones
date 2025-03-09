CREATE DATABASE IF NOT EXISTS `transactions_db`;  
USE `transactions_db`;

-- Tabla de Cuentas
CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(50) NOT NULL UNIQUE,       -- Número único de cuenta
    account_type ENUM('savings', 'checking') NOT NULL, -- Tipo de cuenta (solo 'savings' o 'checking')
    account_holder_id INT NOT NULL,                     -- ID del titular de la cuenta (podría ser llave foránea a una tabla de usuarios)
    holder_name VARCHAR(100) NOT NULL,                  -- Nombre del titular de la cuenta
    balance DECIMAL(10,2) NOT NULL DEFAULT 0,           -- Saldo actual de la cuenta
    currency VARCHAR(10) NOT NULL DEFAULT 'COP',        -- Moneda en la que opera la cuenta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Fecha de creación de la cuenta
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Fecha de última actualización
) ENGINE=InnoDB;

-- Tabla de Transacciones
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_account_id INT DEFAULT NULL,                   -- Cuenta origen 
    to_account_id INT DEFAULT NULL,                     -- Cuenta destino 
    transaction_type ENUM('deposit', 'withdrawal', 'transfer') NOT NULL,  -- Tipo de transacción
    amount DECIMAL(10,2) NOT NULL,                        -- Monto de la transacción
    currency VARCHAR(10) NOT NULL DEFAULT 'COP',         -- Moneda de la transacción
    description VARCHAR(255) DEFAULT NULL,              -- Descripción de la transacción
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de la transacción
    FOREIGN KEY (from_account_id) REFERENCES accounts(id),
    FOREIGN KEY (to_account_id) REFERENCES accounts(id)
) ENGINE=InnoDB;

DESCRIBE accounts;
DESCRIBE transactions;