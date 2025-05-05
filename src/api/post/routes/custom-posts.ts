
export default {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/custom-posts',
        handler: 'api::post.post.exampleAction',
      },
     
    ]
  }