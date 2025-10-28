const fillLogin = async(user, pass, page) => {
    await page.getByLabel('username').fill(user)
    await page.getByLabel('password').fill(pass)
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForResponse('http://localhost:5173/api/login')
}

const createBlog = async(title, author, url, page) => {
    await page.getByRole('button', { name: 'create new' }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create', exact: true }).click()
}

module.exports = {fillLogin, createBlog}