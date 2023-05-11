// date-fns
import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Details = ({ task }) => {
    return (
        <div className="details">
            <h1>{task.title}</h1>
            <p><strong>Due Date: </strong>{format(new Date(task.due.replace(/-/, '/').replace(/T.+/, '')), "MM/dd/yyyy")}</p>
            {task.time && <p><strong>Time Due: </strong>{format(new Date("2000-01-01T"+task.time), "hh:mm a")}</p>}
            <p>Task Created: {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
            {
                task.description
                &&
                <div className="description">
                    <h3>Description:</h3>
                    <p>{task.description}</p>
                </div>
            }
        </div>
    )
}

export default Details