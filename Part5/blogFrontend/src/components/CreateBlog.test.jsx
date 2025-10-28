import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {

	let handleCreate

	const newBlog = {
		title: 'test title',
		author: 'test author',
		url: 'http://url.com'
	}

	let titleInput
	let authorInput
	let urlInput
	let submitButton

	const fillInputs = async ({title, author, url, user}) => {
		await user.type(titleInput, title)
		await user.type(authorInput, author)
		await user.type(urlInput, url)
	}

  beforeEach(() => {

		handleCreate = vi.fn()

		render(<CreateBlog {...{handleCreate}} />)

		titleInput = screen.getByLabelText('title')
		authorInput = screen.getByLabelText('author')
		urlInput = screen.getByLabelText('url')
		submitButton = screen.getByText('create')

	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('renders content', () => {
		const element = screen.getByRole('heading')
		expect(element).toBeDefined()
	})

	test('create callback is executed', async() => {
		const user = userEvent.setup()

		await fillInputs({...newBlog, user})
		await user.click(submitButton)

		expect(handleCreate.mock.calls).toHaveLength(1)
  	expect(handleCreate.mock.calls[0][0]).toStrictEqual(newBlog)
    
	})

	test('missing title => no function call', async () => {
		const user = userEvent.setup()

		await fillInputs({...newBlog, user})
		await user.clear(titleInput)
		await user.click(submitButton)

		expect(handleCreate.mock.calls).toHaveLength(0)

	})

	test('missing author => no function call', async () => {
		const user = userEvent.setup()

		await fillInputs({...newBlog, user})
		await user.clear(authorInput)
		await user.click(submitButton)

		expect(handleCreate.mock.calls).toHaveLength(0)

	})

	test('invalid url => no function call', async () => {
		const user = userEvent.setup()

		await fillInputs({...newBlog, url:'invalid', user})
		await user.click(submitButton)

		expect(handleCreate.mock.calls).toHaveLength(0)

	})

})

