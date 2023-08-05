import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

function App() {
  const [sectors, setSectors] = useState([]);

  const handleChange = (value) => {
    setSectors(value);
  };

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
            confirmButtonText: "Ok",
          });
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
          />
          <Select
            options={[
              { value: "1", label: "Manufacturing" },
              { value: "2", label: "Service" },
              { value: "3", label: "Other" },
            ]}
            onChange={handleChange}
          />
          <input type='checkbox' name='agree' className='my-2' />
          <br />
          <input
            className='bg-blue-500 text-white p-2.5 px-5 rounded-sm cursor-pointer mt-5'
            type='submit'
            value='Save'
          />
        </form>
      </div>

      <div className='max-w-7xl mx-auto mt-24'>
        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr className='bg-blue-500 text-white font-bold text-lg'>
              <th className='py-3 px-4 border-b'>No</th>
              <th className='py-3 px-4 border-b'>Name</th>
              <th className='py-3 px-4 border-b'>Sector</th>
              <th className='py-3 px-4 border-b'>term</th>
              <th className='py-3 px-4 border-b'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
