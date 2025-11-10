import { useState } from "react"

const useField = (name, type, caption) => {

  const [value, setValue] = useState('')
  const onChange = (event) => {setValue(event.target.value)}
	const reset = () => {setValue('')}

	if (!caption) {caption = name}

  return {
		name,
    type,
		caption,
    value,
    onChange,
		reset
  }
}

export default useField