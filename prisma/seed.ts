import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.category.createMany({
        data: [
            {
                id: 'cat-1',
                name: 'Lanche'
            },
            {
                id: 'cat-2',
                name: 'Acompanhamento'
            },
            {
                id: 'cat-3',
                name: 'Bebida'
            },
            {
                id: 'cat-4',
                name: 'Sobremesa'
            }
        ]
    });

    await prisma.product.createMany({
        data: [
            {
                id: 'prod-1',
                name: 'X-Burguer',
                description: 'Pão, carne, queijo, alface, tomate e molho',
                categoryId: 'cat-1',
                price: 20,
            },
            {
                id: 'prod-2',
                name: 'X-Bacon',
                description: 'Pão, carne, bacon, queijo, alface, tomate e molho',
                categoryId: 'cat-1',
                price: 30,
            },
            {
                id: 'prod-3',
                name: 'Pudim',
                description: 'Pudim de leite ninho',
                categoryId: 'cat-4',
                price: 10,
            },
            {
                id: 'prod-4',
                name: 'Suco',
                description: 'Suco natural 500 mL',
                categoryId: 'cat-3',
                price: 8,
            },
            {
                id: 'prod-5',
                name: 'Bata frita',
                description: 'Porção generosa de batata frita',
                categoryId: 'cat-2',
                price: 10,
            },
        ]
    })

}

main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e)=> {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
