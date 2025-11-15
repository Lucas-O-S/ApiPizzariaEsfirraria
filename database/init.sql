-- Criação da tabela de roles
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'tb_Role'
)
BEGIN
    CREATE TABLE tb_Role (
        id INT IDENTITY(1,1) PRIMARY KEY,
        role_Name VARCHAR(255) NOT NULL
    )
END

GO

IF NOT EXISTS (SELECT * FROM tb_Role WHERE role_Name = 'ADM')
BEGIN
    INSERT INTO tb_Role (role_Name) VALUES ('ADM')
END

GO

IF NOT EXISTS (SELECT * FROM tb_Role WHERE role_Name = 'USER')
BEGIN
    INSERT INTO tb_Role (role_Name) VALUES ('USER')
END

GO

IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'tb_Usuario'
)
BEGIN
    CREATE TABLE tb_Usuario (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(255) COLLATE Latin1_General_CS_AS NOT NULL,
        password VARCHAR(255)  COLLATE Latin1_General_CS_AS NOT NULL,
        roleId INT NOT NULL DEFAULT 2,
        FOREIGN KEY (roleId) REFERENCES tb_Role(id)
    )
END

GO

IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'tb_Product'
)
BEGIN
    CREATE TABLE tb_Product (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(255)  NOT NULL,
        productImage VARBINARY(MAX),
        preco DECIMAL(10,2) default 0
    )
END

GO

IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'tb_Order'
)
BEGIN
    CREATE TABLE tb_Order (
        id INT IDENTITY(1,1) PRIMARY KEY,
        userId INT not null,
        precoTotal DECIMAL(10,2) DEFAULT 0,
        FOREIGN key(userId) REFERENCES tb_Usuario(id)

    
    )
END

GO

IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'tb_OrderItem'
)
BEGIN
    CREATE TABLE tb_OrderItem (
        id INT IDENTITY(1,1) PRIMARY KEY,
        orderId INT not null,
        quantidade INT not null DEFAULT 1,
        precoTotal DECIMAL(10,2) DEFAULT 0,
        productId INT NOT NULL,
        FOREIGN key(orderId) REFERENCES tb_Order(id),
        FOREIGN key(productId) REFERENCES tb_Product(id)

    
    )
END
