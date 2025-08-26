import { useAppDispatch, useAppSelector } from "./redux/hooks";
import "./App.css";
import { useEffect, useState } from "react";
import { create, setUsers } from "./redux/userSlice";
import axios from "axios";
import type { User } from "./redux/userSlice";

function App() {
  const users = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const updateValue = {
    name: name,
    age: Number(age),
    des: des,
  };
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !age || !des) return alert("Please fill all fields");
    try {
      const res = await axios.post("https://test-1-9las.onrender.com", updateValue);
      dispatch(create(res.data)); // Lưu vào Redux
      setName("");
      setAge("");
      setDes("");
    } catch (error) {
      console.error(error);
    }
  };
  //fetch data
  useEffect(() => {
    axios.get("https://test-1-9las.onrender.com").then((res) => {
      // Nếu muốn lưu vào Redux:
      dispatch(setUsers(res.data))
    });
  }, [dispatch]);

  return (
    <>
      {users.length > 0 ? (
        users.map((user: User, index) => (
          <div className="bg-amber-300 py-10 text-center my-2" key={index}>
            <h1>{user.name}</h1>
            <p>{user.age}</p>
            <p>{user.des}</p>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
      <form
        onSubmit={(e) => handleAdd(e)}
        className="bg-amber-200 flex flex-col w-fit text-center mx-auto gap-2 px-4 py-2 rounded-md"
      >
        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            className="px-5"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            type="text"
            placeholder="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Age</label>
          <input
            className="px-5"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAge(e.target.value)
            }
            type="number"
            placeholder="age"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <input
            className="px-5"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDes(e.target.value)
            }
            type="text"
            placeholder="description"
          />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md ms-10 mx-auto">
          Add me
        </button>
      </form>
    </>
  );
}

export default App;
