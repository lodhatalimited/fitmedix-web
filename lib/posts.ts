import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDir = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'))
      return { slug, ...data } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  const html = await marked(content)
  return { slug, ...data, content: html } as Post
}
