import { request, gql } from 'graphql-request';


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;
  
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: {slug : $slug}) {
            author {
              bio
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
              content {
              raw
              }
          } 
    }
  `;
  
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};


export const getRecentPosts = async () => {
  const query = gql`
    query GetPostsDetails {
      posts(
        orderBy: createdAt_ASC,
        last: 3
      ) {
        title   
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimilarPosts = async (category, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $category: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {category_some: {slug_in: $category}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  
  const result = await request(graphqlAPI, query, { category, slug });
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  
  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const submitComment = async (obj) => {
  try {
    const response = await fetch('/api/comments', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error submitting comment:, ${error}`);
    throw error; // or handle the error as per your application's requirements
  }
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: {slug: $slug}}) {
      name
      createdAt
      comment
      }
      }
    
  `
  
  const result = await request(graphqlAPI, query, {slug});
  return result.comments;
};

export const getCategoryPost = async (slug) => {
  console.log("Pissed");
  console.log('Slug:', slug); // Log the slug variable
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};



