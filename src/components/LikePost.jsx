import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { likePost } from '../api/posts.js'

export function LikePost({ postId, initialLikes = 0 }) {
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const [likes, setLikes] = useState(initialLikes)

  const likeMutation = useMutation({
    mutationFn: () => likePost(token, postId),
    onSuccess: (updatedPost) => {
      setLikes(updatedPost.likes)
      queryClient.invalidateQueries(['posts'])
      queryClient.invalidateQueries(['post', postId])
    },
  })

  if (!token)
    return <div style={{ opacity: 0.6 }}>Please log in to like posts.</div>

  return (
    <button
      onClick={() => likeMutation.mutate()}
      disabled={likeMutation.isPending}
      style={{
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        background: '#fff',
      }}
    >
      {likeMutation.isPending ? 'Liking...' : 'CLICK TO LIKE'}
    </button>
  )
}
