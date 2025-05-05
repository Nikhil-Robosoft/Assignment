
export default {
    routes: [
      { // Path defined with a URL parameter
        method: 'PUT',
        path: '/posts/:id/like',
        handler: 'api::post.post.likePost',
      },
     
    ]
  }