CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAtDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAtDate` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,

    UNIQUE INDEX `Product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

DELETE FROM Product;
DELETE FROM Category;

INSERT INTO Category (id, name) VALUES
('cat-1', 'Lanche'),
('cat-2', 'Acompanhamento'),
('cat-3', 'Bebida'),
('cat-4', 'Sobremesa');

INSERT INTO Product (id, name, description, categoryId, price) VALUES
('prod-1', 'X-Burguer', 'Pão, carne, queijo, alface, tomate e molho', 'cat-1', 20),
('prod-2', 'X-Bacon', 'Pão, carne, bacon, queijo, alface, tomate e molho', 'cat-1', 30),
('prod-3', 'Pudim', 'Pudim de leite ninho', 'cat-4', 10),
('prod-4', 'Suco', 'Suco natural 500 mL', 'cat-3', 8),
('prod-5', 'Bata frita', 'Porção generosa de batata frita', 'cat-2', 10);
