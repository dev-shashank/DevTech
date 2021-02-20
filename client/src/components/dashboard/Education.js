import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tbody>
        <tr key={edu._id}>
          <td>{edu.institute}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="DD-MM-YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
              ' Now'
            ) : (
                <Moment format="DD-MM-YYYY">{edu.to}</Moment>
              )}
          </td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, edu._id)}
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
        <h4 className="mb-4">Education:</h4>
        <table className="table table-light table-hover">
          <thead>
            <tr className="bg-dark text-light">
              <th>Institute</th>
              <th>Degree</th>
              <th>TimeLine</th>
              <th>
                <Link to="/add-education" className="btn btn-light">
                  <i className="fas fa-graduation-cap mr-2" />
                    Add Education
                </Link>
              </th>
            </tr>
          </thead>
          {education}
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
