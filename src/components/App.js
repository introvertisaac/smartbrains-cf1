import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useFirebaseStorage from '../hooks/useFirebaseStorage'
import penWhite from "../icons/pen-white.svg";
import penBlack from "../icons/pen-black.svg";
import resetWhite from "../icons/reset-white.svg";
import resetBlack from "../icons/reset-black.svg";
import layoutWhite from "../icons/layout-white.svg";
import layoutBlack from "../icons/layout-black.svg";
import sun from "../icons/sun.svg";
import moon from "../icons/moon.svg";
import { getDatabase, ref, onValue, set, off } from 'firebase/database';


let mode = 1;
let layout = 0;

function App() {
  const [html, setHtml] = useFirebaseStorage('html', '')
  const [css, setCss] = useFirebaseStorage('css', '')
  const [js, setJs] = useFirebaseStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [toogleMode, setToogleMode] = useState('');
  const [ChangeLayout, setChangeLayout] = useState('');
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])

  const reset = () => {
    setHtml('');
    setCss('');
    setJs('');
  }

  const changeLayout = () => {
    layout = !layout;
    setChangeLayout(layout);
  }

  const toggleMode = () => {
    mode = !mode;
    setToogleMode(mode);
  }

  const saveProject = () => {
    const projectName = prompt('Enter a name for your project:');
    if (projectName) {
      const db = getDatabase();
      set(ref(db, `projects/${projectName}`), { html, css, js });
    }
  };
  

  return (
    <div style={{ backgroundColor: mode ? "black" : "white" }}>
      <header>
        <div className='menu-bar'>
          <h2 style={{ color: mode ? "white" : "black" }}> Untitled <img className='pencil' src={mode ? penWhite : penBlack} /></h2>
          <div>
            <button type='submit' onClick={reset}><img className='reset' src={mode ? resetWhite : resetBlack} /></button>
            <button onClick={changeLayout}><img className='layout' src={mode ? layoutWhite : layoutBlack} /></button>
            <button onClick={toggleMode}><img className='mode' src={mode ? sun : moon} alt="icon" /></button>

            <button type='button' onClick={saveProject} style={{ borderRadius: '50%', margin: '10px', padding: '5px', color: mode ? 'white' : 'black', borderColor: mode ? 'white' : 'black' }}>Save Project</button>

            <button
  type='button'
  onClick={() => window.open(window.location.pathname + '?id=' + Math.random().toString(36).substr(2, 9), '_blank')}
  style={{ borderRadius: '50%', margin: '10px', padding: '5px', color: mode ? 'white' : 'black', borderColor: mode ? 'white' : 'black' }}
>
  New Project
</button>


            <button type='button' onClick={() => {}} style={{ borderRadius: '50%', margin: '10px', padding: '5px', color: mode ? 'white' : 'black', borderColor: mode ? 'white' : 'black' }}>Dashboard</button>
          </div>
        </div>
        <p style={{ color: mode ? "white" : "black" }}>short description</p>
      </header>
      <div style={{ display: 'flex', flexDirection: layout ? 'row' : 'column' }}>
        <div className="editors pane" style={{ display: 'flex', flexDirection: layout ? 'column' : 'row', height: layout ? '89vh' : '38.5vh', width: layout ? '30vw' : '99.5vw' }}>
          <Editor
            displayName="HTML"
            language="xml"
            value={html}
            onChange={setHtml}
            mode={mode}
          />
          <Editor
            displayName="CSS"
            language="css"
            value={css}
            onChange={setCss}
            mode={mode}
          />
          <Editor
            displayName="JS"
            language="javascript"
            value={js}
            onChange={setJs}
            mode={mode}
          />
        </div>
        <div className="output pane" style={{ border: mode ? '.1px solid white' : '.1px solid black', height: layout ? '87vh' : '48.5vh', width: layout ? '69.5vw' : '98vw', margin: '0 1vw 0.7vw 1vw' }}>
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  )
}

export default App;
