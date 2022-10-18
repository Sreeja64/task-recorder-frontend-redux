import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please add a task')
            return
        }

        onAdd({ name, status })

        setName('')
        setStatus(false)
    }

    return (
        <div style={{    maxWidth: '90%' , margin: '0 auto'}}>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Task</label>
                    <input
                        type='text'
                        placeholder='Add Task'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-control form-control-check'>
                    <label>Status</label>
                    <input
                        type='checkbox'
                        checked={status}
                        value={status}
                        onChange={(e) => setStatus(e.currentTarget.checked)}
                    />
                </div>

                <input type='submit' value='Save Task' className='btn btn-block' />
            </form>
        </div>
    )
}

export default AddTask