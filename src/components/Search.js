// import React from 'react'

// function Search() {

//     const SearchArticle = async () => {
 
//         const collectionref = collection(db, "Articles");
//         const q = query(collectionref, where("title", "==", `${search}`, orderBy("createdAt", "desc"), limit(4)));
//         onSnapshot(q, (snapshot) => {
//           const articles = snapshot.docs.map((doc) => ({
//             ...doc.data(),
//             id: doc.id,
//             key: doc.id
//           }))
//           setListOfArticles(articles);
//           isDisabled(true)
//           navigate('/articles')
//         }
//         );
//       }
      
//     useEffect(() => {
//         setFilteredContacts(
//           listOfArticles.filter(
//             (user) =>
//               user.title.toLowerCase().includes(search.toLowerCase())
//           )
//         );
//       }, [search, contacts]);
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Search
