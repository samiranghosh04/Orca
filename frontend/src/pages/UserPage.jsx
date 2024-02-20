//import SearchBar from '../components/SearchBar';
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';

const UserPage = () => {
  return (
    <>
      {/*<SearchBar/>*/}
      <UserHeader />
      <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Lets Talk about Orca"/>
      <UserPost likes={200} replies={81} postImg="/post2.png" postTitle="Noice Tutorial"/>
      <UserPost likes={9000} replies={2481} postImg="/post3.png" postTitle="I love shitting on this guy"/>
      <UserPost likes={4250} replies={1481}  postTitle="Hi Orca!"/>
    </>
  )
}

export default UserPage