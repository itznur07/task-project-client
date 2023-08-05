import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";

const App = () => {
  /** All States */
  const [sectors, setSectors] = useState([]);
  const [userData, setUserData] = useState([]);
  const [sectorData, setSectorData] = useState([]);

  /** Sector Data Fetching */
  useEffect(() => {
    fetch("http://localhost:3000/sectordata")
      .then((res) => res.json())
      .then((data) => setSectorData(data));
  }, []);

  /** User Etered Data Fetching */
  useEffect(() => {
    fetch("http://localhost:3000/userdata")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  const handleChange = (value) => {
    setSectors(value);
  };

  /** Data Submit and Save Database */
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

  return (
    <>
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
                <td className='flex justify-center p-3'>
                  <button>
                    {" "}
                    <FaEdit size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
