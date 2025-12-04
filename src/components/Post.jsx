import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { LikePost } from './LikePost.jsx'

export function Post({
  title,
  contents,
  imageUrl,
  author: userId,
  _id,
  likes = 0,
}) {
  return (
    <article>
      <h3>Recipe Name: {title}</h3>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt={title}
            style={{ width: '100px', borderRadius: '8px' }}
          />
        </div>
      )}
      <h4>Ingredient List:</h4>
      <div>{contents}</div>
      {userId && (
        <em>
          <br />
          Created and cooked by <User id={userId} />
        </em>
      )}
      <div>Likes: {likes}</div>
      <div style={{ marginTop: '8px' }}>
        <LikePost postId={_id} initialLikes={likes} />
      </div>
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  imageUrl: PropTypes.string,
  author: PropTypes.string,
  _id: PropTypes.string.isRequired,
  likes: PropTypes.number,
}
