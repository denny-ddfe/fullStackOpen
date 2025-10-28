const { test, expect, beforeEach, describe } = require('@playwright/test')
require('dotenv').config()
const axios = require('axios')
const helper = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page }) => {
    await axios.post('http://localhost:3001/api/testing/reset')
    await page.goto('http://localhost:5173')
  })

  //############################################################################

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByRole('textbox', {name:'username'})).toBeVisible()
  })

  //############################################################################

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.fillLogin(process.env.UNAME, process.env.PASSWORD, page)
      await expect(page.getByRole('heading', {name:'blogs'})).toBeVisible()

    })

    ////////////////////////////////////////////////////////////////////////////

    test('fails with wrong credentials', async ({ page }) => {
      await helper.fillLogin('a', 'b', page)

      await expect(page.getByText('Login failed')).toBeVisible()

    })
  })

  //############################################################################

  describe('When logged in', () => {

    beforeEach(async({page}) => {
      await helper.fillLogin(process.env.UNAME, process.env.PASSWORD, page)
    })

    ////////////////////////////////////////////////////////////////////////////

    test('create a blog', async ({page}) => {

      await helper.createBlog(
        'qwertyuiop', 
        'asdfghjkl', 
        'http://example.com',
        page
      )

      await expect(page.locator('.notif.success')).toBeVisible()

      await expect(page.locator(
        '.blogHeading',
        { hasText: 'qwertyuiop by asdfghjkl' }
      )).toBeVisible()

    })

    ////////////////////////////////////////////////////////////////////////////

    test('like a blog', async ({page}) => {
      
      const blogDiv = page.locator(
        '.blog',
        { hasText: 'React patterns by Michael Chan' }
      )
      await blogDiv.getByRole('button', { name: 'view' }).click()

      const tmp = await blogDiv.locator('.blogLikes').textContent()
      const likesBefore = Number(tmp.match(/likes: (\d+)/)[1])

      await blogDiv.getByRole('button', { name: 'like' }).click()
      await page.waitForResponse('http://localhost:5173/api/blogs/*')

      expect(blogDiv.locator('.blogLikes')).toHaveText(`likes: ${likesBefore+1}`)

    })

    ////////////////////////////////////////////////////////////////////////////

    test('blog delete button is only visible to the blog creator', async ({page}) => {

      const blogDiv = page.locator(
        '.blog',
        { hasText: 'TDD harms architecture by Robert C. Martin' }
      )

      expect(blogDiv.getByRole('button', {name: 'remove'})).toBeVisible()

      await page.getByRole('button', {name: 'log out'}).click()
      await helper.fillLogin(process.env.UNAME2, process.env.PASSWORD2, page)

      const blogDivAfter = page.locator(
        '.blog',
        { hasText: 'TDD harms architecture' }
      )

      expect(blogDivAfter.getByRole('button', {name: 'remove'})).not.toBeVisible()

    })

    ////////////////////////////////////////////////////////////////////////////

    test('blog can be deleted', async ({page}) => {
      
      const blogDiv = page.locator(
        '.blog',
        { hasText: 'TDD harms architecture by Robert C. Martin' }
      )

      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })

      await blogDiv.getByRole('button', {name: 'remove'}).click()
      await page.waitForResponse('http://localhost:5173/api/blogs/*')

      await expect(page.locator('.notif.success')).toBeVisible()

      expect(page.locator(
        '.blog',
        { hasText: 'TDD harms architecture by Robert C. Martin' }
      )).not.toBeVisible()

    })

    test('blogs display in order of likes', async ({page}) => {

      const blogDivs = page.locator('.blog');
      const count = await blogDivs.count()

      for (let i=0; i<count-1; i+=1) {

        const tmp = await blogDivs.nth(i).locator('.blogLikes').textContent()
        const currentBlogLikes = Number(tmp.match(/likes: (\d+)/)[1])

        const tmp2 = await blogDivs.nth(i+1).locator('.blogLikes').textContent()
        const nextBlogLikes = Number(tmp2.match(/likes: (\d+)/)[1])

        expect(currentBlogLikes).toBeGreaterThanOrEqual(nextBlogLikes)

      }

    })

  })

  //////////////////////////////////////////////////////////////////////////////

})