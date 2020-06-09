import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
    }
  }
`
const Blog = props => {
  const {
    title,
    publishedDate,
    body: { json },
  } = props.data.contentfulBlogPost
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const {
          title,
          file: {
            "en-US": { url },
          },
        } = node.data.target.fields

        return <img src={url} alt={title["en-US"]} />
      },
    },
  }
  return (
    <Layout>
      <Head title={title} />
      <h1>{title}</h1>
      <p>{publishedDate}</p>
      {documentToReactComponents(json, options)}
    </Layout>
  )
}

export default Blog
