/* eslint-disable react/prop-types */
import Post from "../Post/Post"

const DashboardBody = ({ user, currentUser }) => {
    return (
        <div className="grid grid-cols-3 md:grid-cols-5">
            <div>
            </div>
            <div className="col-span-3">
                <Post user={user} currentUser={currentUser} />
            </div>
            <div>
            </div>
        </div>
    )
}

export default DashboardBody