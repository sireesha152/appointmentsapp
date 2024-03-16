// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {details, onFavorite} = props
  const {id, name, date, isStarred} = details

  const favored = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onFavored = () => {
    onFavorite(id)
  }

  return (
    <li className="bg_container">
      <div className="container">
        <div className="list">
          <h1>{name}</h1>
          <button
            data-testid="star"
            className="button"
            type="button"
            onClick={onFavored}
          >
            <img src={favored} alt="star" />
          </button>
        </div>
        <p>Date: {date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
