import { Hono } from 'hono'
import * as cheerio from 'cheerio'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/:user/:itemId', async (c) => {
  const { user, itemId } = c.req.param()
  const res = await fetch(`https://qiita.com/${user}/items/${itemId}`)
  if (!res.ok) return
  const $ = cheerio.load(await res.text())
  return await fetch($('meta[property="og:image"]').attr('content') || '')
})

export default app
