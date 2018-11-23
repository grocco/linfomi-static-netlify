import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ posts }) => (
  <div>
    <div>It's blog time.</div>
    <br />
    All Posts:
    <ul>
      {posts.map(post => (
        <li key={post.data.slug}>
          <Link to={`/blog/post/${post.data.slug}`}>{post.data.title}</Link> 
        </li>
      ))}
    </ul>
  </div>
))
