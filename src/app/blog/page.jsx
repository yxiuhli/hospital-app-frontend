import React from 'react'
import styles from "./blog.module.css";
import { getPosts } from '@/lib/data';

const posts = await getPosts();

const BlogPage = async () => {
  return (
    <div className={styles.container}>
      <h3>BlogPage</h3>
      <ul>
        {posts.map(post => (
          <li className={styles.post} key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage