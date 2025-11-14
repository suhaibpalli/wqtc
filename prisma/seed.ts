import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Surahs (first 10 as example)
  const surahs = [
    { id: 1, name: 'Al-Fatihah', verses: 7 },
    { id: 2, name: 'Al-Baqarah', verses: 286 },
    { id: 3, name: 'Ali \'Imran', verses: 200 },
    { id: 4, name: 'An-Nisa', verses: 176 },
    { id: 5, name: 'Al-Ma\'idah', verses: 120 },
    { id: 6, name: 'Al-An\'am', verses: 165 },
    { id: 7, name: 'Al-A\'raf', verses: 206 },
    { id: 8, name: 'Al-Anfal', verses: 75 },
    { id: 9, name: 'At-Tawbah', verses: 129 },
    { id: 10, name: 'Yunus', verses: 109 },
  ];

  for (const surah of surahs) {
    await prisma.surah.upsert({
      where: { id: surah.id },
      update: {},
      create: surah,
    });
  }

  // Seed Sample Videos
  await prisma.video.create({
    data: {
      title: 'Understanding Al-Fatihah - Complete Translation',
      surah_no: 1,
      surah_name: 'Al-Fatihah',
      starting_ayah: 1,
      ending_ayah: 7,
      youTube_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      keywords: 'al-fatihah, opening, translation',
      created_by: 'WQTC_Team'
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
