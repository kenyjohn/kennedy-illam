import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rental.com' },
    update: {},
    create: {
      email: 'admin@rental.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  });

  console.log({ admin });

  // Create Sample Properties
  const prop1 = await prisma.property.create({
    data: {
      title: 'Modern Downtown Apartment',
      description: 'A beautiful 2-bedroom apartment in the heart of the city. Walking distance to all amenities.',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      available: true,
      petsAllowed: true,
      features: 'Gym,Pool,Doorman',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80' },
          { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80' },
        ],
      },
    },
  });

  const prop2 = await prisma.property.create({
    data: {
      title: 'Cozy Suburban House',
      description: 'Perfect family home with a large backyard and garage.',
      address: '456 Maple Ave',
      city: 'White Plains',
      state: 'NY',
      zip: '10601',
      price: 3200,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2000,
      available: true,
      petsAllowed: true,
      features: 'Garage,Backyard,Fireplace',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80' },
        ],
      },
    },
  });

  console.log({ prop1, prop2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
