import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const vegan = await prisma.tag.upsert({
    where: { name: 'Vegan' },
    update: {},
    create: {
      name: 'Vegan',
    },
  })
  const vegetarian = await prisma.tag.upsert({
    where: { name: 'Vegetarian' },
    update: {},
    create: {
      name: 'Vegetarian',
    },
  })
  const glutenFree = await prisma.tag.upsert({
    where: { name: 'Gluten free' },
    update: {},
    create: {
      name: 'Gluten free',
    },
  })
  const lowSugar = await prisma.tag.upsert({
    where: { name: 'Low sugar' },
    update: {},
    create: {
      name: 'Low sugar',
    },
  })
  const lowSalicylate = await prisma.tag.upsert({
    where: { name: 'Low salicylate' },
    update: {},
    create: {
      name: 'Low salicylate',
    },
  })
  console.log({ vegan, vegetarian, glutenFree, lowSugar, lowSalicylate })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
