import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tbody>
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="DD-MM-YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
              ' Now'
            ) : (
                <Moment format="DD-MM-YYYY">{exp.to}</Moment>
              )}
          </td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, exp._id)}
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          </td>
        </tr>
      </tbody>
    ));
    return (
      <div>
        <h4 className="mb-3">Experience:</h4>
        <table className="table table-light table-hover">
          <thead>
            <tr className="bg-dark text-light">
              <th>Company</th>
              <th>Title</th>
              <th>TimeLine</th>
              <th>
                <Link to="/add-experience" className="btn btn-light">
                  <i className="fab fa-black-tie mr-2" />
                    Add Experience
                </Link>
              </th>
            </tr>
          </thead>
          {experience}
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
