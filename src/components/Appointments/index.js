// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentLists: [],
    nameInput: '',
    dateInput: '',
    isFavorite: false,
  }

  onFavorite = id => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return {eachItem}
      }),
    }))
  }

  onFilter = () => {
    const {isFavorite} = this.state
    this.setState({isFavorite: !isFavorite})
  }

  onChangenameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangedateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  addClicked = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const formatteddate = dateInput
      ? format(new Date(dateInput), 'dd MMMM YYYY, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      name: nameInput,
      date: formatteddate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentLists, isFavorite} = this.state
    if (isFavorite) {
      return appointmentLists.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentLists
  }

  render() {
    const {nameInput, dateInput, isFavorite} = this.state
    const filterClass = isFavorite ? 'active' : 'unactive'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="bg_container">
        <div className="container">
          <div className="details">
            <form className="appointment form" onSubmit={this.addClicked}>
              <h1>Add Appointment</h1>
              <label htmlFor="Title">Title</label>
              <input
                type="input-text"
                id="Title"
                placeholder="Title"
                value={nameInput}
                onChange={this.onChangenameInput}
              />
              <label htmlFor="datetype">Date</label>
              <input
                type="date"
                id="datetype"
                placeholder="dd/mm/yyyy"
                value={dateInput}
                onChange={this.onChangedateInput}
              />
              <button className="add_button" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="list_head_container">
            <h1>Appointments</h1>
            <button
              type="button"
              className={`button ${filterClass}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="list_container">
            {filteredAppointmentsList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                details={eachItem}
                onFavorite={this.onFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
