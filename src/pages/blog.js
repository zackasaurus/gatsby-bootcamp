import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from "gatsby"
import blogStyles from "./blog.module.scss"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            slug
            title
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `)
  const { edges } = data.allContentfulBlogPost
  const posts = edges.map(({ node }) => {
    const { title, publishedDate, slug } = node
    return (
      <li key={slug} className={blogStyles.post}>
        <Link to={`/blog/${slug}`}>
          <h2>{title}</h2> <p>{publishedDate}</p>
        </Link>
      </li>
    )
  })
  return (
    <Layout>
      <h1>Blog</h1>
      <p>Posts will show up here later on.</p>
      <ol className={blogStyles.posts}>{posts}</ol>
    </Layout>
  )
}

export default BlogPage
