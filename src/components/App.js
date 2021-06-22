import React ,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import Editor from './editor';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [html, setHtml]= useLocalStorage('html','')
  const [css, setCSS]= useLocalStorage('css','')
  const [js, setJS]= useLocalStorage('js','')
  const [srcDoc, setSrcDoc] = useState('')
  useEffect(() =>{
    const timeout=setTimeout(() => {
      setSrcDoc(
        `
       <html>
         <body>${html}</body>
         <style>${css}</style>
         <script>${js}</script>
       </html>`
      )
    },200)
    return () => clearTimeout(timeout)
  },[html,css,js])
  
  return (
    <>
       <div className="pane top-pane">
         <Editor language="xml" displayName="HTML" value={html} onChange={setHtml}/>
         <Editor language="css" displayName="CSS" value={css} onChange={setCSS} />
         <Editor language="javascript" displayName="JavaScript" value={js} onChange={setJS} />
       </div>
       <div className="pane">
         <iframe
         srcDoc={srcDoc} title="output" sandbox="allow-script" frameBorder="0" width="100%" height="100%"
         />
       </div>
    </>
  );
}

export default App;
