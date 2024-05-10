import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:4000/${id}`);
    const result = await response.json();

    setName(result.name);
    setEmail(result.email);
    setAge(result.age);
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const result = await response.json();
    console.log(result);

    navigate("/all");
  };

  return (
    <div className="container my-2">
      <h2 className="text-center">Edit Data</h2>

      <form onSubmit={handleEdit}>
        <div className="mb-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mt-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6 mt-4">
          <label className="form-label">Age</label>
          <input
            type="type"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
