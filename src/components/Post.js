import React from 'react';

function Post({ post }) {
  const { caption, location, photo } = post;
  return (
    <div>
      {caption}, {location}
      <img src={photo} alt={caption} style={{ width: '100px' }} />
    </div>
  );
}

export default Post;
