import React from 'react';
import styles from '$client/app/not-found/styles';

import image_notFound from '$client/assets/images/misc/404.png';

export default function NotFoundPage() {
  return (
    <div className="main-container not-found-container">
      <div className="error-name">
        <h2>Error in the server!</h2>
        <h2>404 Not Found</h2>
      </div>
      <img src={image_notFound} alt="Not Found" className="not-found-image" />
      <div className="error-message">
        <span>The webpage you requested could not be found on the server.</span>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
}
