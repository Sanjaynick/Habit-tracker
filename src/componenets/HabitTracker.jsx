import React, { useState } from 'react'

const HabitTracker = () => {

  const [habit, setHabit] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [editId, setEditId] = useState(null)
  const weaks = () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

   const handleEdit = (id) => {
    const updateHabit = habit.find((f) => f.id === id)
    
    if(updateHabit){
      setNewHabit(updateHabit.name)
      setEditId(id)
    }
  }

  const AddHabit = () => {
      if (newHabit.trim() === '') return

      if(editId !== null){
         const updatedHabit = habit.map((h) =>
        h.id === editId ? {...h, name: newHabit} : h
        )
        setHabit(updatedHabit)
        setNewHabit('')
        setEditId(null)
      }
      else{

           const habitObject = {
      id:Date.now(),
      name: newHabit,
      completed: [],
      streak: 0
    }
    setHabit([...habit, habitObject])
    setNewHabit('')

    console.log(habitObject);
    
      }
  }

  const handleDelete = (id) => {
    const deleteHabit = habit.filter((fi) => fi.id !== id)
    setHabit(deleteHabit)
    
    if(editId === id){
      setEditId(null)
      setNewHabit('')
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      AddHabit()
    }
  }

  const handleComplete = (habitId, day) => {
    const habitUpdate = habit.map((a) => {
      if(habitId === a.id){
        const isDayCompleted = a.completed.includes(day)
        const completedHabit = isDayCompleted ? a.completed.filter(d => d !== day) : [...a.completed, day]

        const newStreak = completedHabit.length
        return {
          ...a, 
          completed : completedHabit,
          streak : newStreak
        }
      }
      return a   
    })
    setHabit(habitUpdate)    
      }      


  return (
    <>
      <div className='habit-main-container'>
        <div className='habit-sub-container'>
          <h1>Habit Tracker</h1>
          <input type="text" placeholder='Enter Your Habit to Track' value={newHabit} onChange={(e) => setNewHabit(e.target.value)} onKeyDown={handleKeyPress} />
          <button onClick={AddHabit} >{editId != null ? 'Edit' : 'Add'}</button>
        </div>
        <div className="show-habit-div">

            {habit.length == 0 ? (
             <p>No Habit Added</p>
            ) : (
              <table>
                 <thead>
                   <tr>
                     <th>Habits</th>
                     {
                      weaks().map((weak, weakIndex) => (
                        <th key={weakIndex}>{weak}</th>
                      ))
                    }
                    <th>Finished</th>
                    <th>Action</th>
                   </tr>
              </thead>
              <tbody>
                {
                  habit.map((habit) => (
                    <tr key={habit.id}>
                      <td className='habit-name'>{habit.name.toUpperCase()}</td>
                       {
                               weaks().map((day, index) => (
                                <td key={index}
                                ><input type="checkbox" checked={habit.completed.includes(day)} onChange={() => handleComplete(habit.id, day)} /></td>
                               ))
                        }
                        <td>{habit.streak}</td>
                        <td className='button-td'><button className='edit-btn' onClick={() => handleEdit(habit.id)}>Edit</button> <button className='delete-btn' onClick={() => handleDelete(habit.id)}>Delete</button></td>
                    </tr>
                  ))
                }
              </tbody>
              </table>
            )
            }
        </div>
      </div>

    </>
  )
}

export default HabitTracker
