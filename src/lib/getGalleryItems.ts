import 'server-only'
import fs from 'fs'
import path from 'path'

export type GalleryItem = {
  id: string
  category: string
  image: string
}

const PRODUCTS_DIR = path.join(process.cwd(), 'public', 'images', 'products')
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const EXCLUDED_FILES = new Set(['images.jpeg'])

export function getGalleryItems(): GalleryItem[] {
  let categories: string[] = []
  try {
    categories = fs
      .readdirSync(PRODUCTS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
  } catch {
    return []
  }

  const items: GalleryItem[] = []

  for (const category of categories) {
    const categoryDir = path.join(PRODUCTS_DIR, category)
    const files = fs
      .readdirSync(categoryDir)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .filter((file) => !EXCLUDED_FILES.has(file))
      .sort()

    for (const file of files) {
      items.push({
        id: `${category}/${file}`,
        category,
        image: `/images/products/${category}/${encodeURIComponent(file)}`,
      })
    }
  }

  return items
}
