import './App.css';
import {NavBar} from './components/NavBar'
import { Route, Routes, Outlet } from 'react-router-dom'
import bannerImage from './assets/banner.jpg';
import {useState, useEffect} from 'react';
import { SplitScreen } from './components/SplitScreen';
import headshot from './assets/headshot.jpg';
import { LinkButton } from './components/Buttons';
import { CourseItem, RegularList } from './components/CourseItem';
import axios from 'axios';

function Home() {

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
      return { leftWeight: 2, rightWeight: 1 };
    } else {

      return { leftWeight: 3, rightWeight: 1 };
    }
  };

  return (
    <>
    <div id='mainDiv'>
    <SplitScreen {...getSplitScreenWeights()}>
    <HistoryComponent/>
    <BioComponent />
    </SplitScreen>
    </div>
    </>
  )
}

/*const courses = [
  {
    name: 'Database Systems',
    description: 'This course taught me how to use SQL and Microsoft Access to query data from a relational database'
  },
  {
    name: 'Web Programming III',
    description: 'This course was my program capstone. I managed and developed a web application mimicking the popular game GeoGuesser.'
  }
]*/

const HistoryComponent = () => {
  const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/data');
                setCourses(response.data);
                console.log(response.data)
                console.log(courses)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  return ( 
    <div id='historyComponent'> 
    <h3>Courses Taken:</h3>
    <RegularList
      items={courses}
      resourceName="course"
      itemComponent={CourseItem}
    />
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
        path="/contact" 
        element={<Contact />}>
      </Route>
    </Routes>
    </>
    
  );
}

export default App;
