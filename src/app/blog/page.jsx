import React from 'react'
import { getPosts } from '@/lib/data';

const posts = await getPosts();

const BlogPage = async () => {
  return (
    <div className="">
      <h3>BlogPage</h3>
      <ul>
        {posts.map(post => (
          <li className="ml-5 mb-2" key={post.id}>
            <h3 className='font-bold'>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage