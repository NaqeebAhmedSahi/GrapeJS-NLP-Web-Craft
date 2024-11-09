import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPage, pageLoad } from "./redux/actions/pageAction";

const Home = () => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    dispatch(pageLoad(userId)); // Fetch pages when component mounts, passing userId
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false);
      return;
    }

    const userId = localStorage.getItem('userId'); // Ensure userId is stored correctly
    dispatch(createPage({ name, userId }));
    setName(""); // Clear the input field after submission
    setIsValid(true); // Reset validity
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          <form id="create-page">
            <div className="modal-header">
              <h5 className="modal-title" id="addPageModalLabel">
                Create Page
              </h5>
            </div>
            <div className="modal-body">
              <div className="col-auto">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${isValid ? "" : "is-invalid"}`}
                  id="name"
                  name="name"
                  placeholder="Name of Page"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
                onClick={() => setName("")} // Clear input field
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 my-2">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {pages.length > 0 ? pages.map((page) => (
                <tr key={page._id}>
                  <td>{page._id}</td>
                  <td>{page.name}</td>
                  <td>{page.slug}</td>
                  <td>
                    <Link to={`/editor/${page._id}`}>Edit</Link>
                  </td>
                </tr>
              )) : <tr><td colSpan="4">No Page</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
