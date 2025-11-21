import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const queryClient = useQueryClient()
  const [token] = useAuth()

  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents, imageUrl }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Recipe Name: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='ingredients'>Ingredient List: </label>
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='imageUrl'>Image URL: </label>
        <input
          type='text'
          id='imageUrl'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title}
      />
    </form>
  )
}
