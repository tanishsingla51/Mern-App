import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [posts, setPosts] = useState(); // [1]

  async function getPosts() {
    const response = await fetch("http://localhost:4000");
    const result = await response.json();

    console.log(result);
    setPosts(result);
  }
  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });

    setTimeout(() => {
      getPosts();
    }, 100);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">All Posts</h2>
      <div className="row">
        {posts?.map((post) => (
          <div key={post._id} className="col-3">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">{post.name}</h5>
                <p className="card-text">{post.email}</p>
                <p className="card-text">{post.age}</p>
                <Link to={`/${post._id}`} className="btn btn-primary">
                  Edit
                </Link>
                <a
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
