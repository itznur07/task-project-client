import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";

const App = () => {
  /** All States Here */
  const [sectors, setSectors] = useState([]);
  const [userData, setUserData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [editingData, setEditingData] = useState(null);
  /** All States Ends Here */

  /** Sector Data Fetching Here */
  useEffect(() => {
    fetch("https://task-project-server.vercel.app/sectordata")
      .then((res) => res.json())
      .then((data) => setSectorData(data));
  }, []);
  /** Sector Data Fetching Ends Here */

  /** User Entered Data Fetching Here */
  useEffect(() => {
    fetch("https://task-project-server.vercel.app/userdata")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);
  /** User Entered Data Fetching Ends Here */

  const handleChange = (value) => {
    setSectors(value);
  };

  /** Data Submit and Save Database Here */
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const sector = sectors.label;
    const name = form.name.value;
    const terms = form.agree.value;
    const data = { name, sector, terms };

    fetch("https://task-project-server.vercel.app/userdata", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Data Saved Successfully!",
            icon: "success",
            timer: 2000,
            confirmButtonText: "Ok",
          });
          form.reset();
          fetch("https://task-project-server.vercel.app/userdata")
            .then((res) => res.json())
            .then((data) => setUserData(data));
        }
      });
  };
  /** Data Submit and Save Database Ends Here */

  /** Data Deleted API Call Here */
  const handleDeletedData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure delete data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-project-server.vercel.app/userdata/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const newData = userData.filter((data) => data._id !== id);
            setUserData(newData);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "data has been deleted.", "success");
            }
          });
      }
    });
  };
  /** Data Deleted API Call Ends Here */

  /** Edit data API Call Here */
  const handleEditData = (data) => {
    setEditingData(data);
  };
  const handleUpdateData = (e) => {
    e.preventDefault();
    const form = e.target;
    const sector = sectors.label;
    const name = form.name.value;
    const terms = form.agree.value;
    const data = { name, sector, terms };

    fetch(
      `https://task-project-server.vercel.app/userdata/${editingData._id}`,
      {
        method: "PUT", // Use PUT method for updating the data
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Data Updated Successfully!",
            icon: "success",
            timer: 2000,
            confirmButtonText: "Ok",
          });
          setEditingData(null);
          fetch("https://task-project-server.vercel.app/userdata")
            .then((res) => res.json())
            .then((data) => setUserData(data));
        }
      });
  };
  /** Edit data API Call Ends Here */

  return (
    <>
      {/* Form Here */}
      <div className='max-w-7xl md:mx-auto mt-16 mx-5'>
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            type='text'
            name='name'
            placeholder='Enter Name'
            className='border p-3 w-full my-5 border-slate-500 rounded-md'
            required
          />
          <Select
            name='sector'
            required
            onChange={handleChange}
            options={sectorData.map(({ value, label }) => ({
              value: value,
              label: label,
            }))}
          />
          <input type='checkbox' name='agree' required className='my-2' />
          <br />
          <button
            className='bg-blue-500 text-white p-2.5 px-5 rounded-sm cursor-pointer mt-5'
            type='submit'
          >
            Save
          </button>
        </form>
      </div>
      {/* Form Ends Here */}

      {/* Show Users Enterd Data Here */}
      {userData.length > 0 ? (
        <div className='max-w-7xl md:mx-auto mt-20 mb-5 mx-5'>
          <table className='min-w-full border border-gray-300'>
            <thead>
              <tr className='bg-blue-500 text-white font-bold text-lg'>
                <th className='py-3 px-4 border-b md:block hidden'>No</th>
                <th className='py-3 px-4 border-b'>Name</th>
                <th className='py-3 px-4 border-b'>Sector</th>
                <th className='py-3 px-4 border-b md:block hidden'>Terms</th>
                <th className='py-3 px-4 border-b'>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((data, index) => (
                <tr className='text-center' key={index + 1}>
                  <td className='p-3 md:block hidden'>{index + 1}</td>
                  <td className='p-3'>{data.name}</td>
                  <td className='p-3'>{data.sector}</td>
                  <td className='p-3 md:block hidden'>{data.terms}</td>
                  <td className='p-3 space-x-4 text-[#201f1f] '>
                    <button
                      onClick={() => handleEditData(data)}
                      className='hover:text-blue-500'
                    >
                      {" "}
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeletedData(data._id)}
                      className='hover:text-red-500'
                    >
                      {" "}
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      {/* Show Users Enterd Data Ends Here */}

      {/* Modal for Editing Data */}
      {editingData && (
        <div className='fixed inset-0 bg-opacity-50 bg-gray-500 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Edit Data</h2>
            <form onSubmit={handleUpdateData}>
              <input
                type='text'
                name='name'
                placeholder='Enter Name'
                className='border p-3 w-full my-5 border-slate-500 rounded-md'
                defaultValue={editingData.name}
                required
              />
              <Select
                options={sectorData.map(({ value, label }) => ({
                  value: value,
                  label: label,
                }))}
                onChange={handleChange}
                defaultValue={{
                  value: editingData.sector,
                  label: editingData.sector,
                }}
              />
              <input
                type='checkbox'
                name='agree'
                defaultChecked={editingData.terms}
                required
                className='my-2'
              />
              <br />
              <button
                className='bg-blue-500 text-white p-2.5 px-5 rounded-sm cursor-pointer mt-5'
                type='submit'
              >
                Update
              </button>
              <button
                className='bg-gray-500 text-white p-2.5 px-5 rounded-sm cursor-pointer mt-5 ml-3'
                onClick={() => setEditingData(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal Ends Here */}
    </>
  );
};

export default App;
