import { useEffect, useState } from 'react';
import "./Home.css";
import BG from "./img/Layer 1.png"
import Noodle from './Noodle';
import Cart from './Cart'
import { useStateValue } from './stateprovider';
import { db, auth, firebase } from './firebase'; // Import from './firebase'
import AddNoodleButton from './AddNoodle';
function Home({ userRole, search }) {
  const [{basket},dispatch] = useStateValue();
  const [info, setInfo] = useState([]);

  // Fetch noodles
  const fetchNoodles = async () => {
    const newInfo = [];  // Create a new array to hold the fetched noodles

    const querySnapshot = await db.collection("Noodle").get();

    for (let element of querySnapshot.docs) {
      var data = element.data();

      if (typeof data.img === 'string') {
        let storageRef = firebase.storage().refFromURL(data.img);

        const url = await storageRef.getDownloadURL();
        newInfo.push({ id: element.id, img: url, ...data });  // Push new item to newInfo array
      }
    };

    setInfo(newInfo);  // Update the state with the new array
  };

  useEffect(() => {
    fetchNoodles(); // Call the function here
  }, []);

  return (<>    <div className='home'>
      <div className='home_container'>
         <div className='home_image_wrapper'>
            <img className='Home_img' src={BG} alt='' />
            <h1 className='home_title'>ร้านก๋วยเตี๋ยวสามชายยายสอน</h1>
        </div>
        <div className='home_row'>
  {
    info
      .filter(noodle => {
        if (!search) return true;
        return noodle.name.toLowerCase().includes(search.toLowerCase());
      })
      .map((item, idx) => (
        <Noodle
          key={item.id}
          id={item.id}
          title={item.name}
          price={item.price}
          img={item.img}
          userRole={userRole}
          updateNoodles={fetchNoodles} // Pass the fetchNoodles function as props
        />
      ))
  }
  {userRole === 'Admin' && <AddNoodleButton updateNoodles={fetchNoodles} />}
</div>

        
      </div>
    </div>
    <div>
        {basket.length > 0 && <Cart />}
      </div>
</>    
  );
}

export default Home;
