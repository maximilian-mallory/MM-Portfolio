import './App.css';
import {NavBar} from './components/NavBar'
import { Route, Routes, Outlet } from 'react-router-dom'
import bannerImage from './assets/banner.jpg';
import {useState, useEffect} from 'react';
import { SplitScreen } from './components/SplitScreen';
import headshot from './assets/headshot.jpg';
import { LinkButton } from './components/Buttons';

function Home() {
  return <h1>Home</h1>
}



function About() {

  const [aspectRatio, setAspectRatio] = useState('landscape'); // Assume landscape by default

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newAspectRatio = width >= height ? 'landscape' : 'portrait';
      setAspectRatio(newAspectRatio);
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);
    
    console.log(`screen resized to ${aspectRatio}`)

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSplitScreenWeights = () => {
    if (aspectRatio === 'portrait') {
      return { leftWeight: 1, rightWeight: 2 };
    } else {

      return { leftWeight: 1, rightWeight: 4 };
    }
  };

  return (
  <SplitScreen {...getSplitScreenWeights()}>
    <BioComponent />
    <HistoryComponent/>
    </SplitScreen>
  )
  
}

const HistoryComponent = () => {
  return ( 
    <div id='historyComponent'> 
    <h1>History</h1>
    </div>
  )
  
  
}

const BioComponent = () => {
  const [ data, setData ] = useState();
  const [ error, setError ] = useState();
  const [ loading, setLoading ] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.github.com/users/maximilian-mallory`,
    )
    .then((response) => response.json())
    .then(setData)
    .then(() => setLoading(false))
    .catch(setError)
  }, [])

  if(loading) return <h1>Loading...</h1>
  if(error) 
    return <pre>{JSON.stringify(error)}</pre>;
  if(!data) return null

  const programurl = "https://www.dctc.edu/academics/programs-majors/stem/software-development/software-development-datasheet/"
  
  return ( 
    <div id="bioComponent">
      <div >
      <h1>About Me</h1>
      <h2>
        {data.name}
      </h2>
      <img src={data.avatar_url} height={150} alt='avatar'/> {/* Github API won't always respond with the avatar image so I placed it in assets */}
      <p>
        {data.location}
      </p>
      <p>{data.bio}</p>
      <LinkButton buttonText="Github" url={data.html_url} color="#6cc644"/>
      <LinkButton buttonText="LinkedIn" url={"https://www.linkedin.com/in/maximilian-mallory/"} color="#0077B5"/>
      <LinkButton buttonText="Degree Requirements" url={programurl} color="#6e5494"/>
      </div>
      
    </div>
  )
}

function Contact() {
  return <h1>Contact</h1>
}

function App() {
  return (
    <>
    <div className='navBanner'/>
    <NavBar/>
    <Routes>
      <Route 
        path="/" 
        element={<Home />}>
      </Route>
      <Route 
        path="/about" 
        element={<About />}>
      </Route>
      <Route 
        path="/contact" 
        element={<Contact />}>
      </Route>
    </Routes>
    </>
    
  );
}

export default App;
