import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

	let like

  beforeEach(() => {
		const blog = {
			"title": "test title",
			"author": "test author",
			"url": "https://testURL.com",
			"likes": 69,
			"user": "68f1d061da31ce8cc39c8605",
			"_id": "68f061b49da585757ea51986"
		}

		like = vi.fn()

		render(<Blog {...{blog, like}} />)
	})
 
	afterEach(() => {
		vi.resetAllMocks()
	})

	test('renders content', () => {
		const element = screen.getByText('test title', { exact: false })
		expect(element).toBeDefined()
	})

	test('likes/URL not initially visible', () => {
		const element = screen.getByText('url:', { exact: false })
  	expect(element).not.toBeVisible()
	})

	test('likes/URL become visible when button is clicked', async () => {
		const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText('url:', { exact: false })
    expect(element).toBeVisible()
	})

	test('like callback is executed', async () => {
		const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
		await user.click(button)

    expect(like.mock.calls).toHaveLength(2)
	})

})

