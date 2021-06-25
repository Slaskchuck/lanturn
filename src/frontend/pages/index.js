import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'

import TutorAction from '../redux/Tutor/Action'
import { createErrorMessageSelector } from '../redux/Selector'

const errorSelector = createErrorMessageSelector([ 'COMMON_STUDENT_LIST' ])

const Home = () => {
  const { tutor, error } = useSelector((state) => ({
    tutor: state.tutor,
    error: errorSelector(state)
  }))
  const dispatch = useDispatch()

  const [ form, setForm ] = useState({ value: '', error: false, tutors: [] })

  const handleOnChangeInput = (event) => {
    return setForm({
      ...form,
      value: event.target.value
    })
  }

  const handleOnClickAddButton = () => {
    if (form.value === '') {
      return
    }
    
    return setForm({
      ...form,
      tutors: [ ...form.tutors, form.value ]
    })
  }

  const handleOnClickRemoveButton = (index) => () => {
    const current = [ ...form.tutors ]
    current.splice(index, 1)
    
    return setForm({
      ...form,
      tutors: current
    })
  }

  const handleOnClickSubmit = () => {
    dispatch(TutorAction.commonStudentList({ tutors: form.tutors }))
  }
  
  return (
    <div className='container'>
      <main className='main'>
        <div>Get common students</div>
        <div className='division'> 
          <div className='form-container'>
            <div className={`input-container${!!error.length ? '-error' : ''}`}>
              <div className='input-block'>
                <label className='input-label'>Tutor: </label>
                <input
                  onChange={handleOnChangeInput}
                  value={form.value}
                  type='text'
                  autoComplete='off'
                />
                {
                  error.map(error => <label className='error-label' key={error}>{error}</label>)
                }
              </div>
              <div className='button-container'>
                <button onClick={handleOnClickAddButton}>Add</button>
              </div>
            </div>
            <div>
              <button onClick={handleOnClickSubmit}>Submit</button>
            </div>
          </div>
          <div>
            {
              form.tutors.map((tutor, index) => 
                <div key={tutor} className='tutor'>
                    <p>{tutor}</p>
                    <button onClick={handleOnClickRemoveButton(index)}>-</button>
                </div>
              )
            }
          </div>
          <div className='student-container'>
            <label>Common Student List:</label>
            <table>
              <tbody>
              {
                tutor.commonStudents.map(student => <tr key={student}><td>{student}</td></tr>)
              }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
