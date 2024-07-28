import "./searchbar.scss";

function SearchBar() {
  return (
    <div className="searchBar">
       <form>
            <input type="text" name="course_Name" placeholder="Course Name"/>
            <button>
                <img src="/search.png" alt="" />
            </button>
       </form>
    </div>
  )
}

export default SearchBar