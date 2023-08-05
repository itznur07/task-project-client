import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";

const App = () => {
  /** All States Here */
  const [sectors, setSectors] = useState([]);
  const [userData, setUserData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  /** All States Ends Here */

  /** Sector Data Fetching Here */
  useEffect(() => {
    fetch("http://localhost:3000/sectordata")
      .then((res) => res.json())
      .then((data) => setSectorData(data));
  }, []);
  /** Sector Data Fetching Ends Here */

  /** User Etered Data Fetching Here */
  useEffect(() => {
    fetch("http://localhost:3000/userdata")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);
  /** User Etered Data Fetching Ends Here */

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

    fetch("http://localhost:3000/userdata", {
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
        }
      });
  };
  /** Data Submit and Save Database Ends Here */

  /** Data Deleted API Call Here */
  const handleDeletedData = (id) => {
    fetch(`http://localhost:3000/userdata/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Data Deleted");
        }
      });
  };
  /** Data Deleted API Call Ends Here */

  return (
    <>
      {/* Form Here */}
      <div className='max-w-7xl mx-auto mt-24'>
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
            options={sectorData.map(({ value, label }) => ({
              value: value,
              label: label,
            }))}
            onChange={handleChange}
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
      <div className='max-w-7xl mx-auto mt-24 mb-5'>
        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr className='bg-blue-500 text-white font-bold text-lg'>
              <th className='py-3 px-4 border-b'>No</th>
              <th className='py-3 px-4 border-b'>Name</th>
              <th className='py-3 px-4 border-b'>Sector</th>
              <th className='py-3 px-4 border-b'>Terms</th>
              <th className='py-3 px-4 border-b'>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((data, index) => (
              <tr className='text-center' key={index + 1}>
                <td className='p-3'>{index + 1}</td>
                <td className='p-3'>{data.name}</td>
                <td className='p-3'>{data.sector}</td>
                <td className='p-3'>{data.terms}</td>
                <td className='flex justify-center p-3 space-x-4 text-[#201f1f] '>
                  <button className='hover:text-blue-500'>
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
      {/* Show Users Enterd Data Ends Here */}
    </>
  );
};

export default App;
