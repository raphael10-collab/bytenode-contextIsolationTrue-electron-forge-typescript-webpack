import * as React from 'react';

const Empty = React.lazy(() => import('./empty'))

function App() {

  return (
    <div className='container'>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Empty />
      </React.Suspense>

    </div>
  );
}


export default App;
