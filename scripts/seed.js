const { seedDatabase } = require('../app/lib/seed.ts')

console.log('🌱 Starting database seeding...')

seedDatabase()
  .then(() => {
    console.log('🎉 Database seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Database seeding failed:', error)
    process.exit(1)
  })
