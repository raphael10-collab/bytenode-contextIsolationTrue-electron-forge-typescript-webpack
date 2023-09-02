import * as React from 'react';

const Empty = React.lazy(() => import('./empty'))

function App() {



window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  replaceText('renderer', '👍')

  if (__filename) {
    replaceText('node-renderer', '👍')
  }
})

  return (
    <div className='container'>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Empty />
      </React.Suspense>

    </div>
  );
}


export default App;


// Export to keep from being tree-shaken by Webpack
export const SOURCE_TEST =
  '*** If this text appears in your packaged app, it means Bytenode is NOT configured correctly! #SOURCE-TEST ***'
