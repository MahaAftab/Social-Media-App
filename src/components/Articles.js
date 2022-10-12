import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";
import AddArticle from "./AddArticle";
import LoadingSpinner from '../components/loading/LoadingSpinner'
import { where } from "firebase/firestore";
import { startAfter } from "firebase/firestore";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Articles = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState();
  const [listOfArticles, setListOfArticles] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [fetchLoad, setFetchLoad] = useState(false);
  const [disable, isDisabled] = useState(false)
  let navigate = useNavigate();


  const SearchArticle = async () => {
    if(navigator.onLine == false){
      toast("To Search something, Make sure you are connected to internet", { type: "error" });
    }
    else{
      const collectionref = collection(db, "Articles");
      const q = query(collectionref, where("title", "==", `${search}`, orderBy("createdAt", "desc"), limit(4)));
      onSnapshot(q, (snapshot) => {
        const articles = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          key: doc.id
        }))
        setListOfArticles(articles);
        isDisabled(true)
        navigate('/articles')
      }
      );
    }

    }
    
  useEffect(() => {
    setLoading(true);
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(4));
    updateState(q);

  },[]);

  const updateState = (q) => {
    if(navigator.onLine == false){
      toast("To Load More Articles, Make sure you are connected to internet", { type: "error" });
    }
    else{
      onSnapshot(q, async (snapshot) => {
        console.log("snapshot: ", snapshot.docs)
        const articles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
  
        }));
        const lastDoc = snapshot.docs[snapshot.docs.length - 1]
        setListOfArticles((listOfArticles) => [...listOfArticles, ...articles]);
        setLoading(false)
        setFetchLoad(false)
        console.log("This is fetch more", listOfArticles)
        setLastDoc(lastDoc)
      });
    }
   

  }

  //FETCH MORE
  const fetchMore = async () => {
    setFetchLoad(true)
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(4));
    console.log('LAST DOC IN FETCH MORE: ', lastDoc);
    updateState(q)
  }
  return (
    <div>
      <div style={{ marginTop: 100, }}>
        <AddArticle />
        <h2>Search article</h2>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title" type="text" placeholder="title" 
          onChange={(e) => {
            // if (e.key === 'Enter') {
              setSearch(e.target.value)
            // }
          }
          } />
          <Button onClick={SearchArticle} variant='secondary' style={{color: 'green',}}>Search</Button>

        {loading ? (

          <LoadingSpinner res="Loading articles.." />
        ) : (
          listOfArticles.map(
            ({
              id,
              title,
              description,
              imageUrl,
              createdAt,
              createdBy,
              userId,
              likes,
              comments,
            }) => (
              <div>
                <div className="border rounded mt-3 p-3 bg-light" key={id}>
                  <div className="row">
                    <div className="col-3">
                      <Link to={`/article/${id}`}>
                        <img
                          src={imageUrl}
                          alt="title"
                          style={{ height: 180, width: 180 }}
                        />
                      </Link>
                    </div>
                    <div className="col-9 ps-3">
                      <div className="row">
                        <div className="col-6">
                          {createdBy && (
                            <span className="badge bg-primary">{createdBy}</span>
                          )}
                        </div>
                        <div className="col-6 d-flex flex-row-reverse">
                          {user && user.uid === userId && (

                            <DeleteArticle id={id} imageUrl={imageUrl} />
                          )}
                        </div>
                      </div>
                      <h3>{title}</h3>
                      <p>{createdAt.toDate().toDateString()}</p>
                      <h5>{description}</h5>

                      <div className="d-flex flex-row-reverse">
                        {user && <LikeArticle id={id} likes={likes} />}
                        <div className="pe-2">
                          <p>{likes?.length} likes</p>
                        </div>
                        {comments && comments.length > 0 && (
                          <div className="pe-2">
                            <p>{comments?.length} comments</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )
          )
        )}
      </div>
      {/* <Pagination count={10} color="secondary" style={{paddingTop: 15, paddingBottom: 15}}/> */}
      {fetchLoad && <h2>Loading...</h2>}
      <div style={{textAlign:'center'}}>
   {!loading &&   <Button onClick={fetchMore} disabled={disable} className="shadow appearance-none border rounded focus:shadow-outline" style={{marginTop: 25, marginBottom: 25, }}>Load more</Button>}
      </div>

    </div>
  );
}


export default Articles